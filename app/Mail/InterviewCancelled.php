<?php

namespace App\Mail;

use App\Models\Interview;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InterviewCancelled extends Mailable
{
    use Queueable, SerializesModels;

    public $interview;

    public function __construct(Interview $interview)
    {
        $this->interview = $interview;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Interview Cancelled - ' . $this->interview->title,
            from: config('mail.from.address'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.interview-cancelled',
            with: [
                'interview' => $this->interview,
                'candidate' => $this->interview->candidate,
                'recruiter' => $this->interview->recruiter,
                'job' => $this->interview->jobApplication->job,
            ],
        );
    }
}
