import { Activity, CreditCard, DollarSign, Users, ArrowUpRight, ShoppingBag } from "lucide-react";
import MetricCard from "../../components/ui/MetricCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here is your business at a glance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value="$12,345" trend="+15%" trendUp={true} icon={DollarSign} />
        <MetricCard title="Active Users" value="1,234" trend="+5%" trendUp={true} icon={Users} />
        <MetricCard title="Sales" value="+573" trend="+10%" trendUp={true} icon={CreditCard} />
        <MetricCard title="Active Now" value="+12" trend="-2%" trendUp={false} icon={Activity} />
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Live Activity Feed</h3>
        <div className="space-y-4">
          {[
            { text: "New order #4920 from Sarah J.", time: "2 mins ago", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
            { text: "Stock Alert: Coffee Beans are low.", time: "15 mins ago", icon: Activity, color: "bg-red-100 text-red-600" },
            { text: "Payment received from Local Cafe.", time: "1 hour ago", icon: DollarSign, color: "bg-green-100 text-green-600" },
            { text: "New customer inquiry on WhatsApp.", time: "2 hours ago", icon: Users, color: "bg-purple-100 text-purple-600" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.text}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-600 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}