export function MeltdownComparison() {
    return (
        <section id="features" className="bg-[#000000] py-24 select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#111111] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        WHY SWITCH?
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        NOT ALL ASPHALT REMOVERS ARE CREATED EQUAL
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-3xl mx-auto leading-[1.6]">
                        Most crews are stuck choosing between petroleum-based solvents that work but trash the environment, or citrus cleaners that smell nice but can't handle the hard stuff. MeltDown MR-1 is the third option nobody knew existed — and the only one that also works as a release agent.
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* Card 1 — Petroleum */}
                    <div className="bg-[#111111] border border-white/10 rounded-[8px] p-8 flex flex-col h-full opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-8">
                            <h3 className="font-barlow text-[24px] font-bold text-white mb-1">Petroleum / Diesel-Based</h3>
                            <p className="text-[14px] text-concrete/50">Traditional solvents, diesel fuel</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="text-[#2E5D3A] font-bold mt-0.5">+</span>
                                <span className="text-[14px] text-concrete/80 leading-snug">Strong dissolving power</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#2E5D3A] font-bold mt-0.5">+</span>
                                <span className="text-[14px] text-concrete/80 leading-snug">Widely available</span>
                            </li>
                        </ul>
                        <div className="w-full h-[1px] bg-white/5 mb-8" />
                        <ul className="space-y-4 mt-auto">
                            {[
                                "Harsh fumes & VOCs",
                                "Environmental hazard",
                                "Low flash point — fire risk",
                                "Damages rubber & seals",
                                "Remover only — not a release agent"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold mt-0.5">-</span>
                                    <span className="text-[14px] text-concrete/60 leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2 — MeltDown MR-1 (HIGHLIGHTED) */}
                    <div className="bg-gradient-to-b from-[#1C1C1E] to-[#111111] border-[2px] border-safety-amber rounded-[8px] p-8 flex flex-col h-full relative shadow-[0_0_40px_rgba(255,149,0,0.15)] transform lg:-translate-y-4 z-10">
                        {/* Best Choice Banner */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] bg-safety-amber text-[#111111] px-6 py-1 rounded-full font-bold text-[10px] tracking-[2px] uppercase whitespace-nowrap">
                            BEST CHOICE
                        </div>

                        <div className="mb-8 mt-2">
                            <h3 className="font-barlow text-[28px] font-bold text-safety-amber mb-1">Soy-Based (MeltDown MR-1)</h3>
                            <p className="text-[15px] font-medium text-concrete/70">Crownwood Chemicals — San Antonio, TX</p>
                        </div>
                        <ul className="space-y-5">
                            {[
                                "Superior penetration & dwell time",
                                "2-in-1: remover AND release agent",
                                "Soy-based & biodegradable",
                                "High flash point — safer jobsites",
                                "Non-corrosive to all surfaces",
                                "Won't damage paint, rubber, or chrome",
                                "Best per-gallon value in the industry"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-safety-amber font-bold mt-0.5">+</span>
                                    <span className="text-[15px] text-white font-medium leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 3 — Citrus-Based */}
                    <div className="bg-[#111111] border border-white/10 rounded-[8px] p-8 flex flex-col h-full opacity-60 hover:opacity-100 transition-opacity">
                        <div className="mb-8">
                            <h3 className="font-barlow text-[24px] font-bold text-white mb-1">Citrus-Based</h3>
                            <p className="text-[14px] text-concrete/50">D-Limonene solvents, orange oil cleaners</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="text-[#2E5D3A] font-bold mt-0.5">+</span>
                                <span className="text-[14px] text-concrete/80 leading-snug">Natural & biodegradable</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#2E5D3A] font-bold mt-0.5">+</span>
                                <span className="text-[14px] text-concrete/80 leading-snug">Pleasant citrus scent</span>
                            </li>
                        </ul>
                        <div className="w-full h-[1px] bg-white/5 mb-8" />
                        <ul className="space-y-4 mt-auto">
                            {[
                                "Evaporates too fast",
                                "Weaker on cured asphalt",
                                "Requires heavy dilution or repeat apps",
                                "Higher cost per effective gallon",
                                "Remover only — not a release agent"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-red-500 font-bold mt-0.5">-</span>
                                    <span className="text-[14px] text-concrete/60 leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
