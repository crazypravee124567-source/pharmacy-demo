import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext({ showToast: () => {} });

// Apple subtle audio-haptic feedback click (WWDC Designing Audio-Haptic Experiences)
function playHapticSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Soft high-frequency transient click like iOS haptic tap
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch (e) {
    // Ignore if audio permissions/contexts are blocked
  }
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback((message, icon = "check_circle") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Trigger subtle physical audio-haptic feedback
    playHapticSound();

    setToast({ message, icon });
    // Spring in
    requestAnimationFrame(() => {
      setVisible(true);
    });

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToast(null), 300);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          onClick={() => {
            setVisible(false);
            setTimeout(() => setToast(null), 250);
          }}
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] cursor-pointer select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Apple Dynamic Island / Capsule HUD */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1c1c1e]/90 text-white backdrop-blur-2xl border border-white/15 shadow-apple-hud ring-1 ring-black/10">
            <div className="w-6 h-6 rounded-full bg-apple-green/20 text-apple-green flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">{toast.icon}</span>
            </div>
            <span className="text-[13px] font-medium tracking-tight pr-1">{toast.message}</span>
            <span className="text-[11px] text-white/40 font-mono pl-1">esc</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
