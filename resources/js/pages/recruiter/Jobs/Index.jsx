import React from 'react';
import { router, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Plus, Search, Filter, Edit, Eye, Trash2, 
    MapPin, Clock, DollarSign, Users, Calendar, Building, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs = [
    {
        title: 'Jobs',
        href: '/recruiter/jobs',
    },
];

const JobsIndex = ({ jobs, filters }) => {
    const getStatusColor = (status) => {
        const colors = {
            'active': 'bg-green-100 text-green-800',
            'draft': 'bg-gray-100 text-gray-800',
            'closed': 'bg-red-100 text-red-800',
            'expired': 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-blue-100 text-blue-800',
            'part-time': 'bg-purple-100 text-purple-800',
            'contract': 'bg-orange-100 text-orange-800',
            'internship': 'bg-green-100 text-green-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const handleDelete = (jobId) => {
        if (confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
            router.delete(route('recruiter.jobs.destroy', jobId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Job Postings" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">My Job Postings</h1>
                        <p className="text-[#202b61] text-sm">Manage your job listings and applications</p>
                    </div>
                    <Link href={route('recruiter.jobs.create')}>
                        <Button className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Post New Job
                        </Button>
                    </Link>
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
                                        placeholder="Search jobs..."
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="full-time">Full Time</SelectItem>
                                    <SelectItem value="part-time">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Jobs List */}
                {jobs && jobs.data && jobs.data.length > 0 ? (
                    <div className="space-y-4">
                        {jobs.data.map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[#00193f] mb-2">
                                                        {job.title}
                                                    </h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                        <span className="flex items-center">
                                                            <Building className="h-4 w-4 mr-1" />
                                                            {job.company_name || 'Your Company'}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {job.type}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <DollarSign className="h-4 w-4 mr-1" />
                                                            ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className={getStatusColor(job.status)}>
                                                        {job.status}
                                                    </Badge>
                                                    <Badge className={getTypeColor(job.type)}>
                                                        {job.type}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {job.description?.substring(0, 150)}...
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1" />
                                                        {job.applications_count || 0} applications
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        {job.views || 0} views
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        Posted {new Date(job.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Link href={route('recruiter.jobs.show', job.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('recruiter.jobs.edit', job.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleDelete(job.id)}
                                                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Briefcase className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                            <h3 className="text-lg font-medium text-[#00193f] mb-2">No job postings yet</h3>
                            <p className="mb-4 text-gray-600">
                                Start by creating your first job posting to attract candidates
                            </p>
                            <Link href={route('recruiter.jobs.create')}>
                                <Button className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Post Your First Job
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default JobsIndex;
