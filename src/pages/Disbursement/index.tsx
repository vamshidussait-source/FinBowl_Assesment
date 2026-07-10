import { useMemo, useState } from "react";
import {
  ChevronDown,
  CloudUpload,
  ListRestart,
  Plus,
  RotateCcw,
} from "lucide-react";
import DataTable from "../../components/table/DataTable";
import SearchInput from "../../components/ui/SearchInput";
import { disbursementData } from "../../mocks/disbursement";

const summaryCards = [
  { label: "Total Disbursements", value: "8" },
  { label: "Total Disbursed Amount", value: "₹3,62,50,000" },
  { label: "Submitted", value: "12" },
  { label: "Verified", value: "1" },
  { label: "Processed", value: "5" },
  { label: "Audited", value: "12" },
];

const savedViewOptions = [
  { label: "My Loan View", tag: "Default View" },
  { label: "Priority Loans" },
  { label: "Submitted Loans" },
  { label: "Draft Applications" },
];

const Disbursement = () => {
  const [query, setQuery] = useState("");
  const [isSavedViewOpen, setIsSavedViewOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeView, setActiveView] = useState("My Loan View");

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return disbursementData;
    }

    return disbursementData.filter((row) =>
      [
        row.id,
        row.applicant,
        row.bank,
        row.status,
        row.creditExecutive,
        row.bankExecutive,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 280);
  };

  const handleAction = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2200);
  };

  const handleSelectView = (viewName: string) => {
    setActiveView(viewName);
    setIsSavedViewOpen(false);
    handleAction(`Applied view: ${viewName}`);
  };

  const handleExportAll = () => {
    const header = [
      "Disbursement Date",
      "Loan ID",
      "Status",
      "Applicant Name",
      "Bank Name",
      "Sanctioned Amt",
      "Verified",
      "Referral %",
      "Credit Executive",
      "Bank Executive",
    ];

    const rows = disbursementData.map((item) => [
      item.date,
      item.id,
      item.status,
      item.applicant,
      item.bank,
      item.sanctionedAmount,
      item.verifiedAmount,
      item.referral,
      item.creditExecutive,
      item.bankExecutive,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "disbursements.csv";
    downloadLink.click();
    URL.revokeObjectURL(url);

    handleAction("Exported disbursement data successfully.");
  };

  const handleCreateDisbursement = () => {
    setIsAddMenuOpen(false);
    handleAction("Add disbursement flow opened.");
  };

  return (
    <div className="mx-auto max-w-[1640px]">
      {/* Page header */}
      <div className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-[#27232d]">
            Disbursement
          </h1>
          <div className="mt-2 flex items-center gap-2 text-[13px] font-medium">
            <span className="text-[#77727e]">RMS</span>
            <span className="text-[#b5afbd]">›</span>
            <span className="text-[#774bdc]">Disbursement</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              handleAction(
                "Activity feed opened for the latest disbursement updates.",
              )
            }
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8d3e0] bg-white px-4 text-[15px] font-semibold text-[#585360] shadow-sm"
          >
            <RotateCcw size={18} className="text-[#9a95a2]" />
            Activity
          </button>
          <button
            onClick={() =>
              handleAction(
                "Excel import flow started. The file uploader will be added next.",
              )
            }
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8d3e0] bg-white px-4 text-[15px] font-semibold text-[#585360] shadow-sm"
          >
            <CloudUpload size={18} className="text-[#9a95a2]" />
            Import Excel
          </button>
          <div className="relative">
            <button
              onClick={() => setIsAddMenuOpen((open) => !open)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#8053de] px-4 text-[15px] font-semibold text-white shadow-sm"
            >
              <Plus size={17} />
              Add Disbursement
              <ChevronDown size={16} />
            </button>

            {isAddMenuOpen && (
              <div className="absolute right-0 top-[46px] z-20 w-[240px] overflow-hidden rounded-xl border border-[#e1dce8] bg-white py-2 shadow-[0_12px_30px_rgba(37,28,52,0.14)]">
                <button
                  onClick={handleCreateDisbursement}
                  className="flex h-11 w-full items-center gap-2 px-4 text-left text-[15px] font-semibold text-[#4b4a53] hover:bg-[#f7f3ff]"
                >
                  <Plus size={16} />
                  Create new disbursement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary KPI cards */}
      <section className="grid gap-3 pb-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="min-h-[112px] rounded-xl border border-[#e2dee8] bg-white px-5 py-6 shadow-[0_1px_3px_rgba(32,25,45,0.04)]"
          >
            <p className="text-[15px] font-semibold text-[#65606c]">
              {card.label}
            </p>
            <p className="mt-3 break-words text-[clamp(26px,2vw,31px)] font-normal leading-tight tracking-[-0.03em] text-[#24212b]">
              {card.value}
            </p>
          </article>
        ))}
      </section>

      {/* Search + Table area */}
      <section className="rounded-xl border border-[#e1dce8] bg-white p-4 shadow-[0_1px_4px_rgba(32,25,45,0.04)] sm:p-5">
        {feedback && (
          <div className="mb-4 rounded-lg border border-[#d9c9ff] bg-[#f7f2ff] px-4 py-3 text-sm font-medium text-[#6f3fcb]">
            {feedback}
          </div>
        )}

        <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <SearchInput
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for Disbursement"
            shortcut="⌘K"
          />

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button
                onClick={() => setIsSavedViewOpen((open) => !open)}
                className={`inline-flex h-10 items-center gap-3 rounded-lg border bg-white px-4 text-[15px] font-semibold shadow-sm ${
                  isSavedViewOpen
                    ? "border-[#8d55e6] text-[#5c536b] ring-2 ring-[#c7a8ff]"
                    : "border-[#d8d3df] text-[#6a6471]"
                }`}
              >
                {activeView}
                <ChevronDown size={16} />
              </button>

              {isSavedViewOpen && (
                <div className="absolute right-0 top-[48px] z-20 w-[280px] overflow-hidden rounded-xl border border-[#e1dce8] bg-white py-3 shadow-[0_12px_30px_rgba(37,28,52,0.14)]">
                  <div className="space-y-1 px-3 pb-3">
                    {savedViewOptions.map((view) => (
                      <button
                        key={view.label}
                        onClick={() => handleSelectView(view.label)}
                        className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[15px] font-semibold ${
                          activeView === view.label
                            ? "text-[#8053de]"
                            : "text-[#55515d]"
                        }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d3cce8] bg-white">
                          {activeView === view.label ? (
                            <span className="block h-2.5 w-2.5 rounded-full bg-[#8053de]" />
                          ) : null}
                        </span>
                        <span>{view.label}</span>
                        {view.tag ? (
                          <span className="rounded-full border border-[#d8d3df] bg-[#f7f4ff] px-2 py-0.5 text-[11px] font-semibold text-[#5f4bc1]">
                            {view.tag}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 border-t border-[#ece8f1] px-3 pt-3">
                    <button
                      onClick={() => setIsSavedViewOpen(false)}
                      className="h-9 flex-1 rounded-md bg-[#8053de] text-[15px] font-semibold text-white"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setIsSavedViewOpen(false)}
                      className="h-9 flex-1 rounded-md text-[15px] font-semibold text-[#6d6674]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleExportAll}
              className="inline-flex h-10 items-center gap-3 rounded-lg border border-[#d8d3df] bg-white px-4 text-[15px] font-semibold text-[#6a6471] shadow-sm"
            >
              Export All
              <ChevronDown size={16} />
            </button>
            {query && (
              <button
                onClick={() => handleSearchChange("")}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8d3df] bg-white px-3 text-[15px] font-semibold text-[#6a6471] shadow-sm"
              >
                <ListRestart size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        <DataTable
          data={filteredRows}
          isLoading={isLoading}
          onFeedback={handleAction}
        />
      </section>
    </div>
  );
};

export default Disbursement;
