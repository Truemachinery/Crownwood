"use client";

import { useRef } from "react";
import { MousePointer2, Activity } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
    { name: "Permabase", desc: "Clear Soil Stabilizer & Dust Control", color: "bg-[#F5F3EE] text-[#1C1C1E] border border-gray-200" },
    { name: "Permabase Black", desc: "Polymer-Based Wearing Surface", color: "bg-[#111111] text-[#E6FF00] border border-white/10" },
    { name: "PHPM-50", desc: "Advanced Cold-Applied Tack", color: "bg-[#FF9500] text-[#111111] border border-black/10" }
];

export function Features() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Shuffler Animation
        const cards = gsap.utils.toArray('.shuffler-card');

        gsap.to(cards, {
            y: (i) => i * -60,
            scale: (i) => 1 + (i * 0.05),
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.2
        });

        // Typing Telemetry Animation
        const lines = gsap.utils.toArray('.telemetry-line');
        gsap.from(lines, {
            opacity: 0,
            y: 10,
            stagger: 0.3,
            duration: 0.1,
            ease: "steps(1)",
            repeat: -1,
            repeatDelay: 2
        });

        // Cursor Dispatch Animation
        const cursorTl = gsap.timeline({ repeat: -1 });
        cursorTl.to(".dispatch-cursor", { x: -80, y: -40, duration: 1, ease: "power2.inOut" })
            .to(".dispatch-btn", { scale: 0.95, backgroundColor: "#FF9500", color: "#111111", duration: 0.2 })
            .to(".dispatch-btn", { scale: 1, duration: 0.2 })
            .to(".dispatch-cursor", { x: 0, y: 0, duration: 1, ease: "power2.inOut", delay: 1 });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Card 1: Material Lifecycle Shuffler */}
                <div className="h-[400px] rounded-[2rem] bg-industrial p-8 flex flex-col justify-between overflow-hidden relative group">
                    <h3 className="font-heading font-bold text-concrete text-xl tracking-widest z-20 relative">Material Lifecycle</h3>
                    <div className="relative w-full h-56 flex justify-center items-end perspective-[1000px] pb-4">
                        {PRODUCTS.map((prod, i) => (
                            <div
                                key={prod.name}
                                className={`shuffler-card absolute w-full max-w-[260px] h-[140px] rounded-2xl p-6 shadow-xl ${prod.color}`}
                                style={{
                                    bottom: `${i * 12}px`,
                                    transform: `scale(${1 - ((PRODUCTS.length - 1 - i) * 0.05)})`,
                                    zIndex: i,
                                }}
                            >
                                <div className="font-heading font-bold text-lg mb-1 uppercase tracking-wider">{prod.name}</div>
                                <div className="font-mono text-xs leading-relaxed opacity-80">{prod.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card 2: Live Durability Telemetry */}
                <div className="h-[400px] rounded-[2rem] bg-asphalt p-8 border border-white/5 flex flex-col font-mono relative overflow-hidden">
                    <h3 className="text-safety-amber text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3 relative z-10">
                        <Activity className="w-4 h-4 text-safety-amber animate-pulse" />
                        Live Telemetry
                    </h3>
                    <div className="flex-1 text-concrete text-sm leading-[2] space-y-1 relative z-10">
                        <div className="telemetry-line">&gt; INIT PERMABASE_SYS... <span className="text-green-500">OK</span></div>
                        <div className="telemetry-line">&gt; SCANNING ENVIRONMENT...</div>
                        <div className="telemetry-line text-high-vis-yellow font-bold">&gt; VOC EMISSIONS: 0.0%</div>
                        <div className="telemetry-line text-[#00F0FF] font-bold">&gt; WATER SAVED: +15,000 GAL</div>
                        <div className="telemetry-line text-green-400 font-bold">&gt; PATCH LIFE: +500%</div>
                        <div className="telemetry-line opacity-50">&gt; AWAITING DEPLOYMENT PROTOCOL...</div>
                    </div>
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.4)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-0" />
                </div>

                {/* Card 3: San Antonio Dispatch Scheduler */}
                <div className="h-[400px] rounded-[2rem] bg-concrete border border-industrial/10 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] p-8 flex flex-col relative overflow-hidden">
                    <h3 className="font-heading font-bold text-industrial text-xl tracking-widest z-20 mb-8 uppercase">SATX Dispatch</h3>
                    <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
                        {['Paving', 'Concrete', 'Clearing', 'Sealcoat'].map(svc => (
                            <div key={svc} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center text-sm font-heading font-bold text-industrial transition-colors">
                                {svc}
                            </div>
                        ))}
                    </div>
                    <button className="dispatch-btn w-full bg-industrial text-safety-amber py-4 rounded-xl font-heading uppercase font-bold text-sm tracking-widest mt-auto border border-industrial transition-colors shadow-lg z-10">
                        Execute Protocol
                    </button>
                    <MousePointer2 className="dispatch-cursor absolute text-asphalt w-8 h-8 z-30 drop-shadow-md" style={{ bottom: '3rem', right: '4rem' }} />
                </div>

            </div>
        </section>
    );
}
