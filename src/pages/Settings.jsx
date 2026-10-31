import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

export default function Settings() {
  const { showToast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [activeTab, setActiveTab] = useState("shop-details");

  return (
    <div className="w-full max-w-[1320px] mx-auto p-6 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-[#86868b] mb-1">
            <Link to="/dashboard" className="hover:text-apple-blue font-medium">MedCare</Link>
            <span>/</span>
            <span>System</span>
            <span>/</span>
            <span className="text-[#1d1d1f] font-medium">Settings &amp; Configuration</span>
          </div>
          <h1 className="text-[26px] font-semibold text-[#1d1d1f] tracking-tight">
            System Settings
          </h1>
          <p className="text-[13px] text-[#86868b] mt-0.5">
            Manage dispensary legal profile, statutory compliance, offline POS edge sync &amp; security policies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-apple-green/10 text-apple-green flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-pulse"></span>
            Central Registry Connected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left macOS style settings navigation sidebar */}
        <aside className="lg:col-span-3 sticky top-24 space-y-1">
          <div className="apple-card p-2 space-y-1">
            {[
              { id: "shop-details", label: "Shop & Licenses", icon: "storefront", color: "text-apple-blue bg-apple-blue/10" },
              { id: "security", label: "Security & MFA", icon: "security", color: "text-apple-green bg-apple-green/10" },
              { id: "sync", label: "Offline POS Sync", icon: "cloud_sync", color: "text-apple-purple bg-apple-purple/10" },
              { id: "compliance", label: "Statutory CDSCO", icon: "verified", color: "text-apple-orange bg-apple-orange/10" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all apple-press ${
                  activeTab === tab.id
                    ? "bg-apple-blue text-white shadow-sm"
                    : "text-[#3a3a3c] hover:bg-black/[0.04]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    activeTab === tab.id ? "bg-white/20 text-white" : tab.color
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
                </div>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content Panels */}
        <div className="lg:col-span-9 space-y-6 min-w-0">
          {/* Section: Shop & Licenses */}
          <section className="apple-card overflow-hidden">
            <div className="px-6 py-4 border-b border-black/[0.05] bg-black/[0.01]">
              <h2 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                Dispensary Master &amp; Statutory Licenses
              </h2>
              <p className="text-[12px] text-[#86868b] mt-0.5">
                Official entity details registered with state drug control authority
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
                <span className="text-[11.5px] font-medium text-[#86868b] block">Registered Dispensary Entity</span>
                <span className="text-[14px] font-semibold text-[#1d1d1f] block mt-1">
                  MedCare Central Dispensary Pvt Ltd
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
                <span className="text-[11.5px] font-medium text-[#86868b] block">Pharmacy Drug License</span>
                <span className="text-[14px] font-semibold text-[#1d1d1f] block mt-1 font-mono">
                  KA-BLR-2024-884 (Form 20B, 21B)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
                <span className="text-[11.5px] font-medium text-[#86868b] block">GSTIN Identification</span>
                <span className="text-[14px] font-semibold text-[#1d1d1f] block mt-1 font-mono">
                  29AABCM1429K1Z5
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
                <span className="text-[11.5px] font-medium text-[#86868b] block">Pharmacist-in-Charge</span>
                <span className="text-[14px] font-semibold text-[#1d1d1f] block mt-1">
                  Dr. Arthur Pendelton (Reg #KA-94281)
                </span>
              </div>
            </div>
          </section>

          {/* Section: Security & Multi-Factor Auth */}
          <section className="apple-card overflow-hidden">
            <div className="px-6 py-4 border-b border-black/[0.05] bg-black/[0.01] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                  Security &amp; Pharmacist Multi-Factor Auth
                </h2>
                <p className="text-[12px] text-[#86868b] mt-0.5">
                  CDSCO Schedule X biometric &amp; step-up verification protocols
                </p>
              </div>

              {/* iOS Style Physical Spring Switch Toggle */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => {
                    setTwoFactorEnabled(e.target.checked);
                    showToast(e.target.checked ? "2FA verification enabled" : "2FA verification disabled");
                  }}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-black/[0.12] rounded-full peer peer-checked:bg-apple-green transition-all duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:shadow-md after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-apple-blue/5 border border-apple-blue/15 text-[13px] text-[#1d1d1f] leading-relaxed">
                <strong className="text-apple-blue">Mandatory Step-Up Protocol:</strong> Two-factor auth is strictly invoked when dispensing Schedule H, H1, or NDPS (Narcotic) class drugs to maintain an immutable audit trail.
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => showToast("Security policies updated successfully", "security")}
                  className="px-5 py-2 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13px] font-medium shadow-sm transition-all apple-press"
                >
                  Save Security Policies
                </button>
              </div>
            </div>
          </section>

          {/* Section: Offline POS Sync */}
          <section className="apple-card overflow-hidden">
            <div className="px-6 py-4 border-b border-black/[0.05] bg-black/[0.01] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                  Offline POS Edge Cache &amp; Synchronization
                </h2>
                <p className="text-[12px] text-[#86868b] mt-0.5">
                  Local SQLite edge cache keeps dispensary running without internet
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-black/[0.12] rounded-full peer peer-checked:bg-apple-blue transition-all duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:shadow-md after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#1d1d1f]">
                    Background Sync Frequency
                  </label>
                  <span className="text-[12px] text-[#86868b]">
                    How often POS edge reconciles with cloud database
                  </span>
                </div>
                <select
                  className="px-4 py-2 rounded-xl border border-black/[0.08] bg-black/[0.02] text-[13px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-apple-blue/20"
                  defaultValue="5min"
                >
                  <option value="1min">Every 1 minute (Realtime)</option>
                  <option value="5min">Every 5 minutes (Recommended)</option>
                  <option value="15min">Every 15 minutes</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast("Edge cache synced with cloud database")}
                  className="px-4 py-2 rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] text-[13px] font-medium hover:bg-black/[0.02] transition-colors apple-press flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[17px]">sync</span>
                  <span>Sync Now</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
