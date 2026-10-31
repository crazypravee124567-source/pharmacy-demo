import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary";

function Section({ n, title, hint, children }) {
  return (
    <section className="bg-surface-container-lowest rounded-lg border border-surface-container-highest overflow-hidden shadow-xs">
      <div className="bg-surface-container px-space-lg py-space-md flex items-center justify-between border-b border-surface-container-highest">
        <div className="flex items-center gap-space-sm">
          <span className="w-6 h-6 rounded-full bg-primary-container text-tertiary-fixed text-label-sm font-semibold flex items-center justify-center">{n}</span>
          <h2 className="font-headline-md text-headline-md text-primary font-medium">{title}</h2>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">{hint}</span>
      </div>
      <div className="p-space-lg space-y-space-md">{children}</div>
    </section>
  );
}

const Label = ({ children }) => <label className="block text-label-md text-primary font-medium mb-1">{children}</label>;

export default function AddMedicine() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [hsnError, setHsnError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Medicine validated and published to active formulary catalog!");
    setTimeout(() => navigate("/medicines"), 1000);
  };

  return (
    <div className="px-space-xl py-space-lg pb-32 max-w-[1080px] mx-auto w-full space-y-space-lg">
      <div className="flex items-center justify-between gap-space-md">
        <nav className="flex items-center gap-space-xs text-on-surface-variant text-label-md">
          <Link to="/medicines" className="hover:text-primary">Medicines</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-medium">Add medicine</span>
        </nav>
        <div className="flex items-center gap-space-md">
          <button onClick={() => navigate("/medicines")} className="text-on-surface-variant hover:text-error text-label-md px-2 py-1">Discard draft</button>
          <button onClick={() => showToast("Draft saved")} className="inline-flex items-center gap-1 px-space-md py-1.5 bg-surface-container-lowest text-primary border border-outline-variant rounded-lg text-label-md font-medium shadow-xs">
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            <span>Save draft</span>
          </button>
        </div>
      </div>

      <div className="border-b border-surface-container-highest pb-space-md">
        <h1 className="font-display text-display text-primary tracking-tight font-normal">Add medicine</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Enter complete formulary details, pharmaceutical tax codes, and regulatory schedule classifications.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-xl">
        <Section n="1" title="Basic information" hint="Clinical nomenclature & identifiers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div><Label>Medicine name <span className="text-error">*</span></Label><input className={inputCls} defaultValue="Augmentin 625 Duo" required /></div>
            <div><Label>Generic name / composition <span className="text-error">*</span></Label><input className={inputCls} defaultValue="Amoxicillin 500mg + Clavulanic Acid 125mg" required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div>
              <Label>Therapeutic category <span className="text-error">*</span></Label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest">
                <option>Antibiotics / Anti-infectives</option><option>Cardiovascular</option><option>Antidiabetic</option>
              </select>
            </div>
            <div><Label>Barcode / SKU code</Label><input className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant" defaultValue="8901117002419" /></div>
          </div>
        </Section>

        <Section n="2" title="Pricing and tax" hint="Retail rate & GST schedule">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div><Label>Maximum retail price (MRP ₹) *</Label><input type="number" step="0.01" className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant" defaultValue="225.00" required /></div>
            <div><Label>Selling price (₹) *</Label><input type="number" step="0.01" className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant" defaultValue="204.50" required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div>
              <Label>GST rate %</Label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest" defaultValue="12">
                <option value="5">5%</option><option value="12">12%</option><option value="18">18%</option>
              </select>
            </div>
            <div>
              <Label>HSN code *</Label>
              <input
                className={`w-full px-3.5 py-2.5 rounded-lg border ${hsnError ? "border-error" : "border-outline-variant"}`}
                placeholder="3004 9099"
                onChange={(e) => setHsnError(!e.target.value)}
              />
              {hsnError && (
                <p className="font-body-sm text-xs text-error mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  HSN Code is required for GST compliance and e-invoicing.
                </p>
              )}
            </div>
          </div>
        </Section>

        <div className="fixed bottom-0 left-[240px] right-0 bg-surface-container-lowest border-t border-surface-container-highest px-space-xl py-3 z-40 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
            <span>Draft auto-saved 2 mins ago</span>
          </div>
          <div className="flex items-center gap-space-md">
            <button type="button" onClick={() => navigate("/medicines")} className="px-5 py-2 border border-primary-container rounded-lg text-primary text-label-md font-medium">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-lg text-label-md font-medium flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Save medicine</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
