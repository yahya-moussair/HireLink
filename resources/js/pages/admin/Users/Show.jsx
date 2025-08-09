import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Trash2, User, Mail, Calendar, Shield } from 'lucide-react';
import { useState } from 'react';

const ShowUser = ({ user }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { delete: destroy, processing } = useForm();

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
            title: user.name,
            href: `/admin/users/${user.id}`,
        },
    ];

    const handleDelete = () => {
        destroy(route('admin.users.destroy', user.id), {
            onSuccess: () => {
                setShowDeleteDialog(false);
            },
        });
    };

    const getRoleBadge = (role) => {
        const variants = {
            admin: 'bg-red-100 text-red-800',
            recruiter: 'bg-blue-100 text-blue-800',
            user: 'bg-green-100 text-green-800',
        };
        return variants[role] || 'bg-gray-100 text-gray-800';
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
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    User Information
                                </CardTitle>
                                <CardDescription>Personal details and account information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">{user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Role</label>
                                        <div className="mt-1">
                                            <Badge className={`${getRoleBadge(user.role)} flex items-center gap-1 w-fit`}>
                                                <Shield className="h-3 w-3" />
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Specialization</label>
                                        <p className="text-lg text-gray-900 mt-1">
                                            {user.Specialization || 'Not specified'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Member Since</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                        <p className="text-lg text-gray-900 mt-1">
                                            {new Date(user.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common user management tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('admin.users.edit', user.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600 hover:text-red-700"
                                    onClick={() => setShowDeleteDialog(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete User
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Account Status</CardTitle>
                                <CardDescription>Current account information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Account Status</span>
                                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Email Verified</span>
                                    <Badge className={user.email_verified_at ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                        {user.email_verified_at ? 'Verified' : 'Pending'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">User ID</span>
                                    <span className="text-sm text-gray-600">#{user.id}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {user.name}? This action cannot be undone and will permanently remove all user data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete User'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default ShowUser;
