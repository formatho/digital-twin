import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">
            Digital Twin OS
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered decision intelligence for teams. 5 Strategic Council Twins. 10 Specialist Skill Twins.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Launch OS
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-8 rounded-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Council Twins</h3>
            <p className="text-gray-400">5 strategic AI twins for vision, execution, analysis, operations, and risk assessment.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-xl">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Skill Twins</h3>
            <p className="text-gray-400">10 specialist twins for research, content, design, code, marketing, and more.</p>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-xl">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">3-Tier Memory</h3>
            <p className="text-gray-400">Conversation, contextual, and project memory for persistent intelligence.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your decisions?</h2>
          <p className="text-lg mb-8 opacity-90">Get started with Digital Twin OS today.</p>
          <Link
            href="/pricing"
            className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
