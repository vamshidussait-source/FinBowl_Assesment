import { ArrowUpDown } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import type { Broker } from "../../../mocks/loanDetails";

type Props = {
  brokers: Broker[];
  totalReferralFee: string;
};

const headers = [
  "Broker Name / Code",
  "Broker Commission %",
  "Referral Fee",
  "PO No & Date",
  "PO Status",
];

const BrokerTable = ({ brokers, totalReferralFee }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0f6] px-3 py-1 text-[12px] font-semibold text-[#c41d6c]">
          Total Referral Fee: {totalReferralFee}
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
            {brokers.map((b, i) => (
              <tr key={i} className="border-b border-[#f0edf8] last:border-0 hover:bg-[#faf8fd]">
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="block font-medium text-[#24212b]">{b.name}</span>
                      <span className="block text-[11px] text-[#717680]">{b.code}</span>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#f3f2f5] px-2 py-0.5 text-[11px] font-semibold text-[#5c5966]">
                      {b.type}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{b.pct}</td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[#e03e3e]">{b.fee}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">
                  <span className="text-[#8659e8]">{b.po}</span>
                  <span className="ml-2 inline-flex items-center rounded-md border border-[#e2dee8] bg-white px-2 py-0.5 text-[11px] font-medium text-[#717680]">
                    {b.date}
                  </span>
                </td>
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

export default BrokerTable;
