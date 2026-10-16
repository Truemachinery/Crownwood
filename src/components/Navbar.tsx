"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
};

const links: NavItem[] = [
  {
    name: "Products",
    href: "/#chemicals",
    dropdown: [
      { name: "Permabase Black", href: "/chemicals/permabase-black" },
      { name: "Permabase", href: "/chemicals/permabase" },
      { name: "MeltDown MR-1", href: "/chemicals/meltdown" },
      {
        name: "Road maintenance products",
        href: "/chemicals/road-building-products",
      },
      { name: "Explore all products", href: "/#chemicals" },
    ],
  },
  {
    name: "Services",
    href: "/#construction",
    dropdown: [
      { name: "Asphalt paving", href: "/construction/asphalt-paving" },
      { name: "Concrete", href: "/construction/concrete" },
      { name: "Sealcoating", href: "/construction/sealcoat" },
      { name: "Striping", href: "/construction/striping" },
      { name: "Land clearing", href: "/construction/land-clearing" },
      { name: "Hydroseeding", href: "/construction/hydro-seeding" },
    ],
  },
  { name: "Knowledge", href: "/knowledge-hub" },
  { name: "Contact", href: "/contact" },
];

const focusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crown-red";

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Crownwood Chemicals home"
      className={cn(
        "inline-flex shrink-0 items-center gap-3 text-concrete",
        focusClass,
      )}
    >
      <svg
        className="h-7 w-8 text-crown-red"
        viewBox="0 0 32 28"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2 5 10 11 16 1 22 11 30 5 26 23H6L2 5ZM6 26H26V28H6Z" />
      </svg>
      <span className="flex flex-col">
        <span className="font-bebas text-[29px] leading-none tracking-[0.045em]">
          Crownwood
        </span>
        <span className="mt-1 font-mono text-[8px] uppercase leading-none tracking-[0.38em] text-concrete/60">
          Chemicals
        </span>
      </span>
    </Link>
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownId = `desktop-${item.name.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  if (!item.dropdown) {
    return (
      <Link
        href={item.href}
        aria-current={pathname === item.href ? "page" : undefined}
        className={cn(
          "py-3 text-sm text-concrete/75 transition-colors hover:text-white aria-[current=page]:text-white",
          focusClass,
        )}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "flex items-center gap-1.5 py-3 text-sm text-concrete/75 transition-colors hover:text-white",
          focusClass,
          open && "text-white",
        )}
        aria-expanded={open}
        aria-controls={dropdownId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() =>
              containerRef.current
                ?.querySelector<HTMLAnchorElement>("a")
                ?.focus(),
            );
          }
        }}
      >
        {item.name}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={dropdownId}
        hidden={!open}
        className="absolute left-0 top-[calc(100%+1.125rem)] w-72 border border-white/15 border-t-crown-red bg-asphalt p-2 shadow-2xl"
      >
        {item.dropdown.map((subitem) => (
          <Link
            key={subitem.href}
            href={subitem.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === subitem.href ? "page" : undefined}
            className={cn(
              "flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-sm text-concrete/75 last:border-b-0 hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/5 aria-[current=page]:text-white",
              focusClass,
            )}
          >
            {subitem.name}
            {subitem.name === "Permabase Black" ? (
              <span
                className="h-1.5 w-1.5 shrink-0 bg-crown-red"
                aria-hidden="true"
              />
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);

  const closeMobile = (restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const menuTrigger = mobileButtonRef.current;
    document.body.style.overflow = "hidden";
    mobilePanelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocusRef.current = true;
        setMobileOpen(false);
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          mobilePanelRef.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ) ?? [],
        ).filter((element) => !element.closest("[hidden]"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktopQuery.matches) {
        restoreFocusRef.current = false;
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onResize);
      if (restoreFocusRef.current) menuTrigger?.focus();
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-asphalt/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-12 lg:px-20"
      >
        <Brand />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <DesktopNavItem key={item.name} item={item} pathname={pathname} />
          ))}
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-5 bg-crown-red px-5 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#bb0023]",
              focusClass,
            )}
          >
            Request a quote{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={mobileButtonRef}
          type="button"
          className={cn("p-2 text-concrete lg:hidden", focusClass)}
          onClick={() => {
            restoreFocusRef.current = true;
            setMobileOpen(true);
          }}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {mobileOpen ? (
        <div
          ref={mobilePanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-x-0 top-0 h-dvh overflow-y-auto bg-asphalt text-concrete lg:hidden"
        >
          <div className="flex h-20 items-center justify-between border-b border-white/15 px-6 md:px-12">
            <Brand onClick={() => closeMobile(false)} />
            <button
              type="button"
              onClick={() => closeMobile()}
              aria-label="Close navigation menu"
              className={cn("p-2", focusClass)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Mobile navigation"
            className="px-6 pb-10 pt-6 md:px-12"
          >
            {links.map((item) => (
              <div key={item.name} className="border-b border-white/15">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between py-5 text-left text-xl font-medium",
                        focusClass,
                      )}
                      aria-expanded={mobileSection === item.name}
                      aria-controls={`mobile-${item.name.toLowerCase()}`}
                      onClick={() =>
                        setMobileSection((current) =>
                          current === item.name ? null : item.name,
                        )
                      }
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5",
                          mobileSection === item.name && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={`mobile-${item.name.toLowerCase()}`}
                      hidden={mobileSection !== item.name}
                      className="pb-5"
                    >
                      {item.dropdown.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          onClick={() => closeMobile(false)}
                          aria-current={
                            pathname === subitem.href ? "page" : undefined
                          }
                          className={cn(
                            "block py-3 pl-4 text-sm text-concrete/70 hover:text-white aria-[current=page]:text-white",
                            focusClass,
                          )}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => closeMobile(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn("block py-5 text-xl font-medium", focusClass)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => closeMobile(false)}
              className={cn(
                "mt-8 flex items-center justify-between bg-crown-red px-5 py-5 text-sm font-semibold text-white",
                focusClass,
              )}
            >
              Request a quote{" "}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href="tel:+12107925236"
              className={cn(
                "mt-7 inline-flex items-center gap-3 text-sm text-concrete/70",
                focusClass,
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              210-792-5236
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
