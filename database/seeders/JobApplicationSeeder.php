<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all jobs and users
        $jobs = Job::all();
        $users = User::where('role', 'user')->get();
        
        if ($jobs->isEmpty() || $users->isEmpty()) {
            return;
        }

        // Create some sample job applications
        $statuses = ['pending', 'reviewed', 'shortlisted', 'interviewed', 'offered', 'rejected'];
        
        foreach ($jobs as $job) {
            // Each job gets 2-5 applications
            $numApplications = rand(2, 5);
            
            for ($i = 0; $i < $numApplications; $i++) {
                $user = $users->random();
                $status = $statuses[array_rand($statuses)];
                
                $application = JobApplication::create([
                    'job_id' => $job->id,
                    'user_id' => $user->id,
                    'status' => $status,
                    'cover_letter' => 'I am excited to apply for the ' . $job->title . ' position. I believe my skills and experience make me a great fit for this role.',
                    'resume_path' => 'resumes/' . $user->name . '_resume.pdf',
                    'applied_at' => now()->subDays(rand(1, 30)),
                    'recruiter_notes' => $status === 'reviewed' ? 'Candidate shows potential, worth considering for next round.' : null,
                ]);
                
                // Add reviewed_at timestamp for reviewed applications
                if (in_array($status, ['reviewed', 'shortlisted', 'interviewed', 'offered', 'rejected'])) {
                    $application->update([
                        'reviewed_at' => now()->subDays(rand(1, 15))
                    ]);
                }
                
                // Add interview details for shortlisted and interviewed applications
                if (in_array($status, ['shortlisted', 'interviewed'])) {
                    $application->update([
                        'interview_scheduled_at' => now()->addDays(rand(1, 14)),
                        'interview_type' => ['phone', 'video', 'onsite'][array_rand(['phone', 'video', 'onsite'])],
                        'interview_notes' => $status === 'interviewed' ? 'Interview completed successfully. Candidate demonstrated strong technical skills.' : null
                    ]);
                }
            }
        }
    }
}
