import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean; // true = green (good), false = red (bad)
  icon: LucideIcon;
}

export default function MetricCard({ title, value, trend, trendUp, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-semibold ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-slate-400 text-xs">vs last month</span>
      </div>
    </div>
  );
}