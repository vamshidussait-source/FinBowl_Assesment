import { ArrowUpDown } from "lucide-react";
import type { Applicant } from "../../../mocks/loanDetails";

type Props = {
  applicants: Applicant[];
};

const headers = ["Name", "Type", "Email ID", "Phone Number"];

const ApplicantTable = ({ applicants }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-[#ebe7f5] bg-[#faf8fd]">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-[#6f6b7a]"
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
          {applicants.map((a, i) => (
            <tr key={i} className="border-b border-[#f0edf8] last:border-0">
              <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#24212b]">
                {a.name}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    a.type === "Applicant"
                      ? "bg-[#eafaf1] text-[#1c7a4c]"
                      : "bg-[#f3f2f5] text-[#5c5966]"
                  }`}
                >
                  {a.type}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-[#4b4a53]">{a.email}</td>
              <td className="whitespace-nowrap px-4 py-4 text-[#4b4a53]">{a.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantTable;
