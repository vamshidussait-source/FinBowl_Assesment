import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  id?: string;
  icon: ReactNode;
  title: string;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

const CollapsibleSection = ({
  id,
  icon,
  title,
  badge,
  defaultOpen = true,
  children,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section
      id={id}
      className="overflow-hidden rounded-2xl border border-[#ebe7f5] bg-white shadow-[0_1px_4px_rgba(25,16,71,0.05)]"
    >
      <div className="flex items-center justify-between border-b border-[#f0edf8] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6d4cff]">
            {icon}
          </span>
          <h2 className="text-[15px] font-semibold text-[#1a1523]">{title}</h2>
          {badge}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          aria-expanded={open}
          className="text-[#9e97bd] transition-colors hover:text-[#6d4cff]"
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>
      {open && <div className="px-6 py-5">{children}</div>}
    </section>
  );
};

export default CollapsibleSection;
