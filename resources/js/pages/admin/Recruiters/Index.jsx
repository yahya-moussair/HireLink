import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
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
];

const RecruitersIndex = ({ recruiters, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [deleteRecruiter, setDeleteRecruiter] = useState(null);
    const [actionRecruiter, setActionRecruiter] = useState(null);
    const [actionType, setActionType] = useState('');



    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/recruiters', {
            search: searchTerm,
            status: statusFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilterChange = (value) => {
        const filterValue = value === 'all' ? '' : value;
        setStatusFilter(filterValue);
        router.get('/admin/recruiters', {
            search: searchTerm,
            status: filterValue,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = () => {
        if (deleteRecruiter) {
            router.delete(route('admin.recruiters.destroy', deleteRecruiter.id), {
                onSuccess: () => {
                    setDeleteRecruiter(null);
                    router.reload({ only: ['recruiters'] });
                },
                onError: (errors) => {
                    console.error('Delete failed:', errors);
                }
            });
        }
    };

    const handleAction = () => {
        if (actionRecruiter && actionType) {
            const routeName = actionType === 'approve' ? 'admin.recruiters.approve' : 'admin.recruiters.suspend';
            console.log('Starting action:', actionType, 'for recruiter:', actionRecruiter.name);
            console.log('Route:', route(routeName, actionRecruiter.id));
            
            router.post(route(routeName, actionRecruiter.id), {}, {
                onSuccess: (response) => {
                    console.log('Action successful:', response);
                    setActionRecruiter(null);
                    setActionType('');
                    router.reload({ only: ['recruiters'] });
                },
                onError: (errors) => {
                    console.error('Action failed:', errors);
                },
                onFinish: () => {
                    console.log('Action finished');
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
                <Clock className="h-3 w-3" />
                Pending
            </Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recruiters Management" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Recruiters Management</h1>
                        <p className="text-gray-600 mt-2">Manage recruiters, approve applications, and monitor activity</p>
                    </div>
                    <Link href={route('admin.recruiters.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Recruiter
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Search & Filter Recruiters</CardTitle>
                        <CardDescription>Find recruiters by name, email, or specialization</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search recruiters..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Select value={statusFilter || "all"} onValueChange={handleFilterChange}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending Approval</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" variant="outline">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recruiters ({recruiters.total})</CardTitle>
                        <CardDescription>All registered recruiters on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Specialization</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recruiters.data.map((recruiter) => (
                                        <TableRow key={recruiter.id}>
                                            <TableCell className="font-medium">{recruiter.name}</TableCell>
                                            <TableCell>{recruiter.email}</TableCell>
                                            <TableCell>{recruiter.Specialization || 'Not specified'}</TableCell>
                                            <TableCell>{getStatusBadge(recruiter)}</TableCell>
                                            <TableCell>{new Date(recruiter.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('admin.recruiters.show', recruiter.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.recruiters.edit', recruiter.id)}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    {!recruiter.email_verified_at ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setActionRecruiter(recruiter);
                                                                setActionType('approve');
                                                            }}
                                                            className="text-green-600 hover:text-green-700"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setActionRecruiter(recruiter);
                                                                setActionType('suspend');
                                                            }}
                                                            className="text-orange-600 hover:text-orange-700"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDeleteRecruiter(recruiter)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {recruiters.data.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No recruiters found matching your criteria.</p>
                            </div>
                        )}

                        {recruiters.links && (
                            <div className="flex justify-center mt-6">
                                <div className="flex gap-2">
                                    {recruiters.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!deleteRecruiter} onOpenChange={() => setDeleteRecruiter(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Recruiter</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {deleteRecruiter?.name}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteRecruiter(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete Recruiter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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

export default RecruitersIndex;
