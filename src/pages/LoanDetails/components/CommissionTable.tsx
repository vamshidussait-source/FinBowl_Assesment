import { ArrowUpDown } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import type { Commission } from "../../../mocks/loanDetails";

type Props = {
  commissions: Commission[];
  totalCommission: string;
};

const headers = [
  "Party Name (Used Code)",
  "Sub-Code Commission (Net)%",
  "Gross Commission %",
  "Commission Amount",
  "Invoice No",
  "Invoice Status",
];

const CommissionTable = ({ commissions, totalCommission }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eafaf1] px-3 py-1 text-[12px] font-semibold text-[#1c7a4c]">
          Total Commission : {totalCommission}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#ebe7f5] bg-[#faf8fd]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6f6b7a]"
                >
                  <span className="inline-flex items-center gap-1">
                    {h}
                    <ArrowUpDown size={11} className="text-[#c4bede]" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commissions.map((c, i) => (
              <tr key={i} className="border-b border-[#f0edf8] last:border-0 hover:bg-[#faf8fd]">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[#24212b]">{c.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{c.subCode}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{c.gross}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[#1a9e5c]">{c.amount}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#8659e8]">{c.invoice}</td>
                <td className="px-4 py-3">
                  <Badge status="Paid" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionTable;
