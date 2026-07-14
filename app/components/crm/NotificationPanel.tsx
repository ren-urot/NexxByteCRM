import { useState } from "react";
import { useNotifications, type Notification } from "./NotificationContext";
import {
  Bell, BellOff, X, Check, CheckCheck, Trash2, Info, AlertTriangle,
  CheckCircle2, XCircle, Clock, ChevronDown,
} from "lucide-react";

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const typeConfig: Record<Notification["type"], { icon: typeof Info; bg: string; iconColor: string; dotColor: string }> = {
  info: { icon: Info, bg: "#e3f2fd", iconColor: "#1565c0", dotColor: "#1565c0" },
  warning: { icon: AlertTriangle, bg: "#fff3e0", iconColor: "#e65100", dotColor: "#e65100" },
  success: { icon: CheckCircle2, bg: "#e8f5e9", iconColor: "#2e7d32", dotColor: "#2e7d32" },
  error: { icon: XCircle, bg: "#ffebee", iconColor: "#c62828", dotColor: "#c62828" },
};

type FilterTab = "all" | "unread";

export function NotificationPanel({ color, onClose }: { color: string; onClose: () => void }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotifications();
  const [filter, setFilter] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const groupByTime = (items: Notification[]) => {
    const now = new Date();
    const today: Notification[] = [];
    const earlier: Notification[] = [];
    items.forEach((n) => {
      const diffHrs = (now.getTime() - n.timestamp.getTime()) / 3600000;
      if (diffHrs < 24) today.push(n);
      else earlier.push(n);
    });
    return { today, earlier };
  };

  const { today, earlier } = groupByTime(displayed);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-[16px] shadow-2xl border border-[#e4e4e4] z-50 flex flex-col max-h-[520px] overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#eee] shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#383838]">Notifications</h3>
              {unreadCount > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-white text-[11px] font-semibold"
                  style={{ backgroundColor: color }}
                >
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <CheckCheck size={16} className="text-[#9a9a9a]" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  title="Clear all"
                  className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Trash2 size={15} className="text-[#9a9a9a]" />
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} className="text-[#9a9a9a]" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-[#f3f3f3] rounded-[8px] p-[3px]">
            {(["all", "unread"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 h-[30px] rounded-[6px] text-[12px] font-medium transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-white shadow-sm text-[#383838]"
                    : "text-[#9a9a9a] hover:text-[#666]"
                }`}
              >
                {tab === "all" ? `All (${notifications.length})` : `Unread (${unreadCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-auto relative min-h-0">
          {displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-3">
                {filter === "unread" ? (
                  <CheckCheck size={24} className="text-[#c0c0c0]" />
                ) : (
                  <BellOff size={24} className="text-[#c0c0c0]" />
                )}
              </div>
              <p className="text-[#9a9a9a] text-[14px] font-medium">
                {filter === "unread" ? "All caught up!" : "No notifications"}
              </p>
              <p className="text-[#c0c0c0] text-[12px] mt-1">
                {filter === "unread"
                  ? "You've read all your notifications"
                  : "Notifications will appear here"
                }
              </p>
            </div>
          ) : (
            <>
              {/* Today */}
              {today.length > 0 && (
                <div>
                  <div className="px-5 pt-3 pb-1.5">
                    <p className="text-[11px] font-semibold text-[#b0b0b0] uppercase tracking-wider">Today</p>
                  </div>
                  {today.map((n) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      color={color}
                      expanded={expandedId === n.id}
                      onToggle={() => setExpandedId(expandedId === n.id ? null : n.id)}
                      onMarkRead={() => markAsRead(n.id)}
                      onRemove={() => removeNotification(n.id)}
                    />
                  ))}
                </div>
              )}
              {/* Earlier */}
              {earlier.length > 0 && (
                <div>
                  <div className="px-5 pt-3 pb-1.5">
                    <p className="text-[11px] font-semibold text-[#b0b0b0] uppercase tracking-wider">Earlier</p>
                  </div>
                  {earlier.map((n) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      color={color}
                      expanded={expandedId === n.id}
                      onToggle={() => setExpandedId(expandedId === n.id ? null : n.id)}
                      onMarkRead={() => markAsRead(n.id)}
                      onRemove={() => removeNotification(n.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function NotificationRow({
  notification: n,
  color,
  expanded,
  onToggle,
  onMarkRead,
  onRemove,
}: {
  notification: Notification;
  color: string;
  expanded: boolean;
  onToggle: () => void;
  onMarkRead: () => void;
  onRemove: () => void;
}) {
  const cfg = typeConfig[n.type];
  const Icon = cfg.icon;

  const handleClick = () => {
    if (!n.read) onMarkRead();
    onToggle();
  };

  return (
    <div
      className={`group px-5 py-3 cursor-pointer transition-colors border-b border-[#f5f5f5] last:border-b-0 ${
        !n.read ? "bg-[#fafcff]" : "hover:bg-[#fafafa]"
      }`}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: cfg.bg }}
        >
          <Icon size={16} style={{ color: cfg.iconColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-[13px] text-[#383838] leading-[18px] ${!n.read ? "font-semibold" : "font-medium"}`}>
              {n.title}
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              {!n.read && (
                <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ backgroundColor: color }} />
              )}
            </div>
          </div>

          <p className={`text-[12px] text-[#7a7a7a] leading-[17px] mt-0.5 ${expanded ? "" : "line-clamp-1"}`}>
            {n.message}
          </p>

          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1 text-[#b0b0b0]">
              <Clock size={11} />
              <span className="text-[11px]">{timeAgo(n.timestamp)}</span>
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {!n.read && (
                <button
                  onClick={(e) => { e.stopPropagation(); onMarkRead(); }}
                  title="Mark as read"
                  className="w-6 h-6 rounded-md hover:bg-[#e8e8e8] flex items-center justify-center cursor-pointer"
                >
                  <Check size={13} className="text-[#9a9a9a]" />
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                title="Remove"
                className="w-6 h-6 rounded-md hover:bg-[#ffebee] flex items-center justify-center cursor-pointer"
              >
                <X size={13} className="text-[#c0c0c0] hover:text-[#c62828]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}