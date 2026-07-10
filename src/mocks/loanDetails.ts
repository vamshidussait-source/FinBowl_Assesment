// ─── Types ────────────────────────────────────────────────────────────────────

export type LoanStatus = "Draft" | "Submitted" | "Verified" | "Processed" | "Audited" | "Lead";

export type LoanRecord = {
  id: string;
  applicant: string;
  loanType: string;
  bank: string;
  stage: string;
  status: LoanStatus;
  sanctionDate: string;
  sanctionedAmount: string;
  verifiedAmount: string;
  bankExecutive: string;
  creditExecutive: string;
  source: string;
};

export type Applicant = {
  name: string;
  type: "Applicant" | "Co-Applicant";
  email: string;
  phone: string;
};

export type Disbursement = {
  id: string;
  date: string;
  amount: string;
  verified: string;
  utr: string;
  tranche: string;
  status: LoanStatus;
};

export type Commission = {
  name: string;
  subCode: string;
  gross: string;
  amount: string;
  invoice: string;
  status: "Paid" | "Unpaid";
};

export type Broker = {
  name: string;
  code: string;
  type: "Aggregator" | "Sub-connector";
  pct: string;
  fee: string;
  po: string;
  date: string;
  status: "Paid" | "Unpaid";
};

export type ActivityEntry = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  field?: string;
  from?: string;
  to?: string;
};

export type LoanDetailsData = {
  applicants: Applicant[];
  disbursements: Disbursement[];
  commissions: Commission[];
  brokers: Broker[];
  documents: string[];
  activityLog: ActivityEntry[];
  notes: string;
};

// ─── Imports from disbursement mock ───────────────────────────────────────────

import { disbursementData, loanDetailMap } from "./disbursement";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const parseAmount = (s: string | number): number => {
  if (typeof s === "number") return s;
  if (!s || s === "--") return 0;
  const n = String(s).replace(/[^0-9.-]+/g, "");
  const v = parseFloat(n);
  return Number.isNaN(v) ? 0 : v;
};

export const formatINR = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR" });

const toLoanStatus = (status: string): LoanStatus => {
  switch (status) {
    case "Draft":
      return "Draft";
    case "Submitted":
      return "Submitted";
    case "Verified":
      return "Verified";
    case "Audited":
      return "Audited";
    default:
      return "Draft";
  }
};

const slugName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z.]/g, "");

const toPhone = (contact?: string, offset = 0): string => {
  const digits = (contact || "+91 98765 43210").replace(/\D/g, "").slice(-10);
  let num = parseInt(digits || "9876543210", 10) + offset;
  if (num > 9999999999) num = 9876543210;
  return `+91 ${String(num).padStart(10, "0")}`;
};

const cleanDate = (date: string) => date.replace(/\//g, "-");

const loanTypeFromPurpose = (purpose: string): string => {
  const map: Record<string, string> = {
    "Home renovation": "Home Loan",
    "Business expansion": "Business Loan",
    "Medical expenses": "Personal Loan",
    Education: "Education Loan",
    "Vehicle purchase": "Vehicle Loan",
    "Wedding expenses": "Personal Loan",
    "Debt consolidation": "Loan Against Property",
    "Equipment finance": "Equipment Loan",
    "Travel planning": "Personal Loan",
    "Personal loan": "Personal Loan",
  };
  return map[purpose] || "Personal Loan";
};

const generateIdHash = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

// ─── Build detailed data from a disbursement row ──────────────────────────────

const buildDetails = (
  row: (typeof disbursementData)[number],
  detail: (typeof loanDetailMap)[string],
): LoanDetailsData => {
  const hash = generateIdHash(row.id);

  // Applicants
  const applicants: Applicant[] = [
    {
      name: row.applicant,
      type: "Applicant",
      email: `${slugName(row.applicant)}@gmail.com`,
      phone: toPhone(detail.contact, 0),
    },
  ];
  if (hash % 2 === 0) {
    applicants.push({
      name: `Co-${row.applicant.split(" ")[0]}`,
      type: "Co-Applicant",
      email: `co.${slugName(row.applicant)}@gmail.com`,
      phone: toPhone(detail.contact, 1),
    });
  }

  // Disbursements
  const sanctioned = parseAmount(row.sanctionedAmount);
  const verified = parseAmount(row.verifiedAmount);
  const total = verified > 0 ? verified : sanctioned;
  const count = 2 + (hash % 3);
  const disbursements: Disbursement[] = [];
  let remaining = total;

  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const amount = isLast
      ? remaining
      : Math.max(1000, Math.round(total / count / 100) * 100);
    remaining -= amount;
    disbursements.push({
      id: `DB${row.id.replace(/-/g, "")}-${i + 1}`,
      date: cleanDate(row.date),
      amount: formatINR(amount),
      verified: formatINR(amount),
      utr: String(426715893300 + ((hash + i) % 100)),
      tranche: "Full",
      status: toLoanStatus(row.status),
    });
  }

  // Commissions
  const referralPct = parseAmount(row.referral);
  const commissionTotal = Math.max(
    1000,
    Math.round(total * (referralPct / 100)),
  );
  const commissions: Commission[] = [
    {
      name: row.bankExecutive,
      subCode: row.referral,
      gross: `${(referralPct * 1.2).toFixed(4)}%`,
      amount: formatINR(commissionTotal),
      invoice: `RMS-INV-${row.id.replace(/-/g, "")}`,
      status: "Paid",
    },
  ];
  if (hash % 3 === 0) {
    commissions.push({
      name: row.creditExecutive,
      subCode: `${(referralPct * 0.8).toFixed(4)}%`,
      gross: `${(referralPct * 1.5).toFixed(4)}%`,
      amount: formatINR(Math.round(commissionTotal * 0.6)),
      invoice: `RMS-INV-${row.id.replace(/-/g, "")}-02`,
      status: "Paid",
    });
  }

  // Brokers
  const brokers: Broker[] = [
    {
      name: row.bankExecutive,
      code: `CON-${row.id.slice(-4)}`,
      type: "Aggregator",
      pct: row.referral,
      fee: formatINR(commissionTotal),
      po: `RMS-PO-${row.id.replace(/-/g, "")}`,
      date: cleanDate(row.date),
      status: "Paid",
    },
  ];
  if (hash % 3 !== 2) {
    brokers.push({
      name: row.creditExecutive,
      code: `CON-${row.id.slice(-4)}-S`,
      type: "Sub-connector",
      pct: `${(referralPct * 0.9).toFixed(4)}%`,
      fee: formatINR(Math.round(commissionTotal * 0.5)),
      po: `RMS-PO-${row.id.replace(/-/g, "")}-02`,
      date: cleanDate(row.date),
      status: "Paid",
    });
  }

  // Documents
  const documents = detail.documents.map((doc) => `${doc.replace(/\s+/g, "_")}.pdf`);

  // Activity log
  const baseStatus = toLoanStatus(row.status);
  const activityLog: ActivityEntry[] = [
    {
      id: "1",
      action: "Loan Created",
      user: row.bankExecutive,
      timestamp: `${cleanDate(row.date)} (9:20 AM)`,
    },
    {
      id: "2",
      action: "Status Updated",
      user: row.creditExecutive,
      timestamp: `${cleanDate(row.date)} (10:30 AM)`,
      field: "Status",
      from: "Submitted",
      to: baseStatus,
    },
  ];
  if (verified > 0) {
    activityLog.push({
      id: "3",
      action: "Updated",
      user: row.bankExecutive,
      timestamp: `${cleanDate(row.date)} (11:45 AM)`,
      field: "Verified Amount",
      from: "--",
      to: formatINR(verified),
    });
  }

  // Notes
  const notes = `Loan applied for ${detail.purpose.toLowerCase()}. Tenure: ${detail.tenure}, Interest: ${detail.interest}. Documents verified and submitted to ${row.bank}. Contact: ${detail.contact}.`;

  return {
    applicants,
    disbursements,
    commissions,
    brokers,
    documents,
    activityLog,
    notes,
  };
};

// ─── Build per-loan databases ─────────────────────────────────────────────────

export const LOAN_DB: Record<string, LoanRecord> = {};
export const LOAN_DETAILS_DB: Record<string, LoanDetailsData> = {};

disbursementData.forEach((row) => {
  const detail = loanDetailMap[row.id];
  if (!detail) return;

  LOAN_DB[row.id] = {
    id: row.id,
    applicant: row.applicant,
    loanType: loanTypeFromPurpose(detail.purpose),
    bank: row.bank,
    stage: row.status,
    status: toLoanStatus(row.status),
    sanctionDate: row.date,
    sanctionedAmount: formatINR(parseAmount(row.sanctionedAmount)),
    verifiedAmount: row.verifiedAmount === "--" ? "--" : formatINR(parseAmount(row.verifiedAmount)),
    bankExecutive: row.bankExecutive,
    creditExecutive: row.creditExecutive,
    source: detail.purpose,
  };

  LOAN_DETAILS_DB[row.id] = buildDetails(row, detail);
});

// Default fallback to the first disbursement row
const firstId = disbursementData[0]?.id;
if (firstId && LOAN_DB[firstId]) {
  LOAN_DB.default = LOAN_DB[firstId];
  LOAN_DETAILS_DB.default = LOAN_DETAILS_DB[firstId];
}

// ─── Backward-compatible default exports ──────────────────────────────────────

const defaultDetails = LOAN_DETAILS_DB.default;

export const applicants = defaultDetails?.applicants ?? [];
export const disbursements = defaultDetails?.disbursements ?? [];
export const commissions = defaultDetails?.commissions ?? [];
export const brokers = defaultDetails?.brokers ?? [];
export const documents = defaultDetails?.documents ?? [];
export const activityLog = defaultDetails?.activityLog ?? [];
export const NOTES_TEXT = defaultDetails?.notes ?? "";
