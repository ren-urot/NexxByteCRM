import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CrmType } from "./CrmContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  timestamp: Date;
  icon?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
  addNotification: (n: Omit<Notification, "id" | "read" | "timestamp">) => void;
}

const DEFAULT_NOTIFICATION_CONTEXT: NotificationContextType = {
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
  removeNotification: () => {},
  addNotification: () => {},
};

const NotificationContext = createContext<NotificationContextType>(DEFAULT_NOTIFICATION_CONTEXT);

function generateNotifications(crmType: CrmType): Notification[] {
  const now = new Date();
  const minutesAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000);
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600 * 1000);
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400 * 1000);

  const common: Notification[] = [
    {
      id: "sys1",
      title: "System Update",
      message: "CRM Platform v2.4.1 has been deployed with performance improvements.",
      type: "info",
      read: true,
      timestamp: daysAgo(2),
    },
  ];

  const byType: Record<CrmType, Notification[]> = {
    finance: [
      { id: "f1", title: "New Lead Assigned", message: "Maria Santos submitted a loan inquiry worth P850,000. Review and follow up.", type: "info", read: false, timestamp: minutesAgo(12) },
      { id: "f2", title: "Payment Received", message: "Client Juan Reyes completed payment of P45,000 for Policy #FIN-2024-0891.", type: "success", read: false, timestamp: minutesAgo(47) },
      { id: "f3", title: "Overdue Invoice", message: "Invoice #INV-3042 for Roberto Cruz is 7 days overdue. Total: P120,000.", type: "error", read: false, timestamp: hoursAgo(3) },
      { id: "f4", title: "Monthly Target Update", message: "You've reached 78% of your March sales target. P1.2M remaining.", type: "warning", read: true, timestamp: hoursAgo(6) },
      { id: "f5", title: "Client Meeting Reminder", message: "Meeting with Ana Lim scheduled tomorrow at 2:00 PM for portfolio review.", type: "info", read: true, timestamp: daysAgo(1) },
    ],
    realestate: [
      { id: "r1", title: "New Property Inquiry", message: "Carlos Tan is interested in Lot 24, Phase 3 — Greenfield Estates (P4.2M).", type: "info", read: false, timestamp: minutesAgo(8) },
      { id: "r2", title: "Viewing Scheduled", message: "Site viewing for Unit 12B, Azure Tower confirmed for Mar 16 at 10:00 AM.", type: "success", read: false, timestamp: minutesAgo(35) },
      { id: "r3", title: "Contract Expiring", message: "Lease agreement for Tenant Reyes at Unit 5A expires in 5 days. Send renewal.", type: "warning", read: false, timestamp: hoursAgo(2) },
      { id: "r4", title: "Commission Released", message: "Your commission of P185,000 for Lot 18 sale has been approved for payout.", type: "success", read: true, timestamp: hoursAgo(8) },
      { id: "r5", title: "Price Adjustment", message: "Sunset Villas Phase 2 prices updated. New starting price: P3.8M.", type: "info", read: true, timestamp: daysAgo(1) },
    ],
    retail: [
      { id: "rt1", title: "Low Stock Alert", message: "Smart Watch (SKU: SKU106) is down to 7 units. Consider restocking soon.", type: "warning", read: false, timestamp: minutesAgo(15) },
      { id: "rt2", title: "New Order Completed", message: "POS Transaction #TXN-4821 completed — P8,498 via GCash. 3 items sold.", type: "success", read: false, timestamp: minutesAgo(42) },
      { id: "rt3", title: "Out of Stock", message: "Designer Sunglasses (SKU: SKU105) is now out of stock. 2 customers inquired today.", type: "error", read: false, timestamp: hoursAgo(1) },
      { id: "rt4", title: "Delivery Update", message: "Order #DEL-2089 has been delivered to customer Elena Ramos successfully.", type: "success", read: true, timestamp: hoursAgo(5) },
      { id: "rt5", title: "Daily Sales Summary", message: "Yesterday's total: P24,350 across 18 transactions. Top item: Wireless Headphones.", type: "info", read: true, timestamp: daysAgo(1) },
    ],
    hospitality: [
      { id: "h1", title: "New Appointment", message: "Patient Lisa Gomez booked a dental checkup for Mar 17 at 9:30 AM.", type: "info", read: false, timestamp: minutesAgo(20) },
      { id: "h2", title: "Lab Results Ready", message: "Blood test results for Patient #PAT-1205 (Mark Rivera) are now available.", type: "success", read: false, timestamp: minutesAgo(55) },
      { id: "h3", title: "Missed Appointment", message: "Patient Carlos Sy missed their 3:00 PM consultation. Reschedule needed.", type: "warning", read: false, timestamp: hoursAgo(2) },
      { id: "h4", title: "Prescription Reminder", message: "Patient Ana Cruz's prescription renewal is due in 3 days. Notify patient.", type: "info", read: true, timestamp: hoursAgo(7) },
      { id: "h5", title: "Billing Processed", message: "Invoice #MED-0847 for P12,500 has been sent to patient Grace Tan.", type: "success", read: true, timestamp: daysAgo(1) },
    ],
    flowershop: [
      { id: "fl1", title: "Low Stock Alert", message: "Pink Tulip Bouquet (SKU: SKU008) is down to 5 stems. Reorder recommended.", type: "warning", read: false, timestamp: minutesAgo(10) },
      { id: "fl2", title: "New Order", message: "Walk-in order #POS-3241 completed — P3,500 (Red Rose Bouquet x2, Gift Wrap). Paid via Cash.", type: "success", read: false, timestamp: minutesAgo(30) },
      { id: "fl3", title: "Delivery Failed", message: "Order #DEL-1078 to Julia Santos could not be delivered. Address not found.", type: "error", read: false, timestamp: hoursAgo(1) },
      { id: "fl4", title: "Arrangement Request", message: "Custom wedding arrangement request from client Reyes for Mar 22. Budget: P15,000.", type: "info", read: true, timestamp: hoursAgo(4) },
      { id: "fl5", title: "Supplier Update", message: "Fresh rose shipment arriving tomorrow at 7:00 AM. 200 stems (red, pink, white).", type: "info", read: true, timestamp: daysAgo(1) },
    ],
  };

  return [...(byType[crmType] || []), ...common];
}

export function NotificationProvider({ children, crmType }: { children: ReactNode; crmType: CrmType }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => generateNotifications(crmType));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((n: Omit<Notification, "id" | "read" | "timestamp">) => {
    setNotifications((prev) => [
      { ...n, id: `notif_${Date.now()}`, read: false, timestamp: new Date() },
      ...prev,
    ]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}