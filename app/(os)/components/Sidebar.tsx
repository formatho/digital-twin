/**
 * Sidebar Component
 *
 * Persistent navigation sidebar for the Digital Twin OS.
 * Responsive: Collapsible on smaller screens.
 *
 * @module app/(os)/components/Sidebar
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X, LayoutDashboard, Target, Bot, ShoppingBag, Zap, Brain, Settings } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  description: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & activity' },
  { href: '/council', label: 'Council', icon: Target, description: 'Strategic decisions' },
  { href: '/twins', label: 'Twins', icon: Bot, description: 'Twin profiles' },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag, description: 'Discover twins' },
  { href: '/workflows', label: 'Workflows', icon: Zap, description: 'Automation' },
  { href: '/memory', label: 'Memory', icon: Brain, description: '3-tier storage' },
  { href: '/settings', label: 'Settings', icon: Settings, description: 'Configuration' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle navigation"
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '5rem' : '16rem',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: '#ffffff',
          borderRight: '1px solid #e5e7eb',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <motion.div
            className="p-6 border-b overflow-hidden"
            style={{ borderColor: '#e5e7eb' }}
            animate={{ width: isCollapsed ? '5rem' : '16rem' }}
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">🧬</span>
              </motion.div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Twin OS</div>
                    <div className="text-xs text-gray-500">
                      Digital Twin OS
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl overflow-hidden group transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 relative z-10"
                    style={{
                      color: isActive(item.href) ? '#3b82f6' : '#64748b',
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>

                  {/* Label and description */}
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 min-w-0 relative z-10"
                      >
                        <div className={`font-medium truncate text-sm ${
                          isActive(item.href) ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {item.label}
                        </div>
                        <div className="text-xs truncate text-gray-500">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-blue-600"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Collapse Toggle */}
          <motion.div
            className="p-4 border-t overflow-hidden hidden lg:block"
            style={{ borderColor: '#e5e7eb' }}
            animate={{ width: isCollapsed ? '5rem' : '16rem' }}
          >
            <motion.button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </motion.div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm"
                  >
                    Collapse
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
