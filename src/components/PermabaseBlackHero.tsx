"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Beaker, ShieldHalf, Droplet, PaintBucket } from "lucide-react";

export function PermabaseBlackHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".product-bg",
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        )
            .fromTo(
                ".product-label",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=1.2"
            )
            .fromTo(
                ".product-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                "-=0.6"
            )
            .fromTo(
                ".product-desc",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(
                ".product-stats",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
                "-=0.6"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative pt-40 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0A0A0A] min-h-[90dvh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0 product-bg">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-transparent z-10" />
                <img
                    src="/images/permabase-black-hero.png"
                    alt="Permabase Black application combining soil stabilization with an asphalt-like aesthetic"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-40 grayscale-[80%]"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1542382604-dd69bfdcda56?q=80&w=2670&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-5xl">
                <div className="product-label flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-asphalt/50 border border-white/10 text-concrete rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <PaintBucket className="w-3 h-3 text-safety-amber" />
                        Polymer Soil Stabilization
                    </div>
                    <div className="px-3 py-1 bg-safety-amber/10 backdrop-blur-sm border border-safety-amber/20 rounded-full font-mono text-xs text-safety-amber uppercase tracking-widest">
                        Asphalt-Grade Aesthetic
                    </div>
                </div>

                <h1 className="product-title font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] text-concrete uppercase tracking-tight leading-[0.9] text-balance mb-6 flex flex-col">
                    <span>Perma<span className="text-safety-amber">base</span><span className="text-2xl align-super">&trade;</span></span>
                    <span className="font-drama italic text-[#333333] tracking-tight drop-shadow-[0_0_1px_rgba(255,255,255,0.8)] text-4xl md:text-6xl mt-2 z-10 relative">
                        BLACK EDITION
                    </span>
                </h1>

                <p className="product-desc font-sans text-concrete/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
                    The industry&apos;s only polymer soil stabilization system that doubles as a finished wearing surface. Permabase™ Black delivers permanent bio-enzyme clay stabilization infused with a proprietary carbon-black tint — hardening failing subgrades while mimicking the premium aesthetic of hot-mix asphalt or a fresh commercial sealcoat.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <button className="product-stats group flex items-center gap-3 bg-concrete text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-white transition-colors shadow-xl">
                        Request SDS & Spec Sheet
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <ShieldHalf className="w-8 h-8 text-safety-amber" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">STRUCTURAL</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">STABILIZATION</span>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 product-stats"></div>
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <Droplet className="w-8 h-8 text-[#333333] fill-current drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">CARBON</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">BLACK TINT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
