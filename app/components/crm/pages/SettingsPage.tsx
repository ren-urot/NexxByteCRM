import { useState } from "react";
import { useCrm, CRM_CONFIGS, PLAN_DETAILS, type CrmType, type PlanId } from "../CrmContext";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import { User, Building, Bell, CreditCard, Check, Plus, X, Zap, Star, Crown, ArrowLeft, AlertTriangle, Trash2, ArrowRight } from "lucide-react";

const crmTypesList: CrmType[] = ["finance", "realestate", "retail", "hospitality", "flowershop"];

const planOptions: { id: PlanId; name: string; icon: typeof Zap; price: string; period: string; description: string }[] = [
  { id: "free", name: "Free Trial", icon: Zap, price: "P0", period: "for 14 days", description: "Try all features free" },
  { id: "basic", name: "Basic", icon: Star, price: "P999", period: "/month", description: "Perfect for small businesses" },
  { id: "premium", name: "Premium", icon: Crown, price: "P2,499", period: "/month", description: "For growing businesses" },
];

export function SettingsPage() {
  const { config, activeSubscription, subscriptions, setActiveSubscription, addSubscription, removeSubscription } = useCrm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: user?.name || "User",
    email: user?.email || "user@crmplatform.com",
    phone: "+63 917 000 1234",
    role: user?.role === "admin" ? "Admin" : "Subscriber",
  });
  const [business, setBusiness] = useState({ name: activeSubscription?.businessName || "My Business", address: "123 Street, Makati City", industry: config.name });
  const [notifs, setNotifs] = useState({ email: true, push: true, sales: true, leads: true, weekly: false });
  const [saved, setSaved] = useState(false);

  // Add new CRM modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addStep, setAddStep] = useState<1 | 2>(1); // 1=select CRM, 2=select plan
  const [newCrmType, setNewCrmType] = useState<CrmType>("flowershop");
  const [newPlan, setNewPlan] = useState<PlanId>("basic");
  const [newBusinessName, setNewBusinessName] = useState("");

  // Remove confirmation
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  // Switch confirmation
  const [confirmSwitchId, setConfirmSwitchId] = useState<string | null>(null);

  const openAddModal = () => {
    // Default to a CRM type the user doesn't already have
    const existingTypes = subscriptions.map((s) => s.crmType);
    const availableType = crmTypesList.find((t) => !existingTypes.includes(t)) || "flowershop";
    setNewCrmType(availableType);
    setNewPlan("basic");
    setNewBusinessName("");
    setAddStep(1);
    setShowAddModal(true);
  };

  const handleAddConfirm = () => {
    addSubscription({
      plan: newPlan,
      planName: planOptions.find((p) => p.id === newPlan)?.name || "Basic",
      crmType: newCrmType,
      businessName: newBusinessName || "My Business",
    });
    setShowAddModal(false);
    window.location.href = "/app/crm/settings";
  };

  const handleSwitch = (subId: string) => {
    setActiveSubscription(subId);
    window.location.href = "/app/crm/settings";
  };

  const handleRemove = (subId: string) => {
    removeSubscription(subId);
    setConfirmRemoveId(null);
    // If we removed the active one, reload to pick up the new active
    if (subId === activeSubscription?.id) {
      window.location.href = "/app/crm/settings";
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "business", label: "Business", icon: <Building size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "subscriptions", label: "Subscriptions", icon: <CreditCard size={16} /> },
  ];

  // For the add modal: CRM types the user already has
  const existingCrmTypes = subscriptions.map((s) => s.crmType);

  return (
    <div className="max-w-[990px] mx-auto px-4 md:px-6 py-8">
      <h1 className="text-[26px] font-semibold mb-6" style={{ color: config.color }}>Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-[200px] shrink-0">
          <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-2 flex md:flex-col gap-1 overflow-x-auto relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-all cursor-pointer mb-0.5 ${
                  activeTab === tab.id ? "text-white" : "text-[#5d5d5d] hover:bg-[#f5f5f5]"
                }`}
                style={activeTab === tab.id ? { backgroundColor: config.color } : {}}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-6">
            {/* Profile */}
            {activeTab === "profile" && (
              <>
                <h2 className="text-[#383838] text-[18px] font-semibold mb-5">Profile Settings</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full text-white text-[20px] font-semibold flex items-center justify-center" style={{ backgroundColor: config.color }}>
                    {user?.initials || "U"}
                  </div>
                  <div>
                    <p className="text-[#383838] text-[16px] font-semibold">{profile.name}</p>
                    <p className="text-[#9a9a9a] text-[14px]">{profile.role} &middot; {config.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Full Name", key: "name" as const },
                    { label: "Email", key: "email" as const },
                    { label: "Phone", key: "phone" as const },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[#383838] text-[14px] font-medium mb-1">{field.label}</label>
                      <input
                        value={profile[field.key]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                        className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Business */}
            {activeTab === "business" && (
              <>
                <h2 className="text-[#383838] text-[18px] font-semibold mb-5">Business Settings</h2>
                <div className="space-y-4">
                  {[
                    { label: "Business Name", key: "name" as const },
                    { label: "Address", key: "address" as const },
                    { label: "Industry", key: "industry" as const },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[#383838] text-[14px] font-medium mb-1">{field.label}</label>
                      <input
                        value={business[field.key]}
                        onChange={(e) => setBusiness({ ...business, [field.key]: e.target.value })}
                        className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                        readOnly={field.key === "industry"}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <>
                <h2 className="text-[#383838] text-[18px] font-semibold mb-5">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", key: "email" as const, desc: "Receive updates via email" },
                    { label: "Push Notifications", key: "push" as const, desc: "Browser push notifications" },
                    { label: `New ${config.saleLabel} Alerts`, key: "sales" as const, desc: `Get notified for every new ${config.saleLabel.toLowerCase()}` },
                    { label: `${config.leadLabel} Updates`, key: "leads" as const, desc: `Alerts when ${config.leadLabel.toLowerCase()}s change stage` },
                    { label: "Weekly Report", key: "weekly" as const, desc: "Receive weekly summary email" },
                  ].map((n) => (
                    <div key={n.key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-[#383838] text-[14px] font-medium">{n.label}</p>
                        <p className="text-[#9a9a9a] text-[13px]">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key] })}
                        className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${notifs[n.key] ? "" : "bg-[#d0d0d0]"}`}
                        style={notifs[n.key] ? { backgroundColor: config.color } : {}}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${notifs[n.key] ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Subscriptions */}
            {activeTab === "subscriptions" && (
              <>
                <div className="mb-5">
                  <h2 className="text-[#383838] text-[18px] font-semibold mb-1">Your Subscriptions</h2>
                  <p className="text-[#9a9a9a] text-[13px]">
                    Manage your CRM subscriptions. Switch between them or add a new one.
                  </p>
                </div>

                {/* All Subscriptions List */}
                <div className="space-y-3 mb-6">
                  {subscriptions.map((sub) => {
                    const subConfig = CRM_CONFIGS[sub.crmType];
                    const SubIcon = subConfig.icon;
                    const isActive = sub.id === activeSubscription?.id;
                    const planDetail = PLAN_DETAILS[sub.plan];

                    return (
                      <div
                        key={sub.id}
                        className={`relative flex items-center gap-4 p-4 rounded-[14px] border-2 transition-all ${
                          isActive ? "shadow-sm" : "border-[#e8e8e8] opacity-75 hover:opacity-100"
                        }`}
                        style={isActive ? { borderColor: subConfig.color } : {}}
                      >
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: subConfig.colorLight }}
                        >
                          <SubIcon size={24} style={{ color: subConfig.color }} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-[#383838] text-[15px] font-semibold truncate">{subConfig.name}</p>
                            {isActive && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white shrink-0"
                                style={{ backgroundColor: subConfig.color }}
                              >
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[#9a9a9a] text-[13px]">
                            {sub.businessName} &middot; {planDetail?.name || sub.planName} ({planDetail?.price || "\u2014"}{planDetail?.period || ""})
                          </p>
                          <p className="text-[#b0b0b0] text-[11px] mt-0.5">Since {sub.createdAt}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {!isActive && (
                            <>
                              {confirmSwitchId === sub.id ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleSwitch(sub.id)}
                                    className="h-[32px] px-3 rounded-[8px] text-[12px] font-semibold text-white cursor-pointer transition-colors"
                                    style={{ backgroundColor: subConfig.color }}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setConfirmSwitchId(null)}
                                    className="h-[32px] px-3 rounded-[8px] text-[12px] font-medium text-[#5d5d5d] bg-[#f0f0f0] hover:bg-[#e5e5e5] cursor-pointer transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmSwitchId(sub.id)}
                                  className="h-[32px] px-3.5 rounded-[8px] text-[12px] font-semibold cursor-pointer transition-all flex items-center gap-1.5 border"
                                  style={{ borderColor: subConfig.color, color: subConfig.color }}
                                >
                                  <ArrowRight size={13} />
                                  Switch
                                </button>
                              )}
                            </>
                          )}

                          {/* Remove */}
                          {confirmRemoveId === sub.id ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleRemove(sub.id)}
                                className="h-[32px] px-3 rounded-[8px] text-[12px] font-semibold text-white bg-[#ef4444] hover:bg-[#dc2626] cursor-pointer transition-colors"
                              >
                                Remove
                              </button>
                              <button
                                onClick={() => setConfirmRemoveId(null)}
                                className="h-[32px] px-3 rounded-[8px] text-[12px] font-medium text-[#5d5d5d] bg-[#f0f0f0] hover:bg-[#e5e5e5] cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmRemoveId(sub.id)}
                              className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[#c0c0c0] hover:text-[#ef4444] hover:bg-[#fef2f2] cursor-pointer transition-colors"
                              title="Remove subscription"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {subscriptions.length === 0 && (
                    <div className="text-center py-8">
                      <CreditCard size={40} className="text-[#d0d0d0] mx-auto mb-3" />
                      <p className="text-[#9a9a9a] text-[14px]">No subscriptions yet. Add your first CRM below.</p>
                    </div>
                  )}
                </div>

                {/* Add New CRM Button */}
                <button
                  onClick={openAddModal}
                  className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[12px] border-2 border-dashed border-[#d0d0d0] text-[14px] font-medium text-[#9a9a9a] hover:border-[#ff4e00] hover:text-[#ff4e00] transition-colors cursor-pointer"
                >
                  <Plus size={16} /> Add New CRM Subscription
                </button>

                <div className="mt-5 p-4 bg-[#f9fafb] rounded-[12px] border border-[#e8e8e8]">
                  <p className="text-[#5d5d5d] text-[13px]">
                    <span className="font-medium text-[#383838]">Tip:</span> You can subscribe to multiple CRM types and switch between them instantly. Only one CRM is active at a time — switching is free and doesn't create a new charge.
                  </p>
                </div>
              </>
            )}

            {/* Save Button */}
            {activeTab !== "subscriptions" && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="h-[42px] px-6 text-white text-[14px] font-semibold rounded-[10px] hover:opacity-90 cursor-pointer flex items-center gap-2"
                  style={{ backgroundColor: config.color }}
                >
                  {saved ? <><Check size={16} /> Saved!</> : "Save Changes"}
                </button>
                {saved && <span className="text-[#1a8a1a] text-[14px] font-medium">Changes saved successfully!</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add New CRM Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />

          <div className="relative bg-white rounded-[20px] shadow-2xl w-[calc(100%-2rem)] max-w-[520px] max-h-[85vh] overflow-y-auto z-10">
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-[20px] px-6 pt-6 pb-4 border-b border-[#eee] z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#383838] text-[20px] font-semibold">Add New CRM</h2>
                  <p className="text-[#9a9a9a] text-[13px] mt-0.5">
                    {addStep === 1 ? "Select the industry CRM you want to add" : "Choose a plan for this CRM"}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={18} className="text-[#9a9a9a]" />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mt-4">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                        addStep > s ? "bg-[#22c55e] text-white" : addStep === s ? "bg-[#ff4e00] text-white" : "bg-[#e0e0e0] text-[#9a9a9a]"
                      }`}
                    >
                      {addStep > s ? <Check size={12} /> : s}
                    </div>
                    <span className={`text-[12px] ${addStep >= s ? "text-[#383838] font-medium" : "text-[#9a9a9a]"}`}>
                      {s === 1 ? "CRM Type" : "Plan & Confirm"}
                    </span>
                    {s < 2 && <div className="w-6 h-px bg-[#e0e0e0]" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-5">
              {/* Step 1: Select CRM Type */}
              {addStep === 1 && (
                <div className="space-y-3">
                  {crmTypesList.map((typeId) => {
                    const c = CRM_CONFIGS[typeId];
                    const CrmIcon = c.icon;
                    const isSelected = newCrmType === typeId;
                    const alreadyHas = existingCrmTypes.includes(typeId);

                    return (
                      <button
                        key={typeId}
                        onClick={() => !alreadyHas && setNewCrmType(typeId)}
                        disabled={alreadyHas}
                        className={`w-full flex items-center gap-3.5 p-3.5 rounded-[12px] border-2 text-left transition-all ${
                          alreadyHas
                            ? "border-[#e8e8e8] opacity-40 cursor-not-allowed"
                            : isSelected
                            ? "shadow-md cursor-pointer"
                            : "border-[#e8e8e8] hover:border-[#ccc] cursor-pointer"
                        }`}
                        style={isSelected && !alreadyHas ? { borderColor: c.color, backgroundColor: c.colorLight } : {}}
                      >
                        <div
                          className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: isSelected && !alreadyHas ? c.color : c.colorLight }}
                        >
                          <CrmIcon size={20} style={{ color: isSelected && !alreadyHas ? "#fff" : c.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-[14px] font-semibold ${isSelected && !alreadyHas ? "text-[#383838]" : "text-[#5d5d5d]"}`}>{c.name}</p>
                            {alreadyHas && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#e8e8e8] text-[#9a9a9a]">
                                Already subscribed
                              </span>
                            )}
                          </div>
                          <p className="text-[#9a9a9a] text-[12px] mt-0.5">
                            {c.customerLabelPlural} &middot; {c.leadLabel}s &middot; {c.saleLabel}s
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected && !alreadyHas ? "text-white" : "border-[#d0d0d0]"
                          }`}
                          style={isSelected && !alreadyHas ? { borderColor: c.color, backgroundColor: c.color } : {}}
                        >
                          {isSelected && !alreadyHas && <Check size={12} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Plan + Confirm */}
              {addStep === 2 && (() => {
                const newConfig = CRM_CONFIGS[newCrmType];
                const NewIcon = newConfig.icon;
                return (
                  <div className="space-y-5">
                    {/* Selected CRM summary */}
                    <div className="flex items-center gap-3 p-3.5 rounded-[12px] border border-[#e8e8e8] bg-[#fafafa]">
                      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: newConfig.colorLight }}>
                        <NewIcon size={20} style={{ color: newConfig.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#383838] text-[14px] font-semibold">{newConfig.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {newConfig.extraModules.map((m) => (
                            <span key={m.label} className="px-1.5 py-0.5 rounded-full text-[9px] font-medium" style={{ backgroundColor: newConfig.colorLight, color: newConfig.color }}>
                              {m.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Plan selection */}
                    <div>
                      <p className="text-[#383838] text-[14px] font-medium mb-3">Choose a plan</p>
                      <div className="space-y-2.5">
                        {planOptions.map((plan) => {
                          const PlanIcon = plan.icon;
                          const isSelected = newPlan === plan.id;
                          return (
                            <button
                              key={plan.id}
                              onClick={() => setNewPlan(plan.id)}
                              className={`w-full flex items-center gap-3.5 p-3.5 rounded-[12px] border-2 text-left transition-all cursor-pointer ${
                                isSelected ? "border-[#ff4e00] bg-[#fff8f4] shadow-md" : "border-[#e8e8e8] hover:border-[#ccc]"
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${isSelected ? "bg-[#ff4e00]" : "bg-[#f5f5f5]"}`}>
                                <PlanIcon size={18} className={isSelected ? "text-white" : "text-[#9a9a9a]"} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[14px] font-semibold ${isSelected ? "text-[#ff4e00]" : "text-[#5d5d5d]"}`}>{plan.name}</p>
                                <p className="text-[#9a9a9a] text-[12px]">{plan.price} {plan.period} &middot; {plan.description}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-[#ff4e00] bg-[#ff4e00]" : "border-[#d0d0d0]"}`}>
                                {isSelected && <Check size={12} className="text-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Business name */}
                    <div>
                      <label className="block text-[#383838] text-[13px] font-medium mb-1.5">Business Name</label>
                      <input
                        value={newBusinessName}
                        onChange={(e) => setNewBusinessName(e.target.value)}
                        placeholder="Enter your business name"
                        className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00] transition-colors"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white rounded-b-[20px] px-6 py-4 border-t border-[#eee]">
              <div className="flex items-center gap-3">
                {addStep > 1 && (
                  <button
                    onClick={() => setAddStep(1)}
                    className="h-[44px] px-4 bg-[#f5f5f5] text-[#5d5d5d] text-[14px] font-medium rounded-[10px] hover:bg-[#eee] cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                )}
                {addStep === 1 ? (
                  <button
                    onClick={() => setAddStep(2)}
                    disabled={existingCrmTypes.includes(newCrmType)}
                    className={`flex-1 h-[44px] text-[14px] font-semibold rounded-[10px] flex items-center justify-center gap-2 transition-colors ${
                      existingCrmTypes.includes(newCrmType)
                        ? "bg-[#e0e0e0] text-[#9a9a9a] cursor-not-allowed"
                        : "bg-[#ff4e00] text-white hover:bg-[#e64500] cursor-pointer"
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleAddConfirm}
                    className="flex-1 h-[44px] bg-[#ff4e00] text-white text-[14px] font-semibold rounded-[10px] hover:bg-[#e64500] cursor-pointer flex items-center justify-center gap-2 transition-colors"
                  >
                    <Check size={16} />
                    Add Subscription
                  </button>
                )}
              </div>
              {addStep === 1 && existingCrmTypes.length > 0 && (
                <p className="text-[#b0b0b0] text-[11px] text-center mt-2">
                  CRM types you already have are greyed out. Select a new type to add.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}