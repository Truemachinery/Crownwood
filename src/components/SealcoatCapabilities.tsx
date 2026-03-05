"use client";

import { CircleDollarSign, Droplets, PaintBucket, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
    {
        id: "commercial-sealcoat",
        title: "Commercial Parking Lot Sealcoating",
        desc: "We utilize high-pressure spray application systems to deliver an even, heavy-duty coat of our proprietary, aggregate-infused sealer. This process instantly revitalizes massive retail centers and industrial lots across Bexar County, extending pavement life by up to 300%.",
        icon: PaintBucket,
        metrics: ["High-Pressure Spray", "Sand/Aggregate Infused"]
    },
    {
        id: "waterproofing",
        title: "Chemical Waterproofing",
        desc: "Unsealed asphalt acts like a sponge, absorbing water into the subgrade causing potholing. Our specialized sealing emulsions form an impermeable polymer membrane on top of the asphalt suite, physically rejecting water and chemical spills.",
        icon: Droplets,
        metrics: ["Polymer Membrane", "Petroleum Resistant"]
    },
    {
        id: "roi",
        title: "Capital Preservation (ROI)",
        desc: "Paving is a massive capital expense. Sealcoating costs mere pennies per square foot compared to the dollars required for a full tear-out overlay. Regular scheduled maintenance every 2-3 years is the most financially responsible infrastructure decision a property manager can make.",
        icon: CircleDollarSign,
        metrics: ["Asset Protection", "Preventative Maintenance"]
    },
    {
        id: "permabase-black",
        title: "Permabase Black Application",
        desc: "For premium clients, we offer Permabase Black—our internally manufactured polymer wearing surface. It guarantees 0.0% VOC emissions, emits no toxic odors to disrupt retail shoppers, and dries incredibly fast, minimizing facility downtime.",
        icon: ShieldCheck,
        metrics: ["0% VOC Emissions", "Rapid Cure Time"]
    }
];

export function SealcoatCapabilities() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.capability-card');

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
                delay: i % 2 === 0 ? 0 : 0.2
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-concrete relative">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6">
                        Preservation <span className="text-safety-amber">Capabilities</span>
                    </h2>
                    <p className="font-sans text-xl text-industrial/70 max-w-3xl leading-relaxed">
                        Sealcoating is not just painting the ground black. It is applying a highly-engineered chemical shield that locks out the elements that destroy asphalt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CAPABILITIES.map((cap) => (
                        <div key={cap.id} className="capability-card bg-white rounded-[2rem] p-10 border border-black/5 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-safety-amber/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500" />

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-industrial text-safety-amber flex items-center justify-center shrink-0 group-hover:bg-safety-amber group-hover:text-industrial transition-colors">
                                    <cap.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-2xl text-industrial uppercase tracking-wide mb-2">{cap.title}</h3>
                                    <div className="flex gap-3 font-mono text-[10px] text-industrial/50 uppercase tracking-widest flex-wrap">
                                        {cap.metrics.map(m => (
                                            <span key={m} className="px-2 py-1 bg-industrial/5 rounded-md">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="font-sans text-industrial/70 leading-relaxed">
                                {cap.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
