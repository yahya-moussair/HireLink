import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    BarChart3, TrendingUp, Users, Briefcase, 
    Eye, FileText, CheckCircle, XCircle,
    Calendar, DollarSign, Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'Analytics',
        href: '/recruiter/analytics',
    },
];

const AnalyticsIndex = ({ analytics }) => {
    const stats = [
        {
            title: 'Total Jobs Posted',
            value: analytics?.totalJobs || 0,
            description: 'All time job postings',
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Active Jobs',
            value: analytics?.activeJobs || 0,
            description: 'Currently active postings',
            icon: Target,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Total Applications',
            value: analytics?.totalApplications || 0,
            description: 'Applications received',
            icon: FileText,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Hired Candidates',
            value: analytics?.hiredCount || 0,
            description: 'Successful hires',
            icon: CheckCircle,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    const getSuccessRateColor = (rate) => {
        if (rate >= 80) return 'text-green-600';
        if (rate >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getSuccessRateBadge = (rate) => {
        if (rate >= 80) return 'bg-green-100 text-green-800';
        if (rate >= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">Analytics</h1>
                        <p className="text-[#202b61] text-sm">Track your recruitment performance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-[#2980d1]" />
                        <span className="text-sm text-gray-600">Performance Overview</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Success Rate</CardTitle>
                            <CardDescription>Your hiring success rate over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Overall Success Rate</span>
                                    <Badge className={getSuccessRateBadge(analytics?.successRate || 0)}>
                                        {analytics?.successRate || 0}%
                                    </Badge>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${getSuccessRateColor(analytics?.successRate || 0).replace('text-', 'bg-')}`}
                                        style={{ width: `${analytics?.successRate || 0}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Based on {analytics?.totalApplications || 0} total applications
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Application Status</CardTitle>
                            <CardDescription>Distribution of application statuses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {analytics?.applicationStatuses?.map((status) => (
                                    <div key={status.status} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                                            <span className="text-sm capitalize">{status.status}</span>
                                        </div>
                                        <span className="text-sm font-medium">{status.count}</span>
                                    </div>
                                )) || (
                                    <div className="text-center py-4 text-gray-500">
                                        No application data available
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest recruitment activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics?.recentActivity?.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.title}</p>
                                        <p className="text-xs text-gray-500">{activity.description}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{activity.time}</span>
                                </div>
                            )) || (
                                <div className="text-center py-8 text-gray-500">
                                    <BarChart3 className="mx-auto mb-2 h-8 w-8" />
                                    <p>No recent activity</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default AnalyticsIndex;
