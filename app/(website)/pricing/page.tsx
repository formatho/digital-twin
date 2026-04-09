'use client';

import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Users,
  Zap,
  Shield,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

/**
 * Pricing Page - Digital Twin OS
 *
 * Glassmorphism pricing with 3 tiers, feature comparison, and FAQ
 *
 * @module app/(website)/pricing
 */

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: { monthly: 0, annual: 0 },
      icon: Rocket,
      color: '#3b82f6',
      features: [
        { name: '5 Council Twins', included: true },
        { name: '10 Skill Twins', included: true },
        { name: 'Basic memory (1GB)', included: true },
        { name: 'Community support', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom twin training', included: false },
        { name: 'SSO & SAML', included: false },
        { name: 'Dedicated account manager', included: false },
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For teams and growing businesses',
      price: { monthly: 39, annual: 29 },
      icon: Zap,
      color: '#8b5cf6',
      features: [
        { name: '5 Council Twins', included: true },
        { name: '10 Skill Twins', included: true },
        { name: 'Advanced memory (10GB)', included: true },
        { name: 'Priority support', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'API access', included: true },
        { name: 'Webhook integrations', included: true },
        { name: 'Custom twin training', included: false },
        { name: 'SSO & SAML', included: false },
        { name: 'Dedicated account manager', included: false },
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: { monthly: null, annual: null },
      icon: Users,
      color: '#10b981',
      features: [
        { name: '5 Council Twins', included: true },
        { name: 'Unlimited Skill Twins', included: true },
        { name: 'Unlimited memory', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'Advanced API access', included: true },
        { name: 'Custom twin training', included: true },
        { name: 'SSO & SAML', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between Council and Skill twins?',
      answer: 'Council Twins (Strategist, Builder, Analyst, Operator, Critic) provide high-level strategic guidance and debate your decisions. Skill Twins (Research, Content, Design, Code, etc.) are specialists who execute specific tasks and workflows.',
    },
    {
      question: 'Can I switch between plans?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the end of your billing cycle.',
    },
    {
      question: 'Is there a free trial for the Pro plan?',
      answer: 'Yes, we offer a 14-day free trial for the Pro plan. No credit card required to start. You\'ll have full access to all Pro features during the trial period.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also support wire transfers and invoicing.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption for data at rest and in transit. We\'re SOC 2 Type II compliant and GDPR ready. Enterprise plans include additional security features like SSO and audit logs.',
    },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* ========================================
          HEADER
          ======================================== */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
               style={{
                 background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
                 filter: 'blur(80px)',
               }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
               style={{
                 background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)',
                 filter: 'blur(80px)',
                 animationDelay: '1s',
               }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all"
                style={{ color: 'var(--color-primary)' }}>
            ← Back to Home
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              Start free, scale as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-xl glass-card">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isAnnual
                    ? 'glass-btn-primary'
                    : 'hover:bg-white/10'
                }`}
                style={{ color: !isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isAnnual
                    ? 'glass-btn-primary'
                    : 'hover:bg-white/10'
                }`}
                style={{ color: isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                Annual
              </button>
              <div className="px-3 py-1 rounded-full text-xs font-medium"
                   style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-success)' }}>
                Save 25%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PRICING CARDS
          ======================================== */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.price.annual : plan.price.monthly;

              return (
                <div
                  key={plan.name}
                  className={`relative glass-card p-8 transition-all hover:scale-105 ${
                    plan.highlighted ? 'ring-2 glow-primary' : ''
                  }`}
                  style={{
                    borderColor: plan.highlighted ? 'var(--color-primary)' : 'var(--glass-border)',
                    background: plan.highlighted
                      ? 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
                      : 'var(--glass-bg)',
                  }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                         style={{ background: 'var(--color-primary)', color: 'white' }}>
                      Most Popular
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center mx-auto"
                       style={{ background: `${plan.color}20` }}>
                    <Icon className="w-8 h-8" style={{ color: plan.color }} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p className="text-center mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    {price !== null ? (
                      <div>
                        <span className="text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          ${price}
                        </span>
                        <span className="text-lg" style={{ color: 'var(--text-muted)' }}>
                          /mo
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        Custom
                      </div>
                    )}
                    {isAnnual && price !== null && price > 0 && (
                      <div className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                        Billed annually (${(price * 12).toLocaleString()}/year)
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                        )}
                        <span className="text-sm" style={{
                          color: feature.included ? 'var(--text-secondary)' : 'var(--text-muted)'
                        }}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/dashboard'}
                    className={`w-full py-4 rounded-xl font-semibold text-center block transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                      plan.highlighted ? 'glass-btn-primary' : 'glass-btn'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURE COMPARISON TABLE
          ======================================== */}
      <section className="py-20" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Compare Features
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Find the perfect plan for your needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Pro
                  </th>
                  <th className="text-center py-4 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Council Twins', starter: '5', pro: '5', enterprise: '5' },
                  { feature: 'Skill Twins', starter: '10', pro: '10', enterprise: 'Unlimited' },
                  { feature: 'Memory Storage', starter: '1GB', pro: '10GB', enterprise: 'Unlimited' },
                  { feature: 'Projects', starter: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'API Access', starter: false, pro: true, enterprise: true },
                  { feature: 'Priority Support', starter: false, pro: true, enterprise: true },
                  { feature: 'Custom Training', starter: false, pro: false, enterprise: true },
                  { feature: 'SSO & SAML', starter: false, pro: false, enterprise: true },
                  { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="py-4 px-4" style={{ color: 'var(--text-secondary)' }}>
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <X className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--text-muted)' }} />
                        )
                      ) : (
                        <span style={{ color: 'var(--text-secondary)' }}>{row.starter}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <X className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--text-muted)' }} />
                        )
                      ) : (
                        <span style={{ color: 'var(--text-secondary)' }}>{row.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <X className="w-5 h-5 mx-auto inline-block" style={{ color: 'var(--text-muted)' }} />
                        )
                      ) : (
                        <span style={{ color: 'var(--text-secondary)' }}>{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================
          TRUST BADGES
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                  <Shield className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Secure Payments
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  256-bit SSL encryption
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                  <Clock className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  14-Day Trial
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No credit card required
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                     style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                  <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Cancel Anytime
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No questions asked
                </p>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-8 p-6 rounded-xl text-center glass-card"
                 style={{
                   background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                   border: '1px solid rgba(16, 185, 129, 0.3)',
                 }}>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  30-Day Money-Back Guarantee
                </span>
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ SECTION
          ======================================== */}
      <section className="py-20" style={{ background: 'var(--bg-dark-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Everything you need to know about pricing
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold pr-4" style={{ color: 'var(--text-primary)' }}>
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
          ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
               }}>
            <div className="absolute inset-0 opacity-30"
                 style={{
                   background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                 }} />

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'white' }}>
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 opacity-90" style={{ color: 'white' }}>
                Join thousands of teams already using Digital Twin OS
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
                style={{
                  background: 'white',
                  color: 'var(--color-primary)',
                }}
              >
                <Rocket className="w-5 h-5" />
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
