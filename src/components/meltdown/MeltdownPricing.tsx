"use client";

import { ArrowRight } from "lucide-react";

export function MeltdownPricing() {
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
        <section id="pricing" className="bg-[#000000] py-24 border-t border-white/5 select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#111111] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        PRICING
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        AVAILABLE SIZES & PRICING
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-2xl mx-auto leading-[1.6]">
                        From single-gallon jugs for your tool trailer to 330-gallon totes for plant operations. Volume discounts and Net 30 terms available for qualified accounts.
                    </p>
                </div>

                {/* 4-Column Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end lg:pt-8">

                    {/* 1 GAL */}
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-8 flex flex-col text-center opacity-80 hover:opacity-100 transition-opacity">
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-concrete/50 mb-6">Starter</div>
                        <h3 className="font-bebas text-[36px] text-white leading-none mb-1">1 GAL</h3>
                        <p className="text-[14px] text-concrete/50 mb-8 border-b border-white/10 pb-6">Jug</p>

                        <div className="mb-8">
                            <span className="font-bebas text-[42px] text-safety-amber leading-none block">$25</span>
                            <span className="text-[12px] text-concrete/40">$25.00/gal</span>
                        </div>

                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full py-3 rounded-full border border-white/20 text-[13px] font-bold uppercase tracking-wider text-concrete hover:border-safety-amber hover:text-safety-amber transition-colors mt-auto"
                        >
                            Order Now
                        </button>
                    </div>

                    {/* 5 GAL */}
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-8 flex flex-col text-center opacity-80 hover:opacity-100 transition-opacity">
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-concrete/50 mb-6">Standard</div>
                        <h3 className="font-bebas text-[36px] text-white leading-none mb-1">5 GAL</h3>
                        <p className="text-[14px] text-concrete/50 mb-8 border-b border-white/10 pb-6">Pail</p>

                        <div className="mb-8">
                            <span className="font-bebas text-[42px] text-safety-amber leading-none block">$100</span>
                            <span className="text-[12px] text-concrete/40">$20.00/gal</span>
                        </div>

                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full py-3 rounded-full border border-white/20 text-[13px] font-bold uppercase tracking-wider text-concrete hover:border-safety-amber hover:text-safety-amber transition-colors mt-auto"
                        >
                            Order Now
                        </button>
                    </div>

                    {/* 55 GAL (HIGHLIGHTED) */}
                    <div className="bg-gradient-to-b from-[#1C1C1E] to-[#111111] border-[2px] border-safety-amber rounded-xl p-8 flex flex-col text-center shadow-[0_0_30px_rgba(255,149,0,0.15)] transform lg:-translate-y-4 lg:scale-[1.03] z-10 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-safety-amber text-asphalt px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[2px] whitespace-nowrap">
                            Most Popular
                        </div>
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-safety-amber/80 mb-6 mt-2">Crew Size</div>
                        <h3 className="font-bebas text-[36px] text-white leading-none mb-1">55 GAL</h3>
                        <p className="text-[14px] text-concrete/50 mb-8 border-b border-white/10 pb-6">Drum</p>

                        <div className="mb-8">
                            <span className="font-bebas text-[42px] text-safety-amber leading-none block drop-shadow-[0_0_8px_rgba(255,149,0,0.3)]">$990</span>
                            <span className="text-[12px] text-concrete/40">$18.00/gal</span>
                        </div>

                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full py-3 rounded-full bg-safety-amber text-asphalt text-[13px] font-bold uppercase tracking-wider hover:bg-high-vis-yellow transition-colors mt-auto flex items-center justify-center gap-2"
                        >
                            Get A Quote <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* 330 GAL */}
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-8 flex flex-col text-center opacity-80 hover:opacity-100 transition-opacity">
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-concrete/50 mb-6">Bulk</div>
                        <h3 className="font-bebas text-[36px] text-white leading-none mb-1">330 GAL</h3>
                        <p className="text-[14px] text-concrete/50 mb-8 border-b border-white/10 pb-6">IBC Tote</p>

                        <div className="mb-8">
                            <span className="font-bebas text-[42px] text-safety-amber leading-none block">CALL</span>
                            <span className="text-[12px] text-concrete/40">Best price per gallon</span>
                        </div>

                        <button
                            onClick={() => scrollTo('contact')}
                            className="w-full py-3 rounded-full border border-white/20 text-[13px] font-bold uppercase tracking-wider text-concrete hover:border-safety-amber hover:text-safety-amber transition-colors mt-auto"
                        >
                            Call For Price
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
