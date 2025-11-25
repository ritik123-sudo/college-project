'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', actual: 4000, predicted: 4100 },
  { day: 'Tue', actual: 3000, predicted: 3200 },
  { day: 'Wed', actual: 2000, predicted: 2400 },
  { day: 'Thu', actual: 2780, predicted: 2900 },
  { day: 'Fri', actual: 1890, predicted: 2500 },
  { day: 'Sat', actual: 2390, predicted: 3000 },
  { day: 'Sun', actual: 3490, predicted: 3800 },
];

export default function PredictionChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Demand Forecasting (AI)</h3>
        <p className="text-slate-500 text-sm">Solid line is actual sales. Dotted line is AI prediction.</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
            {/* Real Data (Blue) */}
            <Line type="monotone" dataKey="actual" name="Actual Sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
            {/* AI Prediction (Green Dotted) */}
            <Line type="monotone" dataKey="predicted" name="AI Prediction" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}