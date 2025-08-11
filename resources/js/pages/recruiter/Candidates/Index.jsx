import React from 'react';
import { router, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Search, Filter, Eye, User, Calendar, MapPin, 
    Star, Briefcase, Mail, Users, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const breadcrumbs = [
    {
        title: 'Candidates',
        href: '/recruiter/candidates',
    },
];

const CandidatesIndex = ({ candidates, filters }) => {
    const getExperienceColor = (level) => {
        const colors = {
            'entry': 'bg-blue-100 text-blue-800',
            'mid': 'bg-green-100 text-green-800',
            'senior': 'bg-orange-100 text-orange-800',
            'executive': 'bg-purple-100 text-purple-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const handleViewProfile = (candidateId) => {
        router.get(route('recruiter.candidates.profile', candidateId));
    };

    const handleSendMessage = (candidateId) => {
        router.get(route('recruiter.messages.show', candidateId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Browse Candidates" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">Browse Candidates</h1>
                        <p className="text-[#202b61] text-sm">Find talented professionals for your positions</p>
                    </div>
                    <Link href={route('recruiter.candidates.search')}>
                        <Button className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                            <Search className="h-4 w-4 mr-2" />
                            Advanced Search
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
                                        placeholder="Search candidates by name, specialization, or skills..."
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Experience Levels" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Experience Levels</SelectItem>
                                    <SelectItem value="entry">Entry Level</SelectItem>
                                    <SelectItem value="mid">Mid Level</SelectItem>
                                    <SelectItem value="senior">Senior Level</SelectItem>
                                    <SelectItem value="executive">Executive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="onsite">On-site</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Candidates List */}
                {candidates && candidates.data && candidates.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {candidates.data.map((candidate) => (
                            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4 mb-4">
                                        <Avatar className="w-16 h-16">
                                            <AvatarImage src={candidate.profile_picture_url} />
                                            <AvatarFallback className="bg-[#202b61] text-white text-lg">
                                                {candidate.name?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-[#00193f] mb-1">
                                                {candidate.name}
                                            </h3>
                                            <p className="text-[#202b61] font-medium mb-2">
                                                {candidate.Specialization || 'No specialization'}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-yellow-500" />
                                                <span className="text-sm text-gray-600">
                                                    {candidate.rating || 'No rating'} • {candidate.experience_level || 'Experience not specified'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            {candidate.location || 'Location not specified'}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Briefcase className="h-4 w-4 mr-2" />
                                            {candidate.job_applications_count || 0} applications submitted
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Member since {new Date(candidate.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleViewProfile(candidate.id)}
                                            className="flex-1 mr-2"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Profile
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleSendMessage(candidate.id)}
                                            className="flex-1 ml-2"
                                        >
                                            <Mail className="h-4 w-4 mr-2" />
                                            Message
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Users className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                            <h3 className="text-lg font-medium text-[#00193f] mb-2">No candidates found</h3>
                            <p className="mb-4 text-gray-600">
                                Try adjusting your search criteria or use advanced search to find more candidates
                            </p>
                            <Link href={route('recruiter.candidates.search')}>
                                <Button className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                                    <Search className="h-4 w-4 mr-2" />
                                    Advanced Search
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
};

export default CandidatesIndex;
