'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Cases', href: '/cases' },
    { name: 'Clients', href: '/clients' },
    { name: 'Time Tracking', href: '/time' },
    { name: 'Invoices', href: '/invoices' },
    { name: 'Documents', href: '/documents' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="bg-teal-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-semibold">HK Legal</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-mint-green text-white'
                      : 'text-white hover:bg-teal-dark hover:bg-opacity-75'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{session?.user?.name || session?.user?.email}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-white text-teal-dark hover:bg-light-gray border-white"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
