import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Landmark, Home, ShoppingBag, Hospital, Flower2,
  Briefcase, Shield, Building, CalendarDays, Package, Star, Truck, Store, Stethoscope, ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type CrmType = "finance" | "realestate" | "retail" | "hospitality" | "flowershop";
export type PlanId = "free" | "basic" | "premium";

export interface CrmConfig {
  id: CrmType;
  name: string;
  icon: LucideIcon;
  color: string;
  colorLight: string;
  image: string;
  customerLabel: string;
  customerLabelPlural: string;
  leadLabel: string;
  saleLabel: string;
  extraFields: string[];
  extraModules: { label: string; path: string; icon: string }[];
}

export interface Subscription {
  id: string;
  plan: PlanId;
  planName: string;
  crmType: CrmType;
  businessName: string;
  createdAt: string;
}

export const PLAN_DETAILS: Record<PlanId, { name: string; price: string; period: string }> = {
  free: { name: "Free Trial", price: "P0", period: "14 days" },
  basic: { name: "Basic", price: "P999", period: "/month" },
  premium: { name: "Premium", price: "P2,499", period: "/month" },
};

export const EXTRA_MODULE_ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  shield: Shield,
  building: Building,
  calendar: CalendarDays,
  package: Package,
  star: Star,
  stethoscope: Stethoscope,
  truck: Truck,
  store: Store,
  clipboard: ClipboardList,
};

export const CRM_CONFIGS: Record<CrmType, CrmConfig> = {
  finance: {
    id: "finance",
    name: "Finance CRM",
    icon: Landmark,
    color: "#0a6e3a",
    colorLight: "#e6f5ed",
    image: "https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhZHZpc29yJTIwbW9kZXJuJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzYzMzkxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    customerLabel: "Client",
    customerLabelPlural: "Clients",
    leadLabel: "Prospect",
    saleLabel: "Transaction",
    extraFields: ["Portfolio Value", "Risk Level", "Account Type"],
    extraModules: [
      { label: "Portfolios", path: "portfolios", icon: "briefcase" },
      { label: "Compliance", path: "compliance", icon: "shield" },
    ],
  },
  realestate: {
    id: "realestate",
    name: "Real Estate CRM",
    icon: Home,
    color: "#1a6bb5",
    colorLight: "#e6f0fa",
    image: "https://images.unsplash.com/photo-1627257363565-4bc682c69e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwaG9tZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MzU2MTgwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    customerLabel: "Contact",
    customerLabelPlural: "Contacts",
    leadLabel: "Buyer Lead",
    saleLabel: "Closing",
    extraFields: ["Property Interest", "Budget Range", "Move-in Date"],
    extraModules: [
      { label: "Listings", path: "listings", icon: "building" },
      { label: "Showings", path: "showings", icon: "calendar" },
    ],
  },
  retail: {
    id: "retail",
    name: "Retail CRM",
    icon: ShoppingBag,
    color: "#9333ea",
    colorLight: "#f3e8ff",
    image: "https://images.unsplash.com/photo-1759153820384-12c9ddf8bd8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXRhaWwlMjBzdG9yZSUyMHNob3BwaW5nfGVufDF8fHx8MTc3MzYzMzkxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    customerLabel: "Customer",
    customerLabelPlural: "Customers",
    leadLabel: "Lead",
    saleLabel: "Order",
    extraFields: ["Loyalty Tier", "Preferred Category", "Last Visit"],
    extraModules: [
      { label: "Point of Sale", path: "pos", icon: "store" },
      { label: "Products", path: "products", icon: "package" },
      { label: "Inventory", path: "inventory", icon: "clipboard" },
      { label: "Loyalty", path: "loyalty", icon: "star" },
    ],
  },
  hospitality: {
    id: "hospitality",
    name: "Hospital/Clinic CRM",
    icon: Hospital,
    color: "#b45309",
    colorLight: "#fef3c7",
    image: "https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGNsaW5pYyUyMHJlY2VwdGlvbnxlbnwxfHx8fDE3NzM1NjU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customerLabel: "Patient",
    customerLabelPlural: "Patients",
    leadLabel: "Referral",
    saleLabel: "Appointment",
    extraFields: ["Medical Condition", "Appointment Date", "Attending Doctor"],
    extraModules: [
      { label: "Appointments", path: "appointments", icon: "calendar" },
      { label: "Medical Services", path: "services", icon: "stethoscope" },
    ],
  },
  flowershop: {
    id: "flowershop",
    name: "Flower Shop CRM",
    icon: Flower2,
    color: "#ff4e00",
    colorLight: "#fff0e6",
    image: "https://images.unsplash.com/photo-1694620133074-44180d9bd5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NzM1NjA4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    customerLabel: "Customer",
    customerLabelPlural: "Customers",
    leadLabel: "Lead",
    saleLabel: "Order",
    extraFields: ["Flower Preference", "Occasion", "Delivery Address"],
    extraModules: [
      { label: "Point of Sale", path: "pos", icon: "store" },
      { label: "Inventory", path: "inventory", icon: "clipboard" },
      { label: "Deliveries", path: "deliveries", icon: "truck" },
    ],
  },
};

function loadSubscriptions(): Subscription[] {
  try {
    const raw = localStorage.getItem("crm_subscriptions");
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function loadActiveSubId(): string {
  return localStorage.getItem("crm_active_sub") || "";
}

interface CrmContextType {
  subscriptions: Subscription[];
  activeSubscription: Subscription;
  setActiveSubscription: (id: string) => void;
  addSubscription: (sub: Omit<Subscription, "id" | "createdAt">) => Subscription;
  removeSubscription: (id: string) => void;
  config: CrmConfig;
  crmType: CrmType;
  hasMultipleSubscriptions: boolean;
}

// Default fallback for HMR / React Fast Refresh boundary transitions
const DEFAULT_SUBSCRIPTION: Subscription = {
  id: "",
  plan: "free" as PlanId,
  planName: "Free Trial",
  crmType: "flowershop" as CrmType,
  businessName: "",
  createdAt: "",
};

const DEFAULT_CRM_CONTEXT: CrmContextType = {
  subscriptions: [],
  activeSubscription: DEFAULT_SUBSCRIPTION,
  setActiveSubscription: () => {},
  addSubscription: () => DEFAULT_SUBSCRIPTION,
  removeSubscription: () => {},
  config: CRM_CONFIGS["flowershop"],
  crmType: "flowershop",
  hasMultipleSubscriptions: false,
};

const CrmCtx = createContext<CrmContextType>(DEFAULT_CRM_CONTEXT);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(loadSubscriptions);
  const [activeSubId, setActiveSubId] = useState<string>(loadActiveSubId);

  const activeSub = subscriptions.find((s) => s.id === activeSubId) || subscriptions[0];
  const crmType = activeSub?.crmType || "flowershop";
  const config = CRM_CONFIGS[crmType];

  // Provide a safe fallback subscription when none exist
  const safeActiveSub: Subscription = activeSub || {
    id: "",
    plan: "free" as PlanId,
    planName: "Free Trial",
    crmType: "flowershop" as CrmType,
    businessName: "",
    createdAt: "",
  };

  const setActiveSubscription = (id: string) => {
    setActiveSubId(id);
    localStorage.setItem("crm_active_sub", id);
  };

  const addSubscription = (sub: Omit<Subscription, "id" | "createdAt">): Subscription => {
    const newSub: Subscription = {
      ...sub,
      id: `sub_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    // Allow multiple subscriptions — append and set new one as active
    const updated = [...subscriptions, newSub];
    setSubscriptions(updated);
    localStorage.setItem("crm_subscriptions", JSON.stringify(updated));
    setActiveSubId(newSub.id);
    localStorage.setItem("crm_active_sub", newSub.id);
    return newSub;
  };

  const removeSubscription = (id: string) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
    localStorage.setItem("crm_subscriptions", JSON.stringify(updated));
    if (activeSubId === id && updated.length > 0) {
      setActiveSubId(updated[0].id);
      localStorage.setItem("crm_active_sub", updated[0].id);
    }
  };

  return (
    <CrmCtx.Provider
      value={{
        subscriptions,
        activeSubscription: safeActiveSub,
        setActiveSubscription,
        addSubscription,
        removeSubscription,
        config,
        crmType,
        hasMultipleSubscriptions: subscriptions.length > 1,
      }}
    >
      {children}
    </CrmCtx.Provider>
  );
}

export function useCrm() {
  return useContext(CrmCtx);
}