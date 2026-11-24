import type {ComponentType} from "react";
import HomeIcon from "../shared/icons/HomeIcon/HomeIcon.tsx";
import MoneyIcon from "../shared/icons/MoneyIcon/MoneyIcon.tsx";
import MedIcon from "../shared/icons/MedIcon/MedIcon.tsx";
import CertificateIcon from "../shared/icons/CertificateIcon/CertificateIcon.tsx";
import ContactIcon from "../shared/icons/ContactIcon/ContactIcon.tsx";
import CalendarIcon from "../shared/icons/CalendarIcon/CalendarIcon.tsx";
import DashboardIcon from "../shared/icons/DashboardIcon/DashboardIcon.tsx";

export interface MenuItem {
    to: string;
    label?: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    end?: boolean;
}

export const NAV_ITEMS: MenuItem[] = [
    {
        to: '/',
        label: 'Home',
        icon: HomeIcon,
        end: true
    },
    {
        to: '/balance',
        label: 'Balance',
        icon: MoneyIcon,
    },
    {
        to: '/med',
        label: 'Medicine',
        icon: MedIcon,
    },
    {
        to: '/certificate',
        label: 'Certificate',
        icon: CertificateIcon,
    },
    {
        to: '/contacts',
        label: 'Contacts',
        icon: ContactIcon,
    },
    {
        to: '/calendar',
        label: 'Calendar',
        icon: CalendarIcon,
    },
    {
        to: '/dashboard',
        label: 'Dashboard',
        icon: DashboardIcon,
    }
]