import React, { useState } from 'react';
import { router } from "@inertiajs/react";
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Search, MapPin, User, Briefcase, Clock, Star, 
    Filter, SlidersHorizontal, ArrowLeft, Mail, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const breadcrumbs = [
    {
        title: 'Candidates',
        href: '/recruiter/candidates',
    },
    {
        title: 'Search',
        href: '/recruiter/candidates/search',
    },
];

const CandidateSearch = ({ candidates, filters, user }) => {
    const [searchTerm, setSearchTerm] = useState(filters?.specialization || '');
    const [location, setLocation] = useState(filters?.location || '');
    const [experienceLevel, setExperienceLevel] = useState(filters?.experience_level || '');
    const [selectedSkills, setSelectedSkills] = useState(filters?.skills ? filters.skills.split(',') : []);
    const [showFilters, setShowFilters] = useState(false);

    const availableSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'PHP', 'Laravel',
        'Vue.js', 'Angular', 'TypeScript', 'Java', 'C#', 'SQL',
        'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile',
        'Scrum', 'UI/UX', 'Graphic Design', 'Marketing', 'Sales',
        'Project Management', 'Data Analysis', 'Machine Learning'
    ];

    const handleSearch = () => {
        router.get(route('recruiter.candidates.search'), {
            specialization: searchTerm,
            location: location,
            experience_level: experienceLevel,
            skills: selectedSkills.join(',')
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('');
        setExperienceLevel('');
        setSelectedSkills([]);
    };

    const handleSkillToggle = (skill) => {
        setSelectedSkills(prev => 
            prev.includes(skill) 
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    const handleViewProfile = (candidateId) => {
        router.get(route('recruiter.candidates.profile', candidateId));
    };

    const handleSendMessage = (candidateId) => {
        router.get(`/chatify/${candidateId}`);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find Candidates" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button 
                            variant="ghost" 
                            onClick={() => router.get(route('recruiter.dashboard'))}
                            className="text-[#00193f] hover:text-[#2980d1]"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-[#00193f]">Find Candidates</h1>
                            <p className="text-[#202b61] text-sm">Search for talented professionals</p>
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
                                    placeholder="Search by specialization, skills, or keywords..."
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
                            Search Candidates
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
                                {/* Experience Level Filter */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Experience Level</h3>
                                    <Select value={experienceLevel || 'all'} onValueChange={(v) => setExperienceLevel(v === 'all' ? '' : v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All levels" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All levels</SelectItem>
                                            <SelectItem value="entry">Entry Level</SelectItem>
                                            <SelectItem value="mid">Mid Level</SelectItem>
                                            <SelectItem value="senior">Senior Level</SelectItem>
                                            <SelectItem value="executive">Executive</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - Candidate Results */}
                    <div className="lg:col-span-3">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-[#00193f]">
                                    {candidates?.data?.length || 0} candidates found
                                </h2>
                                {searchTerm && (
                                    <p className="text-[#202b61] text-sm mt-1">
                                        Showing results for "{searchTerm}"
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Candidate Listings */}
                        <div className="space-y-4">
                            {candidates?.data && candidates.data.length > 0 ? (
                                candidates.data.map((candidate) => (
                                    <Card key={candidate.id} className="hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <Avatar className="w-16 h-16 border-2 border-gray-200">
                                                        <AvatarImage src={candidate.profile_picture_url} />
                                                        <AvatarFallback className="text-lg bg-[#202b61] text-white">
                                                            {candidate.name?.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-[#00193f] hover:text-[#2980d1] cursor-pointer">
                                                                    {candidate.name}
                                                                </h3>
                                                                <p className="text-[#202b61] font-medium">{candidate.Specialization}</p>
                                                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                                                    <MapPin className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                    <span>{candidate.location || 'Location not specified'}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Badge className={getExperienceColor(candidate.experience_level)}>
                                                                    {candidate.experience_level || 'Not specified'}
                                                                </Badge>
                                                                <Badge variant="secondary" className="bg-[#EAF4FF] text-[#202b61] border-[#2980d1]">
                                                                    {candidate.job_applications_count || 0} applications
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                                            <span className="flex items-center">
                                                                <Eye className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                {candidate.profile_views || 0} profile views
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Star className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                {candidate.rating || 'No rating'}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1 text-[#2980d1]" />
                                                                Member since {new Date(candidate.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>

                                                        {candidate.skills && (
                                                            <div className="mb-4">
                                                                <h4 className="text-sm font-medium text-[#00193f] mb-2">Skills</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {candidate.skills.split(',').slice(0, 5).map((skill, index) => (
                                                                        <Badge key={index} variant="outline" className="text-xs">
                                                                            {skill.trim()}
                                                                        </Badge>
                                                                    ))}
                                                                    {candidate.skills.split(',').length > 5 && (
                                                                        <Badge variant="outline" className="text-xs">
                                                                            +{candidate.skills.split(',').length - 5} more
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleViewProfile(candidate.id)}
                                                        className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Profile
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleSendMessage(candidate.id)}
                                                        className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                                    >
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Message
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <User className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                                        <h3 className="text-lg font-medium text-[#00193f] mb-2">No candidates found</h3>
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
                        {candidates?.links && (
                            <div className="flex items-center justify-between mt-8">
                                <div className="text-sm text-gray-600">
                                    Showing {candidates.from} to {candidates.to} of {candidates.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    {candidates.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            className={link.active ? "bg-[#202b61] text-white" : ""}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CandidateSearch;
