<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'job_id',
        'user_id',
        'status',
        'cover_letter',
        'resume_path',
        'applied_at',
        'reviewed_at',
        'recruiter_notes',
        'interview_scheduled_at',
        'interview_type',
        'interview_notes',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'applied_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'interview_scheduled_at' => 'datetime',
    ];

    /**
     * Get the job that was applied to.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Get the user who applied.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the candidate who applied (alias for user).
     */
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Check if application is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if application is reviewed.
     */
    public function isReviewed(): bool
    {
        return $this->status === 'reviewed';
    }

    /**
     * Check if application is shortlisted.
     */
    public function isShortlisted(): bool
    {
        return $this->status === 'shortlisted';
    }

    /**
     * Check if application has interview scheduled.
     */
    public function hasInterviewScheduled(): bool
    {
        return $this->interview_scheduled_at !== null;
    }

    /**
     * Get status badge color.
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800',
            'reviewed' => 'bg-blue-100 text-blue-800',
            'shortlisted' => 'bg-green-100 text-green-800',
            'interviewed' => 'bg-purple-100 text-purple-800',
            'offered' => 'bg-emerald-100 text-emerald-800',
            'rejected' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
