import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit, Mail, Calendar, User, Briefcase, Shield } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Users Management',
        href: '/admin/users',
    },
    {
        title: 'User Details',
        href: '#',
    },
];

const UserShow = ({ user }) => {
    const getRoleBadge = (role) => {
        const variants = {
            admin: 'bg-red-100 text-red-800',
            recruiter: 'bg-blue-100 text-blue-800',
            user: 'bg-green-100 text-green-800',
        };
        return variants[role] || 'bg-gray-100 text-gray-800';
    };

    const getStatusBadge = (user) => {
        if (user.email_verified_at) {
            return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
        } else {
            return <Badge className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Details</h1>
                        <p className="text-gray-600 mt-2">View and manage user information</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('admin.users.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Users
                            </Button>
                        </Link>
                        <Link href={route('admin.users.edit', user.id)}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main User Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Basic Information
                                </CardTitle>
                                <CardDescription>User profile and account details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Profile Picture */}
                                <div className="text-center mb-6">
                                    <Avatar className="w-24 h-24 mx-auto">
                                        <AvatarImage src={user?.profile_picture_url} alt={user?.name} />
                                        <AvatarFallback className="text-2xl">
                                            {user?.name?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="text-gray-900 mt-1">{user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            {user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Role</label>
                                        <div className="mt-1">
                                            <Badge className={getRoleBadge(user.role)}>
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Account Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(user)}
                                        </div>
                                    </div>
                                </div>
                                
                                {user.Specialization && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Specialization</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-gray-500" />
                                            {user.Specialization}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                    Account Activity
                                </CardTitle>
                                <CardDescription>Registration and activity information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Member Since</label>
                                        <p className="text-gray-900 mt-1">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="text-gray-900 mt-1">
                                            {new Date(user.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                
                                {user.email_verified_at && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email Verified</label>
                                        <p className="text-gray-900 mt-1">
                                            {new Date(user.email_verified_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('admin.users.edit', user.id)} className="w-full">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit User
                                    </Button>
                                </Link>
                                
                                {user.role === 'recruiter' && (
                                    <div className="space-y-2">
                                        {!user.email_verified_at ? (
                                            <Button 
                                                variant="outline" 
                                                className="w-full justify-start text-green-600 hover:text-green-700"
                                            >
                                                <Shield className="h-4 w-4 mr-2" />
                                                Approve Recruiter
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="outline" 
                                                className="w-full justify-start text-orange-600 hover:text-orange-700"
                                            >
                                                <Shield className="h-4 w-4 mr-2" />
                                                Suspend Recruiter
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>User ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 font-mono">{user.id}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserShow;
