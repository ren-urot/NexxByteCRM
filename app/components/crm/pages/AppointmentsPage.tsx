import { useState } from "react";
import { useCrm } from "../CrmContext";
import {
  ChevronLeft, ChevronRight, Plus, Clock, User, X, Check,
  CalendarDays, Stethoscope,
} from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  notes: string;
}

const DOCTORS = ["Dr. Reyes", "Dr. Tan", "Dr. Cruz", "Dr. Santos"];
const SERVICES = ["General Checkup", "Dental Cleaning", "Lab Work", "Physical Therapy", "X-Ray", "Consultation", "Follow-up"];
const TIME_SLOTS = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-[#e6f9e6] text-[#1a8a1a] border-[#1a8a1a]",
  Pending: "bg-[#fff3e0] text-[#e68a00] border-[#e68a00]",
  Cancelled: "bg-[#fee] text-[#e53e00] border-[#e53e00]",
  Completed: "bg-[#f0f0f0] text-[#666] border-[#666]",
};

const statusDotColors: Record<string, string> = {
  Confirmed: "#1a8a1a",
  Pending: "#e68a00",
  Cancelled: "#e53e00",
  Completed: "#666",
};

const initialAppointments: Appointment[] = [
  { id: "APT-001", patient: "Maria Santos", doctor: "Dr. Reyes", service: "General Checkup", date: "2026-03-15", time: "9:00 AM", duration: "30 min", status: "Completed", notes: "Follow-up in 2 weeks" },
  { id: "APT-002", patient: "Ana Reyes", doctor: "Dr. Tan", service: "Dental Cleaning", date: "2026-03-15", time: "10:30 AM", duration: "45 min", status: "Completed", notes: "" },
  { id: "APT-003", patient: "Carlo Mendoza", doctor: "Dr. Reyes", service: "Follow-up", date: "2026-03-16", time: "2:00 PM", duration: "30 min", status: "Confirmed", notes: "Blood pressure monitoring" },
  { id: "APT-004", patient: "Lisa Tan", doctor: "Dr. Cruz", service: "Lab Work", date: "2026-03-16", time: "8:00 AM", duration: "15 min", status: "Confirmed", notes: "Fasting required" },
  { id: "APT-005", patient: "Mark Rivera", doctor: "Dr. Tan", service: "Consultation", date: "2026-03-17", time: "3:30 PM", duration: "30 min", status: "Pending", notes: "" },
  { id: "APT-006", patient: "Sofia Garcia", doctor: "Dr. Santos", service: "Physical Therapy", date: "2026-03-17", time: "9:00 AM", duration: "60 min", status: "Confirmed", notes: "Session 3 of 10" },
  { id: "APT-007", patient: "David Chen", doctor: "Dr. Cruz", service: "X-Ray", date: "2026-03-18", time: "10:00 AM", duration: "20 min", status: "Confirmed", notes: "Left knee" },
  { id: "APT-008", patient: "Elena Marcos", doctor: "Dr. Reyes", service: "General Checkup", date: "2026-03-18", time: "11:00 AM", duration: "30 min", status: "Pending", notes: "" },
  { id: "APT-009", patient: "Roberto Villa", doctor: "Dr. Tan", service: "Dental Cleaning", date: "2026-03-19", time: "9:30 AM", duration: "45 min", status: "Confirmed", notes: "" },
  { id: "APT-010", patient: "Patricia Lim", doctor: "Dr. Santos", service: "Physical Therapy", date: "2026-03-19", time: "2:00 PM", duration: "60 min", status: "Pending", notes: "Session 7 of 10" },
  { id: "APT-011", patient: "Maria Santos", doctor: "Dr. Reyes", service: "Follow-up", date: "2026-03-20", time: "9:00 AM", duration: "30 min", status: "Confirmed", notes: "" },
  { id: "APT-012", patient: "Juan Dela Cruz", doctor: "Dr. Cruz", service: "Lab Work", date: "2026-03-20", time: "8:30 AM", duration: "15 min", status: "Confirmed", notes: "Lipid panel" },
  { id: "APT-013", patient: "Ana Reyes", doctor: "Dr. Santos", service: "Consultation", date: "2026-03-21", time: "1:00 PM", duration: "30 min", status: "Pending", notes: "" },
  { id: "APT-014", patient: "Carlo Mendoza", doctor: "Dr. Reyes", service: "General Checkup", date: "2026-03-22", time: "10:00 AM", duration: "30 min", status: "Confirmed", notes: "" },
  { id: "APT-015", patient: "Lisa Tan", doctor: "Dr. Tan", service: "Dental Cleaning", date: "2026-03-23", time: "2:30 PM", duration: "45 min", status: "Pending", notes: "" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AppointmentsPage() {
  const { config } = useCrm();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-03-15");
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    patient: "", doctor: DOCTORS[0], service: SERVICES[0], date: "", time: TIME_SLOTS[0], duration: "30 min", notes: "",
  });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getAppointmentsForDate = (dateStr: string) => {
    return appointments.filter((a) => a.date === dateStr);
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const allAppointments = appointments
    .filter((a) => a.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const todayStr = "2026-03-15";

  // Stats
  const monthAppts = allAppointments;
  const confirmed = monthAppts.filter((a) => a.status === "Confirmed").length;
  const pending = monthAppts.filter((a) => a.status === "Pending").length;
  const completed = monthAppts.filter((a) => a.status === "Completed").length;

  const handleAddAppointment = () => {
    if (!newAppt.patient || !newAppt.date) return;
    const appt: Appointment = {
      id: `APT-${String(appointments.length + 1).padStart(3, "0")}`,
      patient: newAppt.patient,
      doctor: newAppt.doctor,
      service: newAppt.service,
      date: newAppt.date,
      time: newAppt.time,
      duration: newAppt.duration,
      status: "Pending",
      notes: newAppt.notes,
    };
    setAppointments([...appointments, appt]);
    setShowAddModal(false);
    setNewAppt({ patient: "", doctor: DOCTORS[0], service: SERVICES[0], date: "", time: TIME_SLOTS[0], duration: "30 min", notes: "" });
  };

  const updateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-semibold" style={{ color: config.color }}>Appointments</h1>
          <p className="text-[#9a9a9a] text-[14px] mt-0.5">Manage patient appointments and schedules</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#f0f0f0] rounded-[10px] p-1">
            <button onClick={() => setView("calendar")} className={`px-3 py-1.5 rounded-[8px] text-[13px] font-medium cursor-pointer flex items-center gap-1.5 ${view === "calendar" ? "bg-white shadow-sm text-[#383838]" : "text-[#9a9a9a]"}`}>
              <CalendarDays size={14} /> Calendar
            </button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-[8px] text-[13px] font-medium cursor-pointer flex items-center gap-1.5 ${view === "list" ? "bg-white shadow-sm text-[#383838]" : "text-[#9a9a9a]"}`}>
              <Stethoscope size={14} /> List
            </button>
          </div>
          <button
            onClick={() => { setShowAddModal(true); setNewAppt((p) => ({ ...p, date: selectedDate || todayStr })); }}
            className="h-[40px] px-5 text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: config.color }}
          >
            <Plus size={16} /> New Appointment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total This Month", value: monthAppts.length, color: config.color },
          { label: "Confirmed", value: confirmed, color: "#1a8a1a" },
          { label: "Pending", value: pending, color: "#e68a00" },
          { label: "Completed", value: completed, color: "#666" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[14px] border border-[#e8e8e8] p-4">
            <p className="text-[#9a9a9a] text-[12px] font-medium mb-1">{s.label}</p>
            <p className="text-[24px] font-semibold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {view === "calendar" ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar Grid */}
          <div className="flex-1 bg-white rounded-[16px] border border-[#e8e8e8] p-5">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer">
                <ChevronLeft size={18} className="text-[#5d5d5d]" />
              </button>
              <h2 className="text-[18px] font-semibold text-[#383838]">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer">
                <ChevronRight size={18} className="text-[#5d5d5d]" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map((d) => (
                <div key={d} className="text-center text-[12px] text-[#9a9a9a] font-medium py-2">{d}</div>
              ))}
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-[80px] border border-[#e8e8e8] rounded-[6px]" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(day);
                const dayAppts = getAppointmentsForDate(dateStr);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-[80px] rounded-[6px] p-1.5 text-left transition-all cursor-pointer border flex flex-col ${
                      isSelected
                        ? "border-current shadow-sm"
                        : isToday
                        ? "border-[#e8e8e8] bg-[#fffbf0]"
                        : "border-[#e8e8e8] hover:bg-[#f9f9f9]"
                    }`}
                    style={isSelected ? { borderColor: config.color, backgroundColor: config.colorLight } : {}}
                  >
                    <span className={`text-[13px] font-medium ${
                      isSelected ? "" : isToday ? "text-[#383838]" : "text-[#5d5d5d]"
                    }`} style={isSelected ? { color: config.color } : {}}>
                      {day}
                    </span>
                    <div className="flex-1 mt-1 space-y-0.5 overflow-hidden">
                      {dayAppts.slice(0, 2).map((a) => (
                        <div key={a.id} className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: statusDotColors[a.status] }} />
                          <span className="text-[10px] text-[#5d5d5d] truncate">{a.time.replace(":00", "")}</span>
                        </div>
                      ))}
                      {dayAppts.length > 2 && (
                        <span className="text-[10px] font-medium" style={{ color: config.color }}>+{dayAppts.length - 2} more</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Selected Day Details */}
          <div className="w-full lg:w-[340px] bg-white rounded-[16px] border border-[#e8e8e8] p-5 flex flex-col lg:max-h-[680px]">
            <h3 className="text-[16px] font-semibold text-[#383838] mb-1">
              {selectedDate
                ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                : "Select a Date"}
            </h3>
            <p className="text-[#9a9a9a] text-[13px] mb-4">
              {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? "s" : ""}
            </p>

            <div className="flex-1 overflow-auto relative space-y-3">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-10">
                  <CalendarDays size={36} className="text-[#d0d0d0] mx-auto mb-3" />
                  <p className="text-[#9a9a9a] text-[14px]">No appointments for this day</p>
                  <button
                    onClick={() => { setShowAddModal(true); setNewAppt((p) => ({ ...p, date: selectedDate || todayStr })); }}
                    className="mt-3 text-[13px] font-medium cursor-pointer hover:underline"
                    style={{ color: config.color }}
                  >
                    + Schedule Appointment
                  </button>
                </div>
              ) : (
                selectedDateAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appt) => (
                    <div key={appt.id} className="rounded-[12px] border border-[#e8e8e8] p-3.5 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[14px] font-semibold text-[#383838]">{appt.patient}</p>
                          <p className="text-[12px] text-[#9a9a9a]">{appt.id}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[appt.status]?.split(" border-")[0]}`}>
                          {appt.status}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[13px] text-[#5d5d5d]">
                          <Clock size={13} className="text-[#9a9a9a]" />
                          <span>{appt.time} ({appt.duration})</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-[#5d5d5d]">
                          <User size={13} className="text-[#9a9a9a]" />
                          <span>{appt.doctor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px]" style={{ color: config.color }}>
                          <Stethoscope size={13} />
                          <span className="font-medium">{appt.service}</span>
                        </div>
                      </div>
                      {appt.notes && (
                        <p className="text-[12px] text-[#9a9a9a] mt-2 italic">"{appt.notes}"</p>
                      )}
                      {(appt.status === "Pending" || appt.status === "Confirmed") && (
                        <div className="flex gap-2 mt-3">
                          {appt.status === "Pending" && (
                            <button
                              onClick={() => updateStatus(appt.id, "Confirmed")}
                              className="flex-1 h-[30px] rounded-[8px] text-[12px] font-medium text-white flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
                              style={{ backgroundColor: "#1a8a1a" }}
                            >
                              <Check size={12} /> Confirm
                            </button>
                          )}
                          {appt.status === "Confirmed" && (
                            <button
                              onClick={() => updateStatus(appt.id, "Completed")}
                              className="flex-1 h-[30px] rounded-[8px] text-[12px] font-medium text-white flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
                              style={{ backgroundColor: config.color }}
                            >
                              <Check size={12} /> Complete
                            </button>
                          )}
                          <button
                            onClick={() => updateStatus(appt.id, "Cancelled")}
                            className="flex-1 h-[30px] rounded-[8px] text-[12px] font-medium text-[#e53e00] bg-[#fee] flex items-center justify-center gap-1 cursor-pointer hover:bg-[#fdd]"
                          >
                            <X size={12} /> Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-[16px] border border-[#e8e8e8]">
          <div className="overflow-x-auto relative">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8]">
                  {["ID", "Patient", "Doctor", "Service", "Date", "Time", "Duration", "Status"].map((h) => (
                    <th key={h} className="text-left text-[12px] text-[#9a9a9a] font-medium px-5 py-3 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-[14px] font-medium" style={{ color: config.color }}>{appt.id}</td>
                    <td className="px-5 py-3.5 text-[14px] text-[#383838] font-medium">{appt.patient}</td>
                    <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{appt.doctor}</td>
                    <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{appt.service}</td>
                    <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">
                      {new Date(appt.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5 text-[14px] text-[#5d5d5d]">{appt.time}</td>
                    <td className="px-5 py-3.5 text-[14px] text-[#9a9a9a]">{appt.duration}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${statusColors[appt.status]?.split(" border-")[0]}`}>{appt.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowAddModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-auto bg-white rounded-[20px] shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#383838] text-[20px] font-semibold">Schedule Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[#f0f0f0] rounded-full cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Patient Name</label>
                <input
                  value={newAppt.patient}
                  onChange={(e) => setNewAppt({ ...newAppt, patient: e.target.value })}
                  placeholder="Enter patient name"
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none focus:border-[#ff4e00]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Doctor</label>
                  <select
                    value={newAppt.doctor}
                    onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {DOCTORS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Service</label>
                  <select
                    value={newAppt.service}
                    onChange={(e) => setNewAppt({ ...newAppt, service: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={newAppt.date}
                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1">Time</label>
                  <select
                    value={newAppt.time}
                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                    className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                  >
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Duration</label>
                <select
                  value={newAppt.duration}
                  onChange={(e) => setNewAppt({ ...newAppt, duration: e.target.value })}
                  className="w-full h-[42px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] outline-none cursor-pointer"
                >
                  {["15 min", "20 min", "30 min", "45 min", "60 min"].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#383838] text-[14px] font-medium mb-1">Notes (optional)</label>
                <textarea
                  value={newAppt.notes}
                  onChange={(e) => setNewAppt({ ...newAppt, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  rows={2}
                  className="w-full bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#ff4e00]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 h-[42px] border border-[#e0e0e0] rounded-[10px] text-[14px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer">Cancel</button>
              <button
                onClick={handleAddAppointment}
                className="flex-1 h-[42px] text-white text-[14px] font-semibold rounded-[10px] cursor-pointer flex items-center justify-center gap-1.5"
                style={{ backgroundColor: config.color }}
              >
                <CalendarDays size={16} /> Schedule Appointment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}