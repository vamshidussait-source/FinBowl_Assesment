import { ChevronRight, Archive, History, Edit } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import type { LoanRecord } from "../../../mocks/loanDetails";

type Props = {
  loan: LoanRecord;
  showTiles: boolean;
  onToggleTiles: () => void;
  onActivityLog: () => void;
};

const LoanHeader = ({ loan, showTiles, onToggleTiles, onActivityLog }: Props) => {
  return (
    <div className="space-y-3">
      {/* Top row: Loan ID + actions + toggle */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-[#181D27]">
            {loan.id}
          </h1>
          <div className="mt-1 flex items-center gap-1 text-[12px]">
            <span className="font-medium text-[#717680]">RMS</span>
            <ChevronRight size={14} className="shrink-0 text-[#D5D7DA]" />
            <span className="font-medium text-[#717680]">Disbursement</span>
            <ChevronRight size={14} className="shrink-0 text-[#D5D7DA]" />
            <span className="font-medium text-[#6941C6]">{loan.applicant}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#D5D7DA] bg-white px-3 text-[14px] font-semibold text-[#4b4a53] shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_-2px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.18)]">
            <Archive size={16} className="text-[#A4A7AE]" />
            Archive
          </button>
          <button
            onClick={onActivityLog}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#D5D7DA] bg-white px-3 text-[14px] font-semibold text-[#4b4a53] shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_-2px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(0,0,0,0.18)]"
          >
            <History size={16} className="text-[#A4A7AE]" />
            Activity Logs
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#8053de] px-4 text-[14px] font-semibold text-white shadow-sm hover:bg-[#6d44c8]">
            <Edit size={15} />
            Edit Loan
          </button>

          <label className="ml-1 flex cursor-pointer items-center gap-2">
            <span className="text-[13px] font-medium text-[#65606c]">Summary Tiles</span>
            <button
              onClick={onToggleTiles}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                showTiles ? "bg-[#8053de]" : "bg-[#ccc]"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                  showTiles ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Applicant info */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-bold text-[#24212b]">{loan.applicant}</span>
          <Badge status={loan.status} />
        </div>
        <p className="mt-0.5 text-[14px] font-medium text-[#717680]">{loan.loanType}</p>
      </div>
    </div>
  );
};

export default LoanHeader;
