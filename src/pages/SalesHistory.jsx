import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

const sales = [
  { inv: "INV-2024-10892", customer: "Rajesh Mehta", phone: "+91 98112 34901", date: "24 Oct 2024, 04:45 PM", amount: "1,420.50", method: "UPI / QR", status: "PAID" },
  { inv: "INV-2024-10891", customer: "Walk-in Customer", phone: "+91 98201 44821", date: "24 Oct 2024, 04:12 PM", amount: "580.00", method: "Cash", status: "PAID" },
  { inv: "INV-2024-10890", customer: "Sita Devi Raman", phone: "+91 94443 19280", date: "24 Oct 2024, 02:30 PM", amount: "2,850.00", method: "Card", status: "RETURNED" },
  { inv: "INV-2024-10889", customer: "St. Jude Clinic Trust", phone: "Account: CR-88319", date: "24 Oct 2024, 11:15 AM", amount: "12,450.00", method: "Credit", status: "PENDING" },
];

const statusCls = {
  PAID: "bg-green-100 text-green-800",
  RETURNED: "bg-red-100 text-red-800",
  PENDING: "bg-amber-100 text-amber-800",
};

export default function SalesHistory() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState("ALL");
  const [modalInv, setModalInv] = useState(null);

  const filtered = sales.filter((s) => filter === "ALL" || s.status === filter);
  const selected = sales.find((s) => s.inv === modalInv);

  return (
    <div className="p-space-xl space-y-space-lg max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Sales History</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-0.5">Audit and manage pharmaceutical dispensing invoices, tax settlements, and return reconciliations.</p>
        </div>
        <button onClick={() => showToast("Register CSV exported", "file_download")} className="px-4 h-10 rounded-lg bg-surface-container-lowest text-primary border border-outline-variant text-sm font-medium flex items-center gap-1.5 shadow-xs">
          <span className="material-symbols-outlined text-[18px]">file_download</span><span>Export Register</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {["ALL", "PAID", "PENDING", "RETURNED"].map((st) => (
          <button key={st} onClick={() => setFilter(st)} className={`px-3 py-1 rounded-md text-xs font-semibold ${filter === st ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"}`}>{st}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs overflow-hidden">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface text-xs uppercase text-on-surface-variant border-b">
            <tr>
              <th className="py-3 px-4">Invoice No.</th><th className="py-3 px-4">Customer</th><th className="py-3 px-4">Date &amp; Time</th>
              <th className="py-3 px-4">Total Amount</th><th className="py-3 px-4">Payment</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/60">
            {filtered.map((s) => (
              <tr key={s.inv} className="hover:bg-surface-container-low/60">
                <td className="py-3.5 px-4 font-mono font-semibold text-primary cursor-pointer hover:underline" onClick={() => setModalInv(s.inv)}>{s.inv}</td>
                <td className="py-3.5 px-4"><div className="font-medium text-on-surface">{s.customer}</div><span className="text-xs text-on-surface-variant">{s.phone}</span></td>
                <td className="py-3.5 px-4 text-xs">{s.date}</td>
                <td className="py-3.5 px-4 font-bold font-serif">₹{s.amount}</td>
                <td className="py-3.5 px-4 text-xs">{s.method}</td>
                <td className="py-3.5 px-4"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusCls[s.status]}`}>{s.status}</span></td>
                <td className="py-3.5 px-4 text-right">
                  <button onClick={() => setModalInv(s.inv)} className="p-1 hover:text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-tertiary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-headline-md font-serif text-primary">{selected.inv}</h3>
              <button onClick={() => setModalInv(null)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="text-sm space-y-2">
              <p><strong>Patient:</strong> {selected.customer}</p>
              <p><strong>Amount:</strong> ₹{selected.amount} via {selected.method}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>
            <button onClick={() => { showToast("Thermal print queued."); setModalInv(null); }} className="w-full bg-primary text-on-primary py-2 rounded text-sm font-semibold">Print Thermal Bill</button>
          </div>
        </div>
      )}
    </div>
  );
}
