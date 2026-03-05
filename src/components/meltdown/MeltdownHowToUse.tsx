export function MeltdownHowToUse() {
    const removeSteps = [
        "Apply MeltDown MR-1 directly to asphalt, tar, or tack oil buildup",
        "Allow 10–30 minutes dwell time depending on severity (longer for fully cured asphalt)",
        "Agitate with brush or pressure washer for heavy buildup",
        "Rinse with water — asphalt lifts and flushes away cleanly",
        "Repeat for extreme multi-layer buildup if needed"
    ];

    const releaseSteps = [
        "Spray or brush a thin, even coat onto clean surfaces before contact with hot mix",
        "Apply to truck beds, roller drums, paver screeds, tools, hoppers, and augers",
        "Allow a light film to set — no pooling or excess needed",
        "Load, pave, or roll as normal — asphalt releases cleanly",
        "Reapply as needed between loads or at the start of each shift"
    ];

    return (
        <section className="bg-[#111111] py-24 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#1C1C1E] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        HOW TO USE
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        TWO PRODUCTS, ONE DRUM
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-2xl mx-auto leading-[1.6]">
                        MeltDown MR-1 works as both an asphalt remover and a release agent depending on how you apply it. No mixing, no dilution required for most applications.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* Column 1: Remover */}
                    <div className="bg-[#1C1C1E] rounded-xl p-8 lg:p-10 border border-white/5 shadow-2xl">
                        <h3 className="font-barlow text-[24px] font-bold text-safety-amber tracking-[0.5px] uppercase mb-8 border-b border-white/10 pb-4">
                            As an Asphalt Remover & Cleaner
                        </h3>
                        <div className="space-y-6">
                            {removeSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="shrink-0 w-[26px] h-[26px] flex items-center justify-center bg-safety-amber/10 border border-safety-amber/30 text-safety-amber text-[12px] font-bold rounded shadow-[0_0_8px_rgba(255,149,0,0.15)]">
                                        {idx + 1}
                                    </div>
                                    <p className="text-[15px] text-concrete/80 leading-[1.6] pt-0.5">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Release Agent */}
                    <div className="bg-[#1C1C1E] rounded-xl p-8 lg:p-10 border border-white/5 shadow-2xl">
                        <h3 className="font-barlow text-[24px] font-bold text-safety-amber tracking-[0.5px] uppercase mb-8 border-b border-white/10 pb-4">
                            As a Release Agent
                        </h3>
                        <div className="space-y-6">
                            {releaseSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="shrink-0 w-[26px] h-[26px] flex items-center justify-center bg-safety-amber/10 border border-safety-amber/30 text-safety-amber text-[12px] font-bold rounded shadow-[0_0_8px_rgba(255,149,0,0.15)]">
                                        {idx + 1}
                                    </div>
                                    <p className="text-[15px] text-concrete/80 leading-[1.6] pt-0.5">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
