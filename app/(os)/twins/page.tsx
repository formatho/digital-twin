export default function TwinsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Twin Profiles</h1>
      <p className="text-gray-600">Manage your Digital Twins</p>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Council Twins</h2>
          <p className="text-gray-600">5 Strategic Decision Makers</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Skill Twins</h2>
          <p className="text-gray-600">10 Specialist Executors</p>
        </div>
      </div>
    </div>
  );
}
