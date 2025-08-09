<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'admin123',
            'Specialization' => 'specialization',
            'profile_picture' => 'Profile User',
            'resume' => 'Resume User',
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'recruiter',
            'email' => 'recruiter@example.com',
            'password' => 'recruiter123',
            'Specialization' => 'specialization',
            'profile_picture' => 'Profile User',
            'resume' => 'Resume User',
            'role' => 'recruiter',
        ]);
        User::create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => 'user123',
            'Specialization' => 'specialization',
            'profile_picture' => 'Profile User',
            'resume' => 'Resume User',
            'role' => 'user',
        ]);
        for ($i = 1; $i < 10; $i++) {
            # code...
            User::create([
                'name' => 'user' . $i,
                'email' => 'user' . $i . '@user.com',
                'password' => 'user123',
                // 'Specialization' => 'specialization' . $i,
                // 'profile_picture' => 'Profile User' . $i,
                'resume' => 'Resume User' . $i,
            ]);
        }
    }
}
