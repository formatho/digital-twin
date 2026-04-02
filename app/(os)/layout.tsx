import '../src/styles/globals.css';

export const metadata = {
  title: 'Digital Twin OS - Dashboard',
  description: 'AI-powered digital twin platform dashboard',
};

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="os-layout min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-6">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/council" className="text-gray-600 hover:text-gray-900">Council</a>
            <a href="/twins" className="text-gray-600 hover:text-gray-900">Twins</a>
            <a href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</a>
            <a href="/workflows" className="text-gray-600 hover:text-gray-900">Workflows</a>
            <a href="/memory" className="text-gray-600 hover:text-gray-900">Memory</a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
