<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Attributes that should be appended to model's array / JSON form.
     * Ensures frontend receives fully-qualified image URLs.
     */
    protected $appends = [
        'profile_picture_url',
        'avatar_url',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'Specialization',
        'profile_picture',
        'resume',
        'role',
        'two_factor_code',
        'two_factor_expires_at',
        'avatar',
        'dark_mode',
        'messenger_color'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code',
        'two_factor_expires_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_expires_at' => 'datetime',
        ];
    }

    /**
     * Get the posts for the user.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get the jobs posted by the recruiter.
     */
    public function postedJobs(): HasMany
    {
        return $this->hasMany(Job::class, 'recruiter_id');
    }

    /**
     * Get the job applications by the user.
     */
    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is recruiter.
     */
    public function isRecruiter(): bool
    {
        return $this->role === 'recruiter';
    }

    /**
     * Check if user is regular user.
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Check if user has 2FA enabled.
     */
    public function hasTwoFactorEnabled(): bool
    {
        return $this->two_factor_code !== null;
    }

    /**
     * Check if 2FA code is expired.
     */
    public function isTwoFactorExpired(): bool
    {
        return $this->two_factor_expires_at && now()->isAfter($this->two_factor_expires_at);
    }

    /**
     * Generate new 2FA code.
     */
    public function generateTwoFactorCode(): void
    {
        $this->two_factor_code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $this->two_factor_expires_at = now()->addMinutes(10);
        $this->save();
    }

    /**
     * Clear 2FA code.
     */
    public function clearTwoFactorCode(): void
    {
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    /**
     * Get the user's profile picture URL.
     */
    public function getProfilePictureUrlAttribute()
    {
        if ($this->profile_picture) {
            return asset('storage/' . $this->profile_picture);
        }
        return null;
    }

    /**
     * Get the user's avatar URL (Chatify avatar stored in public disk).
     */
    public function getAvatarUrlAttribute()
    {
        $folder = config('chatify.user_avatar.folder', 'users-avatar');
        $default = config('chatify.user_avatar.default', 'avatar.png');

        $avatarFile = $this->avatar ?: $default;
        // If user has a custom uploaded avatar file, point to storage path
        if ($this->avatar && $this->avatar !== $default) {
            return asset('storage/' . trim($folder, '/'). '/' . $avatarFile);
        }
        // Fallback to a public image that exists
        return asset('images/logo.png');
    }

    /**
     * Get the interviews where the user is the recruiter.
     */
    public function recruiterInterviews(): HasMany
    {
        return $this->hasMany(Interview::class, 'recruiter_id');
    }

    /**
     * Get the interviews where the user is the candidate.
     */
    public function candidateInterviews(): HasMany
    {
        return $this->hasMany(Interview::class, 'candidate_id');
    }

    /**
     * Get all interviews for the user (both as recruiter and candidate).
     */
    public function interviews()
    {
        return Interview::where('recruiter_id', $this->id)
                       ->orWhere('candidate_id', $this->id);
    }

    /**
     * Get the messages sent by the user.
     */
    public function sentMessages(): HasMany
    {
        return $this->hasMany(\App\Models\ChMessage::class, 'from_id');
    }

    /**
     * Get the messages received by the user.
     */
    public function receivedMessages(): HasMany
    {
        return $this->hasMany(\App\Models\ChMessage::class, 'to_id');
    }

    /**
     * Get the user's favorites.
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(\App\Models\ChFavorite::class, 'user_id');
    }

    /**
     * Get the user's favorite conversations.
     */
    public function favoriteConversations(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\ChMessage::class, 'ch_favorites', 'user_id', 'favorite_id');
    }
}
