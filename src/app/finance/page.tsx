import { DollarSign, CreditCard, TrendingDown, Wallet } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import ExpensePieChart from '../../components/charts/ExpensePieChart';

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Overview</h1>
        <p className="text-slate-500 mt-2">Track expenses, revenue, and AI-suggested budget optimizations.</p>
      </div>

      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value="$84,300" trend="+8.2%" trendUp={true} icon={DollarSign} />
        <MetricCard title="Total Expenses" value="$32,450" trend="+12%" trendUp={false} icon={CreditCard} />
        <MetricCard title="Net Profit" value="$51,850" trend="+5.4%" trendUp={true} icon={Wallet} />
        <MetricCard title="Cost Reduction" value="$1,200" trend="AI Saved" trendUp={true} icon={TrendingDown} />
      </div>

      {/* 2. Visuals & Data Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Pie Chart */}
        <div className="lg:col-span-1">
          <ExpensePieChart />
        </div>

        {/* Right: AI Smart Transaction List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions (AI Categorized)</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Amazon Web Services', date: 'Today, 2:30 PM', amount: '-$240.00', cat: 'Software', risk: false },
              { name: 'Local Coffee Wholesalers', date: 'Yesterday', amount: '-$1,250.00', cat: 'Inventory', risk: false },
              { name: 'Unknown Vendor #3291', date: 'Oct 24', amount: '-$450.00', cat: 'Unusual', risk: true },
              { name: 'Facebook Ads', date: 'Oct 23', amount: '-$800.00', cat: 'Marketing', risk: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.risk ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.date} • {item.cat}</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* CHANGE HERE: text-red-600 makes the numbers red */}
                  <p className="font-bold text-red-600">{item.amount}</p>
                  {item.risk && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full">AI Alert</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}