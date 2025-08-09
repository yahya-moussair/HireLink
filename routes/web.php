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
        //! More user routes
    });
    Route::middleware('recruiter')->name('recruiter.')->group(function () {
        Route::get('recruiter', [RecruiterController::class, 'index'])->name('dashboard');
        //! More user routes
    });
    
});
// routes/web.php
// Route::post('/', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
