import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { useState } from 'react';

const UsersDisplay = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = props.users?.slice(indexOfFirstUser, indexOfLastUser) || [];

    const totalPages = Math.ceil((props.users?.length || 0) / usersPerPage);

    return (
        <div className="flex flex-col gap-10">
            <h1 className="flex gap-5 text-xl font-bold">
                <Users /> All Users
            </h1>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg font-bold">ID</TableHead>
                        <TableHead className="text-lg font-bold">Name</TableHead>
                        <TableHead className="text-lg font-bold">Role</TableHead>
                        <TableHead className="text-lg font-bold">Email</TableHead>
                        <TableHead className="text-lg font-bold">Details</TableHead>
                        <TableHead className="text-lg font-bold">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentUsers.map((e, id) => (
                        <TableRow key={id}>
                            <TableCell className="py-5 font-semibold">{e.id}</TableCell>
                            <TableCell>{e.name}</TableCell>
                            <TableCell>{e.role}</TableCell>
                            <TableCell>{e.email}</TableCell>
                            <TableCell>
                                <Link to="#" className="rounded-lg bg-[#00193f] px-4 py-2 text-white">
                                    Details
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link to="#" className="rounded-lg bg-red-600 px-4 py-2 text-white">
                                    Delete
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="pt-2 flex items-center justify-center gap-3">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
                >
                    Prev
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersDisplay;
