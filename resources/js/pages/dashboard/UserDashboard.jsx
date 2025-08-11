import { router } from "@inertiajs/react";
import Images from "../../constant/Index";
import { 
    Briefcase, 
    User, 
    FileText, 
    MessageSquare, 
    Search,
    MapPin,
    Clock,
    DollarSign,
    Building,
    TrendingUp,
    Calendar,
    Bell,
    Mail,
    Eye,
    Users,
    Target,
    Award,
    Home,
    Bookmark,
    Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const UserDashboard = ({ user, recommendedJobs, recentActivity, stats }) => {
    const handleLogOut = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const handleNavigation = (route) => {
        router.get(route);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <img src='/images/logo.png' alt="HireLink Logo" className="w-40"/>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, or people..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2980d1] focus:border-transparent w-80"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-[#00193f] hover:text-[#2980d1]">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-[#00193f] hover:text-[#2980d1]">
                                <Mail className="w-5 h-5" />
                            </Button>
                            <Button onClick={handleLogOut} variant="outline" size="sm" className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white">
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - LinkedIn Style Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="h-fit">
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    {/* Profile Section */}
                                    <div className="text-center pb-4 border-b border-gray-200">
                                        <div className="inline-block relative mb-3">
                                            <Avatar className="mx-auto w-16 h-16 border-2 border-white shadow-md">
                                                <AvatarImage src={user?.profile_picture_url} />
                                                <AvatarFallback className="text-lg bg-[#202b61] text-white">
                                                    {user?.name?.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <h3 className="font-semibold text-[#00193f] text-sm">{user?.name}</h3>
                                        <p className="text-[#202b61] text-xs">{user?.Specialization || 'Professional'}</p>
                                    </div>

                                    {/* Navigation Menu */}
                                    <div className="space-y-1 pt-2">
                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation(route('user.dashboard'))}
                                        >
                                            <Home className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Home</div>
                                                <div className="text-xs text-gray-500">Dashboard</div>
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation(route('user.jobs.index'))}
                                        >
                                            <Briefcase className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Jobs</div>
                                                <div className="text-xs text-gray-500">Find opportunities</div>
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation(route('user.applications.index'))}
                                        >
                                            <FileText className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Applications</div>
                                                <div className="text-xs text-gray-500">Track your applications</div>
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation('/chatify')}
                                        >
                                            <MessageSquare className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Messages</div>
                                                <div className="text-xs text-gray-500">Connect with recruiters</div>
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation(route('user.profile.index'))}
                                        >
                                            <User className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Profile</div>
                                                <div className="text-xs text-gray-500">View and edit profile</div>
                                            </div>
                                        </Button>

                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-gray-100"
                                            onClick={() => handleNavigation(route('profile.edit'))}
                                        >
                                            <Settings className="h-5 w-5 mr-3 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-sm text-gray-900">Settings</div>
                                                <div className="text-xs text-gray-500">Account preferences</div>
                                            </div>
                                        </Button>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="pt-4 border-t border-gray-200 space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center text-gray-600">
                                                <Eye className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Profile Views
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.profileViews || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center text-gray-600">
                                                <FileText className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Applications
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.totalApplications || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center text-gray-600">
                                                <Target className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Interviews
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.totalInterviews || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Jobs Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Jobs Matching Your Specialization */}
                            <div className="lg:col-span-2">
                                <Card className="bg-white border-0 shadow-lg">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center text-[#00193f]">
                                                    <Briefcase className="h-5 w-5 mr-2 text-[#2980d1]" />
                                                    Jobs for {user?.Specialization || 'Your Field'}
                                                </CardTitle>
                                                <CardDescription className="text-[#202b61]">
                                                    Opportunities matching your specialization
                                                </CardDescription>
                                            </div>
                                            <Button 
                                                onClick={() => handleNavigation(route('user.jobs.search'))}
                                                variant="outline" 
                                                size="sm"
                                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                            >
                                                View All
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {recommendedJobs && recommendedJobs.length > 0 ? (
                                            <div className="space-y-4">
                                                {recommendedJobs.slice(0, 3).map((job) => (
                                                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#2980d1] transition-all duration-300 cursor-pointer group">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="font-semibold text-lg text-[#00193f] group-hover:text-[#2980d1] transition-colors">{job.title}</h3>
                                                            <Badge variant="secondary" className="bg-[#EAF4FF] text-[#202b61] border-[#2980d1]">{job.type}</Badge>
                                                        </div>
                                                        <div className="flex items-center mb-3 text-sm text-gray-600">
                                                            <Building className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                            <span className="font-medium">{job.company_name}</span>
                                                            <span className="mx-2 text-gray-400">•</span>
                                                            <MapPin className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                <span className="flex items-center">
                                                                    <Clock className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                    {job.type}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <DollarSign className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                    {job.salary_range || 'Competitive'}
                                                                </span>
                                                            </div>
                                                            <Button 
                                                                size="sm" 
                                                                className="bg-[#202b61] hover:bg-[#2980d1] text-white transition-all duration-300"
                                                            >
                                                                Apply Now
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center">
                                                <Briefcase className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                                                <h3 className="text-lg font-medium text-[#00193f] mb-2">No jobs found</h3>
                                                <p className="mb-4 text-gray-600">Complete your profile to get personalized job recommendations</p>
                                                <Button 
                                                    onClick={() => handleNavigation(route('user.profile.index'))}
                                                    className="bg-[#202b61] hover:bg-[#2980d1] text-white transition-all duration-300"
                                                >
                                                    Complete Profile
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Notifications Section */}
                            <div className="lg:col-span-1">
                                <Card className="bg-white border-0 shadow-lg">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center text-[#00193f]">
                                            <Bell className="h-5 w-5 mr-2 text-[#2980d1]" />
                                            Notifications
                                        </CardTitle>
                                        <CardDescription className="text-[#202b61]">
                                            Recent updates and alerts
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                                <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-[#00193f] font-medium">New job match</p>
                                                    <p className="text-xs text-gray-600">Senior Developer at TechCorp</p>
                                                </div>
                                                <span className="text-xs text-gray-500">2h ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                                <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-[#00193f] font-medium">Application viewed</p>
                                                    <p className="text-xs text-gray-600">Your profile was viewed</p>
                                                </div>
                                                <span className="text-xs text-gray-500">1d ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                                <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-[#00193f] font-medium">New message</p>
                                                    <p className="text-xs text-gray-600">From HR Manager</p>
                                                </div>
                                                <span className="text-xs text-gray-500">3d ago</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center text-[#00193f]">
                                    <Calendar className="h-5 w-5 mr-2 text-[#2980d1]" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription className="text-[#202b61]">
                                    Your latest job applications and profile updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                        <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#00193f] font-medium">Profile updated</p>
                                            <p className="text-xs text-gray-600">You updated your profile information</p>
                                        </div>
                                        <span className="text-xs text-gray-500">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                        <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#00193f] font-medium">Application submitted</p>
                                            <p className="text-xs text-gray-600">You applied for Senior Developer position</p>
                                        </div>
                                        <span className="text-xs text-gray-500">1 day ago</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-[#EAF4FF] rounded-lg">
                                        <div className="w-2 h-2 bg-[#2980d1] rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-[#00193f] font-medium">Profile viewed</p>
                                            <p className="text-xs text-gray-600">Your profile was viewed by a recruiter</p>
                                        </div>
                                        <span className="text-xs text-gray-500">3 days ago</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
