import { useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

export default function Prescriptions() {
  const { showToast } = useToast();
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    showToast("Prescription #ORD-2024-8901 Verified & Approved by Dr. Pendelton!", "verified");
  };

  return (
    <div className="w-full grid grid-cols-12 min-h-[calc(100vh-64px)] bg-background">
      {/* Queue */}
      <div className="col-span-12 lg:col-span-4 xl:col-span-3 bg-surface-container-low p-space-md border-r space-y-space-sm">
        <h2 className="font-title-md font-bold text-primary">Queue (8 Pending)</h2>
        <div className="p-3 rounded-lg bg-surface-container-lowest border-l-4 border-secondary shadow-xs cursor-pointer">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-primary">#ORD-2024-8901</span>
            <span className="text-surface-tint">12m ago</span>
          </div>
          <div className="font-semibold mt-1">Rajesh Mehta (46 Y / M)</div>
          <span className="text-[11px] text-on-surface-variant">Augmentin, Dolo, Cetirizine</span>
        </div>
      </div>

      {/* Document viewer */}
      <div className="col-span-12 lg:col-span-8 xl:col-span-5 bg-surface-container-lowest p-space-md flex flex-col justify-between border-r">
        <div className="bg-surface-container-low p-6 rounded-lg shadow-sm border border-outline-variant space-y-4 font-serif">
          <div className="border-b pb-2">
            <h3 className="font-bold text-lg text-primary">DR. K. SHARMA, M.D.</h3>
            <p className="text-xs text-secondary font-sans font-semibold">Reg. No: KMC-48812 • Consultant Physician</p>
          </div>
          <div className="text-xs space-y-1 font-sans">
            <div><strong>Patient:</strong> Rajesh Mehta (46 Y / M)</div>
            <div><strong>Date:</strong> 24 Oct 2024</div>
            <div><strong>Diagnosis:</strong> Acute URTI with Seasonal Bronchitis</div>
          </div>
          <div className="pt-2 text-sm space-y-2">
            <div><strong>1. Tab. Augmentin 625 Duo</strong> - TDS x 5 days</div>
            <div><strong>2. Tab. Dolo 650mg</strong> - SOS for fever</div>
            <div><strong>3. Tab. Cetirizine 10mg</strong> - OD at Bedtime</div>
          </div>
          <div className="pt-4 border-t text-right italic text-primary">Dr. K. Sharma (Digitally Signed)</div>
        </div>
        <div className="text-center text-xs text-on-surface-variant py-2">Scan Quality: 300 DPI Clear OCR • Document Hash Verified</div>
      </div>

      {/* Decision panel */}
      <div className="col-span-12 xl:col-span-4 bg-surface-container-low p-space-md space-y-space-md">
        <h3 className="font-title-md font-bold text-primary">Pharmacist Review</h3>
        <div className="p-3 bg-surface-container-lowest rounded space-y-1 text-xs">
          <div><strong>Reviewer:</strong> Dr. Arthur Pendelton</div>
          <div><strong>Drug Schedule:</strong> Schedule H Mandatory Verification</div>
        </div>
        <textarea
          className="w-full p-2.5 rounded bg-surface-container-lowest border text-xs"
          placeholder="Clinical verification notes or clarification justification..."
          rows="3"
          defaultValue="Prescription verified against patient history. Dosage within safe pharmacological ranges."
        />
        <div className="space-y-2">
          <button onClick={handleApprove} className="w-full py-3 bg-surface-tint hover:bg-surface-tint/90 text-on-primary rounded-lg font-bold text-sm shadow-sm flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{approved ? "Prescription Approved ✓" : "Approve Prescription [A]"}</span>
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => showToast("Clarification dispatched to patient.")} className="py-2 bg-secondary-fixed text-on-secondary-fixed font-semibold rounded text-xs">Clarify [C]</button>
            <button onClick={() => showToast("Prescription rejected per clinical safety rule.", "error")} className="py-2 bg-error text-on-error font-semibold rounded text-xs">Reject [R]</button>
          </div>
        </div>
      </div>
    </div>
  );
}
