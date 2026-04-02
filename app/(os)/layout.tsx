import '../src/styles/globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GlassWrapper from './components/GlassWrapper';

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
    <div 
      className="min-h-screen flex"
      style={{ background: 'var(--bg-dark)' }}
    >
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <Header 
          workspaceName="My Workspace"
          userName="Founder"
        />

        {/* Page Content with Glass Wrapper */}
        <main className="flex-1 p-6 overflow-y-auto">
          <GlassWrapper>
            {children}
          </GlassWrapper>
        </main>
      </div>
    </div>
  );
}
