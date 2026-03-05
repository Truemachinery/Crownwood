"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tractor, MountainSnow, Shovel, HardHat } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: "commercial-development",
        title: "Commercial Pad Site Preparation",
        icon: Tractor,
        description: "Crownwood engineers the foundation for multi-acre commercial developments across San Antonio. From raw, uncleared land to a perfectly flat, compacted dirt pad ready for concrete pouring. We handle the brutal, heavy-iron work required to subjugate Texas terrain.",
        keywords: ["Commercial Pad Prep", "San Antonio Land Development", "Site Excavation"]
    },
    {
        id: "ranch-clearing",
        title: "Large Acreage & Ranch Clearing",
        icon: MountainSnow,
        description: "For ranchers and private landowners expanding pastures, cutting new fence lines, or opening up scenic vistas. Our severe-duty forestry mulchers rapidly eliminate impenetrable cedar brakes and mesquite thickets without damaging the underlying topsoil.",
        keywords: ["Texas Ranch Clearing", "Cedar Eradication", "Fence Line Clearing"]
    },
    {
        id: "detention-ponds",
        title: "Detention Pond & Drainage Excavation",
        icon: Shovel,
        description: "Modern commercial builds require massive stormwater management systems. We excavate deep detention and retention ponds, engineering precise slopes and outflow channels to municipal code to prevent site flooding and erosion.",
        keywords: ["Detention Pond Excavation", "Stormwater Drainage", "Earth Moving contractors"]
    },
    {
        id: "right-of-way",
        title: "Right-of-Way & Easement Clearing",
        icon: HardHat,
        description: "We partner with municipalities, utility companies, and energy sectors to clear miles of linear Right-of-Way. We cut through heavy timber and rocky terrain to allow immediate access for surveyors, linemen, and pipeline crews.",
        keywords: ["Right-of-Way Clearing", "Utility Line Prep", "Municipal Easements"]
    }
];

export function LandClearingServicesList() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray('.service-item');

        items.forEach((item: any, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.15
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-white relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFB300 25%, transparent 25%, transparent 75%, #FFB300 75%, #FFB300), repeating-linear-gradient(45deg, #FFB300 25%, transparent 25%, transparent 75%, #FFB300 75%, #FFB300)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-asphalt uppercase tracking-tight mb-6">
                        Heavy Iron <span className="text-safety-amber">Solutions</span>
                    </h2>
                    <p className="font-sans text-xl text-asphalt/70 max-w-4xl leading-relaxed">
                        We don't do lightweight landscaping. We operate a fleet of heavy excavators, bulldozers, and high-flow skid steers designed to rip, cut, and move thousands of tons of material.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="service-item bg-concrete rounded-3xl p-8 md:p-12 border border-asphalt/10 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row gap-8 md:gap-12 items-start relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-safety-amber transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-md border border-black/5 group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-10 h-10 text-asphalt group-hover:text-safety-amber transition-colors" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-heading font-bold text-3xl text-asphalt uppercase tracking-wide mb-4">
                                    {service.title}
                                </h3>
                                <div className="sr-only">
                                    Keywords: {service.keywords.join(", ")}
                                </div>
                                <p className="font-sans text-asphalt/80 text-lg leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {service.keywords.map((kw) => (
                                        <span key={kw} className="px-3 py-1 bg-white border border-asphalt/10 rounded-full font-mono text-xs text-asphalt/60 uppercase tracking-wider">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
