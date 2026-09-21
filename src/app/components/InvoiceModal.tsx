import React from 'react';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/shared/components/Toast';
import type { SponsorshipDeal } from '@/shared/types';

interface InvoiceModalProps {
  deal: SponsorshipDeal;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ deal, onClose }) => {
  const { toast } = useToast();
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Commercial Invoice — {deal.brandName}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">
            ✕ Close
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
          <div className="flex justify-between text-slate-400">
            <span>INVOICE #{Date.now().toString().slice(-6)}</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="border-t border-slate-800 pt-2 text-slate-300">
            <div>Billed To: {deal.brandName}</div>
            <div>Terms: {deal.paymentTerms}</div>
          </div>
          <div className="border-t border-slate-800 pt-2 space-y-1">
            <div className="flex justify-between text-white">
              <span>{deal.deliverables[0]}</span>
              <span>${deal.dealValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Usage Rights: {deal.usageRights}</span>
              <span>Included</span>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-emerald-400 text-sm">
            <span>TOTAL DUE:</span>
            <span>${deal.dealValue.toLocaleString()} USD</span>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={() => {
              toast.success('Invoice PDF copied and ready to send!');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
          >
            Copy Invoice PDF Link
          </button>
        </div>
      </div>
    </div>
  );
};
