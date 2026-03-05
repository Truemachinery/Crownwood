"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Droplets, DollarSign, Ruler } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        icon: Package,
        value: "275",
        unit: "GAL",
        label: "Concentrate Per Tote",
        detail: "Delivered to your site",
    },
    {
        icon: Droplets,
        value: "10:1",
        unit: "RATIO",
        label: "Dilution Rate",
        detail: "1 tote = 2,750 gal finished product",
    },
    {
        icon: DollarSign,
        value: "$1.96",
        unit: "/GAL",
        label: "Finished Cost",
        detail: "$5,400 per tote delivered",
    },
    {
        icon: Ruler,
        value: "~1 MI",
        unit: "COVERAGE",
        label: "Per Tote at 20ft Wide",
        detail: "Massive coverage per unit",
    },
];

export function PermabaseBlackPricing() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.pricing-stat');

        cards.forEach((card: any, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.12
            });
        });

        gsap.from(".pricing-headline", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[#111] relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)', backgroundPosition: '0 0, 15px 15px', backgroundSize: '30px 30px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="pricing-headline text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-safety-amber"></div>
                        <span className="font-mono text-sm text-safety-amber uppercase tracking-widest font-bold">Bulk Pricing</span>
                        <div className="w-12 h-1 bg-safety-amber"></div>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6">
                        275-Gallon <span className="text-safety-amber">Tote Delivery</span>
                    </h2>
                    <p className="font-sans text-xl text-concrete/70 max-w-3xl mx-auto leading-relaxed">
                        We deliver Permabase Black™ in industrial 275-gallon IBC totes directly to your job site. Dilute 10:1 with water on-site—one tote produces <strong className="text-concrete">2,750 gallons</strong> of finished product ready for application.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="pricing-stat bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-safety-amber/40 hover:bg-white/[0.07] transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-safety-amber/10 text-safety-amber mx-auto mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div className="flex items-baseline justify-center gap-1 mb-1">
                                <span className="font-heading font-bold text-4xl text-concrete">{stat.value}</span>
                                <span className="font-mono text-xs text-safety-amber uppercase tracking-widest">{stat.unit}</span>
                            </div>
                            <h3 className="font-heading font-bold text-sm text-concrete/90 uppercase tracking-wider mb-2">{stat.label}</h3>
                            <p className="font-mono text-[11px] text-concrete/50 tracking-wide">{stat.detail}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA banner */}
                <div className="pricing-stat bg-safety-amber/10 border border-safety-amber/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl text-concrete uppercase tracking-tight mb-2">
                            $5,400 <span className="text-safety-amber">Per Tote</span>
                        </h3>
                        <p className="font-sans text-concrete/70 text-lg">
                            275 gallons of concentrate → 2,750 gallons finished → approximately 1 mile of coverage at 20ft wide. <span className="text-safety-amber font-semibold">Just $1.96 per gallon</span> of finished product.
                        </p>
                    </div>
                    <button className="shrink-0 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        Order A Tote
                    </button>
                </div>
            </div>
        </section>
    );
}
