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
        for ($i = 1; $i < 10; $i++) {
            # code...
            User::create([
                'name' => 'user'.$i,
                'email' => 'user'.$i.'@user.com',
                'password' => 'user123',
                'Specialization' => 'specialization'.$i,
                'profile_picture' => 'Profile User'.$i,
                'resume' => 'Resume User'.$i,
            ]);
        }
    }
}
