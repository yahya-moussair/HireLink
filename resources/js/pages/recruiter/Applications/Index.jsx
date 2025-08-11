import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Search, Filter, Eye, User, Calendar, MapPin, 
    CheckCircle, XCircle, Clock, Star, FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const breadcrumbs = [
    {
        title: 'Applications',
        href: '/recruiter/applications',
    },
];

const ApplicationsIndex = ({ applications, filters }) => {
    const [statusFilter, setStatusFilter] = useState('all');

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'shortlisted': 'bg-blue-100 text-blue-800',
            'interviewed': 'bg-purple-100 text-purple-800',
            'hired': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'withdrawn': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': Clock,
            'shortlisted': Star,
            'interviewed': Calendar,
            'hired': CheckCircle,
            'rejected': XCircle,
            'withdrawn': FileText
        };
        return icons[status] || Clock;
    };

    const handleStatusChange = (applicationId, newStatus) => {
        router.put(route('recruiter.applications.update', applicationId), {
            status: newStatus
        });
    };

    const filteredApplications = applications?.data?.filter(app => {
        if (statusFilter === 'all') return true;
        return app.status === statusFilter;
    }) || [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Applications" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">Job Applications</h1>
                        <p className="text-[#202b61] text-sm">Review and manage candidate applications</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            {applications?.data?.length || 0} total applications
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                                    <Input
                                        type="text"
                                        placeholder="Search applications..."
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="interviewed">Interviewed</SelectItem>
                                    <SelectItem value="hired">Hired</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications List */}
                {filteredApplications.length > 0 ? (
                    <div className="space-y-4">
                        {filteredApplications.map((application) => {
                            const StatusIcon = getStatusIcon(application.status);
                            return (
                                <Card key={application.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={application.candidate?.profile_picture_url} />
                                                    <AvatarFallback className="bg-[#202b61] text-white">
                                                        {application.candidate?.name?.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-[#00193f] mb-1">
                                                                {application.candidate?.name}
                                                            </h3>
                                                            <p className="text-[#202b61] font-medium mb-2">
                                                                Applied for: {application.job?.title}
                                                            </p>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                <span className="flex items-center">
                                                                    <MapPin className="h-4 w-4 mr-1" />
                                                                    {application.candidate?.location || 'Location not specified'}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <User className="h-4 w-4 mr-1" />
                                                                    {application.candidate?.Specialization || 'No specialization'}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Calendar className="h-4 w-4 mr-1" />
                                                                    Applied {new Date(application.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Badge className={getStatusColor(application.status)}>
                                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                                {application.status}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    {application.cover_letter && (
                                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                                            {application.cover_letter.substring(0, 150)}...
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                            <span className="flex items-center">
                                                                <Star className="h-4 w-4 mr-1" />
                                                                {application.candidate?.rating || 'No rating'}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <FileText className="h-4 w-4 mr-1" />
                                                                {application.candidate?.job_applications_count || 0} previous applications
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Link href={route('recruiter.applications.show', application.id)}>
                                                                <Button variant="outline" size="sm">
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    View Details
                                                                </Button>
                                                            </Link>
                                                            <Link href={route('recruiter.candidates.profile', application.candidate.id)}>
                                                                <Button variant="outline" size="sm">
                                                                    <User className="h-4 w-4 mr-2" />
                                                                    View Profile
                                                                </Button>
                                                            </Link>
                                                            <Link href={route('recruiter.interviews.create', application.id)}>
                                                                <Button size="sm" className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                                                                    <Calendar className="h-4 w-4 mr-2" />
                                                                    Schedule Interview
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
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
                        <CardContent className="p-12 text-center">
                            <FileText className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                            <h3 className="text-lg font-medium text-[#00193f] mb-2">No applications found</h3>
                            <p className="mb-4 text-gray-600">
                                {statusFilter === 'all' 
                                    ? 'Applications will appear here when candidates apply to your jobs'
                                    : `No applications with status "${statusFilter}" found`
                                }
                            </p>
                            {statusFilter !== 'all' && (
                                <Button 
                                    variant="outline"
                                    onClick={() => setStatusFilter('all')}
                                    className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                >
                                    View All Applications
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default ApplicationsIndex;
