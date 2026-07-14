import { useState } from "react";
import { useCrm } from "../CrmContext";
import { Search, Plus, MoreHorizontal, Mail, Phone, X, Check, Pencil, Trash2 } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Active" | "Inactive";
  notes: string;
  extra: Record<string, string>;
  avatar: string;
}

const generateCustomers = (type: string): Customer[] => {
  const base = [
    { name: "Maria Santos", email: "maria@gmail.com", phone: "+63 917 123 4567", company: "" },
    { name: "Juan Dela Cruz", email: "juan@yahoo.com", phone: "+63 918 987 6543", company: "" },
    { name: "Ana Reyes", email: "ana.reyes@gmail.com", phone: "+63 920 555 1234", company: "" },
    { name: "Carlo Mendoza", email: "carlo.m@outlook.com", phone: "+63 915 777 8899", company: "" },
    { name: "Lisa Tan", email: "lisa.tan@gmail.com", phone: "+63 912 111 2233", company: "" },
    { name: "Mark Rivera", email: "mark.r@gmail.com", phone: "+63 916 444 5566", company: "" },
    { name: "Sofia Garcia", email: "sofia.g@yahoo.com", phone: "+63 919 222 3344", company: "" },
    { name: "David Chen", email: "david.chen@gmail.com", phone: "+63 917 666 7788", company: "" },
  ];

  const extras: Record<string, Record<string, string>[]> = {
    finance: [
      { "Portfolio Value": "P2.5M", "Risk Level": "Moderate", "Account Type": "Investment" },
      { "Portfolio Value": "P1.2M", "Risk Level": "High", "Account Type": "Trading" },
      { "Portfolio Value": "P850K", "Risk Level": "Low", "Account Type": "Savings" },
      { "Portfolio Value": "P3.1M", "Risk Level": "Moderate", "Account Type": "Investment" },
      { "Portfolio Value": "P500K", "Risk Level": "High", "Account Type": "Trading" },
      { "Portfolio Value": "P1.8M", "Risk Level": "Low", "Account Type": "Retirement" },
      { "Portfolio Value": "P4.2M", "Risk Level": "Moderate", "Account Type": "Investment" },
      { "Portfolio Value": "P750K", "Risk Level": "Low", "Account Type": "Savings" },
    ],
    realestate: [
      { "Property Interest": "Condo", "Budget Range": "P5-8M", "Move-in Date": "Jun 2026" },
      { "Property Interest": "House & Lot", "Budget Range": "P12-18M", "Move-in Date": "Sep 2026" },
      { "Property Interest": "Commercial", "Budget Range": "P25M+", "Move-in Date": "ASAP" },
      { "Property Interest": "Condo", "Budget Range": "P3-5M", "Move-in Date": "Dec 2026" },
      { "Property Interest": "Townhouse", "Budget Range": "P8-12M", "Move-in Date": "Mar 2027" },
      { "Property Interest": "House & Lot", "Budget Range": "P15-20M", "Move-in Date": "Jul 2026" },
      { "Property Interest": "Lot Only", "Budget Range": "P2-4M", "Move-in Date": "N/A" },
      { "Property Interest": "Condo", "Budget Range": "P6-9M", "Move-in Date": "Nov 2026" },
    ],
    retail: [
      { "Loyalty Tier": "Gold", "Preferred Category": "Electronics", "Last Visit": "Mar 14" },
      { "Loyalty Tier": "Silver", "Preferred Category": "Fashion", "Last Visit": "Mar 12" },
      { "Loyalty Tier": "Platinum", "Preferred Category": "Home", "Last Visit": "Mar 15" },
      { "Loyalty Tier": "Bronze", "Preferred Category": "Beauty", "Last Visit": "Mar 10" },
      { "Loyalty Tier": "Gold", "Preferred Category": "Sports", "Last Visit": "Mar 13" },
      { "Loyalty Tier": "Silver", "Preferred Category": "Electronics", "Last Visit": "Mar 11" },
      { "Loyalty Tier": "Platinum", "Preferred Category": "Fashion", "Last Visit": "Mar 15" },
      { "Loyalty Tier": "Bronze", "Preferred Category": "Home", "Last Visit": "Mar 8" },
    ],
    hospitality: [
      { "Medical Condition": "Hypertension", "Appointment Date": "Mar 20", "Attending Doctor": "Dr. Reyes" },
      { "Medical Condition": "Dental Cavity", "Appointment Date": "Mar 21", "Attending Doctor": "Dr. Tan" },
      { "Medical Condition": "Annual Physical", "Appointment Date": "Mar 22", "Attending Doctor": "Dr. Reyes" },
      { "Medical Condition": "Back Pain", "Appointment Date": "Mar 25", "Attending Doctor": "Dr. Santos" },
      { "Medical Condition": "Diabetes Checkup", "Appointment Date": "Mar 28", "Attending Doctor": "Dr. Cruz" },
    ],
    flowershop: [
      { "Flower Preference": "Roses", "Occasion": "Anniversary", "Delivery Address": "123 Ayala Ave" },
      { "Flower Preference": "Sunflowers", "Occasion": "Birthday", "Delivery Address": "45 BGC 5th Ave" },
      { "Flower Preference": "Tulips", "Occasion": "Wedding", "Delivery Address": "78 Ortigas Center" },
      { "Flower Preference": "Orchids", "Occasion": "Corporate", "Delivery Address": "22 Eastwood QC" },
      { "Flower Preference": "Mixed", "Occasion": "Get Well", "Delivery Address": "15 Rockwell" },
      { "Flower Preference": "Lilies", "Occasion": "Funeral", "Delivery Address": "90 Alabang" },
      { "Flower Preference": "Roses", "Occasion": "Valentine's", "Delivery Address": "33 Makati CBD" },
      { "Flower Preference": "Dried", "Occasion": "Housewarming", "Delivery Address": "67 Pasig" },
    ],
  };

  const companies: Record<string, string[]> = {
    finance: ["Santos Holdings", "DCruz Capital", "Reyes Investments", "Mendoza Group", "Tan Enterprises", "Rivera Corp", "Garcia Fund", "Chen Assets"],
    realestate: ["Self", "DCruz Family", "Reyes Corp", "Mendoza Dev", "Tan Properties", "Rivera Group", "Garcia Holdings", "Chen Real Estate"],
    retail: ["Personal", "Personal", "Santos Co.", "Personal", "Tan Store", "Rivera Shop", "Personal", "Chen's"],
    hospitality: ["Self", "Self", "Reyes Family", "Mendoza Corp", "Tan Insurance", "Rivera HMO", "Garcia Group", "Chen Medical"],
    flowershop: ["Personal", "DCruz Events", "Reyes Wedding", "Corporate", "Tan Office", "Personal", "Garcia Party", "Personal"],
  };

  return base.map((b, i) => ({
    id: i + 1,
    ...b,
    company: companies[type]?.[i] || "N/A",
    status: (i % 5 === 0 ? "Inactive" : "Active") as "Active" | "Inactive",
    notes: "",
    extra: extras[type]?.[i] || {},
    avatar: b.name.split(" ").map((n) => n[0]).join(""),
  }));
};

const avatarColors = ["#ff4e00", "#0a6e3a", "#1a6bb5", "#9333ea", "#b45309", "#e53e00", "#0077cc", "#1a8a1a"];

const ROWS_PER_PAGE = 8;

export function CustomersPage() {
  const { config, crmType } = useCrm();
  const [customers, setCustomers] = useState(() => generateCustomers(crmType));
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRows = filtered.slice((safeCurrentPage - 1) * ROWS_PER_PAGE, safeCurrentPage * ROWS_PER_PAGE);

  const openAdd = () => {
    setFormData({ name: "", email: "", phone: "", company: "", notes: "" });
    setEditId(null);
    setShowAddModal(true);
  };

  const openEdit = (c: Customer) => {
    setFormData({ name: c.name, email: c.email, phone: c.phone, company: c.company, notes: c.notes });
    setEditId(c.id);
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (editId) {
      setCustomers((prev) => prev.map((c) => c.id === editId ? { ...c, ...formData } : c));
    } else {
      setCustomers((prev) => [
        ...prev,
        { id: Date.now(), ...formData, status: "Active" as const, extra: {}, avatar: formData.name.split(" ").map((n) => n[0]).join("") },
      ]);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset page when filters change
  const handleSearch = (v: string) => { setSearch(v); setCurrentPage(1); };
  const handleFilterStatus = (s: string) => { setFilterStatus(s); setCurrentPage(1); };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[26px] font-semibold" style={{ color: config.color }}>{config.customerLabelPlural}</h1>
        <button
          onClick={openAdd}
          className="h-[40px] px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 transition-colors cursor-pointer whitespace-nowrap w-fit"
          style={{ backgroundColor: config.color }}
        >
          <Plus size={16} /> Add {config.customerLabel}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[16px] border border-[#e8e8e8]">
        <div className="p-5 flex flex-wrap items-center gap-3 border-b border-[#e8e8e8]">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
            <input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder={`Search ${config.customerLabelPlural.toLowerCase()}...`}
              className="w-full h-[38px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[8px] pl-9 pr-3 text-[14px] outline-none focus:border-[#ff4e00]" />
          </div>
          {["All", "Active", "Inactive"].map((s) => (
            <button key={s} onClick={() => handleFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                filterStatus === s ? "text-white" : "bg-[#f0f0f0] text-[#5d5d5d] hover:bg-[#e8e8e8]"
              }`} style={filterStatus === s ? { backgroundColor: config.color } : {}}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap">{config.customerLabel}</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap">Company</th>
                {config.extraFields.map((f) => (
                  <th key={f} className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">{f}</th>
                ))}
                <th className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="w-10 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((c, idx) => (
                <tr key={c.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full text-white text-[13px] font-semibold flex items-center justify-center shrink-0" style={{ backgroundColor: avatarColors[((safeCurrentPage - 1) * ROWS_PER_PAGE + idx) % avatarColors.length] }}>
                        {c.avatar}
                      </div>
                      <button onClick={() => openEdit(c)} className="text-[13px] font-medium cursor-pointer hover:underline whitespace-nowrap" style={{ color: config.color }}>{c.name}</button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5d5d5d] whitespace-nowrap"><Mail size={12} className="text-[#9a9a9a]" /> {c.email}</div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5d5d5d] whitespace-nowrap"><Phone size={12} className="text-[#9a9a9a]" /> {c.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[#5d5d5d] whitespace-nowrap">{c.company}</td>
                  {config.extraFields.map((f) => (
                    <td key={f} className="px-5 py-3.5 text-[13px] text-[#5d5d5d] hidden lg:table-cell whitespace-nowrap">{c.extra[f] || "—"}</td>
                  ))}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${c.status === "Active" ? "bg-[#e6f9e6] text-[#1a8a1a]" : "bg-[#f0f0f0] text-[#666]"}`}>{c.status}</span>
                  </td>
                  <td className="px-3 pr-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(c)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#9a9a9a] hover:bg-[#e5e5e5] cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(c.id)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#e53e00] hover:bg-[#fee] cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#e8e8e8]">
            <p className="text-[13px] text-[#9a9a9a]">
              Showing {(safeCurrentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[#5d5d5d] hover:bg-[#f0f0f0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
                    page === safeCurrentPage ? "text-white" : "text-[#5d5d5d] hover:bg-[#f0f0f0]"
                  }`}
                  style={page === safeCurrentPage ? { backgroundColor: config.color } : {}}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-[8px] text-[13px] font-medium text-[#5d5d5d] hover:bg-[#f0f0f0] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowAddModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[460px] max-h-[90vh] overflow-auto bg-white rounded-[20px] shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#383838] text-[20px] font-semibold">{editId ? "Edit" : "Add"} {config.customerLabel}</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[#f0f0f0] rounded-full cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Name", key: "name", placeholder: "Full name" },
                { label: "Email", key: "email", placeholder: "email@example.com" },
                { label: "Phone", key: "phone", placeholder: "+63 9XX XXX XXXX" },
                { label: "Company", key: "company", placeholder: "Company name" },
                { label: "Notes", key: "notes", placeholder: "Additional notes..." },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">{field.label}</label>
                  <input
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 h-[42px] border border-[#e0e0e0] rounded-[10px] text-[14px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex-1 h-[42px] text-white text-[14px] font-semibold rounded-[10px] cursor-pointer flex items-center justify-center gap-1.5" style={{ backgroundColor: config.color }}>
                <Check size={16} /> {editId ? "Save Changes" : `Add ${config.customerLabel}`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}