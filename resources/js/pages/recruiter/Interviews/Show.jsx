import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Calendar, 
    Clock, 
    Video, 
    Phone, 
    MapPin, 
    ArrowLeft,
    Edit,
    Trash2,
    User,
    Briefcase,
    Building,
    ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'Interviews',
        href: '/recruiter/interviews',
    },
    {
        title: 'Interview Details',
        href: '#',
    },
];

const ShowInterview = ({ interview }) => {
    const getStatusColor = (status) => {
        const colors = {
            'scheduled': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
            'rescheduled': 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'online':
                return Video;
            case 'phone':
                return Phone;
            case 'in-person':
                return MapPin;
            default:
                return Calendar;
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            'online': 'bg-purple-100 text-purple-800',
            'phone': 'bg-green-100 text-green-800',
            'in-person': 'bg-orange-100 text-orange-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const TypeIcon = getTypeIcon(interview.type);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Interview: ${interview.title}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={route('recruiter.interviews.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Interviews
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href={route('recruiter.interviews.edit', interview.id)}>
                            <Button variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Interview
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Interview Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Interview Info */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl text-[#00193f]">
                                            {interview.title}
                                        </CardTitle>
                                        <CardDescription className="mt-2">
                                            Interview scheduled with {interview.candidate?.name}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(interview.status)}>
                                            {interview.status}
                                        </Badge>
                                        <Badge className={getTypeColor(interview.type)}>
                                            {interview.type}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Date and Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Date & Time</p>
                                            <p className="font-medium">
                                                {new Date(interview.scheduled_at).toLocaleDateString()} at {new Date(interview.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Duration</p>
                                            <p className="font-medium">{interview.duration} minutes</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Interview Type Details */}
                                <div className="flex items-center space-x-3">
                                    <TypeIcon className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Interview Type</p>
                                        <p className="font-medium capitalize">{interview.type}</p>
                                    </div>
                                </div>

                                {/* Location or Meeting Link */}
                                {interview.type === 'in-person' && interview.location && (
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Location</p>
                                            <p className="font-medium">{interview.location}</p>
                                        </div>
                                    </div>
                                )}

                                {interview.type === 'online' && interview.meeting_link && (
                                    <div className="flex items-center space-x-3">
                                        <Video className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Meeting Link</p>
                                            <a 
                                                href={interview.meeting_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                Join Meeting
                                                <ExternalLink className="h-4 w-4 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                {interview.description && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Description</p>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            {interview.description}
                                        </p>
                                    </div>
                                )}

                                {/* Notes */}
                                {interview.notes && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Notes</p>
                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            {interview.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Feedback */}
                                {interview.feedback && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Feedback</p>
                                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                                            {interview.feedback}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Candidate Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Candidate
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium text-[#00193f]">
                                        {interview.candidate?.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">
                                        {interview.candidate?.email}
                                    </p>
                                </div>
                                {interview.candidate?.Specialization && (
                                    <div>
                                        <p className="text-sm text-gray-600">Specialization</p>
                                        <p className="font-medium">
                                            {interview.candidate.Specialization}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Job Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Briefcase className="h-5 w-5 mr-2" />
                                    Job Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Position</p>
                                    <p className="font-medium text-[#00193f]">
                                        {interview.jobApplication?.job?.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Company</p>
                                    <p className="font-medium flex items-center">
                                        <Building className="h-4 w-4 mr-1" />
                                        {interview.jobApplication?.job?.company_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-medium">
                                        {interview.jobApplication?.job?.location}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Type</p>
                                    <p className="font-medium capitalize">
                                        {interview.jobApplication?.job?.type}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('recruiter.interviews.edit', interview.id)} className="w-full">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Interview
                                    </Button>
                                </Link>
                                
                                {interview.type === 'online' && interview.meeting_link && (
                                    <a 
                                        href={interview.meeting_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                            <Video className="h-4 w-4 mr-2" />
                                            Join Meeting
                                        </Button>
                                    </a>
                                )}
                                
                                <Link href={route('recruiter.applications.show', interview.jobApplication?.id)} className="w-full">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        View Application
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowInterview;
