"use client";

import { ArrowRight, Info } from "lucide-react";

export function MeltdownHero() {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#111111] py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative border-b border-white/5">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-safety-amber/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">

                {/* Left Column (Content) */}
                <div className="flex flex-col items-start">

                    {/* Badge */}
                    <div className="inline-block bg-safety-amber/10 border border-safety-amber/30 px-[16px] py-[6px] rounded-full mb-6">
                        <span className="text-[12px] font-bold tracking-[2px] uppercase text-safety-amber drop-shadow-[0_0_8px_rgba(255,149,0,0.5)]">
                            SOY-BASED • 2-IN-1 FORMULA • MADE IN TEXAS
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-bebas text-[72px] leading-[0.9] tracking-normal mb-2">
                        <span className="text-white">MELTDOWN </span>
                        <span className="text-safety-amber drop-shadow-[0_0_15px_rgba(255,149,0,0.3)]">MR-1</span>
                    </h1>

                    {/* Subheadline */}
                    <h2 className="font-barlow text-[22px] font-semibold text-safety-amber tracking-[1px] uppercase mb-6">
                        The Only 2-in-1 Asphalt Remover & Release Agent
                    </h2>

                    {/* Description */}
                    <p className="text-[17px] text-concrete/80 max-w-[500px] leading-[1.7] mb-10">
                        One drum replaces two products. MeltDown MR-1 is a high-performance, soy-based asphalt remover that cleans cured asphalt, tar, and tack oil from equipment — and doubles as a release agent that prevents asphalt from ever sticking in the first place. Built for municipalities, paving crews, and asphalt plants that refuse to settle.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-[16px] w-full sm:w-auto">
                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-[15px] uppercase tracking-widest hover:bg-high-vis-yellow transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,149,0,0.3)]"
                        >
                            Request A Quote
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => scrollTo('features')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-white/20 text-concrete px-8 py-4 rounded-full font-heading font-bold text-[15px] uppercase tracking-widest hover:border-safety-amber hover:text-safety-amber transition-all"
                        >
                            See How It Works
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Column (Product Visual) - Note: User requested to use the provided png instead of CSS drum */}
                <div className="hidden lg:flex justify-end relative">
                    {/* Dark gradient backdrop to frame the product */}
                    <div className="w-[440px] h-[520px] bg-gradient-to-br from-[#1C1C1E] to-[#111111] border border-white/10 rounded-2xl relative flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden">
                        {/* Top edge gradient strip */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-safety-amber via-[#2E5D3A] to-safety-amber" />

                        {/* Background glow behind product */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.1)_0%,transparent_60%)] pointer-events-none" />

                        {/* Product Image */}
                        <img
                            src="/Meltdown.png"
                            alt="MeltDown MR-1 Product Shot"
                            className="w-auto h-[320px] object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                        />

                        {/* Size Tabs row below product */}
                        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
                            {['1 GAL', '5 GAL', '55 GAL', '330 GAL'].map((size) => (
                                <div
                                    key={size}
                                    className={`
                                        px-3 py-1.5 rounded text-[13px] font-bold font-mono tracking-wider transition-all
                                        ${size === '55 GAL'
                                            ? 'bg-safety-amber/10 border border-safety-amber text-safety-amber drop-shadow-[0_0_5px_rgba(255,149,0,0.5)]'
                                            : 'bg-white/5 text-concrete/40 border border-transparent'}
                                    `}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
