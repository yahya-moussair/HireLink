import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    ArrowLeft, Save, Plus, X, Briefcase, MapPin, 
    DollarSign, Calendar, FileText, Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const breadcrumbs = [
    {
        title: 'Jobs',
        href: '/recruiter/jobs',
    },
    {
        title: 'Create',
        href: '/recruiter/jobs/create',
    },
];

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        company_name: '',
        location: '',
        type: '',
        salary_min: '',
        salary_max: '',
        description: '',
        requirements: '',
        benefits: '',
        skills: '',
        experience_level: ''
    });

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills(prev => [...prev, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(prev => prev.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const submitData = {
            ...formData,
            skills: skills.join(',')
        };

        router.post(route('recruiter.jobs.store'), submitData, {
            onSuccess: () => {
                // Redirect to jobs list on success
                router.get(route('recruiter.jobs.index'));
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Job Posting" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button 
                        variant="ghost" 
                        onClick={() => router.get(route('recruiter.jobs.index'))}
                        className="text-[#00193f] hover:text-[#2980d1]"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Jobs
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#00193f]">Create Job Posting</h1>
                        <p className="text-[#202b61] text-sm">Post a new job to attract candidates</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-[#2980d1]" />
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription>Essential details about the position</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Job Title *
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="e.g., Senior Software Engineer"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Your company name"
                                            value={formData.company_name}
                                            onChange={(e) => handleInputChange('company_name', e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Location *
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., New York, NY or Remote"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Job Type *
                                            </label>
                                            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select job type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="full-time">Full Time</SelectItem>
                                                    <SelectItem value="part-time">Part Time</SelectItem>
                                                    <SelectItem value="contract">Contract</SelectItem>
                                                    <SelectItem value="internship">Internship</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Minimum Salary
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="e.g., 50000"
                                                value={formData.salary_min}
                                                onChange={(e) => handleInputChange('salary_min', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Maximum Salary
                                            </label>
                                            <Input
                                                type="number"
                                                placeholder="e.g., 80000"
                                                value={formData.salary_max}
                                                onChange={(e) => handleInputChange('salary_max', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Job Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-[#2980d1]" />
                                        Job Description
                                    </CardTitle>
                                    <CardDescription>Detailed description of the role and responsibilities</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <Textarea
                                            placeholder="Provide a comprehensive description of the role, responsibilities, and what the candidate will be doing..."
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Requirements
                                        </label>
                                        <Textarea
                                            placeholder="List the key requirements, qualifications, and experience needed..."
                                            value={formData.requirements}
                                            onChange={(e) => handleInputChange('requirements', e.target.value)}
                                            rows={4}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Benefits
                                        </label>
                                        <Textarea
                                            placeholder="Describe the benefits, perks, and advantages of working for your company..."
                                            value={formData.benefits}
                                            onChange={(e) => handleInputChange('benefits', e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Skills and Experience */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-[#2980d1]" />
                                        Skills & Experience
                                    </CardTitle>
                                    <CardDescription>Required skills and experience level</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Experience Level
                                        </label>
                                        <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select experience level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="entry">Entry Level</SelectItem>
                                                <SelectItem value="mid">Mid Level</SelectItem>
                                                <SelectItem value="senior">Senior Level</SelectItem>
                                                <SelectItem value="executive">Executive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Required Skills
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex space-x-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Add a skill"
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                                />
                                                <Button type="button" onClick={handleAddSkill} size="sm">
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, index) => (
                                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveSkill(skill)}
                                                                className="ml-1 hover:text-red-600"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job Preview</CardTitle>
                                    <CardDescription>How your job will appear to candidates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold text-[#00193f]">
                                                {formData.title || 'Job Title'}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {formData.company_name || 'Company Name'}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {formData.location || 'Location'}
                                            </span>
                                            <span className="flex items-center">
                                                <Briefcase className="h-4 w-4 mr-1" />
                                                {formData.type || 'Job Type'}
                                            </span>
                                        </div>
                                        {formData.salary_min && formData.salary_max && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                ${formData.salary_min} - ${formData.salary_max}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit */}
                            <Card>
                                <CardContent className="pt-6">
                                    <Button type="submit" className="w-full bg-[#202b61] hover:bg-[#2980d1] text-white">
                                        <Save className="h-4 w-4 mr-2" />
                                        Create Job Posting
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateJob;
