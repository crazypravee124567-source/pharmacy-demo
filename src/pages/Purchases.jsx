import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

export default function Purchases() {
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col w-full px-space-xl py-space-lg space-y-space-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Purchases</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">Manage B2B supplier purchase orders, track incoming pharma consignments, and reconcile invoice payments.</p>
        </div>
        <button onClick={() => showToast("PO form opened", "add_circle")} className="h-10 px-4 bg-primary-container text-on-primary rounded font-label-md flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">add_circle</span><span>New Purchase Order</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded shadow-xs border overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
            <tr>
              <th className="py-3 px-3 w-10"></th>
              <th className="py-3 px-4">PO &amp; Invoice</th>
              <th className="py-3 px-4">Supplier</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4 text-right">Total Amount</th>
              <th className="py-3 px-4 text-center">Fulfillment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            <tr className="hover:bg-surface-container-low/40 cursor-pointer" onClick={() => setExpanded(!expanded)}>
              <td className="py-3 px-3 text-center"><span className="material-symbols-outlined text-[18px]">{expanded ? "keyboard_arrow_down" : "keyboard_arrow_right"}</span></td>
              <td className="py-3 px-4 font-bold text-primary font-mono">PO-2024-9842</td>
              <td className="py-3 px-4 font-medium">Sun Pharma Distributors</td>
              <td className="py-3 px-4 text-xs">24 Oct 2024</td>
              <td className="py-3 px-4 text-right font-mono font-bold">₹1,48,250.00</td>
              <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-800 font-semibold">Received</span></td>
            </tr>
            {expanded && (
              <tr className="bg-surface-container-low/50">
                <td colSpan="6" className="p-4">
                  <div className="bg-surface-container-lowest p-3 rounded border text-xs space-y-2">
                    <div className="font-bold text-primary">Consignment Breakdown — Box 03 / Lot AUG-24-089</div>
                    <div className="grid grid-cols-3 gap-2 text-on-surface-variant">
                      <div>• Augmentin 625 Duo: 200 strips</div>
                      <div>• Dolo 650mg: 150 strips</div>
                      <div>• Pantocid 40mg: 50 strips</div>
                    </div>
                    <div className="pt-2 border-t flex justify-end gap-2">
                      <button onClick={() => showToast("Barcode stickers sent to thermal spool.")} className="px-3 py-1 bg-surface-container rounded text-xs font-semibold">Print Barcode Labels</button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
