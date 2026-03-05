"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Leaf, Shield, Droplets } from "lucide-react";

export function HydroSeedingHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".hero-bg",
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        )
            .fromTo(
                ".hero-label",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=1.2"
            )
            .fromTo(
                ".hero-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
                "-=0.6"
            )
            .fromTo(
                ".hero-desc",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(
                ".hero-stats",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
                "-=0.6"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative pt-40 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-asphalt min-h-[90dvh] flex flex-col justify-center border-b border-white/5">
            <div className="absolute inset-0 z-0 hero-bg">
                <div className="absolute inset-0 bg-asphalt/85 z-10" />
                <img
                    src="/images/hydro-seeding-hero.png"
                    alt="Commercial hydroseeding slurry applied to a large embankment for rapid revegetation"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-40 grayscale-[20%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-5xl">
                <div className="hero-label flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-[#4CAF50]/10 border border-[#4CAF50]/30 text-[#4CAF50] rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_10px_rgba(76,175,80,0.2)]">
                        <Leaf className="w-3 h-3" />
                        Biological Revegetation
                    </div>
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full font-mono text-xs text-concrete uppercase tracking-widest">
                        Erosion Control
                    </div>
                </div>

                <h1 className="hero-title font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] text-concrete uppercase tracking-tight leading-[0.9] text-balance mb-6 flex flex-col">
                    <span className="text-[#4CAF50]">Rapid</span>
                    <span>Revegetation</span>
                </h1>

                <p className="hero-desc font-sans text-concrete/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
                    San Antonio's severe weather and extreme slopes demand advanced erosion control. We deploy high-pressure hydro-seeding slurries—combining proprietary seed blends, fertilizers, and tackifiers—to lock down soil and establish dense, permanent root systems at a fraction of the cost of sod.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <button className="hero-stats group flex items-center gap-3 bg-[#4CAF50] text-[#111111] px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-[#45a049] transition-colors shadow-[0_0_30px_rgba(76,175,80,0.3)] hover:shadow-[0_0_50px_rgba(76,175,80,0.5)]">
                        Get A Hydroseeding Quote
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="hero-stats flex items-center gap-3 text-concrete">
                            <Shield className="w-8 h-8 text-[#4CAF50]" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">SWPPP</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">COMPLIANT</span>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 hero-stats"></div>
                        <div className="hero-stats flex items-center gap-3 text-concrete">
                            <Droplets className="w-8 h-8 text-[#4CAF50]" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">-60%</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">COST VS SOD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
