import React, { useState } from 'react';
import {
  X,
  Smartphone,
  QrCode,
  Apple,
  Play,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDownloadModal: React.FC<MobileDownloadModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#090b10] border border-white/[0.1] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Linear Specular Top Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile-First Creator OS</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Get Creator's on iPhone & Android
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Real-time video drop autopsies, pre-upload monetization risk scanning, and pocket sponsor CRM anywhere you film.
            </p>
          </div>

          {/* Platform Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <button
              onClick={() => setPlatform('ios')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition ${
                platform === 'ios'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>iOS (TestFlight)</span>
            </button>
            <button
              onClick={() => setPlatform('android')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition ${
                platform === 'android'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Android (Google Play)</span>
            </button>
          </div>

          {/* QR Code / Direct Install Card */}
          <div className="p-5 rounded-2xl bg-[#0c0e14] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-5">
            {/* Simulated QR Code */}
            <div className="w-28 h-28 rounded-xl bg-white p-2 flex flex-col items-center justify-between shrink-0 shadow-md">
              <div className="w-full h-full border-2 border-slate-900 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-900 text-center p-1">
                <QrCode className="w-10 h-10 text-slate-900 stroke-[1.75]" />
                <span className="text-[8px] font-mono font-bold uppercase mt-1">Scan with camera</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant Mobile Install Link</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Point your phone camera at the QR code to open the private beta build directly on your device.
              </p>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] text-slate-200 font-mono transition"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Mobile Web App URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Waitlist / Invite Input */}
          <div className="pt-2 border-t border-white/[0.06] space-y-3">
            <div className="text-xs font-semibold text-slate-300">
              Want priority TestFlight access & direct WhatsApp updates?
            </div>

            {submitted ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the priority beta invite list! Check your inbox shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@youtube.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition shrink-0"
                >
                  Join Beta
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
