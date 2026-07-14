import { useState, useMemo } from "react";
import { useCrm, CRM_CONFIGS, PLAN_DETAILS, type CrmType, type PlanId } from "../CrmContext";
import {
  Shield, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Eye,
  Ban, CheckCircle2, Clock, AlertTriangle, Users, UserCheck, UserX,
  Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Mail, X,
  Landmark, Home, ShoppingBag, Hospital, Flower2,
} from "lucide-react";

// -- Mock data for all platform users --
interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "suspended";
  crmType: CrmType;
  plan: PlanId;
  businessName: string;
  createdAt: string;
  lastActive: string;
  totalCustomers: number;
  totalSales: number;
  revenue: string;
  loginCount: number;
}

const CRM_ICONS: Record<CrmType, typeof Landmark> = {
  finance: Landmark,
  realestate: Home,
  retail: ShoppingBag,
  hospitality: Hospital,
  flowershop: Flower2,
};

const MOCK_USERS: PlatformUser[] = [
  { id: "u1", name: "Ren Urot", email: "ren@crmplatform.com", phone: "+63 917 000 1234", avatar: "RU", role: "admin", status: "active", crmType: "flowershop", plan: "basic", businessName: "Bloom & Petal", createdAt: "2025-01-15", lastActive: "2 min ago", totalCustomers: 324, totalSales: 1520, revenue: "P128K", loginCount: 245 },
  { id: "u2", name: "Maria Santos", email: "maria@greenfinance.ph", phone: "+63 918 111 2345", avatar: "MS", role: "user", status: "active", crmType: "finance", plan: "premium", businessName: "Green Finance Corp", createdAt: "2025-02-03", lastActive: "15 min ago", totalCustomers: 248, totalSales: 890, revenue: "P4.2M", loginCount: 189 },
  { id: "u3", name: "Juan Dela Cruz", email: "juan@primerealty.ph", phone: "+63 919 222 3456", avatar: "JD", role: "user", status: "active", crmType: "realestate", plan: "premium", businessName: "Prime Realty Group", createdAt: "2025-01-20", lastActive: "1 hr ago", totalCustomers: 186, totalSales: 45, revenue: "P12.8M", loginCount: 156 },
  { id: "u4", name: "Ana Reyes", email: "ana@shopwise.ph", phone: "+63 920 333 4567", avatar: "AR", role: "user", status: "active", crmType: "retail", plan: "basic", businessName: "ShopWise Retail", createdAt: "2025-03-01", lastActive: "3 hrs ago", totalCustomers: 1250, totalSales: 3400, revenue: "P890K", loginCount: 134 },
  { id: "u5", name: "Carlo Mendoza", email: "carlo@medclinic.ph", phone: "+63 921 444 5678", avatar: "CM", role: "user", status: "active", crmType: "hospitality", plan: "premium", businessName: "MedClinic Plus", createdAt: "2025-02-15", lastActive: "30 min ago", totalCustomers: 1248, totalSales: 2100, revenue: "P2.1M", loginCount: 178 },
  { id: "u6", name: "Lisa Tan", email: "lisa@petalparadise.ph", phone: "+63 922 555 6789", avatar: "LT", role: "user", status: "inactive", crmType: "flowershop", plan: "free", businessName: "Petal Paradise", createdAt: "2025-04-10", lastActive: "3 days ago", totalCustomers: 42, totalSales: 85, revenue: "P18K", loginCount: 23 },
  { id: "u7", name: "Roberto Garcia", email: "roberto@wealthadv.ph", phone: "+63 923 666 7890", avatar: "RG", role: "user", status: "suspended", crmType: "finance", plan: "basic", businessName: "Wealth Advisors PH", createdAt: "2025-01-28", lastActive: "1 week ago", totalCustomers: 89, totalSales: 210, revenue: "P1.5M", loginCount: 67 },
  { id: "u8", name: "Grace Villanueva", email: "grace@dreamhomes.ph", phone: "+63 924 777 8901", avatar: "GV", role: "user", status: "active", crmType: "realestate", plan: "basic", businessName: "DreamHomes Realty", createdAt: "2025-03-12", lastActive: "5 hrs ago", totalCustomers: 94, totalSales: 22, revenue: "P5.6M", loginCount: 98 },
  { id: "u9", name: "Mark Estrada", email: "mark@techretail.ph", phone: "+63 925 888 9012", avatar: "ME", role: "user", status: "active", crmType: "retail", plan: "premium", businessName: "TechRetail Hub", createdAt: "2025-02-20", lastActive: "45 min ago", totalCustomers: 2100, totalSales: 5600, revenue: "P2.3M", loginCount: 201 },
  { id: "u10", name: "Patricia Cruz", email: "pat@careclinic.ph", phone: "+63 926 999 0123", avatar: "PC", role: "user", status: "inactive", crmType: "hospitality", plan: "free", businessName: "CarePlus Clinic", createdAt: "2025-05-01", lastActive: "5 days ago", totalCustomers: 35, totalSales: 48, revenue: "P95K", loginCount: 12 },
  { id: "u11", name: "Daniel Ramos", email: "daniel@floracraft.ph", phone: "+63 927 010 1234", avatar: "DR", role: "user", status: "active", crmType: "flowershop", plan: "premium", businessName: "FloraCraft Studio", createdAt: "2025-01-05", lastActive: "20 min ago", totalCustomers: 510, totalSales: 2800, revenue: "P320K", loginCount: 267 },
  { id: "u12", name: "Sofia Lim", email: "sofia@investpro.ph", phone: "+63 928 020 2345", avatar: "SL", role: "user", status: "active", crmType: "finance", plan: "premium", businessName: "InvestPro Holdings", createdAt: "2025-02-08", lastActive: "1 hr ago", totalCustomers: 420, totalSales: 1200, revenue: "P8.7M", loginCount: 198 },
  { id: "u13", name: "Kevin Aquino", email: "kevin@urbanprop.ph", phone: "+63 929 030 3456", avatar: "KA", role: "user", status: "suspended", crmType: "realestate", plan: "basic", businessName: "UrbanProp Manila", createdAt: "2025-03-25", lastActive: "2 weeks ago", totalCustomers: 56, totalSales: 8, revenue: "P2.1M", loginCount: 34 },
  { id: "u14", name: "Jasmine Ong", email: "jasmine@fashionhub.ph", phone: "+63 930 040 4567", avatar: "JO", role: "user", status: "active", crmType: "retail", plan: "basic", businessName: "Fashion Hub PH", createdAt: "2025-04-02", lastActive: "2 hrs ago", totalCustomers: 780, totalSales: 1900, revenue: "P450K", loginCount: 112 },
  { id: "u15", name: "Andrew Bautista", email: "andrew@wellmed.ph", phone: "+63 931 050 5678", avatar: "AB", role: "user", status: "active", crmType: "hospitality", plan: "basic", businessName: "WellMed Hospital", createdAt: "2025-01-30", lastActive: "4 hrs ago", totalCustomers: 890, totalSales: 1650, revenue: "P1.8M", loginCount: 145 },
  { id: "u16", name: "Carmen Diaz", email: "carmen@rosegarden.ph", phone: "+63 932 060 6789", avatar: "CD", role: "user", status: "active", crmType: "flowershop", plan: "basic", businessName: "Rose Garden Manila", createdAt: "2025-03-08", lastActive: "6 hrs ago", totalCustomers: 210, totalSales: 980, revenue: "P85K", loginCount: 89 },
  { id: "u17", name: "Miguel Torres", email: "miguel@bankcorp.ph", phone: "+63 933 070 7890", avatar: "MT", role: "user", status: "inactive", crmType: "finance", plan: "free", businessName: "BankCorp Advisory", createdAt: "2025-05-10", lastActive: "1 week ago", totalCustomers: 15, totalSales: 5, revenue: "P120K", loginCount: 8 },
  { id: "u18", name: "Elena Pascual", email: "elena@luxhomes.ph", phone: "+63 934 080 8901", avatar: "EP", role: "user", status: "active", crmType: "realestate", plan: "premium", businessName: "LuxHomes PH", createdAt: "2025-02-14", lastActive: "10 min ago", totalCustomers: 145, totalSales: 38, revenue: "P18.5M", loginCount: 176 },
];

const STATUS_CONFIG = {
  active: { label: "Active", color: "#22c55e", bgColor: "#dcfce7", icon: CheckCircle2 },
  inactive: { label: "Inactive", color: "#f59e0b", bgColor: "#fef3c7", icon: Clock },
  suspended: { label: "Suspended", color: "#ef4444", bgColor: "#fef2f2", icon: Ban },
};

const ROWS_PER_PAGE = 8;

export function AdminUsersPage() {
  const { config } = useCrm();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [crmFilter, setCrmFilter] = useState<"all" | CrmType>("all");
  const [planFilter, setPlanFilter] = useState<"all" | PlanId>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [users, setUsers] = useState<PlatformUser[]>(MOCK_USERS);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.businessName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      const matchCrm = crmFilter === "all" || u.crmType === crmFilter;
      const matchPlan = planFilter === "all" || u.plan === planFilter;
      return matchSearch && matchStatus && matchCrm && matchPlan;
    });
  }, [users, searchQuery, statusFilter, crmFilter, planFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ROWS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  // Stats
  const totalUsersCount = users.length;
  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.filter((u) => u.status === "inactive").length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
    if (selectedUser?.id === userId) {
      setSelectedUser((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActionMenu(null);
  };

  const activeFiltersCount = [statusFilter !== "all", crmFilter !== "all", planFilter !== "all"].filter(Boolean).length;

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center"
            style={{ backgroundColor: config.colorLight }}
          >
            <Shield size={20} style={{ color: config.color }} />
          </div>
          <div>
            <h1 className="text-[#383838] text-[26px] font-semibold">Admin · Users Monitoring</h1>
            <p className="text-[#9a9a9a] text-[13px]">Monitor and manage all platform users across CRM types</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#9a9a9a]">Last synced: 2 min ago</span>
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: totalUsersCount, icon: Users, color: config.color, bgColor: config.colorLight, change: "+12%", up: true },
          { label: "Active", value: activeCount, icon: UserCheck, color: "#22c55e", bgColor: "#dcfce7", change: "+8%", up: true },
          { label: "Inactive", value: inactiveCount, icon: Clock, color: "#f59e0b", bgColor: "#fef3c7", change: "-3%", up: false },
          { label: "Suspended", value: suspendedCount, icon: UserX, color: "#ef4444", bgColor: "#fef2f2", change: "+1", up: true },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <div className={`flex items-center gap-0.5 text-[12px] font-medium ${stat.up && stat.label !== "Suspended" ? "text-[#22c55e]" : stat.label === "Inactive" ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {stat.up && stat.label !== "Suspended" ? <ArrowUpRight size={12} /> : stat.label === "Inactive" ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-[#383838] text-[28px] font-semibold">{stat.value}</p>
              <p className="text-[#9a9a9a] text-[13px]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* CRM Distribution Bar */}
      <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5 mb-6">
        <p className="text-[#383838] text-[14px] font-semibold mb-3">Users by CRM Type</p>
        <div className="flex rounded-full overflow-hidden h-3 mb-3">
          {(["finance", "realestate", "retail", "hospitality", "flowershop"] as CrmType[]).map((type) => {
            const count = users.filter((u) => u.crmType === type).length;
            const pct = (count / users.length) * 100;
            return (
              <div
                key={type}
                className="h-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: CRM_CONFIGS[type].color }}
                title={`${CRM_CONFIGS[type].name}: ${count} users`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4">
          {(["finance", "realestate", "retail", "hospitality", "flowershop"] as CrmType[]).map((type) => {
            const c = CRM_CONFIGS[type];
            const count = users.filter((u) => u.crmType === type).length;
            const CrmIcon = CRM_ICONS[type];
            return (
              <div key={type} className="flex items-center gap-1.5">
                <CrmIcon size={14} style={{ color: c.color }} />
                <span className="text-[12px] text-[#5d5d5d] font-medium">{c.name.replace(" CRM", "")}</span>
                <span className="text-[12px] text-[#9a9a9a]">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-[16px] border border-[#e8e8e8] overflow-hidden">
        <div className="p-4 border-b border-[#e8e8e8] flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, email, or business..."
              className="w-full h-[40px] pl-10 pr-4 bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] text-[14px] outline-none focus:border-[#ccc]"
            />
          </div>

          {/* Status quick filters */}
          <div className="flex items-center gap-1">
            {(["all", "active", "inactive", "suspended"] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                className={`h-[36px] px-3 rounded-[8px] text-[12px] font-medium transition-all cursor-pointer capitalize ${
                  statusFilter === s
                    ? "text-white"
                    : "text-[#5d5d5d] bg-[#f5f5f5] hover:bg-[#eee]"
                }`}
                style={statusFilter === s ? { backgroundColor: s === "all" ? config.color : STATUS_CONFIG[s === "all" ? "active" : s]?.color || config.color } : {}}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>

          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="h-[36px] px-3 rounded-[8px] bg-[#f5f5f5] text-[#5d5d5d] text-[12px] font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#eee] transition-colors"
            >
              <Filter size={14} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full text-white text-[10px] font-semibold flex items-center justify-center" style={{ backgroundColor: config.color }}>
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown size={12} />
            </button>
            {showFilterDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowFilterDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 w-[260px] bg-white rounded-[14px] shadow-xl border border-[#e8e8e8] p-4 z-40">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[#383838] text-[14px] font-semibold">Filters</p>
                    <button
                      onClick={() => { setCrmFilter("all"); setPlanFilter("all"); setStatusFilter("all"); }}
                      className="text-[12px] text-[#9a9a9a] hover:text-[#ff4e00] cursor-pointer"
                    >
                      Reset all
                    </button>
                  </div>

                  {/* CRM Type */}
                  <div className="mb-3">
                    <p className="text-[#5d5d5d] text-[12px] font-medium mb-1.5">CRM Type</p>
                    <select
                      value={crmFilter}
                      onChange={(e) => { setCrmFilter(e.target.value as any); setCurrentPage(1); }}
                      className="w-full h-[36px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[8px] px-3 text-[13px] outline-none"
                    >
                      <option value="all">All Types</option>
                      {(["finance", "realestate", "retail", "hospitality", "flowershop"] as CrmType[]).map((t) => (
                        <option key={t} value={t}>{CRM_CONFIGS[t].name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Plan */}
                  <div>
                    <p className="text-[#5d5d5d] text-[12px] font-medium mb-1.5">Plan</p>
                    <select
                      value={planFilter}
                      onChange={(e) => { setPlanFilter(e.target.value as any); setCurrentPage(1); }}
                      className="w-full h-[36px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[8px] px-3 text-[13px] outline-none"
                    >
                      <option value="all">All Plans</option>
                      {(["free", "basic", "premium"] as PlanId[]).map((p) => (
                        <option key={p} value={p}>{PLAN_DETAILS[p].name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-4 py-3">User</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-4 py-3">CRM Type</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Plan</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Status</th>
                <th className="text-right text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Customers</th>
                <th className="text-right text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Revenue</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Last Active</th>
                <th className="text-center text-[12px] text-[#9a9a9a] font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => {
                const crmConfig = CRM_CONFIGS[user.crmType];
                const statusCfg = STATUS_CONFIG[user.status];
                const StatusIcon = statusCfg.icon;
                const CrmIcon = CRM_ICONS[user.crmType];
                return (
                  <tr key={user.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0"
                          style={{ backgroundColor: crmConfig.color }}
                        >
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#383838] text-[13px] font-medium whitespace-nowrap">{user.name}</p>
                          <p className="text-[#9a9a9a] text-[11px] truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* CRM Type */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <CrmIcon size={14} style={{ color: crmConfig.color }} />
                        <span className="text-[13px] text-[#5d5d5d]">{crmConfig.name.replace(" CRM", "")}</span>
                      </div>
                    </td>
                    {/* Plan */}
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{
                          backgroundColor: user.plan === "premium" ? "#f3e8ff" : user.plan === "basic" ? "#e6f0fa" : "#f5f5f5",
                          color: user.plan === "premium" ? "#9333ea" : user.plan === "basic" ? "#1a6bb5" : "#666",
                        }}
                      >
                        {PLAN_DETAILS[user.plan].name}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon size={14} style={{ color: statusCfg.color }} />
                        <span className="text-[12px] font-medium capitalize" style={{ color: statusCfg.color }}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </td>
                    {/* Customers */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-[13px] text-[#383838] font-medium">{user.totalCustomers.toLocaleString()}</span>
                    </td>
                    {/* Revenue */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-[13px] text-[#383838] font-medium">{user.revenue}</span>
                    </td>
                    {/* Last Active */}
                    <td className="px-4 py-3">
                      <span className="text-[12px] text-[#9a9a9a]">{user.lastActive}</span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-[30px] h-[30px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#eee] cursor-pointer transition-colors"
                          title="View details"
                        >
                          <Eye size={14} className="text-[#5d5d5d]" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                            className="w-[30px] h-[30px] rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#eee] cursor-pointer transition-colors"
                            title="More actions"
                          >
                            <MoreHorizontal size={14} className="text-[#5d5d5d]" />
                          </button>
                          {actionMenu === user.id && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setActionMenu(null)} />
                              <div className="absolute right-0 top-full mt-1 w-[160px] bg-white rounded-[10px] shadow-xl border border-[#e8e8e8] py-1 z-40">
                                {user.status !== "active" && (
                                  <button
                                    onClick={() => handleStatusChange(user.id, "active")}
                                    className="w-full px-3 py-2 text-left text-[13px] text-[#22c55e] hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer"
                                  >
                                    <CheckCircle2 size={14} /> Activate
                                  </button>
                                )}
                                {user.status !== "inactive" && (
                                  <button
                                    onClick={() => handleStatusChange(user.id, "inactive")}
                                    className="w-full px-3 py-2 text-left text-[13px] text-[#f59e0b] hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer"
                                  >
                                    <Clock size={14} /> Deactivate
                                  </button>
                                )}
                                {user.status !== "suspended" && (
                                  <button
                                    onClick={() => handleStatusChange(user.id, "suspended")}
                                    className="w-full px-3 py-2 text-left text-[13px] text-[#ef4444] hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer"
                                  >
                                    <Ban size={14} /> Suspend
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <AlertTriangle size={24} className="mx-auto mb-2 text-[#d0d0d0]" />
                    <p className="text-[#9a9a9a] text-[14px]">No users match your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8e8e8]">
            <p className="text-[#9a9a9a] text-[13px]">
              Showing {(currentPage - 1) * ROWS_PER_PAGE + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} className="text-[#5d5d5d]" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-[8px] text-[13px] font-medium cursor-pointer transition-all ${
                    currentPage === page ? "text-white" : "text-[#5d5d5d] hover:bg-[#f5f5f5]"
                  }`}
                  style={currentPage === page ? { backgroundColor: config.color } : {}}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} className="text-[#5d5d5d]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Drawer */}
      {selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setSelectedUser(null)} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-[#e8e8e8] px-6 py-4 flex items-center justify-between z-10">
              <p className="text-[#383838] text-[16px] font-semibold">User Details</p>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
              >
                <X size={18} className="text-[#5d5d5d]" />
              </button>
            </div>

            <div className="px-6 py-5">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-[22px] font-semibold"
                  style={{ backgroundColor: CRM_CONFIGS[selectedUser.crmType].color }}
                >
                  {selectedUser.avatar}
                </div>
                <div>
                  <p className="text-[#383838] text-[18px] font-semibold">{selectedUser.name}</p>
                  <p className="text-[#9a9a9a] text-[13px]">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize"
                      style={{ backgroundColor: STATUS_CONFIG[selectedUser.status].bgColor, color: STATUS_CONFIG[selectedUser.status].color }}
                    >
                      {selectedUser.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-[#f5f5f5] text-[#5d5d5d]">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mb-6">
                <button className="flex-1 h-[38px] rounded-[10px] bg-[#f6f6f6] text-[13px] font-medium text-[#5d5d5d] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#eee] transition-colors">
                  <Mail size={14} /> Email
                </button>
                {selectedUser.status !== "active" && (
                  <button
                    onClick={() => handleStatusChange(selectedUser.id, "active")}
                    className="flex-1 h-[38px] rounded-[10px] bg-[#dcfce7] text-[13px] font-medium text-[#22c55e] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#bbf7d0] transition-colors"
                  >
                    <CheckCircle2 size={14} /> Activate
                  </button>
                )}
                {selectedUser.status === "active" && (
                  <button
                    onClick={() => handleStatusChange(selectedUser.id, "suspended")}
                    className="flex-1 h-[38px] rounded-[10px] bg-[#fef2f2] text-[13px] font-medium text-[#ef4444] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#fee2e2] transition-colors"
                  >
                    <Ban size={14} /> Suspend
                  </button>
                )}
              </div>

              {/* Info Sections */}
              <div className="space-y-5">
                {/* Account Info */}
                <div>
                  <p className="text-[#9a9a9a] text-[11px] uppercase tracking-wider font-medium mb-3">Account Information</p>
                  <div className="bg-[#fafafa] rounded-[12px] p-4 space-y-3">
                    {[
                      { label: "Phone", value: selectedUser.phone },
                      { label: "Business", value: selectedUser.businessName },
                      { label: "Joined", value: selectedUser.createdAt },
                      { label: "Last Active", value: selectedUser.lastActive },
                      { label: "Total Logins", value: selectedUser.loginCount.toString() },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-[13px]">
                        <span className="text-[#9a9a9a]">{item.label}</span>
                        <span className="text-[#383838] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscription */}
                <div>
                  <p className="text-[#9a9a9a] text-[11px] uppercase tracking-wider font-medium mb-3">Subscription</p>
                  <div className="bg-[#fafafa] rounded-[12px] p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {(() => {
                        const CrmIcon = CRM_ICONS[selectedUser.crmType];
                        const crmCfg = CRM_CONFIGS[selectedUser.crmType];
                        return (
                          <>
                            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: crmCfg.colorLight }}>
                              <CrmIcon size={20} style={{ color: crmCfg.color }} />
                            </div>
                            <div>
                              <p className="text-[#383838] text-[14px] font-semibold">{crmCfg.name}</p>
                              <p className="text-[#9a9a9a] text-[12px]">
                                {PLAN_DETAILS[selectedUser.plan].name} · {PLAN_DETAILS[selectedUser.plan].price}{PLAN_DETAILS[selectedUser.plan].period}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Usage Stats */}
                <div>
                  <p className="text-[#9a9a9a] text-[11px] uppercase tracking-wider font-medium mb-3">Usage Statistics</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Customers", value: selectedUser.totalCustomers.toLocaleString(), color: "#1a6bb5" },
                      { label: "Sales", value: selectedUser.totalSales.toLocaleString(), color: "#22c55e" },
                      { label: "Revenue", value: selectedUser.revenue, color: "#9333ea" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#fafafa] rounded-[12px] p-3 text-center">
                        <p className="text-[#383838] text-[18px] font-semibold" style={{ color: stat.color }}>{stat.value}</p>
                        <p className="text-[#9a9a9a] text-[11px]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Log */}
                <div>
                  <p className="text-[#9a9a9a] text-[11px] uppercase tracking-wider font-medium mb-3">Recent Activity</p>
                  <div className="space-y-2">
                    {[
                      { action: "Logged in", time: selectedUser.lastActive, icon: Activity },
                      { action: "Added new customer", time: "1 hr ago", icon: Users },
                      { action: "Recorded a sale", time: "3 hrs ago", icon: Activity },
                      { action: "Updated settings", time: "Yesterday", icon: Activity },
                    ].map((log, i) => {
                      const LogIcon = log.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 py-2">
                          <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                            <LogIcon size={12} className="text-[#9a9a9a]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[#383838] text-[13px]">{log.action}</p>
                          </div>
                          <span className="text-[#b0b0b0] text-[11px] shrink-0">{log.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}