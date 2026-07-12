"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo priority width={92} height={46} className="h-9 w-auto md:hidden" />
        <Logo priority width={112} height={56} className="hidden h-11 w-auto md:block" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-accent",
                isActive(item.href) && "text-brand-dark",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-foreground/80 md:inline-flex"
          >
            <a href={site.phoneHref}>
              <Phone className="size-4" aria-hidden />
              <span className="hidden xl:inline">{site.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo href={null} width={96} height={48} className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col px-4" aria-label="Mobile">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-border/60 py-4 text-lg font-medium text-foreground/80 transition-colors hover:text-brand-dark",
                      isActive(item.href) && "text-brand-dark",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <Button asChild size="lg" onClick={() => setOpen(false)}>
                  <Link href={site.cta.href}>{site.cta.label}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={site.phoneHref}>
                    <Phone className="size-4" aria-hidden />
                    {site.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
