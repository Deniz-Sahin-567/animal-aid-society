import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FolderGit2, LayoutGrid, Cat, MapPlus, Map, List, Mail, UserRoundPlus } from 'lucide-react';
import AppLogo from './app-logo';
import cats from '@/routes/cats';
import areas from '@/routes/areas';
import invitations from '@/routes/invitations';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Create Cat',
        href: cats.create(),
        icon: Cat,
    },
    {
        title: 'Cat List',
        href: cats.index(),
        icon: List,
    },
    {
        title: 'Create Area',
        href: areas.create(),
        icon: MapPlus,
    },
    {
        title: 'Areas',
        href: areas.index(),
        icon: Map,
    },
    {
        title: 'Invite Member',
        href: invitations.create(),
        icon: UserRoundPlus,
    },
    
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/Deniz-Sahin-567/animal-aid-society',
        icon: FolderGit2,
    },
    {
        title: 'Send e-mail to developer',
        href: 'mailto:bhdkweb@gmail.com', 
        icon: Mail,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
