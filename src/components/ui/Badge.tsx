import clsx from "clsx";

export type BadgeStatus =
  | "Draft"
  | "Submitted"
  | "Verified"
  | "Processed"
  | "Audited"
  | "Paid"
  | "Lead";

const TONE: Record<BadgeStatus, string> = {
  Draft: "border-[#dedede] bg-white text-[#6f6f76] before:bg-[#8f8f95]",
  Submitted: "border-[#9befbf] bg-[#f2fff7] text-[#159852] before:bg-[#23c969]",
  Verified: "border-[#88d8ff] bg-[#f0f9ff] text-[#1686ca] before:bg-[#21a7ee]",
  Processed: "border-[#ffe08a] bg-[#fffdf5] text-[#b07d10] before:bg-[#f5b800]",
  Audited: "border-[#dbbaff] bg-[#fbf5ff] text-[#8a4be2] before:bg-[#a06cff]",
  Paid: "border-[#9befbf] bg-[#edfff4] text-[#1c7a4c] before:bg-[#23c969]",
  Lead: "border-[#dbbaff] bg-[#f9f3ff] text-[#7b3ec9] before:bg-[#8b5cf6]",
};

type Props = {
  status: BadgeStatus;
  dot?: boolean;
  className?: string;
};

const Badge = ({ status, dot = true, className }: Props) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold",
        dot && "before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
        TONE[status],
        className,
      )}
    >
      {status}
    </span>
  );
};

export default Badge;
