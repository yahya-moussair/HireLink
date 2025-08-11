import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Briefcase, Mail, User, Shield } from 'lucide-react';

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
        title: 'Edit Recruiter',
        href: '#',
    },
];

const RecruiterEdit = ({ recruiter }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: recruiter.name || '',
        email: recruiter.email || '',
        Specialization: recruiter.Specialization || '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.recruiters.update', recruiter.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Recruiter: ${recruiter.name}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Recruiter</h1>
                        <p className="text-gray-600 mt-2">Update recruiter information and specialization</p>
                    </div>
                    <Link href={route('admin.recruiters.show', recruiter.id)}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Recruiter
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            Recruiter Information
                        </CardTitle>
                        <CardDescription>Update the recruiter's profile and specialization</CardDescription>
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

                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    className={errors.password ? 'border-red-500' : ''}
                                />
                                <p className="text-sm text-gray-500">Leave blank if you don't want to change the password</p>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-medium text-blue-900 mb-2">Recruiter Privileges</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Post and manage job offers</li>
                                    <li>• View and manage job applications</li>
                                    <li>• Access candidate profiles</li>
                                    <li>• Schedule interviews</li>
                                    <li>• Communicate with candidates</li>
                                </ul>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Link href={route('admin.recruiters.show', recruiter.id)}>
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
        </AppLayout>
    );
};

export default RecruiterEdit;
