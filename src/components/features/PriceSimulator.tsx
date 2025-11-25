'use client';

import { useState } from 'react';
import { TrendingUp, Users, DollarSign, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Mock Data for different products
const PRODUCTS: Record<string, { basePrice: number, baseCost: number, baseDemand: number }> = {
  "Premium Coffee 1kg": { basePrice: 25, baseCost: 10, baseDemand: 1000 },
  "Espresso Shot": { basePrice: 3, baseCost: 0.5, baseDemand: 5000 },
  "Vanilla Syrup Bottle": { basePrice: 15, baseCost: 8, baseDemand: 200 }
};

export default function PriceSimulator() {
  const [selectedProduct, setSelectedProduct] = useState("Premium Coffee 1kg");
  const [price, setPrice] = useState(PRODUCTS["Premium Coffee 1kg"].basePrice);

  const productData = PRODUCTS[selectedProduct];

  // Logic: When product changes, reset price to default
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProduct = e.target.value;
    setSelectedProduct(newProduct);
    setPrice(PRODUCTS[newProduct].basePrice);
  };
  
  // AI Logic: Price Elasticity
  // If price increases by 10%, demand drops by 20% (Elastic)
  const priceDiff = price - productData.basePrice;
  const demandFactor = 1 - (priceDiff / productData.basePrice) * 1.5; // 1.5 elasticity factor
  
  const demand = Math.round(productData.baseDemand * Math.max(0, demandFactor)); 
  const revenue = price * demand;
  const totalCost = demand * productData.baseCost;
  const profit = revenue - totalCost;

  // Baseline Comparison
  const baselineProfit = (productData.basePrice * productData.baseDemand) - (productData.baseDemand * productData.baseCost);

  const data = [
    { name: 'Current', value: baselineProfit },
    { name: 'Projected', value: profit },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Price Elasticity Simulator</h3>
          <p className="text-slate-500 text-sm">Select a product to optimize.</p>
        </div>
      </div>

      {/* 🆕 PRODUCT SELECTOR */}
      <div className="mb-6 relative">
        <select 
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        >
          {Object.keys(PRODUCTS).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={18} />
      </div>

      {/* The Slider Section */}
      <div className="mb-8 p-4 border border-slate-100 rounded-lg">
        <div className="flex justify-between mb-2">
          <label className="font-semibold text-slate-700">Set Unit Price</label>
          <span className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</span>
        </div>
        <input 
          type="range" 
          min={productData.baseCost + 1} // Can't go below cost
          max={productData.basePrice * 2.5} 
          step={0.5}
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>${(productData.baseCost + 1).toFixed(0)} (Min)</span>
          <span>${(productData.basePrice * 2.5).toFixed(0)} (Max)</span>
        </div>
      </div>

      {/* The Results Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 border border-slate-100 rounded-lg">
          <Users className="mx-auto text-slate-400 mb-1" size={16} />
          <p className="text-xs text-slate-500">Est. Demand</p>
          <p className="font-bold text-slate-900">{demand.toLocaleString()}</p>
        </div>
        <div className="text-center p-3 border border-slate-100 rounded-lg">
          <DollarSign className="mx-auto text-slate-400 mb-1" size={16} />
          <p className="text-xs text-slate-500">Revenue</p>
          <p className="font-bold text-slate-900">${revenue.toLocaleString()}</p>
        </div>
        <div className={`text-center p-3 border rounded-lg ${profit >= baselineProfit ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
          <TrendingUp className={`mx-auto mb-1 ${profit >= baselineProfit ? 'text-blue-500' : 'text-red-500'}`} size={16} />
          <p className={`text-xs font-bold ${profit >= baselineProfit ? 'text-blue-600' : 'text-red-600'}`}>Proj. Profit</p>
          <p className={`font-bold ${profit >= baselineProfit ? 'text-blue-700' : 'text-red-700'}`}>${profit.toLocaleString()}</p>
        </div>
      </div>

      {/* The Mini Chart */}
      <div className="h-[200px] w-full mt-4">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data}>
             <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
             <Tooltip cursor={{fill: 'transparent'}} />
             <Bar dataKey="value" radius={[4, 4, 0, 0]}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : (profit >= baselineProfit ? '#2563eb' : '#ef4444')} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
}