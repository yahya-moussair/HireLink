<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;
use App\Models\User;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get recruiter users
        $recruiters = User::where('role', 'recruiter')->get();
        
        if ($recruiters->isEmpty()) {
            // Create a default recruiter if none exists
            $recruiter = User::create([
                'name' => 'TechCorp Recruiter',
                'email' => 'recruiter@techcorp.com',
                'password' => bcrypt('recruiter123'),
                'role' => 'recruiter',
                'email_verified_at' => now(),
                'Specialization' => 'Technology Recruitment',
                'profile_picture' => 'TechCorp Profile',
                'resume' => 'TechCorp Resume',
            ]);
            $recruiters = collect([$recruiter]);
        }

        $jobs = [
            [
                'title' => 'Senior Full Stack Developer',
                'description' => 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
                'requirements' => 'Minimum 5 years of experience in web development, proficiency in React, Node.js, and Laravel, strong problem-solving skills, and experience with cloud platforms.',
                'location' => 'New York, NY',
                'type' => 'full-time',
                'experience_level' => 'senior',
                'salary_min' => 120000,
                'salary_max' => 180000,
                'salary_currency' => 'USD',
                'company_name' => 'TechCorp Solutions',
                'company_description' => 'Leading technology company specializing in innovative web solutions.',
                'skills' => ['React', 'Node.js', 'Laravel', 'MySQL', 'AWS', 'Git'],
                'benefits' => ['Health Insurance', '401k', 'Remote Work', 'Professional Development'],
                'deadline' => now()->addDays(30),
            ],
            [
                'title' => 'Frontend Developer',
                'description' => 'Join our creative team as a Frontend Developer. You will work on building beautiful, responsive user interfaces and collaborating with designers and backend developers.',
                'requirements' => '3+ years of experience in frontend development, strong knowledge of HTML, CSS, JavaScript, and modern frameworks like React or Vue.',
                'location' => 'San Francisco, CA',
                'type' => 'full-time',
                'experience_level' => 'mid',
                'salary_min' => 90000,
                'salary_max' => 130000,
                'salary_currency' => 'USD',
                'company_name' => 'DesignHub Inc',
                'company_description' => 'Creative digital agency focused on user experience and design.',
                'skills' => ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Figma'],
                'benefits' => ['Flexible Hours', 'Creative Environment', 'Health Benefits', 'Team Events'],
                'deadline' => now()->addDays(25),
            ],
            [
                'title' => 'Backend Developer (Laravel)',
                'description' => 'We need a skilled Laravel developer to build robust backend systems and APIs. You will work on scalable applications and database design.',
                'requirements' => 'Experience with Laravel framework, PHP, MySQL, RESTful APIs, and understanding of software architecture principles.',
                'location' => 'Remote',
                'type' => 'contract',
                'experience_level' => 'mid',
                'salary_min' => 80000,
                'salary_max' => 120000,
                'salary_currency' => 'USD',
                'company_name' => 'RemoteTech Solutions',
                'company_description' => 'Remote-first company building innovative software solutions.',
                'skills' => ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Docker', 'Git'],
                'benefits' => ['Remote Work', 'Flexible Schedule', 'Competitive Pay', 'Learning Budget'],
                'deadline' => now()->addDays(20),
            ],
            [
                'title' => 'UI/UX Designer',
                'description' => 'Create amazing user experiences as our UI/UX Designer. You will design intuitive interfaces and conduct user research to improve our products.',
                'requirements' => 'Portfolio demonstrating UI/UX skills, experience with design tools, understanding of user-centered design principles, and ability to conduct user research.',
                'location' => 'Austin, TX',
                'type' => 'full-time',
                'experience_level' => 'mid',
                'salary_min' => 85000,
                'salary_max' => 125000,
                'salary_currency' => 'USD',
                'company_name' => 'Creative Studios',
                'company_description' => 'Boutique design studio creating memorable digital experiences.',
                'skills' => ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
                'benefits' => ['Creative Freedom', 'Health Insurance', 'Professional Tools', 'Team Collaboration'],
                'deadline' => now()->addDays(35),
            ],
            [
                'title' => 'DevOps Engineer',
                'description' => 'Join our infrastructure team as a DevOps Engineer. You will manage cloud infrastructure, implement CI/CD pipelines, and ensure system reliability.',
                'requirements' => 'Experience with AWS/Azure, Docker, Kubernetes, CI/CD tools, and monitoring systems. Strong scripting skills required.',
                'location' => 'Seattle, WA',
                'type' => 'full-time',
                'experience_level' => 'senior',
                'salary_min' => 130000,
                'salary_max' => 190000,
                'salary_currency' => 'USD',
                'company_name' => 'CloudTech Systems',
                'company_description' => 'Enterprise cloud solutions provider with focus on scalability and security.',
                'skills' => ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Python'],
                'benefits' => ['Competitive Salary', 'Stock Options', 'Health Benefits', 'Professional Development'],
                'deadline' => now()->addDays(40),
            ],
        ];

        foreach ($jobs as $jobData) {
            $recruiter = $recruiters->random();
            Job::create(array_merge($jobData, [
                'recruiter_id' => $recruiter->id,
                'status' => 'active',
            ]));
        }
    }
}
