export type DisbursementStatus = "Draft" | "Submitted" | "Verified" | "Audited";

export type DisbursementRow = {
  id: string;
  date: string;
  status: DisbursementStatus;
  applicant: string;
  bank: string;
  sanctionedAmount: string;
  verifiedAmount: string;
  referral: string;
  creditExecutive: string;
  bankExecutive: string;
};

export const loanDetailMap: Record<
  string,
  {
    purpose: string;
    tenure: string;
    interest: string;
    documents: string[];
    contact: string;
  }
> = {
  "LN002-24-1001": {
    purpose: "Home renovation",
    tenure: "24 months",
    interest: "11.5%",
    documents: ["KYC", "Salary slips", "Property papers", "Bank statement"],
    contact: "+91 98765 43210",
  },
  "LN003-24-1002": {
    purpose: "Business expansion",
    tenure: "36 months",
    interest: "12.0%",
    documents: ["KYC", "GST certificate", "Bank statement", "Business proof"],
    contact: "+91 98765 11111",
  },
  "LN004-24-1003": {
    purpose: "Medical expenses",
    tenure: "18 months",
    interest: "13.2%",
    documents: ["KYC", "Medical bills", "Income proof", "Bank statement"],
    contact: "+91 98765 22222",
  },
  "LN005-24-1004": {
    purpose: "Education",
    tenure: "30 months",
    interest: "10.8%",
    documents: ["KYC", "Admission letter", "Income proof", "Bank statement"],
    contact: "+91 98765 33333",
  },
  "LN006-24-1005": {
    purpose: "Vehicle purchase",
    tenure: "48 months",
    interest: "10.2%",
    documents: ["KYC", "Invoice", "Income proof", "Bank statement"],
    contact: "+91 98765 44444",
  },
  "LN007-24-1006": {
    purpose: "Wedding expenses",
    tenure: "24 months",
    interest: "11.8%",
    documents: ["KYC", "Income proof", "Bank statement", "ID proof"],
    contact: "+91 98765 55555",
  },
  "LN001-24-1004": {
    purpose: "Debt consolidation",
    tenure: "42 months",
    interest: "11.1%",
    documents: ["KYC", "Debt statements", "Income proof", "Bank statement"],
    contact: "+91 98765 66666",
  },
  "LN008-24-1007": {
    purpose: "Equipment finance",
    tenure: "60 months",
    interest: "12.3%",
    documents: ["KYC", "Quotation", "Bank statement", "Business proof"],
    contact: "+91 98765 77777",
  },
  "LN009-24-1008": {
    purpose: "Travel planning",
    tenure: "20 months",
    interest: "11.4%",
    documents: ["KYC", "Travel itinerary", "Income proof", "Bank statement"],
    contact: "+91 98765 88888",
  },
  "LN010-24-1009": {
    purpose: "Personal loan",
    tenure: "36 months",
    interest: "10.9%",
    documents: ["KYC", "Income proof", "Bank statement", "ID proof"],
    contact: "+91 98765 99999",
  },
};

export const disbursementData: DisbursementRow[] = [
  {
    id: "LN002-24-1001",
    date: "30/04/2024",
    status: "Draft",
    applicant: "Arjun Mehta",
    bank: "HDFC Bank",
    sanctionedAmount: "7500.00",
    verifiedAmount: "₹7,00,000.00",
    referral: "0.1500%",
    creditExecutive: "Arjun Mehta",
    bankExecutive: "Siddharth Rao",
  },
  {
    id: "LN003-24-1002",
    date: "30/09/2024",
    status: "Submitted",
    applicant: "Mohit Agarwal",
    bank: "ICICI Bank",
    sanctionedAmount: "12000.00",
    verifiedAmount: "--",
    referral: "0.2500%",
    creditExecutive: "Mohit Agarwal",
    bankExecutive: "Tanvi Mehta",
  },
  {
    id: "LN004-24-1003",
    date: "12/05/2027",
    status: "Submitted",
    applicant: "Priya Singh",
    bank: "Axis Bank",
    sanctionedAmount: "15000.00",
    verifiedAmount: "--",
    referral: "0.3500%",
    creditExecutive: "Priya Singh",
    bankExecutive: "Deepa Shah",
  },
  {
    id: "LN005-24-1004",
    date: "15/01/2024",
    status: "Submitted",
    applicant: "Simran Anand",
    bank: "State Bank of India",
    sanctionedAmount: "22000.00",
    verifiedAmount: "--",
    referral: "0.4500%",
    creditExecutive: "Simran Anand",
    bankExecutive: "Suresh Iyer",
  },
  {
    id: "LN006-24-1005",
    date: "20/02/2024",
    status: "Submitted",
    applicant: "Ravi Sharma",
    bank: "Kotak Mahindra Bank",
    sanctionedAmount: "30000.00",
    verifiedAmount: "--",
    referral: "0.5500%",
    creditExecutive: "Ravi Sharma",
    bankExecutive: "Rahul Verma",
  },
  {
    id: "LN007-24-1006",
    date: "20/02/2024",
    status: "Submitted",
    applicant: "Sneha Joshi",
    bank: "Punjab National Bank",
    sanctionedAmount: "40000.00",
    verifiedAmount: "--",
    referral: "0.6500%",
    creditExecutive: "Sneha Joshi",
    bankExecutive: "Pooja Singh",
  },
  {
    id: "LN001-24-1004",
    date: "20/02/2024",
    status: "Verified",
    applicant: "Vikram Desai",
    bank: "Canara Bank",
    sanctionedAmount: "55000.00",
    verifiedAmount: "₹15,78,901.00",
    referral: "0.7500%",
    creditExecutive: "Vikram Desai",
    bankExecutive: "Manish Arora",
  },
  {
    id: "LN008-24-1007",
    date: "20/02/2024",
    status: "Audited",
    applicant: "Anjali Rao",
    bank: "Bank of Baroda",
    sanctionedAmount: "75000.00",
    verifiedAmount: "₹16,89,012.00",
    referral: "0.8500%",
    creditExecutive: "Anjali Rao",
    bankExecutive: "Kavita Patel",
  },
  {
    id: "LN009-24-1008",
    date: "20/02/2024",
    status: "Audited",
    applicant: "Karan Iyer",
    bank: "Union Bank of India",
    sanctionedAmount: "90000.00",
    verifiedAmount: "₹17,00,123.00",
    referral: "0.9500%",
    creditExecutive: "Karan Iyer",
    bankExecutive: "Ankit Patel",
  },
  {
    id: "LN010-24-1009",
    date: "20/02/2024",
    status: "Verified",
    applicant: "Neha Gupta",
    bank: "IDFC FIRST Bank",
    sanctionedAmount: "130000.00",
    verifiedAmount: "₹18,11,234.00",
    referral: "1.1500%",
    creditExecutive: "Neha Gupta",
    bankExecutive: "Ritika Menon",
  },
];
