import React, { useState } from 'react';
import { router } from "@inertiajs/react";
import { 
    ArrowLeft, MapPin, Building, Clock, DollarSign, Calendar, 
    Users, Mail, Phone, FileText, CheckCircle, XCircle, Clock as ClockIcon,
    AlertCircle, MessageSquare, Download, Edit, Trash2, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ApplicationShow = ({ application, user }) => {
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const handleWithdraw = () => {
        if (confirm('Are you sure you want to withdraw this application?')) {
            setIsWithdrawing(true);
            router.delete(route('user.applications.withdraw', application.id));
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'reviewing': 'bg-blue-100 text-blue-800',
            'shortlisted': 'bg-green-100 text-green-800',
            'interviewed': 'bg-purple-100 text-purple-800',
            'hired': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'withdrawn': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': ClockIcon,
            'reviewing': Eye,
            'shortlisted': CheckCircle,
            'interviewed': Users,
            'hired': CheckCircle,
            'rejected': XCircle,
            'withdrawn': XCircle
        };
        return icons[status] || ClockIcon;
    };

    const StatusIcon = getStatusIcon(application.status);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => router.get(route('user.applications.index'))}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Applications
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-[#00193f]">Application Details</h1>
                                <p className="text-[#202b61] text-sm">Track your application progress</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(application.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Application Header */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4">
                                        <Avatar className="w-16 h-16 border-2 border-gray-200">
                                            <AvatarImage src={application.job.recruiter?.profile_picture_url} />
                                            <AvatarFallback className="text-lg bg-[#202b61] text-white">
                                                {application.job.company_name?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#00193f] mb-2">{application.job.title}</h2>
                                            <div className="flex items-center space-x-4 text-[#202b61] mb-2">
                                                <span className="flex items-center">
                                                    <Building className="h-4 w-4 mr-1" />
                                                    {application.job.company_name}
                                                </span>
                                                <span className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {application.job.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="secondary" className="bg-[#EAF4FF] text-[#202b61] border-[#2980d1]">
                                                    {application.job.type}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-[#EAF4FF] text-[#202b61] border-[#2980d1]">
                                                    {application.job.experience_level}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{application.created_at}</p>
                                        <p className="text-xs text-gray-600">Applied</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Clock className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{application.updated_at}</p>
                                        <p className="text-xs text-gray-600">Last Updated</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <DollarSign className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{application.job.formatted_salary || 'Competitive'}</p>
                                        <p className="text-xs text-gray-600">Salary</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Users className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{application.job.experience_level}</p>
                                        <p className="text-xs text-gray-600">Level</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => router.get(route('user.jobs.show', application.job.id))}
                                            className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Job
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => router.get(route('user.messages.show', application.job.recruiter.id))}
                                            className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                        >
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Message Recruiter
                                        </Button>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => router.get(route('user.applications.edit', application.id))}
                                            className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            onClick={handleWithdraw}
                                            disabled={isWithdrawing || application.status === 'withdrawn'}
                                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Timeline */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">Application Timeline</CardTitle>
                                <CardDescription>Track the progress of your application</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-[#00193f]">Application Submitted</h4>
                                            <p className="text-sm text-gray-600">{application.created_at}</p>
                                            <p className="text-sm text-gray-700 mt-1">
                                                Your application has been successfully submitted and is under review.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {application.status !== 'pending' && (
                                        <div className="flex items-start space-x-4">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-[#00193f]">Application Reviewed</h4>
                                                <p className="text-sm text-gray-600">{application.updated_at}</p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Your application has been reviewed by the hiring team.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {application.status === 'shortlisted' && (
                                        <div className="flex items-start space-x-4">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-[#00193f]">Shortlisted</h4>
                                                <p className="text-sm text-gray-600">{application.updated_at}</p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Congratulations! You have been shortlisted for this position.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Details */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">Application Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-[#00193f] mb-2">Cover Letter</h4>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-700 whitespace-pre-wrap">
                                                {application.cover_letter || 'No cover letter provided.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-[#00193f] mb-2">Resume</h4>
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-[#2980d1]" />
                                            <span className="text-gray-700">resume.pdf</span>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {application.notes && (
                                        <div>
                                            <h4 className="font-medium text-[#00193f] mb-2">Notes</h4>
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <p className="text-gray-700">{application.notes}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Status Card */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">Application Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Current Status:</span>
                                        <Badge className={getStatusColor(application.status)}>
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </Badge>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Applied:</span>
                                            <span className="font-medium">{application.created_at}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Last Updated:</span>
                                            <span className="font-medium">{application.updated_at}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Days Since Applied:</span>
                                            <span className="font-medium">
                                                {Math.floor((new Date() - new Date(application.created_at)) / (1000 * 60 * 60 * 24))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recruiter Contact */}
                        {application.job.recruiter && (
                            <Card className="bg-white border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[#00193f]">Contact Recruiter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={application.job.recruiter.profile_picture_url} />
                                                <AvatarFallback className="bg-[#202b61] text-white">
                                                    {application.job.recruiter.name?.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-[#00193f]">{application.job.recruiter.name}</h3>
                                                <p className="text-sm text-gray-600">{application.job.recruiter.Specialization || 'Recruiter'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                                onClick={() => router.get(route('user.messages.show', application.job.recruiter.id))}
                                            >
                                                <Mail className="h-4 w-4 mr-2" />
                                                Send Message
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                            >
                                                <Phone className="h-4 w-4 mr-2" />
                                                Call
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationShow;
