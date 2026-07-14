import { useState, useMemo } from "react";
import { useCrm } from "../CrmContext";
import {
  Package, Truck, CheckCircle2, AlertCircle, MapPin, Phone, Clock,
  X, ArrowUpDown, ChevronLeft, ChevronRight, StickyNote, User,
} from "lucide-react";

type DeliveryStatus = "Preparing" | "In Transit" | "Out for Delivery" | "Delivered" | "Failed";

interface TimelineStep {
  label: string;
  time: string | null; // null = pending
}

interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  phone: string;
  items: string;
  scheduledDate: string;
  scheduledTime: string;
  driver: string;
  status: DeliveryStatus;
  notes: string;
  timeline: TimelineStep[];
}

const STATUS_CONFIG: Record<DeliveryStatus, { bg: string; text: string; iconColor: string }> = {
  Preparing: { bg: "#f3e5f5", text: "#7b1fa2", iconColor: "#7b1fa2" },
  "In Transit": { bg: "#e3f2fd", text: "#1565c0", iconColor: "#1565c0" },
  "Out for Delivery": { bg: "#fff3e0", text: "#e65100", iconColor: "#e65100" },
  Delivered: { bg: "#e8f5e9", text: "#2e7d32", iconColor: "#2e7d32" },
  Failed: { bg: "#ffebee", text: "#c62828", iconColor: "#c62828" },
};

const INITIAL_DELIVERIES: Delivery[] = [
  {
    id: "DEL-001",
    orderId: "BP-260315195523",
    customer: "Maria Santos",
    address: "123 Ayala Ave, Makati City",
    phone: "+63 912 345 6789",
    items: "Red Rose Bouquet x1, Sunflower Bundle x1",
    scheduledDate: "Mar 15, 2026",
    scheduledTime: "07:55 PM",
    driver: "James Cruz",
    status: "Delivered",
    notes: "Handle with care, fragile vase included",
    timeline: [
      { label: "Order Placed", time: "7:55 PM" },
      { label: "Preparing Order", time: "7:55 PM" },
      { label: "Picked Up by Driver", time: "7:55 PM" },
      { label: "Out for Delivery", time: "7:56 PM" },
      { label: "Delivered", time: "7:56 PM" },
    ],
  },
  {
    id: "DEL-002",
    orderId: "BP-260315195530",
    customer: "Ana Reyes",
    address: "45 BGC Central, Taguig City",
    phone: "+63 917 888 9999",
    items: "Tulip Arrangement x1",
    scheduledDate: "Mar 15, 2026",
    scheduledTime: "08:30 PM",
    driver: "Unassigned",
    status: "Out for Delivery",
    notes: "Leave at reception desk if not available",
    timeline: [
      { label: "Order Placed", time: "7:55 PM" },
      { label: "Preparing Order", time: "8:00 PM" },
      { label: "Picked Up by Driver", time: "8:15 PM" },
      { label: "Out for Delivery", time: "8:20 PM" },
      { label: "Delivered", time: null },
    ],
  },
  {
    id: "DEL-003",
    orderId: "BP-260315195545",
    customer: "Mark Rivera",
    address: "78 Ortigas Center, Pasig City",
    phone: "+63 918 777 6666",
    items: "Wedding Bouquet x1",
    scheduledDate: "Mar 15, 2026",
    scheduledTime: "09:00 PM",
    driver: "Unassigned",
    status: "Preparing",
    notes: "",
    timeline: [
      { label: "Order Placed", time: "7:55 PM" },
      { label: "Preparing Order", time: null },
      { label: "Picked Up by Driver", time: null },
      { label: "Out for Delivery", time: null },
      { label: "Delivered", time: null },
    ],
  },
  {
    id: "DEL-004",
    orderId: "BP-260315195600",
    customer: "Grace Lim",
    address: "22 Eastwood Ave, Quezon City",
    phone: "+63 919 333 4444",
    items: "Birthday Bouquet x2, Gift Wrapping Set x1",
    scheduledDate: "Mar 16, 2026",
    scheduledTime: "10:00 AM",
    driver: "Paolo Santos",
    status: "In Transit",
    notes: "Call customer before delivery",
    timeline: [
      { label: "Order Placed", time: "9:30 AM" },
      { label: "Preparing Order", time: "9:45 AM" },
      { label: "Picked Up by Driver", time: "10:00 AM" },
      { label: "Out for Delivery", time: null },
      { label: "Delivered", time: null },
    ],
  },
  {
    id: "DEL-005",
    orderId: "BP-260315195615",
    customer: "Carlo Mendoza",
    address: "15 Greenhills, San Juan",
    phone: "+63 920 555 7777",
    items: "Orchid Plant x1",
    scheduledDate: "Mar 14, 2026",
    scheduledTime: "02:00 PM",
    driver: "James Cruz",
    status: "Failed",
    notes: "Customer was not available, attempted 3 times",
    timeline: [
      { label: "Order Placed", time: "1:00 PM" },
      { label: "Preparing Order", time: "1:15 PM" },
      { label: "Picked Up by Driver", time: "1:30 PM" },
      { label: "Out for Delivery", time: "1:45 PM" },
      { label: "Delivered", time: null },
    ],
  },
];

const ALL_STATUSES: DeliveryStatus[] = ["Preparing", "In Transit", "Out for Delivery", "Delivered", "Failed"];

function StatusIcon({ status, size = 12 }: { status: DeliveryStatus; size?: number }) {
  const c = STATUS_CONFIG[status].iconColor;
  switch (status) {
    case "Preparing":
      return <Package size={size} style={{ color: c }} />;
    case "In Transit":
      return <Truck size={size} style={{ color: c }} />;
    case "Out for Delivery":
      return <Truck size={size} style={{ color: c }} />;
    case "Delivered":
      return <CheckCircle2 size={size} style={{ color: c }} />;
    case "Failed":
      return <AlertCircle size={size} style={{ color: c }} />;
  }
}

export function DeliveriesPage() {
  const { config } = useCrm();
  const color = config.color;

  const [deliveries, setDeliveries] = useState<Delivery[]>(INITIAL_DELIVERIES);
  const [filter, setFilter] = useState<DeliveryStatus | "All">("All");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [updateModal, setUpdateModal] = useState<Delivery | null>(null);
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 8;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: deliveries.length };
    ALL_STATUSES.forEach((s) => { counts[s] = deliveries.filter((d) => d.status === s).length; });
    return counts;
  }, [deliveries]);

  const filtered = useMemo(() => {
    if (filter === "All") return deliveries;
    return deliveries.filter((d) => d.status === filter);
  }, [deliveries, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleUpdateStatus = (deliveryId: string, newStatus: DeliveryStatus) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id !== deliveryId) return d;
        const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
        const stepMap: Record<DeliveryStatus, number> = {
          "Preparing": 1,
          "In Transit": 2,
          "Out for Delivery": 3,
          "Delivered": 4,
          "Failed": 4,
        };
        const stepIdx = stepMap[newStatus];
        const updatedTimeline = d.timeline.map((step, i) => {
          if (i <= stepIdx && !step.time) return { ...step, time: now };
          return step;
        });
        return { ...d, status: newStatus, timeline: updatedTimeline };
      })
    );
    setUpdateModal(null);
    // Refresh selected delivery if open
    if (selectedDelivery?.id === deliveryId) {
      const updated = deliveries.find((d) => d.id === deliveryId);
      if (updated) {
        const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
        const stepMap: Record<DeliveryStatus, number> = {
          "Preparing": 1, "In Transit": 2, "Out for Delivery": 3, "Delivered": 4, "Failed": 4,
        };
        const stepIdx = stepMap[newStatus];
        const updatedTimeline = updated.timeline.map((step, i) => {
          if (i <= stepIdx && !step.time) return { ...step, time: now };
          return step;
        });
        setSelectedDelivery({ ...updated, status: newStatus, timeline: updatedTimeline });
      }
    }
  };

  const getNextStatus = (current: DeliveryStatus): DeliveryStatus | null => {
    const flow: DeliveryStatus[] = ["Preparing", "In Transit", "Out for Delivery", "Delivered"];
    const idx = flow.indexOf(current);
    if (idx >= 0 && idx < flow.length - 1) return flow[idx + 1];
    return null;
  };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-5 font-['Inter',sans-serif]">
      {/* Title */}
      <h1 className="text-[29px] font-medium tracking-[-0.58px] mb-5" style={{ color }}>
        Delivery Monitoring
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {([
          { key: "Preparing", label: "Preparing", valueColor: "#7b1fa2" },
          { key: "In Transit", label: "In Transit", valueColor: "#1565c0" },
          { key: "Out for Delivery", label: "Out for Delivery", valueColor: "#e65100" },
          { key: "Delivered", label: "Delivered", valueColor: "#2e7d32" },
          { key: "Failed", label: "Failed", valueColor: "#c62828" },
        ] as const).map((card) => (
          <div key={card.key} className="bg-white rounded-[12px] border border-[#e9e9e9] pt-[12px] pb-[8px] px-[12px]">
            <div className="flex items-center gap-1.5 mb-1">
              <StatusIcon status={card.key} size={14} />
              <p className="text-[#5d5d5d] text-[11px]">{card.label}</p>
            </div>
            <p className="text-[22px] font-semibold" style={{ color: card.valueColor }}>
              {statusCounts[card.key] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {(["All", ...ALL_STATUSES] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setFilter(tab); setPage(1); }}
            className={`h-[30px] px-4 rounded-full text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
              filter === tab
                ? "text-white"
                : "bg-white text-[#5d5d5d] border border-[#d8d8d8] hover:border-[#bbb]"
            }`}
            style={filter === tab ? { backgroundColor: color } : {}}
          >
            {tab} ({statusCounts[tab] || 0})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] border border-[#c3c3c3] overflow-x-auto relative">
        {/* Header */}
        <div
          className="grid border-b border-[#c3c3c3] min-w-[900px]"
          style={{ gridTemplateColumns: "120px 1fr 1fr 150px 120px 155px 155px" }}
        >
          {["Delivery ID", "Customer", "Items", "Scheduled", "Driver", "Status", "Actions"].map((h, i) => (
            <div key={h} className={`px-5 py-4 text-[12px] font-medium flex items-center gap-1 ${i === 6 ? "justify-end" : ""}`} style={{ color }}>
              {h}
              {i < 6 && <ArrowUpDown size={11} className="opacity-30" />}
            </div>
          ))}
        </div>

        {/* Body */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#9a9a9a]">
            <Truck size={36} className="mb-2 opacity-40" />
            <p className="text-[13px]">No deliveries found</p>
          </div>
        ) : (
          paginated.map((del, idx) => {
            const sc = STATUS_CONFIG[del.status];
            const next = getNextStatus(del.status);
            return (
              <div
                key={del.id}
                className="grid items-center border-b border-[#f0f0f0] last:border-b-0 min-w-[900px]"
                style={{
                  gridTemplateColumns: "120px 1fr 1fr 150px 120px 155px 155px",
                  backgroundColor: idx % 2 === 0 ? "#f6f6f6" : "#fff",
                }}
              >
                <p className="px-5 py-5 text-[#5d5d5d] text-[13px]">{del.id}</p>
                <p className="px-5 py-5 text-[#5d5d5d] text-[13px] whitespace-nowrap truncate">{del.customer}</p>
                <p className="px-5 py-5 text-[#5d5d5d] text-[13px] truncate">{del.items}</p>
                <div className="px-5 py-3">
                  <p className="text-[#5d5d5d] text-[13px]">{del.scheduledDate}</p>
                  <p className="text-[#999] text-[11px]">{del.scheduledTime}</p>
                </div>
                <p className="px-5 py-5 text-[#5d5d5d] text-[13px] truncate">{del.driver}</p>
                {/* Status Badge */}
                <div className="px-5 py-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    <StatusIcon status={del.status} size={11} />
                    {del.status}
                  </span>
                </div>
                {/* Actions */}
                <div className="px-5 py-5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedDelivery(del)}
                    className="h-[30px] px-3.5 rounded-[5px] border text-[12px] font-semibold cursor-pointer hover:opacity-80"
                    style={{ borderColor: color, color }}
                  >
                    Track
                  </button>
                  {next && (
                    <button
                      onClick={() => setUpdateModal(del)}
                      className="h-[28px] px-3 rounded-[5px] text-white text-[12px] font-semibold cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: color }}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-[12px] text-[#9a9a9a]">
            Showing {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-[#e0e0e0] flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <ChevronLeft size={16} className="text-[#5d5d5d]" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
                  p === page ? "text-white" : "text-[#5d5d5d] border border-[#e0e0e0] hover:bg-[#f5f5f5]"
                }`}
                style={p === page ? { backgroundColor: color } : {}}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-[#e0e0e0] flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <ChevronRight size={16} className="text-[#5d5d5d]" />
            </button>
          </div>
        </div>
      )}

      {/* Track Delivery Drawer */}
      {selectedDelivery && (
        <TrackDrawer
          delivery={selectedDelivery}
          color={color}
          onClose={() => setSelectedDelivery(null)}
        />
      )}

      {/* Update Status Modal */}
      {updateModal && (
        <UpdateStatusModal
          delivery={updateModal}
          color={color}
          onUpdate={handleUpdateStatus}
          onClose={() => setUpdateModal(null)}
        />
      )}
    </div>
  );
}

/* ──────────────────────────── Track Drawer ──────────────────────────── */

function TrackDrawer({
  delivery,
  color,
  onClose,
}: {
  delivery: Delivery;
  color: string;
  onClose: () => void;
}) {
  const sc = STATUS_CONFIG[delivery.status];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[18px] shadow-2xl z-50 w-[calc(100%-2rem)] max-w-[480px] max-h-[85vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 pt-5 pb-3 border-b border-[#f0f0f0]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-semibold" style={{ color }}>{delivery.id}</h2>
              <p className="text-[#9a9a9a] text-[13px]">Order: {delivery.orderId}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
            >
              <X size={20} className="text-[#9a9a9a]" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Status Badge */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium"
            style={{ backgroundColor: sc.bg, color: sc.text }}
          >
            <StatusIcon status={delivery.status} size={14} />
            {delivery.status}
          </span>

          {/* Customer Info */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0" style={{ color }} />
              <div>
                <p className="text-[#383838] text-[14px] font-medium">{delivery.customer}</p>
                <p className="text-[#9a9a9a] text-[13px]">{delivery.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0" style={{ color }} />
              <p className="text-[#5d5d5d] text-[13px]">{delivery.phone || "—"}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={15} className="shrink-0" style={{ color }} />
              <p className="text-[#5d5d5d] text-[13px]">{delivery.scheduledDate} at {delivery.scheduledTime}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck size={15} className="shrink-0" style={{ color }} />
              <p className="text-[#5d5d5d] text-[13px]">Driver: <span className="font-medium text-[#383838]">{delivery.driver}</span></p>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-[12px] border border-[#e9e9e9] p-4">
            <p className="text-[12px] font-medium mb-1" style={{ color }}>Items</p>
            <p className="text-[#383838] text-[14px]">{delivery.items}</p>
          </div>

          {/* Delivery Notes */}
          {delivery.notes && (
            <div className="rounded-[12px] border border-[#e9e9e9] p-4">
              <p className="text-[12px] font-medium mb-1" style={{ color }}>Delivery Notes</p>
              <p className="text-[#383838] text-[14px]">{delivery.notes}</p>
            </div>
          )}

          {/* Delivery Timeline */}
          <div>
            <h3 className="text-[#383838] text-[15px] font-semibold mb-4">Delivery Timeline</h3>
            <div className="space-y-0">
              {delivery.timeline.map((step, i) => {
                const isCompleted = step.time !== null;
                const isLast = i === delivery.timeline.length - 1;
                return (
                  <div key={i} className="flex items-start gap-3">
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-[10px] h-[10px] rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: isCompleted ? color : "#e0e0e0" }}
                      />
                      {!isLast && (
                        <div
                          className="w-[2px] min-h-[28px] flex-1"
                          style={{ backgroundColor: isCompleted ? color : "#e0e0e0" }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-3 ${isLast ? "" : ""}`}>
                      <p className={`text-[13px] ${isCompleted ? "font-semibold text-[#383838]" : "text-[#bbb]"}`}>
                        {step.label}
                      </p>
                      <p className={`text-[12px] ${isCompleted ? "text-[#9a9a9a]" : "text-[#d0d0d0] italic"}`}>
                        {step.time || "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────── Update Status Modal ──────────────────────────── */

function UpdateStatusModal({
  delivery,
  color,
  onUpdate,
  onClose,
}: {
  delivery: Delivery;
  color: string;
  onUpdate: (id: string, status: DeliveryStatus) => void;
  onClose: () => void;
}) {
  const flow: DeliveryStatus[] = ["Preparing", "In Transit", "Out for Delivery", "Delivered"];
  const currentIdx = flow.indexOf(delivery.status);
  const availableNext = currentIdx >= 0 ? flow.slice(currentIdx + 1) : [];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] shadow-2xl p-6 z-50 w-[calc(100%-2rem)] max-w-[400px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#383838] text-[17px] font-semibold">Update Delivery Status</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
          >
            <X size={18} className="text-[#9a9a9a]" />
          </button>
        </div>

        <div className="bg-[#f8f8f8] rounded-[12px] p-3 mb-5">
          <p className="text-[#383838] text-[14px] font-medium">{delivery.id}</p>
          <p className="text-[#9a9a9a] text-[12px]">{delivery.customer} • {delivery.items}</p>
        </div>

        <p className="text-[#5d5d5d] text-[13px] mb-3">
          Current status: <span className="font-semibold" style={{ color: STATUS_CONFIG[delivery.status].text }}>{delivery.status}</span>
        </p>

        <p className="text-[#383838] text-[13px] font-medium mb-2">Move to:</p>
        <div className="space-y-2 mb-5">
          {availableNext.map((status) => {
            const sc = STATUS_CONFIG[status];
            return (
              <button
                key={status}
                onClick={() => onUpdate(delivery.id, status)}
                className="w-full h-[42px] rounded-[10px] border border-[#e0e0e0] text-[14px] font-medium flex items-center gap-2.5 px-4 cursor-pointer hover:border-[#bbb] transition-colors text-left"
              >
                <StatusIcon status={status} size={16} />
                <span style={{ color: sc.text }}>{status}</span>
              </button>
            );
          })}
          {delivery.status !== "Failed" && delivery.status !== "Delivered" && (
            <button
              onClick={() => onUpdate(delivery.id, "Failed")}
              className="w-full h-[42px] rounded-[10px] border border-[#ffcdd2] text-[14px] font-medium flex items-center gap-2.5 px-4 cursor-pointer hover:bg-[#fff5f5] transition-colors text-left"
            >
              <AlertCircle size={16} className="text-[#c62828]" />
              <span className="text-[#c62828]">Mark as Failed</span>
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full h-[38px] rounded-[10px] border border-[#e0e0e0] text-[13px] font-medium text-[#5d5d5d] cursor-pointer hover:bg-[#f5f5f5]"
        >
          Cancel
        </button>
      </div>
    </>
  );
}