import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Briefcase, BarChart3, Clock, Shield } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

const AdminDashboard = ({ stats, recentActivity, recentRegistrations }) => {
    const { auth } = usePage().props;
    
    const getDynamicSubtitle = () => {
        const currentHour = new Date().getHours();
        const userName = auth?.user?.name || 'Admin';
        
        let greeting;
        if (currentHour < 12) {
            greeting = 'Good morning';
        } else if (currentHour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        return `${greeting}, ${userName}! Monitor and manage your platform efficiently`;
    };

    const dashboardStats = [
        {
            title: 'Total Users',
            value: stats?.totalUsers?.toLocaleString() || '0',
            description: 'Active platform users',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Active Recruiters',
            value: stats?.activeRecruiters?.toLocaleString() || '0',
            description: 'Verified recruiters',
            icon: UserCheck,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Pending Recruiters',
            value: stats?.pendingRecruiters?.toLocaleString() || '0',
            description: 'Awaiting approval',
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Administrators',
            value: stats?.totalAdmins?.toLocaleString() || '0',
            description: 'System administrators',
            icon: Shield,
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
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">{getDynamicSubtitle()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat) => {
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest platform activities and updates</CardDescription>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Registrations</CardTitle>
                            <CardDescription>Latest user registrations on the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentRegistrations && recentRegistrations.length > 0 ? (
                                    recentRegistrations.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 ${getActivityColor(user.color)} rounded-full`}></div>
                                                <div>
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                                    {user.role}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{user.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-gray-500">No recent registrations</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href={route('admin.users.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <Users className="h-5 w-5 text-blue-600 mb-2" />
                                <p className="font-medium text-sm">Manage Users</p>
                                <p className="text-xs text-gray-500">View and edit users</p>
                            </Link>
                            <Link href={route('admin.recruiters.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <UserCheck className="h-5 w-5 text-green-600 mb-2" />
                                <p className="font-medium text-sm">Manage Recruiters</p>
                                <p className="text-xs text-gray-500">Review and approve</p>
                            </Link>
                            <Link href={route('admin.reports.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <BarChart3 className="h-5 w-5 text-orange-600 mb-2" />
                                <p className="font-medium text-sm">View Reports</p>
                                <p className="text-xs text-gray-500">Analytics & insights</p>
                            </Link>
                            <Link href={route('admin.users.create')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <Users className="h-5 w-5 text-purple-600 mb-2" />
                                <p className="font-medium text-sm">Add New User</p>
                                <p className="text-xs text-gray-500">Create user account</p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard;