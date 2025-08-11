import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { router } from '@inertiajs/react';
import {
    ArrowLeft,
    Bookmark,
    Briefcase,
    Building,
    Calendar,
    Clock,
    DollarSign,
    Filter,
    MapPin,
    Search,
    Share2,
    SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';

const JobSearch = ({ jobs, filters, pagination, jobTypes = [], experienceLevels = [], availableSkills = [] }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [jobType, setJobType] = useState(filters?.jobType || '');
    const [experienceLevel, setExperienceLevel] = useState(filters?.experienceLevel || '');
    const [salaryRange, setSalaryRange] = useState(filters?.salaryRange || [0, 200000]);
    const [selectedSkills, setSelectedSkills] = useState(filters?.skills || []);
    const [sortBy, setSortBy] = useState(filters?.sortBy || 'newest');
    const [viewMode, setViewMode] = useState('list');
    const [showFilters, setShowFilters] = useState(false);

    // availableSkills provided from backend dynamically

    const handleSearch = () => {
        router.get(
            route('user.jobs.search'),
            {
                search: searchTerm,
                location: location,
                jobType: jobType,
                experienceLevel: experienceLevel,
                salaryRange: salaryRange,
                skills: selectedSkills,
                sortBy: sortBy,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
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
        setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
    };

    const getExperienceColor = (level) => {
        const colors = {
            entry: 'bg-blue-100 text-blue-800',
            mid: 'bg-green-100 text-green-800',
            senior: 'bg-orange-100 text-orange-800',
            executive: 'bg-purple-100 text-purple-800',
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const getJobTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-green-100 text-green-800',
            'part-time': 'bg-blue-100 text-blue-800',
            contract: 'bg-orange-100 text-orange-800',
            internship: 'bg-purple-100 text-purple-800',
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                onClick={() => router.get(route('user.dashboard'))}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-[#00193f]">Job Search</h1>
                                <p className="text-sm text-[#202b61]">Find your next opportunity</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                            >
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
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
            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search jobs, companies, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#2980d1]"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative">
                                <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Location (city, state, or remote)"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#2980d1]"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                        </div>
                        <Button onClick={handleSearch} className="bg-[#202b61] px-8 py-3 text-white hover:bg-[#2980d1]">
                            <Search className="mr-2 h-4 w-4" />
                            Search Jobs
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Left Sidebar - Filters */}
                    <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <Card className="sticky top-8">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Filter className="h-5 w-5" />
                                        Filters
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-red-600 hover:text-red-700">
                                        Clear All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Job Type Filter */}
                                <div>
                                    <h3 className="mb-3 font-medium text-gray-900">Job Type</h3>
                                    <Select value={jobType || 'all'} onValueChange={(v) => setJobType(v === 'all' ? '' : v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All job types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All job types</SelectItem>
                                            {jobTypes.map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Experience Level Filter */}
                                <div>
                                    <h3 className="mb-3 font-medium text-gray-900">Experience Level</h3>
                                    <Select value={experienceLevel || 'all'} onValueChange={(v) => setExperienceLevel(v === 'all' ? '' : v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All levels" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All levels</SelectItem>
                                            {experienceLevels.map((lvl) => (
                                                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Salary Range Filter */}
                                <div>
                                    <h3 className="mb-3 font-medium text-gray-900">Salary Range</h3>
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
                                    <h3 className="mb-3 font-medium text-gray-900">Skills</h3>
                                    <div className="max-h-48 space-y-2 overflow-y-auto">
                                        {availableSkills.map((skill) => (
                                            <div key={skill} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={skill}
                                                    checked={selectedSkills.includes(skill)}
                                                    onCheckedChange={() => handleSkillToggle(skill)}
                                                />
                                                <label htmlFor={skill} className="cursor-pointer text-sm text-gray-700">
                                                    {skill}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <h3 className="mb-3 font-medium text-gray-900">Sort By</h3>
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
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-[#00193f]">{jobs?.length || 0} jobs found</h2>
                                {searchTerm && <p className="mt-1 text-sm text-[#202b61]">Showing results for "{searchTerm}"</p>}
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
                                    <Card key={job.id} className="transition-shadow duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="mb-3 flex items-start justify-between">
                                                        <div>
                                                            <h3 className="cursor-pointer text-lg font-semibold text-[#00193f] hover:text-[#2980d1]">
                                                                {job.title}
                                                            </h3>
                                                            <div className="mt-1 flex items-center text-sm text-gray-600">
                                                                <Building className="mr-1 h-4 w-4 text-[#2980d1]" />
                                                                <span className="font-medium">{job.company_name}</span>
                                                                <span className="mx-2 text-gray-400">•</span>
                                                                <MapPin className="mr-1 h-4 w-4 text-[#2980d1]" />
                                                                <span>{job.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Badge className={getJobTypeColor(job.type)}>{job.type}</Badge>
                                                            <Badge className={getExperienceColor(job.experience_level)}>{job.experience_level}</Badge>
                                                        </div>
                                                    </div>

                                                    <p className="mb-4 line-clamp-2 text-gray-700">{job.description}</p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <Clock className="mr-1 h-4 w-4 text-[#2980d1]" />
                                                                {job.type}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <DollarSign className="mr-1 h-4 w-4 text-[#2980d1]" />
                                                                {job.formatted_salary || 'Competitive'}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Calendar className="mr-1 h-4 w-4 text-[#2980d1]" />
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
                                                                className="bg-[#202b61] text-white hover:bg-[#2980d1]"
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
                                        <Briefcase className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                        <h3 className="mb-2 text-lg font-medium text-[#00193f]">No jobs found</h3>
                                        <p className="mb-4 text-gray-600">Try adjusting your search criteria or filters</p>
                                        <Button onClick={handleClearFilters} className="bg-[#202b61] text-white hover:bg-[#2980d1]">
                                            Clear Filters
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.total > pagination.per_page && (
                            <div className="mt-8 flex items-center justify-between">
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
