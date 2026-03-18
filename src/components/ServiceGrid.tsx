"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Asphalt Paving Services",
        keywords: "San Antonio & Surrounding Areas",
        href: "/construction/asphalt-paving",
        desc: "Serving residential, commercial, city, and county roads in San Antonio. We handle full tear-outs, overlays, new asphalt project installation, driveways, parking lots, and precise pothole repairs."
    },
    {
        title: "Land Clearing & Leveling",
        keywords: "Heavy-Duty Site Prep",
        href: "/construction/land-clearing",
        desc: "Heavy-duty land clearing, precise grading, and levelling. Everything in and between to prepare San Antonio properties for pristine development and construction."
    },
    {
        title: "Sealcoat Services",
        keywords: "Weather Protection",
        href: "/construction/sealcoat",
        desc: "Highly detailed parking lot and driveway sealcoating. Protecting valuable asphalt infrastructure against extreme Texas weather, oxidation, and wear."
    },
    {
        title: "Parking Lot Striping",
        keywords: "ADA Compliance",
        href: "/construction/striping",
        desc: "Precision line striping to ensure ADA compliance, optimal traffic flow, and sharp, professional aesthetics for commercial and municipal properties."
    },
    {
        title: "Concrete Services",
        keywords: "Structural Foundations",
        href: "/construction/concrete",
        desc: "Licensed and insured full concrete crew for projects small or massive. Commercial flatwork, structural foundations, and all other forms of custom concrete delivery engineered for absolute durability."
    }
];

export function ServiceGrid() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.service-card');

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-asphalt">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-4 text-balance">
                            Construction Dominance
                        </h2>
                        <p className="font-mono text-safety-amber text-sm tracking-widest uppercase">
                            San Antonio Heavy Services Division
                        </p>
                    </div>
                    <button className="text-concrete font-heading font-bold uppercase tracking-widest text-sm border-b-2 border-safety-amber pb-1 hover:text-safety-amber transition-colors">
                        View All Capabilities
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((s, i) => (
                        <Link
                            key={i}
                            href={s.href}
                            className={`service-card group relative bg-industrial rounded-[2rem] p-8 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-safety-amber/50 cursor-pointer overflow-hidden shadow-xl block ${i === 0 ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-amber to-high-vis-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <span className="font-mono text-xs text-concrete/50 tracking-widest uppercase">{s.keywords}</span>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-safety-amber transition-colors group-hover:text-asphalt text-concrete">
                                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-heading font-bold text-2xl text-concrete mb-4">{s.title}</h3>
                                <p className="font-sans text-concrete/70 leading-relaxed text-sm">
                                    {s.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
