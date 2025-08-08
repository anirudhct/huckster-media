import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type CurvedCardProps = {
  className?: string;
  children: ReactNode;
  padding?: boolean;
};

export default function CurvedCard({
  className,
  children,
  padding = true,
}: CurvedCardProps) {
  return (
    <div
      className={cn(
        `rounded-t-4xl ${padding ? "p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14" : ""}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
