import { useState } from "react";
import { useCrm } from "../CrmContext";
import { Search, Plus, X, Check, Pencil, Trash2 } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  contact: string;
  source: string;
  stage: string;
  assignedTo: string;
  value: string;
}

const stages = ["New Lead", "Contacted", "Negotiation", "Won", "Lost"];
const stageColors: Record<string, string> = {
  "New Lead": "#3b82f6",
  Contacted: "#f59e0b",
  Negotiation: "#8b5cf6",
  Won: "#22c55e",
  Lost: "#ef4444",
};

const assignees = ["Ren Urot", "May Cruz"];

const generateLeads = (type: string): Lead[] => {
  const sources: Record<string, string[]> = {
    finance: ["Referral", "LinkedIn", "Website", "Conference", "Cold Call"],
    realestate: ["Zillow", "Website", "Referral", "Open House", "Social Media"],
    retail: ["Walk-in", "Online", "Social Media", "Referral", "Ad Campaign"],
    hospitality: ["Hospital Website", "Doctor Referral", "Walk-in", "HMO Partner", "Online Booking"],
    flowershop: ["Instagram", "Walk-in", "Website", "Referral", "Google"],
  };
  const s = sources[type] || sources.flowershop;
  return [
    { id: 1, name: "Elena Marcos", contact: "elena@gmail.com", source: s[0], stage: "New Lead", assignedTo: "Ren Urot", value: "P45,000" },
    { id: 2, name: "Roberto Villa", contact: "+63 917 222 3333", source: s[1], stage: "Contacted", assignedTo: "Ren Urot", value: "P120,000" },
    { id: 3, name: "Patricia Lim", contact: "pat.lim@corp.com", source: s[2], stage: "Negotiation", assignedTo: "May Cruz", value: "P280,000" },
    { id: 4, name: "Miguel Torres", contact: "+63 918 444 5555", source: s[3], stage: "New Lead", assignedTo: "May Cruz", value: "P65,000" },
    { id: 5, name: "Carmen Aquino", contact: "carmen@biz.com", source: s[4], stage: "Won", assignedTo: "Ren Urot", value: "P350,000" },
    { id: 6, name: "Andrew Sy", contact: "+63 920 666 7777", source: s[0], stage: "Contacted", assignedTo: "May Cruz", value: "P95,000" },
    { id: 7, name: "Diana Cruz", contact: "diana.c@gmail.com", source: s[1], stage: "Negotiation", assignedTo: "Ren Urot", value: "P180,000" },
    { id: 8, name: "Rafael Santos", contact: "+63 915 888 9999", source: s[2], stage: "Lost", assignedTo: "May Cruz", value: "P75,000" },
    { id: 9, name: "Isabel Reyes", contact: "isabel@co.ph", source: s[3], stage: "New Lead", assignedTo: "Ren Urot", value: "P210,000" },
    { id: 10, name: "Victor Lao", contact: "+63 916 111 0000", source: s[4], stage: "Contacted", assignedTo: "May Cruz", value: "P155,000" },
  ];
};

const getSources = (type: string): string[] => {
  const sources: Record<string, string[]> = {
    finance: ["Referral", "LinkedIn", "Website", "Conference", "Cold Call"],
    realestate: ["Zillow", "Website", "Referral", "Open House", "Social Media"],
    retail: ["Walk-in", "Online", "Social Media", "Referral", "Ad Campaign"],
    hospitality: ["Hospital Website", "Doctor Referral", "Walk-in", "HMO Partner", "Online Booking"],
    flowershop: ["Instagram", "Walk-in", "Website", "Referral", "Google"],
  };
  return sources[type] || sources.flowershop;
};

export function LeadsPage() {
  const { config, crmType } = useCrm();
  const [leads, setLeads] = useState(() => generateLeads(crmType));
  const [view, setView] = useState<"pipeline" | "table">("pipeline");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", source: "", stage: "New Lead", assignedTo: "Ren Urot", value: "" });

  const sources = getSources(crmType);

  const filteredLeads = leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  const moveStage = (leadId: number, newStage: string) => {
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, stage: newStage } : l));
  };

  const openAdd = () => {
    setFormData({ name: "", contact: "", source: sources[0], stage: "New Lead", assignedTo: "Ren Urot", value: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (lead: Lead) => {
    setFormData({ name: lead.name, contact: lead.contact, source: lead.source, stage: lead.stage, assignedTo: lead.assignedTo, value: lead.value });
    setEditId(lead.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name) return;
    if (editId) {
      setLeads((prev) => prev.map((l) => l.id === editId ? { ...l, ...formData } : l));
    } else {
      setLeads((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-[26px] font-semibold" style={{ color: config.color }}>{config.leadLabel} Pipeline</h1>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#f0f0f0] rounded-[10px] p-1">
            <button onClick={() => setView("pipeline")} className={`px-3 py-1 rounded-[8px] text-[13px] font-medium cursor-pointer ${view === "pipeline" ? "bg-white shadow-sm text-[#383838]" : "text-[#9a9a9a]"}`}>Pipeline</button>
            <button onClick={() => setView("table")} className={`px-3 py-1 rounded-[8px] text-[13px] font-medium cursor-pointer ${view === "table" ? "bg-white shadow-sm text-[#383838]" : "text-[#9a9a9a]"}`}>Table</button>
          </div>
          <button onClick={openAdd} className="h-[40px] px-4 md:px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 transition-colors cursor-pointer whitespace-nowrap" style={{ backgroundColor: config.color }}>
            <Plus size={16} /> <span className="hidden sm:inline">Add</span> {config.leadLabel}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-[350px] mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${config.leadLabel.toLowerCase()}s...`}
          className="w-full h-[38px] bg-white border border-[#e0e0e0] rounded-[8px] pl-9 pr-3 text-[14px] outline-none focus:border-[#ff4e00]" />
      </div>

      {/* Pipeline View */}
      {view === "pipeline" ? (
        <div className="overflow-x-auto relative pb-4">
          <div className="grid grid-cols-5 gap-3 min-w-[1000px]">
            {stages.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.stage === stage);
              return (
                <div key={stage} className="min-w-[200px]">
                  {/* Stage Header */}
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stageColors[stage] }} />
                    <span className="text-[14px] font-semibold text-[#383838]">{stage}</span>
                    <span className="ml-auto w-5 h-5 rounded-full bg-[#f0f0f0] text-[11px] font-semibold text-[#5d5d5d] flex items-center justify-center">{stageLeads.length}</span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-2.5">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="bg-white rounded-[12px] border border-[#e8e8e8] p-3.5 hover:shadow-md transition-all">
                        <p className="text-[#383838] text-[14px] font-semibold mb-1">{lead.name}</p>
                        <p className="text-[#9a9a9a] text-[12px] mb-2 truncate">{lead.contact}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: config.colorLight, color: config.color }}>{lead.source}</span>
                          <span className="text-[#383838] text-[13px] font-semibold">{lead.value}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#9a9a9a]">{lead.assignedTo}</span>
                          <div className="flex items-center gap-1">
                            {stage !== "Won" && stage !== "Lost" && (
                              <select
                                value={stage}
                                onChange={(e) => moveStage(lead.id, e.target.value)}
                                className="text-[11px] text-[#5d5d5d] bg-[#f5f5f5] border-none rounded px-1 py-0.5 cursor-pointer outline-none"
                              >
                                {stages.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            )}
                            <button onClick={() => openEdit(lead)} className="w-6 h-6 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#9a9a9a] hover:bg-[#e5e5e5] cursor-pointer"><Pencil size={11} /></button>
                            <button onClick={() => handleDelete(lead.id)} className="w-6 h-6 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#e53e00] hover:bg-[#fee] cursor-pointer"><Trash2 size={11} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[16px] border border-[#e8e8e8] overflow-x-auto relative">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#e8e8e8]">
                {[config.leadLabel, "Contact", "Source", "Stage", "Value", "Assigned To", ""].map((h, i) => (
                  <th key={`${h}-${i}`} className={`text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider ${i === 6 ? "w-20" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa]">
                  <td className="px-5 py-3.5">
                    <button onClick={() => openEdit(lead)} className="text-[14px] font-medium cursor-pointer hover:underline" style={{ color: config.color }}>{lead.name}</button>
                  </td>
                  <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{lead.contact}</td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[12px] font-medium" style={{ backgroundColor: config.colorLight, color: config.color }}>{lead.source}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={lead.stage}
                      onChange={(e) => moveStage(lead.id, e.target.value)}
                      className="px-2.5 py-1 rounded-full text-[12px] font-medium text-white border-none cursor-pointer outline-none"
                      style={{ backgroundColor: stageColors[lead.stage] }}
                    >
                      {stages.map((s) => (
                        <option key={s} value={s} style={{ color: "#383838", backgroundColor: "white" }}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-[14px] text-[#383838] font-semibold">{lead.value}</td>
                  <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{lead.assignedTo}</td>
                  <td className="px-3 pr-5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(lead)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#9a9a9a] hover:bg-[#e5e5e5] cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(lead.id)} className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] rounded-full text-[#e53e00] hover:bg-[#fee] cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[480px] max-h-[90vh] overflow-auto bg-white rounded-[20px] shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#383838] text-[20px] font-semibold">{editId ? "Edit" : "Add"} {config.leadLabel}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-[#f0f0f0] rounded-full cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Contact</label>
                <input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Email or phone"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Assigned To</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {assignees.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Value</label>
                  <input
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="P0"
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 h-[42px] border border-[#e0e0e0] rounded-[10px] text-[14px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="flex-1 h-[42px] text-white text-[14px] font-semibold rounded-[10px] cursor-pointer flex items-center justify-center gap-1.5" style={{ backgroundColor: config.color }}>
                <Check size={16} /> {editId ? "Save Changes" : `Add ${config.leadLabel}`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}