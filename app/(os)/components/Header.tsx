/**
 * Header Component
 * 
 * Top header for the Digital Twin OS.
 * Displays user profile, workspace context, and quick actions.
 * 
 * @module app/(os)/components/Header
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  workspaceName?: string;
  userName?: string;
}

export default function Header({ 
  workspaceName = 'My Workspace',
  userName = 'User'
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header 
      className="sticky top-0 z-20 px-6 py-4"
      style={{
        background: 'var(--bg-dark-secondary)',
        borderBottom: '1px solid var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left: Workspace Context */}
        <div className="flex items-center gap-4 ml-14 lg:ml-0">
          <div 
            className="px-4 py-2 rounded-lg"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div 
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              Workspace
            </div>
            <div 
              className="font-medium flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-sm">📁</span>
              <span style={{ fontSize: 'var(--font-size-sm)' }}>{workspaceName}</span>
            </div>
          </div>

          {/* Memory Status */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--color-success)' }}
            />
            <span 
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Contextual Memory Active
            </span>
          </div>
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-4">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              className="p-2 rounded-lg transition-colors hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
              }}
              title="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button 
              className="p-2 rounded-lg transition-colors hover:scale-105"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
              }}
              title="Help"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
              style={{
                background: showUserMenu ? 'rgba(59, 130, 246, 0.2)' : 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'var(--text-primary)',
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {userName}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Pro Plan
                </div>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: 'var(--text-muted)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-20"
                  style={{
                    background: 'var(--bg-dark-secondary)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'var(--glass-blur)',
                  }}
                >
                  <div className="py-2">
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>⚙️</span>
                      Settings
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>🏠</span>
                      Public Site
                    </Link>
                    <div 
                      className="my-2"
                      style={{ borderTop: '1px solid var(--glass-border)' }}
                    />
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left transition-colors"
                      style={{ color: 'var(--color-error)' }}
                    >
                      <span>🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
