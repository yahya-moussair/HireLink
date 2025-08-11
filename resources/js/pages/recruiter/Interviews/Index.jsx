import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Calendar, 
    Clock, 
    Video, 
    Phone, 
    MapPin, 
    Eye, 
    Edit, 
    Trash2,
    Plus,
    Filter,
    Search,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs = [
    {
        title: 'Interviews',
        href: '/recruiter/interviews',
    },
];

const InterviewsIndex = ({ interviews }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleDelete = (interviewId) => {
        if (confirm('Are you sure you want to cancel this interview? This will send a cancellation email to the candidate and cannot be undone.')) {
            router.delete(route('recruiter.interviews.destroy', interviewId));
        }
    };

    // Helper functions for interview timing
    const isToday = (scheduledAt) => {
        const today = new Date();
        const interviewDate = new Date(scheduledAt);
        return today.toDateString() === interviewDate.toDateString();
    };

    const isFuture = (scheduledAt) => {
        return new Date(scheduledAt) > new Date();
    };

    const isPast = (scheduledAt) => {
        return new Date(scheduledAt) < new Date();
    };

    // Handle both paginated and non-paginated data
    const interviewsData = interviews?.data || interviews || [];
    
    const filteredInterviews = interviewsData.filter(interview => {
        if (statusFilter !== 'all' && interview.status !== statusFilter) return false;
        if (typeFilter !== 'all' && interview.type !== typeFilter) return false;
        if (searchTerm && !interview.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !interview.candidate?.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Interviews" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">Interviews</h1>
                        <p className="text-[#202b61] text-sm">Manage your scheduled interviews</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href={route('recruiter.interviews.today')}>
                            <Button variant="outline">
                                <Clock className="h-4 w-4 mr-2" />
                                Today's Interviews
                            </Button>
                        </Link>
                        <Link href={route('recruiter.interviews.upcoming')}>
                            <Button variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Upcoming
                            </Button>
                        </Link>
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
                                        placeholder="Search interviews by title or candidate name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                    <SelectItem value="in-person">In-Person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Interviews List */}
                {filteredInterviews.length > 0 ? (
                    <div className="space-y-4">
                        {filteredInterviews.map((interview) => {
                            const TypeIcon = getTypeIcon(interview.type);
                            return (
                                <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-[#00193f] mb-2">
                                                            {interview.title}
                                                        </h3>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                            <span className="flex items-center">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                {new Date(interview.scheduled_at).toLocaleDateString()} at {new Date(interview.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {interview.duration} minutes
                                                            </span>
                                                            <span className="flex items-center">
                                                                <TypeIcon className="h-4 w-4 mr-1" />
                                                                {interview.type}
                                                            </span>
                                                        </div>
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

                                                <div className="space-y-3 mb-4">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <span className="font-medium mr-2">Candidate:</span>
                                                        {interview.candidate?.name}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <span className="font-medium mr-2">Job:</span>
                                                        {interview.jobApplication?.job?.title}
                                                    </div>
                                                    {interview.location && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            {interview.location}
                                                        </div>
                                                    )}
                                                    {interview.meeting_link && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Video className="h-4 w-4 mr-1" />
                                                            <a 
                                                                href={interview.meeting_link} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Join Meeting
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>

                                                {interview.description && (
                                                    <p className="text-gray-600 mb-4 text-sm">
                                                        {interview.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                        <span className="flex items-center">
                                                            {isToday(interview.scheduled_at) ? (
                                                                <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                                                            ) : isFuture(interview.scheduled_at) ? (
                                                                <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                                            ) : (
                                                                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                                            )}
                                                            {isToday(interview.scheduled_at) ? 'Today' : isFuture(interview.scheduled_at) ? 'Upcoming' : 'Past'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Link href={route('recruiter.interviews.show', interview.id)}>
                                                            <Button variant="outline" size="sm">
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('recruiter.interviews.edit', interview.id)}>
                                                            <Button variant="outline" size="sm">
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handleDelete(interview.id)}
                                                            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Cancel
                                                        </Button>
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
                            <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                            <h3 className="text-lg font-medium text-[#00193f] mb-2">No interviews found</h3>
                            <p className="mb-4 text-gray-600">
                                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                                    ? 'Try adjusting your search criteria or filters'
                                    : 'Start scheduling interviews to manage your recruitment process'
                                }
                            </p>
                            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? (
                                <Button 
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('all');
                                        setTypeFilter('all');
                                    }}
                                    className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                >
                                    Clear Filters
                                </Button>
                            ) : (
                                <Link href={route('recruiter.applications.index')}>
                                    <Button className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Schedule Interview
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default InterviewsIndex;
