import { useState } from "react";
import { Link } from "react-router-dom";

const initialAlerts = [
  { id: 1, category: "critical", title: "Critical Low Stock Alert: Augmentin 625 Duo Tablet", badge: "Reorder Threshold Breached", desc: "Dispensary inventory fallen below safety cushion. Remaining: 8 strips (Configured minimum: 50 strips). Stockout estimated within 36 hours.", link: "Medicine #MED-1042", location: "Rack Section A-02", time: "4m ago", isUnread: true },
  { id: 2, category: "critical", title: "Failed Payment Reversal: Razorpay Gateway TXN-892012", badge: "Webhook Error 502", desc: "UPI authorization failed for counter order #ORD-2024-8892 (Amount: ₹1,250.00). Settlement webhook timed out. Requires manual reversal check.", link: "Txn #TXN-892012", location: "POS Register #01", time: "18m ago", isUnread: true },
  { id: 3, category: "critical", title: "Near-Expiry Warning (14 Days): Azithral 500mg (Batch AZ-9912)", badge: "Return Due Nov 02", desc: "45 strips in shelf rack B-04 expiring on Nov 07, 2024. Vendor credit note window closes in 5 operational days. Transfer to quarantine bay advised.", link: "Batch #BAT-4412", location: "Shelf Bay B-04", time: "35m ago", isUnread: true },
  { id: 4, category: "prescriptions", title: "New Prescription Uploaded for Clinical Verification", badge: "Chronic Patient", desc: "Patient Rajesh Mehta uploaded Dr. K. Sharma signed Rx for Telmisartan 40mg and Rosuvastatin 10mg (90-day maintenance supply). Pending clinical review.", link: "Rx #RX-2024-MEHTA-09", location: "Review Queue", time: "1h ago", isUnread: true },
  { id: 5, category: "orders", title: "Emergency OPD Medication Order Placed: Fortis Clinic B2B", badge: "Priority Dispatch", desc: "Urgent delivery request for 12 units of sterile disposable syringes (5ml), 4 bottles of Betadine Solution 500ml, and 10 vials of Normal Saline.", link: "Order #ORD-2024-8899", location: "Dispensary Pack Hub", time: "2h ago", isUnread: true },
  { id: 6, category: "system", title: "Automated Central Backup & GxP Ledger Hash Verified", badge: "System Routine", desc: "Daily cryptographic dispensation ledger synchronization completed successfully. Signature Hash: 8F4B-91E2-2024-BC81.", link: "Audit #AUD-991", location: "Security Vault", time: "4h ago", isUnread: false },
];

const iconFor = { critical: "warning", orders: "shopping_bag" };

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);

  const toggleRead = (id) => setAlerts(alerts.map((a) => (a.id === id ? { ...a, isUnread: !a.isUnread } : a)));
  const markAllRead = () => setAlerts(alerts.map((a) => ({ ...a, isUnread: false })));

  const visible = alerts.filter((a) => (filter === "all" || a.category === filter) && (!unreadOnly || a.isUnread));

  return (
    <div className="flex flex-col w-full pb-16 px-gutter max-w-[1600px] mx-auto">
      <section className="w-full pb-space-lg pt-space-md">
        <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-xs">
          <Link to="/dashboard" className="hover:text-primary transition-colors">MedCare</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span><span>System</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span><span className="text-primary font-semibold">Notification Center</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-sm flex-wrap">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight font-serif">Notification Center</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>{alerts.filter((a) => a.isUnread).length} Unread Alerts
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time dispensary alerts, statutory schedule logs, cold-chain telemetry warnings, and POS order triggers.</p>
          </div>
          <button onClick={markAllRead} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-lowest text-primary hover:bg-surface-container transition-colors shadow-sm font-label-md"><span className="material-symbols-outlined text-[18px]">done_all</span><span>Mark All as Read</span></button>
        </div>
      </section>

      <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm mb-space-md flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "critical", "orders", "prescriptions", "system"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded font-label-md capitalize transition-colors ${filter === cat ? "bg-primary text-on-primary font-medium" : "text-on-surface-variant hover:bg-surface-container"}`}>{cat}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
          <span className="font-label-sm text-label-sm text-on-surface font-medium">Unread Only</span>
        </label>
      </div>

      <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden divide-y divide-surface-container">
        {visible.map((a) => (
          <div key={a.id} className={`flex items-start justify-between px-space-md py-3.5 hover:bg-surface-container-low transition-colors ${a.isUnread ? "border-l-4 border-l-error bg-surface-container-lowest" : "opacity-80 bg-surface-container-low/20"}`}>
            <div className="flex items-start gap-space-md pr-space-sm">
              <div className="w-9 h-9 rounded bg-error-container text-on-error-container shrink-0 flex items-center justify-center mt-0.5"><span className="material-symbols-outlined text-[20px]">{iconFor[a.category] || "clinical_notes"}</span></div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">{a.title}</span>
                  <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-surface-container text-on-surface">{a.badge}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{a.desc}</p>
                <div className="flex items-center gap-3 pt-1 text-[12px] text-secondary"><span>{a.link}</span><span>•</span><span>{a.location}</span></div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-body-sm text-outline">{a.time}</span>
              <button onClick={() => toggleRead(a.id)} className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant" title={a.isUnread ? "Mark as Read" : "Mark as Unread"}>
                <span className="material-symbols-outlined text-[18px]">{a.isUnread ? "check" : "mark_email_unread"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
