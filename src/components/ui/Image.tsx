import { cn } from "@/lib/utils";
import { type ImgHTMLAttributes } from "react";

type ImgProps = {
  className?: string;
  src: string;
  dynamic?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Img({
  className,
  src,
  dynamic = false,
  loading = "lazy",
  ...props
}: ImgProps) {
  return (
    <img
      className={cn("object-cover", className)}
      alt=""
      loading={loading}
      src={dynamic ? import.meta.env.VITE_API_BASE_URL + "/" + src : src}
      {...props}
    />
  );
}
