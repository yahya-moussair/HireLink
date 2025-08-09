import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Trash2, User, Mail, Calendar, Shield, CheckCircle, XCircle, Clock, Briefcase } from 'lucide-react';
import { useState } from 'react';

const ShowRecruiter = ({ recruiter }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showActionDialog, setShowActionDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const { delete: destroy, post, processing } = useForm();

    const breadcrumbs = [
        {
            title: 'Admin Dashboard',
            href: '/admin',
        },
        {
            title: 'Recruiters Management',
            href: '/admin/recruiters',
        },
        {
            title: recruiter.name,
            href: `/admin/recruiters/${recruiter.id}`,
        },
    ];

    const handleDelete = () => {
        destroy(route('admin.recruiters.destroy', recruiter.id), {
            onSuccess: () => {
                setShowDeleteDialog(false);
            },
        });
    };

    const handleAction = () => {
        const routeName = actionType === 'approve' ? 'admin.recruiters.approve' : 'admin.recruiters.suspend';
        post(route(routeName, recruiter.id), {}, {
            onSuccess: () => {
                setShowActionDialog(false);
                setActionType('');
            },
        });
    };

    const getStatusBadge = () => {
        if (recruiter.email_verified_at) {
            return <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Approved
            </Badge>;
        } else {
            return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Pending Approval
            </Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Recruiter: ${recruiter.name}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Recruiter Details</h1>
                        <p className="text-gray-600 mt-2">View and manage recruiter information</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('admin.recruiters.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Recruiters
                            </Button>
                        </Link>
                        <Link href={route('admin.recruiters.edit', recruiter.id)}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Recruiter
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Recruiter
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Recruiter Information
                                </CardTitle>
                                <CardDescription>Personal details and account information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">{recruiter.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {recruiter.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge()}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Specialization</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" />
                                            {recruiter.Specialization || 'Not specified'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Member Since</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(recruiter.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                        <p className="text-lg text-gray-900 mt-1">
                                            {new Date(recruiter.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {recruiter.email_verified_at && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Approved On</label>
                                        <p className="text-lg text-gray-900 mt-1 flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            {new Date(recruiter.email_verified_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Recruiter Activity</CardTitle>
                                <CardDescription>Platform activity and statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">0</div>
                                        <div className="text-sm text-blue-800">Job Posts</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">0</div>
                                        <div className="text-sm text-green-800">Applications</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">0</div>
                                        <div className="text-sm text-purple-800">Interviews</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common recruiter management tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('admin.recruiters.edit', recruiter.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                                {!recruiter.email_verified_at ? (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-green-600 hover:text-green-700"
                                        onClick={() => {
                                            setActionType('approve');
                                            setShowActionDialog(true);
                                        }}
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve Recruiter
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-orange-600 hover:text-orange-700"
                                        onClick={() => {
                                            setActionType('suspend');
                                            setShowActionDialog(true);
                                        }}
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Suspend Recruiter
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-red-600 hover:text-red-700"
                                    onClick={() => setShowDeleteDialog(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Recruiter
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
                                    {getStatusBadge()}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Account Type</span>
                                    <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                                        <Shield className="h-3 w-3" />
                                        Recruiter
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Recruiter ID</span>
                                    <span className="text-sm text-gray-600">#{recruiter.id}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Recruiter</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {recruiter.name}? This action cannot be undone and will permanently remove all recruiter data and associated job posts.
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
                            {processing ? 'Deleting...' : 'Delete Recruiter'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === 'approve' ? 'Approve Recruiter' : 'Suspend Recruiter'}
                        </DialogTitle>
                        <DialogDescription>
                            {actionType === 'approve' 
                                ? `Are you sure you want to approve ${recruiter.name}? They will gain full recruiter access and be able to post jobs.`
                                : `Are you sure you want to suspend ${recruiter.name}? They will lose recruiter privileges and won't be able to post new jobs.`
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowActionDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant={actionType === 'approve' ? 'default' : 'destructive'}
                            onClick={handleAction}
                            disabled={processing}
                        >
                            {processing 
                                ? (actionType === 'approve' ? 'Approving...' : 'Suspending...')
                                : (actionType === 'approve' ? 'Approve Recruiter' : 'Suspend Recruiter')
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default ShowRecruiter;
