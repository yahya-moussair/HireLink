<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
            'password' => Hash::make('admin123'),
            'Specialization' => 'specialization',
            'profile_picture' => null,
            'resume' => 'Resume User',
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'recruiter',
            'email' => 'recruiter@example.com',
            'password' => Hash::make('recruiter123'),
            'Specialization' => 'specialization',
            'profile_picture' => null,
            'resume' => 'Resume User',
            'role' => 'recruiter',
        ]);

        User::create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => Hash::make('user123'),
            'Specialization' => 'specialization',
            'profile_picture' => null,
            'resume' => 'Resume User',
            'role' => 'user',
        ]);

        // Create additional users
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => 'User ' . $i,
                'email' => 'user' . $i . '@example.com',
                'password' => Hash::make('password123'),
                'Specialization' => 'Specialization ' . $i,
                'profile_picture' => null,
                'resume' => 'Resume User ' . $i,
                'role' => 'user',
            ]);
        }
    }
}
