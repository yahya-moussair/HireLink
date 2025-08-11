<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            [
                'title' => 'Smart Job Matching',
                'description' => 'Let the right jobs find you. Our AI-powered algorithm connects your profile with the most relevant job opportunities — no more endless scrolling.',
                'image' => '/images/findJob.jpg',
                'icon_name' => 'Brain',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'One-Click Applications',
                'description' => 'Apply in seconds, not hours. Upload your CV once and apply to any job instantly with just one click.',
                'image' => '/images/apply.jpg',
                'icon_name' => 'Bolt',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Verified Companies',
                'description' => 'Opportunities you can trust. All employers are manually verified to ensure you only see real and reliable job offers.',
                'image' => '/images/security.jpg',
                'icon_name' => 'ShieldCheck',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Built-in Messaging System',
                'description' => 'Talk directly to recruiters. Communicate instantly and professionally with hiring managers using our secure in-app messaging.',
                'image' => '/images/messaging.jpg',
                'icon_name' => 'MessagesSquare',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Career Profile Builder',
                'description' => 'Stand out from the crowd. Build a powerful profile that showcases your skills, experience, and personality — better than a basic CV.',
                'image' => '/images/creer.jpg',
                'icon_name' => 'File',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Mobile Friendly & Fast',
                'description' => 'Search and apply anytime, anywhere. Optimized for speed and usability on all devices — from your phone to your desktop.',
                'image' => '/images/mobile.jpg',
                'icon_name' => 'TabletSmartphone',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }
    }
}
