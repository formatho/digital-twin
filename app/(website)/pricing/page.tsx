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
  Code,
} from 'lucide-react';
import { useState } from 'react';

/**
 * Pricing Page - Digital Twin OS
 *
 * Light theme pricing with 3 tiers, feature comparison, and FAQ
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
      color: 'blue',
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
      color: 'purple',
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
      color: 'green',
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

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-500',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-500',
    },
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ========================================
          HEADER
          ======================================== */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to Home
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl mb-12 text-gray-600">
              Start free, scale as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 rounded-xl bg-gray-100 border border-gray-200">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isAnnual
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isAnnual
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual
              </button>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
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
              const colors = colorClasses[plan.color as keyof typeof colorClasses];

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 transition-all hover:shadow-lg hover:-translate-y-1 rounded-2xl ${
                    plan.highlighted ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200 bg-white'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center mx-auto ${colors.bg}`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-center mb-6 text-sm text-gray-600">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    {price !== null ? (
                      <div>
                        <span className="text-5xl font-bold text-gray-900">
                          ${price}
                        </span>
                        <span className="text-lg text-gray-600">
                          /mo
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-gray-900">
                        Custom
                      </div>
                    )}
                    {isAnnual && price !== null && price > 0 && (
                      <div className="text-sm mt-2 text-gray-600">
                        Billed annually (${(price * 12).toLocaleString()}/year)
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/dashboard'}
                    className={`w-full py-4 rounded-xl font-semibold text-center block transition-all hover:shadow-md flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Compare Features
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect plan for your needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">
                      Starter
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">
                      Pro
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">
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
                    <tr key={idx} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-4 px-6 text-gray-700">
                        {row.feature}
                      </td>
                      <td className="text-center py-4 px-6">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-5 h-5 mx-auto inline-block text-green-600" />
                          ) : (
                            <X className="w-5 h-5 mx-auto inline-block text-gray-400" />
                          )
                        ) : (
                          <span className="text-gray-700">{row.starter}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="w-5 h-5 mx-auto inline-block text-green-600" />
                          ) : (
                            <X className="w-5 h-5 mx-auto inline-block text-gray-400" />
                          )
                        ) : (
                          <span className="text-gray-700">{row.pro}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 mx-auto inline-block text-green-600" />
                          ) : (
                            <X className="w-5 h-5 mx-auto inline-block text-gray-400" />
                          )
                        ) : (
                          <span className="text-gray-700">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-green-100">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">
                  Secure Payments
                </h3>
                <p className="text-sm text-gray-600">
                  256-bit SSL encryption
                </p>
              </div>

              <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-blue-100">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">
                  14-Day Trial
                </h3>
                <p className="text-sm text-gray-600">
                  No credit card required
                </p>
              </div>

              <div className="bg-white p-6 text-center border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-purple-100">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">
                  Cancel Anytime
                </h3>
                <p className="text-sm text-gray-600">
                  No questions asked
                </p>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-8 p-6 rounded-xl text-center bg-green-50 border border-green-200">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">
                  30-Day Money-Back Guarantee
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ SECTION
          ======================================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about pricing
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold pr-4 text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-500" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-sm leading-relaxed text-gray-600">
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
          <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of teams already using Digital Twin OS
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-blue-600 transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
