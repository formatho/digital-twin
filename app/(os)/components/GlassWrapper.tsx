/**
 * GlassWrapper Component
 * 
 * Provides the glass morphism container for OS content.
 * Uses CSS variables from globals.css for consistency.
 * 
 * @module app/(os)/components/GlassWrapper
 */

'use client';

interface GlassWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassWrapper({ children, className = '' }: GlassWrapperProps) {
  return (
    <div 
      className={`glass-wrapper ${className}`}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        boxShadow: 'var(--glass-shadow)',
        padding: 'var(--spacing-xl)',
        minHeight: '100%',
      }}
    >
      {children}
    </div>
  );
}
