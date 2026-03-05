"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Warehouse, Building2, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: "loading-docks",
        title: "Distribution Center Loading Docks",
        icon: Warehouse,
        description: "Loading docks experience the most severe kinetic stress of any commercial pavement. The repetitive impact of 80,000-pound trailers arriving, braking, and turning shears standard asphalt. We pour high-strength, double-reinforced concrete dock pads designed to permanently withstand extreme industrial logistics.",
        keywords: ["Concrete Loading Docks", "Warehouse Concrete Repair", "Heavy Duty Concrete Pads"]
    },
    {
        id: "dumpster-pads",
        title: "Dumpster & Refuse Pads",
        icon: Truck,
        description: "Municipal refuse trucks run heavy point-loads directly onto the tires that will instantly destroy asphalt in San Antonio heat. Crownwood forms and pours extended concrete dumpster pads, engineered to distribute the localized pressure of hydraulic lifting equipment, preventing surface depression.",
        keywords: ["Dumpster Pad Construction", "San Antonio Concrete Repair", "Trash Enclosure Pads"]
    },
    {
        id: "curb-repair",
        title: "Property Management Curb Rehabilitation",
        icon: Building2,
        description: "Deteriorating curbs and broken gutters are massive tripping hazards and severely impact the curb appeal of your commercial property. We provide surgical extraction and rapid re-pouring of damaged curb sections, seamlessly matching existing grades to restore aesthetic and drainage flow.",
        keywords: ["Curb and Gutter Repair", "Commercial Concrete Repair", "Property Management Paving"]
    }
];

export function ConcreteServicesList() {
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
                        Concrete <span className="text-safety-amber">Infrastructure</span>
                    </h2>
                    <p className="font-sans text-xl text-asphalt/70 max-w-4xl leading-relaxed">
                        We don't pour residential driveways. Crownwood Chemicals focuses exclusively on heavy-duty commercial and municipal concrete assets engineered to endure extreme Texas operational demands.
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
