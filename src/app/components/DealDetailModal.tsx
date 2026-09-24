import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  FileText,
  DollarSign,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useToast } from '@/shared/components/Toast';
import { scanSponsorshipContract } from '@/shared/domain/contractScannerEngine';
import type { SponsorshipDeal, DealStage, ContractScanReport } from '@/shared/types';

interface DealDetailModalProps {
  deal: SponsorshipDeal;
  stages: DealStage[];
  onStageChange: (dealId: string, stage: DealStage) => void;
  onOpenInvoice: (deal: SponsorshipDeal) => void;
  onDeleteDeal: (dealId: string) => void;
  onClose: () => void;
}

const SAMPLE_TRAP_CONTRACT = `STANDARD INFLUENCER AGREEMENT
Section 4. Grant of Rights: Creator hereby grants to Sponsor, its affiliates, and assigns, an exclusive, irrevocable, worldwide license in perpetuity throughout the universe in all media now known or hereafter devised, to use, reproduce, modify, and distribute the Deliverables. Sponsor shall have full whitelisting and dark posting rights across Meta Business Manager and TikTok Spark Ads without additional licensing compensation.

Section 7. Payment Terms: Compensation shall be paid Net 90 days following Sponsor's final receipt of written approval. Sponsor reserves the right to terminate at will without penalty or kill fee prior to publication.

Section 9. Exclusivity: Creator shall not partner or promote any competing products across the technology, lifestyle, or consumer hardware category for a period of 12 months following execution. Creator agrees to perform unlimited revisions at creator's expense until client is fully satisfied.`;

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  stages,
  onStageChange,
  onOpenInvoice,
  onDeleteDeal,
  onClose,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'contract_scanner'>('overview');
  const [contractText, setContractText] = useState<string>(SAMPLE_TRAP_CONTRACT);
  const [scanReport, setScanReport] = useState<ContractScanReport>(() =>
    scanSponsorshipContract(SAMPLE_TRAP_CONTRACT)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleScan = () => {
    const report = scanSponsorshipContract(contractText);
    setScanReport(report);
    if (report.criticalCount > 0) {
      toast.error(`Detected ${report.criticalCount} critical predatory clauses!`);
    } else {
      toast.success('Contract scan complete.');
    }
  };

  const handleCopyCounter = (id: string, counterClause: string) => {
    navigator.clipboard.writeText(counterClause);
    setCopiedId(id);
    toast.success('Recommended counter-clause copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0c0e17] border border-white/[0.1] rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-mono font-bold text-indigo-400 tracking-wider">
                Deal File #{deal.id.slice(0, 8)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] font-mono text-slate-400 capitalize">{deal.stage} Stage</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">{deal.brandName}</h3>
            <div className="text-xs text-slate-400">{deal.contactEmail}</div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-emerald-400">
                ${deal.dealValue.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Paid: ${deal.paidAmount.toLocaleString()}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-white/[0.08] space-x-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 transition relative flex items-center space-x-1.5 ${
              activeTab === 'overview' ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Overview & Terms</span>
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('contract_scanner')}
            className={`pb-2.5 transition relative flex items-center space-x-1.5 ${
              activeTab === 'contract_scanner'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Contract Red-Flag Scanner</span>
            {scanReport.criticalCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[9px] font-mono">
                {scanReport.criticalCount} Critical
              </span>
            )}
            {activeTab === 'contract_scanner' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Stage Slider */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Deal Status Stage:</label>
              <div className="grid grid-cols-6 gap-1.5">
                {stages.map((pipelineStage) => (
                  <button
                    key={pipelineStage}
                    onClick={() => onStageChange(deal.id, pipelineStage)}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                      deal.stage === pipelineStage
                        ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold shadow-sm'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    {pipelineStage}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#101422] p-3.5 rounded-xl border border-white/[0.06] space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
                  Deliverables Checklist:
                </span>
                {deal.deliverables.map((deliverableItem, deliverableIndex) => (
                  <div key={deliverableIndex} className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{deliverableItem}</span>
                  </div>
                ))}
                <div className="text-slate-400 pt-1 border-t border-white/[0.06]">
                  Deadline: <strong className="text-white font-mono">{deal.deadline}</strong>
                </div>
              </div>

              <div className="bg-[#101422] p-3.5 rounded-xl border border-white/[0.06] space-y-2">
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

            <div className="p-3 bg-[#101422] rounded-xl border border-white/[0.06] text-xs text-slate-300">
              <span className="font-bold text-slate-400 block mb-1">Internal Deal Notes:</span>
              <p className="leading-relaxed text-slate-300">{deal.notes || 'No internal notes added.'}</p>
            </div>
          </div>
        )}

        {/* TAB 2: CONTRACT RED-FLAG SCANNER */}
        {activeTab === 'contract_scanner' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Sponsorship Agreement Auditor</span>
                </span>
                <p className="text-[11px] text-slate-400">
                  Paste the brand agreement text to scan for perpetual rights, Net-90 delays, and unpaid whitelisting.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setContractText(SAMPLE_TRAP_CONTRACT);
                    setScanReport(scanSponsorshipContract(SAMPLE_TRAP_CONTRACT));
                    toast.success('Loaded sample contract with common traps');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[10px] text-slate-300 border border-white/[0.08]"
                >
                  Load Sample Traps
                </button>
                <button
                  type="button"
                  onClick={handleScan}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow"
                >
                  Scan Contract Text
                </button>
              </div>
            </div>

            {/* Input Textarea */}
            <div>
              <textarea
                rows={4}
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="Paste contract clauses or entire agreement here..."
                className="w-full bg-[#101422] border border-white/[0.08] rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Audit Score Card */}
            <div className="p-3.5 rounded-xl bg-[#101422] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono border ${
                    scanReport.safetyScore >= 80
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : scanReport.safetyScore >= 50
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {scanReport.safetyScore}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>Contract Safety Index</span>
                    <span
                      className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded ${
                        scanReport.verdict === 'safe_to_sign'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : scanReport.verdict === 'caution_negotiate_terms'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {scanReport.verdict.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Found {scanReport.criticalCount} critical and {scanReport.highCount} high risk clause(s).
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500">{scanReport.wordCount} words analyzed</div>
            </div>

            {/* Identified Red-Flag Clauses */}
            <div className="space-y-3">
              {scanReport.foundRisks.map((detectedRiskClause) => (
                <div
                  key={detectedRiskClause.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                    detectedRiskClause.severity === 'critical'
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-amber-950/20 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      <AlertTriangle
                        className={`w-3.5 h-3.5 ${
                          detectedRiskClause.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      />
                      <span>{detectedRiskClause.title}</span>
                    </span>
                    <span
                      className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold ${
                        detectedRiskClause.severity === 'critical'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {detectedRiskClause.severity} Risk
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-300 bg-black/40 p-2 rounded border border-white/[0.04]">
                    {detectedRiskClause.detectedSnippet}
                  </div>

                  <p className="text-[11px] text-slate-300">{detectedRiskClause.dangerExplanation}</p>

                  <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold">
                        Recommended Counter-Clause:
                      </span>
                      <button
                        onClick={() => handleCopyCounter(detectedRiskClause.id, detectedRiskClause.recommendedCounterClause)}
                        className="px-2 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold flex items-center space-x-1 transition"
                      >
                        {copiedId === detectedRiskClause.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === detectedRiskClause.id ? 'Copied' : 'Copy Counter-Clause'}</span>
                      </button>
                    </div>
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/20 leading-relaxed">
                      {detectedRiskClause.recommendedCounterClause}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toast.success(`Sent follow-up nudge to ${deal.contactEmail}`)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] transition flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Follow-Up</span>
            </button>
            <button
              onClick={() => setActiveTab('contract_scanner')}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] transition flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Audit Contract</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenInvoice(deal)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Generate Invoice</span>
            </button>
            <button
              onClick={() => onDeleteDeal(deal.id)}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-1 transition"
              title="Remove Deal"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] text-slate-300 text-xs font-semibold hover:bg-white/[0.1]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
