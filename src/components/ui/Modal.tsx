import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: number;
};

const Modal = ({ open, onClose, title, children, footer, maxWidth = 400 }: Props) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-full overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(20,14,33,0.26)]"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#282630]">{title}</h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-md text-[#98939f] hover:bg-[#f5f3f8]"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
        {footer && (
          <div className="flex items-center gap-3 border-t border-[#ece8f1] px-6 py-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
