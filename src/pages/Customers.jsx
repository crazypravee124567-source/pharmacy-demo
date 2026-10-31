import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const chronic = "bg-primary-fixed text-on-primary-fixed";
const plain = "bg-surface-container text-on-surface-variant";

const patients = [
  { id: "#CUST-1042", initials: "RM", name: "Rajesh Mehta", tag: "Chronic Care - Diab/HTN", tagBg: chronic, phone: "+91 98112 34901", email: "rajesh.mehta@gmail.com", registered: "14 Jan 2023", ago: "22 mos ago", orders: "28 orders", spend: "₹34,850 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "chronic" },
  { id: "#CUST-1108", initials: "SN", name: "Sunita Nair", tag: "Verified Rx", tagBg: plain, phone: "+91 99182 34112", email: "sunita.nair@outlook.com", registered: "08 Mar 2023", ago: "20 mos ago", orders: "19 orders", spend: "₹18,400 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "walkin" },
  { id: "#CUST-0894", initials: "VS", name: "Dr. Vinay Saxena", tag: "Clinic Credit Line", tagBg: "bg-secondary-fixed text-on-secondary-fixed", phone: "+91 94551 88204", email: "dr.vinay.saxena@apollo.org", registered: "11 May 2023", ago: "18 mos ago", orders: "42 orders", spend: "₹78,250 lifetime spend", balance: "₹4,200.00 Clinic Credit", isSettled: false, type: "credit" },
  { id: "#CUST-1340", initials: "PK", name: "Pooja Kulkarni", tag: "General Walk-in", tagBg: plain, phone: "+91 97401 22891", email: "pooja.k@techmail.com", registered: "22 Nov 2023", ago: "12 mos ago", orders: "12 orders", spend: "₹14,920 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "walkin" },
  { id: "#CUST-1492", initials: "FP", name: "Farida Parveen", tag: "Chronic Care - Thyroid", tagBg: chronic, phone: "+91 94220 88102", email: "farida.parveen@yahoo.com", registered: "04 Feb 2024", ago: "9 mos ago", orders: "15 orders", spend: "₹21,300 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "chronic" },
  { id: "#CUST-1571", initials: "AR", name: "Amitabha Roy", tag: "General Walk-in", tagBg: plain, phone: "+91 98300 23145", email: "amitabha.roy@gmail.com", registered: "19 Apr 2024", ago: "7 mos ago", orders: "9 orders", spend: "₹9,450 lifetime spend", balance: "₹1,250.00 Due", isSettled: false, type: "walkin" },
  { id: "#CUST-1688", initials: "SR", name: "Sita Devi Raman", tag: "Chronic Care - Cardiac", tagBg: chronic, phone: "+91 94443 19280", email: "sita.raman@gmail.com", registered: "02 Jul 2024", ago: "4 mos ago", orders: "7 orders", spend: "₹8,650 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "chronic" },
  { id: "#CUST-1750", initials: "DV", name: "Deepak Verma", tag: "General Walk-in", tagBg: plain, phone: "+91 99201 11487", email: "deepak.v@rediffmail.com", registered: "15 Aug 2024", ago: "3 mos ago", orders: "4 orders", spend: "₹3,200 lifetime spend", balance: "₹0.00 Settled", isSettled: true, type: "walkin" },
];

const kpis = [
  { label: "Total Patients", icon: "groups", iconCls: "text-primary-container", value: "1,842", chip: "+54 this month", chipIcon: "trending_up", chipCls: "bg-primary-fixed text-on-primary-fixed font-semibold", foot: "Active registry across all branches" },
  { label: "Active Prescriptions", icon: "prescriptions", iconCls: "text-secondary", value: "628", chip: "Schedule H on file", chipCls: "bg-surface-container text-on-surface-variant", foot: "38 pending refill review in 48h" },
  { label: "Chronic Care Enrolled", icon: "cardiology", iconCls: "text-surface-tint", value: "312", chip: "94.2% adherence", chipCls: "bg-primary-fixed-dim/40 text-on-primary-fixed-variant font-medium", foot: "Diabetes, HTN & Cardiac cohorts" },
  { label: "Outstanding Credit", icon: "account_balance_wallet", iconCls: "text-error", value: "₹42,650.00", chip: "14 Accounts", chipCls: "bg-error-container text-on-error-container font-semibold", foot: "Due across clinic & personal tabs" },
];

const selectCls = "w-full h-10 pl-9 pr-8 rounded bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm cursor-pointer transition-all";

export default function Customers() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase();
  const filtered = patients.filter(
    (p) => (categoryFilter === "all" || p.type === categoryFilter) && (q === "" || p.name.toLowerCase().includes(q) || p.phone.includes(searchQuery) || p.id.toLowerCase().includes(q))
  );

  return (
    <div className="flex flex-col w-full px-space-xl py-space-lg gap-space-lg max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-space-xs">
        <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <Link to="/dashboard" className="hover:text-primary transition-colors">MedCare</Link>
          <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
          <span>Customers</span>
          <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
          <span className="font-semibold text-primary">Customer Registry</span>
        </nav>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pt-space-xs">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">Customers Registry</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage patient profiles, clinical dispensing history, prescription adherence, and account balances.</p>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">
            <button onClick={() => showToast("Directory CSV exported", "file_download")} className="inline-flex items-center gap-2 h-10 px-4 rounded bg-surface-container-lowest text-primary-container font-label-md hover:bg-surface-container transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">file_download</span><span>Export Directory (CSV)</span>
            </button>
            <button onClick={() => showToast("Add customer form opened", "person_add")} className="inline-flex items-center gap-2 h-10 px-4 rounded bg-primary-container text-on-primary font-label-md hover:bg-primary transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person_add</span><span>Add Customer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">{k.label}</span>
              <div className={`w-8 h-8 rounded bg-surface-container-low flex items-center justify-center ${k.iconCls}`}><span className="material-symbols-outlined text-[18px]">{k.icon}</span></div>
            </div>
            <div className="mt-3 flex items-baseline gap-2 flex-wrap">
              <span className="font-display text-display font-serif text-on-surface leading-none">{k.value}</span>
              <span className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded ${k.chipCls}`}>
                {k.chipIcon && <span className="material-symbols-outlined text-[12px]">{k.chipIcon}</span>}{k.chip}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{k.foot}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-10 pl-10 pr-4 rounded bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" placeholder="Search by customer name, phone number, patient ID (#CUST-)..." type="text" />
          </div>
          <div className="md:col-span-3 relative">
            <select className={selectCls}><option>Registered: All Time</option><option>Registered: This Year (2024)</option><option>Last 90 Days</option></select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">calendar_today</span>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
          </div>
          <div className="md:col-span-2 relative">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectCls}>
              <option value="all">All Patients</option><option value="chronic">Chronic Care</option><option value="walkin">General Walk-in</option><option value="credit">Credit Account</option>
            </select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">filter_list</span>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
          </div>
          <div className="md:col-span-2 relative">
            <select className={selectCls}><option>Sort: Recently Active</option><option>Highest Lifetime Spend</option><option>Highest Balance Due</option></select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">sort</span>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                <th className="py-3 px-4 font-semibold">Patient &amp; ID</th><th className="py-3 px-4 font-semibold">Phone</th><th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Registered</th><th className="py-3 px-4 font-semibold">Dispensing History</th><th className="py-3 px-4 font-semibold text-right">Account Balance</th><th className="py-3 px-4 font-semibold text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {filtered.map((p, idx) => (
                <tr key={p.id} onClick={() => navigate("/customers/detail")} className={`hover:bg-surface-container-low/50 transition-colors cursor-pointer ${idx % 2 === 1 ? "bg-surface-container-low/20" : "bg-surface-container-lowest"}`}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-serif text-primary font-bold text-sm shrink-0">{p.initials}</div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold text-on-surface tracking-tight truncate hover:text-primary transition-colors">{p.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-body-sm text-body-sm text-outline">{p.id}</span>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${p.tagBg}`}>{p.tag}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-label-md text-label-md whitespace-nowrap">{p.phone}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant whitespace-nowrap">{p.email}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap"><div className="flex flex-col"><span className="font-label-md text-label-md">{p.registered}</span><span className="font-body-sm text-body-sm text-outline">{p.ago}</span></div></td>
                  <td className="py-3.5 px-4 whitespace-nowrap"><div className="flex flex-col"><span className="font-title-md text-title-md font-semibold">{p.orders}</span><span className="font-body-sm text-body-sm text-on-surface-variant">{p.spend}</span></div></td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {p.isSettled ? (
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded bg-primary-fixed/40 text-surface-tint font-medium"><span className="material-symbols-outlined text-[13px]">check_circle</span>{p.balance}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold"><span className="material-symbols-outlined text-[13px]">pending</span>{p.balance}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => navigate("/customers/detail")} className="px-2.5 py-1 rounded hover:bg-surface-container font-label-sm text-label-sm text-primary font-semibold transition-colors">View</button>
                      <button onClick={() => showToast(`Edit patient: ${p.name}`, "edit")} className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Edit patient"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span className="text-on-surface-variant font-body-sm">Showing <strong className="text-on-surface font-semibold">1 to {filtered.length}</strong> of <strong className="text-on-surface font-semibold">1,842</strong> patients</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded bg-primary-container text-on-primary font-label-sm font-semibold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded hover:bg-surface-container font-label-sm text-on-surface flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded hover:bg-surface-container font-label-sm text-on-surface flex items-center justify-center">3</button>
          </div>
        </div>
      </div>

      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-surface-container-highest flex items-center justify-center text-surface-tint shrink-0"><span className="material-symbols-outlined text-[20px]">shield_person</span></div>
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-on-surface font-semibold">DPDP Act 2023 &amp; Pharmacy Data Governance</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Patient health &amp; prescription records encrypted at rest with CDSCO Schedule H recordkeeping safeguards. Audit logs maintained for 3 years.</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-medium shrink-0"><span className="material-symbols-outlined text-[14px] text-surface-tint">verified</span>Encrypted AES-256</span>
      </div>
    </div>
  );
}
