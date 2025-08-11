import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    Users, 
    UserCheck, 
    Briefcase, 
    BarChart3, 
    TrendingUp, 
    TrendingDown, 
    Calendar,
    Download,
    Filter
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Reports & Analytics',
        href: '/admin/reports',
    },
];

const ReportsIndex = ({ stats, recentActivity, userGrowthData, roleDistribution }) => {
    const [timeRange, setTimeRange] = useState('30');
    const [reportType, setReportType] = useState('overview');

    const platformStats = [
        {
            title: 'Total Users',
            value: stats?.totalUsers?.toLocaleString() || '0',
            change: '+12%',
            changeType: 'increase',
            description: 'Active platform users',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Active Recruiters',
            value: stats?.activeRecruiters?.toLocaleString() || '0',
            change: '+5%',
            changeType: 'increase',
            description: 'Verified recruiters',
            icon: UserCheck,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Pending Recruiters',
            value: stats?.pendingRecruiters?.toLocaleString() || '0',
            change: '0%',
            changeType: 'neutral',
            description: 'Awaiting approval',
            icon: UserCheck,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Total Admins',
            value: stats?.totalAdmins?.toLocaleString() || '0',
            change: '0%',
            changeType: 'neutral',
            description: 'System administrators',
            icon: Users,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
    ];

    const getActivityColor = (color) => {
        const colorMap = {
            'green': 'bg-green-500',
            'blue': 'bg-blue-500',
            'purple': 'bg-purple-500',
            'red': 'bg-red-500',
            'orange': 'bg-orange-500',
            'yellow': 'bg-yellow-500'
        };
        return colorMap[color] || 'bg-gray-500';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports & Analytics" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
                        <p className="text-gray-600 mt-2">Platform insights and performance metrics</p>
                    </div>
                    <div className="flex gap-3">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Time Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                                <SelectItem value="365">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platformStats.map((stat) => {
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
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge 
                                            variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                                            className={stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 
                                                     stat.changeType === 'decrease' ? 'bg-red-100 text-red-800' : 
                                                     'bg-gray-100 text-gray-800'}
                                        >
                                            {stat.changeType === 'increase' ? (
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                            ) : stat.changeType === 'decrease' ? (
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                            ) : null}
                                            {stat.change}
                                        </Badge>
                                        <p className="text-xs text-gray-500">{stat.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                User Growth Trend
                            </CardTitle>
                            <CardDescription>Platform user growth over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userGrowthData && userGrowthData.length > 0 ? (
                                    userGrowthData.map((data, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-600">{data.month}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Users: {data.users}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-600">Recruiters: {data.recruiters}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">No growth data available</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                User Role Distribution
                            </CardTitle>
                            <CardDescription>Breakdown of users by role</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {roleDistribution && roleDistribution.length > 0 ? (
                                    roleDistribution.map((role) => (
                                        <div key={role.role} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600">{role.role}</span>
                                                <span className="text-sm text-gray-900">{role.count} ({role.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${role.color}`}
                                                    style={{ width: `${role.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">No role distribution data available</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-purple-600" />
                            Recent Platform Activity
                        </CardTitle>
                        <CardDescription>Latest activities and system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity && recentActivity.length > 0 ? (
                                recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 ${getActivityColor(activity.color)} rounded-full`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">No recent activity</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Generate specific reports and analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Button variant="outline" className="h-20 flex-col">
                                <Users className="h-5 w-5 text-blue-600 mb-2" />
                                <span className="text-xs">User Report</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <UserCheck className="h-5 w-5 text-green-600 mb-2" />
                                <span className="text-xs">Recruiter Report</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <Briefcase className="h-5 w-5 text-purple-600 mb-2" />
                                <span className="text-xs">Job Report</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <BarChart3 className="h-5 w-5 text-orange-600 mb-2" />
                                <span className="text-xs">Analytics</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default ReportsIndex;
