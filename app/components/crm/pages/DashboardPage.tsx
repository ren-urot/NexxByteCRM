import { useCrm } from "../CrmContext";
import { useNavigate } from "react-router";
import { Users, Target, DollarSign, Activity, Plus, ArrowUpRight, Clock } from "lucide-react";

const recentActivities = [
  { action: "created", entity: "customer", name: "Maria Santos", time: "2 min ago" },
  { action: "updated", entity: "lead", name: "Juan Dela Cruz", time: "15 min ago" },
  { action: "recorded", entity: "sale", name: "P3,500: Rose Bouquet", time: "1 hr ago" },
  { action: "created", entity: "customer", name: "Ana Reyes", time: "2 hrs ago" },
  { action: "moved", entity: "lead", name: "Carlo Mendoza → Won", time: "3 hrs ago" },
  { action: "updated", entity: "customer", name: "Lisa Tan", time: "5 hrs ago" },
];

const statsData: Record<string, { customers: string; leads: string; sales: string; revenue: string }> = {
  finance: { customers: "248", leads: "45", sales: "P4.2M", revenue: "+18.5%" },
  realestate: { customers: "186", leads: "32", sales: "P12.8M", revenue: "+22.1%" },
  retail: { customers: "1,250", leads: "89", sales: "P890K", revenue: "+14.3%" },
  hospitality: { customers: "1,248", leads: "67", sales: "P2.1M", revenue: "+16.8%" },
  flowershop: { customers: "324", leads: "28", sales: "P128K", revenue: "+12.5%" },
};

export function DashboardPage() {
  const { config, crmType } = useCrm();
  const navigate = useNavigate();
  const stats = statsData[crmType];

  const quickActions = [
    { label: `Add ${config.customerLabel}`, path: "/crm/customers", icon: <Users size={18} /> },
    { label: `Add ${config.leadLabel}`, path: "/crm/leads", icon: <Target size={18} /> },
    { label: `Record ${config.saleLabel}`, path: "/crm/sales", icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#383838] text-[26px] font-semibold">
            Welcome back, Ren! <config.icon size={24} className="inline-block ml-1" style={{ color: config.color }} />
          </h1>
          <p className="text-[#9a9a9a] text-[15px] mt-1">Here's what's happening with your {config.name.toLowerCase()} today.</p>
        </div>
        <button
          onClick={() => navigate("/crm/customers")}
          className="h-[40px] px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 transition-colors cursor-pointer"
          style={{ backgroundColor: config.color }}
        >
          <Plus size={16} /> Quick Add
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: `Total ${config.customerLabelPlural}`, value: stats.customers, icon: <Users size={20} />, change: "+8" },
          { label: `Active ${config.leadLabel}s`, value: stats.leads, icon: <Target size={20} />, change: "+5" },
          { label: `Total ${config.saleLabel}s`, value: stats.sales, icon: <DollarSign size={20} />, change: stats.revenue },
          { label: "Activities", value: "156", icon: <Activity size={20} />, change: "+12" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[16px] border border-[#e8e8e8] p-5 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: config.colorLight, color: config.color }}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-0.5 text-[#1a8a1a] text-[13px] font-medium">
                <ArrowUpRight size={14} /> {stat.change}
              </div>
            </div>
            <p className="text-[#383838] text-[24px] font-semibold">{stat.value}</p>
            <p className="text-[#9a9a9a] text-[13px] font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-[16px] border border-[#e8e8e8]">
          <div className="px-5 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
            <h2 className="text-[#383838] text-[16px] font-semibold">Recent Activity</h2>
            <Activity size={16} className="text-[#9a9a9a]" />
          </div>
          <div className="divide-y divide-[#f0f0f0]">
            {recentActivities.map((a, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: config.colorLight }}>
                  {a.entity === "customer" ? <Users size={14} style={{ color: config.color }} /> :
                   a.entity === "lead" ? <Target size={14} style={{ color: config.color }} /> :
                   <DollarSign size={14} style={{ color: config.color }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#383838] text-[14px]">
                    <span className="font-medium capitalize">{a.action}</span> {a.entity}: <span className="font-medium">{a.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[#9a9a9a] text-[12px] shrink-0">
                  <Clock size={12} /> {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Summary */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
            <h3 className="text-[#383838] text-[16px] font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              {quickActions.map((qa) => (
                <button
                  key={qa.label}
                  onClick={() => navigate(qa.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border border-[#e8e8e8] text-[14px] font-medium text-[#383838] hover:border-transparent hover:text-white transition-all cursor-pointer group"
                  style={{ ["--hover-bg" as string]: config.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = config.color; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = "#383838"; }}
                >
                  <span style={{ color: config.color }} className="group-hover:text-white">{qa.icon}</span>
                  {qa.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lead Pipeline Summary */}
          <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
            <h3 className="text-[#383838] text-[16px] font-semibold mb-4">{config.leadLabel} Pipeline</h3>
            {[
              { stage: "New", count: 12, pct: 100 },
              { stage: "Contacted", count: 8, pct: 67 },
              { stage: "Negotiation", count: 5, pct: 42 },
              { stage: "Won", count: 15, pct: 100 },
              { stage: "Lost", count: 3, pct: 25 },
            ].map((s) => (
              <div key={s.stage} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between text-[13px] mb-1">
                  <span className="text-[#5d5d5d] font-medium">{s.stage}</span>
                  <span className="text-[#383838] font-semibold">{s.count}</span>
                </div>
                <div className="h-2 bg-[#f0f0f0] rounded-full">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: config.color, opacity: s.stage === "Lost" ? 0.4 : 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}