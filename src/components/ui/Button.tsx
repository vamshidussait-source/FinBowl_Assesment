import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "dropdown";
  size?: "sm" | "md";
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
        size === "sm" ? "h-9 px-3 text-[13px]" : "h-10 px-4 text-[15px]",
        {
          "bg-[#8053de] text-white hover:bg-[#6d44c8] shadow-sm":
            variant === "primary",
          "bg-gray-100 text-gray-700 hover:bg-gray-200":
            variant === "secondary",
          "border border-[#d8d3df] bg-white text-[#585360] shadow-sm hover:bg-[#faf8fd]":
            variant === "outline",
          "bg-[#8053de] text-white shadow-sm hover:bg-[#6d44c8]":
            variant === "dropdown",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
