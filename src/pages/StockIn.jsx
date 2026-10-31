import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function StockIn() {
  const { showToast } = useToast();
  const [items, setItems] = useState([
    { name: "Augmentin 625 Duo", batch: "AUG-24-112", exp: "2025-12-15", qty: 50, unit: "Strips", rate: 168.0, gst: 12 },
    { name: "Metformin 500mg SR", batch: "MET-24-510", exp: "2024-12-28", qty: 100, unit: "Strips", rate: 22.5, gst: 12 },
    { name: "Lantus SoloStar 100IU/ml", batch: "LAN-24-032", exp: "2026-03-30", qty: 20, unit: "Vials", rate: 580.0, gst: 5 },
  ]);

  const subtotal = items.reduce((acc, it) => acc + it.qty * it.rate, 0);
  const totalTax = items.reduce((acc, it) => acc + (it.qty * it.rate * it.gst) / 100, 0);
  const grandTotal = subtotal + totalTax;

  const handleAdd = () => {
    showToast("Telmisartan 40mg added to consignment!");
    setItems([...items, { name: "Telmisartan 40mg", batch: "TEL-24-904", exp: "2026-07-31", qty: 40, unit: "Strips", rate: 45.0, gst: 12 }]);
  };

  return (
    <div className="px-margin py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Stock In</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">Record incoming pharmaceutical consignments, verify lot numbers against manufacturer certificates, and reconcile invoices.</p>
        </div>
        <span className="font-mono text-sm bg-surface-container px-3 py-1.5 rounded font-bold text-primary">#SI-9481</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col gap-space-md border border-outline-variant/50">
            <h2 className="font-title-md text-title-md text-primary font-semibold">Consignment Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Distributor / Stockist</label>
                <select className="w-full bg-surface-container-low rounded-lg py-2 px-3 text-sm">
                  <option>Apex Healthcare Distributors Pvt Ltd</option>
                  <option>Sun Bio-Pharma Logistics LLP</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-on-surface-variant font-medium block mb-1">Invoice Reference</label>
                <input className="w-full bg-surface-container-low rounded-lg py-2 px-3 text-sm font-mono" defaultValue="INV-2024-09842" />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/50 overflow-hidden">
            <div className="p-space-md flex items-center justify-between border-b border-surface-container">
              <span className="font-title-md text-title-md text-primary font-semibold">Consignment Line Items ({items.length})</span>
              <button onClick={handleAdd} className="text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded">+ Add Item Pre-fill</button>
            </div>
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
                <tr>
                  <th className="py-2.5 px-3">Medicine &amp; Batch</th>
                  <th className="py-2.5 px-3">Expiry</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {items.map((it, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-primary">{it.name}</div>
                      <span className="font-mono text-[11px] text-on-surface-variant">Lot: {it.batch}</span>
                    </td>
                    <td className="py-2.5 px-3 text-xs">{it.exp}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{it.qty} {it.unit}</td>
                    <td className="py-2.5 px-3 text-right font-mono">₹{it.rate.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">₹{(it.qty * it.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-lg shadow-xs flex flex-col gap-space-md border border-outline-variant/50">
          <h3 className="font-headline-md text-headline-md text-primary font-serif">Consignment Summary</h3>
          <div className="space-y-2 text-sm text-on-surface-variant border-b border-surface-container pb-3">
            <div className="flex justify-between"><span>Taxable Value (Subtotal):</span><span className="font-mono font-medium text-on-surface">₹{fmt(subtotal)}</span></div>
            <div className="flex justify-between"><span>Total GST:</span><span className="font-mono text-on-surface">₹{fmt(totalTax)}</span></div>
          </div>
          <div className="flex justify-between items-baseline pt-1">
            <span className="font-semibold text-primary">Grand Payable:</span>
            <span className="font-display text-2xl font-bold text-primary font-mono">₹{fmt(grandTotal)}</span>
          </div>
          <button onClick={() => showToast("Consignment #SI-9481 successfully committed to Central Inventory.", "inventory_2")} className="w-full bg-primary hover:bg-primary-container text-on-primary py-3 rounded-lg font-label-lg shadow-sm transition-all">
            Save &amp; Post Inward Stock
          </button>
        </div>
      </div>
    </div>
  );
}
