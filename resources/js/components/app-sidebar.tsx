import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, Briefcase, Calendar, FileUser, LayoutGrid, MessageSquare, UsersIcon, FileText, Building } from 'lucide-react';
import AppLogo from './app-logo';
import { Images } from '@/constant';

const adminNavItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: UsersIcon,
    },
    {
        title: 'Recruiters',
        href: '/admin/recruiters',
        icon: FileUser,
    },
    {
        title: 'Job Offers',
        href: '/admin/jobs',
        icon: Briefcase,
    },
    {
        title: 'Reports',
        href: '/admin/reports',
        icon: BarChart3,
    },
    {
        title: 'Chat Moderation',
        href: '/admin/chat',
        icon: MessageSquare,
    },
    {
        title: 'Calendar',
        href: '/admin/calendar',
        icon: Calendar,
    },
];

const recruiterNavItems = [
    {
        title: 'Dashboard',
        href: '/recruiter',
        icon: LayoutGrid,
    },
    {
        title: 'Jobs',
        href: '/recruiter/jobs',
        icon: Briefcase,
    },
    {
        title: 'Applications',
        href: '/recruiter/applications',
        icon: FileText,
    },
    {
        title: 'Candidates',
        href: '/recruiter/candidates',
        icon: UsersIcon,
    },
    {
        title: 'Interviews',
        href: '/recruiter/interviews',
        icon: Calendar,
    },
    {
        title: 'Analytics',
        href: '/recruiter/analytics',
        icon: BarChart3,
    },
];

const userNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Jobs',
        href: '/jobs',
        icon: Briefcase,
    },
    {
        title: 'Applications',
        href: '/applications',
        icon: FileText,
    },
    {
        title: 'Messages',
        href: '/messages',
        icon: MessageSquare,
    },
    {
        title: 'Profile',
        href: '/profile',
        icon: UsersIcon,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'user';
    
    let navItems = userNavItems;
    let dashboardUrl = '/dashboard';
    let logoLink = '/dashboard';
    
    if (userRole === 'admin') {
        navItems = adminNavItems;
        dashboardUrl = '/admin';
        logoLink = '/admin';
    } else if (userRole === 'recruiter') {
        navItems = recruiterNavItems;
        dashboardUrl = '/recruiter';
        logoLink = '/recruiter';
    }

    return (
        <Sidebar collapsible="icon" variant="inset" className='bg-[#00193f] text-white'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={logoLink} prefetch>
                                <img src={Images.whiteLogo} className='w-[10rem]' alt="" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
