import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const ledgerRows = [
  { po: "PO-2024-9842", inv: "INV-SUN-8821", date: "14 Oct 2024", due: "Due in 14 days", consignment: "4 Medicines", items: "420 Strips • Augmentin / Telma", amount: "₹1,84,500", status: "unpaid", statusLabel: "Unpaid", statusBadge: "bg-apple-orange/10 text-apple-orange", delivery: "In Transit", deliveryIcon: "local_shipping", deliveryBadge: "text-apple-blue bg-apple-blue/10", actionBtn: "Pay Now" },
  { po: "PO-2024-9831", inv: "INV-SUN-8714", date: "08 Oct 2024", due: "Due in 2 days", consignment: "12 Medicines", items: "1,400 Units • Rosuvas / Glycomet", amount: "₹3,00,750", balance: "Bal: ₹1,50,000", status: "partial", statusLabel: "Partial", statusBadge: "bg-apple-blue/10 text-apple-blue", delivery: "Received", deliveryIcon: "inventory_2", deliveryBadge: "text-apple-green bg-apple-green/10", actionBtn: "Pay Bal" },
  { po: "PO-2024-9790", inv: "INV-SUN-8540", date: "28 Sep 2024", due: "Settled 04 Oct", consignment: "6 Medicines", items: "850 Vials • Insulin Glargine", amount: "₹4,12,000", status: "paid", statusLabel: "Paid", statusBadge: "bg-apple-green/10 text-apple-green", delivery: "Inspected", deliveryIcon: "verified", deliveryBadge: "text-apple-purple bg-apple-purple/10" },
  { po: "PO-2024-9721", inv: "INV-SUN-8412", date: "15 Sep 2024", due: "Settled 22 Sep", consignment: "18 Medicines", items: "2,200 Packs • General Analgesics", amount: "₹6,45,200", status: "paid", statusLabel: "Paid", statusBadge: "bg-apple-green/10 text-apple-green", delivery: "Inspected", deliveryIcon: "verified", deliveryBadge: "text-apple-purple bg-apple-purple/10" },
  { po: "PO-2024-9650", inv: "INV-SUN-8290", date: "01 Sep 2024", due: "Settled 12 Sep", consignment: "5 Medicines", items: "310 Inhalers • Foracort / Asthalin", amount: "₹2,18,350", status: "paid", statusLabel: "Paid", statusBadge: "bg-apple-green/10 text-apple-green", delivery: "Inspected", deliveryIcon: "verified", deliveryBadge: "text-apple-purple bg-apple-purple/10" },
];

const kpis = [
  { label: "Total Outstanding", value: "₹4,85,250", dec: ".00", icon: "account_balance", iconBox: "bg-apple-orange/10 text-apple-orange", left: <span className="text-apple-red font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-apple-red"></span>Due within 15 days</span>, right: "Limit: ₹15.0L" },
  { label: "Total Purchases (YTD)", value: "₹42,60,800", dec: ".00", icon: "shopping_bag", iconBox: "bg-apple-blue/10 text-apple-blue", left: <span className="font-medium text-apple-green">34 Purchase Orders</span>, right: "Avg ₹1.25L / PO" },
  { label: "Avg Fulfilment Time", value: "1.8", unit: "Days", icon: "local_shipping", iconBox: "bg-apple-purple/10 text-apple-purple", left: <span className="text-apple-green font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">bolt</span>99.4% On-time Rate</span>, right: "SLA: < 48 Hrs" },
  { label: "Quality Compliance", value: "100% Passed", valueCls: "text-apple-green", icon: "sanitizer", iconBox: "bg-apple-green/10 text-apple-green", left: <span className="text-[#1d1d1f] font-medium">Sched M & CDSCO</span>, right: <span className="text-apple-green font-semibold">0 Quarantined</span> },
];

export default function SupplierDetail() {
  const { showToast } = useToast();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const q = searchTerm.toLowerCase();
  const rows = ledgerRows.filter(
    (r) => (paymentFilter === "all" || r.status === paymentFilter) && (q === "" || r.po.toLowerCase().includes(q) || r.inv.toLowerCase().includes(q) || r.items.toLowerCase().includes(q))
  );

  return (
    <div className="flex flex-col w-full p-space-xl space-y-space-xl">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <Link to="/dashboard" className="hover:text-primary transition-colors">MedCare</Link>
          <span className="text-outline-variant">/</span>
          <Link to="/suppliers" className="hover:text-primary transition-colors">Suppliers</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">Sun Pharma Distributors</span>
        </div>
        <Link to="/suppliers" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors group">
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Back to Suppliers Directory</span>
        </Link>
      </div>

      {/* Header card */}
      <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
        <div className="space-y-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Sun Pharma Distributors</h1>
            <span className="bg-[#E8F5E9] text-[#2E7D52] font-label-sm text-label-sm px-space-sm py-0.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#2E7D52]"></span>Active Partner</span>
            <span className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm px-space-sm py-0.5 rounded flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">ac_unit</span>Certified Cold Chain</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
            <div className="flex items-center gap-1"><span className="text-outline font-medium">Wholesale Drug Lic:</span><span className="text-on-surface font-mono font-medium">DL-MH-102948-B2B</span></div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1"><span className="text-outline font-medium">GSTIN:</span><span className="text-on-surface font-mono font-medium">29AABCS1429B1Z</span></div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1 text-surface-tint"><span className="material-symbols-outlined text-[16px]">verified</span><span>Audited Tier-1 B2B Depo</span></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm relative">
          <div className="relative">
            <button onClick={() => setShowMoreActions(!showMoreActions)} className="h-10 px-space-md bg-surface-container text-on-surface font-label-md text-label-md rounded flex items-center gap-1 hover:bg-surface-container-high transition-colors">
              <span>More Actions</span><span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            {showMoreActions && (
              <div className="absolute right-0 mt-1 w-56 bg-surface-container-lowest rounded shadow-lg p-1 z-20 border border-surface-container">
                {[
                  ["receipt_long", "Download Statement", "Downloading Statement PDF"],
                  ["account_balance_wallet", "View Accounting Ledger", "Opening Accounting Ledger"],
                  ["verified_user", "Quality Audit Dossier", "Opening Quality Audit Dossier"],
                ].map(([icon, label, msg]) => (
                  <button key={label} onClick={() => { showToast(msg, icon); setShowMoreActions(false); }} className="w-full text-left flex items-center gap-2 px-space-sm py-space-xs text-on-surface font-label-sm text-label-sm hover:bg-surface-container rounded transition-colors">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{icon}</span><span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => showToast("Edit modal ready", "edit_note")} className="h-10 px-space-md bg-surface-container-lowest text-primary-container font-label-md text-label-md rounded hover:bg-surface-container transition-colors shadow-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">edit_note</span><span>Edit Supplier Info</span>
          </button>
          <button onClick={() => showToast("Redirecting to PO Creator", "add_circle")} className="h-10 px-space-md bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-primary transition-colors shadow-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">add_circle</span><span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{k.label}</span>
                {k.unit ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-lg text-headline-lg text-primary font-semibold">{k.value}</span>
                    <span className="font-title-md text-title-md text-on-surface-variant">{k.unit}</span>
                  </div>
                ) : (
                  <div className={`font-headline-lg text-headline-lg font-semibold ${k.valueCls || "text-primary"}`}>{k.value}{k.dec && <span className="text-title-md font-normal">{k.dec}</span>}</div>
                )}
              </div>
              <div className={`w-10 h-10 rounded flex items-center justify-center ${k.iconBox}`}><span className="material-symbols-outlined text-[20px]">{k.icon}</span></div>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low px-space-sm py-1.5 rounded flex items-center justify-between text-body-sm">
              {k.left}<span className="text-on-surface-variant font-label-sm">{k.right}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-5 space-y-space-lg">
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm space-y-space-md">
            <div className="flex items-center justify-between pb-space-sm bg-surface-container-low px-space-sm py-2 rounded">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-secondary">badge</span><h2 className="font-title-md text-title-md text-primary">Commercial Contact &amp; Depo</h2></div>
              <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">Primary Account</span>
            </div>
            <div className="flex items-center gap-space-md p-space-sm rounded">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-headline-md font-semibold text-[18px]">RS</div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">Rakesh Sharma</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Senior Regional Distribution Manager</span>
                <span className="font-label-sm text-label-sm text-surface-tint flex items-center gap-1 mt-0.5"><span className="w-2 h-2 rounded-full bg-surface-tint"></span>Available (Dispensary Hours)</span>
              </div>
            </div>
            <div className="space-y-space-sm pt-space-xs text-body-sm">
              <div className="flex items-start gap-space-sm bg-surface-container-low p-space-sm rounded">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">call</span>
                <div className="flex flex-col"><span className="font-label-sm text-label-sm text-on-surface-variant">Direct Helpline</span><span className="font-medium text-on-surface">+91 98201 44821 <span className="text-outline-variant font-normal">|</span> +91 80 2847 9100</span></div>
              </div>
              <div className="flex items-start gap-space-sm bg-surface-container-low p-space-sm rounded">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">alternate_email</span>
                <div className="flex flex-col"><span className="font-label-sm text-label-sm text-on-surface-variant">Dispatch &amp; Billing Emails</span><span className="font-medium text-primary hover:underline cursor-pointer">supply@sunpharma-b2b.com</span><span className="text-on-surface-variant">billing.south@sunpharma.com</span></div>
              </div>
              <div className="flex items-start gap-space-sm bg-surface-container-low p-space-sm rounded">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">warehouse</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Registered Central Warehouse</span>
                  <span className="font-medium text-on-surface leading-snug">Plot 42-B, Jigani Industrial Area Phase II, Bengaluru, Karnataka - 560105</span>
                  <span className="text-surface-tint font-label-sm mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">distance</span>14.2 km from Central Dispensary</span>
                </div>
              </div>
            </div>

            <div className="pt-space-sm space-y-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Payment &amp; Financial Terms</span>
              <div className="bg-surface-container p-space-md rounded space-y-2">
                <div className="flex justify-between items-center text-body-sm"><span className="text-on-surface-variant font-medium">Standard Credit Terms</span><span className="font-label-md text-label-md text-primary bg-secondary-fixed/40 px-2 py-0.5 rounded font-semibold">Net 30 Days</span></div>
                <div className="flex justify-between items-center text-body-sm"><span className="text-on-surface-variant font-medium">Preferred Settlement</span><span className="text-on-surface font-medium">Direct NEFT / RTGS</span></div>
                <div className="bg-surface-container-lowest p-space-sm rounded text-body-sm space-y-1">
                  <div className="flex justify-between"><span className="text-outline text-label-sm">Bank Name</span><span className="font-medium text-on-surface">HDFC Bank Limited</span></div>
                  <div className="flex justify-between"><span className="text-outline text-label-sm">IFSC Code</span><span className="font-mono text-on-surface font-medium">HDFC0001248</span></div>
                  <div className="flex justify-between"><span className="text-outline text-label-sm">A/C Number</span><span className="font-mono text-on-surface font-medium">50200049281923</span></div>
                </div>
              </div>
            </div>

            <div className="pt-space-xs space-y-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Authorized Formulary Groups</span>
              <div className="flex flex-wrap gap-1.5">
                {["Schedule H Antibiotics", "Cardiac & Antidiabetics", "Critical Inhalers & Resp", "Cold-Chain Vaccines"].map((g) => (
                  <span key={g} className="bg-surface-container-high px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm">{g}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border-l-[3px] border-l-secondary space-y-2">
            <div className="flex items-center gap-2 text-secondary"><span className="material-symbols-outlined text-[20px]">thermostat</span><h3 className="font-title-md text-title-md text-primary font-serif">Cold-Chain Quality Protocol</h3></div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">All bi-weekly deliveries from this hub are equipped with TempTale data loggers (2°C - 8°C). Batch inspection logs automatically sync upon receiving into the MedCare quarantine dock.</p>
            <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-primary font-medium"><span className="material-symbols-outlined text-[16px] text-surface-tint">check_circle</span><span>Last TempLog Validated: Today, 08:30 AM (4.2°C)</span></div>
          </div>
        </div>

        {/* Ledger */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-space-lg space-y-space-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary tracking-tight font-serif">Procurement Ledger</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Complete record of invoices, physical consignments, and payables.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => showToast("Exporting Procurement Ledger CSV...", "file_download")} className="h-9 px-space-sm bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-[16px]">file_download</span><span>Export CSV</span></button>
                <button onClick={() => showToast("Syncing latest supplier EDI feed...", "refresh")} className="h-9 px-space-sm bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-[16px]">refresh</span><span>Sync</span></button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm pt-space-xs">
              <div className="sm:col-span-5 relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-surface-container-low rounded text-on-surface placeholder:text-outline text-body-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search PO, Invoice, Medicine..." type="text" />
              </div>
              <div className="sm:col-span-4 relative">
                <select className="w-full h-10 px-3 bg-surface-container-low rounded text-on-surface text-label-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
                  <option>Current Fiscal Year (24-25)</option><option>Last 30 Days</option><option>Last 90 Days</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant text-[18px] pointer-events-none">calendar_today</span>
              </div>
              <div className="sm:col-span-3 relative">
                <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="w-full h-10 px-3 bg-surface-container-low rounded text-on-surface text-label-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
                  <option value="all">Status: All</option><option value="unpaid">Unpaid</option><option value="paid">Paid</option><option value="partial">Partial</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant text-[18px] pointer-events-none">filter_list</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-space-md font-semibold">PO / Invoice #</th><th className="py-3 px-space-sm font-semibold">Order Date</th><th className="py-3 px-space-sm font-semibold">Consignment</th>
                  <th className="py-3 px-space-sm font-semibold text-right">Amount (₹)</th><th className="py-3 px-space-sm font-semibold text-center">Payment</th><th className="py-3 px-space-sm font-semibold text-center">Delivery</th><th className="py-3 px-space-md font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-on-surface">
                {rows.map((row) => (
                  <tr key={row.po} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-3.5 px-space-md"><div className="flex flex-col"><span className="font-title-md text-title-md text-primary font-semibold group-hover:text-surface-tint">{row.po}</span><span className="font-mono text-label-sm text-on-surface-variant">{row.inv}</span></div></td>
                    <td className="py-3.5 px-space-sm whitespace-nowrap"><div className="flex flex-col"><span className="font-medium">{row.date}</span><span className="text-outline text-label-sm">{row.due}</span></div></td>
                    <td className="py-3.5 px-space-sm"><div className="flex flex-col"><span className="font-medium text-on-surface">{row.consignment}</span><span className="text-on-surface-variant text-label-sm">{row.items}</span></div></td>
                    <td className="py-3.5 px-space-sm text-right whitespace-nowrap"><div className="flex flex-col items-end"><span className="font-title-md text-title-md font-semibold text-primary">{row.amount}</span>{row.balance && <span className="text-label-sm text-on-surface-variant">{row.balance}</span>}</div></td>
                    <td className="py-3.5 px-space-sm text-center"><span className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-0.5 rounded font-medium ${row.statusBadge}`}><span className="w-1.5 h-1.5 rounded-full bg-current"></span>{row.statusLabel}</span></td>
                    <td className="py-3.5 px-space-sm text-center"><span className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded ${row.deliveryBadge}`}><span className="material-symbols-outlined text-[14px]">{row.deliveryIcon}</span>{row.delivery}</span></td>
                    <td className="py-3.5 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {row.actionBtn && <button onClick={() => showToast(`Initiating payment for ${row.po}`, "payments")} className="h-8 px-2.5 bg-secondary text-on-secondary rounded font-label-sm text-label-sm hover:bg-on-secondary-container transition-colors shadow-sm">{row.actionBtn}</button>}
                        <button onClick={() => showToast(`Viewing PO & Invoice: ${row.po}`, "visibility")} className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="View PO & Invoice"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm text-on-surface-variant">
            <span>Showing <strong className="font-semibold text-on-surface">1 - {rows.length}</strong> of <strong className="font-semibold text-on-surface">34</strong> recorded orders</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded bg-primary-container text-on-primary font-label-sm font-semibold flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm flex items-center justify-center transition-colors">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-md">
          <div>
            <h3 className="font-title-md text-title-md text-primary font-serif">Active Cold-Chain Dispatch in Transit</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Consignment tracking for PO-2024-9842 (Dispatched 14 Oct, 06:15 AM)</p>
          </div>
          <span className="font-label-sm text-label-sm bg-[#E8F5E9] text-[#2E7D52] px-2.5 py-1 rounded flex items-center gap-1 font-semibold self-start"><span className="material-symbols-outlined text-[16px]">sensors</span>GPS &amp; Temp Beacon Active (4.2°C)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md pt-space-xs">
          <div className="p-space-sm bg-surface-container-low rounded space-y-1">
            <div className="flex items-center justify-between"><span className="font-label-sm text-label-sm text-surface-tint font-semibold">1. Manifest Packed</span><span className="material-symbols-outlined text-surface-tint text-[18px]">check_circle</span></div>
            <p className="font-body-sm text-body-sm text-on-surface">Jigani Depo Dock #4</p><span className="text-outline text-label-sm">14 Oct, 05:20 AM</span>
          </div>
          <div className="p-space-sm bg-surface-container-low rounded space-y-1">
            <div className="flex items-center justify-between"><span className="font-label-sm text-label-sm text-surface-tint font-semibold">2. Cold-Box Sealed</span><span className="material-symbols-outlined text-surface-tint text-[18px]">check_circle</span></div>
            <p className="font-body-sm text-body-sm text-on-surface">Temp logged: 3.8°C</p><span className="text-outline text-label-sm">14 Oct, 06:00 AM</span>
          </div>
          <div className="p-space-sm bg-surface-container-high rounded space-y-1">
            <div className="flex items-center justify-between"><span className="font-label-sm text-label-sm text-secondary font-semibold">3. Courier In Transit</span><span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span></div>
            <p className="font-body-sm text-body-sm text-on-surface font-medium">Van KA-05-MM-3104</p><span className="text-secondary font-label-sm font-semibold">ETA: ~45 mins (Electronic City)</span>
          </div>
          <div className="p-space-sm bg-surface-container-low/60 rounded space-y-1 opacity-70">
            <div className="flex items-center justify-between"><span className="font-label-sm text-label-sm text-outline font-semibold">4. Dispensary Inward</span><span className="material-symbols-outlined text-outline text-[18px]">schedule</span></div>
            <p className="font-body-sm text-body-sm text-on-surface">Pending Bay Inspection</p><span className="text-outline text-label-sm">Central Pharmacy Dock</span>
          </div>
        </div>
      </div>
    </div>
  );
}
