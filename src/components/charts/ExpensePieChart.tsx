'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Inventory', value: 4500 },
  { name: 'Marketing', value: 2100 },
  { name: 'Salaries', value: 3200 },
  { name: 'Utilities', value: 800 },
  { name: 'Software', value: 450 },
];

// 🎨 NEW VIBRANT PALETTE
const COLORS = [
  '#4f46e5', // Indigo (Inventory)
  '#10b981', // Emerald (Marketing)
  '#f59e0b', // Amber (Salaries)
  '#ef4444', // Red (Utilities)
  '#8b5cf6', // Violet (Software)
];

export default function ExpensePieChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }} 
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}