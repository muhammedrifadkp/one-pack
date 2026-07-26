"use client";

import React, { useState } from "react";
import { Lock, KeyRound, ShieldAlert, ArrowRight, ShieldCheck } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export const AdminPasscodeGate: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { loginAdmin } = useCms();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please enter the admin passcode.");
      return;
    }

    setError("");
    setLoading(true);

    const result = await loginAdmin(passcode.trim());
    setLoading(false);

    if (result.success) {
      if (onSuccess) onSuccess();
    } else {
      setError(result.error || "Incorrect passcode. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-br from-[#141414] via-[#1F1F1F] to-[#141414] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C89A2B]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 bg-[#C89A2B]/15 border border-[#C89A2B]/40 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-inner">
            <Lock className="w-8 h-8 text-[#C89A2B]" />
          </div>
          <h2 className="text-2xl font-black font-heading tracking-tight text-white">Admin Authentication</h2>
          <p className="text-xs text-gray-400 mt-1">
            Enter your administrative passcode to unlock product controls
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-semibold text-red-600 flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block">
              Security Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:bg-white focus:border-[#C89A2B] focus:outline-none transition-all font-mono shadow-xs"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89A2B]" />
              <span>Default key:</span>
              <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 font-mono font-bold">onepack-admin-secret</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#C89A2B] via-[#D4AF37] to-[#B38822] hover:brightness-110 text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition-all shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(200,154,43,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Unlock Control Panel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
