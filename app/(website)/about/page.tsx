import Link from 'next/link';

export const metadata = {
  title: 'About - Digital Twin OS',
  description: 'Learn about Digital Twin OS and how AI-powered digital twins can transform your decision-making.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold mb-8">About Digital Twin OS</h1>
        
        <div className="max-w-3xl">
          <p className="text-xl text-gray-300 mb-8">
            Digital Twin OS is an AI-powered platform that brings strategic decision intelligence to teams.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-400 mb-8">
            To democratize access to AI-powered strategic thinking, enabling every team to make better decisions faster.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">The Council</h2>
          <p className="text-gray-400 mb-8">
            Our 5 Council Twins represent the key perspectives needed for strategic decisions: Vision (Strategist), Execution (Builder), Data (Analyst), Systems (Operator), and Risk (Critic).
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Skill Twins</h2>
          <p className="text-gray-400 mb-8">
            10 specialist twins handle execution: Research, Content, Design, Growth, Code, Marketing, Sales, Legal, Product, and Operations.
          </p>
        </div>
      </div>
    </main>
  );
}
