import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    Award,
    ArrowLeft,
    Calendar,
    Video,
    Phone,
    MapPin as MapPinIcon
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Recruiter Dashboard',
        href: '/recruiter',
    },
];

const RecruiterDashboard = ({ user, stats, recentApplications, activeJobs, topCandidates, recentActivity, todayInterviews, upcomingInterviews }) => {
    const { auth } = usePage().props;
    const [activeView, setActiveView] = useState('dashboard');
    
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
        {
            title: 'Today\'s Interviews',
            value: stats?.todayInterviews?.toLocaleString() || '0',
            description: 'Scheduled for today',
            icon: Calendar,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Upcoming Interviews',
            value: stats?.upcomingInterviews?.toLocaleString() || '0',
            description: 'Scheduled interviews',
            icon: Video,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
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

    const getInterviewTypeIcon = (type) => {
        switch (type) {
            case 'online':
                return Video;
            case 'phone':
                return Phone;
            case 'in-person':
                return MapPinIcon;
            default:
                return Calendar;
        }
    };

    const renderDashboardView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Recruiter Dashboard</h1>
                    <p className="text-gray-600 mt-2">{getDynamicSubtitle()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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

            {/* Today's Interviews */}
            {todayInterviews && todayInterviews.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Interviews</CardTitle>
                        <CardDescription>Your scheduled interviews for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {todayInterviews.map((interview) => {
                                const TypeIcon = getInterviewTypeIcon(interview.type);
                                return (
                                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <div>
                                                <p className="text-sm font-medium">{interview.title}</p>
                                                <p className="text-xs text-gray-600">
                                                    {interview.candidate?.name} • {interview.jobApplication?.job?.title}
                                                </p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <TypeIcon className="h-3 w-3 text-gray-500" />
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(interview.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                    {interview.type === 'online' && interview.meeting_link && (
                                                        <a 
                                                            href={interview.meeting_link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-600 hover:underline"
                                                        >
                                                            Join Meeting
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs bg-orange-100 px-2 py-1 rounded-full text-orange-800">
                                                Today
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Upcoming Interviews */}
            {upcomingInterviews && upcomingInterviews.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Interviews</CardTitle>
                        <CardDescription>Your scheduled interviews for the coming days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingInterviews.map((interview) => {
                                const TypeIcon = getInterviewTypeIcon(interview.type);
                                return (
                                    <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <div>
                                                <p className="text-sm font-medium">{interview.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {interview.candidate?.name} • {interview.jobApplication?.job?.title}
                                                </p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <TypeIcon className="h-3 w-3 text-gray-500" />
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(interview.scheduled_at).toLocaleDateString()} at {new Date(interview.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-800">
                                                {new Date(interview.scheduled_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );

    const renderPostJobView = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveView('dashboard')}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Post New Job</CardTitle>
                    <CardDescription>Create a new job posting to attract candidates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <Plus className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Create Job Posting</h3>
                        <p className="text-gray-600 mb-6">Use the navigation menu to access the job creation form</p>
                        <Link href={route('recruiter.jobs.create')}>
                            <Button>Go to Job Creation</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderBrowseCandidatesView = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveView('dashboard')}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Browse Candidates</CardTitle>
                    <CardDescription>Search and discover talented candidates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Find Talent</h3>
                        <p className="text-gray-600 mb-6">Use the navigation menu to browse and search candidates</p>
                        <Link href={route('recruiter.candidates.index')}>
                            <Button>Browse Candidates</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderReviewApplicationsView = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveView('dashboard')}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Review Applications</CardTitle>
                    <CardDescription>Process and manage job applications</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Application Management</h3>
                        <p className="text-gray-600 mb-6">Use the navigation menu to review and process applications</p>
                        <Link href={route('recruiter.applications.index')}>
                            <Button>Review Applications</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderAnalyticsView = () => (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveView('dashboard')}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Analytics & Insights</CardTitle>
                    <CardDescription>View performance metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <BarChart3 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                        <p className="text-gray-600 mb-6">Use the navigation menu to access detailed analytics</p>
                        <Link href={route('recruiter.analytics.index')}>
                            <Button>View Analytics</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case 'post-job':
                return renderPostJobView();
            case 'browse-candidates':
                return renderBrowseCandidatesView();
            case 'review-applications':
                return renderReviewApplicationsView();
            case 'analytics':
                return renderAnalyticsView();
            default:
                return renderDashboardView();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recruiter Dashboard" />
            {renderContent()}
        </AppLayout>
    );
};

export default RecruiterDashboard;
