// src/components/nav-link.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/nav';

export default function NavLink({ href, label }: NavItem) {

    const pathname = usePathname();
    const isActive = pathname === href;
  
    return <Link 
        href={href} 
        className={`hover:text-blue-500 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
        aria-current={'page'}
        aria-label={label}
    >{label}</Link>;
    
}