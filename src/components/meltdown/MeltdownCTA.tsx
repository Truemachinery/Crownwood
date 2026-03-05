export function MeltdownCTA() {
    return (
        <section id="contact" className="bg-[#111111] py-32 border-t border-b border-white/10 relative overflow-hidden select-none">
            {/* Diagonal overlay gradients */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                    linear-gradient(135deg, rgba(46,93,58,0.15) 0%, transparent 60%),
                    linear-gradient(315deg, rgba(255,149,0,0.08) 0%, transparent 60%)
                `
            }} />

            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">

                {/* Section Header */}
                <span className="inline-block bg-[#111111]/50 backdrop-blur-md border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-6">
                    READY TO SWITCH?
                </span>

                <h2 className="font-bebas text-[64px] md:text-[80px] text-white tracking-[1px] leading-[0.9] mb-6 drop-shadow-lg">
                    GET YOUR <span className="text-safety-amber drop-shadow-[0_0_15px_rgba(255,149,0,0.3)]">MELTDOWN MR-1</span> QUOTE
                </h2>

                <p className="text-[18px] text-concrete/80 max-w-[650px] leading-[1.6] mb-12">
                    Whether you need a single drum or recurring tote deliveries, we'll build a quote that fits your operation. Net 30 terms available for municipalities and qualified commercial accounts.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-[20px]">
                    <a
                        href="mailto:Nate@crownwoodchemicals.com?subject=MeltDown MR-1 Quote Request"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-safety-amber text-asphalt px-10 py-5 rounded-full font-heading font-bold text-[16px] uppercase tracking-widest hover:bg-high-vis-yellow transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,149,0,0.2)]"
                    >
                        Email For A Quote
                    </a>

                    <a
                        href="tel:2107925236"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-white/20 text-concrete px-10 py-5 rounded-full font-heading font-bold text-[16px] uppercase tracking-widest hover:border-safety-amber hover:text-safety-amber transition-all"
                    >
                        Call 210-792-5236
                    </a>
                </div>

                {/* Direct Contact Info */}
                <div className="text-[14px] font-medium text-concrete/50 font-mono tracking-wide mt-4">
                    Nathaniel Jose —{' '}
                    <a href="mailto:Nate@crownwoodchemicals.com" className="text-safety-amber hover:text-white transition-colors">
                        Nate@crownwoodchemicals.com
                    </a>{' '}
                    — San Antonio, TX
                </div>

            </div>
        </section>
    );
}
