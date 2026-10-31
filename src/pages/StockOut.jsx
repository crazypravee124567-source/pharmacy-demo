import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

export default function StockOut() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [qty, setQty] = useState(295);

  const handleConfirm = () => {
    showToast(`Stock de-allocation of ${qty} strips logged under SO-2024-8842.`, "warning");
    setTimeout(() => navigate("/stock-ledger"), 800);
  };

  return (
    <div className="px-space-xl py-space-lg max-w-4xl mx-auto flex flex-col gap-space-lg">
      <div>
        <div className="flex items-center gap-space-sm mb-1 text-error text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-error"></span>
          <span>Regulatory Write-Off &amp; De-Allocation</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Stock Out</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Record medicine stock deductions for quarantine write-offs, damage de-allocation, or clinic use.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-xs border border-outline-variant/60 space-y-space-md">
        <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-title-md font-semibold text-primary">Augmentin 625 Duo</h3>
            <span className="text-xs text-on-surface-variant">Batch: AUG-24-089 (Bay A-04)</span>
          </div>
          <span className="text-xs bg-surface-container px-2 py-1 rounded font-mono font-medium">In-Stock: 320 strips</span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-on-surface">Quantity to Deduct (Strips) *</label>
          <div className="flex items-center gap-2 max-w-xs">
            <button onClick={() => setQty(Math.max(1, qty - 5))} className="w-10 h-10 rounded border bg-surface-container">-</button>
            <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full text-center py-2 font-mono text-lg font-bold border rounded-lg" />
            <button onClick={() => setQty(Math.min(320, qty + 5))} className="w-10 h-10 rounded border bg-surface-container">+</button>
          </div>
          <span className="text-xs text-on-surface-variant">= {(qty * 10).toLocaleString()} loose tablets</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Reason for Stock Out *</label>
          <select className="w-full py-2.5 px-3 rounded-lg border bg-surface-container-lowest text-sm">
            <option>Damaged / Packaging Compromised</option>
            <option>Expired Stock</option>
            <option>Internal Dispensary Use</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface mb-1">Mandatory Audit &amp; Disposal Notes *</label>
          <textarea className="w-full p-2.5 rounded-lg border text-sm" rows="3" defaultValue="Outer moisture seal compromised during transit from quarantine shelf Q-2. De-allocated per CDSCO disposal protocol." />
        </div>

        <div className="p-3 bg-error-container/40 rounded-lg flex items-start gap-2 border border-error/30 text-on-error-container text-xs">
          <span className="material-symbols-outlined text-error text-[20px]">warning</span>
          <span>Critical alert: Remaining inventory ({320 - qty} strips) will trigger auto-reorder threshold.</span>
        </div>

        <button type="button" onClick={handleConfirm} className="w-full bg-error hover:bg-on-error-container text-on-error py-3 rounded-lg font-label-lg shadow-sm transition-all">
          Confirm Stock Out ({qty} strips)
        </button>
      </div>
    </div>
  );
}
