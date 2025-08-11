<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::middleware('admin')->name('admin.')->group(function () {
        Route::get('admin', [AdminController::class, 'index'])->name('dashboard');
        Route::get('admin/users', [AdminController::class, 'users'])->name('users.index');
        Route::get('admin/users/create', [AdminController::class, 'createUser'])->name('users.create');
        Route::post('admin/users', [AdminController::class, 'storeUser'])->name('users.store');
        Route::get('admin/users/{user}', [AdminController::class, 'showUser'])->name('users.show');
        Route::get('admin/users/{user}/edit', [AdminController::class, 'editUser'])->name('users.edit');
        Route::put('admin/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::delete('admin/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');
        
        Route::get('admin/recruiters', [AdminController::class, 'recruiters'])->name('recruiters.index');
        Route::get('admin/recruiters/create', [AdminController::class, 'createRecruiter'])->name('recruiters.create');
        Route::post('admin/recruiters', [AdminController::class, 'storeRecruiter'])->name('recruiters.store');
        Route::get('admin/recruiters/{user}', [AdminController::class, 'showRecruiter'])->name('recruiters.show');
        Route::get('admin/recruiters/{user}/edit', [AdminController::class, 'editRecruiter'])->name('recruiters.edit');
        Route::put('admin/recruiters/{user}', [AdminController::class, 'updateRecruiter'])->name('recruiters.update');
        Route::delete('admin/recruiters/{user}', [AdminController::class, 'destroyRecruiter'])->name('recruiters.destroy');
        Route::post('admin/recruiters/{user}/approve', [AdminController::class, 'approveRecruiter'])->name('recruiters.approve');
        Route::post('admin/recruiters/{user}/suspend', [AdminController::class, 'suspendRecruiter'])->name('recruiters.suspend');
        
        Route::get('admin/reports', [AdminController::class, 'reports'])->name('reports.index');
        
        Route::get('admin/test-approval/{user}', function($user) {
            $recruiter = \App\Models\User::findOrFail($user);
            $before = $recruiter->email_verified_at;
            $recruiter->update(['email_verified_at' => now()]);
            $after = $recruiter->fresh()->email_verified_at;
            return response()->json([
                'before' => $before,
                'after' => $after,
                'success' => $after !== null
            ]);
        })->name('test.approval');
    });
    Route::middleware('user')->name('user.')->group(function () {
        Route::get('user', [UserController::class, 'index'])->name('dashboard');
        
        // Profile routes
        Route::get('user/profile', [UserController::class, 'profile'])->name('profile.index');
        Route::put('user/profile', [UserController::class, 'updateProfile'])->name('profile.update');
        Route::post('user/profile/upload-image', [UserController::class, 'uploadProfilePicture'])->name('profile.upload-image');
        
        // Job routes
        Route::get('user/jobs', [UserController::class, 'jobs'])->name('jobs.index');
        Route::get('user/jobs/search', [UserController::class, 'searchJobs'])->name('jobs.search');
        Route::get('user/jobs/{job}', [UserController::class, 'showJob'])->name('jobs.show');
        Route::post('user/jobs/{job}/apply', [UserController::class, 'applyToJob'])->name('jobs.apply');
        
        // Application routes
        Route::get('user/applications', [UserController::class, 'applications'])->name('applications.index');
        Route::get('user/applications/{application}', [UserController::class, 'showApplication'])->name('applications.show');
        Route::put('user/applications/{application}', [UserController::class, 'updateApplication'])->name('applications.update');
        Route::delete('user/applications/{application}', [UserController::class, 'withdrawApplication'])->name('applications.withdraw');
        
        // Message routes
        Route::get('user/messages', [UserController::class, 'messages'])->name('messages.index');
        Route::get('user/messages/{user}', [UserController::class, 'showConversation'])->name('messages.show');
        Route::post('user/messages/{user}', [UserController::class, 'sendMessage'])->name('messages.send');
        
        // Settings routes
        Route::get('user/settings', [UserController::class, 'settings'])->name('settings.index');
        Route::post('user/settings/two-factor', [UserController::class, 'enableTwoFactor'])->name('settings.two-factor.enable');
        Route::post('user/settings/two-factor/verify', [UserController::class, 'verifyTwoFactor'])->name('settings.two-factor.verify');
        Route::delete('user/settings/two-factor', [UserController::class, 'disableTwoFactor'])->name('settings.two-factor.disable');
    });
    Route::middleware('recruiter')->name('recruiter.')->group(function () {
        Route::get('recruiter', [RecruiterController::class, 'index'])->name('dashboard');
        
        // Job routes
        Route::get('recruiter/jobs', [RecruiterController::class, 'jobs'])->name('jobs.index');
        Route::get('recruiter/jobs/create', [RecruiterController::class, 'createJob'])->name('jobs.create');
        Route::post('recruiter/jobs', [RecruiterController::class, 'storeJob'])->name('jobs.store');
        Route::get('recruiter/jobs/{job}', [RecruiterController::class, 'showJob'])->name('jobs.show');
        Route::get('recruiter/jobs/{job}/edit', [RecruiterController::class, 'editJob'])->name('jobs.edit');
        Route::put('recruiter/jobs/{job}', [RecruiterController::class, 'updateJob'])->name('jobs.update');
        Route::delete('recruiter/jobs/{job}', [RecruiterController::class, 'destroyJob'])->name('jobs.destroy');
        
        // Candidate routes
        Route::get('recruiter/candidates', [RecruiterController::class, 'candidates'])->name('candidates.index');
        Route::get('recruiter/candidates/{user}', [RecruiterController::class, 'showCandidate'])->name('candidates.show');
        
        // Application routes
        Route::get('recruiter/applications', [RecruiterController::class, 'applications'])->name('applications.index');
        Route::get('recruiter/applications/{application}', [RecruiterController::class, 'showApplication'])->name('applications.show');
        Route::put('recruiter/applications/{application}', [RecruiterController::class, 'updateApplication'])->name('applications.update');
        
        // Message routes
        Route::get('recruiter/messages', [RecruiterController::class, 'messages'])->name('messages.index');
        Route::get('recruiter/messages/{user}', [RecruiterController::class, 'showConversation'])->name('messages.show');
        Route::post('recruiter/messages/{user}', [RecruiterController::class, 'sendMessage'])->name('messages.send');
        
        // Analytics routes
        Route::get('recruiter/analytics', [RecruiterController::class, 'analytics'])->name('analytics.index');
    });
    
});
// routes/web.php
// Route::post('/', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
