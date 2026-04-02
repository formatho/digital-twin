export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Council Activity</h2>
          <p className="text-sm text-gray-600">Recent deliberations</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Active Twins</h2>
          <p className="text-sm text-gray-600">5 Council + 10 Skill twins</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Task Queue</h2>
          <p className="text-sm text-gray-600">Pending assignments</p>
        </div>
      </div>
    </div>
  );
}
