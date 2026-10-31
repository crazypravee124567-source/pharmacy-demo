import { useToast } from "../context/ToastContext.jsx";

const topMedicines = [
  { name: "Augmentin 625 Duo", sales: "₹2,84,500.00", width: "100%" },
  { name: "Telma 40mg", sales: "₹1,92,400.00", width: "68%" },
  { name: "Glycomet-GP 2", sales: "₹1,68,200.00", width: "59%" },
  { name: "Pantocid 40mg", sales: "₹1,42,750.00", width: "50%" },
  { name: "Dolo 650mg", sales: "₹98,400.00", width: "35%" },
];

const bars = [45, 58, 38, 65, 72, 62, 54, 70, 64, 42, 92, 76, 82, 68];

const cards = [
  { label: "Reconciled Gross Revenue", chip: "+14.2% MoM", chipCls: "text-surface-tint bg-primary-fixed/40", value: "₹18,42,850.00", foot: [["Gross:", "₹19,10,200"], ["Discounts:", "₹67,350", "text-secondary"]] },
  { label: "Billed Transactions", chip: "+8.5% Vol", chipCls: "text-surface-tint bg-primary-fixed/40", value: "1,273", unit: "receipts", foot: [["Run Rate:", "53 Invoices/Day"], ["Returns:", "0.39%", "text-surface-tint"]] },
  { label: "Average Basket Value (AOV)", chip: "+5.2% target", chipCls: "text-secondary bg-secondary-fixed/50", value: "₹1,447.64", foot: [["Median:", "₹1,120.00"], ["Peak:", "₹18,450.00"]] },
];

export default function Reports() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-lg px-gutter max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-sm pt-space-md">
        <div className="space-y-space-xs max-w-2xl">
          <div className="flex items-center gap-space-xs text-secondary"><span className="material-symbols-outlined text-[18px]">verified_user</span><span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Clinical &amp; Statutory Business Intelligence</span></div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Reports &amp; Business Intelligence</h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Generate reconciled financial statements, formulary movement audits, and statutory GST taxation filings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => showToast("Exporting PDF report...", "picture_as_pdf")} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm text-on-surface font-label-md"><span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span><span>Export PDF</span></button>
          <button onClick={() => showToast("Exporting Excel sheet...", "table_view")} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm text-on-surface font-label-md"><span className="material-symbols-outlined text-[18px] text-surface-tint">table_view</span><span>Excel (.xlsx)</span></button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all shadow-sm font-label-md"><span className="material-symbols-outlined text-[18px]">print</span><span>Print Sheet</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">{c.label}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.chipCls}`}>{c.chip}</span>
            </div>
            <div className="font-headline-lg text-[28px] text-primary font-serif tracking-tight mt-2">{c.value} {c.unit && <span className="text-sm font-sans font-normal text-on-surface-variant">{c.unit}</span>}</div>
            <div className="mt-3 text-body-sm text-on-surface-variant flex justify-between border-t pt-2 border-surface-container">
              {c.foot.map(([l, v, cls]) => <span key={l}>{l} <strong className={cls}>{v}</strong></span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-title-md text-title-md text-primary font-semibold">Revenue Trend &amp; Dispensing Velocity</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Daily gross prescription vs. OTC revenue breakdown (Oct 11 – Oct 24)</p>
          </div>
          <div className="flex h-52 w-full items-end gap-2 pt-6 px-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div style={{ height: `${h}%` }} className={`w-full rounded-t transition-all ${i === 10 ? "bg-primary ring-2 ring-secondary" : "bg-primary-container hover:bg-surface-tint"}`}></div>
                <span className="text-[11px] text-on-surface-variant mt-1">{i + 11}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant border-t pt-2 mt-4">
            <span>Prescription Share: <strong className="text-primary font-semibold">77%</strong></span>
            <span>OTC Share: <strong className="text-secondary font-semibold">23%</strong></span>
            <span>Daily Avg: <strong className="font-mono">₹76,785.40</strong></span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
          <h2 className="font-title-md text-title-md text-primary font-semibold">Top Medicines by Revenue</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">5 primary formulations drive 42.8% of net turnover</p>
          <div className="space-y-3">
            {topMedicines.map((m, idx) => (
              <div key={m.name} className="space-y-1">
                <div className="flex justify-between items-baseline text-body-sm"><span className="font-semibold text-on-surface">{idx + 1}. {m.name}</span><span className="font-bold text-primary font-mono">{m.sales}</span></div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: m.width }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
