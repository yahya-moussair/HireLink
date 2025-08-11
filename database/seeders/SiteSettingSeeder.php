<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'key' => 'site_name',
                'value' => 'HireLink',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website name',
            ],
            [
                'key' => 'site_description',
                'value' => 'Find your dream job or hire the perfect candidate with HireLink',
                'type' => 'string',
                'group' => 'general',
                'description' => 'Website description',
            ],
            [
                'key' => 'hero_title',
                'value' => 'Find Your Dream Job',
                'type' => 'string',
                'group' => 'content',
                'description' => 'Hero section title',
            ],
            [
                'key' => 'hero_subtitle',
                'value' => 'Connect with top employers and opportunities worldwide',
                'type' => 'string',
                'group' => 'content',
                'description' => 'Hero section subtitle',
            ],
            [
                'key' => 'contact_email',
                'value' => 'contact@hirelink.com',
                'type' => 'string',
                'group' => 'contact',
                'description' => 'Contact email address',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+1 (555) 123-4567',
                'type' => 'string',
                'group' => 'contact',
                'description' => 'Contact phone number',
            ],
            [
                'key' => 'social_facebook',
                'value' => 'https://facebook.com/hirelink',
                'type' => 'string',
                'group' => 'social',
                'description' => 'Facebook URL',
            ],
            [
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/hirelink',
                'type' => 'string',
                'group' => 'social',
                'description' => 'Twitter URL',
            ],
            [
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/hirelink',
                'type' => 'string',
                'group' => 'social',
                'description' => 'LinkedIn URL',
            ],
            [
                'key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'boolean',
                'group' => 'system',
                'description' => 'Maintenance mode status',
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
