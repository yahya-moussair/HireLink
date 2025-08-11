<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Interview extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'job_application_id',
        'recruiter_id',
        'candidate_id',
        'title',
        'description',
        'scheduled_at',
        'type',
        'location',
        'meeting_link',
        'status',
        'notes',
        'feedback',
        'duration',
        'reminder_sent',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'reminder_sent' => 'boolean',
    ];

    /**
     * Get the job application for this interview.
     */
    public function jobApplication(): BelongsTo
    {
        return $this->belongsTo(JobApplication::class);
    }

    /**
     * Get the recruiter conducting the interview.
     */
    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recruiter_id');
    }

    /**
     * Get the candidate being interviewed.
     */
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'candidate_id');
    }

    /**
     * Get the job for this interview.
     */
    public function job(): BelongsTo
    {
        return $this->jobApplication->job;
    }

    /**
     * Check if interview is scheduled.
     */
    public function isScheduled(): bool
    {
        return $this->status === 'scheduled';
    }

    /**
     * Check if interview is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Check if interview is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Check if interview is today.
     */
    public function isToday(): bool
    {
        return $this->scheduled_at->isToday();
    }

    /**
     * Check if interview is in the past.
     */
    public function isPast(): bool
    {
        return $this->scheduled_at->isPast();
    }

    /**
     * Check if interview is in the future.
     */
    public function isFuture(): bool
    {
        return $this->scheduled_at->isFuture();
    }

    /**
     * Get status badge color.
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'scheduled' => 'bg-blue-100 text-blue-800',
            'completed' => 'bg-green-100 text-green-800',
            'cancelled' => 'bg-red-100 text-red-800',
            'rescheduled' => 'bg-yellow-100 text-yellow-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    /**
     * Get formatted scheduled time.
     */
    public function getFormattedScheduledTimeAttribute(): string
    {
        return $this->scheduled_at->format('M j, Y g:i A');
    }

    /**
     * Get formatted duration.
     */
    public function getFormattedDurationAttribute(): string
    {
        return $this->duration . ' minutes';
    }

    /**
     * Scope for upcoming interviews.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_at', '>', now())
                    ->where('status', 'scheduled');
    }

    /**
     * Scope for today's interviews.
     */
    public function scopeToday($query)
    {
        return $query->whereDate('scheduled_at', today())
                    ->where('status', 'scheduled');
    }

    /**
     * Scope for interviews needing reminders.
     */
    public function scopeNeedsReminder($query)
    {
        return $query->where('scheduled_at', '>', now())
                    ->where('scheduled_at', '<=', now()->addDay())
                    ->where('status', 'scheduled')
                    ->where('reminder_sent', false);
    }
}
