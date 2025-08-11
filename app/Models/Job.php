<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Job extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'description',
        'requirements',
        'location',
        'type',
        'experience_level',
        'salary_min',
        'salary_max',
        'salary_currency',
        'company_name',
        'company_description',
        'company_logo',
        'status',
        'recruiter_id',
        'deadline',
        'skills',
        'benefits',
        'views',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'skills' => 'array',
        'benefits' => 'array',
        'deadline' => 'datetime',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    /**
     * Get the recruiter that posted this job.
     */
    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recruiter_id');
    }

    /**
     * Get the applications for this job.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Get the formatted salary range.
     */
    public function getFormattedSalaryAttribute(): string
    {
        if ($this->salary_min && $this->salary_max) {
            return $this->salary_currency . ' ' . number_format($this->salary_min) . ' - ' . number_format($this->salary_max);
        } elseif ($this->salary_min) {
            return $this->salary_currency . ' ' . number_format($this->salary_min) . '+';
        } elseif ($this->salary_max) {
            return 'Up to ' . $this->salary_currency . ' ' . number_format($this->salary_max);
        }
        
        return 'Salary not specified';
    }

    /**
     * Check if job is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Check if job deadline has passed.
     */
    public function isExpired(): bool
    {
        return $this->deadline && now()->isAfter($this->deadline);
    }

    /**
     * Increment the view count for this job.
     */
    public function incrementViews(): void
    {
        $this->increment('views');
    }
}
