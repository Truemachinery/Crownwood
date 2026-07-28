"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
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
            { name: "Road building products", href: "/chemicals/road-building-products" },
            { name: "Permabase", href: "/chemicals/permabase" },
            { name: "Permabase Black", href: "/chemicals/permabase-black" },
            { name: "MeltDown MR-1", href: "/chemicals/meltdown" },
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

function DesktopNavItem({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const openMenu = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const closeMenu = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 120);
    };

    if (!item.dropdown) {
        return <Link href={item.href} className="py-7 font-heading text-sm font-medium text-concrete/75 hover:text-white">{item.name}</Link>;
    }

    return (
        <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
            <Link href={item.href} className="flex items-center gap-1.5 py-7 font-heading text-sm font-medium text-concrete/75 hover:text-white">
                {item.name}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
            </Link>
            <div className={cn("absolute left-0 top-full w-64 border border-white/10 bg-asphalt p-2 shadow-2xl transition-all", open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0")}>
                {item.dropdown.map((subitem) => (
                    <Link key={subitem.href} href={subitem.href} className="block border-b border-white/5 px-4 py-3 font-sans text-sm text-concrete/65 last:border-b-0 hover:bg-white/5 hover:text-white">
                        {subitem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-asphalt/95 backdrop-blur-sm">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
                <Link href="/" className="flex items-center gap-3 text-concrete">
                    <span className="h-3 w-3 bg-safety-amber" />
                    <span className="font-heading text-lg font-bold tracking-[0.12em]">CROWNWOOD</span>
                    <span className="hidden border-l border-white/15 pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/45 sm:inline">Chemicals</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((item) => <DesktopNavItem key={item.name} item={item} />)}
                    <Link href="/contact" className="bg-safety-amber px-5 py-3 font-heading text-xs font-bold text-asphalt hover:bg-white">Request pricing</Link>
                </div>

                <button type="button" className="p-2 text-concrete md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            <div className={cn("absolute inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-asphalt px-6 py-6 md:hidden", mobileOpen ? "block" : "hidden")}>
                {links.map((item) => (
                    <div key={item.name} className="border-b border-white/10 py-3">
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 font-heading text-lg font-bold text-concrete">{item.name}</Link>
                        {item.dropdown && (
                            <div className="grid gap-1 pb-2 pl-4">
                                {item.dropdown.map((subitem) => (
                                    <Link key={subitem.href} href={subitem.href} onClick={() => setMobileOpen(false)} className="py-2 font-sans text-sm text-concrete/60">{subitem.name}</Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-7 block bg-safety-amber px-5 py-4 text-center font-heading text-sm font-bold text-asphalt">Request pricing</Link>
            </div>
        </header>
    );
}
