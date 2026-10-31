import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const orders = [
  { id: "#ORD-2024-8901", date: "Today, 04:32 PM", items: "Augmentin 625, Dolo 650, Cetirizine 10mg", amount: "₹521.50", pay: "Prepaid (UPI)", status: "Delivered", statusCls: "bg-primary-fixed text-on-primary-fixed font-medium" },
  { id: "#ORD-2024-8412", date: "14 Oct 2024", items: "Glycomet-GP 2, Telma-H, Atorva 20", amount: "₹1,420.50", pay: "Prepaid (UPI)", status: "Completed", statusCls: "bg-surface-container text-on-surface-variant" },
  { id: "#ORD-2024-7980", date: "12 Sep 2024", items: "Glycomet-GP 2, Telma 40, Rosuvas 10", amount: "₹1,180.00", pay: "Cash on Delivery", status: "Completed", statusCls: "bg-surface-container text-on-surface-variant" },
];

const ribbon = [
  { label: "Lifetime Spend", icon: "payments", iconCls: "text-primary", value: "₹34,850.00", sub: "Across 28 dispensing orders" },
  { label: "Average Order Value", icon: "query_stats", iconCls: "text-secondary", value: "₹1,244.60", sub: "+8.2% vs previous quarter", subCls: "text-surface-tint font-medium" },
  { label: "Outstanding Balance", icon: "verified", box: "bg-primary-fixed text-on-primary-fixed", value: "₹0.00", sub: "Good standing • Limit: ₹5,000.00" },
  { label: "Adherence Score", icon: "pill", box: "bg-secondary-fixed text-on-secondary-fixed", value: "94%", tag: "High", sub: "On-time refill rate (Chronic Rx)" },
];

export default function CustomerDetail() {
  const { showToast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col w-full px-space-xl py-space-lg gap-space-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
          <Link to="/customers" className="inline-flex items-center gap-1 text-primary hover:text-on-surface transition-colors font-medium"><span className="material-symbols-outlined text-[16px]">arrow_back</span><span>Back to Customers</span></Link>
          <span className="text-outline-variant">/</span><span>MedCare</span><span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">Rajesh Mehta (#CUST-1042)</span>
        </div>
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-space-sm py-1 rounded"><span className="material-symbols-outlined text-[16px] text-surface-tint">check_circle</span><span>Apothecary Verified Ledger</span></div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="flex items-start md:items-center gap-space-lg">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center font-headline-md text-headline-md font-serif shadow-inner">RM</div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-surface-tint ring-2 ring-surface-container-lowest" title="Active Account"></span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg font-serif text-on-surface">Rajesh Mehta</h1>
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-1 font-mono">#CUST-1042</span>
              <div className="flex flex-wrap gap-1.5 ml-space-xs">
                <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-label-sm text-label-sm">Active Patient</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">vital_signs</span>Chronic Care (Type 2 Diabetes &amp; Hypertension)</span>
                <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-label-sm">Prescription on File</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">event</span>Registered 14 Jan 2023 (22 mos)</span>
              <span className="text-outline-variant">•</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">history</span>Last Visit: Today, 04:32 PM</span>
              <span className="text-outline-variant">•</span>
              <span className="text-secondary font-medium hover:underline cursor-pointer">Order #ORD-2024-8901</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs flex-shrink-0 relative">
          <Link to="/billing-pos" className="h-10 px-4 rounded bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary transition-colors shadow-sm"><span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>New POS Order / Bill</Link>
          <button onClick={() => showToast("Upload prescription dialog", "upload_file")} className="h-10 px-3.5 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">upload_file</span>Upload Rx</button>
          <button onClick={() => showToast("Edit profile details", "edit")} className="h-10 px-3 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">edit</span>Edit Profile</button>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="h-10 px-2.5 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-surface-container-lowest rounded-lg shadow-lg py-1 z-20 border border-surface-container">
                <button onClick={() => { showToast("Printing statement...", "print"); setDropdownOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 font-label-sm text-label-sm text-on-surface hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">print</span> Print Account Statement</button>
                <button onClick={() => { showToast("Refill reminder dispatched via WhatsApp & SMS", "sms"); setDropdownOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 font-label-sm text-label-sm text-on-surface hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">sms</span> Send Refill Reminder</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {ribbon.map((r) => (
          <div key={r.label} className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{r.label}</span>
              <span className={`w-8 h-8 rounded flex items-center justify-center ${r.box || "bg-surface-container " + r.iconCls}`}><span className="material-symbols-outlined text-[18px]">{r.icon}</span></span>
            </div>
            <div className="mt-3">
              <div className="font-headline-md text-headline-md font-serif text-on-surface tracking-tight">{r.value} {r.tag && <span className="font-label-sm text-label-sm font-sans font-medium text-surface-tint">{r.tag}</span>}</div>
              <div className={`font-body-sm text-body-sm mt-1 ${r.subCls || "text-on-surface-variant"}`}>{r.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">badge</span><h2 className="font-title-md text-title-md text-on-surface">Personal &amp; Contact Details</h2></div>
            <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
              <div><span className="font-label-sm text-label-sm text-on-surface-variant block">Age / Gender</span><span className="font-body-md text-body-md font-medium text-on-surface mt-0.5 block">46 Y / Male</span></div>
              <div><span className="font-label-sm text-label-sm text-on-surface-variant block">Blood Group</span><span className="font-body-md text-body-md font-medium text-on-surface mt-0.5 block">B Positive (B+)</span></div>
            </div>
            <div className="space-y-2 text-body-sm">
              <div><span className="text-on-surface-variant font-label-sm">Primary WhatsApp:</span><span className="font-semibold block text-on-surface">+91 98112 34901</span></div>
              <div><span className="text-on-surface-variant font-label-sm">Address:</span><span className="block text-on-surface">Flat 402, Green Glen Heights, Indiranagar, Bengaluru</span></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">medical_services</span><h2 className="font-title-md text-title-md text-on-surface">Clinical Formulary</h2></div>
              <span className="bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-label-sm">Schedule H1 Active</span>
            </div>
            <div className="bg-secondary-fixed/30 rounded-lg p-space-sm flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">warning</span>
              <div>
                <span className="font-label-sm text-label-sm font-semibold text-on-secondary-container">Contraindication Alert</span>
                <p className="font-body-sm text-body-sm text-on-surface mt-0.5">Known Penicillin sensitivity (Flagged for Amoxicillin, Ampicillin &amp; beta-lactams).</p>
              </div>
            </div>
            <div className="space-y-2">
              {[["Metformin 500mg", "Twice daily post meals"], ["Telmisartan 40mg", "Morning after breakfast"]].map(([n, d]) => (
                <div key={n} className="bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between">
                  <div><span className="font-body-md font-semibold block text-on-surface">{n}</span><span className="text-on-surface-variant text-body-sm">{d}</span></div>
                  <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded">Refill in 12d</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="bg-surface-container-low px-space-lg pt-space-md flex flex-wrap items-center justify-between gap-space-md border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <button className="pb-3 px-3 font-label-md text-label-md font-semibold text-primary border-b-2 border-primary flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">shopping_bag</span>Order History (28)</button>
                <button onClick={() => showToast("Invoices tab coming soon", "request_quote")} className="pb-3 px-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">request_quote</span>Billing &amp; Invoices</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                  <tr><th className="py-3 px-space-md font-semibold">Order ID &amp; Date</th><th className="py-3 px-space-md font-semibold">Dispensed Items</th><th className="py-3 px-space-md font-semibold text-right">Amount</th><th className="py-3 px-space-md font-semibold">Payment</th><th className="py-3 px-space-md font-semibold">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low text-on-surface">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3.5 px-space-md"><span className="font-label-md text-label-md font-semibold text-primary block">{o.id}</span><span className="text-on-surface-variant text-body-sm">{o.date}</span></td>
                      <td className="py-3.5 px-space-md">{o.items}</td>
                      <td className="py-3.5 px-space-md text-right font-mono font-semibold">{o.amount}</td>
                      <td className="py-3.5 px-space-md">{o.pay}</td>
                      <td className="py-3.5 px-space-md"><span className={`font-label-sm text-label-sm px-2 py-0.5 rounded ${o.statusCls}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
