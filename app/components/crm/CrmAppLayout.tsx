import { useCrm, CRM_CONFIGS, EXTRA_MODULE_ICON_MAP, PLAN_DETAILS } from "./CrmContext";
import { useAuth } from "./AuthContext";
import {
  LayoutDashboard, Users, Target, DollarSign, BarChart3, Settings,
  Bell, ChevronDown, LogOut, User, Menu, Package, Plus, Check, Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { NexxByteLogo } from "./NexxByteLogo";
import { NotificationProvider, useNotifications } from "./NotificationContext";
import { NotificationPanel } from "./NotificationPanel";
import { InventoryProvider } from "./InventoryContext";

/* CRM App Layout — v2 */

/* ──────── Sidebar Nav Item ──────── */
function SidebarItem({
  icon: Icon,
  label,
  active,
  color,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all cursor-pointer text-left group"
      style={{
        backgroundColor: active ? color + "14" : "transparent",
        color: active ? color : "#6b6b6b",
      }}
    >
      <Icon
        size={18}
        style={{ color: active ? color : "#9a9a9a" }}
        className="shrink-0 transition-colors"
      />
      <span
        className="text-[13px] transition-colors"
        style={{ fontWeight: active ? 600 : 500, color: active ? color : "#6b6b6b" }}
      >
        {label}
      </span>
      {active && (
        <div
          className="ml-auto w-[5px] h-[5px] rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
    </button>
  );
}

/* ──────── Subscription Switcher Dropdown ──────── */
function SubscriptionSwitcher({ color }: { color: string }) {
  const { subscriptions, activeSubscription, setActiveSubscription } = useCrm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Only show switcher if user has more than 1 subscription
  if (subscriptions.length <= 1) return null;

  return (
    <div className="m-[0px] px-[14px] py-[7px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[8px] text-[11px] font-medium text-[#9a9a9a] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
      >
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        Switch CRM ({subscriptions.length})
      </button>

      {open && (
        <div className="mt-1 space-y-1">
          {subscriptions.map((sub) => {
            const subConfig = CRM_CONFIGS[sub.crmType];
            const SubIcon = subConfig.icon;
            const isActive = sub.id === activeSubscription?.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  if (!isActive) {
                    setActiveSubscription(sub.id);
                    window.location.href = "/app/crm/dashboard";
                  }
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] text-left transition-all cursor-pointer ${
                  isActive ? "bg-opacity-10" : "hover:bg-[#f5f5f5]"
                }`}
                style={isActive ? { backgroundColor: subConfig.color + "14" } : {}}
              >
                <div
                  className="w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: isActive ? subConfig.color : subConfig.colorLight }}
                >
                  <SubIcon size={14} style={{ color: isActive ? "#fff" : subConfig.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-[11px] font-semibold truncate ${isActive ? "text-[#383838]" : "text-[#5d5d5d]"}`}>
                    {subConfig.name}
                  </p>
                  <p className="text-[9px] text-[#9a9a9a] truncate">{sub.businessName}</p>
                </div>
                {isActive && (
                  <div className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: subConfig.color }} />
                )}
              </button>
            );
          })}
          <button
            onClick={() => { navigate("/crm/settings"); setOpen(false); }}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[10px] font-medium text-[#9a9a9a] hover:text-[#ff4e00] hover:bg-[#fff8f4] transition-colors cursor-pointer"
          >
            <Settings size={10} /> Manage
          </button>
        </div>
      )}
    </div>
  );
}

/* ──────── Header Bar ──────── */
function HeaderBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { config } = useCrm();
  const { user, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const color = config.color;

  return (
    <header className="h-[56px] bg-white border-b border-[#e8e8e8] flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
      {/* Left side — mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="md:hidden w-9 h-9 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
      >
        <Menu size={20} className="text-[#6b6b6b]" />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side — notification bell + user avatar */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            className="w-9 h-9 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors relative"
          >
            <Bell size={20} className="text-[#6b6b6b]" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-[5px] rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                style={{ backgroundColor: "#ff4e00" }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationPanel color={color} onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white text-[12px] font-bold"
              style={{ backgroundColor: "#ff4e00" }}
            >
              {user?.initials || "U"}
            </div>
            <ChevronDown size={14} className="text-[#9a9a9a] hidden md:block" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-[220px] bg-white rounded-[12px] shadow-xl border border-[#e4e4e4] z-50 py-2">
                {/* User info */}
                <div className="px-4 py-2 border-b border-[#eee]">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                      style={{ backgroundColor: "#ff4e00" }}
                    >
                      {user?.initials || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#383838] truncate">{user?.name}</p>
                      <p className="text-[11px] text-[#9a9a9a] truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] text-[10px] font-semibold">
                        <Shield size={10} /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ backgroundColor: config.colorLight, color: config.color }}
                      >
                        <User size={10} /> Subscriber
                      </span>
                    )}
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={() => { setShowUserMenu(false); navigate("/crm/settings"); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                  >
                    <Settings size={15} className="text-[#9a9a9a]" />
                    <span className="text-[13px] text-[#6b6b6b]">Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate("/crm/login");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-[#ffebee] transition-colors cursor-pointer"
                  >
                    <LogOut size={15} className="text-[#c62828]" />
                    <span className="text-[13px] text-[#c62828]">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ──────── Core Navigation Items ──────── */
const CORE_NAV = [
  { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "customers", label: "_CUSTOMERS_", icon: Users },
  { path: "leads", label: "_LEADS_", icon: Target },
  { path: "sales", label: "_SALES_", icon: DollarSign },
  { path: "reports", label: "Reports", icon: BarChart3 },
];

/* ──────── Sidebar ──────── */
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { config, crmType, activeSubscription } = useCrm();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const color = config.color;
  const plan = PLAN_DETAILS[activeSubscription.plan];

  const currentPath = location.pathname.replace("/crm/", "").replace("/crm", "") || "dashboard";

  const navItems = CORE_NAV.map((item) => ({
    ...item,
    label: item.label
      .replace("_CUSTOMERS_", config.customerLabelPlural)
      .replace("_LEADS_", config.leadLabel + "s")
      .replace("_SALES_", config.saleLabel + "s"),
  }));

  const extraModules = config.extraModules.map((mod) => ({
    path: mod.path,
    label: mod.label,
    icon: EXTRA_MODULE_ICON_MAP[mod.icon] || Package,
  }));

  const handleNavigate = (path: string) => {
    navigate(`/crm/${path}`);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-white border-r border-[#e8e8e8] z-40
          flex flex-col transition-transform duration-200
          md:static md:translate-x-0 md:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo + Business Name */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center gap-2 mb-4">
            <NexxByteLogo size={24} />
          </div>
          <div className="flex items-center gap-2.5 px-1">
            <div
              className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: color }}
            >
              {(() => {
                const Icon = config.icon;
                return <Icon size={16} className="text-white" />;
              })()}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#383838] truncate">
                {activeSubscription.businessName}
              </p>
              <p className="text-[10px] font-medium truncate" style={{ color }}>
                {config.name} · {plan.name}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-[#eee] mb-2" />

        {/* Navigation */}
        <nav className="flex-1 overflow-auto relative px-3 pb-3">
          <p className="text-[10px] font-semibold text-[#b0b0b0] uppercase tracking-wider px-3 mb-1.5">Main</p>
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                active={currentPath === item.path || (currentPath === "" && item.path === "dashboard")}
                color={color}
                onClick={() => handleNavigate(item.path)}
              />
            ))}
          </div>

          {/* Extra Modules */}
          {extraModules.length > 0 && (
            <>
              <p className="text-[10px] font-semibold text-[#b0b0b0] uppercase tracking-wider px-3 mt-4 mb-1.5">
                Modules
              </p>
              <div className="space-y-0.5">
                {extraModules.map((mod) => (
                  <SidebarItem
                    key={mod.path}
                    icon={mod.icon}
                    label={mod.label}
                    active={currentPath === mod.path}
                    color={color}
                    onClick={() => handleNavigate(mod.path)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Settings */}
          <div className="border-t border-[#eee] mt-4 pt-3">
            <SidebarItem
              icon={Settings}
              label="Settings"
              active={currentPath === "settings"}
              color={color}
              onClick={() => handleNavigate("settings")}
            />

            {/* Admin - Manage Users */}
            {isAdmin && (
              <SidebarItem
                icon={Shield}
                label="Manage Users"
                active={currentPath === "admin/users"}
                color={color}
                onClick={() => handleNavigate("admin/users")}
              />
            )}
          </div>
        </nav>

        {/* Subscription Switcher — bottom of sidebar */}
        <div className="mt-auto border-t border-[#eee]">
          <SubscriptionSwitcher color={color} />
        </div>
      </aside>
    </>
  );
}

/* ──────── Auth Guard ──────── */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/crm/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;
  return <>{children}</>;
}

/* ──────── Main CRM App Layout ──────── */
function CrmAppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { crmType, subscriptions } = useCrm();
  const navigate = useNavigate();

  // Redirect to type selector if no subscriptions exist
  useEffect(() => {
    if (subscriptions.length === 0) {
      navigate("/crm/select-type", { replace: true });
    }
  }, [subscriptions, navigate]);

  if (subscriptions.length === 0) return null;

  return (
    <NotificationProvider crmType={crmType}>
      <InventoryProvider>
        <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-w-0 relative">
            <HeaderBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="flex-1 overflow-auto relative">
              <Outlet />
            </main>
          </div>
        </div>
      </InventoryProvider>
    </NotificationProvider>
  );
}

export function CrmAppLayout() {
  return (
    <AuthGuard>
      <CrmAppContent />
    </AuthGuard>
  );
}