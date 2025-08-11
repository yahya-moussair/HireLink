<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Testimonial;
use App\Models\Feature;
use App\Models\Statistic;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Schema;

class HomeController extends Controller
{
    public function index()
    {
        $testimonials = Schema::hasTable('testimonials')
            ? Testimonial::active()->ordered()->get()
            : collect();

        $features = Schema::hasTable('features')
            ? Feature::active()->ordered()->get()
            : collect();

        $statistics = Schema::hasTable('statistics')
            ? Statistic::active()->ordered()->get()
            : collect();

        $hasSettings = Schema::hasTable('site_settings');

        $data = [
            'testimonials' => $testimonials,
            'features' => $features,
            'statistics' => $statistics,
            'siteSettings' => [
                'site_name' => $hasSettings ? SiteSetting::get('site_name', 'HireLink') : 'HireLink',
                'site_description' => $hasSettings ? SiteSetting::get('site_description', 'Find your dream job or hire the perfect candidate') : 'Find your dream job or hire the perfect candidate',
                'hero_title' => $hasSettings ? SiteSetting::get('hero_title', 'Find Your Dream Job') : 'Find Your Dream Job',
                'hero_subtitle' => $hasSettings ? SiteSetting::get('hero_subtitle', 'Connect with top employers and opportunities worldwide') : 'Connect with top employers and opportunities worldwide',
                'contact_email' => $hasSettings ? SiteSetting::get('contact_email', 'contact@hirelink.com') : 'contact@hirelink.com',
                'contact_phone' => $hasSettings ? SiteSetting::get('contact_phone', '+1 (555) 123-4567') : '+1 (555) 123-4567',
                'social_facebook' => $hasSettings ? SiteSetting::get('social_facebook', '') : '',
                'social_twitter' => $hasSettings ? SiteSetting::get('social_twitter', '') : '',
                'social_linkedin' => $hasSettings ? SiteSetting::get('social_linkedin', '') : '',
            ],
        ];

        return Inertia::render('Home/Home', $data);
    }
}
