import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const stats = [
  { label: "Total Medicines", value: "1,482", sub: "Across 24 categories", icon: "medication", iconBg: "bg-apple-blue/10 text-apple-blue" },
  { label: "In Stock", value: "1,396", sub: "Ready for dispensing", icon: "check_circle", iconBg: "bg-apple-green/10 text-apple-green", subCls: "text-apple-green font-medium" },
  { label: "Low Stock", value: "54", sub: "Below reorder threshold", icon: "warning", iconBg: "bg-apple-orange/10 text-apple-orange", valueCls: "text-apple-orange" },
  { label: "Out of Stock", value: "18", sub: "Urgent purchase required", icon: "error", iconBg: "bg-apple-red/10 text-apple-red", subCls: "text-apple-red font-medium", valueCls: "text-apple-red" },
  { label: "Quarantined", value: "14", sub: "Moved to quarantine bay", icon: "inventory", iconBg: "bg-apple-purple/10 text-apple-purple" },
];

export default function Inventory() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-semibold text-[#1d1d1f] tracking-tight">
            Inventory &amp; Stock Balance
          </h1>
          <p className="text-[13px] text-[#86868b] mt-0.5">
            Real-time balance, automated reorder thresholds, batch expiries, and dispensary replenishment.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast("Stock ledger reconciled with central DB")}
            className="px-4 py-2 bg-white text-[#1d1d1f] border border-black/[0.08] rounded-full text-[13px] font-medium flex items-center gap-2 shadow-xs hover:bg-black/[0.02] transition-all apple-press"
          >
            <span className="material-symbols-outlined text-[17px]">sync_alt</span>
            <span>Reconcile Ledger</span>
          </button>
          <button
            onClick={() => navigate("/stock-in")}
            className="px-5 py-2 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full text-[13px] font-medium flex items-center gap-2 shadow-[0_2px_8px_rgba(0,113,227,0.3)] transition-all apple-press"
          >
            <span className="material-symbols-outlined text-[17px]">add</span>
            <span>Stock Adjustment</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="apple-card p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#86868b]">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
              </div>
            </div>
            <span className={`text-[26px] font-semibold tracking-tight my-2 ${s.valueCls || "text-[#1d1d1f]"}`}>
              {s.value}
            </span>
            <span className={`text-[11.5px] ${s.subCls || "text-[#86868b]"}`}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="apple-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-black/[0.05] bg-black/[0.01] flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#1d1d1f]">Formulary Stock Roster</span>
          <span className="text-[12px] text-[#86868b]">Showing active batches</span>
        </div>
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="bg-black/[0.02] text-[#86868b] text-[11.5px] uppercase tracking-wider border-b border-black/[0.04]">
              <th className="py-3 px-5 font-semibold">Medicine</th>
              <th className="py-3 px-5 font-semibold">Batch &amp; Storage Bay</th>
              <th className="py-3 px-5 font-semibold">Expiry Date</th>
              <th className="py-3 px-5 font-semibold">Available Qty</th>
              <th className="py-3 px-5 font-semibold">Status</th>
              <th className="py-3 px-5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            <tr className="hover:bg-black/[0.015] transition-colors">
              <td className="py-3.5 px-5 font-medium text-[#1d1d1f]">Augmentin 625 Duo</td>
              <td className="py-3.5 px-5 font-mono text-[12px] text-[#6e6e73]">AUG-24-089 (Bay A-04)</td>
              <td className="py-3.5 px-5 text-[#6e6e73]">15 Dec 2025</td>
              <td className="py-3.5 px-5 text-apple-red font-semibold">4 strips (Critically Low)</td>
              <td className="py-3.5 px-5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-apple-orange/10 text-apple-orange font-semibold">
                  Low Stock
                </span>
              </td>
              <td className="py-3.5 px-5 text-right">
                <Link
                  to="/stock-in"
                  className="px-3 py-1 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[12px] font-medium shadow-xs apple-press inline-block"
                >
                  Order
                </Link>
              </td>
            </tr>
            <tr className="hover:bg-black/[0.015] transition-colors">
              <td className="py-3.5 px-5 font-medium text-[#1d1d1f]">Metformin 500mg SR</td>
              <td className="py-3.5 px-5 font-mono text-[12px] text-[#6e6e73]">MET-23-412 (Bay C-12)</td>
              <td className="py-3.5 px-5 text-apple-orange font-medium">28 Nov 2024 (Near-expiry)</td>
              <td className="py-3.5 px-5 font-semibold text-[#1d1d1f]">450 strips</td>
              <td className="py-3.5 px-5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-apple-green/10 text-apple-green font-semibold">
                  In Stock
                </span>
              </td>
              <td className="py-3.5 px-5 text-right">
                <Link
                  to="/stock-out"
                  className="px-3 py-1 rounded-full border border-black/[0.08] hover:bg-black/[0.04] text-[#1d1d1f] text-[12px] font-medium apple-press inline-block"
                >
                  Quarantine
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
