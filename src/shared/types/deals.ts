export type DealStage = 'New' | 'Pitched' | 'Negotiating' | 'Active' | 'Delivered' | 'Paid';

export interface SponsorshipDeal {
  id: string;
  brandName: string;
  contactEmail: string;
  stage: DealStage;
  dealValue: number;
  deliverables: string[];
  deadline: string;
  usageRights: string;
  exclusivityWindow: string;
  paymentTerms: string;
  paidAmount: number;
  notes: string;
  lastContactDate: string;
}
