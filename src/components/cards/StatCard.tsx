import clsx from "clsx";

type Props = {
  title: string;
  value: string;
  /** Use green background (for Net Income tile) */
  green?: boolean;
  className?: string;
};

const StatCard = ({ title, value, green = false, className }: Props) => {
  return (
    <article
      className={clsx(
        "min-h-[112px] rounded-xl border px-5 py-6 shadow-[0_1px_3px_rgba(32,25,45,0.04)]",
        green
          ? "border-[#b7ecd0] bg-[#eafaf1]"
          : "border-[#e2dee8] bg-white",
        className,
      )}
    >
      <p className="text-[15px] font-semibold text-[#65606c]">{title}</p>
      <h2
        className={clsx(
          "mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(18px,1.6vw,31px)] font-normal leading-tight tracking-[-0.03em]",
          green ? "text-[#1a7a4c]" : "text-[#24212b]",
        )}
        title={value}
      >
        {value}
      </h2>
    </article>
  );
};

export default StatCard;
