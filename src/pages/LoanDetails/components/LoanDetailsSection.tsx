import type { LoanRecord } from "../../../mocks/loanDetails";

type Props = {
  loan: LoanRecord;
};

const FieldRow = ({ label, value, className }: { label: string; value: string; className?: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[12px] font-medium text-[#717680]">{label}</span>
    <span className={`text-[14px] font-semibold text-[#24212b] ${className ?? ""}`}>{value}</span>
  </div>
);

const LoanDetailsSection = ({ loan }: Props) => {
  return (
    <div className="space-y-6">
      {/* Loan basic info */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        <FieldRow label="Loan ID" value={loan.id} />
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-[#717680]">Loan Type</span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#dbbaff] bg-[#f9f3ff] px-2 py-1 text-[12px] font-semibold text-[#7b3ec9]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
            {loan.loanType}
          </span>
        </div>
        <FieldRow label="Bank" value={loan.bank} />
        <FieldRow label="Stage" value={loan.stage} />
      </div>

      <div className="h-px bg-[#f0edf8]" />

      {/* Sanction Details */}
      <div>
        <h3 className="mb-4 text-[14px] font-semibold text-[#1a1523]">Sanction Details</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          <FieldRow label="Sanctioned Date" value={loan.sanctionDate} />
          <FieldRow label="Loan Sanctioned Amount" value={loan.sanctionedAmount} className="text-[#1a9e5c]" />
          <FieldRow label="Verified Sanctioned Amount" value={loan.verifiedAmount} className="text-[#1a9e5c]" />
        </div>
      </div>

      <div className="h-px bg-[#f0edf8]" />

      {/* Team Details */}
      <div>
        <h3 className="mb-4 text-[14px] font-semibold text-[#1a1523]">Team Details</h3>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          <FieldRow label="Bank Executive Name" value={loan.bankExecutive} />
          <FieldRow label="Credit Executive Details" value={loan.creditExecutive} />
          <FieldRow label="Source" value={loan.source} />
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsSection;
