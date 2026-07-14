import { useCallback, useEffect, useRef, useState } from "react";
import { useCrm, type CrmConfig } from "../CrmContext";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

const monthlyData = [
  { month: "Oct", sales: 42000, leads: 12, customers: 18 },
  { month: "Nov", sales: 58000, leads: 15, customers: 22 },
  { month: "Dec", sales: 75000, leads: 20, customers: 28 },
  { month: "Jan", sales: 61000, leads: 18, customers: 24 },
  { month: "Feb", sales: 88000, leads: 25, customers: 32 },
  { month: "Mar", sales: 95000, leads: 28, customers: 36 },
];

const leadStageData = [
  { name: "New", value: 12, color: "#3b82f6" },
  { name: "Contacted", value: 8, color: "#f59e0b" },
  { name: "Negotiation", value: 5, color: "#8b5cf6" },
  { name: "Won", value: 15, color: "#22c55e" },
  { name: "Lost", value: 3, color: "#ef4444" },
];

const topCustomers = [
  { name: "Lisa Tan", revenue: "P68,900", orders: 32 },
  { name: "Maria Santos", revenue: "P45,200", orders: 24 },
  { name: "Grace Lim", revenue: "P42,600", orders: 21 },
  { name: "Ana Reyes", revenue: "P36,800", orders: 18 },
  { name: "Sofia Garcia", revenue: "P31,200", orders: 15 },
];

/* ------------------------------------------------------------------ */
/*  Custom SVG charts — replaces recharts to avoid internal key bugs  */
/* ------------------------------------------------------------------ */

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/* ---------- Tooltip hook ---------- */
function useTooltip() {
  const [tip, setTip] = useState<{ x: number; y: number; lines: string[] } | null>(null);
  const show = useCallback((x: number, y: number, lines: string[]) => setTip({ x, y, lines }), []);
  const hide = useCallback(() => setTip(null), []);
  return { tip, show, hide };
}

function SvgTooltip({ tip }: { tip: { x: number; y: number; lines: string[] } | null }) {
  if (!tip) return null;
  const w = Math.max(...tip.lines.map((l) => l.length)) * 7.5 + 24;
  const h = tip.lines.length * 18 + 16;
  const tx = Math.max(0, tip.x - w / 2);
  return (
    <g style={{ pointerEvents: "none" }}>
      <rect x={tx} y={tip.y - h - 8} width={w} height={h} rx={6} fill="#fff" stroke="#e0e0e0" strokeWidth={1} />
      {tip.lines.map((line, i) => (
        <text key={`tt-${i}`} x={tx + 12} y={tip.y - h - 8 + 18 + i * 18} fontSize={12} fill="#555">
          {line}
        </text>
      ))}
    </g>
  );
}

/* ---------- Bar Chart ---------- */
function RevenueChart({ color }: { color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cw = useContainerWidth(containerRef);
  const { tip, show, hide } = useTooltip();

  const chartH = 200;
  const padL = 48, padR = 12, padT = 12, padB = 28;
  const plotW = Math.max(cw - padL - padR, 0);
  const plotH = chartH - padT - padB;
  const maxVal = Math.max(...monthlyData.map((d) => d.sales));
  const barGap = 8;
  const barW = Math.max((plotW - barGap * monthlyData.length) / monthlyData.length, 4);

  // Y-axis ticks
  const yTicks = [0, 25000, 50000, 75000, 100000].filter((v) => v <= maxVal * 1.15);

  return (
    <div ref={containerRef} className="w-full" style={{ height: chartH }}>
      {cw > 0 && (
        <svg width={cw} height={chartH}>
          {/* Grid lines */}
          {yTicks.map((v) => {
            const y = padT + plotH - (v / (maxVal * 1.15)) * plotH;
            return (
              <g key={`yg-${v}`}>
                <line x1={padL} x2={padL + plotW} y1={y} y2={y} stroke="#f0f0f0" strokeDasharray="3 3" />
                <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={11} fill="#9a9a9a">
                  {v / 1000}K
                </text>
              </g>
            );
          })}
          {/* Bars */}
          {monthlyData.map((d, i) => {
            const x = padL + i * (barW + barGap) + barGap / 2;
            const h = (d.sales / (maxVal * 1.15)) * plotH;
            const y = padT + plotH - h;
            return (
              <g key={`bar-${i}`}>
                <rect x={x} y={y} width={barW} height={h} rx={6} fill={color}
                  onMouseEnter={(e) => show(e.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0), y, [`P${d.sales.toLocaleString()}`])}
                  onMouseLeave={hide}
                  className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
                />
                <text x={x + barW / 2} y={padT + plotH + 16} textAnchor="middle" fontSize={11} fill="#9a9a9a">
                  {d.month}
                </text>
              </g>
            );
          })}
          <SvgTooltip tip={tip} />
        </svg>
      )}
    </div>
  );
}

/* ---------- Donut / Pie Chart ---------- */
function PipelineChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cw = useContainerWidth(containerRef);
  const chartH = 240;
  const total = leadStageData.reduce((s, d) => s + d.value, 0);
  const cx = cw / 2, cy = chartH / 2;
  const outerR = 90, innerR = 55;

  // Build arcs
  let cumAngle = -Math.PI / 2;
  const arcs = leadStageData.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    return { ...d, startAngle, endAngle, midAngle: (startAngle + endAngle) / 2 };
  });

  function arcPath(sa: number, ea: number, r1: number, r2: number) {
    const gap = 0.03; // paddingAngle equivalent
    const s = sa + gap / 2;
    const e = ea - gap / 2;
    const x1 = cx + r2 * Math.cos(s), y1 = cy + r2 * Math.sin(s);
    const x2 = cx + r2 * Math.cos(e), y2 = cy + r2 * Math.sin(e);
    const x3 = cx + r1 * Math.cos(e), y3 = cy + r1 * Math.sin(e);
    const x4 = cx + r1 * Math.cos(s), y4 = cy + r1 * Math.sin(s);
    const large = e - s > Math.PI ? 1 : 0;
    return `M${x1},${y1} A${r2},${r2} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${large} 0 ${x4},${y4} Z`;
  }

  return (
    <div ref={containerRef} className="w-full" style={{ height: chartH }}>
      {cw > 0 && (
        <svg width={cw} height={chartH}>
          {arcs.map((a, i) => (
            <path key={`arc-${i}`} d={arcPath(a.startAngle, a.endAngle, innerR, outerR)} fill={a.color}
              className="cursor-pointer hover:opacity-80 transition-opacity" />
          ))}
          {/* Labels */}
          {arcs.map((a, i) => {
            const lR = outerR + 22;
            const lx = cx + lR * Math.cos(a.midAngle);
            const ly = cy + lR * Math.sin(a.midAngle);
            return (
              <text key={`lbl-${i}`} x={lx} y={ly} textAnchor={lx > cx ? "start" : "end"} dominantBaseline="central" fontSize={11} fill="#555">
                {a.name} ({a.value})
              </text>
            );
          })}
        </svg>
      )}
    </div>
  );
}

/* ---------- Line Chart ---------- */
function GrowthChart({ config }: { config: CrmConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cw = useContainerWidth(containerRef);
  const { tip, show, hide } = useTooltip();

  const chartH = 240;
  const padL = 32, padR = 12, padT = 16, padB = 40;
  const plotW = Math.max(cw - padL - padR, 0);
  const plotH = chartH - padT - padB;
  const maxVal = Math.max(...monthlyData.map((d) => Math.max(d.customers, d.leads))) * 1.2;

  const getX = (i: number) => padL + (plotW / (monthlyData.length - 1)) * i;
  const getY = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const customersPath = monthlyData.map((d, i) => `${i === 0 ? "M" : "L"}${getX(i)},${getY(d.customers)}`).join(" ");
  const leadsPath = monthlyData.map((d, i) => `${i === 0 ? "M" : "L"}${getX(i)},${getY(d.leads)}`).join(" ");

  const yTicks = [0, 10, 20, 30, 40].filter((v) => v <= maxVal);

  return (
    <div ref={containerRef} className="w-full" style={{ height: chartH }}>
      {cw > 0 && (
        <svg width={cw} height={chartH}>
          {/* Grid */}
          {yTicks.map((v) => {
            const y = getY(v);
            return (
              <g key={`lg-${v}`}>
                <line x1={padL} x2={padL + plotW} y1={y} y2={y} stroke="#f0f0f0" strokeDasharray="3 3" />
                <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={11} fill="#9a9a9a">{v}</text>
              </g>
            );
          })}
          {/* Lines */}
          <path d={customersPath} fill="none" stroke={config.color} strokeWidth={2} />
          <path d={leadsPath} fill="none" stroke="#8b5cf6" strokeWidth={2} />
          {/* Dots */}
          {monthlyData.map((d, i) => (
            <g key={`dot-${i}`}>
              <circle cx={getX(i)} cy={getY(d.customers)} r={4} fill={config.color} stroke="#fff" strokeWidth={1.5}
                className="cursor-pointer"
                onMouseEnter={() => show(getX(i), getY(d.customers), [`${config.customerLabelPlural}: ${d.customers}`, `${config.leadLabel}s: ${d.leads}`])}
                onMouseLeave={hide}
              />
              <circle cx={getX(i)} cy={getY(d.leads)} r={4} fill="#8b5cf6" stroke="#fff" strokeWidth={1.5}
                className="cursor-pointer"
                onMouseEnter={() => show(getX(i), getY(d.leads), [`${config.customerLabelPlural}: ${d.customers}`, `${config.leadLabel}s: ${d.leads}`])}
                onMouseLeave={hide}
              />
              <text x={getX(i)} y={chartH - padB + 16} textAnchor="middle" fontSize={11} fill="#9a9a9a">
                {d.month}
              </text>
            </g>
          ))}
          <SvgTooltip tip={tip} />
          {/* Legend */}
          <circle cx={padL} cy={chartH - 8} r={5} fill={config.color} />
          <text x={padL + 10} y={chartH - 4} fontSize={11} fill="#555">{config.customerLabelPlural}</text>
          <circle cx={padL + 100} cy={chartH - 8} r={5} fill="#8b5cf6" />
          <text x={padL + 110} y={chartH - 4} fontSize={11} fill="#555">{config.leadLabel}s</text>
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ReportsPage() {
  const { config } = useCrm();

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <h1 className="text-[26px] font-semibold mb-6" style={{ color: config.color }}>Reports & Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Revenue Growth", value: "+18.5%", icon: <TrendingUp size={18} />, sub: "vs last month" },
          { label: `New ${config.customerLabelPlural}`, value: "36", icon: <Users size={18} />, sub: "this month" },
          { label: "Conversion Rate", value: "34.8%", icon: <Target size={18} />, sub: "leads → won" },
          { label: `Avg ${config.saleLabel}`, value: "P2,640", icon: <DollarSign size={18} />, sub: "per transaction" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: config.colorLight, color: config.color }}>{s.icon}</div>
              <p className="text-[#9a9a9a] text-[13px] font-medium">{s.label}</p>
            </div>
            <p className="text-[#383838] text-[22px] font-semibold">{s.value}</p>
            <p className="text-[#9a9a9a] text-[12px] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
          <h3 className="text-[#383838] text-[16px] font-semibold mb-4">Monthly Revenue</h3>
          <div className="relative">
            <RevenueChart color={config.color} />
          </div>
        </div>

        {/* Lead Pipeline */}
        <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
          <h3 className="text-[#383838] text-[16px] font-semibold mb-4">{config.leadLabel} Pipeline</h3>
          <div className="relative">
            <PipelineChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Trends */}
        <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
          <h3 className="text-[#383838] text-[16px] font-semibold mb-4">{config.customerLabel} & {config.leadLabel} Growth</h3>
          <div className="relative">
            <GrowthChart config={config} />
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
          <h3 className="text-[#383838] text-[16px] font-semibold mb-4">Top {config.customerLabelPlural}</h3>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 py-2">
                <span className="text-[14px] font-semibold w-5 text-center" style={{ color: i < 3 ? config.color : "#9a9a9a" }}>#{i + 1}</span>
                <div className="w-8 h-8 rounded-full text-white text-[12px] font-semibold flex items-center justify-center" style={{ backgroundColor: config.color, opacity: 1 - i * 0.12 }}>
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-[#383838] text-[14px] font-medium">{c.name}</p>
                  <p className="text-[#9a9a9a] text-[12px]">{c.orders} {config.saleLabel.toLowerCase()}s</p>
                </div>
                <span className="text-[#383838] text-[14px] font-semibold">{c.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}