import React, { useState, useRef } from 'react';
import { User, Edit3, Save, X, Camera, Upload, MapPin, Calendar, Briefcase, Mail, Phone, Globe, Linkedin, Github, Eye, FileText, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { router } from '@inertiajs/react';

const ProfileIndex = ({ user, profile, stats }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        specialization: user?.Specialization || '',
        bio: profile?.bio || '',
        location: profile?.location || '',
        phone: profile?.phone || '',
        website: profile?.website || '',
        linkedin: profile?.linkedin || '',
        github: profile?.github || ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('profile_picture', selectedImage);

        try {
            router.post('/user/profile/upload-image', formData, {
                onSuccess: (page) => {
                    console.log('Image upload successful:', page);
                    setSelectedImage(null);
                    setImagePreview(null);
                    // Refresh the page to show updated image
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error('Image upload failed:', errors);
                    alert('Failed to upload image: ' + Object.values(errors).flat().join(', '));
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image: ' + error.message);
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        
        try {
            console.log('Submitting profile update:', {
                name: formData.name,
                Specialization: formData.specialization,
            });
            
            // Send the profile update request
            router.put('/user/profile', {
                name: formData.name,
                Specialization: formData.specialization,
                // Note: email updates might need special handling
                // bio: formData.bio,
                // location: formData.location,
            }, {
                onSuccess: (page) => {
                    console.log('Profile update successful:', page);
                    setIsEditing(false);
                    // Refresh the page to show updated data
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error('Profile update failed:', errors);
                    alert('Failed to update profile: ' + Object.values(errors).flat().join(', '));
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            specialization: user?.Specialization || '',
            bio: profile?.bio || '',
            location: profile?.location || '',
            phone: profile?.phone || '',
            website: profile?.website || '',
            linkedin: profile?.linkedin || '',
            github: profile?.github || ''
        });
        setSelectedImage(null);
        setImagePreview(null);
        setIsEditing(false);
    };

    const getProfileImageSrc = () => {
        if (imagePreview) return imagePreview;
        if (user?.profile_picture_url) return user.profile_picture_url;
        return null;
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#EAF4FF,#F5F6FA)]">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#00193f]">Professional Profile</h1>
                            <p className="text-[#202b61] mt-2">Showcase your skills and experience to potential employers</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {!isEditing ? (
                                <Button 
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#202b61] hover:bg-[#2980d1] text-white transition-all duration-300"
                                >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button 
                                        onClick={handleSave} 
                                        disabled={isLoading}
                                        className="bg-[#202b61] hover:bg-[#2980d1] text-white transition-all duration-300"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleCancel} 
                                        disabled={isLoading}
                                        className="border-[#202b61] text-[#202b61] hover:bg-[#202b61] hover:text-white transition-all duration-300"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="relative inline-block mb-6">
                                        <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                                            <AvatarImage src={getProfileImageSrc()} alt={user?.name} />
                                            <AvatarFallback className="text-3xl bg-[#202b61] text-white">
                                                {user?.name?.charAt(0)?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {isEditing && (
                                            <label className="absolute bottom-0 right-0 bg-[#202b61] text-white p-3 rounded-full cursor-pointer hover:bg-[#2980d1] transition-all duration-300 shadow-lg">
                                                <Camera className="h-5 w-5" />
                                                <input 
                                                    ref={fileInputRef}
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={handleImageSelect}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    
                                    {isEditing && selectedImage && (
                                        <div className="mb-6 p-4 bg-[#EAF4FF] rounded-lg">
                                            <div className="text-sm text-[#00193f] mb-3">
                                                Selected: {selectedImage.name}
                                            </div>
                                            <Button 
                                                onClick={handleImageUpload}
                                                disabled={isLoading}
                                                size="sm"
                                                className="w-full bg-[#202b61] hover:bg-[#2980d1] text-white transition-all duration-300"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                {isLoading ? 'Uploading...' : 'Upload Image'}
                                            </Button>
                                        </div>
                                    )}
                                    
                                    <h2 className="text-2xl font-bold text-[#00193f] mb-2">{user?.name}</h2>
                                    <p className="text-lg text-[#202b61] mb-4">{user?.Specialization}</p>
                                    
                                    <Separator className="my-6" />
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 flex items-center">
                                                <Eye className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Profile Views
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.profileViews || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 flex items-center">
                                                <FileText className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Applications
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.totalApplications || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 flex items-center">
                                                <Target className="h-4 w-4 mr-2 text-[#2980d1]" />
                                                Interviews
                                            </span>
                                            <span className="font-semibold text-[#00193f]">{stats?.totalInterviews || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg text-[#00193f] flex items-center">
                                    <Mail className="h-5 w-5 mr-2 text-[#2980d1]" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-3 text-[#2980d1]" />
                                    <span>{user?.email}</span>
                                </div>
                                {profile?.phone && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-4 w-4 mr-3 text-[#2980d1]" />
                                        <span>{profile.phone}</span>
                                    </div>
                                )}
                                {profile?.location && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-3 text-[#2980d1]" />
                                        <span>{profile.location}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Profile Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#00193f]">
                                    <User className="h-5 w-5 text-[#2980d1]" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block">Full Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            disabled={!isEditing}
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block">Email</label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            disabled={!isEditing}
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block">Specialization</label>
                                        <Input
                                            value={formData.specialization}
                                            onChange={(e) => handleInputChange('specialization', e.target.value)}
                                            disabled={!isEditing}
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block">Location</label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            disabled={!isEditing}
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-[#00193f] mb-2 block">Professional Bio</label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Tell us about your professional experience, skills, and career goals..."
                                        rows={4}
                                        className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#00193f]">
                                    <Globe className="h-5 w-5 text-[#2980d1]" />
                                    Social Links & Portfolio
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block flex items-center">
                                            <Linkedin className="h-4 w-4 mr-2 text-[#2980d1]" />
                                            LinkedIn Profile
                                        </label>
                                        <Input
                                            value={formData.linkedin}
                                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block flex items-center">
                                            <Github className="h-4 w-4 mr-2 text-[#2980d1]" />
                                            GitHub Profile
                                        </label>
                                        <Input
                                            value={formData.github}
                                            onChange={(e) => handleInputChange('github', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="https://github.com/yourusername"
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-[#00193f] mb-2 block flex items-center">
                                            <Globe className="h-4 w-4 mr-2 text-[#2980d1]" />
                                            Personal Website
                                        </label>
                                        <Input
                                            value={formData.website}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="https://yourwebsite.com"
                                            className="border-gray-300 focus:border-[#2980d1] focus:ring-[#2980d1]"
                                        />
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

export default ProfileIndex;
