import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Briefcase, 
    FileText, 
    MessageSquare, 
    Users, 
    BarChart3, 
    Clock, 
    Eye, 
    TrendingUp,
    Plus,
    Star,
    CheckCircle,
    XCircle,
    MapPin,
    Building,
    Award
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Recruiter Dashboard',
        href: '/recruiter',
    },
];

const RecruiterDashboard = ({ user, stats, recentApplications, activeJobs, topCandidates, recentActivity }) => {
    const { auth } = usePage().props;
    
    const getDynamicSubtitle = () => {
        const currentHour = new Date().getHours();
        const userName = auth?.user?.name || 'Recruiter';
        
        let greeting;
        if (currentHour < 12) {
            greeting = 'Good morning';
        } else if (currentHour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        return `${greeting}, ${userName}! Manage your job postings and find the best candidates`;
    };

    const dashboardStats = [
        {
            title: 'Active Jobs',
            value: stats?.activeJobs?.toLocaleString() || '0',
            description: 'Currently posted jobs',
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Total Applications',
            value: stats?.totalApplications?.toLocaleString() || '0',
            description: 'Applications received',
            icon: FileText,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'New Applications',
            value: stats?.newApplications?.toLocaleString() || '0',
            description: 'Last 7 days',
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Success Rate',
            value: `${stats?.successRate || 0}%`,
            description: 'Hiring success rate',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
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
            <Head title="Recruiter Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Recruiter Dashboard</h1>
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Applications</CardTitle>
                            <CardDescription>Latest candidate applications for your jobs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentApplications && recentApplications.length > 0 ? (
                                    recentApplications.slice(0, 5).map((application) => (
                                        <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <div>
                                                    <p className="text-sm font-medium">{application.candidate?.name}</p>
                                                    <p className="text-xs text-gray-500">Applied for {application.job?.title}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-800">
                                                    New
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(application.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-500">No applications yet</p>
                                        <p className="text-xs text-gray-400 mt-1">Applications will appear here when candidates apply</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Jobs</CardTitle>
                            <CardDescription>Your currently posted job positions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {activeJobs && activeJobs.length > 0 ? (
                                    activeJobs.slice(0, 5).map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <div>
                                                    <p className="text-sm font-medium">{job.title}</p>
                                                    <p className="text-xs text-gray-500">{job.location} • {job.type}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-800">
                                                    {job.applications_count || 0} apps
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Posted {new Date(job.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-500">No active jobs</p>
                                        <p className="text-xs text-gray-400 mt-1">Start posting jobs to attract candidates</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common recruiter tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Link href={route('recruiter.jobs.create')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <Plus className="h-5 w-5 text-blue-600 mb-2" />
                                <p className="font-medium text-sm">Post New Job</p>
                                <p className="text-xs text-gray-500">Create job posting</p>
                            </Link>
                            <Link href={route('recruiter.candidates.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <Users className="h-5 w-5 text-green-600 mb-2" />
                                <p className="font-medium text-sm">Browse Candidates</p>
                                <p className="text-xs text-gray-500">Find talent</p>
                            </Link>
                            <Link href={route('recruiter.applications.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <FileText className="h-5 w-5 text-orange-600 mb-2" />
                                <p className="font-medium text-sm">Review Applications</p>
                                <p className="text-xs text-gray-500">Process applications</p>
                            </Link>
                            <Link href={route('recruiter.analytics.index')} className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                                <BarChart3 className="h-5 w-5 text-purple-600 mb-2" />
                                <p className="font-medium text-sm">View Analytics</p>
                                <p className="text-xs text-gray-500">Performance insights</p>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default RecruiterDashboard;
