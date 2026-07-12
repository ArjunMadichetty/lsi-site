import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LSI logo.
 * TODO(client): when the real logo file is added, set LOGO_SRC to "/logo.png".
 * The placeholder SVG lives at public/logo.svg.
 */
const LOGO_SRC = "/logo.svg";

export function Logo({
  className,
  width = 116,
  height = 58,
  priority = false,
  href = "/",
}: {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  href?: string | null;
}) {
  const img = (
    <Image
      src={LOGO_SRC}
      alt="LSI — Precision CNC Manufacturing"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn("select-none", className)}
    />
  );

  if (href === null) return img;

  return (
    <Link
      href={href}
      aria-label="LSI home"
      className="inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {img}
    </Link>
  );
}
