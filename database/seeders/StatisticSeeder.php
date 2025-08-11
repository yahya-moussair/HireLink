<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Statistic;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            [
                'name' => 'total_jobs',
                'label' => 'Jobs Posted',
                'value' => 1250,
                'icon' => 'Briefcase',
                'color' => '#3B82F6',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'total_companies',
                'label' => 'Companies',
                'value' => 450,
                'icon' => 'Building',
                'color' => '#10B981',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'total_candidates',
                'label' => 'Candidates',
                'value' => 8500,
                'icon' => 'Users',
                'color' => '#F59E0B',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'successful_hires',
                'label' => 'Successful Hires',
                'value' => 3200,
                'icon' => 'CheckCircle',
                'color' => '#EF4444',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($statistics as $statistic) {
            Statistic::create($statistic);
        }
    }
}
