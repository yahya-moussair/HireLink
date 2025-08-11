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
        
        // Calculate stats
        $stats = [
            'activeJobs' => Job::where('recruiter_id', $user->id)->where('status', 'active')->count(),
            'totalApplications' => JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->count(),
            'newApplications' => JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->where('created_at', '>=', now()->subDays(7))->count(),
            'totalViews' => Job::where('recruiter_id', $user->id)->sum('views'),
            'successRate' => 75, // Placeholder - would calculate based on hired vs applied
        ];
        
        return Inertia::render('dashboard/RecruiterDashboard', [
            'user' => $user,
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'activeJobs' => $activeJobs,
            'topCandidates' => $topCandidates,
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
        
        // Calculate analytics data
        $analytics = [
            'totalJobs' => Job::where('recruiter_id', $user->id)->count(),
            'activeJobs' => Job::where('recruiter_id', $user->id)->where('status', 'active')->count(),
            'totalApplications' => JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->count(),
            'hiredCount' => JobApplication::whereHas('job', function($query) use ($user) {
                $query->where('recruiter_id', $user->id);
            })->where('status', 'hired')->count(),
            'successRate' => 75, // Placeholder calculation
        ];
        
        return Inertia::render('recruiter/Analytics/Index', [
            'analytics' => $analytics
        ]);
    }
}
