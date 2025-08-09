import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, CheckCircle, Clock } from 'lucide-react';

const EditRecruiter = ({ recruiter }) => {
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
            title: `Edit ${recruiter.name}`,
            href: `/admin/recruiters/${recruiter.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: recruiter.name || '',
        email: recruiter.email || '',
        password: '',
        Specialization: recruiter.Specialization || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.recruiters.update', recruiter.id));
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
            <Head title={`Edit ${recruiter.name}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Recruiter</h1>
                        <p className="text-gray-600 mt-2">Update recruiter information and settings</p>
                    </div>
                    <Link href={route('admin.recruiters.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Recruiters
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recruiter Information</CardTitle>
                                <CardDescription>Update the details for {recruiter.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Enter full name"
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Enter email address"
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">New Password (Optional)</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Leave blank to keep current password"
                                                className={errors.password ? 'border-red-500' : ''}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password}</p>
                                            )}
                                            <p className="text-xs text-gray-500">Leave blank to keep the current password</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="specialization">Specialization</Label>
                                            <Input
                                                id="specialization"
                                                type="text"
                                                value={data.Specialization}
                                                onChange={(e) => setData('Specialization', e.target.value)}
                                                placeholder="e.g., IT Recruitment, Healthcare, Finance"
                                                className={errors.Specialization ? 'border-red-500' : ''}
                                            />
                                            {errors.Specialization && (
                                                <p className="text-sm text-red-600">{errors.Specialization}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-6">
                                        <Link href={route('admin.recruiters.index')}>
                                            <Button type="button" variant="outline">
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            {processing ? 'Updating...' : 'Update Recruiter'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recruiter Status</CardTitle>
                                <CardDescription>Current approval status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Status</span>
                                    {getStatusBadge()}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Member Since</span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(recruiter.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Recruiter ID</span>
                                    <span className="text-sm text-gray-600">#{recruiter.id}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Manage recruiter status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('admin.recruiters.show', recruiter.id)} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        View Full Profile
                                    </Button>
                                </Link>
                                {!recruiter.email_verified_at ? (
                                    <form method="POST" action={route('admin.recruiters.approve', recruiter.id)}>
                                        <Button type="submit" variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve Recruiter
                                        </Button>
                                    </form>
                                ) : (
                                    <form method="POST" action={route('admin.recruiters.suspend', recruiter.id)}>
                                        <Button type="submit" variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
                                            <Clock className="h-4 w-4 mr-2" />
                                            Suspend Recruiter
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditRecruiter;
