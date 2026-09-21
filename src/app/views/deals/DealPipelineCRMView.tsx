import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Calendar,
  X,
  PlusCircle,
  Building,
  DollarSign
} from 'lucide-react';
import { useDeals } from '@/shared/hooks/useDeals';
import type { DealStage, SponsorshipDeal } from '@/shared/types';
import { DealDetailModal } from '@/app/components/DealDetailModal';
import { InvoiceModal } from '@/app/components/InvoiceModal';

export const DealPipelineCRMView: React.FC<{ initialDeals?: SponsorshipDeal[] }> = ({ initialDeals }) => {
  const { deals: repoDeals, changeStage, addDeal, removeDeal } = useDeals();
  const deals = initialDeals && initialDeals.length > 0 ? initialDeals : repoDeals;

  const [selectedDeal, setSelectedDeal] = useState<SponsorshipDeal | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState<boolean>(false);
  const [invoiceModalDeal, setInvoiceModalDeal] = useState<SponsorshipDeal | null>(null);

  // New Deal Form State
  const [newBrand, setNewBrand] = useState<string>('');
  const [newDealValue, setNewDealValue] = useState<number>(1500);
  const [newDeliverables, setNewDeliverables] = useState<string>('1x YouTube 60s Integration');
  const [newDeadline, setNewDeadline] = useState<string>('Dec 01, 2026');

  const stages: DealStage[] = ['New', 'Pitched', 'Negotiating', 'Active', 'Delivered', 'Paid'];

  const handleStageChange = async (dealId: string, newStage: DealStage) => {
    await changeStage(dealId, newStage);
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal({ ...selectedDeal, stage: newStage });
    }
  };

  const handleCreateDeal = async () => {
    if (!newBrand) return;
    await addDeal({
      brandName: newBrand,
      contactEmail: `partners@${newBrand.toLowerCase().replace(/\s+/g, '')}.com`,
      stage: 'New',
      dealValue: newDealValue,
      deliverables: [newDeliverables],
      deadline: newDeadline,
      usageRights: '30-day organic feed',
      exclusivityWindow: '30 days',
      paymentTerms: '50% upfront, 50% post-publication',
      paidAmount: 0,
      notes: 'Initial outreach logged from Creator Rate Calculator.',
      lastContactDate: 'Today',
    });
    setNewBrand('');
    setIsNewDealModalOpen(false);
  };

  const handleDeleteDeal = async (dealId: string) => {
    if (window.confirm('Are you sure you want to remove this deal?')) {
      await removeDeal(dealId);
      if (selectedDeal && selectedDeal.id === dealId) {
        setSelectedDeal(null);
      }
    }
  };

  const totalPipelineValue = deals.reduce((acc, d) => acc + d.dealValue, 0);
  const totalPaidRevenue = deals.filter((d) => d.stage === 'Paid').reduce((acc, d) => acc + d.dealValue, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Problem #10: Sponsorship Administration Is Messy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Creator Deal Pipeline CRM</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            "Now that is a product I could see creators paying for." Replace DM and spreadsheet chaos with an end-to-end deal tracker.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400">Total Deals in Motion</div>
            <div className="text-base font-mono font-bold text-white">
              ${totalPipelineValue.toLocaleString()} (${totalPaidRevenue.toLocaleString()} Collected)
            </div>
          </div>
          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Deal</span>
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);

          return (
            <div
              key={stage}
              className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-3 flex flex-col min-w-[200px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stage === 'Paid'
                        ? 'bg-emerald-400'
                        : stage === 'Active'
                        ? 'bg-brand-400'
                        : stage === 'Negotiating'
                        ? 'bg-amber-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {stage}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deals In Column */}
              <div className="space-y-2.5 flex-1 min-h-[300px]">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal)}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:border-brand-500/50 cursor-pointer transition space-y-2 shadow-sm group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                        {deal.brandName}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ${deal.dealValue.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {deal.deliverables[0]}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{deal.deadline}</span>
                      </span>
                      <span className="text-slate-400">{deal.paymentTerms.split(',')[0]}</span>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="h-24 border border-dashed border-slate-800/60 rounded-xl flex items-center justify-center text-[11px] text-slate-400">
                    No deals
                  </div>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/60 text-[11px] font-mono text-slate-400 text-center">
                Total: ${stageTotal.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Extracted Deal Detail Modal */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          stages={stages}
          onStageChange={handleStageChange}
          onOpenInvoice={(deal) => setInvoiceModalDeal(deal)}
          onDeleteDeal={handleDeleteDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}

      {/* Extracted Commercial Invoice Modal */}
      {invoiceModalDeal && (
        <InvoiceModal
          deal={invoiceModalDeal}
          onClose={() => setInvoiceModalDeal(null)}
        />
      )}

      {/* New Deal Creation Modal */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <PlusCircle className="w-4 h-4 text-brand-400" />
                <span>Add Sponsorship Opportunity</span>
              </h3>
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Brand Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. Adobe, Notion, Squarespace"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Commercial Deal Value ($)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="number"
                    value={newDealValue}
                    onChange={(e) => setNewDealValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Deliverable</label>
                <input
                  type="text"
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Air / Publish Date</label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDeal}
                disabled={!newBrand}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold disabled:opacity-50"
              >
                Add to Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
