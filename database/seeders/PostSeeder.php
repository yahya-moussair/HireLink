<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i < 10; $i++) {
            # code...
            Post::create([
                'title' => 'title' . $i,
                'description' => 'description' . $i,
                'likes' => random_int(0 , 100),
                'user_id' => User::inRandomOrder()->first()->id,
            ]);
        }
    }
}
