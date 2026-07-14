import { useState } from "react";
import { useCrm } from "../CrmContext";
import { Search, Plus, ArrowUpRight, ArrowDownRight, X, Check, Pencil, Trash2 } from "lucide-react";

interface Sale {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Completed" | "Pending" | "Processing";
  date: string;
}

const generateSales = (type: string): Sale[] => {
  const products: Record<string, string[]> = {
    finance: ["Investment Advisory", "Portfolio Management", "Tax Planning", "Estate Planning", "Insurance Package", "Retirement Plan", "Wealth Mgmt"],
    realestate: ["Condo Unit A-12", "House & Lot BGC", "Commercial Space", "Lot Sale Alabang", "Townhouse Pasig", "Penthouse Makati", "Office Space"],
    retail: ["Electronics Bundle", "Fashion Collection", "Home Essentials", "Beauty Package", "Sports Gear Set", "Premium Membership", "Gift Cards"],
    hospitality: ["General Checkup", "Dental Cleaning", "Lab Work Panel", "Physical Therapy", "X-Ray Scan", "Follow-up Visit", "Specialist Consult"],
    flowershop: ["Rose Bouquet x2", "Wedding Package", "Tulip Arrangement", "Anniversary Bouquet", "Orchid Plant x3", "Funeral Wreath", "Dried Flower Box"],
  };

  const customers = ["Maria Santos", "Juan Dela Cruz", "Ana Reyes", "Carlo Mendoza", "Lisa Tan", "Mark Rivera", "Sofia Garcia"];
  const p = products[type] || products.flowershop;
  const statuses: Sale["status"][] = ["Completed", "Pending", "Processing"];

  return p.map((prod, i) => ({
    id: `SAL-${String(i + 1).padStart(3, "0")}`,
    customer: customers[i % customers.length],
    product: prod,
    amount: `P${(Math.floor(Math.random() * 50 + 5) * 1000).toLocaleString()}`,
    status: statuses[i % 3],
    date: `Mar ${15 - i}, 2026`,
  }));
};

const statusColors: Record<string, string> = {
  Completed: "bg-[#e6f9e6] text-[#1a8a1a]",
  Pending: "bg-[#f0f0f0] text-[#666]",
  Processing: "bg-[#fff3e0] text-[#e68a00]",
};

const statsData: Record<string, { total: string; monthly: string; avg: string; count: string }> = {
  finance: { total: "P4.2M", monthly: "P680K", avg: "P85,000", count: "52" },
  realestate: { total: "P12.8M", monthly: "P2.1M", avg: "P450,000", count: "28" },
  retail: { total: "P890K", monthly: "P148K", avg: "P2,500", count: "356" },
  hospitality: { total: "P2.1M", monthly: "P350K", avg: "P2,800", count: "742" },
  flowershop: { total: "P128K", monthly: "P42K", avg: "P1,250", count: "98" },
};

export function SalesPage() {
  const { config, crmType } = useCrm();
  const [sales, setSales] = useState(() => generateSales(crmType));
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ customer: "", product: "", amount: "", status: "Pending" as Sale["status"], date: "Mar 15, 2026" });
  const stats = statsData[crmType];

  const filtered = sales.filter((s) => {
    const matchSearch = s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setFormData({ customer: "", product: "", amount: "", status: "Pending", date: "Mar 15, 2026" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (sale: Sale) => {
    setFormData({ customer: sale.customer, product: sale.product, amount: sale.amount, status: sale.status, date: sale.date });
    setEditId(sale.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.customer || !formData.product) return;
    if (editId) {
      setSales((prev) => prev.map((s) => s.id === editId ? { ...s, ...formData } : s));
    } else {
      setSales((prev) => [
        ...prev,
        { id: `SAL-${String(prev.length + 1).padStart(3, "0")}`, ...formData },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  const cycleStatus = (id: string) => {
    const order: Sale["status"][] = ["Pending", "Processing", "Completed"];
    setSales((prev) => prev.map((s) => {
      if (s.id !== id) return s;
      const idx = order.indexOf(s.status);
      return { ...s, status: order[(idx + 1) % order.length] };
    }));
  };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[26px] font-semibold" style={{ color: config.color }}>{config.saleLabel} Tracking</h1>
        <button onClick={openAdd} className="h-[40px] px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 cursor-pointer whitespace-nowrap w-fit" style={{ backgroundColor: config.color }}>
          <Plus size={16} /> Record {config.saleLabel}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: `Total ${config.saleLabel}s`, value: stats.total, change: "+18.5%", up: true },
          { label: "This Month", value: stats.monthly, change: "+12.3%", up: true },
          { label: `Avg. ${config.saleLabel}`, value: stats.avg, change: "+5.7%", up: true },
          { label: `${config.saleLabel} Count`, value: stats.count, change: "-2.1%", up: false },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
            <p className="text-[#9a9a9a] text-[13px] font-medium mb-1">{s.label}</p>
            <p className="text-[#383838] text-[24px] font-semibold">{s.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-[13px] font-medium ${s.up ? "text-[#1a8a1a]" : "text-[#e53e00]"}`}>
              {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[16px] border border-[#e8e8e8]">
        <div className="p-5 flex flex-wrap items-center gap-3 border-b border-[#e8e8e8]">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${config.saleLabel.toLowerCase()}s...`}
              className="w-full h-[38px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[8px] pl-9 pr-3 text-[14px] outline-none focus:border-[#ff4e00]" />
          </div>
          {["All", "Completed", "Processing", "Pending"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                filterStatus === s ? "text-white" : "bg-[#f0f0f0] text-[#5d5d5d] hover:bg-[#e8e8e8]"
              }`} style={filterStatus === s ? { backgroundColor: config.color } : {}}>
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto relative">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                {["ID", config.customerLabel, "Product/Service", "Amount", "Status", "Date", ""].map((h, i) => (
                  <th key={`${h}-${i}`} className={`text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap ${i === 6 ? "w-20" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sale) => (
                <tr key={sale.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa]">
                  <td className="px-5 py-3.5 text-[14px] font-medium" style={{ color: config.color }}>{sale.id}</td>
                  <td className="px-5 py-3.5 text-[14px] text-[#383838] font-medium">{sale.customer}</td>
                  <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{sale.product}</td>
                  <td className="px-5 py-3.5 text-[14px] text-[#383838] font-semibold">{sale.amount}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => cycleStatus(sale.id)} className={`px-2.5 py-1 rounded-full text-[12px] font-medium cursor-pointer ${statusColors[sale.status]}`} title="Click to change status">{sale.status}</button>
                  </td>
                  <td className="px-5 py-3.5 text-[14px] text-[#9a9a9a]">{sale.date}</td>
                  <td className="px-3 pr-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(sale)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#9a9a9a] hover:bg-[#e5e5e5] cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(sale.id)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#e53e00] hover:bg-[#fee] cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[480px] max-h-[90vh] overflow-auto bg-white rounded-[20px] shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#383838] text-[20px] font-semibold">{editId ? "Edit" : "Record"} {config.saleLabel}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-[#f0f0f0] rounded-full cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">{config.customerLabel}</label>
                <input
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  placeholder="Customer name"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Product/Service</label>
                <input
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="Product or service name"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Amount</label>
                  <input
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="P0"
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                  />
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Sale["status"] })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Date</label>
                <input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Mar 15, 2026"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 h-[42px] border border-[#e0e0e0] rounded-[10px] text-[14px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex-1 h-[42px] text-white text-[14px] font-semibold rounded-[10px] cursor-pointer flex items-center justify-center gap-1.5" style={{ backgroundColor: config.color }}>
                <Check size={16} /> {editId ? "Save Changes" : `Record ${config.saleLabel}`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}