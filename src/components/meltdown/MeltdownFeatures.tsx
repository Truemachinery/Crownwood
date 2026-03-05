export function MeltdownFeatures() {
    const features = [
        {
            title: "2-in-1 Dual Action",
            desc: "The only product on the market that removes existing asphalt buildup AND prevents new asphalt from bonding. One drum replaces two products on every truck."
        },
        {
            title: "Soy-Based Formula",
            desc: "Derived from American-grown soybeans. Biodegradable, low-VOC, and free of chlorinated solvents. Safer for your crew, your equipment, and the environment."
        },
        {
            title: "Superior Dwell Time",
            desc: "Unlike citrus solvents that evaporate on contact, MeltDown MR-1's soy-based formula soaks in and stays active longer — penetrating and dissolving even fully cured asphalt and tar."
        },
        {
            title: "High Flash Point",
            desc: "Engineered for safe use around hot mix asphalt operations. High flash point means reduced fire risk on active jobsites and around heated equipment."
        },
        {
            title: "Non-Corrosive",
            desc: "Safe on metal, rubber, aluminum, chrome, glass, and painted surfaces. Won't degrade hydraulic seals, hoses, or protective coatings on your equipment."
        },
        {
            title: "Best Price in the Industry",
            desc: "When one product does the job of two, the math speaks for itself. Volume pricing available for municipalities and commercial accounts with Net 30 terms."
        }
    ];

    return (
        <section className="bg-[#111111] py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#1C1C1E] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        PRODUCT CAPABILITIES
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        WHAT MAKES MELTDOWN MR-1 DIFFERENT
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-3xl mx-auto leading-[1.6]">
                        Engineered from a proprietary soy-based solvent blend, MeltDown MR-1 delivers deep penetration on hardened asphalt while leaving a protective release film that prevents future adhesion.
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#1C1C1E] border border-white/5 rounded-[8px] p-8 group hover:border-safety-amber transition-colors duration-300 relative overflow-hidden"
                        >
                            {/* Faded background number */}
                            <div className="absolute top-4 right-6 font-bebas text-[80px] leading-none text-safety-amber/5 group-hover:text-safety-amber/10 transition-colors pointer-events-none select-none">
                                0{idx + 1}
                            </div>

                            <h3 className="font-barlow text-[20px] font-bold text-white tracking-[0.5px] uppercase mb-3 relative z-10">
                                {item.title}
                            </h3>
                            <p className="text-[14.5px] text-concrete/60 leading-[1.65] relative z-10 group-hover:text-concrete/80 transition-colors">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
