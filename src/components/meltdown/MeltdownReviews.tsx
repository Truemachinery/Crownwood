export function MeltdownReviews() {
    const reviews = [
        {
            name: "Joe R. — Public Works Supervisor",
            text: "We replaced our asphalt cleaner AND our release agent with one drum of MeltDown. Crew loves it — less product to haul, less time cleaning up at the end of the day."
        },
        {
            name: "Marcus T. — Paving Foreman",
            text: "Switched from a citrus cleaner that evaporated before it could do anything. MeltDown actually soaks in and works. The soy base gives it real dwell time on hardened asphalt."
        },
        {
            name: "Sandra K. — Fleet Manager, Municipal DOT",
            text: "We spray our truck beds before every load now. Asphalt slides right out — no scraping, no diesel. Saved us hours per week across our fleet."
        }
    ];

    return (
        <section className="bg-[#111111] py-24 select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#111111] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        WHAT CREWS ARE SAYING
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        TRUSTED BY CONTRACTORS & MUNICIPALITIES
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-3xl mx-auto leading-[1.6]">
                        From city road departments to large-scale paving operations, MeltDown MR-1 is changing the way crews think about asphalt cleanup and prevention.
                    </p>
                </div>

                {/* 3-Column Reviews Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-gradient-to-b from-[#1C1C1E] to-[#111111] border border-white/10 rounded-xl p-8 flex flex-col shadow-lg hover:border-safety-amber/50 transition-colors">
                            {/* 5 Stars */}
                            <div className="flex gap-1 mb-6 text-safety-amber text-[20px] tracking-widest drop-shadow-[0_0_8px_rgba(255,149,0,0.5)]">
                                ★★★★★
                            </div>

                            {/* Review Text */}
                            <p className="text-[16px] font-medium text-concrete leading-relaxed mb-8 flex-grow">
                                "{review.text}"
                            </p>

                            {/* Reviewer Name */}
                            <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                                <div className="w-[32px] h-[32px] rounded-full bg-[#2E5D3A] flex items-center justify-center text-white font-bold text-[12px]">
                                    {review.name.charAt(0)}
                                </div>
                                <span className="text-[14px] text-concrete/60 font-medium">
                                    {review.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
