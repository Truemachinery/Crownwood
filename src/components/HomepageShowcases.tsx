"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HomepageShowcases() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray('.showcase-reveal');

        sections.forEach((section: any) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* Permabase Black Video Showcase */}
            <section className="showcase-reveal py-32 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Side */}
                        <div>
                            <p className="font-mono text-safety-amber text-xs uppercase tracking-[0.3em] mb-6">
                                Featured Product
                            </p>
                            <h2 className="font-heading font-bold text-5xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                                Permabase <span className="text-high-vis-yellow">Black™</span>
                            </h2>
                            <p className="font-sans text-concrete/70 text-base leading-relaxed mb-10">
                                Watch our crew apply Permabase Black™ — the polymer-based wearing surface that delivers an asphalt-grade finish at a fraction of the cost. Permanent soil stabilization meets premium aesthetics.
                            </p>
                            <Link
                                href="/chemicals/permabase-black"
                                className="group inline-flex items-center gap-4 bg-high-vis-yellow text-asphalt px-10 py-5 font-heading font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 border-2 border-transparent hover:border-high-vis-yellow shadow-[0_0_0_rgba(230,255,0,0)] hover:shadow-[0_8px_30px_rgba(230,255,0,0.3)]"
                            >
                                View Full Specs <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </div>

                        {/* Video Side */}
                        <div className="border border-white/20 relative group overflow-hidden bg-industrial aspect-video shadow-2xl">
                            {/* Accent line on hover */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-high-vis-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                            <video
                                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                controls
                                playsInline
                                preload="none"
                            >
                                <source src="/Videos/IMG_0705.MOV" type="video/quicktime" />
                                <source src="/Videos/IMG_0705.MOV" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            {/* MeltDown MR-1 Showcase */}
            <section className="showcase-reveal py-32 px-6 md:px-12 lg:px-24 bg-industrial relative overflow-hidden border-t border-white/10">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <div className="group order-2 lg:order-1 border-y sm:border sm:border-white/20 flex items-center justify-center bg-asphalt p-12 aspect-square relative shadow-2xl">
                            {/* Accent line on hover */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-safety-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                            <Image
                                src="/Meltdown.png"
                                alt="MeltDown MR-1 Soy-Based Asphalt Remover"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                quality={90}
                                className="object-contain p-12 relative z-10 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>

                        {/* Text Side */}
                        <div className="order-1 lg:order-2">
                            <p className="font-mono text-safety-amber text-xs uppercase tracking-[0.3em] mb-6">
                                Next-Gen Chemistry
                            </p>
                            <h2 className="font-bebas text-6xl md:text-7xl text-concrete tracking-wide mb-4">
                                MELTDOWN <span className="text-safety-amber">MR-1</span>
                            </h2>
                            <p className="font-barlow text-safety-amber text-2xl font-semibold tracking-wide mb-8">
                                THE ONLY 2-IN-1 ASPHALT REMOVER & RELEASE AGENT
                            </p>
                            <p className="font-sans text-concrete/70 text-base leading-relaxed mb-10">
                                One drum replaces two products. MeltDown MR-1 is a high-performance, soy-based asphalt remover that cleans cured asphalt, tar, and tack oil from equipment — and doubles as a release agent that prevents asphalt from ever sticking in the first place. Built for municipalities, paving crews, and asphalt plants that refuse to settle.
                            </p>
                            <Link
                                href="/chemicals/meltdown"
                                className="group inline-flex items-center gap-4 bg-safety-amber text-asphalt px-10 py-5 font-heading font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 border-2 border-transparent hover:border-safety-amber shadow-[0_0_0_rgba(255,149,0,0)] hover:shadow-[0_8px_30px_rgba(255,149,0,0.3)]"
                            >
                                See How It Works <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
