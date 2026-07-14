import React, { useState } from "react";
import { useParams } from "react-router";
import { useCrm, type CrmType } from "../CrmContext";
import { Search, Plus, Package, X, Check, Pencil, Trash2 } from "lucide-react";

// Industry-specific data for each extra module
const moduleData: Record<string, Record<string, { title: string; columns: string[]; rows: Record<string, string>[] }>> = {
  finance: {
    portfolios: {
      title: "Portfolios",
      columns: ["Client", "Portfolio", "Value", "Return", "Risk", "Status"],
      rows: [
        { Client: "Maria Santos", Portfolio: "Growth Fund A", Value: "P2.5M", Return: "+12.4%", Risk: "Moderate", Status: "Active" },
        { Client: "Juan Dela Cruz", Portfolio: "Tech ETF", Value: "P1.2M", Return: "+18.7%", Risk: "High", Status: "Active" },
        { Client: "Ana Reyes", Portfolio: "Bond Fund", Value: "P850K", Return: "+4.2%", Risk: "Low", Status: "Active" },
        { Client: "Carlo Mendoza", Portfolio: "Equity Mix", Value: "P3.1M", Return: "+9.8%", Risk: "Moderate", Status: "Under Review" },
        { Client: "Lisa Tan", Portfolio: "Real Estate Fund", Value: "P500K", Return: "+7.5%", Risk: "Moderate", Status: "Active" },
      ],
    },
    compliance: {
      title: "Compliance",
      columns: ["Client", "Document", "Type", "Due Date", "Status"],
      rows: [
        { Client: "Maria Santos", Document: "KYC Verification", Type: "Identity", "Due Date": "Mar 20, 2026", Status: "Pending" },
        { Client: "Juan Dela Cruz", Document: "AML Check", Type: "Screening", "Due Date": "Mar 18, 2026", Status: "Completed" },
        { Client: "Ana Reyes", Document: "Risk Assessment", Type: "Compliance", "Due Date": "Mar 25, 2026", Status: "In Progress" },
        { Client: "Carlo Mendoza", Document: "Annual Review", Type: "Audit", "Due Date": "Apr 1, 2026", Status: "Upcoming" },
      ],
    },
  },
  realestate: {
    listings: {
      title: "Property Listings",
      columns: ["Property", "Type", "Location", "Price", "Size", "Status"],
      rows: [
        { Property: "Skyline Condo A-12", Type: "Condo", Location: "BGC, Taguig", Price: "P8.5M", Size: "65 sqm", Status: "For Sale" },
        { Property: "Villa Estates Lot 5", Type: "House & Lot", Location: "Alabang", Price: "P18.2M", Size: "250 sqm", Status: "For Sale" },
        { Property: "Metro Office 3F", Type: "Commercial", Location: "Makati CBD", Price: "P25M", Size: "120 sqm", Status: "Leased" },
        { Property: "Park View Tower", Type: "Condo", Location: "Pasig", Price: "P5.8M", Size: "48 sqm", Status: "Reserved" },
        { Property: "Green Meadows", Type: "Townhouse", Location: "Quezon City", Price: "P12M", Size: "180 sqm", Status: "For Sale" },
      ],
    },
    showings: {
      title: "Property Showings",
      columns: ["Contact", "Property", "Date", "Time", "Agent", "Status"],
      rows: [
        { Contact: "Maria Santos", Property: "Skyline Condo A-12", Date: "Mar 16", Time: "2:00 PM", Agent: "Ren Urot", Status: "Confirmed" },
        { Contact: "Juan Dela Cruz", Property: "Villa Estates Lot 5", Date: "Mar 17", Time: "10:00 AM", Agent: "May Cruz", Status: "Pending" },
        { Contact: "Ana Reyes", Property: "Metro Office 3F", Date: "Mar 18", Time: "3:30 PM", Agent: "Ren Urot", Status: "Confirmed" },
        { Contact: "Carlo Mendoza", Property: "Park View Tower", Date: "Mar 20", Time: "11:00 AM", Agent: "May Cruz", Status: "Rescheduled" },
      ],
    },
  },
  retail: {
    products: {
      title: "Product Catalog",
      columns: ["Product", "SKU", "Category", "Price", "Stock", "Status"],
      rows: [
        { Product: "Wireless Earbuds Pro", SKU: "ELC-001", Category: "Electronics", Price: "P3,500", Stock: "45", Status: "In Stock" },
        { Product: "Designer Handbag", SKU: "FSH-012", Category: "Fashion", Price: "P8,900", Stock: "8", Status: "Low Stock" },
        { Product: "Smart Home Kit", SKU: "HOM-003", Category: "Home", Price: "P5,200", Stock: "22", Status: "In Stock" },
        { Product: "Running Shoes V2", SKU: "SPT-007", Category: "Sports", Price: "P4,800", Stock: "0", Status: "Out of Stock" },
        { Product: "Skincare Set", SKU: "BTY-019", Category: "Beauty", Price: "P2,100", Stock: "31", Status: "In Stock" },
      ],
    },
    loyalty: {
      title: "Loyalty Program",
      columns: ["Member", "Tier", "Points", "Lifetime Spent", "Joined", "Status"],
      rows: [
        { Member: "Lisa Tan", Tier: "Platinum", Points: "12,450", "Lifetime Spent": "P68,900", Joined: "Nov 2024", Status: "Active" },
        { Member: "Maria Santos", Tier: "Gold", Points: "8,200", "Lifetime Spent": "P45,200", Joined: "Jan 2025", Status: "Active" },
        { Member: "Ana Reyes", Tier: "Gold", Points: "6,800", "Lifetime Spent": "P36,800", Joined: "Feb 2025", Status: "Active" },
        { Member: "Carlo Mendoza", Tier: "Silver", Points: "2,400", "Lifetime Spent": "P12,400", Joined: "Jun 2025", Status: "Active" },
        { Member: "David Chen", Tier: "Bronze", Points: "540", "Lifetime Spent": "P5,400", Joined: "Aug 2025", Status: "New" },
      ],
    },
  },
  hospitality: {
    appointments: {
      title: "Appointments",
      columns: ["Patient", "Doctor", "Service", "Date", "Time", "Status"],
      rows: [
        { Patient: "Maria Santos", Doctor: "Dr. Reyes", Service: "General Checkup", Date: "Mar 20", Time: "9:00 AM", Status: "Confirmed" },
        { Patient: "Ana Reyes", Doctor: "Dr. Tan", Service: "Dental Cleaning", Date: "Mar 20", Time: "10:30 AM", Status: "Confirmed" },
        { Patient: "Carlo Mendoza", Doctor: "Dr. Reyes", Service: "Follow-up", Date: "Mar 21", Time: "2:00 PM", Status: "Pending" },
        { Patient: "Lisa Tan", Doctor: "Dr. Cruz", Service: "Lab Work", Date: "Mar 22", Time: "8:00 AM", Status: "Confirmed" },
        { Patient: "Mark Rivera", Doctor: "Dr. Tan", Service: "Consultation", Date: "Mar 23", Time: "3:30 PM", Status: "Waitlist" },
      ],
    },
    services: {
      title: "Medical Services",
      columns: ["Service", "Department", "Doctor", "Duration", "Fee", "Status"],
      rows: [
        { Service: "General Checkup", Department: "General Medicine", Doctor: "Dr. Reyes", Duration: "30 min", Fee: "P800", Status: "Active" },
        { Service: "Dental Cleaning", Department: "Dentistry", Doctor: "Dr. Tan", Duration: "45 min", Fee: "P1,500", Status: "Active" },
        { Service: "Blood Work Panel", Department: "Laboratory", Doctor: "Dr. Cruz", Duration: "15 min", Fee: "P2,200", Status: "Active" },
        { Service: "Physical Therapy", Department: "Rehabilitation", Doctor: "Dr. Santos", Duration: "60 min", Fee: "P1,800", Status: "Active" },
        { Service: "X-Ray", Department: "Radiology", Doctor: "Dr. Cruz", Duration: "20 min", Fee: "P3,500", Status: "Active" },
      ],
    },
  },
  flowershop: {
    pos: {
      title: "Point of Sale",
      columns: ["Order", "Customer", "Items", "Total", "Type", "Status"],
      rows: [
        { Order: "POS-001", Customer: "Walk-in", Items: "Rose Bouquet x2", Total: "P2,400", Type: "Pickup", Status: "Completed" },
        { Order: "POS-002", Customer: "Maria Santos", Items: "Sunflower Bundle", Total: "P950", Type: "Delivery", Status: "Processing" },
        { Order: "POS-003", Customer: "Walk-in", Items: "Orchid Plant", Total: "P2,100", Type: "Pickup", Status: "Completed" },
        { Order: "POS-004", Customer: "Ana Reyes", Items: "Wedding Bouquet", Total: "P8,500", Type: "Delivery", Status: "Preparing" },
        { Order: "POS-005", Customer: "Walk-in", Items: "Dried Lavender x3", Total: "P1,950", Type: "Pickup", Status: "Completed" },
      ],
    },
    deliveries: {
      title: "Deliveries",
      columns: ["Delivery", "Customer", "Address", "Items", "Rider", "Status"],
      rows: [
        { Delivery: "DEL-001", Customer: "Maria Santos", Address: "123 Ayala Ave, Makati", Items: "Rose Bouquet x2", Rider: "James Cruz", Status: "In Transit" },
        { Delivery: "DEL-002", Customer: "Ana Reyes", Address: "45 BGC, Taguig", Items: "Tulip Arrangement", Rider: "Mark Lim", Status: "Preparing" },
        { Delivery: "DEL-003", Customer: "Mark Rivera", Address: "78 Ortigas, Pasig", Items: "Funeral Wreath", Rider: "James Cruz", Status: "In Transit" },
        { Delivery: "DEL-004", Customer: "Grace Lim", Address: "22 Eastwood, QC", Items: "Birthday Bouquet", Rider: "Paolo Santos", Status: "Delivered" },
      ],
    },
  },
};

const statusColors: Record<string, string> = {
  Active: "bg-[#e6f9e6] text-[#1a8a1a]",
  Completed: "bg-[#e6f9e6] text-[#1a8a1a]",
  Confirmed: "bg-[#e6f9e6] text-[#1a8a1a]",
  Delivered: "bg-[#e6f9e6] text-[#1a8a1a]",
  Booked: "bg-[#e8f4fd] text-[#0077cc]",
  "In Stock": "bg-[#e6f9e6] text-[#1a8a1a]",
  "For Sale": "bg-[#e8f4fd] text-[#0077cc]",
  Pending: "bg-[#f0f0f0] text-[#666]",
  "In Progress": "bg-[#fff3e0] text-[#e68a00]",
  Processing: "bg-[#fff3e0] text-[#e68a00]",
  Preparing: "bg-[#fff3e0] text-[#e68a00]",
  "In Transit": "bg-[#e8f4fd] text-[#0077cc]",
  "Under Review": "bg-[#fff3e0] text-[#e68a00]",
  Upcoming: "bg-[#f3e8ff] text-[#8b5cf6]",
  "Low Stock": "bg-[#fff3e0] text-[#e68a00]",
  "Out of Stock": "bg-[#fee] text-[#e53e00]",
  Leased: "bg-[#f0f0f0] text-[#666]",
  Reserved: "bg-[#f3e8ff] text-[#8b5cf6]",
  Rescheduled: "bg-[#fff3e0] text-[#e68a00]",
  Waitlist: "bg-[#f0f0f0] text-[#666]",
  New: "bg-[#e8f4fd] text-[#0077cc]",
};

export function ExtraModulePage() {
  const { config, crmType } = useCrm();
  const { module } = useParams<{ module: string }>();

  const templateData = moduleData[crmType]?.[module || ""];

  if (!templateData) {
    return (
      <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-20 text-center">
        <Package size={48} className="text-[#d0d0d0] mx-auto mb-4" />
        <h2 className="text-[#383838] text-[20px] font-semibold mb-2">Module Not Available</h2>
        <p className="text-[#9a9a9a] text-[15px]">This module is not configured for {config.name}.</p>
      </div>
    );
  }

  return <ModuleTable templateData={templateData} config={config} />;
}

function ModuleTable({ templateData, config }: { templateData: { title: string; columns: string[]; rows: Record<string, string>[] }; config: any }) {
  const [rows, setRows] = useState<Record<string, string>[]>(templateData.rows);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const columns = templateData.columns;

  const filtered = rows.filter((row) =>
    Object.values(row).some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => {
    const empty: Record<string, string> = {};
    columns.forEach((col) => { empty[col] = ""; });
    setFormData(empty);
    setEditIdx(null);
    setShowModal(true);
  };

  const openEdit = (idx: number) => {
    const row = rows[idx];
    setFormData({ ...row });
    setEditIdx(idx);
    setShowModal(true);
  };

  const handleSave = () => {
    const hasValue = Object.values(formData).some((v) => v.trim());
    if (!hasValue) return;
    if (editIdx !== null) {
      setRows((prev) => prev.map((r, i) => i === editIdx ? { ...formData } : r));
    } else {
      setRows((prev) => [...prev, { ...formData }]);
    }
    setShowModal(false);
  };

  const handleDelete = (idx: number) => {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[26px] font-semibold" style={{ color: config.color }}>{templateData.title}</h1>
        <button onClick={openAdd} className="h-[40px] px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 cursor-pointer whitespace-nowrap w-fit" style={{ backgroundColor: config.color }}>
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[16px] border border-[#e8e8e8]">
        <div className="p-5 border-b border-[#e8e8e8]">
          <div className="relative max-w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${templateData.title.toLowerCase()}...`}
              className="w-full h-[38px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[8px] pl-9 pr-3 text-[14px] outline-none focus:border-[#ff4e00]" />
          </div>
        </div>
        <div className="overflow-x-auto relative">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                {columns.map((col) => (
                  <th key={col} className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider">{col}</th>
                ))}
                <th className="w-20 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                // Find the original index in rows for edit/delete
                const originalIdx = rows.indexOf(row);
                return (
                  <tr key={`${Object.values(row).join("-")}-${i}`} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                    {columns.map((col, ci) => (
                      <td key={col} className="px-5 py-3.5 text-[14px]">
                        {col === "Status" ? (
                          <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${statusColors[row[col]] || "bg-[#f0f0f0] text-[#666]"}`}>{row[col]}</span>
                        ) : ci === 0 ? (
                          <button onClick={() => openEdit(originalIdx)} className="font-medium cursor-pointer hover:underline" style={{ color: config.color }}>{row[col]}</button>
                        ) : (
                          <span className={ci === 1 ? "font-medium text-[#383838]" : "text-[#5d5d5d]"}>{row[col]}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-3 pr-5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(originalIdx)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#9a9a9a] hover:bg-[#e5e5e5] cursor-pointer"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(originalIdx)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#e53e00] hover:bg-[#fee] cursor-pointer"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
              <h2 className="text-[#383838] text-[20px] font-semibold">{editIdx !== null ? "Edit" : "Add"} {templateData.title.replace(/s$/, "")}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-[#f0f0f0] rounded-full cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {columns.map((col) => (
                <div key={col}>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">{col}</label>
                  <input
                    value={formData[col] || ""}
                    onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                    placeholder={`Enter ${col.toLowerCase()}`}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 h-[42px] border border-[#e0e0e0] rounded-[10px] text-[14px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex-1 h-[42px] text-white text-[14px] font-semibold rounded-[10px] cursor-pointer flex items-center justify-center gap-1.5" style={{ backgroundColor: config.color }}>
                <Check size={16} /> {editIdx !== null ? "Save Changes" : "Add Entry"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}