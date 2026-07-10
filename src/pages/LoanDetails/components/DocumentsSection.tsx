type Props = {
  documents: string[];
};

const PdfIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 shrink-0"
  >
    <path
      d="M5 4C5 2.89543 5.89543 2 7 2H19L27 10V28C27 29.1046 26.1046 30 25 30H7C5.89543 30 5 29.1046 5 28V4Z"
      fill="#FEE2E2"
    />
    <path
      d="M19 2L27 10H21C19.8954 10 19 9.10457 19 8V2Z"
      fill="#FECACA"
    />
    <rect x="8" y="18" width="16" height="8" rx="2" fill="#EF4444" />
    <text
      x="16"
      y="24"
      textAnchor="middle"
      fill="white"
      fontSize="7"
      fontWeight="bold"
      fontFamily="sans-serif"
      dominantBaseline="middle"
    >
      PDF
    </text>
  </svg>
);

const DocumentsSection = ({ documents }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {documents.map((doc, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-[#ebe7f5] bg-white px-4 py-4 transition hover:shadow-sm"
        >
          <PdfIcon />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-[#24212b]">{doc}</p>
            <p className="text-[12px] text-[#717680]">800 KB</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsSection;
