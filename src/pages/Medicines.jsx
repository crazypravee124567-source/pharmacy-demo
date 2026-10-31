import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const medicines = [
  { name: "Augmentin 625 Duo", desc: "Oral tablet", salt: "Amoxicillin 500mg + Clavulanic Acid 125mg", category: "Antibiotic", mfg: "GlaxoSmithKline", stock: 4, unit: "strips", price: "204.50", rx: true, status: "Active", isLow: true },
  { name: "Metformin 500mg SR", desc: "Sustained release tablet", salt: "Metformin Hydrochloride", category: "Antidiabetic", mfg: "USV Private Ltd", stock: 450, unit: "strips", price: "32.00", rx: true, status: "Active" },
  { name: "Paracetamol 650mg - Dolo", desc: "Oral caplet", salt: "Paracetamol", category: "Analgesic", mfg: "Micro Labs Ltd", stock: 1200, unit: "strips", price: "30.80", rx: false, status: "Active" },
  { name: "Pantocid 40mg", desc: "Enteric coated tablet", salt: "Pantoprazole", category: "Gastrointestinal", mfg: "Sun Pharma", stock: 120, unit: "strips", price: "155.00", rx: true, status: "Active" },
  { name: "Atorva 20mg", desc: "Film coated tablet", salt: "Atorvastatin Calcium", category: "Cardiovascular", mfg: "Zydus Cadila", stock: 280, unit: "strips", price: "198.00", rx: true, status: "Active" },
  { name: "Azithral 500mg", desc: "Oral tablet", salt: "Azithromycin", category: "Antibiotic", mfg: "Alembic Pharma", stock: 0, unit: "strips", price: "125.00", rx: true, status: "Inactive", outOfStock: true },
  { name: "Lantus SoloStar 100IU/ml", desc: "Injectable cartridge", salt: "Insulin Glargine", category: "Antidiabetic", mfg: "Sanofi India", stock: 2, unit: "vials", price: "1,120.00", rx: true, status: "Active", isLow: true },
  { name: "Cetirizine 10mg", desc: "Film coated tablet", salt: "Cetirizine Dihydrochloride", category: "Antiallergic", mfg: "Cipla Ltd", stock: 840, unit: "strips", price: "18.50", rx: false, status: "Active" },
  { name: "Telma 40mg", desc: "Oral tablet", salt: "Telmisartan", category: "Cardiovascular", mfg: "Glenmark Pharma", stock: 310, unit: "strips", price: "112.00", rx: true, status: "Active" },
  { name: "Montair-LC", desc: "Chewable tablet", salt: "Montelukast 10mg + Levocetirizine 5mg", category: "Respiratory", mfg: "Cipla Ltd", stock: 195, unit: "strips", price: "182.00", rx: true, status: "Active" },
];

export default function Medicines() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const q = search.toLowerCase();
  const filtered = medicines.filter(
    (m) =>
      (selectedCategory === "All" || m.category === selectedCategory) &&
      (m.name.toLowerCase().includes(q) || m.salt.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto p-6 md:p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-semibold text-[#1d1d1f] tracking-tight">
            Formulary Medicines
          </h1>
          <p className="text-[13px] text-[#86868b] mt-0.5 max-w-2xl">
            Comprehensive pharmaceutical formulary, active inventory &amp; regulatory dispensing controls
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-black/[0.06] rounded-full text-[12px] shadow-xs">
            <span>SKUs: <strong className="text-[#1d1d1f]">1,482</strong></span>
            <span className="text-black/10">•</span>
            <span className="text-apple-green font-medium">Active: 1,420</span>
            <span className="text-black/10">•</span>
            <span className="text-apple-orange font-medium">Low stock: 18</span>
          </div>

          <button
            onClick={() => showToast("Exporting formulary CSV...", "file_download")}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#1d1d1f] rounded-full border border-black/[0.08] hover:bg-black/[0.02] transition-colors shadow-xs text-[13px] font-medium apple-press"
          >
            <span className="material-symbols-outlined text-[17px]">file_download</span>
            <span>Export</span>
          </button>

          <button
            onClick={() => navigate("/medicines/add")}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full transition-all shadow-[0_2px_8px_rgba(0,113,227,0.3)] text-[13px] font-medium apple-press"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="apple-card p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b] text-[18px]">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-black/[0.03] rounded-xl text-[13.5px] text-[#1d1d1f] placeholder-[#86868b] border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
            placeholder="Search by brand name, active salt, or classification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3.5 bg-black/[0.03] rounded-xl text-[12.5px] text-[#1d1d1f] font-medium border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-apple-blue/20 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Antibiotic">Antibiotics</option>
            <option value="Cardiovascular">Cardiovascular</option>
            <option value="Antidiabetic">Antidiabetic</option>
            <option value="Analgesic">Analgesic</option>
          </select>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="apple-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px] text-[13px]">
            <thead>
              <tr className="bg-black/[0.02] text-[#86868b] text-[11.5px] uppercase tracking-wider border-b border-black/[0.04]">
                <th className="py-3 px-4 font-semibold">Medicine Name</th>
                <th className="py-3 px-4 font-semibold">Generic Salt</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Manufacturer</th>
                <th className="py-3 px-4 font-semibold">Available Qty</th>
                <th className="py-3 px-4 font-semibold text-right">Selling Price</th>
                <th className="py-3 px-4 font-semibold text-center">Rx Reg.</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filtered.map((med) => (
                <tr key={med.name} className="hover:bg-black/[0.015] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-apple-blue/10 text-apple-blue flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[17px]">pill</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1d1d1f] leading-snug">{med.name}</span>
                        <span className="text-[11px] text-[#86868b]">{med.desc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#6e6e73] text-[12px]">{med.salt}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[11px] text-[#6e6e73] font-medium">
                      {med.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#86868b] text-[12px]">{med.mfg}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          med.outOfStock
                            ? "bg-apple-red"
                            : med.isLow
                            ? "bg-apple-orange"
                            : "bg-apple-green"
                        }`}
                      ></span>
                      <span
                        className={`font-semibold text-[12px] ${
                          med.outOfStock
                            ? "text-apple-red"
                            : med.isLow
                            ? "text-apple-orange"
                            : "text-[#1d1d1f]"
                        }`}
                      >
                        {med.stock} {med.unit}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-[#1d1d1f]">
                    ₹{med.price}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {med.rx ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-apple-purple/10 text-apple-purple text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[13px]">prescriptions</span>
                        Rx
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-black/[0.04] text-[#86868b] text-[11px] font-medium">
                        OTC
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        med.status === "Active"
                          ? "bg-apple-green/10 text-apple-green"
                          : "bg-black/[0.04] text-[#86868b]"
                      }`}
                    >
                      {med.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => showToast(`Viewing details for ${med.name}`)}
                        className="p-1.5 text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04] rounded-lg transition-colors apple-press"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button
                        onClick={() => navigate("/medicines/add")}
                        className="p-1.5 text-[#86868b] hover:text-apple-blue hover:bg-apple-blue/10 rounded-lg transition-colors apple-press"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
