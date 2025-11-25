'use client'; 
import { TrendingUp, Search, AlertCircle } from 'lucide-react';
import PriceSimulator from '../../components/features/PriceSimulator';
import toast from 'react-hot-toast';

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Price Optimization</h1>
        <p className="text-slate-500 mt-2">Use AI to find the "Sweet Spot" price for maximum profit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Interactive Simulator */}
        <div className="lg:col-span-1">
          <PriceSimulator />
        </div>

        {/* Right Column: Market Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Competitor Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Search size={20} className="text-slate-400" />
              Competitor Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3">Competitor</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="px-4 py-4 font-medium">Amazon Basics</td>
                    <td className="px-4 py-4">Premium Coffee 1kg</td>
                    <td className="px-4 py-4">$22.00</td>
                    <td className="px-4 py-4 text-red-500 font-bold">+12% (Expensive)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-4 py-4 font-medium">Local Mart</td>
                    <td className="px-4 py-4">House Blend</td>
                    <td className="px-4 py-4">$28.50</td>
                    <td className="px-4 py-4 text-green-500 font-bold">-14% (Cheaper)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Strategy Box */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <AlertCircle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Strategy Recommendation</h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  Your current price of <strong>$25.00</strong> is optimal. 
                  Increasing it to $28.00 would decrease volume by 15%, but 
                  <strong> increase overall Net Profit by 4%</strong> due to higher margins.
                </p>
                <button 
                  onClick={() => toast.success('New price ($28.00) updated across all channels.')}
                  className="bg-white text-purple-700 font-bold py-2 px-6 rounded-lg hover:bg-purple-50 transition"
                >
                Apply New Price ($28.00)
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}