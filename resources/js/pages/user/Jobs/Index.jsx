import React, { useState, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import { 
    Search, MapPin, Briefcase, Clock, DollarSign, Building, 
    Filter, Bookmark, Share2, Calendar, Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const JobsIndex = ({ jobs, pagination, filters = {}, jobTypes = [], experienceLevels = [], availableSkills = [] }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [jobType, setJobType] = useState(filters?.jobType || 'all');
    const [experienceLevel, setExperienceLevel] = useState(filters?.experienceLevel || 'all');
    const [salaryRange, setSalaryRange] = useState(filters?.salaryRange || 'all');
    const [selectedSkills, setSelectedSkills] = useState(filters?.skills || []);
    const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    // Apply modal state
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [applyJob, setApplyJob] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');

    const primaryBtn = 'bg-[#202b61] hover:bg-[#2980d1] text-white';
    const outlinePrimaryBtn = 'border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white';
    const primaryText = 'text-[#00193f]';

    const getInitials = (name = '') => {
        const parts = String(name).trim().split(/\s+/);
        const first = parts[0]?.[0] || '';
        const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
        return (first + last).toUpperCase();
    };

    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return iso;
        }
    };

    const handleSearch = () => {
        router.get(route('user.jobs.index'), {
            search: searchTerm,
            location: location,
            jobType: jobType,
            experienceLevel: experienceLevel,
            salaryRange: salaryRange,
            skills: selectedSkills,
            sortBy: sortBy,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('');
        setJobType('all');
        setExperienceLevel('all');
        setSalaryRange('all');
        setSelectedSkills([]);
        setSortBy('newest');
        
        router.get(route('user.jobs.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSkillToggle = (skill) => {
        const newSkills = selectedSkills.includes(skill) 
            ? selectedSkills.filter(s => s !== skill)
            : [...selectedSkills, skill];
        setSelectedSkills(newSkills);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        router.get(route('user.jobs.index'), {
            search: searchTerm,
            location: location,
            jobType: jobType,
            experienceLevel: experienceLevel,
            salaryRange: salaryRange,
            skills: selectedSkills,
            sortBy: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const openApplyModal = (job) => {
        setApplyJob(job);
        setCoverLetter('');
        setIsApplyOpen(true);
    };

    const submitApplication = () => {
        if (!applyJob) return;
        router.post(route('user.jobs.apply', applyJob.id), {
            cover_letter: coverLetter,
        }, {
            onSuccess: () => setIsApplyOpen(false),
        });
    };

    const goToPage = (url) => {
        if (!url) return;
        router.get(url, {}, { preserveState: true, replace: true });
    };

    const getExperienceColor = (level) => {
        const colors = {
            'entry': 'bg-blue-100 text-blue-800',
            'mid': 'bg-emerald-100 text-emerald-800',
            'senior': 'bg-orange-100 text-orange-800',
            'executive': 'bg-purple-100 text-purple-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const getJobTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-emerald-100 text-emerald-800',
            'part-time': 'bg-blue-100 text-blue-800',
            'contract': 'bg-orange-100 text-orange-800',
            'internship': 'bg-purple-100 text-purple-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EAF4FF,#F5F6FA)]">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className={`text-3xl font-extrabold ${primaryText}`}>Find Your Next Job</h1>
                            <p className="text-gray-600 mt-2">Discover opportunities that match your skills and career goals</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" onClick={() => router.get('/user/profile')} className={outlinePrimaryBtn}>
                                Back to Profile
                            </Button>
                            <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className={outlinePrimaryBtn}>
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
                        <Card className="border-[#e6eef9]">
                            <CardHeader>
                                <CardTitle className={`flex items-center gap-2 ${primaryText}`}>
                                    <Filter className="h-5 w-5" />
                                    Filters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Search */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Search Jobs</label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Job title, keywords, or company"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            className="flex-1"
                                        />
                                        <Button onClick={handleSearch} size="sm" className={primaryBtn}>
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </div>
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
                                            <SelectItem value="all">All job types</SelectItem>
                                            {jobTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                                </SelectItem>
                                            ))}
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
                                            <SelectItem value="all">All levels</SelectItem>
                                            {experienceLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level.charAt(0).toUpperCase() + level.slice(1)} Level
                                                </SelectItem>
                                            ))}
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
                                            <SelectItem value="all">Any salary</SelectItem>
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
                                        {availableSkills.map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`skill-${skill}`}
                                                    checked={selectedSkills.includes(skill)}
                                                    onCheckedChange={() => handleSkillToggle(skill)}
                                                />
                                                <label htmlFor={`skill-${skill}`} className="text-sm text-gray-700">{skill}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                                    <Select value={sortBy} onValueChange={handleSortChange}>
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
                                <Button onClick={handleSearch} className={`w-full ${primaryBtn}`}>
                                    <Search className="h-4 w-4 mr-2" />
                                    Apply Filters
                                </Button>

                                {/* Clear Filters */}
                                <Button 
                                    variant="outline" 
                                    onClick={handleClearFilters}
                                    className={`w-full ${outlinePrimaryBtn}`}
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
                                    Showing <span className="font-semibold">{jobs?.data?.length || 0}</span> jobs
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <Select value={sortBy} onValueChange={handleSortChange}>
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
                        {jobs?.data && jobs.data.length > 0 ? (
                            <div className={`grid gap-6 ${
                                viewMode === 'grid' 
                                    ? 'grid-cols-1 md:grid-cols-2' 
                                    : 'grid-cols-1'
                            }`}>
                                {jobs.data.map((job) => (
                                    <Card key={job.id} className="group hover:shadow-2xl transition-all duration-200 border-[#e6eef9] rounded-xl overflow-hidden h-full flex flex-col">
                                        <div className="h-1 bg-gradient-to-r from-[#202b61] to-[#2980d1]" />
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        {job.company_logo ? (
                                                            <img 
                                                                src={job.company_logo} 
                                                                alt={job.company_name}
                                                                className="w-12 h-12 rounded-lg object-cover ring-1 ring-[#e6eef9]"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-[#eaf0fb] flex items-center justify-center ring-1 ring-[#e6eef9]">
                                                                <span className={`text-sm font-bold ${primaryText}`}>{getInitials(job.company_name)}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <Link href={route('user.jobs.show', job.id)}>
                                                                <CardTitle className={`text-lg group-hover:text-[#2980d1] cursor-pointer ${primaryText} line-clamp-2`}>
                                                                    {job.title}
                                                                </CardTitle>
                                                            </Link>
                                                            <CardDescription className="text-sm font-medium text-gray-600 flex items-center gap-1 mt-0.5">
                                                                <Building className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{job.company_name}</span>
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                    {/* Pills Row */}
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                                                            <MapPin className="h-3.5 w-3.5" /> {job.location}
                                                        </span>
                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getJobTypeColor(job.type)}`}>
                                                            <Briefcase className="h-3.5 w-3.5" /> {job.type}
                                                        </span>
                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getExperienceColor(job.experience_level)}`}>
                                                            <Users className="h-3.5 w-3.5" /> {job.experience_level}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
                                                            <DollarSign className="h-3.5 w-3.5" /> {job.formatted_salary || job.salary_range || 'Not specified'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {/* TODO: save */}}
                                                        className="text-gray-500 hover:text-yellow-600"
                                                        aria-label="Save job"
                                                    >
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {/* TODO: share */}}
                                                        className="text-gray-500 hover:text-[#2980d1]"
                                                        aria-label="Share job"
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col">
                                            <div className="space-y-4 flex-1 flex flex-col">
                                                {/* Job Description */}
                                                <p className="text-gray-700 line-clamp-2">
                                                    {job.description}
                                                </p>

                                                {/* Skills */}
                                                {job.skills && job.skills.length > 0 && (
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
                                                )}

                                                {/* Job Meta */}
                                                <div className="mt-auto flex items-center justify-between pt-4 border-t flex-wrap gap-2">
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                                                        <span className="flex items-center gap-1 whitespace-nowrap">
                                                            <Clock className="h-4 w-4" />
                                                            Posted {formatDate(job.created_at)}
                                                        </span>
                                                        <span className="flex items-center gap-1 whitespace-nowrap">
                                                            <Calendar className="h-4 w-4" />
                                                            Deadline: {formatDate(job.deadline)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Link href={route('user.jobs.show', job.id)}>
                                                            <Button variant="outline" size="sm" className={`${outlinePrimaryBtn} whitespace-nowrap`}>
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => openApplyModal(job)}
                                                            className={`${primaryBtn} whitespace-nowrap`}
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
                                        onClick={handleClearFilters}
                                        className={outlinePrimaryBtn}
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
                                        onClick={() => goToPage(pagination.prev_page_url)}
                                        className={outlinePrimaryBtn}
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex items-center space-x-1">
                                        {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                            const page = i + 1;
                                            const url = `${route('user.jobs.index')}?page=${page}`;
                                            return (
                                                <Button
                                                    key={page}
                                                    variant={pagination.current_page === page ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => goToPage(url)}
                                                    className={pagination.current_page === page ? primaryBtn : outlinePrimaryBtn}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline"
                                        disabled={pagination.current_page === pagination.last_page}
                                        onClick={() => goToPage(pagination.next_page_url)}
                                        className={outlinePrimaryBtn}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={primaryText}>Apply to {applyJob?.title}</DialogTitle>
                        <DialogDescription>
                            Your application will be sent to {applyJob?.company_name}. Include a short cover letter to introduce yourself.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                        <Textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write a short cover letter..."
                            className="min-h-[120px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsApplyOpen(false)} className={outlinePrimaryBtn}>
                            Cancel
                        </Button>
                        <Button onClick={submitApplication} className={primaryBtn}>
                            Submit Application
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default JobsIndex;
