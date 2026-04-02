import Link from 'next/link';

export const metadata = {
  title: 'Pricing - Digital Twin OS',
  description: 'Simple, transparent pricing for Digital Twin OS. Start free, scale as you grow.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold mb-4 text-center">Simple Pricing</h1>
        <p className="text-xl text-gray-400 mb-16 text-center">
          Start free, scale as you grow
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-400">/mo</span></div>
            <ul className="text-gray-400 space-y-3 mb-8">
              <li>✓ 5 Council Twins</li>
              <li>✓ 10 Skill Twins</li>
              <li>✓ Basic memory</li>
              <li>✓ Community support</li>
            </ul>
            <button className="w-full py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Pro Tier */}
          <div className="bg-gradient-to-b from-blue-600/20 to-purple-600/20 p-8 rounded-xl border border-blue-500">
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-400">/mo</span></div>
            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✓ Everything in Starter</li>
              <li>✓ Unlimited teams</li>
              <li>✓ Advanced memory</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
            </ul>
            <button className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Start Free Trial
            </button>
          </div>
          
          {/* Enterprise Tier */}
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-4">Custom</div>
            <ul className="text-gray-400 space-y-3 mb-8">
              <li>✓ Everything in Pro</li>
              <li>✓ Custom twin training</li>
              <li>✓ SSO & SAML</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
            </ul>
            <button className="w-full py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
