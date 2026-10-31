import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const navGroups = [
  {
    title: "Clinical Dispensary",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
      { path: "/billing-pos", label: "Billing / POS", icon: "point_of_sale", badge: "POS" },
      { path: "/medicines", label: "Medicines", icon: "medication" },
      { path: "/prescriptions", label: "Prescriptions", icon: "prescriptions" },
      { path: "/orders", label: "Orders", icon: "shopping_bag", count: 7 },
    ],
  },
  {
    title: "Inventory & Ledger",
    items: [
      { path: "/inventory", label: "Inventory", icon: "inventory_2" },
      { path: "/batches", label: "Batches", icon: "layers" },
      { path: "/stock-in", label: "Stock In", icon: "add_box" },
      { path: "/stock-out", label: "Stock Out", icon: "outbox" },
      { path: "/stock-ledger", label: "Stock Ledger", icon: "history_edu" },
    ],
  },
  {
    title: "Supply & Financials",
    items: [
      { path: "/sales-history", label: "Sales History", icon: "receipt" },
      { path: "/purchases", label: "Purchases", icon: "receipt_long" },
      { path: "/suppliers", label: "Suppliers", icon: "local_shipping" },
      { path: "/customers", label: "Customers", icon: "group" },
      { path: "/payments", label: "Payments", icon: "payments" },
      { path: "/reports", label: "Reports", icon: "analytics" },
    ],
  },
  {
    title: "System",
    items: [
      { path: "/notifications", label: "Notifications", icon: "notifications", count: 3 },
      { path: "/settings", label: "Settings", icon: "settings" },
    ],
  },
];

const searchableItems = [
  { label: "Augmentin 625 Duo", category: "Medicine", path: "/medicines", icon: "medication", sub: "Antibiotic • Batch AUG-24-089" },
  { label: "Dolo 650mg", category: "Medicine", path: "/medicines", icon: "medication", sub: "Analgesic • Batch DOLO-24-105" },
  { label: "Azithral 500mg", category: "Medicine", path: "/medicines", icon: "medication", sub: "Antibiotic • Batch AZI-23-119" },
  { label: "Cetirizine 10mg", category: "Medicine", path: "/medicines", icon: "medication", sub: "Antihistamine • Batch CET-24-042" },
  { label: "New Prescription Sale", category: "Action", path: "/billing-pos", icon: "point_of_sale", sub: "Open POS terminal #01" },
  { label: "Stock In / Replenishment", category: "Action", path: "/stock-in", icon: "add_box", sub: "Inward shipment verification" },
  { label: "Dispensary Settings", category: "System", path: "/settings", icon: "settings", sub: "GST, licenses, 2FA protocols" },
  { label: "Near-Expiry Batch Audit", category: "Action", path: "/batches", icon: "layers", sub: "12 batches within 30 days" },
];

export default function AppLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  const isActive = (path) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path + "/"));

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSpotlightOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when spotlight opens
  useEffect(() => {
    if (spotlightOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setSearchQuery("");
    }
  }, [spotlightOpen]);

  const filteredItems = searchQuery.trim()
    ? searchableItems.filter(
        (it) =>
          it.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.sub.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableItems;

  const handleSelectSearchItem = (item) => {
    setSpotlightOpen(false);
    navigate(item.path);
    showToast(`Navigated to ${item.label}`, item.icon);
  };

  return (
    <div className="min-h-screen bg-background text-[#1d1d1f] font-body-md antialiased flex">
      {/* Apple macOS / iPadOS Translucent Glass Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-white/80 backdrop-blur-2xl border-r border-black/[0.06] z-50 flex flex-col justify-between overflow-y-auto select-none">
        <div className="flex flex-col">
          {/* Top Brand Header */}
          <Link
            to="/dashboard"
            className="h-16 px-5 flex items-center gap-3 border-b border-black/[0.05] hover:bg-black/[0.02] active:scale-[0.99] transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-apple-blue to-[#005bb5] flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_pharmacy
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[17px] font-semibold tracking-tight text-[#1d1d1f] leading-none">
                MedCare
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-apple-blue font-semibold tracking-wider uppercase px-1.5 py-0.2 rounded-full bg-apple-blue/10">
                  RxOS 2.4
                </span>
                <span className="text-[10px] text-[#86868b] font-medium">Pro</span>
              </div>
            </div>
          </Link>

          {/* Quick Spotlight Trigger Bar */}
          <div className="px-3 pt-3 pb-1">
            <button
              onClick={() => setSpotlightOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-black/[0.04] hover:bg-black/[0.07] active:scale-[0.98] transition-all text-[#86868b] text-[13px] border border-black/[0.03]"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#86868b]">search</span>
                <span>Search dispensary...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[11px] font-medium text-[#6e6e73] shadow-xs border border-black/[0.06]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Grouped Navigation */}
          <nav className="p-3 space-y-4">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-0.5">
                <div className="px-3 py-1 text-[11px] font-semibold text-[#8e8e93] tracking-wider uppercase">
                  {group.title}
                </div>
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13.5px] transition-all duration-150 apple-press ${
                        active
                          ? "bg-apple-blue text-white font-medium shadow-[0_2px_8px_rgba(0,113,227,0.3)]"
                          : "text-[#3a3a3c] hover:text-[#1d1d1f] hover:bg-black/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`material-symbols-outlined text-[19px] ${
                            active ? "text-white" : "text-[#6e6e73]"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="tracking-tight">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            active
                              ? "bg-white/25 text-white"
                              : "bg-apple-blue/10 text-apple-blue"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-black/[0.06] text-[#6e6e73]"
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Station Status Card */}
        <div className="p-3 border-t border-black/[0.05]">
          <div className="p-3 rounded-2xl bg-black/[0.03] border border-black/[0.04] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-apple-green"></span>
                </span>
                <span className="text-[12px] font-semibold text-[#1d1d1f]">Rx License Valid</span>
              </div>
              <span className="text-[11px] text-[#86868b] font-mono">2026</span>
            </div>
            <p className="text-[11px] text-[#86868b] leading-tight">
              Central Dispensary Hub #1 • Encrypted TLS Edge
            </p>
            <div className="pt-1 flex items-center justify-between border-t border-black/[0.04]">
              <Link
                to="/"
                className="text-[11px] font-medium text-apple-blue hover:text-apple-blue-hover flex items-center gap-1 apple-press"
              >
                <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                Switch Station
              </Link>
              <button
                onClick={() => showToast("Cache & sync validated with central registry")}
                className="text-[11px] text-[#86868b] hover:text-[#1d1d1f] flex items-center gap-0.5"
                title="Sync status"
              >
                <span className="material-symbols-outlined text-[13px]">sync</span>
                Sync
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-[260px] flex flex-col min-w-0">
        {/* Floating Translucent Glass Top Header */}
        <header className="fixed top-0 left-[260px] right-0 h-16 bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] z-40 flex items-center justify-between px-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* Left: Station & Breadcrumb Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.04]">
              <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse"></span>
              <span className="text-[12px] font-medium text-[#1d1d1f]">Central Dispensary POS</span>
            </div>
            <span className="text-[#c7c7cc] text-xs">/</span>
            <span className="text-[13px] text-[#86868b] font-medium hidden sm:inline">
              Terminal #01 (Arthur Pendelton, R.Ph.)
            </span>
          </div>

          {/* Right: Quick Action, Alerts, User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Rx Sale Button */}
            <button
              onClick={() => navigate("/billing-pos")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[12.5px] font-medium shadow-[0_2px_6px_rgba(0,113,227,0.25)] transition-all apple-press"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Sale</span>
            </button>

            {/* Notifications Button */}
            <Link
              to="/notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors apple-press"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-apple-red ring-2 ring-white"></span>
            </Link>

            <div className="h-5 w-[1px] bg-black/[0.08]"></div>

            {/* User Profile Capsule Card & Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-black/[0.04] active:scale-[0.98] transition-all select-none"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1d1d1f] to-[#48484a] text-white flex items-center justify-center text-[12px] font-semibold shadow-xs">
                  AP
                </div>
                <div className="flex flex-col text-left hidden md:block">
                  <span className="text-[12.5px] font-semibold text-[#1d1d1f] leading-none">
                    Dr. Arthur Pendelton
                  </span>
                  <span className="text-[10px] text-[#86868b] leading-tight mt-0.5">
                    Chief Pharmacist
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#86868b]">
                  keyboard_arrow_down
                </span>
              </button>

              {/* Apple Popover Menu with Anchored Origin */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-apple-popover border border-black/[0.08] p-1.5 z-50 origin-top-right transition-all animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-black/[0.05]">
                    <div className="text-[13px] font-semibold text-[#1d1d1f]">Dr. Arthur Pendelton</div>
                    <div className="text-[11px] text-[#86868b]">License #KA-REG-94281</div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#6e6e73]">account_circle</span>
                      <span>Owner Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#6e6e73]">settings</span>
                      <span>System Settings</span>
                    </Link>
                  </div>
                  <div className="border-t border-black/[0.05] pt-1">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        showToast("Signed out station session");
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-apple-red hover:bg-apple-red/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Sign Out Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="pt-16 min-h-screen bg-background">
          <Outlet />
        </main>
      </div>

      {/* Apple Spotlight Command Palette Modal (Rule #3: Interruptibility & Rule #7: Anchored Origins) */}
      {spotlightOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 bg-black/30 backdrop-blur-md transition-opacity"
          onClick={() => setSpotlightOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-2xl shadow-apple-popover border border-white/40 ring-1 ring-black/10 overflow-hidden flex flex-col transition-all duration-200 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Spotlight Search Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-black/[0.06] gap-3">
              <span className="material-symbols-outlined text-[22px] text-[#86868b]">search</span>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines, batches, patients, orders or actions..."
                className="w-full bg-transparent text-[16px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none"
              />
              <kbd
                onClick={() => setSpotlightOpen(false)}
                className="cursor-pointer text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.05] text-[#86868b] hover:bg-black/[0.09]"
              >
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-[#86868b] text-[13px]">
                  No clinical records match "{searchQuery}"
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <div
                    key={item.label}
                    onClick={() => handleSelectSearchItem(item)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.04] cursor-pointer transition-colors apple-press"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-apple-blue/10 text-apple-blue flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[13.5px] font-medium text-[#1d1d1f] leading-none">
                          {item.label}
                        </span>
                        <span className="text-[11.5px] text-[#86868b] mt-1">{item.sub}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/[0.04] text-[#6e6e73]">
                      {item.category}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Spotlight Footer */}
            <div className="px-4 py-2 border-t border-black/[0.05] bg-black/[0.02] flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Use arrow keys to navigate</span>
              <span>Press <kbd className="font-mono font-semibold">↵</kbd> to select</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
