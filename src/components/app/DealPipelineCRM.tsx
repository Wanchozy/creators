import React, { useState } from 'react';
import {
  Layers,
  Plus,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  Send,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useDeals } from '../../hooks/useDeals';
import { DealStage, SponsorshipDeal } from '../../types';

export const DealPipelineCRM: React.FC<{ initialDeals?: SponsorshipDeal[] }> = ({ initialDeals }) => {
  const { deals: repoDeals, loading, changeStage, addDeal, removeDeal, refresh } = useDeals();
  // Allow props override if provided, otherwise use repository data
  const deals = initialDeals && initialDeals.length > 0 ? initialDeals : repoDeals;

  const [selectedDeal, setSelectedDeal] = useState<SponsorshipDeal | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState<boolean>(false);
  const [invoiceModalDeal, setInvoiceModalDeal] = useState<SponsorshipDeal | null>(null);

  // New Deal State
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
      lastContactDate: 'Today'
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

      {/* Deal Detail Inspection Drawer / Modal (Document Page 13 Exact Specs) */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Sponsorship Deal File
                </span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedDeal.brandName}</h3>
                <div className="text-xs text-slate-400">{selectedDeal.contactEmail}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  ${selectedDeal.dealValue.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">
                  Paid to Date: ${selectedDeal.paidAmount.toLocaleString()}
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
                    onClick={() => handleStageChange(selectedDeal.id, stg)}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                      selectedDeal.stage === stg
                        ? 'border-brand-500 bg-brand-500/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Specs from the document */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
                  Deliverables Checklist:
                </span>
                {selectedDeal.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{del}</span>
                  </div>
                ))}
                <div className="text-slate-400 pt-1 border-t border-slate-800/80">
                  Deadline: <strong className="text-white">{selectedDeal.deadline}</strong>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
                  Commercial Rights & Terms:
                </span>
                <div className="text-slate-300">
                  <span className="text-slate-400">Usage: </span>
                  <strong>{selectedDeal.usageRights}</strong>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Exclusivity: </span>
                  <strong>{selectedDeal.exclusivityWindow}</strong>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Payment Terms: </span>
                  <strong className="text-emerald-400">{selectedDeal.paymentTerms}</strong>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-slate-400 block mb-1">Internal Notes:</span>
              {selectedDeal.notes}
            </div>

            {/* Action Buttons from Document Page 13 */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Sent follow-up nudge to ${selectedDeal.contactEmail}`)}
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
                  onClick={() => setInvoiceModalDeal(selectedDeal)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Generate Invoice</span>
                </button>
                <button
                  onClick={() => handleDeleteDeal(selectedDeal.id)}
                  className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center space-x-1 transition"
                  title="Remove Deal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Generator Modal */}
      {invoiceModalDeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Commercial Invoice — {invoiceModalDeal.brandName}</span>
              </h3>
              <button onClick={() => setInvoiceModalDeal(null)} className="text-slate-400 hover:text-white text-xs">
                ✕ Close
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex justify-between text-slate-400">
                <span>INVOICE #{Date.now().toString().slice(-6)}</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 text-slate-300">
                <div>Billed To: {invoiceModalDeal.brandName}</div>
                <div>Terms: {invoiceModalDeal.paymentTerms}</div>
              </div>
              <div className="border-t border-slate-800 pt-2 space-y-1">
                <div className="flex justify-between text-white">
                  <span>{invoiceModalDeal.deliverables[0]}</span>
                  <span>${invoiceModalDeal.dealValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Usage Rights: {invoiceModalDeal.usageRights}</span>
                  <span>Included</span>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-emerald-400 text-sm">
                <span>TOTAL DUE:</span>
                <span>${invoiceModalDeal.dealValue.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  alert('Invoice PDF copied and ready to send!');
                  setInvoiceModalDeal(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Copy Invoice PDF Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Add New Sponsorship Deal</h3>
              <button onClick={() => setIsNewDealModalOpen(false)} className="text-slate-400 hover:text-white text-xs">
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nike, NordVPN, Sony"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Agreed Deal Value ($ USD)</label>
                <input
                  type="number"
                  value={newDealValue}
                  onChange={(e) => setNewDealValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Key Deliverables</label>
                <input
                  type="text"
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Delivery Deadline</label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsNewDealModalOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDeal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold"
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
