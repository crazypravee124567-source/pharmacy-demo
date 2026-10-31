import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const stats = [
  {
    label: "Today's sales",
    icon: "payments",
    value: "₹84,250",
    badge: "+12.4%",
    badgeCls: "bg-apple-green/10 text-apple-green",
    sub: "vs yesterday",
    iconBg: "bg-apple-green/10 text-apple-green",
  },
  {
    label: "Total orders",
    icon: "shopping_bag",
    value: "142",
    note: "118 counter, 24 online",
    iconBg: "bg-apple-blue/10 text-apple-blue",
  },
  {
    label: "Low stock items",
    icon: "inventory_2",
    value: "18",
    badge: "+3 today",
    badgeCls: "bg-apple-orange/10 text-apple-orange",
    sub: "Action required",
    iconBg: "bg-apple-orange/10 text-apple-orange",
  },
  {
    label: "Pending online",
    icon: "schedule",
    value: "7",
    note: "4 awaiting verification",
    noteCls: "text-apple-orange font-medium",
    iconBg: "bg-apple-purple/10 text-apple-purple",
  },
  {
    label: "Near-expiry batches",
    icon: "warning",
    value: "12",
    valueCls: "text-apple-red",
    pill: "Within 30 days",
    pillCls: "bg-apple-red/10 text-apple-red",
    iconBg: "bg-apple-red/10 text-apple-red",
  },
];

const bars = [
  ["Mon", 82, 22],
  ["Tue", 96, 28],
  ["Wed", 92, 34],
  ["Thu", 118, 33],
  ["Fri", 110, 46],
  ["Sat", 130, 52],
  ["Sun", 108, 25],
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [chartView, setChartView] = useState("Daily");
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="w-full max-w-[1320px] mx-auto p-6 md:p-8 space-y-6">
      {/* Top Greeting & Station Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-[26px] font-semibold text-[#1d1d1f] tracking-tight">
              Good morning, Dr. Arthur Pendelton
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-apple-green/10 text-apple-green">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-pulse"></span>
              Station #1
            </span>
          </div>
          <p className="text-[13px] text-[#86868b] mt-1 flex items-center gap-2">
            <span>Central Dispensary</span>
            <span>•</span>
            <span>Live syncing with central inventory (99.8% coherence)</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Daily ledger PDF exported", "download_done")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-[13px] font-medium border border-black/[0.08] hover:bg-black/[0.02] shadow-xs transition-all apple-press"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Export Ledger</span>
          </button>
          <button
            onClick={() => navigate("/billing-pos")}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium shadow-[0_2px_8px_rgba(0,113,227,0.3)] transition-all apple-press"
          >
            <span className="material-symbols-outlined text-[17px]">add</span>
            <span>New Sale (POS)</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards with Apple Squircle Geometry (Rule #12: Materials & Depth) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="apple-card p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-medium text-[#86868b]">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
              </div>
            </div>
            <div className="my-2.5">
              <span className={`text-[28px] font-semibold tracking-tight ${s.valueCls || "text-[#1d1d1f]"}`}>
                {s.value}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11.5px]">
              {s.badge && (
                <span className={`px-2 py-0.5 rounded-full font-semibold ${s.badgeCls}`}>
                  {s.badge}
                </span>
              )}
              {s.sub && <span className="text-[#86868b]">{s.sub}</span>}
              {s.note && <span className={s.noteCls || "text-[#86868b]"}>{s.note}</span>}
              {s.pill && (
                <span className={`px-2 py-0.5 rounded-full font-semibold ${s.pillCls || "bg-black/[0.04] text-[#6e6e73]"}`}>
                  {s.pill}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Dispensary Volume Chart Card */}
      <div className="apple-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.05]">
          <div>
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
              Revenue &amp; Dispensary Volume
            </h2>
            <p className="text-[13px] text-[#86868b] mt-0.5">
              Daily counter vs. online sales performance
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5 pr-4 border-r border-black/[0.06]">
              <div className="text-right">
                <span className="block text-[11px] text-[#86868b]">Avg ticket</span>
                <span className="text-[14px] font-semibold text-[#1d1d1f]">₹593</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-[#86868b]">Gross margin</span>
                <span className="text-[14px] font-semibold text-apple-green">28.4%</span>
              </div>
            </div>

            {/* Apple Segmented Filter Pill */}
            <div className="apple-segmented">
              {["Daily", "Weekly", "Monthly"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setChartView(mode)}
                  className={`apple-segmented-item ${chartView === mode ? "active" : ""}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="pt-4">
          <div className="flex items-center justify-end gap-4 mb-3 text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-apple-blue"></span>
              <span className="text-[#6e6e73] font-medium">Counter sales</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-apple-orange"></span>
              <span className="text-[#6e6e73] font-medium">Online orders</span>
            </div>
          </div>

          <div className="w-full h-56 relative select-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 180">
              <defs>
                <linearGradient id="appleBlueBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0071E3" />
                  <stop offset="100%" stopColor="#005bb5" />
                </linearGradient>
                <linearGradient id="appleOrangeBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9500" />
                  <stop offset="100%" stopColor="#E07B00" />
                </linearGradient>
              </defs>

              {[20, 60, 100, 140].map((y) => (
                <line
                  key={y}
                  stroke="rgba(0,0,0,0.05)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  x1="45"
                  x2="690"
                  y1={y}
                  y2={y}
                />
              ))}
              <line stroke="rgba(0,0,0,0.1)" strokeWidth="1" x1="45" x2="690" y1="160" y2="160" />

              {[["₹100k", 24], ["₹75k", 64], ["₹50k", 104], ["₹25k", 144], ["₹0", 164]].map(
                ([t, y]) => (
                  <text key={t} fill="#8e8e93" fontSize="10" fontWeight="500" textAnchor="end" x="38" y={y}>
                    {t}
                  </text>
                )
              )}

              {bars.map(([day, counter, online], i) => {
                const x = 75 + i * 88;
                const isHovered = hoveredBar === day;
                return (
                  <g
                    key={day}
                    className="cursor-pointer transition-opacity duration-150"
                    onMouseEnter={() => setHoveredBar(day)}
                    onMouseLeave={() => setHoveredBar(null)}
                    opacity={hoveredBar && !isHovered ? 0.6 : 1}
                  >
                    {/* Counter bar */}
                    <rect
                      fill="url(#appleBlueBar)"
                      height={counter}
                      rx="4"
                      width="20"
                      x={x}
                      y={160 - counter}
                    />
                    {/* Online bar */}
                    <rect
                      fill="url(#appleOrangeBar)"
                      height={online}
                      rx="4"
                      width="20"
                      x={x + 24}
                      y={160 - online}
                    />
                    <text
                      fill={isHovered ? "#0071E3" : "#6e6e73"}
                      fontSize="11"
                      fontWeight={isHovered ? "600" : "500"}
                      textAnchor="middle"
                      x={x + 22}
                      y="176"
                    >
                      {day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Online Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Transactions */}
        <div className="lg:col-span-7 apple-card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-black/[0.05] flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Recent Transactions
              </h3>
              <span className="text-[12px] text-[#86868b]">
                Counter dispensary • Live ledger
              </span>
            </div>
            <Link
              to="/sales-history"
              className="text-[12.5px] font-medium text-apple-blue hover:text-apple-blue-hover apple-press"
            >
              View all (142) →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-black/[0.02] text-[#86868b] font-medium text-[11.5px] border-b border-black/[0.04]">
                  <th className="py-2.5 px-4">Time</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Items / Rx</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4">Method</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {[
                  ["10:42 AM", "Sunita Rao", "Amoxicillin 500mg, Paracetamol", "₹480", "UPI"],
                  ["10:35 AM", "Vikram Mehta", "Metformin 850mg (90 tab)", "₹1,250", "Card"],
                  ["10:18 AM", "Dr. K. Sharma (Walk-in)", "Atorvastatin 20mg, Telmisartan", "₹890", "Cash"],
                ].map(([time, cust, items, amt, method]) => (
                  <tr key={time} className="hover:bg-black/[0.015] transition-colors">
                    <td className="py-3 px-4 text-[#86868b] font-mono text-[12px]">{time}</td>
                    <td className="py-3 px-4 font-medium text-[#1d1d1f]">{cust}</td>
                    <td className="py-3 px-4 text-[#6e6e73] truncate max-w-[140px]">{items}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#1d1d1f]">{amt}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/[0.04] text-[#6e6e73]">
                        {method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-apple-green/10 text-apple-green">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Latest Online Orders */}
        <div className="lg:col-span-5 apple-card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-black/[0.05] flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                Online Orders Queue
              </h3>
              <span className="text-[12px] text-[#86868b]">
                Portal &amp; WhatsApp Rx queue
              </span>
            </div>
            <Link
              to="/orders"
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-apple-blue/10 text-apple-blue"
            >
              7 active
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-black/[0.02] text-[#86868b] font-medium text-[11.5px] border-b border-black/[0.04]">
                  <th className="py-2.5 px-4">Order ID</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {[
                  [
                    "#RX-8842",
                    "12 mins ago",
                    "Neha Patel",
                    "₹1,420",
                    "Preparing",
                    "bg-apple-orange/10 text-apple-orange",
                  ],
                  [
                    "#RX-8841",
                    "24 mins ago",
                    "David Chen",
                    "₹780",
                    "Verification req.",
                    "bg-apple-red/10 text-apple-red",
                  ],
                ].map(([id, ago, cust, amt, status, cls]) => (
                  <tr key={id} className="hover:bg-black/[0.015] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-apple-blue">{id}</div>
                      <div className="text-[11px] text-[#86868b]">{ago}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#1d1d1f]">{cust}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#1d1d1f]">{amt}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${cls}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Urgent Clinical Alert Banner (Rule #16: Safety & Responsibility) */}
      <div className="apple-card p-5 border border-apple-orange/20 bg-gradient-to-r from-white via-white to-apple-orange/[0.03] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          <div className="flex items-start gap-3 flex-1 pr-4 md:border-r md:border-black/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-apple-red/10 text-apple-red flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">inventory</span>
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-[#1d1d1f]">
                Low stock alert: Augmentin 625 Duo (4 units left)
              </div>
              <p className="text-[12px] text-[#86868b] mt-0.5">
                Auto-reorder threshold reached with Apex Distributors.
                <Link to="/purchases" className="text-apple-red font-medium hover:underline ml-1">
                  Review PO →
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-xl bg-apple-orange/10 text-apple-orange flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">history_toggle_off</span>
            </div>
            <div>
              <div className="text-[13.5px] font-semibold text-[#1d1d1f]">
                Near-expiry warning: 12 batches expiring &lt; 30 days
              </div>
              <p className="text-[12px] text-[#86868b] mt-0.5">
                Includes Metoprolol 50mg and Pantocid 40mg.
                <Link to="/stock-out" className="text-apple-orange font-medium hover:underline ml-1">
                  Quarantine list →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate("/stock-out")}
            className="px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] text-[12.5px] font-medium hover:bg-black/[0.02] transition-colors apple-press"
          >
            Batch Transfer
          </button>
          <button
            onClick={() => navigate("/purchases")}
            className="px-4 py-1.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[12.5px] font-medium shadow-sm transition-colors apple-press"
          >
            Quick Reorder
          </button>
        </div>
      </div>
    </div>
  );
}
