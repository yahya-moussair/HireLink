<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard/AdminDashboard');
    }

    public function users(Request $request)
    {
        $query = User::query();
        
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('Specialization', 'like', '%' . $request->search . '%');
            });
        }
        
        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }
        
        $users = $query->orderBy('created_at', 'desc')->paginate(10);
        
        return Inertia::render('admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    public function createUser()
    {
        return Inertia::render('admin/Users/Create');
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,recruiter,admin',
            'Specialization' => 'nullable|string|max:255',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function showUser(User $user)
    {
        return Inertia::render('admin/Users/Show', [
            'user' => $user
        ]);
    }

    public function editUser(User $user)
    {
        return Inertia::render('admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:user,recruiter,admin',
            'Specialization' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroyUser(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    public function recruiters(Request $request)
    {
        $query = User::where('role', 'recruiter');
        
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('Specialization', 'like', '%' . $request->search . '%');
            });
        }
        
        if ($request->has('status') && $request->status) {
            if ($request->status === 'pending') {
                $query->whereNull('email_verified_at');
            } elseif ($request->status === 'approved') {
                $query->whereNotNull('email_verified_at');
            }
        }
        
        $recruiters = $query->orderBy('created_at', 'desc')->paginate(10);
        
        return Inertia::render('admin/Recruiters/Index', [
            'recruiters' => $recruiters,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function createRecruiter()
    {
        return Inertia::render('admin/Recruiters/Create');
    }

    public function storeRecruiter(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'Specialization' => 'required|string|max:255',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'recruiter';
        $validated['email_verified_at'] = null;

        User::create($validated);

        return redirect()->route('admin.recruiters.index')
            ->with('success', 'Recruiter created successfully and is pending approval.');
    }

    public function showRecruiter(User $user)
    {
        if ($user->role !== 'recruiter') {
            abort(404);
        }
        
        return Inertia::render('admin/Recruiters/Show', [
            'recruiter' => $user
        ]);
    }

    public function editRecruiter(User $user)
    {
        if ($user->role !== 'recruiter') {
            abort(404);
        }
        
        return Inertia::render('admin/Recruiters/Edit', [
            'recruiter' => $user
        ]);
    }

    public function updateRecruiter(Request $request, User $user)
    {
        if ($user->role !== 'recruiter') {
            abort(404);
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'Specialization' => 'required|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.recruiters.index')
            ->with('success', 'Recruiter updated successfully.');
    }

    public function destroyRecruiter(User $user)
    {
        if ($user->role !== 'recruiter') {
            abort(404);
        }
        
        $user->delete();

        return redirect()->route('admin.recruiters.index')
            ->with('success', 'Recruiter deleted successfully.');
    }

    public function approveRecruiter(User $user)
    {
        \Log::info('Attempting to approve recruiter', ['user_id' => $user->id, 'name' => $user->name, 'role' => $user->role]);
        
        if ($user->role !== 'recruiter') {
            \Log::error('User is not a recruiter', ['user_id' => $user->id, 'role' => $user->role]);
            abort(404, 'User is not a recruiter');
        }
        
        if ($user->email_verified_at) {
            \Log::info('Recruiter already approved', ['user_id' => $user->id]);
            return redirect()->back()
                ->with('error', 'Recruiter is already approved.');
        }
        
        $updated = $user->update([
            'email_verified_at' => now()
        ]);
        
        \Log::info('Recruiter approval result', ['user_id' => $user->id, 'updated' => $updated, 'email_verified_at' => $user->fresh()->email_verified_at]);

        return redirect()->route('admin.recruiters.index')
            ->with('success', "Recruiter {$user->name} has been approved successfully.");
    }

    public function suspendRecruiter(User $user)
    {
        if ($user->role !== 'recruiter') {
            abort(404, 'User is not a recruiter');
        }
        
        if (!$user->email_verified_at) {
            return redirect()->back()
                ->with('error', 'Recruiter is already pending approval.');
        }
        
        $user->update([
            'email_verified_at' => null
        ]);

        return redirect()->route('admin.recruiters.index')
            ->with('success', "Recruiter {$user->name} has been suspended successfully.");
    }

}
