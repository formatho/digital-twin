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

interface NavItem {
  href: string;
  label: string;
  emoji: string;
  description: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', emoji: '📊', description: 'Overview & activity' },
  { href: '/council', label: 'Council', emoji: '🎯', description: 'Strategic decisions' },
  { href: '/twins', label: 'Twins', emoji: '🤖', description: 'Twin profiles' },
  { href: '/marketplace', label: 'Marketplace', emoji: '🏪', description: 'Discover twins' },
  { href: '/workflows', label: 'Workflows', emoji: '⚡', description: 'Automation' },
  { href: '/memory', label: 'Memory', emoji: '🧠', description: '3-tier storage' },
  { href: '/settings', label: 'Settings', emoji: '⚙️', description: 'Configuration' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'var(--glass-blur)',
        }}
        aria-label="Toggle navigation"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: 'var(--text-primary)' }}
        >
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
        style={{
          width: isCollapsed ? '5rem' : '16rem',
          background: 'var(--bg-dark-secondary)',
          borderRight: '1px solid var(--glass-border)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <div 
            className="p-6 border-b"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              >
                🧬
              </div>
              {!isCollapsed && (
                <div>
                  <div 
                    className="font-bold text-lg gradient-text"
                    style={{ fontSize: 'var(--font-size-lg)' }}
                  >
                    Twin OS
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Digital Twin OS
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${isActive(item.href) ? 'nav-item-active' : 'nav-item-inactive'}
                `}
                style={{
                  background: isActive(item.href) 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                    : 'transparent',
                  border: isActive(item.href) 
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid transparent',
                  color: isActive(item.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0">{item.emoji}</span>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate" style={{ fontSize: 'var(--font-size-sm)' }}>
                      {item.label}
                    </div>
                    <div 
                      className="text-xs truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Collapse Toggle */}
          <div 
            className="p-4 border-t hidden lg:block"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <svg 
                className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!isCollapsed && 'Collapse'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
