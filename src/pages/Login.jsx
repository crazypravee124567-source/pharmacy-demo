import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("Sign In to Workstation");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusText("Verifying Credentials...");
    setTimeout(() => {
      setLoading(false);
      setStatusText("Session Authenticated");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-green/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-black/[0.06] bg-white z-10">
        {/* Brand Showcase Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1d1d1f] to-[#121214] text-white p-8 lg:p-10 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-apple-blue flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_pharmacy
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-semibold tracking-tight text-white leading-none">
                  MedCare
                </span>
                <span className="text-[10px] text-white/60 tracking-wider uppercase mt-0.5">
                  RxOS 2.4 Pro
                </span>
              </div>
            </div>

            <div className="mt-14">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/90 inline-flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-pulse"></span>
                Clinical Dispensary OS
              </span>
              <h1 className="text-[26px] font-semibold text-white tracking-tight leading-snug mt-4">
                Precision dispensing and verified pharmaceutical care.
              </h1>
              <p className="text-[13px] text-white/70 mt-3 leading-relaxed">
                Unified real-time dispensing, Schedule II chain-of-custody, and central inventory synchronization designed for modern healthcare teams.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-10 flex items-center justify-between text-[11.5px] text-white/60">
            <span>Dispensary Station #1</span>
            <div className="flex items-center gap-1.5 text-apple-green">
              <span className="w-1.5 h-1.5 rounded-full bg-apple-green"></span>
              <span>HIPAA / DEA Verified</span>
            </div>
          </div>
        </div>

        {/* Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div>
              <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-tight">
                Workstation Sign In
              </h2>
              <p className="text-[13px] text-[#86868b] mt-1">
                Enter your credentials to unlock terminal #01.
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-[12.5px] font-medium text-[#1d1d1f] mb-1.5" htmlFor="username">
                  Email or Pharmacist ID
                </label>
                <input
                  id="username"
                  defaultValue="arthur.pendelton@medcare.com"
                  required
                  type="text"
                  className="w-full h-11 px-3.5 bg-black/[0.03] text-[#1d1d1f] text-[13.5px] rounded-xl border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#1d1d1f] mb-1.5" htmlFor="password">
                  Security Passkey
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    defaultValue="••••••••••••"
                    required
                    type={showPass ? "text" : "password"}
                    className="w-full h-11 pl-3.5 pr-11 bg-black/[0.03] text-[#1d1d1f] text-[13.5px] rounded-xl border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 text-[#86868b] hover:text-[#1d1d1f] p-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showPass ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[12.5px] pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#6e6e73]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-apple-blue accent-apple-blue cursor-pointer"
                  />
                  <span>Keep session active</span>
                </label>
                <a href="#forgot" className="font-medium text-apple-blue hover:text-apple-blue-hover">
                  Key recovery
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-full bg-apple-blue hover:bg-apple-blue-hover text-white text-[13.5px] font-medium flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,113,227,0.3)] transition-all apple-press mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>{statusText}</span>
                    <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-black/[0.05] text-center">
              <p className="text-[11.5px] text-[#86868b]">
                Authorized dispensary personnel only. Audited by CDSCO and DEA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
