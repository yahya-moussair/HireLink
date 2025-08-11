import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/react";
import { 
    Search, MapPin, Briefcase, Clock, DollarSign, Building, 
    Filter, Star, Bookmark, Share2, Calendar, Users, Globe,
    X, SlidersHorizontal, ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

const JobSearch = ({ jobs, filters, pagination, user }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [jobType, setJobType] = useState(filters?.jobType || '');
    const [experienceLevel, setExperienceLevel] = useState(filters?.experienceLevel || '');
    const [salaryRange, setSalaryRange] = useState(filters?.salaryRange || [0, 200000]);
    const [selectedSkills, setSelectedSkills] = useState(filters?.skills || []);
    const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');
    const [viewMode, setViewMode] = useState('list'); // grid or list
    const [showFilters, setShowFilters] = useState(false);

    const availableSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'PHP', 'Laravel',
        'Vue.js', 'Angular', 'TypeScript', 'Java', 'C#', 'SQL',
        'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile',
        'Scrum', 'UI/UX', 'Graphic Design', 'Marketing', 'Sales',
        'Project Management', 'Data Analysis', 'Machine Learning'
    ];

    const handleSearch = () => {
        router.get(route('user.jobs.search'), {
            search: searchTerm,
            location: location,
            jobType: jobType,
            experienceLevel: experienceLevel,
            salaryRange: salaryRange,
            skills: selectedSkills,
            sortBy: sortBy
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('');
        setJobType('');
        setExperienceLevel('');
        setSalaryRange([0, 200000]);
        setSelectedSkills([]);
        setSortBy('newest');
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
                router.post(route('user.jobs.apply', jobId));
                break;
            default:
                break;
        }
    };

    const handleSkillToggle = (skill) => {
        setSelectedSkills(prev => 
            prev.includes(skill) 
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
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
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => router.get(route('user.dashboard'))}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-[#00193f]">Job Search</h1>
                                <p className="text-[#202b61] text-sm">Find your next opportunity</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="outline" 
                                onClick={() => setShowFilters(!showFilters)}
                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                {showFilters ? 'Hide' : 'Show'} Filters
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                            >
                                {viewMode === 'grid' ? 'List View' : 'Grid View'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                                <Input
                                    type="text"
                                    placeholder="Search jobs, companies, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2980d1] focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                                <Input
                                    type="text"
                                    placeholder="Location (city, state, or remote)"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2980d1] focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>
                        <Button 
                            onClick={handleSearch}
                            className="bg-[#202b61] hover:bg-[#2980d1] text-white px-8 py-3"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Search Jobs
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar - Filters */}
                    <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <Card className="sticky top-8">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Filter className="h-5 w-5" />
                                        Filters
                                    </CardTitle>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Job Type Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
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

                                {/* Experience Level Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Experience Level</h3>
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

                                {/* Salary Range Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Salary Range</h3>
                                    <div className="space-y-2">
                                        <Slider
                                            value={salaryRange}
                                            onValueChange={setSalaryRange}
                                            max={200000}
                                            min={0}
                                            step={5000}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>${salaryRange[0].toLocaleString()}</span>
                                            <span>${salaryRange[1].toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {availableSkills.map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={skill}
                                                    checked={selectedSkills.includes(skill)}
                                                    onCheckedChange={() => handleSkillToggle(skill)}
                                                />
                                                <label htmlFor={skill} className="text-sm text-gray-700 cursor-pointer">
                                                    {skill}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - Job Results */}
                    <div className="lg:col-span-3">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-[#00193f]">
                                    {jobs?.length || 0} jobs found
                                </h2>
                                {searchTerm && (
                                    <p className="text-[#202b61] text-sm mt-1">
                                        Showing results for "{searchTerm}"
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Results per page:</span>
                                <Select defaultValue="10">
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Job Listings */}
                        <div className="space-y-4">
                            {jobs && jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-[#00193f] hover:text-[#2980d1] cursor-pointer">
                                                                {job.title}
                                                            </h3>
                                                            <div className="flex items-center mt-1 text-sm text-gray-600">
                                                                <Building className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                <span className="font-medium">{job.company_name}</span>
                                                                <span className="mx-2 text-gray-400">•</span>
                                                                <MapPin className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                <span>{job.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Badge className={getJobTypeColor(job.type)}>
                                                                {job.type}
                                                            </Badge>
                                                            <Badge className={getExperienceColor(job.experience_level)}>
                                                                {job.experience_level}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 mb-4 line-clamp-2">
                                                        {job.description}
                                                    </p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                {job.type}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <DollarSign className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                {job.formatted_salary || 'Competitive'}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Calendar className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                Posted {job.created_at}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                onClick={() => handleJobAction('save', job.id)}
                                                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                                            >
                                                                <Bookmark className="h-4 w-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                onClick={() => handleJobAction('share', job.id)}
                                                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                                            >
                                                                <Share2 className="h-4 w-4" />
                                                            </Button>
                                                            <Button 
                                                                onClick={() => handleJobAction('apply', job.id)}
                                                                className="bg-[#202b61] hover:bg-[#2980d1] text-white"
                                                            >
                                                                Apply Now
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <Briefcase className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                                        <h3 className="text-lg font-medium text-[#00193f] mb-2">No jobs found</h3>
                                        <p className="mb-4 text-gray-600">
                                            Try adjusting your search criteria or filters
                                        </p>
                                        <Button 
                                            onClick={handleClearFilters}
                                            className="bg-[#202b61] hover:bg-[#2980d1] text-white"
                                        >
                                            Clear Filters
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.total > pagination.per_page && (
                            <div className="flex items-center justify-between mt-8">
                                <div className="text-sm text-gray-600">
                                    Showing {pagination.from} to {pagination.to} of {pagination.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button 
                                        variant="outline" 
                                        disabled={!pagination.prev_page_url}
                                        onClick={() => router.get(pagination.prev_page_url)}
                                    >
                                        Previous
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        disabled={!pagination.next_page_url}
                                        onClick={() => router.get(pagination.next_page_url)}
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

export default JobSearch;
