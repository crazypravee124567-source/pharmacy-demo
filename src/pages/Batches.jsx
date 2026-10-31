import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const kpis = [
  { label: "Total Batches", value: "3,420", sub: "Across 18 distinct bays", icon: "inventory", iconBox: "bg-surface-container text-primary-container", valueCls: "text-on-surface" },
  { label: "Available", value: "3,115", sub: "Ready for dispensing", icon: "check_circle", iconBox: "bg-primary-fixed/40 text-primary-container", valueCls: "text-surface-tint" },
  { label: "Near Expiry (< 90 days)", value: "48", sub: "Flagged for inspection", icon: "warning", iconBox: "bg-secondary-container/40 text-secondary", valueCls: "text-secondary", tone: "text-secondary" },
  { label: "Expired", value: "12", sub: "Moved to quarantine", icon: "error_outline", iconBox: "bg-error-container/60 text-error", valueCls: "text-error", tone: "text-error" },
];

export default function Batches() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1240px] w-full mx-auto px-space-md py-space-lg flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-display text-display text-on-surface tracking-tight font-normal">Batches</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track pharmaceutical inventory batches, manufacturing &amp; expiration dates, purchase costing, and stock levels.</p>
        </div>
        <div className="flex items-center gap-space-sm">
          <button onClick={() => showToast("Exporting ledger...", "download")} className="h-10 px-4 rounded bg-surface-container-lowest text-primary font-label-md border border-outline-variant shadow-xs hover:bg-surface-container transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">file_download</span><span>Export ledger</span>
          </button>
          <button onClick={() => navigate("/stock-in")} className="h-10 px-4 rounded bg-primary-container text-on-primary font-label-md shadow-sm hover:bg-primary transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">add</span><span>Add batch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-space-md rounded flex items-center justify-between shadow-xs border border-outline-variant/40">
            <div className="flex flex-col">
              <span className={`font-label-sm text-xs ${k.tone ? k.tone + " font-medium" : "text-on-surface-variant"}`}>{k.label}</span>
              <span className={`font-headline-lg text-2xl font-serif font-semibold mt-0.5 ${k.valueCls}`}>{k.value}</span>
              <span className={`text-[11px] mt-1 ${k.tone || "text-on-surface-variant"}`}>{k.sub}</span>
            </div>
            <div className={`w-10 h-10 rounded flex items-center justify-center ${k.iconBox}`}>
              <span className="material-symbols-outlined text-[20px]">{k.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded shadow-xs border border-outline-variant/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-on-surface text-body-sm">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-xs uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Batch No.</th>
                <th className="py-3 px-4 font-semibold">Medicine Name</th>
                <th className="py-3 px-3 font-semibold">Mfg Date</th>
                <th className="py-3 px-3 font-semibold">Expiry Date</th>
                <th className="py-3 px-3 font-semibold text-right">Purchase (₹)</th>
                <th className="py-3 px-3 font-semibold text-right">Qty</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest/60">
              <tr className="hover:bg-surface-container-low/70">
                <td className="py-3 px-4 font-mono font-medium text-primary">AUG-24-089 <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-sans bg-surface-container">Bay A-04</span></td>
                <td className="py-3 px-4 font-medium">Augmentin 625 Duo</td>
                <td className="py-3 px-3 text-on-surface-variant">12 Jan 2024</td>
                <td className="py-3 px-3 font-medium">15 Dec 2025</td>
                <td className="py-3 px-3 text-right">₹168.00</td>
                <td className="py-3 px-3 text-right font-medium">320 strips</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 rounded text-xs bg-primary-fixed/40 text-surface-tint font-medium">Available</span></td>
                <td className="py-3 px-4 text-right"><button onClick={() => showToast("Viewing batch AUG-24-089")} className="text-primary hover:underline text-xs">View</button></td>
              </tr>
              <tr className="hover:bg-surface-container-low/70 bg-secondary-container/10">
                <td className="py-3 px-4 font-mono font-medium text-primary">MET-23-412 <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-sans bg-surface-container">Bay C-12</span></td>
                <td className="py-3 px-4 font-medium">Metformin 500mg SR</td>
                <td className="py-3 px-3 text-on-surface-variant">05 Oct 2023</td>
                <td className="py-3 px-3 font-medium text-secondary">28 Nov 2024</td>
                <td className="py-3 px-3 text-right">₹22.50</td>
                <td className="py-3 px-3 text-right font-medium text-secondary">45 strips</td>
                <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 rounded text-xs bg-secondary-container/40 text-on-secondary-container font-medium">Near Expiry</span></td>
                <td className="py-3 px-4 text-right"><button onClick={() => navigate("/stock-out")} className="text-secondary hover:underline text-xs">Quarantine</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
