export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 
          className="text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Dashboard
        </h1>
        <div 
          className="text-sm px-3 py-1 rounded-full"
          style={{ 
            background: 'rgba(16, 185, 129, 0.2)', 
            color: 'var(--color-success)' 
          }}
        >
          All Systems Operational
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="p-6 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <div className="text-3xl mb-2">🎯</div>
          <div 
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            127
          </div>
          <div 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Council Deliberations
          </div>
        </div>

        <div 
          className="p-6 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <div className="text-3xl mb-2">⚡</div>
          <div 
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            842
          </div>
          <div 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Tasks Executed
          </div>
        </div>

        <div 
          className="p-6 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <div className="text-3xl mb-2">🧠</div>
          <div 
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            15
          </div>
          <div 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Active Twins
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <h2 
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { twin: '🎯', action: 'Council debated', topic: 'Enterprise expansion strategy', time: '2m ago' },
            { twin: '🔬', action: 'Research completed', topic: 'Competitive analysis', time: '15m ago' },
            { twin: '✍️', action: 'Content drafted', topic: 'Blog post: AI Decision Making', time: '1h ago' },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
            >
              <span className="text-2xl">{item.twin}</span>
              <div className="flex-1">
                <div style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-sm)' }}>
                  {item.action}: <strong>{item.topic}</strong>
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
