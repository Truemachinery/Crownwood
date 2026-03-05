"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            ".hero-bg",
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        )
            .fromTo(
                ".hero-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" },
                "-=1.5"
            )
            .fromTo(
                ".hero-cta",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.8"
            );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 hero-bg">
                <div className="absolute inset-0 bg-asphalt/70 z-10" /> {/* Dark overlay */}
                <img
                    src="https://images.unsplash.com/photo-1541888081696-2814bfbda1b1?q=80&w=2670&auto=format&fit=crop"
                    alt="Heavy machinery construction site at dusk"
                    className="w-full h-full object-cover"
                />
                {/* Gradient fade to match background at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-concrete to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-5xl">
                <h1 className="flex flex-col gap-2">
                    <span className="hero-text font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight">
                        Chemical Infrastructure Engineered For
                    </span>
                    <span className="hero-text font-drama italic text-7xl md:text-9xl text-safety-amber leading-[0.85] tracking-tight ml-4 md:ml-12">
                        Domination.
                    </span>
                </h1>

                <div className="hero-cta mt-12 flex items-center gap-6">
                    <button className="group flex items-center gap-3 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:bg-high-vis-yellow transition-colors">
                        Request a Quote
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="hidden md:flex flex-col pointer-events-none">
                        <span className="font-mono text-safety-amber text-sm font-bold">STATE OF TEXAS</span>
                        <span className="font-sans text-concrete/80 text-sm tracking-wide">Paving & Stabilization Authority</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
