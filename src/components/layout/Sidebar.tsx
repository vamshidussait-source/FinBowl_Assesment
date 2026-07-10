import {
  BadgeDollarSign,
  BarChart3,
  Building2,
  ChevronDown,
  FileBarChart,
  FileText,
  Home,
  Landmark,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const primaryItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Finance", icon: WalletCards },
  { title: "Sales CRM", icon: BadgeDollarSign },
];

const rmsItems = [
  { title: "Dashboard", icon: BarChart3, path: "/" },
  { title: "Disbursement", icon: Landmark, path: "/disbursement" },
  { title: "Invoices", icon: ReceiptText, path: "/invoices" },
  { title: "PO", icon: FileText, path: "/po" },
  { title: "RMS Reports", icon: FileBarChart, path: "/reports" },
];

const bottomItems = [
  { title: "Compliance", icon: ShieldCheck },
  { title: "Vendors", icon: Users },
  { title: "AI Suite", icon: Sparkles },
  { title: "Reports", icon: FileText },
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[288px] flex-col overflow-hidden bg-[linear-gradient(15.34deg,_#6941C6_18.11%,_#42307D_40.01%,_#2C1C5F_78.48%)] text-[#bcb0d6] lg:flex">
      <div className="flex h-[72px] items-center border-b border-white/10 px-5">
        <div className="mr-3 flex h-8 w-8 items-center justify-center">
          <svg
            width="32"
            height="27"
            viewBox="0 0 32 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <g clipPath="url(#clip0_21853_3762)">
              <path
                d="M31.4621 9.09525C31.2757 10.3604 30.9428 11.7586 30.3745 13.219C29.2338 16.1576 27.6757 18.0175 27.2052 18.5591C26.273 19.6244 25.0079 21.0494 22.8417 22.0126C21.6432 22.5453 20.6045 22.745 20.0451 22.8294C19.6545 22.887 18.7224 23.0024 17.364 22.8471C16.707 22.5585 15.9524 22.1191 15.3044 21.4489C14.8028 20.9294 14.5098 20.4234 14.3633 20.1615C13.8439 19.2427 13.6886 18.4659 13.6398 18.2129C13.5465 17.6979 13.4889 17.3606 13.6087 16.9255C13.6575 16.7347 13.8395 16.1709 14.3633 15.7936C14.6607 15.5761 14.9581 15.5095 15.0869 15.4784C16.4452 15.1855 24.6439 14.0714 28.084 12.6198C28.6035 12.4023 29.4557 11.9894 30.2192 11.1727C30.9428 10.4003 31.2712 9.61905 31.3511 9.41486C31.3956 9.29944 31.4355 9.19291 31.4666 9.09082L31.4621 9.09525Z"
                fill="url(#paint0_linear_21853_3762)"
              />
              <path
                d="M31.4701 2.51245C31.4701 2.53908 31.4701 2.56571 31.4612 2.59235C30.8842 2.93415 29.8232 4.38124 27.8257 5.87272C26.7249 6.69837 25.7483 7.22216 25.189 7.50625C24.8783 7.66162 24.1902 7.99453 23.116 8.38516C22.2372 8.70477 20.466 9.33509 18.2154 9.64139C17.3321 9.76124 14.429 10.0942 10.7447 9.29514C8.63619 8.83794 6.11043 8.29194 3.58467 6.31217C1.94227 5.02932 0.899111 3.60442 0.268781 2.58346C0.264342 2.53908 0.259903 2.49024 0.259903 2.44586C0.224392 1.06091 7.07812 0 15.9605 0C24.8427 0 31.4701 1.12305 31.4701 2.51245Z"
                fill="url(#paint1_linear_21853_3762)"
              />
              <path
                d="M31.5996 8.5719C31.5597 8.7539 31.5196 8.91814 31.462 9.09126C31.4309 9.19335 31.391 9.30433 31.3466 9.4153C31.2666 9.61949 30.9427 10.4007 30.2147 11.1731C29.4512 11.9854 28.5988 12.3983 28.0795 12.6202C24.6393 14.0718 16.4361 15.1815 15.0823 15.4788C14.9535 15.5055 14.6605 15.5765 14.3587 15.794C13.8394 16.1714 13.6574 16.7351 13.6041 16.926C13.4887 17.361 13.542 17.6984 13.6352 18.2133C13.6795 18.4619 13.8394 19.2431 14.3587 20.1619C14.5052 20.4239 14.7982 20.93 15.2998 21.4493C15.9479 22.1195 16.7025 22.559 17.3595 22.8475C18.083 23.1671 18.6822 23.2959 18.8775 23.3314C19.5966 23.4779 20.1027 23.4601 20.1338 23.6465C20.1737 23.8995 19.3171 24.2591 18.7222 24.4322C17.7456 24.7164 16.9155 24.6542 16.4628 24.6187C14.2167 24.4589 12.4145 23.793 11.9394 23.6154C10.3415 23.0074 9.17847 22.2927 8.61028 21.9198C8.04654 21.5514 5.58293 19.8868 3.46111 16.7084C0.784432 12.6957 0.305027 8.80272 0.131908 7.2269C-0.0856003 5.22494 0.00317848 3.54258 0.131908 2.36182C0.176298 2.43728 0.220687 2.5083 0.269515 2.58821C0.899844 3.6136 1.94744 5.03406 3.5854 6.31691C6.11117 8.29668 8.63692 8.84267 10.7454 9.29988C14.4297 10.0989 17.3372 9.76598 18.2161 9.64613C20.4623 9.33983 22.2378 8.70951 23.1167 8.38991C24.191 7.99927 24.8745 7.66636 25.1897 7.51099C25.7491 7.23134 26.7256 6.70311 27.8265 5.87746C29.8196 4.38598 30.8805 2.93889 31.462 2.59708C31.5907 2.52163 31.6972 2.49943 31.7816 2.54826C31.9014 2.61484 31.9191 2.78352 31.9369 3.20522C32.079 6.3613 31.7062 8.08361 31.5907 8.57634L31.5996 8.5719Z"
                fill="url(#paint2_linear_21853_3762)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_21853_3762"
                x1="13.5421"
                y1="16.0111"
                x2="31.4621"
                y2="16.0111"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.27" stopColor="#6B5CA7" />
                <stop offset="0.43" stopColor="#6E5FA8" />
                <stop offset="0.58" stopColor="#7968AD" />
                <stop offset="0.72" stopColor="#8B77B5" />
                <stop offset="0.86" stopColor="#A48DC1" />
                <stop offset="0.99" stopColor="#C5A9D0" />
                <stop offset="1" stopColor="#C8ACD2" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_21853_3762"
                x1="1.81353"
                y1="17.2941"
                x2="22.2637"
                y2="-4.35904"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.3" stopColor="#6456A4" />
                <stop offset="0.46" stopColor="#6B5CA7" />
                <stop offset="0.56" stopColor="#7060A9" />
                <stop offset="0.7" stopColor="#806DB0" />
                <stop offset="0.85" stopColor="#9A82BB" />
                <stop offset="1" stopColor="#BC9ECA" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_21853_3762"
                x1="4.82387"
                y1="18.6705"
                x2="25.5848"
                y2="-3.32002"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.15" stopColor="#9B84BD" />
                <stop offset="0.2" stopColor="#A088BF" />
                <stop offset="0.27" stopColor="#B096C6" />
                <stop offset="0.33" stopColor="#C8ACD2" />
                <stop offset="0.65" stopColor="#FFF9FB" />
              </linearGradient>
              <clipPath id="clip0_21853_3762">
                <rect width="31.9687" height="25.3545" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span className="text-[23px] font-semibold tracking-[-0.01em] text-white">
          FinBowl
        </span>
      </div>

      <div className="px-4 pb-4 pt-5">
        <label className="flex h-10 items-center rounded-lg bg-[#442f82] px-3 text-white/95">
          <Search size={18} />
          <input
            className="ml-3 w-full border-0 bg-transparent text-[15px] outline-none placeholder:text-[#d8d0ec]"
            placeholder="Search"
          />
        </label>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
        <div className="space-y-1">
          {primaryItems.map((item, index) =>
            item.path ? (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex h-[42px] items-center gap-3 rounded-md px-1 py-2.5 text-[15px] ${
                    isActive && index === 0 ? "text-white" : "text-[#bcb0d6]"
                  }`
                }
              >
                <item.icon size={18} />
                {item.title}
              </NavLink>
            ) : (
              <button
                key={item.title}
                className="flex w-full items-center justify-between rounded-md px-1 py-2.5 text-left text-[15px] text-[#bcb0d6]"
              >
                <span className="flex items-center gap-3">
                  <item.icon size={18} />
                  {item.title}
                </span>
                <ChevronDown size={16} />
              </button>
            ),
          )}
        </div>

        <div className="my-3 h-px bg-white/10" />

        <div>
          <button className="flex w-full items-center justify-between rounded-md px-1 py-2.5 text-left text-[15px] font-semibold text-white">
            <span className="flex items-center gap-3">
              <Building2 size={18} />
              RMS
            </span>
            <ChevronDown size={16} className="rotate-180" />
          </button>

          <div className="relative ml-2 mt-2 space-y-1 border-l border-[#725ab4] pl-4">
            {rmsItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex h-[42px] items-center gap-3 rounded-md px-3 text-[15px] ${
                    isActive && item.title === "Disbursement"
                      ? "bg-[#4b3783] font-semibold text-white"
                      : "text-[#bcb0d6]"
                  }`
                }
              >
                <item.icon size={17} />
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.title}
              className="flex w-full items-center justify-between rounded-md px-1 py-2.5 text-left text-[15px] text-[#bcb0d6]"
            >
              <span className="flex items-center gap-3">
                <item.icon size={18} />
                {item.title}
              </span>
              <ChevronDown size={16} />
            </button>
          ))}
        </div>
      </nav>

      <div className="bg-[#6f44d8]/45 py-3 text-center">
        <span className="inline-flex h-6 items-center rounded-full border border-[#a988f0] px-3 text-xs font-semibold text-white">
          • Version 1.0
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
