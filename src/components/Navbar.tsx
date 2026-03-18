"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavItem = {
    name: string;
    href: string;
    dropdown?: { name: string; href: string }[];
};

const LINKS: NavItem[] = [
    {
        name: "Chemicals",
        href: "/#chemicals",
        dropdown: [
            { name: "Permabase", href: "/chemicals/permabase" },
            { name: "Permabase Black", href: "/chemicals/permabase-black" },
            { name: "MeltDown MR-1", href: "/chemicals/meltdown" },
            { name: "PHPM-50", href: "/chemicals/phpm-50" },
        ],
    },
    {
        name: "Construction",
        href: "/#construction",
        dropdown: [
            { name: "Asphalt Paving", href: "/construction/asphalt-paving" },
            { name: "Concrete", href: "/construction/concrete" },
            { name: "Sealcoat", href: "/construction/sealcoat" },
            { name: "Striping", href: "/construction/striping" },
            { name: "Land Clearing", href: "/construction/land-clearing" },
            { name: "Hydro Seeding", href: "/construction/hydro-seeding" },
        ],
    },
    { name: "Municipal Bids", href: "/#bids" },
    { name: "Knowledge Hub", href: "/knowledge-hub" },
    { name: "Contact", href: "/contact" },
];

function NavDropdown({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    if (!item.dropdown) {
        return (
            <Link
                href={item.href}
                className="hover:text-high-vis-yellow transition-colors relative group"
            >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-high-vis-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <button
                className="hover:text-high-vis-yellow transition-colors relative group flex items-center gap-1"
            >
                {item.name}
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        "transition-transform duration-200",
                        open && "rotate-180"
                    )}
                >
                    <path d="M2 4 L5 7 L8 4" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-high-vis-yellow transition-all duration-300 group-hover:w-full" />
            </button>

            <div
                className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 z-50",
                    open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                )}
            >
                <div className="bg-industrial/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[200px] shadow-2xl shadow-black/40">
                    {item.dropdown.map((sub) => (
                        <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 text-concrete/70 hover:text-high-vis-yellow hover:bg-white/5 transition-all duration-150 whitespace-nowrap"
                        >
                            {sub.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-5xl transition-all duration-500 flex justify-center">
            <nav
                ref={navRef}
                className={cn(
                    "relative flex items-center justify-between px-6 py-3 rounded-[2rem] border border-white/5 backdrop-blur-md transition-all duration-500",
                    scrolled ? "bg-industrial/90 shadow-2xl w-full" : "bg-industrial/50 w-full"
                )}
            >
                <Link href="/" className="font-heading font-bold text-concrete tracking-widest uppercase text-xl z-10 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-safety-amber" />
                    Crownwood
                </Link>

                <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wide text-concrete/80">
                    {LINKS.map((link) => (
                        <NavDropdown key={link.name} item={link} />
                    ))}
                </div>

                <Link href="/contact" className="hidden md:block bg-safety-amber text-asphalt font-heading font-bold px-5 py-2 rounded-full uppercase tracking-wider text-sm hover:scale-105 transition-transform">
                    Get Quote
                </Link>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-concrete z-10"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" x2="6" y1="6" y2="18" />
                            <line x1="6" x2="18" y1="6" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile menu panel */}
            <div
                className={cn(
                    "absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border border-white/10 bg-industrial/95 backdrop-blur-xl shadow-2xl shadow-black/50 md:hidden transition-all duration-300 overflow-hidden",
                    mobileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto max-h-[80vh]"
                        : "opacity-0 -translate-y-4 pointer-events-none max-h-0"
                )}
            >
                <div className="p-6 flex flex-col gap-2">
                    {LINKS.map((link) => (
                        <div key={link.name}>
                            <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-3 text-concrete font-heading font-bold uppercase tracking-widest text-base hover:text-high-vis-yellow transition-colors"
                            >
                                {link.name}
                            </Link>
                            {link.dropdown && (
                                <div className="pl-4 pb-2 flex flex-col gap-1 border-l border-white/10 ml-2">
                                    {link.dropdown.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            href={sub.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="py-2 text-concrete/60 text-sm font-mono hover:text-high-vis-yellow transition-colors"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="mt-4 block text-center bg-safety-amber text-asphalt font-heading font-bold px-5 py-3 rounded-full uppercase tracking-wider text-sm hover:scale-105 transition-transform"
                    >
                        Get Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}
