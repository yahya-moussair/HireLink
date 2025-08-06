<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 1; $i < 10; $i++) {
            # code...
            Comment::create([
                'content' => 'content' . $i,
                'likes' => random_int(0 , 100),
                'post_id' => Post::inRandomOrder()->first()->id,
            ]);
        }
    }
}
