import { Bell, Building2, ChevronDown } from "lucide-react";

const Selector = ({ label }: { label: string }) => (
  <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8d5dd] bg-white px-3 text-[15px] font-semibold text-[#45414c] shadow-[0_1px_2px_rgba(32,25,45,0.05)]">
    <Building2 size={18} className="text-[#a5a1ab]" />
    <span className="max-w-[190px] truncate">{label}</span>
    <ChevronDown size={16} className="text-[#8a8492]" />
  </button>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e4e0eb] bg-white px-5 sm:px-8 lg:px-5 xl:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Selector label="Gracia Advisory Group" />
        <div className="hidden sm:block">
          <Selector label="ABC Advisory Group" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative grid h-10 w-10 place-items-center rounded-full text-[#8f8997]">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef3340] px-1 text-[10px] font-bold text-white">
            2
          </span>
        </button>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,#e9c4a2,#7b533d_55%,#f8e2c9)] text-xs font-bold text-white ring-2 ring-[#f2edf9]">
          AS
        </div>
      </div>
    </header>
  );
};

export default Navbar;
