"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, Map, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: "post-construction",
        title: "Commercial Site Revegetation",
        icon: Building2,
        description: "After heavy equipment clears and grades a commercial pad site in San Antonio, the remaining barren dirt is highly susceptible to wind and water erosion, often triggering municipal fines. We offer rapid, large-scale hydro-seeding to quickly re-establish vegetation, locking down the soil across vast acreages and passing SWPPP inspections.",
        keywords: ["Commercial Hydroseeding San Antonio", "SWPPP Compliance Seeding", "Post-Construction Revegetation"]
    },
    {
        id: "retention-ponds",
        title: "Retention Ponds & Drainage Channels",
        icon: Waves,
        description: "Steep slopes in drainage basins and retention ponds are impossible to sod efficiently and require specialized erosion control. Our hydro-seed slurry utilizes Bonded Fiber Matrix (BFM) that glues directly to extreme gradients, establishing deep-rooted vegetation that prevents the pond walls from collapsing during heavy Texas downpours.",
        keywords: ["Retention Pond Seeding", "Drainage Channel Erosion Control", "Slope Stabilization Seeding"]
    },
    {
        id: "highway-right-of-way",
        title: "Highway Right-of-Ways & Infrastructure",
        icon: Map,
        description: "Crownwood operates high-capacity, heavy-duty hydro-seeding equipment capable of shooting slurry over 150 feet from the truck. This allows us to rapidly seed expansive highway medians, TXDOT right-of-ways, and large municipal infrastructure projects with drought-tolerant native grass blends without disrupting traffic flows.",
        keywords: ["TXDOT Hydroseeding", "Highway Median Revegetation", "Right-of-Way Seeding Contractors"]
    }
];

export function HydroSeedingServicesList() {
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
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4CAF50 25%, transparent 25%, transparent 75%, #4CAF50 75%, #4CAF50), repeating-linear-gradient(45deg, #4CAF50 25%, transparent 25%, transparent 75%, #4CAF50 75%, #4CAF50)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-asphalt uppercase tracking-tight mb-6">
                        Targeted <span className="text-[#4CAF50]">Applications</span>
                    </h2>
                    <p className="font-sans text-xl text-asphalt/70 max-w-4xl leading-relaxed">
                        Crownwood specializes in commercial and municipal scale hydro-seeding. We replace exorbitant sod costs with engineered slurry applications designed to stabilize massive, high-risk footprints.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="service-item bg-concrete rounded-3xl p-8 md:p-12 border border-asphalt/10 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row gap-8 md:gap-12 items-start relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#4CAF50] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-md border border-black/5 group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-10 h-10 text-asphalt group-hover:text-[#4CAF50] transition-colors" />
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
