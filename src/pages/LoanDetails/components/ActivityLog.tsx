import { X } from "lucide-react";
import Badge, { type BadgeStatus } from "../../../components/ui/Badge";
import type { ActivityEntry } from "../../../mocks/loanDetails";

type Props = {
  open: boolean;
  onClose: () => void;
  entries: ActivityEntry[];
};

const ActivityLog = ({ open, onClose, entries }: Props) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[380px] flex-col bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between border-b border-[#ebe7f5] px-6 py-4">
          <h2 className="text-[16px] font-bold text-[#1a1523]">Activity Log</h2>
          <button
            onClick={onClose}
            aria-label="Close activity log"
            className="grid h-8 w-8 place-items-center rounded-md text-[#9e97bd] hover:bg-[#f5f3f8] hover:text-[#6d4cff]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-5">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="relative border-l-2 border-[#ebe7f5] pb-5 pl-5 last:border-l-transparent last:pb-0"
              >
                {/* Dot */}
                <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#8053de]" />

                <p className="text-[12px] text-[#717680]">{entry.timestamp}</p>
                <p className="mt-1 text-[14px] font-semibold text-[#24212b]">{entry.action}</p>
                <p className="mt-0.5 text-[13px] text-[#5c5966]">by {entry.user}</p>

                {entry.field && (
                  <div className="mt-2 rounded-lg bg-[#f9f7fd] px-3 py-2">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#717680]">
                      {entry.field}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#5c5966]">From:</span>
                      {entry.from && (
                        <Badge status={entry.from as BadgeStatus} />
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[12px] text-[#5c5966]">To:</span>
                      {entry.to && (
                        <Badge status={entry.to as BadgeStatus} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ActivityLog;
