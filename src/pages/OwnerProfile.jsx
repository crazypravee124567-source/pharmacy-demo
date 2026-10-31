import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

const field = "w-full h-11 px-3.5 rounded bg-surface-container-lowest border border-outline-variant font-body-md";

export default function OwnerProfile() {
  const { showToast } = useToast();
  const [name, setName] = useState("Dr. Arthur Pendelton");
  const [email, setEmail] = useState("arthur.pendelton@medcare-rx.com");
  const [phone, setPhone] = useState("+91 98201 44820");

  return (
    <div className="flex flex-col w-full pb-16 max-w-[1440px] mx-auto px-gutter">
      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md pt-space-md pb-space-lg">
        <Link to="/dashboard" className="hover:text-primary transition-colors">MedCare</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span><span>Account</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span><span className="text-primary font-semibold">Owner Profile</span>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/70 p-space-lg mb-space-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
            <div className="w-24 h-24 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display text-display shadow-inner">AP</div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-space-sm">
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">{name}</h1>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-label-sm font-semibold">Active Superintendent</span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant">Chief Pharmacist &amp; Pharmacy Owner • <strong className="text-primary font-semibold">KSPC Reg. #48102-A</strong></p>
              <p className="font-body-sm text-body-sm text-outline">{email} • {phone}</p>
            </div>
          </div>
          <button onClick={() => showToast("Ready to modify profile", "edit")} className="h-10 px-space-md rounded bg-surface-container-lowest border border-primary-container text-primary font-label-md flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">edit</span><span>Edit Profile</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-lg border border-outline-variant/70 p-space-lg shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary font-serif mb-4">Personal &amp; Regulatory Credentials</h2>
          <form onSubmit={(e) => { e.preventDefault(); showToast("Profile saved successfully"); }} className="space-y-4">
            <div><label className="block font-label-md text-on-surface mb-1">Full Legal Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className={field} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block font-label-md text-on-surface mb-1">Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} /></div>
              <div><label className="block font-label-md text-on-surface mb-1">Phone Number</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} /></div>
            </div>
            <button type="submit" className="h-10 px-space-lg rounded bg-primary-container text-on-primary font-label-md hover:bg-primary transition-colors">Save Changes</button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-surface-container-lowest rounded-lg border border-outline-variant/70 p-space-lg shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary font-serif mb-4">Shop &amp; Dispensary Registry</h2>
          <div className="space-y-3 text-body-sm">
            <div className="p-3 bg-surface-container-low rounded border border-surface-container"><span className="text-on-surface-variant font-label-sm block uppercase">Dispensary Entity</span><span className="font-title-md font-semibold text-primary block mt-0.5">MedCare Central Dispensary &amp; Pharmacy Hub</span></div>
            <div className="p-3 bg-surface-container-low rounded border border-surface-container"><span className="text-on-surface-variant font-label-sm block uppercase">GST Identification</span><span className="font-mono font-semibold text-on-surface block mt-0.5">29AABCM1029P1ZX</span></div>
            <div className="p-3 bg-surface-container-low rounded border border-surface-container"><span className="text-on-surface-variant font-label-sm block uppercase">Licenses (Form 20B &amp; 21B)</span><span className="font-mono font-semibold text-primary block mt-0.5">KA-BLR-2024-884 / 885</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
