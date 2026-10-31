import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const suppliers = [
  { name: "Sun Pharma Distributors Ltd", wdl: "WDL-MH-4019", gstin: "27AABCS1429B1Z4", contact: "Rakesh Sharma", phone: "+91 98201 44821", city: "Mumbai, MH", balance: "4,28,910.00" },
  { name: "Cipla Direct Logistics Hub", wdl: "WDL-KA-8821", gstin: "29AABCC2156K1Z9", contact: "Priya Venkatesh", phone: "+91 99402 11874", city: "Bengaluru, KA", balance: "3,15,400.00" },
  { name: "Abbott Healthcare Pvt Ltd", wdl: "WDL-GJ-5512", gstin: "24AAACA3876N1ZZ", contact: "Mihir Parikh", phone: "+91 97129 88301", city: "Ahmedabad, GJ", balance: "2,44,720.00" },
  { name: "Mankind Pharma Distribution", wdl: "WDL-TS-3109", gstin: "36AABCM8892P1ZF", contact: "K. Venkat Rao", phone: "+91 94405 67120", city: "Hyderabad, TS", balance: "1,88,320.00" },
];

export default function Suppliers() {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();
  const filtered = suppliers.filter(
    (s) => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.gstin.toLowerCase().includes(q)
  );

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Suppliers</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage pharmaceutical suppliers, drug manufacturing partners, and procurement terms.</p>
        </div>
        <button onClick={() => showToast("New supplier modal initiated", "store")} className="h-10 px-space-lg rounded bg-primary-container text-on-primary font-label-md flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span><span>Add Supplier</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-3 shadow-xs border">
        <input className="w-full bg-surface-container-low py-2 px-3 rounded text-sm outline-none" placeholder="Search supplier, contact, city, GSTIN..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-surface-container-lowest rounded-lg shadow-xs overflow-hidden border">
        <table className="w-full text-left text-body-sm">
          <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
            <tr>
              <th className="py-3 px-4">Supplier &amp; Compliance</th><th className="py-3 px-4">Contact</th><th className="py-3 px-4">Direct Communication</th>
              <th className="py-3 px-4">Hub Location</th><th className="py-3 px-4 text-right">Outstanding Ledger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {filtered.map((s) => (
              <tr key={s.wdl} className="hover:bg-surface-container-low/50">
                <td className="py-3 px-4">
                  <Link to="/suppliers/detail" className="font-semibold text-primary hover:underline">{s.name}</Link>
                  <div className="text-[11px] text-on-surface-variant">{s.wdl} • {s.gstin}</div>
                </td>
                <td className="py-3 px-4 text-xs">{s.contact}</td>
                <td className="py-3 px-4 font-mono text-xs">{s.phone}</td>
                <td className="py-3 px-4 text-xs">{s.city}</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-primary">₹{s.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
