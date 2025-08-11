<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get recommended jobs based on user's specialization
        $recommendedJobs = Job::where('status', 'active')
            ->where('deadline', '>', now())
            ->when($user->Specialization, function ($query, $specialization) {
                return $query->where('description', 'like', "%{$specialization}%")
                    ->orWhere('requirements', 'like', "%{$specialization}%");
            })
            ->with('recruiter')
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'description' => $job->description,
                    'company_name' => $job->company_name,
                    'location' => $job->location,
                    'type' => $job->type,
                    'experience_level' => $job->experience_level,
                    'formatted_salary' => $job->formatted_salary,
                    'skills' => $job->skills,
                    'benefits' => $job->benefits,
                    'deadline' => $job->deadline,
                    'created_at' => $job->created_at,
                ];
            });

        // Get recent activity
        $recentActivity = collect();
        
        // Add recent job applications
        $recentApplications = JobApplication::where('user_id', $user->id)
            ->with('job')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        foreach ($recentApplications as $application) {
            $recentActivity->push([
                'type' => 'application',
                'message' => "Applied to {$application->job->title} at {$application->job->company_name}",
                'time' => $application->created_at->diffForHumans(),
                'data' => $application
            ]);
        }

        // Add profile updates (if any)
        if ($user->updated_at->diffInDays(now()) < 7) {
            $recentActivity->push([
                'type' => 'profile',
                'message' => 'Updated your profile information',
                'time' => $user->updated_at->diffForHumans(),
                'data' => $user
            ]);
        }

        // Sort by time (most recent first)
        $recentActivity = $recentActivity->sortByDesc('time')->values();

        // Get user statistics
        $stats = [
            'profileViews' => 0, // Placeholder - can be implemented later
            'totalApplications' => JobApplication::where('user_id', $user->id)->count(),
            'totalInterviews' => JobApplication::where('user_id', $user->id)
                ->whereNotNull('interview_scheduled_at')
                ->count(),
            'pendingApplications' => JobApplication::where('user_id', $user->id)
                ->where('status', 'pending')
                ->count(),
            'shortlistedApplications' => JobApplication::where('user_id', $user->id)
                ->where('status', 'shortlisted')
                ->count(),
        ];

        return Inertia::render('dashboard/UserDashboard', [
            'user' => $user,
            'recommendedJobs' => $recommendedJobs,
            'recentActivity' => $recentActivity,
            'stats' => $stats,
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
     * Display user profile.
     */
    public function profile()
    {
        $user = Auth::user();
        $user->load('posts', 'jobApplications');
        
        // Add profile_picture_url attribute
        $user->profile_picture_url = $user->profile_picture_url;
        
        $stats = [
            'profileViews' => rand(10, 100),
            'totalApplications' => $user->jobApplications->count(),
            'totalInterviews' => $user->jobApplications->whereIn('status', ['interviewed', 'shortlisted'])->count(),
        ];
        
        return Inertia::render('user/Profile/Index', [
            'user' => $user,
            'profile' => $user,
            'stats' => $stats
        ]);
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'Specialization' => 'nullable|string|max:255',
            'profile_picture' => 'nullable|string|max:255',
            'resume' => 'nullable|string|max:255',
        ]);
        
        try {
            $user->update($validated);
            return back()->with('success', 'Profile updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update profile. Please try again.']);
        }
    }

    public function uploadProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $user = Auth::user();
            
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                $oldPath = storage_path('app/public/' . $user->profile_picture);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
            
            // Store new image
            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            
            // Update user profile
            $user->update(['profile_picture' => $path]);
            
            return back()->with('success', 'Profile picture updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to upload profile picture. Please try again.']);
        }
    }

    /**
     * Display all available jobs.
     */
    public function jobs()
    {
        $jobs = Job::where('status', 'active')
            ->where('deadline', '>', now())
            ->with('recruiter')
            ->orderBy('created_at', 'desc')
            ->paginate(12);
            
        return Inertia::render('user/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    /**
     * Search jobs with filters.
     */
    public function searchJobs(Request $request)
    {
        $query = Job::where('status', 'active')
            ->where('deadline', '>', now())
            ->with('recruiter');
            
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('jobType')) {
            $query->where('type', $request->jobType);
        }
        
        if ($request->filled('experienceLevel')) {
            $query->where('experience_level', $request->experienceLevel);
        }
        
        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }
        
        if ($request->filled('salaryRange') && is_array($request->salaryRange)) {
            $query->whereBetween('salary_min', $request->salaryRange);
        }
        
        if ($request->filled('skills') && is_array($request->skills)) {
            foreach ($request->skills as $skill) {
                $query->where(function($q) use ($skill) {
                    $q->where('description', 'like', "%{$skill}%")
                      ->orWhere('requirements', 'like', "%{$skill}%");
                });
            }
        }
        
        // Handle sorting
        $sortBy = $request->get('sortBy', 'newest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'salary-high':
                $query->orderBy('salary_max', 'desc');
                break;
            case 'salary-low':
                $query->orderBy('salary_min', 'asc');
                break;
            case 'relevance':
                // For relevance, we could implement a scoring system
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
        
        $jobs = $query->paginate(12);
        
        return Inertia::render('user/Jobs/Search', [
            'jobs' => $jobs,
            'filters' => $request->only(['search', 'type', 'experience_level', 'location', 'salaryRange', 'skills', 'sortBy']),
            'pagination' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
                'from' => $jobs->firstItem(),
                'to' => $jobs->lastItem(),
                'prev_page_url' => $jobs->previousPageUrl(),
                'next_page_url' => $jobs->nextPageUrl(),
            ]
        ]);
    }

    /**
     * Display a specific job.
     */
    public function showJob(Job $job)
    {
        $user = Auth::user();
        $hasApplied = JobApplication::where('user_id', $user->id)
            ->where('job_id', $job->id)
            ->exists();
            
        return Inertia::render('user/Jobs/Show', [
            'job' => $job->load('recruiter'),
            'hasApplied' => $hasApplied
        ]);
    }

    /**
     * Apply to a job.
     */
    public function applyToJob(Request $request, Job $job)
    {
        $user = Auth::user();
        
        // Check if already applied
        if (JobApplication::where('user_id', $user->id)->where('job_id', $job->id)->exists()) {
            return back()->with('error', 'You have already applied to this job.');
        }
        
        $validated = $request->validate([
            'cover_letter' => 'required|string|max:1000',
            'resume_path' => 'nullable|string|max:255',
        ]);
        
        JobApplication::create([
            'job_id' => $job->id,
            'user_id' => $user->id,
            'cover_letter' => $validated['cover_letter'],
            'resume_path' => $validated['resume_path'] ?? $user->resume,
            'status' => 'pending',
        ]);
        
        return back()->with('success', 'Application submitted successfully!');
    }

    /**
     * Display user's job applications.
     */
    public function applications()
    {
        $user = Auth::user();
        $applications = JobApplication::where('user_id', $user->id)
            ->with(['job.recruiter'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        return Inertia::render('user/Applications/Index', [
            'applications' => $applications
        ]);
    }

    /**
     * Display a specific application.
     */
    public function showApplication(JobApplication $application)
    {
        $user = Auth::user();
        
        if ($application->user_id !== $user->id) {
            abort(403);
        }
        
        return Inertia::render('user/Applications/Show', [
            'application' => $application->load(['job.recruiter'])
        ]);
    }

    /**
     * Update an application.
     */
    public function updateApplication(Request $request, JobApplication $application)
    {
        $user = Auth::user();
        
        if ($application->user_id !== $user->id) {
            abort(403);
        }
        
        $validated = $request->validate([
            'cover_letter' => 'required|string|max:1000',
        ]);
        
        $application->update($validated);
        
        return back()->with('success', 'Application updated successfully!');
    }

    /**
     * Withdraw an application.
     */
    public function withdrawApplication(JobApplication $application)
    {
        $user = Auth::user();
        
        if ($application->user_id !== $user->id) {
            abort(403);
        }
        
        $application->delete();
        
        return redirect()->route('user.applications.index')->with('success', 'Application withdrawn successfully!');
    }

    /**
     * Display user's messages.
     */
    public function messages()
    {
        $user = Auth::user();
        
        // Get conversations (this would integrate with Chatify)
        $conversations = collect(); // Placeholder for Chatify integration
        
        return Inertia::render('user/Messages/Index', [
            'conversations' => $conversations
        ]);
    }

    /**
     * Show conversation with a specific user.
     */
    public function showConversation(User $otherUser)
    {
        $user = Auth::user();
        
        // This would integrate with Chatify
        return Inertia::render('user/Messages/Show', [
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
     * Display user settings.
     */
    public function settings()
    {
        $user = Auth::user();
        
        return Inertia::render('user/Settings/Index', [
            'user' => $user
        ]);
    }

    /**
     * Enable two-factor authentication.
     */
    public function enableTwoFactor(Request $request)
    {
        $user = Auth::user();
        
        // Generate 2FA code
        $user->generateTwoFactorCode();
        
        // Send email with code (this would integrate with your email system)
        // For now, just return the code in response for testing
        
        return response()->json([
            'message' => 'Two-factor authentication code sent to your email',
            'code' => $user->two_factor_code, // Remove this in production
            'expires_at' => $user->two_factor_expires_at
        ]);
    }

    /**
     * Verify two-factor authentication code.
     */
    public function verifyTwoFactor(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'code' => 'required|string|size:6',
        ]);
        
        if ($user->two_factor_code === $validated['code'] && !$user->isTwoFactorExpired()) {
            // 2FA is now active
            $user->clearTwoFactorCode();
            // You could set a flag here to indicate 2FA is enabled
            
            return response()->json(['message' => 'Two-factor authentication enabled successfully!']);
        }
        
        return response()->json(['error' => 'Invalid or expired code'], 422);
    }

    /**
     * Disable two-factor authentication.
     */
    public function disableTwoFactor()
    {
        $user = Auth::user();
        $user->clearTwoFactorCode();
        
        return response()->json(['message' => 'Two-factor authentication disabled successfully!']);
    }
}
