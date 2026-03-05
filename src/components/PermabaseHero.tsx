"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Beaker, ShieldHalf, Droplets } from "lucide-react";

export function PermabaseHero() {
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
                    src="/images/permabase-hero.png"
                    alt="Permabase Soil Stabilizer application on a commercial construction site"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-40"
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-5xl">
                <div className="product-label flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-safety-amber/10 border border-safety-amber/20 text-safety-amber rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <Beaker className="w-3 h-3" />
                        Proprietary Formulation
                    </div>
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full font-mono text-xs text-concrete uppercase tracking-widest">
                        Subgrade Engineering
                    </div>
                </div>

                <h1 className="product-title font-heading font-bold text-5xl md:text-7xl lg:text-[7rem] text-concrete uppercase tracking-tight leading-[0.9] text-balance mb-6 flex flex-col">
                    <span>Perma<span className="text-safety-amber">base</span><span className="text-2xl align-super">&trade;</span></span>
                    <span className="font-drama italic text-concrete/50 text-4xl md:text-6xl mt-2 tracking-normal">Soil Stabilizer</span>
                </h1>

                <p className="product-desc font-sans text-concrete/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
                    Stop excavating and hauling. Permabase™ is a highly concentrated, bio-enzyme catalyst that permanently alters the molecular structure of expansive clay, transforming native, failing San Antonio soils into a waterproof, rock-solid subgrade at a fraction of the cost of traditional lime or cement treatment.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <button className="product-stats group flex items-center gap-3 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-high-vis-yellow transition-colors shadow-[0_0_30px_rgba(255,179,0,0.3)] hover:shadow-[0_0_50px_rgba(255,179,0,0.5)]">
                        Request SDS & Spec Sheet
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <ShieldHalf className="w-8 h-8 text-safety-amber" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">PERMANENT</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">IONIC BOND</span>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 product-stats"></div>
                        <div className="product-stats flex items-center gap-3 text-concrete">
                            <Droplets className="w-8 h-8 text-safety-amber" />
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">100%</span>
                                <span className="font-mono text-[10px] text-concrete/50 tracking-widest">WATERPROOF SUBGRADE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
