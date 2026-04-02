export default function MemoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Memory</h1>
      <p className="text-gray-600">3-Tiered Memory System</p>
      
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold">Conversation</h2>
          <p className="text-sm text-gray-600">Session-level</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold">Contextual</h2>
          <p className="text-sm text-gray-600">User-level</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold">Project</h2>
          <p className="text-sm text-gray-600">Long-term</p>
        </div>
      </div>
    </div>
  );
}
