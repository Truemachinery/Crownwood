"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Drill, Layers, ArrowDownToLine, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: "commercial-paving",
        title: "Commercial Parking Lot Paving",
        icon: Layers,
        description: "Crownwood Chemicals engineers high-volume commercial parking lots designed to withstand continuous heavy industrial traffic and extreme San Antonio heat. We handle everything from subgrade stabilization using our proprietary Permabase technology to the final layer of high-density TxDOT specification hot mix asphalt. A failing parking lot is a liability; we construct assets that last decades.",
        keywords: ["San Antonio Commercial Paving", "Heavy Duty Asphalt", "Industrial Parking Lots"]
    },
    {
        id: "milling-resurfacing",
        title: "Asphalt Milling & Resurfacing",
        icon: ArrowDownToLine,
        description: "When the base is solid but the surface has oxidized and cracked due to intense UV exposure and thermal expansion, a full tear-out isn't always necessary. Our precision milling equipment removes the damaged top layer, allowing us to install a high-strength asphalt overlay. This restores structural integrity, drainage, and aesthetic appeal at a fraction of the cost of total reconstruction.",
        keywords: ["Asphalt Milling Contractors", "Overlay Services", "Pavement Resurfacing Bexar County"]
    },
    {
        id: "structural-repair",
        title: "Structural Pothole Repair & Crack Sealing",
        icon: Drill,
        description: "Water intrusion is the number one cause of asphalt failure in Texas. We don't perform temporary 'throw-and-go' patches. Our structural repair protocol involves saw-cutting the perimeter, removing the compromised asphalt and wet base material, treating the cavity with PHPM-50 for absolute zero moisture permeability, and installing a dense-graded hot mix patch. We then hot-pour rubberized crack sealant to prevent future water ingress.",
        keywords: ["Pothole Repair San Antonio", "Hot Pour Crack Sealing", "PHPM-50 Treatment"]
    },
    {
        id: "new-driveways",
        title: "New Road & Driveway Installation",
        icon: MapPin,
        description: "From private ranches to complex municipal roadways, our new asphalt installation services guarantee a flawless finish and an unbreakable foundation. We manage the entire lifecycle: land clearing, precision grading, base rock installation, and final asphalt placement. Our use of laser-guided GPS equipment ensures perfect slopes for optimal water runoff.",
        keywords: ["New Asphalt Driveways", "Private Road Construction", "Subgrade Grading"]
    }
];

export function AsphaltServicesList() {
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
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFB300 25%, transparent 25%, transparent 75%, #FFB300 75%, #FFB300), repeating-linear-gradient(45deg, #FFB300 25%, transparent 25%, transparent 75%, #FFB300 75%, #FFB300)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-asphalt uppercase tracking-tight mb-6">
                        Comprehensive <span className="text-safety-amber">Asphalt Solutions</span>
                    </h2>
                    <p className="font-sans text-xl text-asphalt/70 max-w-4xl leading-relaxed">
                        Crownwood Chemicals offers a full spectrum of asphalt paving services designed for the unique geological and climatic challenges of South Texas. From massive commercial tear-outs to precision milling, our in-house crews execute with zero compromise.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {SERVICES.map((service, idx) => (
                        <div key={service.id} className="service-item bg-concrete rounded-3xl p-8 md:p-12 border border-asphalt/10 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row gap-8 md:gap-12 items-start relative overflow-hidden">
                            {/* Accent Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-safety-amber transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-md border border-black/5 group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-10 h-10 text-asphalt group-hover:text-safety-amber transition-colors" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-heading font-bold text-3xl text-asphalt uppercase tracking-wide mb-4">
                                    {service.title}
                                </h3>
                                {/* Hidden Keywords for SEO/LLMs */}
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
