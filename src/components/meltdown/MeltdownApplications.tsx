export function MeltdownApplications() {
    const apps = [
        {
            icon: "⚙",
            title: "Asphalt Paving Equipment",
            desc: "Clean asphalt pavers, screeds, conveyors, and augers. Apply as release agent before paving to prevent buildup and reduce end-of-day cleanup time."
        },
        {
            icon: "🚛",
            title: "Dump Trucks & Trailer Beds",
            desc: "Spray beds before loading hot mix to prevent asphalt adhesion. Clean hardened asphalt and tar residue from beds, tailgates, and sidewalls after hauling."
        },
        {
            icon: "🏗",
            title: "Asphalt Plants & Terminals",
            desc: "Flush lines, clean nozzles, maintain storage tanks, and remove asphalt buildup from plant equipment. Keep your operation running without costly shutdowns."
        },
        {
            icon: "★",
            title: "Municipalities & DOT Operations",
            desc: "Ideal for city and county road maintenance crews doing patching, pothole repair, and seal coating. Soy-based formula meets environmental standards for government use."
        },
        {
            icon: "🔧",
            title: "Hand Tools & Small Equipment",
            desc: "Shovels, rakes, lutes, trowels, rollers, and tampers. Quick spray-on application cleans tools in minutes and leaves a release coating for the next job."
        },
        {
            icon: "🚲",
            title: "Rollers & Compactors",
            desc: "Prevent hot mix from sticking to steel drum rollers and rubber-tired compactors. Apply MeltDown MR-1 as a release agent to drums and tires before rolling."
        }
    ];

    return (
        <section id="applications" className="bg-[#000000] py-24 select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#111111] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                        INDUSTRIES & APPLICATIONS
                    </span>
                    <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                        BUILT FOR THE CREWS WHO DO THE WORK
                    </h2>
                    <p className="text-[16px] text-concrete/70 max-w-3xl mx-auto leading-[1.6]">
                        From county road departments to large-scale paving contractors, MeltDown MR-1 handles every asphalt cleaning and release application your operation demands.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {apps.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-5 group">
                            {/* Icon Box */}
                            <div className="shrink-0 w-[54px] h-[54px] flex items-center justify-center bg-safety-amber/10 border border-safety-amber/30 rounded-[8px] text-safety-amber text-[24px] shadow-[0_0_15px_rgba(255,149,0,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,149,0,0.3)] transition-all">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-barlow text-[20px] font-bold text-white tracking-[0.5px] mb-2 uppercase group-hover:text-safety-amber transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[14.5px] text-concrete/60 leading-[1.65]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
