"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Waves, Thermometer, Hammer, Clock } from "lucide-react";

export function PhpmHero() {
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
        <section ref={containerRef} className="relative pt-40 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-asphalt min-h-[90dvh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0 product-bg">
                <div className="absolute inset-0 bg-asphalt/85 z-10" />
                <img
                    src="/images/phpm-hero.png"
                    alt="PHPM-50 High Performance Pothole Patch applied in standing water"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-40"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2670&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-5xl">
                <div className="product-label flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-high-vis-yellow/10 border border-high-vis-yellow/20 text-high-vis-yellow rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <Waves className="w-3 h-3" />
                        Hydro-Reactive Formula
                    </div>
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full font-mono text-xs text-concrete uppercase tracking-widest">
                        Permanent Repair
                    </div>
                </div>

                <h1 className="product-title font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] text-concrete uppercase tracking-tight leading-[0.9] text-balance mb-6 flex flex-col">
                    <span>PHPM<span className="text-high-vis-yellow">-50</span><span className="text-2xl align-super">&trade;</span></span>
                    <span className="font-drama italic text-concrete/50 text-4xl md:text-6xl mt-2 tracking-normal">Pothole Patch</span>
                </h1>

                <p className="product-desc font-sans text-concrete/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
                    Stop throwing away bags of cheap cold patch. PHPM-50™ is a commercial-grade, hydro-reactive pothole repair polymer that cures permanently, even when poured directly into standing water. Engineered for extreme Texas temperature swings, it expands and contracts without fracturing.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <button className="product-stats group flex items-center gap-3 bg-high-vis-yellow text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-safety-amber transition-colors shadow-[0_0_30px_rgba(204,255,0,0.2)] hover:shadow-[0_0_50px_rgba(204,255,0,0.4)]">
                        Order By The Pallet
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <Thermometer className="w-8 h-8 text-high-vis-yellow" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">ALL-WEATHER</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">0°F TO 120°F</span>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 product-stats"></div>
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <Hammer className="w-8 h-8 text-high-vis-yellow" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">NO PRIMER</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">JUST TAMP & GO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
