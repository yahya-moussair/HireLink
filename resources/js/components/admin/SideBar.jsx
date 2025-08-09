import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import UsersDisplay from './UsersDisplay';


const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
];
const SideBar = () => {
    const { users } = usePage().props;
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        price: 0,
        quantity: 0,
    });
    
    return (
        <div className="bg-[linear-gradient(135deg,_#EAF4FF,_#F5F6FA)]">
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className='p-10'>
                    <UsersDisplay users={users}/>
                </div>
            </AppLayout>
        </div>
    );
};

export default SideBar;
