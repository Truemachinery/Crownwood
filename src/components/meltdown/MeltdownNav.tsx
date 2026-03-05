"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MeltdownNav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky nav
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            {/* 1. TOP ANNOUNCEMENT BAR */}
            <div className="bg-[#2E5D3A] h-[40px] flex items-center justify-center px-4 w-full">
                <p className="text-[13px] font-semibold tracking-[0.5px] text-white text-center">
                    Texas-Made Soy-Based Formula — Ships Nationwide —{" "}
                    <button
                        onClick={() => scrollTo('pricing')}
                        className="text-safety-amber hover:text-white transition-colors cursor-pointer"
                    >
                        Volume Pricing Available
                    </button>
                </p>
            </div>

            {/* 2. STICKY NAVIGATION */}
            <nav className="bg-[#111111] border-b border-white/10 sticky top-0 z-[100] py-4">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Left side: Logo text */}
                    <Link href="/" className="font-bebas text-[26px] tracking-[3px] flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-white">CROWNWOOD</span>
                        <span className="text-safety-amber">CHEMICALS</span>
                    </Link>

                    {/* Right side: Horizontal nav links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollTo('features')} className="text-[14px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Features</button>
                        <button onClick={() => scrollTo('applications')} className="text-[14px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Applications</button>
                        <button onClick={() => scrollTo('pricing')} className="text-[14px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Pricing</button>
                        <button onClick={() => scrollTo('faq')} className="text-[14px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">FAQ</button>
                        <button
                            onClick={() => scrollTo('contact')}
                            className="text-[12px] font-bold uppercase tracking-wider bg-safety-amber text-asphalt px-[24px] py-[10px] rounded-full hover:bg-high-vis-yellow transition-colors"
                        >
                            Get A Quote
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#111111] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl">
                        <button onClick={() => scrollTo('features')} className="text-left text-[16px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Features</button>
                        <button onClick={() => scrollTo('applications')} className="text-left text-[16px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Applications</button>
                        <button onClick={() => scrollTo('pricing')} className="text-left text-[16px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">Pricing</button>
                        <button onClick={() => scrollTo('faq')} className="text-left text-[16px] font-medium text-concrete/80 hover:text-safety-amber transition-colors">FAQ</button>
                        <button
                            onClick={() => scrollTo('contact')}
                            className="text-center text-[14px] font-bold uppercase tracking-wider bg-safety-amber text-asphalt px-[24px] py-[14px] rounded-full mt-4"
                        >
                            Get A Quote
                        </button>
                    </div>
                )}
            </nav>
        </>
    );
}
