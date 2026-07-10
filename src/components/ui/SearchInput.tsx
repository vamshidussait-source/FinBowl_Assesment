import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  shortcut?: string;
  className?: string;
};

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  shortcut,
  className,
}: Props) => {
  return (
    <label
      className={`flex h-10 w-full max-w-[490px] items-center rounded-lg border border-[#d8d3df] bg-white px-3 shadow-sm ${className ?? ""}`}
    >
      <Search size={18} className="shrink-0 text-[#aaa5b0]" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="ml-3 min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none placeholder:text-[#89848f]"
        placeholder={placeholder}
      />
      {shortcut && (
        <kbd className="rounded border border-[#d8d3df] bg-[#f8f7fa] px-1.5 py-0.5 text-[11px] font-semibold text-[#9a95a2]">
          {shortcut}
        </kbd>
      )}
    </label>
  );
};

export default SearchInput;
