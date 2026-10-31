import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const quickPicks = [
  { name: "Augmentin 625 Duo", price: 225.0, batch: "AUG-24-089", type: "Antibiotic" },
  { name: "Dolo 650mg", price: 34.5, batch: "DOLO-24-105", type: "Analgesic" },
  { name: "Cetirizine 10mg", price: 18.5, batch: "CET-24-042", type: "Antihistamine" },
  { name: "Azithral 500mg", price: 122.0, batch: "AZI-23-119", type: "Antibiotic" },
  { name: "Pantocid 40mg", price: 154.0, batch: "PAN-24-031", type: "Antacid" },
  { name: "Metformin 500mg", price: 42.0, batch: "MET-24-210", type: "Antidiabetic" },
];

export default function BillingPos() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [billedItems, setBilledItems] = useState([
    { name: "Augmentin 625 Duo", batch: "AUG-24-089", unit: "Strip", qty: 2, price: 225.0, disc: 5 },
    { name: "Dolo 650mg", batch: "DOLO-24-105", unit: "Strip", qty: 3, price: 34.5, disc: 0 },
    { name: "Cetirizine 10mg", batch: "CET-24-042", unit: "Tab", qty: 5, price: 18.5, disc: 0 },
  ]);
  const [payment, setPayment] = useState("UPI / QR");
  const [barcodeInput, setBarcodeInput] = useState("");

  const subtotal = billedItems.reduce((acc, it) => acc + it.qty * it.price * (1 - it.disc / 100), 0);
  const tax = subtotal * 0.12;
  const totalPayable = subtotal + tax;

  const handleAddQuick = (name, price, batch) => {
    setBilledItems((prev) => {
      const existing = prev.find((it) => it.name === name);
      if (existing) {
        return prev.map((it) => (it.name === name ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { name, batch, unit: "Strip", qty: 1, price, disc: 0 }];
    });
    showToast(`Added ${name} to bill`, "add_shopping_cart");
  };

  const handleRemoveItem = (index) => {
    setBilledItems((prev) => prev.filter((_, i) => i !== index));
    showToast("Item removed from bill");
  };

  const handleUpdateQty = (index, delta) => {
    setBilledItems((prev) =>
      prev
        .map((it, i) => (i === index ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const handleCheckout = () => {
    showToast("Invoice #INV-2024-10893 generated & printed!", "print");
    setTimeout(() => navigate("/sales-history"), 800);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">
            Clinical Billing &amp; Dispensary POS
          </h1>
          <p className="text-[13px] text-[#86868b] mt-0.5">
            Rapid barcode dispensing, automated batch FIFO selection &amp; GST compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-apple-green/10 text-apple-green flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-pulse"></span>
            Terminal #01 Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left: Formulary & Barcode Scanner */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          {/* Barcode scanner card */}
          <div className="apple-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[#1d1d1f] flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-apple-blue">
                  barcode_scanner
                </span>
                High-Speed Barcode / QR Scanner
              </label>
              <span className="text-[11px] text-[#86868b] font-mono">USB / BT Connected</span>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#86868b] material-symbols-outlined text-[18px]">
                search
              </span>
              <input
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 bg-black/[0.03] text-[#1d1d1f] rounded-xl text-[13.5px] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
                placeholder="Scan GS1 DataMatrix barcode or type medicine..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && barcodeInput.trim()) {
                    handleAddQuick(barcodeInput.trim(), 122.0, "AZI-23-119");
                    setBarcodeInput("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (barcodeInput.trim()) {
                    handleAddQuick(barcodeInput.trim(), 122.0, "AZI-23-119");
                    setBarcodeInput("");
                  }
                }}
                className="absolute right-2 px-2.5 py-1 rounded-lg bg-apple-blue text-white text-[11px] font-medium apple-press shadow-xs"
              >
                ↵ Add
              </button>
            </div>
          </div>

          {/* Quick Formulary Picks */}
          <div className="apple-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#86868b] uppercase tracking-wider">
                Frequent Counter Formulary Picks
              </span>
              <span className="text-[11px] text-[#86868b]">Tap to append</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickPicks.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handleAddQuick(p.name, p.price, p.batch)}
                  className="p-3 rounded-2xl bg-black/[0.02] hover:bg-black/[0.05] border border-black/[0.05] text-left transition-all apple-press flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[13px] font-semibold text-[#1d1d1f] truncate leading-tight">
                      {p.name}
                    </div>
                    <span className="text-[10.5px] text-[#86868b]">{p.type}</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-apple-blue">₹{p.price.toFixed(2)}</span>
                    <span className="text-[10px] text-[#86868b] font-mono">{p.batch}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Current Invoice Drawer */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="apple-card p-5 space-y-4">
            {/* Invoice Header */}
            <div className="flex justify-between items-center pb-3 border-b border-black/[0.05]">
              <div>
                <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
                  Active Dispensing Bill
                </span>
                <div className="text-[16px] font-semibold text-[#1d1d1f] font-mono">
                  #INV-2024-10893
                </div>
              </div>
              <button
                onClick={() => {
                  setBilledItems([]);
                  showToast("Cleared active invoice items");
                }}
                className="text-apple-red text-[12px] font-medium hover:underline apple-press"
              >
                Clear All
              </button>
            </div>

            {/* Billed Items List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {billedItems.length === 0 ? (
                <div className="py-8 text-center text-[#86868b] text-[13px]">
                  No medicines scanned yet. Add from quick picks or barcode reader.
                </div>
              ) : (
                billedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-black/[0.02] hover:bg-black/[0.04] text-[13px] flex items-center justify-between border border-black/[0.03] transition-colors"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="font-semibold text-[#1d1d1f] truncate">{item.name}</div>
                      <div className="text-[11px] text-[#86868b] flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{item.batch}</span>
                        <span>•</span>
                        <span>₹{item.price.toFixed(2)} / {item.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Qty incrementer */}
                      <div className="flex items-center gap-1.5 bg-white rounded-lg border border-black/[0.08] px-1 py-0.5">
                        <button
                          onClick={() => handleUpdateQty(idx, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] apple-press"
                        >
                          -
                        </button>
                        <span className="text-[12px] font-semibold px-1 min-w-[16px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(idx, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] apple-press"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[64px]">
                        <span className="font-semibold text-[#1d1d1f] block">
                          ₹{(item.qty * item.price).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="text-[#86868b] hover:text-apple-red p-1 apple-press"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="p-3.5 rounded-2xl bg-black/[0.03] space-y-1.5 text-[12.5px] border border-black/[0.04]">
              <div className="flex justify-between text-[#6e6e73]">
                <span>Items Subtotal:</span>
                <span className="font-mono font-medium text-[#1d1d1f]">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6e6e73]">
                <span>Statutory GST (12%):</span>
                <span className="font-mono font-medium text-[#1d1d1f]">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[16px] font-semibold text-[#1d1d1f] pt-2 border-t border-black/[0.06]">
                <span>Total Payable:</span>
                <span className="font-mono text-apple-blue font-bold">₹{totalPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
                Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {["Cash", "UPI / QR", "Card / NFC"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayment(m)}
                    className={`py-2 rounded-xl text-[12px] font-medium transition-all apple-press ${
                      payment === m
                        ? "bg-apple-blue text-white shadow-sm font-semibold"
                        : "bg-black/[0.03] text-[#6e6e73] hover:bg-black/[0.06]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={billedItems.length === 0}
              className="w-full py-3.5 rounded-full bg-apple-blue hover:bg-apple-blue-hover disabled:opacity-40 text-white text-[14px] font-medium shadow-[0_2px_12px_rgba(0,113,227,0.35)] flex items-center justify-center gap-2 transition-all apple-press"
            >
              <span className="material-symbols-outlined text-[19px]">print</span>
              <span>Checkout &amp; Print Bill (F12)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
