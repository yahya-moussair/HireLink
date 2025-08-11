import React, { useState } from 'react';
import { router } from "@inertiajs/react";
import { 
    ArrowLeft, MapPin, Building, Clock, DollarSign, Calendar, 
    Users, Globe, Bookmark, Share2, Mail, Phone, ExternalLink,
    CheckCircle, Star, TrendingUp, Award, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const JobShow = ({ job, user, hasApplied }) => {
    const [isApplying, setIsApplying] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleApply = () => {
        setIsApplying(true);
        router.post(route('user.jobs.apply', job.id), {}, {
            onSuccess: () => {
                setIsApplying(false);
            },
            onError: () => {
                setIsApplying(false);
            }
        });
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        // TODO: Implement save functionality
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Check out this job: ${job.title} at ${job.company_name}`,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
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
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="ghost" 
                                onClick={() => router.get(route('user.jobs.search'))}
                                className="text-[#00193f] hover:text-[#2980d1]"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Search
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button 
                                variant="outline" 
                                onClick={handleSave}
                                className={`border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white ${
                                    isSaved ? 'bg-[#202b61] text-white' : ''
                                }`}
                            >
                                <Bookmark className="h-4 w-4 mr-2" />
                                {isSaved ? 'Saved' : 'Save'}
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={handleShare}
                                className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                            >
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4">
                                        <Avatar className="w-16 h-16 border-2 border-gray-200">
                                            <AvatarImage src={job.recruiter?.profile_picture_url} />
                                            <AvatarFallback className="text-lg bg-[#202b61] text-white">
                                                {job.company_name?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h1 className="text-2xl font-bold text-[#00193f] mb-2">{job.title}</h1>
                                            <div className="flex items-center space-x-4 text-[#202b61] mb-2">
                                                <span className="flex items-center">
                                                    <Building className="h-4 w-4 mr-1" />
                                                    {job.company_name}
                                                </span>
                                                <span className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {job.location}
                                                </span>
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
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <DollarSign className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{job.formatted_salary || 'Competitive'}</p>
                                        <p className="text-xs text-gray-600">Salary</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Clock className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{job.type}</p>
                                        <p className="text-xs text-gray-600">Job Type</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Calendar className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{job.created_at}</p>
                                        <p className="text-xs text-gray-600">Posted</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <Users className="h-5 w-5 mx-auto mb-1 text-[#2980d1]" />
                                        <p className="text-sm font-medium text-[#00193f]">{job.experience_level}</p>
                                        <p className="text-xs text-gray-600">Level</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {hasApplied ? (
                                            <div className="flex items-center text-green-600">
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                <span className="font-medium">Applied</span>
                                            </div>
                                        ) : (
                                            <Button 
                                                onClick={handleApply}
                                                disabled={isApplying}
                                                className="bg-[#202b61] hover:bg-[#2980d1] text-white px-8 py-3"
                                            >
                                                {isApplying ? 'Applying...' : 'Apply Now'}
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">{job.views || 0}</span> views
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Job Description */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">Job Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {job.description}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        {job.requirements && (
                            <Card className="bg-white border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[#00193f]">Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {job.requirements.split('\n').map((requirement, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-[#2980d1] rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700">{requirement}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <Card className="bg-white border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[#00193f]">Required Skills</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="bg-[#EAF4FF] text-[#202b61] border-[#2980d1]">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <Card className="bg-white border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[#00193f]">Benefits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {job.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <Award className="h-5 w-5 text-[#2980d1] flex-shrink-0" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Company Info */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">About {job.company_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={job.recruiter?.profile_picture_url} />
                                            <AvatarFallback className="bg-[#202b61] text-white">
                                                {job.company_name?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-[#00193f]">{job.company_name}</h3>
                                            <p className="text-sm text-gray-600">{job.location}</p>
                                        </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Globe className="h-4 w-4 text-[#2980d1]" />
                                            <span className="text-sm text-gray-600">Company website</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Users className="h-4 w-4 text-[#2980d1]" />
                                            <span className="text-sm text-gray-600">Company size</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <TrendingUp className="h-4 w-4 text-[#2980d1]" />
                                            <span className="text-sm text-gray-600">Industry</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recruiter Info */}
                        {job.recruiter && (
                            <Card className="bg-white border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[#00193f]">Hiring Manager</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage src={job.recruiter.profile_picture_url} />
                                                <AvatarFallback className="bg-[#202b61] text-white">
                                                    {job.recruiter.name?.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-[#00193f]">{job.recruiter.name}</h3>
                                                <p className="text-sm text-gray-600">{job.recruiter.Specialization || 'Recruiter'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                            >
                                                <Mail className="h-4 w-4 mr-2" />
                                                Send Message
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white"
                                            >
                                                <Phone className="h-4 w-4 mr-2" />
                                                Call
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Similar Jobs */}
                        <Card className="bg-white border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-[#00193f]">Similar Jobs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-3 border border-gray-200 rounded-lg hover:border-[#2980d1] cursor-pointer">
                                        <h4 className="font-medium text-[#00193f]">Senior Developer</h4>
                                        <p className="text-sm text-gray-600">TechCorp • Remote</p>
                                        <div className="flex items-center mt-2">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">4.5</span>
                                        </div>
                                    </div>
                                    <div className="p-3 border border-gray-200 rounded-lg hover:border-[#2980d1] cursor-pointer">
                                        <h4 className="font-medium text-[#00193f]">Full Stack Engineer</h4>
                                        <p className="text-sm text-gray-600">StartupXYZ • New York</p>
                                        <div className="flex items-center mt-2">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">4.2</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobShow;
