<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InterviewController extends Controller
{
    /**
     * Display a listing of interviews for the recruiter.
     */
    public function index()
    {
        $user = auth()->user();
        
        $interviews = Interview::where('recruiter_id', $user->id)
            ->with(['candidate', 'jobApplication.job'])
            ->latest('scheduled_at')
            ->paginate(10);
        
        return Inertia::render('recruiter/Interviews/Index', [
            'interviews' => $interviews
        ]);
    }

    /**
     * Show the form for creating a new interview.
     */
    public function create(JobApplication $application)
    {
        $user = auth()->user();
        
        // Verify the application belongs to recruiter's job
        if ($application->job->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        return Inertia::render('recruiter/Interviews/Create', [
            'application' => $application->load(['candidate', 'job'])
        ]);
    }

    /**
     * Store a newly created interview.
     */
    public function store(Request $request, JobApplication $application)
    {
        $user = auth()->user();
        
        // Verify the application belongs to recruiter's job
        if ($application->job->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'scheduled_at' => 'required|date|after:now',
            'type' => 'required|in:online,phone,in-person',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url|max:255',
            'duration' => 'required|integer|min:15|max:480', // 15 minutes to 8 hours
            'notes' => 'nullable|string',
        ]);
        
        $interview = Interview::create([
            'job_application_id' => $application->id,
            'recruiter_id' => $user->id,
            'candidate_id' => $application->user_id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'scheduled_at' => $validated['scheduled_at'],
            'type' => $validated['type'],
            'location' => $validated['location'],
            'meeting_link' => $validated['meeting_link'],
            'duration' => $validated['duration'],
            'notes' => $validated['notes'],
            'status' => 'scheduled',
        ]);
        
        // Update application status
        $application->update(['status' => 'interviewed']);
        
        // Send email notification to candidate
        $this->sendInterviewNotification($interview);
        
        return redirect()->route('recruiter.interviews.index')
            ->with('success', 'Interview scheduled successfully!');
    }

    /**
     * Display the specified interview.
     */
    public function show(Interview $interview)
    {
        $user = auth()->user();
        
        // Verify the interview belongs to the recruiter
        if ($interview->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        $interview->load(['candidate', 'jobApplication.job']);
        
        return Inertia::render('recruiter/Interviews/Show', [
            'interview' => $interview
        ]);
    }

    /**
     * Show the form for editing the specified interview.
     */
    public function edit(Interview $interview)
    {
        $user = auth()->user();
        
        // Verify the interview belongs to the recruiter
        if ($interview->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        $interview->load(['candidate', 'jobApplication.job']);
        
        return Inertia::render('recruiter/Interviews/Edit', [
            'interview' => $interview
        ]);
    }

    /**
     * Update the specified interview.
     */
    public function update(Request $request, Interview $interview)
    {
        $user = auth()->user();
        
        // Verify the interview belongs to the recruiter
        if ($interview->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'scheduled_at' => 'required|date',
            'type' => 'required|in:online,phone,in-person',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url|max:255',
            'duration' => 'required|integer|min:15|max:480',
            'notes' => 'nullable|string',
            'status' => 'required|in:scheduled,completed,cancelled,rescheduled',
            'feedback' => 'nullable|string',
        ]);
        
        $interview->update($validated);
        
        // If status changed to completed, send feedback email
        if ($validated['status'] === 'completed' && $request->filled('feedback')) {
            $this->sendInterviewFeedback($interview);
        }
        
        return redirect()->route('recruiter.interviews.index')
            ->with('success', 'Interview updated successfully!');
    }

    /**
     * Remove the specified interview.
     */
    public function destroy(Interview $interview)
    {
        $user = auth()->user();
        
        // Verify the interview belongs to the recruiter
        if ($interview->recruiter_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
        
        // Send cancellation email to candidate before deleting
        $this->sendInterviewCancellation($interview);
        
        // Update application status back to 'reviewed' if it was 'interviewed'
        if ($interview->jobApplication->status === 'interviewed') {
            $interview->jobApplication->update(['status' => 'reviewed']);
        }
        
        // Delete the interview
        $interview->delete();
        
        return redirect()->route('recruiter.interviews.index')
            ->with('success', 'Interview cancelled successfully!');
    }

    /**
     * Get calendar data for interviews.
     */
    public function calendar()
    {
        $user = auth()->user();
        
        $interviews = Interview::where('recruiter_id', $user->id)
            ->with(['candidate', 'jobApplication.job'])
            ->get()
            ->map(function($interview) {
                return [
                    'id' => $interview->id,
                    'title' => $interview->title,
                    'start' => $interview->scheduled_at->format('Y-m-d H:i:s'),
                    'end' => $interview->scheduled_at->addMinutes($interview->duration)->format('Y-m-d H:i:s'),
                    'backgroundColor' => $this->getStatusColor($interview->status),
                    'borderColor' => '#202b61',
                    'extendedProps' => [
                        'candidate_name' => $interview->candidate->name,
                        'job_title' => $interview->jobApplication->job->title,
                        'interview_type' => $interview->type,
                        'location' => $interview->location,
                        'meeting_link' => $interview->meeting_link,
                        'status' => $interview->status,
                    ]
                ];
            });
        
        return response()->json($interviews);
    }

    /**
     * Get today's interviews.
     */
    public function today()
    {
        $user = auth()->user();
        
        $interviews = Interview::where('recruiter_id', $user->id)
            ->whereDate('scheduled_at', today())
            ->where('status', 'scheduled')
            ->with(['candidate', 'jobApplication.job'])
            ->orderBy('scheduled_at')
            ->get();
        
        return Inertia::render('recruiter/Interviews/Today', [
            'interviews' => $interviews
        ]);
    }

    /**
     * Get upcoming interviews.
     */
    public function upcoming()
    {
        $user = auth()->user();
        
        $interviews = Interview::where('recruiter_id', $user->id)
            ->where('scheduled_at', '>', now())
            ->where('status', 'scheduled')
            ->with(['candidate', 'jobApplication.job'])
            ->orderBy('scheduled_at')
            ->paginate(10);
        
        return Inertia::render('recruiter/Interviews/Upcoming', [
            'interviews' => $interviews
        ]);
    }

    /**
     * Send interview reminder emails.
     */
    public function sendReminders()
    {
        $interviews = Interview::needsReminder()->with(['candidate', 'recruiter'])->get();
        
        foreach ($interviews as $interview) {
            $this->sendInterviewReminder($interview);
            $interview->update(['reminder_sent' => true]);
        }
        
        return response()->json(['message' => 'Reminders sent successfully', 'count' => $interviews->count()]);
    }

    /**
     * Send interview notification email.
     */
    private function sendInterviewNotification(Interview $interview)
    {
        try {
            Mail::to($interview->candidate->email)->send(new \App\Mail\InterviewScheduled($interview));
        } catch (\Exception $e) {
            // Log the error but don't fail the interview creation
            \Log::error('Failed to send interview notification: ' . $e->getMessage());
        }
    }

    /**
     * Send interview reminder email.
     */
    private function sendInterviewReminder(Interview $interview)
    {
        // TODO: Implement email sending
        // Mail::to($interview->candidate->email)->send(new InterviewReminder($interview));
    }

    /**
     * Send interview feedback email.
     */
    private function sendInterviewFeedback(Interview $interview)
    {
        // TODO: Implement email sending
        // Mail::to($interview->candidate->email)->send(new InterviewFeedback($interview));
    }

    /**
     * Send interview cancellation email.
     */
    private function sendInterviewCancellation(Interview $interview)
    {
        try {
            Mail::to($interview->candidate->email)->send(new \App\Mail\InterviewCancelled($interview));
        } catch (\Exception $e) {
            \Log::error('Failed to send interview cancellation email: ' . $e->getMessage());
        }
    }

    /**
     * Get status color for calendar.
     */
    private function getStatusColor($status)
    {
        return match($status) {
            'scheduled' => '#2980d1',
            'completed' => '#27ae60',
            'cancelled' => '#e74c3c',
            'rescheduled' => '#f39c12',
            default => '#95a5a6',
        };
    }
}
