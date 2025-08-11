import React, { useState } from 'react';
import { 
    Briefcase, Calendar, Clock, MapPin, Building, CheckCircle, 
    XCircle, AlertCircle, Clock as ClockIcon, Eye, MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ApplicationsIndex = ({ applications, filters, pagination }) => {
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'reviewed': 'bg-blue-100 text-blue-800',
            'shortlisted': 'bg-green-100 text-green-800',
            'interviewed': 'bg-purple-100 text-purple-800',
            'offered': 'bg-emerald-100 text-emerald-800',
            'rejected': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': ClockIcon,
            'reviewed': Eye,
            'shortlisted': CheckCircle,
            'interviewed': MessageSquare,
            'offered': CheckCircle,
            'rejected': XCircle
        };
        return icons[status] || ClockIcon;
    };

    const handleWithdraw = (applicationId) => {
        console.log('Withdrawing application:', applicationId);
    };

    const handleViewJob = (jobId) => {
        console.log('Viewing job:', jobId);
    };

    const handleContactRecruiter = (applicationId) => {
        console.log('Contacting recruiter for application:', applicationId);
    };

    const filteredApplications = applications?.filter(app => {
        if (statusFilter && app.status !== statusFilter) return false;
        if (searchTerm && !app.job.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    }) || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                            <p className="text-gray-600 mt-2">Track your job applications and their status</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline">
                                <Briefcase className="h-4 w-4 mr-2" />
                                Browse Jobs
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Search Jobs</label>
                                <Input
                                    placeholder="Job title or company"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All statuses</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="reviewed">Reviewed</SelectItem>
                                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                        <SelectItem value="interviewed">Interviewed</SelectItem>
                                        <SelectItem value="offered">Offered</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                        <SelectItem value="status">By Status</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setStatusFilter('');
                                        setSearchTerm('');
                                        setSortBy('newest');
                                    }}
                                    className="w-full"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications List */}
                {filteredApplications.length > 0 ? (
                    <div className="space-y-4">
                        {filteredApplications.map((application) => {
                            const StatusIcon = getStatusIcon(application.status);
                            return (
                                <Card key={application.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                                                                {application.job.title}
                                                            </h3>
                                                            <Badge className={getStatusColor(application.status)}>
                                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                            </Badge>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <Building className="h-4 w-4" />
                                                                {application.job.company_name}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {application.job.location}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                Applied {application.applied_at}
                                                            </span>
                                                        </div>

                                                        {application.status === 'shortlisted' && application.interview_scheduled_at && (
                                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                                                <div className="flex items-center gap-2 text-blue-800">
                                                                    <Clock className="h-4 w-4" />
                                                                    <span className="font-medium">Interview Scheduled</span>
                                                                </div>
                                                                <p className="text-sm text-blue-700 mt-1">
                                                                    {application.interview_scheduled_at} - {application.interview_type} interview
                                                                </p>
                                                                {application.interview_notes && (
                                                                    <p className="text-sm text-blue-600 mt-2">
                                                                        <strong>Notes:</strong> {application.interview_notes}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}

                                                        {application.status === 'rejected' && application.recruiter_notes && (
                                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                                                <div className="flex items-center gap-2 text-red-800">
                                                                    <XCircle className="h-4 w-4" />
                                                                    <span className="font-medium">Application Feedback</span>
                                                                </div>
                                                                <p className="text-sm text-red-700 mt-1">
                                                                    {application.recruiter_notes}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {application.cover_letter && (
                                                            <div className="mb-3">
                                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                                    <strong>Cover Letter:</strong> {application.cover_letter}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2 ml-4">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Salary</p>
                                                    <p className="font-medium">{application.job.formatted_salary}</p>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewJob(application.job.id)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Job
                                                    </Button>
                                                    
                                                    {application.status === 'pending' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleWithdraw(application.id)}
                                                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                                                        >
                                                            <XCircle className="h-4 w-4 mr-1" />
                                                            Withdraw
                                                        </Button>
                                                    )}
                                                    
                                                    {['shortlisted', 'interviewed'].includes(application.status) && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleContactRecruiter(application.id)}
                                                        >
                                                            <MessageSquare className="h-4 w-4 mr-1" />
                                                            Contact
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || statusFilter 
                                    ? 'Try adjusting your search criteria.' 
                                    : 'You haven\'t applied to any jobs yet.'
                                }
                            </p>
                            <Button>
                                <Briefcase className="h-4 w-4 mr-2" />
                                Browse Available Jobs
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {pagination && pagination.total > pagination.per_page && (
                    <div className="mt-8 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                disabled={pagination.current_page === 1}
                                onClick={() => console.log('Previous page')}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <Button
                                            key={page}
                                            variant={pagination.current_page === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => console.log(`Go to page ${page}`)}
                                        >
                                            {page}
                                        </Button>
                                    );
                                })}
                            </div>
                            <Button
                                variant="outline"
                                disabled={pagination.current_page === pagination.last_page}
                                onClick={() => console.log('Next page')}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsIndex;
