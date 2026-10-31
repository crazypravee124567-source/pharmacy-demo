import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

const transactions = [
  { id: "TXN-892014", amount: "₹521.50", status: "Successful", method: "UPI", customer: "Rajesh Mehta", phone: "+91 98112 34901", order: "#ORD-2024-8901", gateway: "Razorpay QR", rrn: "429812904812", vpa: "rajesh.mehta@okaxis" },
  { id: "TXN-892013", amount: "₹840.00", status: "Pending", method: "Card", customer: "Pooja Kulkarni", phone: "+91 97184 11200", order: "#ORD-2024-8898", gateway: "Axis Bank POS #2", rrn: "429812904711", vpa: "N/A (Chip EMV)" },
  { id: "TXN-892012", amount: "₹1,250.00", status: "Failed", method: "UPI", customer: "Amitabha Roy", phone: "+91 94320 89104", order: "#ORD-2024-8892", gateway: "PhonePe Intent", rrn: "429812904509", vpa: "amitabha@ybl" },
  { id: "TXN-892011", amount: "₹1,890.00", status: "Refunded", method: "Net Banking", customer: "Sunita Nair", phone: "+91 99801 44521", order: "#ORD-2024-8870", gateway: "HDFC NetBanking", rrn: "429812903901", vpa: "sunita@hdfcbank" },
  { id: "TXN-892010", amount: "₹4,200.00", status: "Successful", method: "Cash", customer: "Dr. Vinay Saxena", phone: "Bulk Clinic Order", order: "#ORD-2024-8865", gateway: "Counter Drawer #1", rrn: "CSH-POS-01", vpa: "Cash Counter" },
];

const statusCls = {
  Successful: "bg-primary-fixed text-on-primary-fixed",
  Pending: "bg-secondary-container/50 text-on-secondary-container",
  Failed: "bg-error-container text-on-error-container",
  Refunded: "bg-surface-container-high text-on-surface-variant",
};

const kpis = [
  { label: "Successful Payments", value: "₹14,82,450.00", valueCls: "text-primary", icon: "check_circle", box: "bg-surface-container text-surface-tint", left: <span className="text-surface-tint text-label-sm font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">trending_up</span>+12.4% vs last week</span>, right: "1,248 txns", rightCls: "bg-surface-container-lowest text-on-surface-variant" },
  { label: "Pending Settlements", value: "₹38,620.00", valueCls: "text-on-surface", icon: "schedule", box: "bg-secondary-container/40 text-on-secondary-container", left: <span className="text-on-secondary-container text-label-sm font-medium">Gateway processing batch</span>, right: "14 txns", rightCls: "bg-secondary-container/40 text-on-secondary-container" },
  { label: "Failed Transactions", value: "₹12,450.00", valueCls: "text-error", icon: "warning", box: "bg-error-container/60 text-on-error-container", left: <span className="text-on-error-container text-label-sm font-medium">0.48% failure rate</span>, right: "6 txns", rightCls: "bg-error-container/40 text-on-error-container" },
  { label: "Refunded & Reversals", value: "₹8,920.00", valueCls: "text-tertiary-container", icon: "replay", box: "bg-surface-container-high text-on-surface-variant", left: <span className="text-on-surface text-label-sm font-medium">100% processed</span>, right: "5 txns", rightCls: "bg-surface-container text-on-surface-variant" },
];

export default function Payments() {
  const { showToast } = useToast();
  const [inspected, setInspected] = useState(transactions[0]);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = transactions.filter((t) => statusFilter === "all" || t.status.toLowerCase() === statusFilter);

  return (
    <div className="p-space-lg lg:p-space-xl space-y-space-lg max-w-[1720px] mx-auto w-full">
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
        <div className="space-y-space-xs">
          <nav className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span>MedCare</span><span className="text-outline-variant">/</span><span>Finance &amp; Billing</span><span className="text-outline-variant">/</span><span className="text-primary font-semibold">Payment Transactions</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Payment Management</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">Monitor omnichannel payments, UPI settlements, card transactions, and automated refund lifecycles across dispensary POS counters.</p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <button onClick={() => showToast("Exporting Transactions CSV", "download")} className="inline-flex items-center gap-space-xs h-10 px-space-md rounded bg-surface-container-lowest text-primary font-label-md hover:bg-surface-container transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">download</span><span>Export Transactions (CSV)</span></button>
          <button onClick={() => showToast("Reconciling Razorpay and PineLabs gateways...", "sync_alt")} className="inline-flex items-center gap-space-xs h-10 px-space-md rounded bg-primary-container text-tertiary-fixed font-label-md hover:bg-primary transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">sync_alt</span><span>Reconcile Gateway [F7]</span></button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">{k.label}</span>
                <div className={`font-display text-display font-serif ${k.valueCls}`}>{k.value}</div>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.box}`}><span className="material-symbols-outlined text-[22px]">{k.icon}</span></div>
            </div>
            <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded">
              {k.left}<span className={`font-label-sm px-2 py-0.5 rounded ${k.rightCls}`}>{k.right}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Filter:</span>
        {["all", "successful", "pending", "failed", "refunded"].map((st) => (
          <button key={st} onClick={() => setStatusFilter(st)} className={`px-3 py-1 rounded capitalize font-label-sm text-label-sm transition-colors ${statusFilter === st ? "bg-primary text-on-primary font-semibold" : "bg-surface-container text-on-surface hover:bg-surface-container-high"}`}>{st}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body-md text-body-md">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  <th className="py-3.5 px-space-md">Transaction ID</th><th className="py-3.5 px-space-md">Order ID</th><th className="py-3.5 px-space-md">Customer</th><th className="py-3.5 px-space-md">Method</th>
                  <th className="py-3.5 px-space-md text-right">Amount</th><th className="py-3.5 px-space-md">Status</th><th className="py-3.5 px-space-md text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filtered.map((t) => (
                  <tr key={t.id} onClick={() => setInspected(t)} className={`transition-colors cursor-pointer ${inspected.id === t.id ? "bg-surface-container-low/70" : "hover:bg-surface-container-low/40"}`}>
                    <td className="py-3.5 px-space-md font-medium text-primary">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-surface-tint"></span><span className="font-semibold">{t.id}</span></div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block ml-3">{t.gateway}</span>
                    </td>
                    <td className="py-3.5 px-space-md font-label-md text-secondary">{t.order}</td>
                    <td className="py-3.5 px-space-md"><div className="font-medium text-on-surface">{t.customer}</div><span className="font-body-sm text-on-surface-variant">{t.phone}</span></td>
                    <td className="py-3.5 px-space-md"><span className="px-2 py-0.5 rounded font-label-sm bg-primary-fixed text-on-primary-fixed">{t.method}</span></td>
                    <td className="py-3.5 px-space-md text-right font-semibold text-primary font-mono">{t.amount}</td>
                    <td className="py-3.5 px-space-md"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-label-sm font-medium ${statusCls[t.status]}`}>{t.status}</span></td>
                    <td className="py-3.5 px-space-md text-center">
                      <button onClick={(e) => { e.stopPropagation(); setInspected(t); }} className="px-2.5 py-1 rounded bg-primary-container text-tertiary-fixed font-label-sm font-medium hover:bg-primary">Inspect</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="xl:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col space-y-space-md p-space-lg border border-surface-container">
          <div className="flex items-center justify-between pb-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block">Transaction Audit</span>
              <span className="font-title-md text-title-md text-primary font-semibold">{inspected.id}</span>
            </div>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-label-sm font-medium ${statusCls[inspected.status]}`}>{inspected.status}</span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-space-md space-y-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Net Captured Amount</span>
            <div className="font-display text-display text-primary font-serif">{inspected.amount}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant pt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">point_of_sale</span><span>Dispensary Counter POS 1 • Dynamic Settlement</span></div>
          </div>
          <div className="space-y-space-xs">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">Reference Audit</span>
            <div className="bg-surface-container-low rounded-lg p-space-sm space-y-2 font-body-sm text-body-sm">
              {[["Customer", inspected.customer, "font-medium text-on-surface"], ["Linked Order", inspected.order, "font-mono text-secondary"], ["Bank UTR / RRN", inspected.rrn, "font-mono text-on-surface"], ["Masked VPA", inspected.vpa, "font-medium text-on-surface"]].map(([l, v, c]) => (
                <div key={l} className="flex justify-between items-center py-1"><span className="text-on-surface-variant">{l}</span><span className={c}>{v}</span></div>
              ))}
            </div>
          </div>
          <div className="space-y-space-xs pt-space-xs">
            <button onClick={() => showToast(`Receipt downloaded for ${inspected.id}`, "receipt")} className="w-full h-10 rounded bg-primary-container text-tertiary-fixed font-label-md flex items-center justify-center gap-space-xs hover:bg-primary transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">receipt</span><span>Download Tax Receipt &amp; Slip</span></button>
            <div className="grid grid-cols-2 gap-space-xs">
              <button onClick={() => showToast("Slip sent via WhatsApp API", "chat")} className="h-9 rounded bg-surface-container-low text-on-surface font-label-sm flex items-center justify-center gap-1 hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">chat</span><span>WhatsApp</span></button>
              <button onClick={() => showToast("Thermal POS printer triggered", "print")} className="h-9 rounded bg-surface-container-low text-on-surface font-label-sm flex items-center justify-center gap-1 hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">print</span><span>Print Slip</span></button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
