import { ArrowUpDown } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import type { Disbursement } from "../../../mocks/loanDetails";

type Props = {
  disbursements: Disbursement[];
};

const headers = [
  "Disbursement ID",
  "Disbursement Date",
  "Disbursement Amount",
  "Verified Disbursement Amount",
  "UTR Number",
  "Tranche",
  "Disbursement Status",
];

const DisbursementTable = ({ disbursements }: Props) => {
  return (
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
          {disbursements.map((d, i) => {
            const mismatch = d.amount !== d.verified;
            const amountClass = mismatch ? "text-[#e03e3e]" : "text-[#1a9e5c]";
            return (
              <tr key={i} className="border-b border-[#f0edf8] last:border-0 hover:bg-[#faf8fd]">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-[#24212b]">{d.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{d.date}</td>
                <td className={`whitespace-nowrap px-4 py-3 font-medium ${amountClass}`}>{d.amount}</td>
                <td className={`whitespace-nowrap px-4 py-3 font-medium ${amountClass}`}>{d.verified}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{d.utr}</td>
                <td className="whitespace-nowrap px-4 py-3 text-[#4b4a53]">{d.tranche}</td>
                <td className="px-4 py-3">
                  <Badge status={d.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisbursementTable;
