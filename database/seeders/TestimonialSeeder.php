<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sarah El Amrani',
                'role' => 'Frontend Developer',
                'company' => 'TechVista',
                'quote' => 'HireLink matched me with the perfect job in just days! The application process was smooth and fast.',
                'image' => '/images/profile1.jpg',
                'rate' => 5,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Ahmed Benyahia',
                'role' => 'Full Stack Engineer',
                'company' => 'InnoSoft',
                'quote' => 'Thanks to HireLink, I landed a role that fits my skills and career goals perfectly.',
                'image' => '/images/profile2.jpg',
                'rate' => 4,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Lina Haddad',
                'role' => 'HR Manager',
                'company' => 'PeopleBridge',
                'quote' => "We found amazing talent through HireLink — it's now our go-to hiring platform.",
                'image' => '/images/profile3.jpg',
                'rate' => 5,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Omar Qassimi',
                'role' => 'UI/UX Designer',
                'company' => 'CreativeDots',
                'quote' => 'The portfolio feature helped me showcase my work and get noticed by top companies.',
                'image' => '/images/profile4.jpg',
                'rate' => 4,
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
