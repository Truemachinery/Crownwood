"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, HardHat, ShieldCheck, MapPin } from "lucide-react";

export function AsphaltHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".service-bg",
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        )
            .fromTo(
                ".service-label",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=1.2"
            )
            .fromTo(
                ".service-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                "-=0.6"
            )
            .fromTo(
                ".service-desc",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(
                ".service-stats",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
                "-=0.6"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative pt-40 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-asphalt min-h-[90dvh] flex flex-col justify-center">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 service-bg">
                <div className="absolute inset-0 bg-asphalt/80 z-10" />
                <img
                    src="/images/asphalt-hero.png"
                    alt="Freshly laid asphalt road in San Antonio"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-5xl">
                <div className="service-label flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full flex items-center gap-2 font-mono text-xs text-concrete uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-safety-amber" />
                        San Antonio, TX
                    </div>
                    <div className="px-3 py-1 bg-safety-amber/10 border border-safety-amber/20 text-safety-amber rounded-full font-mono text-xs uppercase tracking-widest">
                        Heavy Infrastructure
                    </div>
                </div>

                <h1 className="service-title font-heading font-bold text-5xl md:text-7xl lg:text-[6rem] text-concrete uppercase tracking-tight leading-[0.9] text-balance mb-8">
                    Absolute <span className="font-drama italic text-safety-amber">Precision</span><br />Asphalt Paving
                </h1>

                <p className="service-desc font-sans text-concrete/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                    From full-depth tear-outs to high-density overlays. We build unbreakable roads, parking lots, and municipal infrastructure designed to withstand extreme Texas heat and heavy industrial traffic.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <button className="service-stats group flex items-center gap-3 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-high-vis-yellow transition-colors">
                        Dispatch Crew
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="service-stats flex items-center gap-3 text-concrete">
                            <HardHat className="w-8 h-8 opacity-50" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">100%</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">IN-HOUSE CREW</span>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 service-stats"></div>
                        <div className="service-stats flex items-center gap-3 text-concrete">
                            <ShieldCheck className="w-8 h-8 text-safety-amber" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">BONDED</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">& INSURED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
