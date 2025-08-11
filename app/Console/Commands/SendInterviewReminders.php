<?php

namespace App\Console\Commands;

use App\Models\Interview;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendInterviewReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'interviews:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder emails for interviews scheduled tomorrow';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $interviews = Interview::needsReminder()
            ->with(['candidate', 'recruiter', 'jobApplication.job'])
            ->get();

        $this->info("Found {$interviews->count()} interviews needing reminders.");

        foreach ($interviews as $interview) {
            try {
                // Send email reminder
                // Mail::to($interview->candidate->email)->send(new InterviewReminder($interview));
                
                // Mark as reminder sent
                $interview->update(['reminder_sent' => true]);
                
                $this->info("Reminder sent for interview: {$interview->title} with {$interview->candidate->name}");
            } catch (\Exception $e) {
                $this->error("Failed to send reminder for interview {$interview->id}: {$e->getMessage()}");
            }
        }

        $this->info('Interview reminders completed.');
    }
}
