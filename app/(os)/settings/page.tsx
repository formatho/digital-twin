/**
 * Settings Page
 * 
 * OS configuration with Glass Morphism design.
 * Includes Profile, API Keys, System Preferences, and Billing sections.
 * 
 * @module app/(os)/settings/page
 */

'use client';

import { useState } from 'react';
import GlassWrapper from '../components/GlassWrapper';

// Settings sections
const SECTIONS = [
  { id: 'profile', name: 'Profile', emoji: '👤' },
  { id: 'api', name: 'API Keys', emoji: '🔑' },
  { id: 'preferences', name: 'System Preferences', emoji: '⚙️' },
  { id: 'billing', name: 'Billing', emoji: '💳' },
];

// Mock settings data
const MOCK_SETTINGS = {
  profile: {
    name: 'Studio User',
    email: 'studio@formatho.com',
    timezone: 'Asia/Calcutta (GMT+5:30)',
    language: 'English',
    avatar: '👤',
  },
  api: {
    openai: { key: 'sk-••••••••••••••••', status: 'connected', lastUsed: '2m ago' },
    anthropic: { key: 'sk-ant-••••••••••', status: 'connected', lastUsed: '5m ago' },
    perplexity: { key: '', status: 'not_configured', lastUsed: null },
    custom: { key: '', status: 'not_configured', lastUsed: null },
  },
  preferences: {
    theme: 'dark',
    autoSave: true,
    notifications: true,
    analytics: true,
    autoOptimize: true,
    debugMode: false,
    twinMemoryRetention: '30 days',
    maxConcurrentTasks: 5,
  },
  billing: {
    plan: 'Pro',
    price: '$29/month',
    usage: { current: 847, limit: 5000 },
    renewalDate: 'April 15, 2026',
    paymentMethod: '•••• •••• •••• 4242',
  },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState(MOCK_SETTINGS);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div 
                className="text-6xl p-6 rounded-2xl"
                style={{ background: 'var(--glass-bg)' }}
              >
                {settings.profile.avatar}
              </div>
              <div>
                <button
                  className="px-4 py-2 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Upload Avatar
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, name: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Timezone
                </label>
                <select
                  value={settings.profile.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, timezone: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option>Asia/Calcutta (GMT+5:30)</option>
                  <option>America/New_York (GMT-5)</option>
                  <option>Europe/London (GMT+0)</option>
                  <option>America/Los_Angeles (GMT-8)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Language
                </label>
                <select
                  value={settings.profile.language}
                  onChange={(e) => setSettings({
                    ...settings,
                    profile: { ...settings.profile, language: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Configure API keys for LLM providers. Keys are encrypted and stored securely.
            </p>

            {Object.entries(settings.api).map(([provider, config]) => (
              <div 
                key={provider}
                className="p-4 rounded-lg"
                style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--glass-border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl capitalize">{provider === 'openai' ? '🤖' : provider === 'anthropic' ? '🧠' : provider === 'perplexity' ? '🔍' : '🔌'}</span>
                    <div>
                      <div className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                        {provider === 'openai' ? 'OpenAI' : provider === 'anthropic' ? 'Anthropic' : provider === 'perplexity' ? 'Perplexity' : 'Custom Endpoint'}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {config.status === 'connected' ? `Last used ${config.lastUsed}` : 'Not configured'}
                      </div>
                    </div>
                  </div>

                  <div 
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: config.status === 'connected' 
                        ? 'rgba(16, 185, 129, 0.2)'
                        : 'rgba(148, 163, 184, 0.2)',
                      color: config.status === 'connected'
                        ? 'var(--color-success)'
                        : 'var(--text-muted)',
                    }}
                  >
                    {config.status === 'connected' ? '✓ Connected' : 'Not Set'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type={showApiKey === provider ? 'text' : 'password'}
                    value={config.key}
                    placeholder={`Enter ${provider} API key...`}
                    className="flex-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <button
                    onClick={() => setShowApiKey(showApiKey === provider ? null : provider)}
                    className="px-3 py-2 rounded-lg"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {showApiKey === provider ? '🙈' : '👁️'}
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            {/* Toggle Settings */}
            <div className="space-y-4">
              {[
                { key: 'autoSave', label: 'Auto-save Conversations', description: 'Automatically save all council and twin conversations' },
                { key: 'notifications', label: 'Notifications', description: 'Receive alerts when twins complete tasks' },
                { key: 'analytics', label: 'Usage Analytics', description: 'Help improve the platform by sharing anonymous usage data' },
                { key: 'autoOptimize', label: 'Auto-optimize Memory', description: 'Automatically clean up unused memory blocks' },
                { key: 'debugMode', label: 'Debug Mode', description: 'Show detailed logs for troubleshooting' },
              ].map((pref) => (
                <div 
                  key={pref.key}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--glass-border)' }}
                >
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {pref.label}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {pref.description}
                    </div>
                  </div>

                  <button
                    onClick={() => setSettings({
                      ...settings,
                      preferences: { 
                        ...settings.preferences, 
                        [pref.key]: !settings.preferences[pref.key as keyof typeof settings.preferences]
                      }
                    })}
                    className="w-12 h-6 rounded-full transition-all"
                    style={{
                      background: settings.preferences[pref.key as keyof typeof settings.preferences]
                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                        : 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full transition-all"
                      style={{
                        background: 'white',
                        transform: settings.preferences[pref.key as keyof typeof settings.preferences]
                          ? 'translateX(24px)'
                          : 'translateX(2px)',
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Numeric Settings */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Memory Retention Period
                </label>
                <select
                  value={settings.preferences.twinMemoryRetention}
                  onChange={(e) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, twinMemoryRetention: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>Permanent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Max Concurrent Tasks
                </label>
                <input
                  type="number"
                  value={settings.preferences.maxConcurrentTasks}
                  onChange={(e) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, maxConcurrentTasks: parseInt(e.target.value) }
                  })}
                  min={1}
                  max={10}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div 
              className="p-6 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Current Plan
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {settings.billing.plan}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {settings.billing.price}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Renews {settings.billing.renewalDate}
                  </div>
                </div>
              </div>

              {/* Usage Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    API Usage
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {settings.billing.usage.current.toLocaleString()} / {settings.billing.usage.limit.toLocaleString()} calls
                  </span>
                </div>
                <div 
                  className="h-2 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${(settings.billing.usage.current / settings.billing.usage.limit) * 100}%`,
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div 
              className="p-4 rounded-lg flex items-center justify-between"
              style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--glass-border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Credit Card
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {settings.billing.paymentMethod}
                  </div>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-lg"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                }}
              >
                Update
              </button>
            </div>

            {/* Plan Options */}
            <div className="grid md:grid-cols-3 gap-4">
              {['Starter', 'Pro', 'Enterprise'].map((plan) => (
                <div 
                  key={plan}
                  className={`p-4 rounded-lg text-center ${
                    settings.billing.plan === plan ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ 
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    {plan}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {plan === 'Starter' ? '$0/mo' : plan === 'Pro' ? '$29/mo' : 'Custom'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Configure your Digital Twin OS
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              style={{
                background: activeSection === section.id
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                  : 'var(--glass-bg)',
                border: activeSection === section.id
                  ? '1px solid var(--color-primary)'
                  : '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="text-xl">{section.emoji}</span>
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <GlassWrapper>
            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              {SECTIONS.find(s => s.id === activeSection)?.emoji} {SECTIONS.find(s => s.id === activeSection)?.name}
            </h2>
            {renderSection()}
          </GlassWrapper>
        </div>
      </div>
    </div>
  );
}
