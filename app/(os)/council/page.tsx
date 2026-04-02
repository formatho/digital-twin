export default function CouncilPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Council Chamber</h1>
      <p className="text-gray-600">Strategic Decision Intelligence</p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl">🎯</div>
          <h3 className="font-semibold">Strategist</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl">🔧</div>
          <h3 className="font-semibold">Builder</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl">📊</div>
          <h3 className="font-semibold">Analyst</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl">⚙️</div>
          <h3 className="font-semibold">Operator</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl">🧐</div>
          <h3 className="font-semibold">Critic</h3>
        </div>
      </div>
    </div>
  );
}
