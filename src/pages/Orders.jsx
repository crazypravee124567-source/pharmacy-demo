import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";

export default function Orders() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="p-space-lg max-w-[1600px] mx-auto w-full space-y-space-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-serif">Orders &amp; Dispensing Queue</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time dispensing queue, digital prescription verification, and fulfillment.</p>
        </div>
        <button onClick={() => navigate("/prescriptions")} className="px-4 py-2 bg-secondary text-on-secondary rounded text-sm font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">verified</span><span>Review Prescriptions</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b pb-2">
        <button className="px-3 py-1 bg-primary text-on-primary rounded text-xs font-semibold">New (6)</button>
        <button className="px-3 py-1 bg-surface-container text-on-surface rounded text-xs">Preparing (7)</button>
        <button className="px-3 py-1 bg-surface-container text-on-surface rounded text-xs">Ready for Pickup (9)</button>
        <button className="px-3 py-1 bg-surface-container text-on-surface rounded text-xs">Completed (142)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-lg border-2 border-primary shadow-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-title-md font-bold text-primary">#ORD-2024-8901</span>
            <span className="text-xs bg-secondary-container/40 text-on-secondary-container px-2 py-0.5 rounded">12m elapsed</span>
          </div>
          <div>
            <div className="font-semibold text-on-surface">Rajesh Mehta</div>
            <div className="text-xs text-on-surface-variant">+91 98112 34901 • Express Delivery</div>
          </div>
          <div className="p-2 bg-surface-container-low rounded text-xs">Augmentin 625 Duo, Dolo 650mg, Cetirizine 10mg</div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-mono font-bold">₹521.50</span>
            <button onClick={() => navigate("/prescriptions")} className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded">Inspect Rx &amp; Prepare</button>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/60 shadow-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-title-md font-bold text-primary">#ORD-2024-8898</span>
            <span className="text-xs bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold">28m [Alert]</span>
          </div>
          <div>
            <div className="font-semibold text-on-surface">Pooja Kulkarni</div>
            <div className="text-xs text-on-surface-variant">+91 97234 11982 • Counter Pickup</div>
          </div>
          <div className="p-2 bg-surface-container-low rounded text-xs">Telma-H 40mg, Atorva 20mg</div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-mono font-bold">₹840.00</span>
            <button onClick={() => showToast("Order accepted for pickup packaging.")} className="text-xs bg-surface-container text-on-surface px-3 py-1.5 rounded hover:bg-surface-container-high">Accept Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
