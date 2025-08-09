import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

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
        title: 'Create Recruiter',
        href: '/admin/recruiters/create',
    },
];

const CreateRecruiter = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        Specialization: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.recruiters.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Recruiter" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Recruiter</h1>
                        <p className="text-gray-600 mt-2">Add a new recruiter to the platform</p>
                    </div>
                    <Link href={route('admin.recruiters.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Recruiters
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Recruiter Information</CardTitle>
                        <CardDescription>Enter the details for the new recruiter (will be pending approval)</CardDescription>
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
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter password"
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
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
                                <Link href={route('admin.recruiters.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Creating...' : 'Create Recruiter'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default CreateRecruiter;
