'use client'; 
import toast from 'react-hot-toast'; 
import { Package, AlertTriangle, TrendingUp, Clock, Search, Filter } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import PredictionChart from '../../components/charts/PredictionChart';

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Inventory Intelligence</h1>
        <p className="text-slate-500 mt-2">AI-powered stock tracking and demand forecasting.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Stock Value" value="$45,231" trend="+12%" trendUp={true} icon={Package} />
        <MetricCard title="Low Stock Items" value="3 Items" trend="Critical" trendUp={false} icon={AlertTriangle} />
        <MetricCard title="Predicted Demand" value="High" trend="+25%" trendUp={true} icon={TrendingUp} />
        <MetricCard title="Restock Time" value="3 Days" trend="-1 Day" trendUp={true} icon={Clock} />
      </div>

      {/* AI Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PredictionChart />
        </div>

        {/* AI Insight Box */}
        <div className="bg-blue-600 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-xl font-bold mb-2">AI Insight ⚡</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Based on historical data, you will run out of <strong>Premium Arabica Beans</strong> by Friday. 
              We recommend ordering 50kg today to avoid stockouts.
            </p>
          </div>
          <button 
            onClick={() => toast.success('Order for 50kg Beans sent to supplier!', { duration: 4000 })}
            className="bg-white text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition shadow-sm"
          >
          Auto-Reorder (50kg)
          </button>
        </div>
      </div>

      {/* 🆕 NEW SECTION: Detailed Stock Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Real-Time Stock Levels</h3>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 border border-slate-200 rounded-lg">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 border border-slate-200 rounded-lg">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Row 1: Low Stock */}
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-bold text-slate-900">Premium Arabica Beans</td>
              <td className="px-6 py-4">Raw Material</td>
              <td className="px-6 py-4">4 kg</td>
              <td className="px-6 py-4"><span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">Critical</span></td>
              <td className="px-6 py-4 text-blue-600 font-bold cursor-pointer hover:underline">Reorder</td>
            </tr>
            {/* Row 2: Healthy */}
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-bold text-slate-900">Takeaway Cups (Large)</td>
              <td className="px-6 py-4">Packaging</td>
              <td className="px-6 py-4">850 units</td>
              <td className="px-6 py-4"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">In Stock</span></td>
              <td className="px-6 py-4 text-slate-400">Manage</td>
            </tr>
            {/* Row 3: Low Stock */}
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-bold text-slate-900">Vanilla Syrup (750ml)</td>
              <td className="px-6 py-4">Ingredients</td>
              <td className="px-6 py-4">2 Bottles</td>
              <td className="px-6 py-4"><span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">Low</span></td>
              <td className="px-6 py-4 text-blue-600 font-bold cursor-pointer hover:underline">Reorder</td>
            </tr>
             {/* Row 4: Healthy */}
             <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-bold text-slate-900">Napkins (Pack)</td>
              <td className="px-6 py-4">Supplies</td>
              <td className="px-6 py-4">50 Packs</td>
              <td className="px-6 py-4"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">In Stock</span></td>
              <td className="px-6 py-4 text-slate-400">Manage</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}