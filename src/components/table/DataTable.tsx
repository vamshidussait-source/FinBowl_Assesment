import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  ListFilter,
  Search,
  SearchX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { useLoanSelection } from "../../context/LoanSelectionContext";
import type {
  DisbursementRow,
  DisbursementStatus,
} from "../../mocks/disbursement";

type Props = {
  data: DisbursementRow[];
  isLoading?: boolean;
  onFeedback?: (message: string) => void;
};

type ColumnOption = {
  label: string;
  selected: boolean;
};

const statusTone: Record<DisbursementStatus, string> = {
  Draft: "border-[#dedede] bg-white text-[#6f6f76] before:bg-[#8f8f95]",
  Submitted: "border-[#9befbf] bg-[#f2fff7] text-[#159852] before:bg-[#23c969]",
  Verified: "border-[#88d8ff] bg-[#f0f9ff] text-[#1686ca] before:bg-[#21a7ee]",
  Audited: "border-[#dbbaff] bg-[#fbf5ff] text-[#8a4be2] before:bg-[#a06cff]",
};

const initialColumnOptions: ColumnOption[] = [
  { label: "Disbursement Date", selected: true },
  { label: "Loan ID", selected: true },
  { label: "Status", selected: true },
  { label: "Applicant Name", selected: true },
  { label: "Bank Name", selected: true },
  { label: "Sanctioned Amt", selected: true },
  { label: "Verified", selected: true },
  { label: "Referral %", selected: true },
  { label: "Credit Executive", selected: true },
  { label: "Bank Executive", selected: true },
];

const initialsFor = (name: string) =>
  name.split(" ").map((part) => part[0]).join("").slice(0, 2);

const PersonCell = ({ name, offset = 0 }: { name: string; offset?: number }) => (
  <div className="flex min-w-[150px] items-center gap-2">
    <span
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white text-[10px] font-semibold text-white shadow-sm"
      style={{
        background: `linear-gradient(135deg, hsl(${28 + offset * 37} 58% 62%), hsl(${250 + offset * 19} 45% 42%))`,
      }}
    >
      {initialsFor(name)}
    </span>
    <span className="truncate">{name}</span>
  </div>
);

const HeaderLabel = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
    {label}
    <span className="inline-flex items-center gap-1 text-[#7c7786]">
      <ArrowUpDown size={13} strokeWidth={2} />
      <ListFilter size={13} strokeWidth={2} />
    </span>
  </span>
);

const LoadingRows = () => (
  <>
    {Array.from({ length: 7 }).map((_, rowIndex) => (
      <tr key={rowIndex} className="border-b border-[#ebe8f0]">
        {Array.from({ length: 11 }).map((__, colIndex) => (
          <td key={colIndex} className="h-[74px] px-5">
            <div className="h-4 rounded bg-[#eeeaf6]" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

const DataTable = ({ data, isLoading = false, onFeedback }: Props) => {
  const navigate = useNavigate();
  const { selectLoan } = useLoanSelection();
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [columnQuery, setColumnQuery] = useState("");
  const [columnOptions, setColumnOptions] = useState(initialColumnOptions);
  const [isCreateViewOpen, setIsCreateViewOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const hasRows = data.length > 0;
  const visibleColumns = useMemo(
    () => columnOptions.filter((option) => option.selected),
    [columnOptions],
  );

  const toggleRow = (id: string) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id],
    );
  };

  const toggleAllRows = () => {
    setSelectedRows((current) =>
      current.length === data.length ? [] : data.map((item) => item.id),
    );
  };

  const filteredColumnOptions = useMemo(() => {
    const needle = columnQuery.trim().toLowerCase();
    if (!needle) return columnOptions;
    return columnOptions.filter((option) =>
      option.label.toLowerCase().includes(needle),
    );
  }, [columnOptions, columnQuery]);

  const toggleColumn = (targetIndex: number) => {
    setColumnOptions((options) =>
      options.map((option, index) =>
        index === targetIndex
          ? { ...option, selected: !option.selected }
          : option,
      ),
    );
  };

  const handleCreateView = () => {
    if (!viewName.trim()) {
      onFeedback?.("Please enter a view name before saving.");
      return;
    }
    setIsCreateViewOpen(false);
    setIsColumnMenuOpen(false);
    setViewName("");
    onFeedback?.(`Saved view "${viewName.trim()}" created.`);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-[#ded9e8] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1540px] w-full border-collapse text-left text-[15px] text-[#3f3d46]">
            <thead className="bg-[#f5effd] text-[13px] font-semibold text-[#64606d]">
              <tr className="border-b border-[#e0d9eb]">
                <th className="w-[58px] px-5 py-[18px]">
                  <label className="flex h-5 w-5 items-center justify-center rounded border border-[#d7d4dc] bg-white">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={toggleAllRows}
                      className="h-4 w-4 rounded border border-[#d7d4dc] bg-white text-[#6a5aab]"
                    />
                  </label>
                </th>
                {visibleColumns.map((column) => (
                  <th key={column.label} className="px-5 py-[18px]">
                    <HeaderLabel label={column.label} />
                  </th>
                ))}
                <th className="relative w-[48px] px-4 py-[14px] text-[#7d46df]">
                  <button
                    aria-label="Select columns"
                    onClick={() => setIsColumnMenuOpen((open) => !open)}
                    className={`grid h-7 w-7 place-items-center rounded-md border bg-white ${
                      isColumnMenuOpen
                        ? "border-[#8d55e6] text-[#7d46df]"
                        : "border-[#d9d0e9] text-[#7d46df]"
                    }`}
                  >
                    <Columns2 size={16} strokeWidth={2} />
                  </button>

                  {isColumnMenuOpen && (
                    <div className="absolute right-3 top-[68px] z-30 w-[274px] overflow-hidden rounded-xl border border-[#e0dce7] bg-white text-left text-[15px] font-normal text-[#42404a] shadow-[0_12px_30px_rgba(37,28,52,0.16)]">
                      <div className="p-3 pb-2">
                        <label className="flex h-10 items-center rounded-lg border border-[#d8d3df] bg-white px-3">
                          <Search size={17} className="text-[#aaa5b0]" />
                          <input
                            value={columnQuery}
                            onChange={(event) => setColumnQuery(event.target.value)}
                            className="ml-2 min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none placeholder:text-[#89848f]"
                            placeholder="Search for Loans"
                          />
                        </label>
                      </div>

                      <div className="max-h-[410px] overflow-y-auto px-3 pb-3">
                        {filteredColumnOptions.map((option, idx) => {
                          const originalIndex = columnOptions.findIndex(
                            (candidate, index) =>
                              candidate.label === option.label &&
                              candidate.selected === option.selected &&
                              !filteredColumnOptions.slice(0, idx).some(
                                (seen) =>
                                  seen.label === candidate.label &&
                                  seen.selected === option.selected &&
                                  columnOptions.indexOf(candidate) === index,
                              ),
                          );
                          return (
                            <button
                              key={`${option.label}-${originalIndex}`}
                              onClick={() => toggleColumn(originalIndex)}
                              className="flex h-[38px] w-full items-center gap-2 rounded-md text-left text-[15px] font-semibold text-[#47434f] hover:bg-[#faf8fd]"
                            >
                              <span
                                className={`grid h-4 w-4 place-items-center rounded border ${
                                  option.selected
                                    ? "border-[#8053de] bg-[#8053de] text-white"
                                    : "border-[#d8d3df] bg-white text-transparent"
                                }`}
                              >
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-3 border-t border-[#ece8f1] px-3 py-3">
                        <button
                          onClick={() => setIsCreateViewOpen(true)}
                          className="h-9 flex-1 rounded-md bg-[#8053de] text-[15px] font-semibold text-white"
                        >
                          Save View
                        </button>
                        <button
                          onClick={() => setIsColumnMenuOpen(false)}
                          className="h-9 flex-1 rounded-md text-[15px] font-semibold text-[#6d6674]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading && <LoadingRows />}

              {!isLoading &&
                hasRows &&
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="h-[74px] border-b border-[#ebe8f0] transition hover:bg-[#fbf9ff]"
                    onClick={() => {
                      selectLoan(item);
                      navigate(`/loan/${item.id}`);
                    }}
                  >
                    <td className="px-5">
                      <label className="flex h-5 w-5 items-center justify-center rounded border border-[#d7d4dc] bg-white">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            event.stopPropagation();
                            toggleRow(item.id);
                          }}
                          className="h-4 w-4 rounded border border-[#d7d4dc] bg-white text-[#6a5aab]"
                        />
                      </label>
                    </td>
                    <td className="whitespace-nowrap px-5">{item.date}</td>
                    <td className="whitespace-nowrap px-5 font-medium text-[#8659e8]">
                      {item.id}
                    </td>
                    <td className="px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold before:h-1.5 before:w-1.5 before:rounded-full before:content-[''] ${statusTone[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 font-semibold text-[#282630]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/loan/${item.id}`);
                        }}
                        className="text-left font-semibold text-[#282630] hover:underline"
                      >
                        {item.applicant}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-5">{item.bank}</td>
                    <td className="whitespace-nowrap px-5 text-right">
                      {item.sanctionedAmount}
                    </td>
                    <td className="whitespace-nowrap px-5 text-right">
                      {item.verifiedAmount}
                    </td>
                    <td className="whitespace-nowrap px-5 text-right">
                      {item.referral}
                    </td>
                    <td className="px-5">
                      <PersonCell name={item.creditExecutive} offset={index} />
                    </td>
                    <td className="px-5">
                      <PersonCell name={item.bankExecutive} offset={index + 4} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!isLoading && !hasRows && (
          <div className="grid min-h-[390px] place-items-center border-t border-[#ebe8f0] px-6 text-center">
            <div>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f5effd] text-[#7b4dde]">
                <SearchX size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#282630]">
                No disbursements found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[#706b7a]">
                Try a different search term or clear the saved-view filter.
              </p>
            </div>
          </div>
        )}

        <div className="flex min-h-[92px] flex-col gap-4 border-t border-[#ebe8f0] px-6 py-5 text-[15px] text-[#625d6b] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-medium">Page</span>
            <button className="h-10 min-w-10 rounded-lg border border-[#ded9e8] bg-white px-3 font-medium text-[#2c2932] shadow-sm">
              1
            </button>
            <span className="font-medium">of 10</span>
            <span className="mx-2 h-6 w-px bg-[#dfdbe6]" />
            <span className="font-medium">Rows per page</span>
            <button className="inline-flex h-10 items-center gap-3 rounded-lg border border-[#ded9e8] bg-white px-3 font-medium text-[#2c2932] shadow-sm">
              10
              <ChevronRight size={15} className="rotate-90 text-[#8c8795]" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#ded9e8] bg-white text-[#aaa5b2] shadow-sm">
              <ChevronsLeft size={18} />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#ded9e8] bg-white text-[#aaa5b2] shadow-sm">
              <ChevronLeft size={18} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`h-10 min-w-10 rounded-lg px-3 font-medium ${
                  page === 1 ? "bg-[#f8f6fb] text-[#2d2934]" : "text-[#706b78]"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-2">...</span>
            {[8, 9, 10].map((page) => (
              <button
                key={page}
                className="h-10 min-w-10 rounded-lg px-3 font-medium text-[#706b78]"
              >
                {page}
              </button>
            ))}
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#ded9e8] bg-white text-[#aaa5b2] shadow-sm">
              <ChevronRight size={18} />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-[#ded9e8] bg-white text-[#aaa5b2] shadow-sm">
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Custom View Modal */}
      <Modal
        open={isCreateViewOpen}
        onClose={() => setIsCreateViewOpen(false)}
        title="Create Custom View"
        footer={
          <>
            <button
              onClick={() => setIsCreateViewOpen(false)}
              className="h-11 flex-1 rounded-lg border border-[#d8d3df] bg-white text-[15px] font-semibold text-[#5b5663] shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateView}
              className="h-11 flex-1 rounded-lg bg-[#8053de] text-[15px] font-semibold text-white shadow-sm"
            >
              Create View
            </button>
          </>
        }
      >
        <label className="block text-[13px] font-semibold text-[#5e5966]">
          Enter View Name <span className="text-[#8053de]">*</span>
        </label>
        <input
          value={viewName}
          onChange={(event) => setViewName(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-[#d8d3df] px-3 text-[15px] outline-none placeholder:text-[#908a97] focus:border-[#8053de] focus:ring-2 focus:ring-[#c7a8ff]"
          placeholder="Enter View Name"
        />
      </Modal>
    </>
  );
};

export default DataTable;
