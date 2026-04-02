export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Twin Marketplace</h1>
      <p className="text-gray-600">Discover and activate specialized twins</p>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
        <h2 className="text-xl font-semibold">Featured Twins</h2>
        <p className="text-sm opacity-90">Top-rated specialists</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Technical</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Creative</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Business</h3>
        </div>
      </div>
    </div>
  );
}
