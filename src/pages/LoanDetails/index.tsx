import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  FileText,
  Share2,
  StickyNote,
  Paperclip,
  Landmark,
  Users,
} from "lucide-react";
import CollapsibleSection from "../../components/ui/CollapsibleSection";
import LoanHeader from "./components/LoanHeader";
import LoanDetailsNav from "./components/LoanDetailsNav";
import SummaryTiles from "./components/SummaryTiles";
import ApplicantTable from "./components/ApplicantTable";
import LoanDetailsSection from "./components/LoanDetailsSection";
import DisbursementTable from "./components/DisbursementTable";
import CommissionTable from "./components/CommissionTable";
import BrokerTable from "./components/BrokerTable";
import NotesSection from "./components/NotesSection";
import DocumentsSection from "./components/DocumentsSection";
import ActivityLog from "./components/ActivityLog";
import {
  LOAN_DB,
  LOAN_DETAILS_DB,
  parseAmount,
  formatINR,
} from "../../mocks/loanDetails";
import { useLoanSelection } from "../../context/LoanSelectionContext";

const LoanDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedLoanRecord, selectedLoanId, selectLoan } = useLoanSelection();
  const [showTiles, setShowTiles] = useState(true);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const routeLoan = LOAN_DB[id];
    if (routeLoan && selectedLoanId !== id) {
      selectLoan({
        id,
        date: routeLoan.sanctionDate,
        status:
          routeLoan.status === "Processed"
            ? "Audited"
            : routeLoan.status === "Lead"
              ? "Draft"
              : routeLoan.status,
        applicant: routeLoan.applicant,
        bank: routeLoan.bank,
        sanctionedAmount: routeLoan.sanctionedAmount,
        verifiedAmount: routeLoan.verifiedAmount,
        referral: "0.0000%",
        creditExecutive: routeLoan.creditExecutive,
        bankExecutive: routeLoan.bankExecutive,
      });
    }
  }, [id, selectLoan, selectedLoanId]);

  const loan = useMemo(() => {
    if (selectedLoanRecord) {
      return selectedLoanRecord;
    }

    return id && LOAN_DB[id] ? LOAN_DB[id] : LOAN_DB.default;
  }, [id, selectedLoanRecord]);

  const details = useMemo(() => {
    return id && LOAN_DETAILS_DB[id]
      ? LOAN_DETAILS_DB[id]
      : LOAN_DETAILS_DB.default;
  }, [id]);

  // Compute summary tile values
  const totalDisbursementAmount = details.disbursements.reduce(
    (sum, d) => sum + parseAmount(d.amount),
    0,
  );
  const totalCommissionIncome = details.commissions.reduce(
    (sum, c) => sum + parseAmount(c.amount),
    0,
  );
  const totalReferralFee = details.brokers.reduce(
    (sum, b) => sum + parseAmount(b.fee),
    0,
  );
  const netIncome = totalCommissionIncome - totalReferralFee;

  const tiles = [
    { label: "Total Sanctioned Amount", value: loan.sanctionedAmount },
    {
      label: "Total Disbursement Amount",
      value: formatINR(totalDisbursementAmount),
    },
    { label: "Commission Income", value: formatINR(totalCommissionIncome) },
    { label: "Referral Fee", value: formatINR(totalReferralFee) },
    { label: "Net Income", value: formatINR(netIncome), green: true },
  ];

  return (
    <div className="mx-auto w-full max-w-[1640px] min-w-0">
      {/* Header */}
      <LoanHeader
        loan={loan}
        showTiles={showTiles}
        onToggleTiles={() => setShowTiles((s) => !s)}
        onActivityLog={() => setIsActivityLogOpen(true)}
      />

      {/* Summary tiles */}
      {showTiles && <SummaryTiles tiles={tiles} />}

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Section navigation */}
        <LoanDetailsNav />

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Applicant Information */}
          <CollapsibleSection
            id="applicant-info"
            icon={<User size={15} />}
            title="Applicant Information"
          >
            <ApplicantTable applicants={details.applicants} />
          </CollapsibleSection>

          {/* Loan Details */}
          <CollapsibleSection
            id="loan-details"
            icon={<FileText size={15} />}
            title="Loan Details"
          >
            <LoanDetailsSection loan={loan} />
          </CollapsibleSection>

          {/* Disbursements Information */}
          <CollapsibleSection
            id="disbursements-info"
            icon={<Landmark size={15} />}
            title="Disbursements Information"
          >
            <DisbursementTable disbursements={details.disbursements} />
          </CollapsibleSection>

          {/* Commission */}
          <CollapsibleSection
            id="commission"
            icon={<Share2 size={15} />}
            title="Commission"
          >
            <CommissionTable
              commissions={details.commissions}
              totalCommission={formatINR(totalCommissionIncome)}
            />
          </CollapsibleSection>

          {/* Broker Information */}
          <CollapsibleSection
            id="broker-info"
            icon={<Users size={15} />}
            title="Broker Information"
          >
            <BrokerTable
              brokers={details.brokers}
              totalReferralFee={formatINR(totalReferralFee)}
            />
          </CollapsibleSection>

          {/* Notes / Additional Information */}
          <CollapsibleSection
            id="additional-info"
            icon={<StickyNote size={15} />}
            title="Notes / Additional Information"
          >
            <NotesSection text={details.notes} />
          </CollapsibleSection>

          {/* Documents */}
          <CollapsibleSection
            id="documents"
            icon={<Paperclip size={15} />}
            title="Documents"
          >
            <DocumentsSection documents={details.documents} />
          </CollapsibleSection>
        </div>
      </div>

      {/* Activity Log slide-out panel */}
      <ActivityLog
        open={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
        entries={details.activityLog}
      />
    </div>
  );
};

export default LoanDetails;
