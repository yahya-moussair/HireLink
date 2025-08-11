<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecruiterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get recruiter's jobs
        $activeJobs = Job::where('recruiter_id', $user->id)
            ->where('status', 'active')
            ->withCount('applications')
            ->latest()
            ->take(5)
            ->get();
        
        // Get recent applications for recruiter's jobs
        $recentApplications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })
        ->with(['candidate', 'job'])
        ->latest()
        ->take(5)
        ->get();
        
        // Get top candidates (users who are not recruiters)
        $topCandidates = User::where('role', 'user')
            ->whereNotNull('Specialization')
            ->latest()
            ->take(6)
            ->get();
        
        // Get today's interviews
        $todayInterviews = \App\Models\Interview::where('recruiter_id', $user->id)
            ->whereDate('scheduled_at', today())
            ->where('status', 'scheduled')
            ->with(['candidate', 'jobApplication.job'])
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();
        
        // Get upcoming interviews
        $upcomingInterviews = \App\Models\Interview::where('recruiter_id', $user->id)
            ->where('scheduled_at', '>', now())
            ->where('status', 'scheduled')
            ->with(['candidate', 'jobApplication.job'])
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();
        
        // Calculate stats
        $totalApplications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })->count();
        
        $hiredApplications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })->where('status', 'hired')->count();
        
        $successRate = $totalApplications > 0 ? round(($hiredApplications / $totalApplications) * 100) : 0;
        
        $stats = [
            'activeJobs' => Job::where('recruiter_id', $user->id)->where('status', 'active')->count(),
            'totalApplications' => $totalApplications,
            'newApplications' => JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->where('created_at', '>=', now()->subDays(7))->count(),
            'totalViews' => Job::where('recruiter_id', $user->id)->sum('views'),
            'successRate' => $successRate,
            'todayInterviews' => \App\Models\Interview::where('recruiter_id', $user->id)
                ->whereDate('scheduled_at', today())
                ->where('status', 'scheduled')
                ->count(),
            'upcomingInterviews' => \App\Models\Interview::where('recruiter_id', $user->id)
                ->where('scheduled_at', '>', now())
                ->where('status', 'scheduled')
                ->count(),
        ];
        
        return Inertia::render('dashboard/RecruiterDashboard', [
            'user' => $user,
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'activeJobs' => $activeJobs,
            'topCandidates' => $topCandidates,
            'todayInterviews' => $todayInterviews,
            'upcomingInterviews' => $upcomingInterviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Display recruiter's jobs.
     */
    public function jobs()
    {
        $user = auth()->user();
        $jobs = Job::where('recruiter_id', $user->id)
            ->withCount('applications')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('recruiter/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    /**
     * Show the form for creating a new job.
     */
    public function createJob()
    {
        return Inertia::render('recruiter/Jobs/Create');
    }

    /**
     * Store a newly created job.
     */
    public function storeJob(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:full-time,part-time,contract,internship',
            'salary_range' => 'nullable|string|max:255',
            'company_name' => 'required|string|max:255',
        ]);

        $validated['recruiter_id'] = auth()->id();
        $validated['status'] = 'active';

        Job::create($validated);

        return redirect()->route('recruiter.jobs.index')->with('success', 'Job posted successfully!');
    }

    /**
     * Display the specified job.
     */
    public function showJob(Job $job)
    {
        $job->load(['applications.candidate']);
        
        return Inertia::render('recruiter/Jobs/Show', [
            'job' => $job
        ]);
    }

    /**
     * Show the form for editing the specified job.
     */
    public function editJob(Job $job)
    {
        return Inertia::render('recruiter/Jobs/Edit', [
            'job' => $job
        ]);
    }

    /**
     * Update the specified job.
     */
    public function updateJob(Request $request, Job $job)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:full-time,part-time,contract,internship',
            'salary_range' => 'nullable|string|max:255',
            'company_name' => 'required|string|max:255',
        ]);

        $job->update($validated);

        return redirect()->route('recruiter.jobs.index')->with('success', 'Job updated successfully!');
    }

    /**
     * Remove the specified job.
     */
    public function destroyJob(Job $job)
    {
        $job->delete();

        return redirect()->route('recruiter.jobs.index')->with('success', 'Job deleted successfully!');
    }

    /**
     * Display candidates.
     */
    public function candidates()
    {
        $candidates = User::where('role', 'user')
            ->whereNotNull('Specialization')
            ->latest()
            ->paginate(12);
        
        return Inertia::render('recruiter/Candidates/Index', [
            'candidates' => $candidates
        ]);
    }

    /**
     * Display the specified candidate.
     */
    public function showCandidate(User $user)
    {
        return Inertia::render('recruiter/Candidates/Show', [
            'candidate' => $user
        ]);
    }

    /**
     * Display applications.
     */
    public function applications()
    {
        $user = auth()->user();
        $applications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })
        ->with(['candidate', 'job'])
        ->latest()
        ->paginate(10);
        
        return Inertia::render('recruiter/Applications/Index', [
            'applications' => $applications
        ]);
    }

    /**
     * Display the specified application.
     */
    public function showApplication(JobApplication $application)
    {
        $application->load(['candidate', 'job']);
        
        return Inertia::render('recruiter/Applications/Show', [
            'application' => $application
        ]);
    }

    /**
     * Update the specified application.
     */
    public function updateApplication(Request $request, JobApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,shortlisted,rejected,hired',
            'notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return back()->with('success', 'Application updated successfully!');
    }

    /**
     * Display messages.
     */
    public function messages()
    {
        $user = auth()->user();
        // This would integrate with Chatify
        $conversations = collect(); // Placeholder
        
        return Inertia::render('recruiter/Messages/Index', [
            'conversations' => $conversations
        ]);
    }

    /**
     * Display conversation with a user.
     */
    public function showConversation(User $otherUser)
    {
        $user = auth()->user();
        
        return Inertia::render('recruiter/Messages/Show', [
            'otherUser' => $otherUser,
            'messages' => collect() // Placeholder for Chatify messages
        ]);
    }

    /**
     * Send a message.
     */
    public function sendMessage(Request $request, User $otherUser)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);
        
        // This would integrate with Chatify
        // For now, just return success
        
        return back()->with('success', 'Message sent successfully!');
    }

    /**
     * Display analytics.
     */
    public function analytics()
    {
        $user = auth()->user();
        
        // Calculate comprehensive analytics data
        $totalJobs = Job::where('recruiter_id', $user->id)->count();
        $activeJobs = Job::where('recruiter_id', $user->id)->where('status', 'active')->count();
        $totalApplications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })->count();
        $hiredCount = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })->where('status', 'hired')->count();
        
        $successRate = $totalApplications > 0 ? round(($hiredCount / $totalApplications) * 100) : 0;
        
        // Get application status distribution
        $applicationStatuses = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })
        ->selectRaw('status, count(*) as count')
        ->groupBy('status')
        ->get()
        ->map(function($item) {
            $colors = [
                'pending' => 'bg-yellow-500',
                'shortlisted' => 'bg-blue-500',
                'interviewed' => 'bg-purple-500',
                'hired' => 'bg-green-500',
                'rejected' => 'bg-red-500',
                'withdrawn' => 'bg-gray-500'
            ];
            
            return [
                'status' => $item->status,
                'count' => $item->count,
                'color' => $colors[$item->status] ?? 'bg-gray-500'
            ];
        });
        
        // Get recent activity
        $recentActivity = collect();
        
        // Add recent job applications
        $recentApplications = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })
        ->with(['candidate', 'job'])
        ->latest()
        ->take(5)
        ->get()
        ->map(function($application) {
            return [
                'type' => 'application',
                'title' => 'New application received',
                'description' => $application->candidate->name . ' applied for ' . $application->job->title,
                'time' => $application->created_at->diffForHumans(),
                'color' => 'green'
            ];
        });
        
        $recentActivity = $recentActivity->concat($recentApplications);
        
        // Add recent interviews
        $recentInterviews = \App\Models\Interview::where('recruiter_id', $user->id)
            ->with(['candidate', 'jobApplication.job'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function($interview) {
                return [
                    'type' => 'interview',
                    'title' => 'Interview scheduled',
                    'description' => 'Interview with ' . $interview->candidate->name . ' for ' . $interview->jobApplication->job->title,
                    'time' => $interview->created_at->diffForHumans(),
                    'color' => 'blue'
                ];
            });
        
        $recentActivity = $recentActivity->concat($recentInterviews);
        
        // Sort by time and take top 10
        $recentActivity = $recentActivity->sortByDesc('time')->take(10);
        
        // Get monthly job posting data for the last 6 months
        $monthlyJobData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();
            
            $jobsCount = Job::where('recruiter_id', $user->id)
                ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->count();
            
            $applicationsCount = JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();
            
            $monthlyJobData[] = [
                'month' => $date->format('M'),
                'jobs' => $jobsCount,
                'applications' => $applicationsCount,
            ];
        }
        
        $analytics = [
            'totalJobs' => $totalJobs,
            'activeJobs' => $activeJobs,
            'totalApplications' => $totalApplications,
            'hiredCount' => $hiredCount,
            'successRate' => $successRate,
            'applicationStatuses' => $applicationStatuses,
            'recentActivity' => $recentActivity,
            'monthlyJobData' => $monthlyJobData,
            'totalViews' => Job::where('recruiter_id', $user->id)->sum('views'),
            'averageViewsPerJob' => $totalJobs > 0 ? round(Job::where('recruiter_id', $user->id)->sum('views') / $totalJobs) : 0,
        ];
        
        return Inertia::render('recruiter/Analytics/Index', [
            'analytics' => $analytics
        ]);
    }

    /**
     * Search candidates by specialization and other criteria
     */
    public function searchCandidates(Request $request)
    {
        $user = auth()->user();
        
        $query = User::where('role', 'user')
            ->whereNotNull('Specialization');
            
        // Search by specialization
        if ($request->filled('specialization')) {
            $query->where('Specialization', 'like', '%' . $request->specialization . '%');
        }
        
        // Search by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }
        
        // Search by experience level
        if ($request->filled('experience_level')) {
            $query->where('experience_level', $request->experience_level);
        }
        
        // Search by skills
        if ($request->filled('skills')) {
            $skills = explode(',', $request->skills);
            foreach ($skills as $skill) {
                $query->where(function($q) use ($skill) {
                    $q->where('skills', 'like', '%' . trim($skill) . '%')
                      ->orWhere('Specialization', 'like', '%' . trim($skill) . '%');
                });
            }
        }
        
        $candidates = $query->withCount('jobApplications')
            ->orderBy('created_at', 'desc')
            ->paginate(12);
        
        return Inertia::render('recruiter/Candidates/Search', [
            'user' => $user,
            'candidates' => $candidates,
            'filters' => $request->only(['specialization', 'location', 'experience_level', 'skills'])
        ]);
    }

    /**
     * View candidate profile and increment view count
     */
    public function viewCandidateProfile(User $candidate)
    {
        $user = auth()->user();
        
        // Increment profile view count
        $candidate->increment('profile_views');
        
        // Get candidate's applications
        $applications = JobApplication::where('user_id', $candidate->id)
            ->with('job')
            ->latest()
            ->get();
        
        // Get candidate's skills and experience
        $candidate->load(['jobApplications.job']);
        
        return Inertia::render('recruiter/Candidates/Profile', [
            'user' => $user,
            'candidate' => $candidate,
            'applications' => $applications,
        ]);
    }

    /**
     * Schedule interview for a candidate
     */
    public function scheduleInterview(Request $request, JobApplication $application)
    {
        $user = auth()->user();
        
        // Verify the application belongs to recruiter's job
        if ($application->job->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'interview_date' => 'required|date|after:now',
            'interview_time' => 'required|date_format:H:i',
            'interview_type' => 'required|in:phone,video,in-person',
            'location' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);
        
        // Update application with interview details
        $application->update([
            'interview_scheduled_at' => $validated['interview_date'] . ' ' . $validated['interview_time'],
            'interview_type' => $validated['interview_type'],
            'interview_location' => $validated['location'],
            'interview_notes' => $validated['notes'],
            'status' => 'interviewed',
        ]);
        
        // Send email notification to candidate
        // TODO: Implement email sending
        // Mail::to($application->candidate->email)->send(new InterviewScheduled($application));
        
        return back()->with('success', 'Interview scheduled successfully!');
    }

    /**
     * Accept a candidate for the job
     */
    public function acceptCandidate(JobApplication $application)
    {
        $user = auth()->user();
        
        // Verify the application belongs to recruiter's job
        if ($application->job->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        // Update application status to hired
        $application->update(['status' => 'hired']);
        
        // Reject all other applications for this job
        JobApplication::where('job_id', $application->job_id)
            ->where('id', '!=', $application->id)
            ->update(['status' => 'rejected']);
        
        // Close the job posting
        $application->job->update(['status' => 'closed']);
        
        // Send acceptance email to hired candidate
        // TODO: Implement email sending
        // Mail::to($application->candidate->email)->send(new JobAccepted($application));
        
        // Send rejection emails to other candidates
        $rejectedApplications = JobApplication::where('job_id', $application->job_id)
            ->where('id', '!=', $application->id)
            ->with('candidate')
            ->get();
            
        foreach ($rejectedApplications as $rejectedApp) {
            // TODO: Implement email sending
            // Mail::to($rejectedApp->candidate->email)->send(new JobRejected($rejectedApp));
        }
        
        return back()->with('success', 'Candidate accepted and job closed successfully!');
    }

    /**
     * Reject a candidate
     */
    public function rejectCandidate(JobApplication $application)
    {
        $user = auth()->user();
        
        // Verify the application belongs to recruiter's job
        if ($application->job->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        // Update application status to rejected
        $application->update(['status' => 'rejected']);
        
        // Send rejection email to candidate
        // TODO: Implement email sending
        // Mail::to($application->candidate->email)->send(new JobRejected($application));
        
        return back()->with('success', 'Candidate rejected successfully!');
    }

    /**
     * Get interview calendar data
     */
    public function getInterviewCalendar()
    {
        $user = auth()->user();
        
        $interviews = JobApplication::whereHas('job', function($query) use ($user) {
            $query->where('recruiter_id', $user->id);
        })
        ->whereNotNull('interview_scheduled_at')
        ->with(['candidate', 'job'])
        ->get()
        ->map(function($interview) {
            return [
                'id' => $interview->id,
                'title' => 'Interview: ' . $interview->candidate->name,
                'start' => $interview->interview_scheduled_at,
                'end' => date('Y-m-d H:i:s', strtotime($interview->interview_scheduled_at) + 3600), // 1 hour duration
                'backgroundColor' => '#2980d1',
                'borderColor' => '#202b61',
                'extendedProps' => [
                    'candidate_name' => $interview->candidate->name,
                    'job_title' => $interview->job->title,
                    'interview_type' => $interview->interview_type,
                    'location' => $interview->interview_location,
                ]
            ];
        });
        
        return response()->json($interviews);
    }
}
