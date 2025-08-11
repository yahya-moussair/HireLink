import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Edit, Mail, Calendar, User, Briefcase, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Recruiter Details',
        href: '#',
    },
];

const RecruiterShow = ({ recruiter }) => {
    const [actionRecruiter, setActionRecruiter] = useState(null);
    const [actionType, setActionType] = useState('');

    const handleAction = () => {
        if (actionRecruiter && actionType) {
            const routeName = actionType === 'approve' ? 'admin.recruiters.approve' : 'admin.recruiters.suspend';
            
            router.post(route(routeName, actionRecruiter.id), {}, {
                onSuccess: () => {
                    setActionRecruiter(null);
                    setActionType('');
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Action failed:', errors);
                }
            });
        }
    };

    const getStatusBadge = (recruiter) => {
        if (recruiter.email_verified_at) {
            return <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Approved
            </Badge>;
        } else {
            return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
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
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Recruiter Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-blue-600" />
                                    Recruiter Information
                                </CardTitle>
                                <CardDescription>Profile and account details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="text-gray-900 mt-1">{recruiter.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <p className="text-gray-900 mt-1 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            {recruiter.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Role</label>
                                        <div className="mt-1">
                                            <Badge className="bg-blue-100 text-blue-800">
                                                Recruiter
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Account Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(recruiter)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Specialization</label>
                                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                        {recruiter.Specialization || 'Not specified'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                    Account Activity
                                </CardTitle>
                                <CardDescription>Registration and approval information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Member Since</label>
                                        <p className="text-gray-900 mt-1">
                                            {new Date(recruiter.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="text-gray-900 mt-1">
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
                                        <label className="text-sm font-medium text-gray-700">Approved On</label>
                                        <p className="text-gray-900 mt-1">
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

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    Recruiter Privileges
                                </CardTitle>
                                <CardDescription>What this recruiter can do on the platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">Post and manage job offers</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">View and manage job applications</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">Access candidate profiles</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">Schedule interviews</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">Communicate with candidates</span>
                                    </div>
                                </div>
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
                                <Link href={route('admin.recruiters.edit', recruiter.id)} className="w-full">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Recruiter
                                    </Button>
                                </Link>
                                
                                {!recruiter.email_verified_at ? (
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-start text-green-600 hover:text-green-700"
                                        onClick={() => {
                                            setActionRecruiter(recruiter);
                                            setActionType('approve');
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
                                            setActionRecruiter(recruiter);
                                            setActionType('suspend');
                                        }}
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Suspend Recruiter
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recruiter ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 font-mono">{recruiter.id}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={!!actionRecruiter} onOpenChange={() => {
                setActionRecruiter(null);
                setActionType('');
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === 'approve' ? 'Approve Recruiter' : 'Suspend Recruiter'}
                        </DialogTitle>
                        <DialogDescription>
                            {actionType === 'approve' 
                                ? `Are you sure you want to approve ${actionRecruiter?.name}? They will gain full recruiter access and be able to post job offers.`
                                : `Are you sure you want to suspend ${actionRecruiter?.name}? They will lose recruiter privileges and won't be able to post new jobs.`
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                setActionRecruiter(null);
                                setActionType('');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={actionType === 'approve' ? 'default' : 'destructive'}
                            onClick={handleAction}
                        >
                            {actionType === 'approve' ? 'Approve Recruiter' : 'Suspend Recruiter'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default RecruiterShow;
