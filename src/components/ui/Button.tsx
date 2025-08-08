import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  variant = "primary",
  children,
  className,
  onClick,
}: ButtonProps) {
  const variantsStyles = {
    primary: "bg-red text-white",
    secondary: "bg-white text-pink",
  };

  return (
    <button
      type={type}
      className={cn(
        `font-anton buttonHoverEffect relative w-full cursor-pointer rounded-2xl py-5 text-3xl uppercase hover:scale-95 sm:text-5xl md:text-6xl ${variantsStyles[variant]}`,
        className,
      )}
      onClick={onClick}
    >
      <span className="shakeText">{children}</span>
    </button>
  );
}
