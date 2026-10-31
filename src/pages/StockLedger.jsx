import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

export default function StockLedger() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { showToast } = useToast();

  return (
    <div className="px-space-xl pt-space-lg pb-space-sm space-y-space-md">
      <div className="flex items-start justify-between gap-space-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Stock Ledger</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Complete immutable chronological record of all pharmaceutical stock movements and regulatory audit chains.</p>
        </div>
        <button onClick={() => showToast("Exporting ledger CSV...", "file_download")} className="h-10 px-4 rounded bg-primary text-on-primary text-sm flex items-center gap-1.5 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">file_download</span><span>Export CSV</span>
        </button>
      </div>

      <div className="flex gap-space-lg items-start relative">
        <div className="flex-1 bg-surface-container-lowest rounded shadow-xs border border-outline-variant/60 overflow-hidden">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
              <tr>
                <th className="py-3 px-3">Date &amp; Time</th><th className="py-3 px-4">Medicine</th><th className="py-3 px-3">Batch</th>
                <th className="py-3 px-3">Movement</th><th className="py-3 px-3 text-right">Qty</th><th className="py-3 px-4 text-right">Balance</th><th className="py-3 px-4">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              <tr onClick={() => setDrawerOpen(true)} className="bg-secondary-fixed/20 hover:bg-secondary-fixed/30 cursor-pointer">
                <td className="py-3 px-3">24 Oct 2024, 11:28 AM</td>
                <td className="py-3 px-4 font-semibold text-primary">Augmentin 625 Duo</td>
                <td className="py-3 px-3 font-mono text-xs">AUG-24-089</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-error-container text-on-error-container">Stock Out</span></td>
                <td className="py-3 px-3 text-right font-mono text-error font-bold">-295 str</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-error">25 str</td>
                <td className="py-3 px-4 font-mono text-xs text-secondary">SO-2024-8842</td>
              </tr>
              <tr onClick={() => setDrawerOpen(true)} className="hover:bg-surface-container-low cursor-pointer">
                <td className="py-3 px-3">24 Oct 2024, 09:14 AM</td>
                <td className="py-3 px-4 font-semibold text-primary">Augmentin 625 Duo</td>
                <td className="py-3 px-3 font-mono text-xs">AUG-24-089</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-on-primary-fixed">Stock In</span></td>
                <td className="py-3 px-3 text-right font-mono text-surface-tint font-bold">+300 str</td>
                <td className="py-3 px-4 text-right font-mono font-bold">320 str</td>
                <td className="py-3 px-4 font-mono text-xs text-secondary">GRN-2024-09842</td>
              </tr>
            </tbody>
          </table>
        </div>

        {drawerOpen && (
          <aside className="w-[400px] shrink-0 bg-surface-container-lowest rounded shadow-lg border border-outline-variant/60 p-space-md space-y-space-md">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-title-md text-primary font-bold">Transaction Audit Detail</h3>
              <button onClick={() => setDrawerOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-3 bg-error-container/30 rounded-lg">
              <span className="text-xs uppercase font-bold text-error">Quarantine Write-off</span>
              <div className="font-mono text-lg font-bold text-primary">SO-2024-8842</div>
              <span className="text-xs text-on-surface-variant">24 Oct 2024, 11:28 AM</span>
            </div>
            <div className="text-sm space-y-1">
              <div><strong>Medicine:</strong> Augmentin 625 Duo</div>
              <div><strong>Batch:</strong> AUG-24-089 (Bay A-04)</div>
              <div><strong>Inspector:</strong> Dr. Arthur Pendelton</div>
              <div className="font-mono text-[11px] text-on-surface-variant break-all mt-2 p-2 bg-surface-container rounded">
                SHA256: 8f9a2e31ccb144b1c87291aa4b901fc87102eac389a0129a391ef4172bb01c89
              </div>
            </div>
            <button onClick={() => showToast("Audit voucher verified and sealed.")} className="w-full bg-primary text-on-primary py-2 rounded text-sm font-semibold">Verify Audit Stamp</button>
          </aside>
        )}
      </div>
    </div>
  );
}
