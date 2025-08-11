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
    ArrowLeft,
    Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs = [
    {
        title: 'Interviews',
        href: '/recruiter/interviews',
    },
    {
        title: 'Schedule Interview',
        href: '#',
    },
];

const CreateInterview = ({ application }) => {
    const [formData, setFormData] = useState({
        title: `Interview for ${application?.job?.title}`,
        description: '',
        scheduled_at: '',
        type: 'online',
        location: '',
        meeting_link: '',
        duration: 60,
        notes: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.scheduled_at) newErrors.scheduled_at = 'Date and time is required';
        if (formData.type === 'in-person' && !formData.location.trim()) {
            newErrors.location = 'Location is required for in-person interviews';
        }
        if (formData.type === 'online' && !formData.meeting_link.trim()) {
            newErrors.meeting_link = 'Meeting link is required for online interviews';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        router.post(route('recruiter.interviews.store', application.id), formData);
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule Interview" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href={route('recruiter.applications.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Applications
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application Info */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Details</CardTitle>
                                <CardDescription>Information about the candidate and job</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Candidate</Label>
                                    <p className="text-lg font-semibold text-[#00193f]">
                                        {application?.candidate?.name}
                                    </p>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Job Position</Label>
                                    <p className="text-lg font-semibold text-[#00193f]">
                                        {application?.job?.title}
                                    </p>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Company</Label>
                                    <p className="text-gray-700">
                                        {application?.job?.company_name}
                                    </p>
                                </div>
                                
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Applied Date</Label>
                                    <p className="text-gray-700">
                                        {new Date(application?.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Interview Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule Interview</CardTitle>
                                <CardDescription>Set up the interview details and schedule</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Interview Title */}
                                    <div>
                                        <Label htmlFor="title">Interview Title</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                            placeholder="Enter interview title"
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            placeholder="Enter interview description or agenda"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Date and Time */}
                                    <div>
                                        <Label htmlFor="scheduled_at">Date & Time</Label>
                                        <Input
                                            id="scheduled_at"
                                            type="datetime-local"
                                            value={formData.scheduled_at}
                                            onChange={(e) => handleChange('scheduled_at', e.target.value)}
                                            className={errors.scheduled_at ? 'border-red-500' : ''}
                                        />
                                        {errors.scheduled_at && (
                                            <p className="text-red-500 text-sm mt-1">{errors.scheduled_at}</p>
                                        )}
                                    </div>

                                    {/* Interview Type */}
                                    <div>
                                        <Label htmlFor="type">Interview Type</Label>
                                        <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="online">
                                                    <div className="flex items-center">
                                                        <Video className="h-4 w-4 mr-2" />
                                                        Online (Video Call)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="phone">
                                                    <div className="flex items-center">
                                                        <Phone className="h-4 w-4 mr-2" />
                                                        Phone Call
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="in-person">
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2" />
                                                        In-Person
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <Label htmlFor="duration">Duration (minutes)</Label>
                                        <Select value={formData.duration.toString()} onValueChange={(value) => handleChange('duration', parseInt(value))}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="45">45 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                                <SelectItem value="90">1.5 hours</SelectItem>
                                                <SelectItem value="120">2 hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Conditional Fields */}
                                    {formData.type === 'online' && (
                                        <div>
                                            <Label htmlFor="meeting_link">Meeting Link</Label>
                                            <Input
                                                id="meeting_link"
                                                type="url"
                                                value={formData.meeting_link}
                                                onChange={(e) => handleChange('meeting_link', e.target.value)}
                                                placeholder="https://meet.google.com/..."
                                                className={errors.meeting_link ? 'border-red-500' : ''}
                                            />
                                            {errors.meeting_link && (
                                                <p className="text-red-500 text-sm mt-1">{errors.meeting_link}</p>
                                            )}
                                        </div>
                                    )}

                                    {formData.type === 'in-person' && (
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => handleChange('location', e.target.value)}
                                                placeholder="Enter interview location"
                                                className={errors.location ? 'border-red-500' : ''}
                                            />
                                            {errors.location && (
                                                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Notes */}
                                    <div>
                                        <Label htmlFor="notes">Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            value={formData.notes}
                                            onChange={(e) => handleChange('notes', e.target.value)}
                                            placeholder="Additional notes or instructions for the candidate"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                                        <Link href={route('recruiter.applications.index')}>
                                            <Button variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" className="bg-[#202b61] hover:bg-[#2980d1] text-white">
                                            <Save className="h-4 w-4 mr-2" />
                                            Schedule Interview
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CreateInterview;
