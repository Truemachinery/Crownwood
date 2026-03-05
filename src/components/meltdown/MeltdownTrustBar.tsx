export function MeltdownTrustBar() {
    const items = [
        { icon: "⚡", label: "Dual-Action Formula" },
        { icon: "☘", label: "Soy-Based & Biodegradable" },
        { icon: "⚙", label: "DOT Ready" },
        { icon: "★", label: "Non-Corrosive" },
        { icon: "⚚", label: "High Flash Point" },
    ];

    return (
        <section className="bg-[#111111] py-[28px] px-6 border-t border-b border-white/10 relative z-20 overflow-hidden">
            {/* Very subtle scrolling background container to match branding if desired, else solid */}
            <div className="max-w-7xl mx-auto flex flex-row flex-wrap items-center justify-center lg:justify-between gap-6 md:gap-8">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                        {/* Icon Box */}
                        <div className="w-[36px] h-[36px] flex items-center justify-center bg-safety-amber/10 border border-safety-amber/20 rounded-[4px] text-safety-amber text-[16px] group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        {/* Label */}
                        <span className="text-[13px] font-semibold tracking-[0.5px] text-concrete/90 group-hover:text-concrete uppercase">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
