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
        // Get real-time platform statistics
        $stats = [
            'totalUsers' => User::count(),
            'activeRecruiters' => User::where('role', 'recruiter')->whereNotNull('email_verified_at')->count(),
            'pendingRecruiters' => User::where('role', 'recruiter')->whereNull('email_verified_at')->count(),
            'totalAdmins' => User::where('role', 'admin')->count(),
            'totalRegularUsers' => User::where('role', 'user')->count(),
        ];

        // Get recent user registrations
        $recentRegistrations = User::orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'time' => $user->created_at->diffForHumans(),
                    'type' => 'new_user',
                    'color' => $user->role === 'recruiter' ? 'green' : ($user->role === 'admin' ? 'red' : 'blue')
                ];
            });

        // Get recent activity (user updates, role changes, etc.)
        $recentActivity = collect($recentRegistrations)->take(3)->toArray();

        // Add some system events (you can expand this with actual activity logging)
        if ($recentActivity) {
            array_unshift($recentActivity, [
                'type' => 'system',
                'message' => 'Platform statistics updated',
                'time' => now()->subMinutes(5)->diffForHumans(),
                'color' => 'purple'
            ]);
        }

        return Inertia::render('dashboard/AdminDashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'recentRegistrations' => $recentRegistrations
        ]);
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
        
        // Add profile_picture_url attribute to each user
        $users->getCollection()->transform(function ($user) {
            $user->profile_picture_url = $user->profile_picture_url;
            return $user;
        });
        
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
        // Add profile_picture_url attribute
        $user->profile_picture_url = $user->profile_picture_url;
        
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

    public function reports()
    {
        // Get platform statistics
        $stats = [
            'totalUsers' => User::count(),
            'activeRecruiters' => User::where('role', 'recruiter')->whereNotNull('email_verified_at')->count(),
            'pendingRecruiters' => User::where('role', 'recruiter')->whereNull('email_verified_at')->count(),
            'totalJobs' => 0, // Placeholder - will be updated when job system is implemented
            'totalApplications' => 0, // Placeholder - will be updated when application system is implemented
        ];

        // Get user growth data for the last 6 months
        $userGrowthData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();
            
            $usersCount = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            $recruitersCount = User::where('role', 'recruiter')
                ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->count();
            
            $userGrowthData[] = [
                'month' => $date->format('M'),
                'users' => $usersCount,
                'recruiters' => $recruitersCount,
                'total' => $usersCount + $recruitersCount
            ];
        }

        // Get role distribution
        $roleDistribution = [
            [
                'role' => 'Users',
                'count' => User::where('role', 'user')->count(),
                'percentage' => 0,
                'color' => 'bg-green-500'
            ],
            [
                'role' => 'Recruiters',
                'count' => User::where('role', 'recruiter')->count(),
                'percentage' => 0,
                'color' => 'bg-blue-500'
            ],
            [
                'role' => 'Admins',
                'count' => User::where('role', 'admin')->count(),
                'percentage' => 0,
                'color' => 'bg-red-500'
            ],
        ];

        // Calculate percentages
        $totalUsers = $stats['totalUsers'];
        if ($totalUsers > 0) {
            foreach ($roleDistribution as &$role) {
                $role['percentage'] = round(($role['count'] / $totalUsers) * 100);
            }
        }

        // Get recent activity from actual user data
        $recentActivity = User::orderBy('updated_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                $lastUpdate = $user->updated_at;
                $isNew = $user->created_at->equalTo($user->updated_at);
                
                return [
                    'type' => $isNew ? 'new_user' : 'profile_updated',
                    'message' => $isNew ? "New {$user->role} registered: {$user->name}" : "Profile updated: {$user->name}",
                    'time' => $lastUpdate->diffForHumans(),
                    'color' => $user->role === 'recruiter' ? 'green' : ($user->role === 'admin' ? 'red' : 'blue'),
                    'user_id' => $user->id,
                    'user_name' => $user->name,
                    'user_role' => $user->role
                ];
            })
            ->toArray();

        // Add system events
        array_unshift($recentActivity, [
            'type' => 'system',
            'message' => 'Platform statistics updated',
            'time' => now()->subMinutes(5)->diffForHumans(),
            'color' => 'purple'
        ]);

        return Inertia::render('admin/Reports/Index', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'userGrowthData' => $userGrowthData,
            'roleDistribution' => $roleDistribution
        ]);
    }
}
