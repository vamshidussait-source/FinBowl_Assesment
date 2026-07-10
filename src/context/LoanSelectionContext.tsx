import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { DisbursementRow } from "../mocks/disbursement";
import type { LoanRecord } from "../mocks/loanDetails";
import { LOAN_DB } from "../mocks/loanDetails";

type LoanSelectionContextValue = {
  selectedLoanId: string | null;
  selectedLoanRow: DisbursementRow | null;
  selectedLoanRecord: LoanRecord | null;
  selectLoan: (row: DisbursementRow) => void;
  clearSelection: () => void;
};

const LoanSelectionContext = createContext<LoanSelectionContextValue | undefined>(undefined);

export const LoanSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [selectedLoanRow, setSelectedLoanRow] = useState<DisbursementRow | null>(null);
  const [selectedLoanRecord, setSelectedLoanRecord] = useState<LoanRecord | null>(null);

  const selectLoan = (row: DisbursementRow) => {
    setSelectedLoanId(row.id);
    setSelectedLoanRow(row);
    setSelectedLoanRecord(LOAN_DB[row.id] ?? LOAN_DB.default ?? null);
  };

  const clearSelection = () => {
    setSelectedLoanId(null);
    setSelectedLoanRow(null);
    setSelectedLoanRecord(null);
  };

  const value = useMemo(
    () => ({
      selectedLoanId,
      selectedLoanRow,
      selectedLoanRecord,
      selectLoan,
      clearSelection,
    }),
    [selectedLoanId, selectedLoanRecord, selectedLoanRow],
  );

  return (
    <LoanSelectionContext.Provider value={value}>
      {children}
    </LoanSelectionContext.Provider>
  );
};

export const useLoanSelection = () => {
  const context = useContext(LoanSelectionContext);

  if (!context) {
    throw new Error("useLoanSelection must be used within a LoanSelectionProvider");
  }

  return context;
};
