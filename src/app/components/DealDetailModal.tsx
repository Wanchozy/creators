import React from 'react';
import { CheckCircle2, Mail, FileText, DollarSign, Trash2 } from 'lucide-react';
import type { SponsorshipDeal, DealStage } from '@/shared/types';

interface DealDetailModalProps {
  deal: SponsorshipDeal;
  stages: DealStage[];
  onStageChange: (dealId: string, stage: DealStage) => void;
  onOpenInvoice: (deal: SponsorshipDeal) => void;
  onDeleteDeal: (dealId: string) => void;
  onClose: () => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  stages,
  onStageChange,
  onOpenInvoice,
  onDeleteDeal,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Sponsorship Deal File
            </span>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{deal.brandName}</h3>
            <div className="text-xs text-slate-400">{deal.contactEmail}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-emerald-400">
              ${deal.dealValue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">
              Paid to Date: ${deal.paidAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Quick Stage Slider */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deal Status Stage:</label>
          <div className="grid grid-cols-6 gap-1.5">
            {stages.map((stg) => (
              <button
                key={stg}
                onClick={() => onStageChange(deal.id, stg)}
                className={`py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                  deal.stage === stg
                    ? 'border-brand-500 bg-brand-500/20 text-white font-bold'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>

        {/* Deal Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
              Deliverables Checklist:
            </span>
            {deal.deliverables.map((del, i) => (
              <div key={i} className="flex items-center space-x-2 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{del}</span>
              </div>
            ))}
            <div className="text-slate-400 pt-1 border-t border-slate-800/80">
              Deadline: <strong className="text-white">{deal.deadline}</strong>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
              Commercial Rights & Terms:
            </span>
            <div className="text-slate-300">
              <span className="text-slate-400">Usage: </span>
              <strong>{deal.usageRights}</strong>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-400">Exclusivity: </span>
              <strong>{deal.exclusivityWindow}</strong>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-400">Payment Terms: </span>
              <strong className="text-emerald-400">{deal.paymentTerms}</strong>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
          <span className="font-bold text-slate-400 block mb-1">Internal Notes:</span>
          {deal.notes}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Sent follow-up nudge to ${deal.contactEmail}`)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Follow-Up</span>
            </button>
            <button
              onClick={() => alert('Contract document uploaded & attached!')}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span>Upload Contract</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenInvoice(deal)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Generate Invoice</span>
            </button>
            <button
              onClick={() => onDeleteDeal(deal.id)}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center space-x-1 transition"
              title="Remove Deal"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
