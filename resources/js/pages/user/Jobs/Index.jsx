import React, { useState, useEffect } from 'react';
import { 
    Search, MapPin, Briefcase, Clock, DollarSign, Building, 
    Filter, Star, Bookmark, Share2, Calendar, Users, Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const JobsIndex = ({ jobs, filters, pagination }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [jobType, setJobType] = useState(filters?.jobType || '');
    const [experienceLevel, setExperienceLevel] = useState(filters?.experienceLevel || '');
    const [salaryRange, setSalaryRange] = useState(filters?.salaryRange || '');
    const [selectedSkills, setSelectedSkills] = useState(filters?.skills || []);
    const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    const handleSearch = () => {
        // This would typically make an API call with the search parameters
        console.log('Searching with:', {
            searchTerm,
            location,
            jobType,
            experienceLevel,
            salaryRange,
            selectedSkills,
            sortBy
        });
    };

    const handleJobAction = (action, jobId) => {
        switch (action) {
            case 'save':
                console.log('Saving job:', jobId);
                break;
            case 'share':
                console.log('Sharing job:', jobId);
                break;
            case 'apply':
                console.log('Applying to job:', jobId);
                break;
            default:
                break;
        }
    };

    const getExperienceColor = (level) => {
        const colors = {
            'entry': 'bg-blue-100 text-blue-800',
            'mid': 'bg-green-100 text-green-800',
            'senior': 'bg-orange-100 text-orange-800',
            'executive': 'bg-purple-100 text-purple-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const getJobTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-green-100 text-green-800',
            'part-time': 'bg-blue-100 text-blue-800',
            'contract': 'bg-orange-100 text-orange-800',
            'internship': 'bg-purple-100 text-purple-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Find Your Next Job</h1>
                            <p className="text-gray-600 mt-2">Discover opportunities that match your skills and career goals</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                                {viewMode === 'grid' ? 'List View' : 'Grid View'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Filter className="h-5 w-5" />
                                    Filters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Search */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Search Jobs</label>
                                    <Input
                                        placeholder="Job title, keywords, or company"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                                    <Input
                                        placeholder="City, state, or remote"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                {/* Job Type */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Job Type</label>
                                    <Select value={jobType} onValueChange={setJobType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All job types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All job types</SelectItem>
                                            <SelectItem value="full-time">Full-time</SelectItem>
                                            <SelectItem value="part-time">Part-time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Experience Level</label>
                                    <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All levels" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All levels</SelectItem>
                                            <SelectItem value="entry">Entry Level</SelectItem>
                                            <SelectItem value="mid">Mid Level</SelectItem>
                                            <SelectItem value="senior">Senior Level</SelectItem>
                                            <SelectItem value="executive">Executive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Salary Range */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Salary Range</label>
                                    <Select value={salaryRange} onValueChange={setSalaryRange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Any salary" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">Any salary</SelectItem>
                                            <SelectItem value="0-50000">$0 - $50,000</SelectItem>
                                            <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                                            <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
                                            <SelectItem value="150000+">$150,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
                                    <div className="space-y-2">
                                        {['JavaScript', 'React', 'Laravel', 'Python', 'AWS', 'Docker'].map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={skill}
                                                    checked={selectedSkills.includes(skill)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedSkills([...selectedSkills, skill]);
                                                        } else {
                                                            setSelectedSkills(selectedSkills.filter(s => s !== skill));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={skill} className="text-sm text-gray-700">{skill}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                            <SelectItem value="oldest">Oldest First</SelectItem>
                                            <SelectItem value="salary-high">Highest Salary</SelectItem>
                                            <SelectItem value="salary-low">Lowest Salary</SelectItem>
                                            <SelectItem value="relevance">Most Relevant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Apply Filters Button */}
                                <Button onClick={handleSearch} className="w-full">
                                    <Search className="h-4 w-4 mr-2" />
                                    Apply Filters
                                </Button>

                                {/* Clear Filters */}
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setLocation('');
                                        setJobType('');
                                        setExperienceLevel('');
                                        setSalaryRange('');
                                        setSelectedSkills([]);
                                        setSortBy('newest');
                                    }}
                                    className="w-full"
                                >
                                    Clear All Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Job Listings */}
                    <div className="lg:col-span-3">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-gray-600">
                                    Showing <span className="font-semibold">{jobs?.length || 0}</span> jobs
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                        <SelectItem value="salary-high">Highest Salary</SelectItem>
                                        <SelectItem value="salary-low">Lowest Salary</SelectItem>
                                        <SelectItem value="relevance">Most Relevant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Job Listings */}
                        {jobs && jobs.length > 0 ? (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid' 
                                    ? 'grid-cols-1 md:grid-cols-2' 
                                    : 'grid-cols-1'
                            }`}>
                                {jobs.map((job) => (
                                    <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        {job.company_logo && (
                                                            <img 
                                                                src={job.company_logo} 
                                                                alt={job.company_name}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                        )}
                                                        <div className="flex-1">
                                                            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                                                                {job.title}
                                                            </CardTitle>
                                                            <CardDescription className="text-base font-medium text-gray-700">
                                                                {job.company_name}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleJobAction('save', job.id)}
                                                        className="text-gray-500 hover:text-yellow-500"
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleJobAction('share', job.id)}
                                                        className="text-gray-500 hover:text-blue-500"
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {/* Job Details */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Briefcase className="h-4 w-4" />
                                                        <span>{job.type}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Users className="h-4 w-4" />
                                                        <span>{job.experience_level}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <DollarSign className="h-4 w-4" />
                                                        <span>{job.formatted_salary}</span>
                                                    </div>
                                                </div>

                                                {/* Job Description */}
                                                <div>
                                                    <p className="text-gray-700 line-clamp-3">
                                                        {job.description}
                                                    </p>
                                                </div>

                                                {/* Skills */}
                                                {job.skills && job.skills.length > 0 && (
                                                    <div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.slice(0, 5).map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                            {job.skills.length > 5 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{job.skills.length - 5} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Job Meta */}
                                                <div className="flex items-center justify-between pt-4 border-t">
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            Posted {job.created_at}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            Deadline: {job.deadline}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm">
                                                            View Details
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handleJobAction('apply', job.id)}
                                                        >
                                                            Apply Now
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your search criteria or check back later for new opportunities.
                                    </p>
                                    <Button 
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm('');
                                            setLocation('');
                                            setJobType('');
                                            setExperienceLevel('');
                                            setSalaryRange('');
                                            setSelectedSkills([]);
                                            setSortBy('newest');
                                        }}
                                    >
                                        Clear Filters
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
            </div>
        </div>
    );
};

export default JobsIndex;
