'use client';

import { useState } from 'react';
import { Menu, X, LayoutDashboard, DollarSign, Package, TrendingUp, Megaphone, MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Pricing', href: '/pricing', icon: TrendingUp },
  { name: 'Marketing', href: '/marketing', icon: Megaphone },
  { name: 'Support', href: '/support', icon: MessageSquareText },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
      <div className="font-bold text-lg bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        BizGenius AI
      </div>
      
      <button onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {/* Slide-out Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col p-6 animate-in slide-in-from-right duration-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-800 rounded-full">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
               const isActive = pathname.startsWith(item.href);
               return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={24} />
                  {item.name}
                </Link>
               );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}