import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Briefcase, BarChart3 } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

const AdminDashboard = () => {
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

    const stats = [
        {
            title: 'Total Users',
            value: '1,234',
            description: 'Active platform users',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Active Recruiters',
            value: '89',
            description: 'Verified recruiters',
            icon: UserCheck,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Job Offers',
            value: '456',
            description: 'Published positions',
            icon: Briefcase,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Applications',
            value: '2,891',
            description: 'Total applications',
            icon: BarChart3,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ];

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest platform activities and updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">New recruiter registered</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Job offer published</p>
                                        <p className="text-xs text-gray-500">15 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">User profile updated</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common administrative tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                    <Users className="h-5 w-5 text-blue-600 mb-2" />
                                    <p className="font-medium text-sm">Manage Users</p>
                                    <p className="text-xs text-gray-500">View and edit users</p>
                                </button>
                                <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                    <UserCheck className="h-5 w-5 text-green-600 mb-2" />
                                    <p className="font-medium text-sm">Approve Recruiters</p>
                                    <p className="text-xs text-gray-500">Review applications</p>
                                </button>
                                <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                    <Briefcase className="h-5 w-5 text-purple-600 mb-2" />
                                    <p className="font-medium text-sm">Job Moderation</p>
                                    <p className="text-xs text-gray-500">Review job posts</p>
                                </button>
                                <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                    <BarChart3 className="h-5 w-5 text-orange-600 mb-2" />
                                    <p className="font-medium text-sm">View Reports</p>
                                    <p className="text-xs text-gray-500">Analytics & insights</p>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard;