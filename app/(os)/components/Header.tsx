/**
 * Header Component
 *
 * Top header for the Digital Twin OS.
 * Displays user profile, workspace context, search, and breadcrumbs.
 *
 * @module app/(os)/components/Header
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  FolderOpen,
  User,
  LogOut,
  Home,
  ChevronRight,
  Settings,
} from 'lucide-react';

interface HeaderProps {
  workspaceName?: string;
  userName?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Header({
  workspaceName = 'My Workspace',
  userName = 'User'
}: HeaderProps) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/dashboard' }
    ];

    let currentPath = '';
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, href: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header
      className="sticky top-0 z-20 px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <nav className="flex items-center gap-2 text-sm overflow-hidden">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href || crumb.label} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={`truncate hover:underline transition-colors ${
                      index === breadcrumbs.length - 1
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="truncate text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <motion.div
            className="relative"
            animate={{
              scale: isSearchFocused ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search twins, workflows, memory..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Workspace Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 border border-gray-200">
            <FolderOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium truncate text-gray-900">
              {workspaceName}
            </span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                showUserMenu
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <div className="text-sm font-medium truncate text-gray-900">
                  {userName}
                </div>
                <div className="text-xs truncate text-gray-500">
                  Pro Plan
                </div>
              </div>
              <motion.div
                animate={{ rotate: showUserMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-20 overflow-hidden bg-white border border-gray-200"
                  >
                    <div className="py-2">
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Home className="w-4 h-4" />
                        Public Site
                      </Link>
                      <div className="my-2 border-t border-gray-200" />
                      <button
                        className="flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
