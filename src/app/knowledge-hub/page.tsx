import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
    title: "Knowledge Hub | Crownwood Chemicals",
    description: "Technical insights, application protocols, and industry guides for chemical infrastructure and heavy construction precision.",
    keywords: ["Sealcoating Guide", "Asphalt Maintenance", "Soil Stabilization Guide", "Construction Chemicals Technical Papers", "Crownwood Chemicals Knowledge Base"],
    openGraph: {
        title: "Knowledge Hub | Crownwood Chemicals",
        description: "Technical insights, application protocols, and industry guides for chemical infrastructure and heavy construction.",
        type: "website",
    }
};

export default function KnowledgeHubPage() {
    return (
        <main className="min-h-screen bg-asphalt text-concrete pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="mb-16 border-l-4 border-safety-amber pl-6">
                    <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter mb-4">
                        Knowledge <span className="text-safety-amber">Hub</span>
                    </h1>
                    <p className="font-mono text-concrete/70 text-lg max-w-2xl">
                        Technical insights, application protocols, and industry guides for chemical infrastructure and heavy construction precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Article Card */}
                    <Link href="/knowledge-hub/ultimate-guide-to-sealcoating" className="group flex flex-col h-full bg-industrial border border-white/5 p-8 hover:border-safety-amber/50 transition-all hover:scale-[1.02] duration-300">
                        <div className="mb-6 flex justify-between items-start">
                            <span className="font-mono text-xs text-safety-amber tracking-widest uppercase">Guide</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-safety-amber group-hover:text-asphalt transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="font-heading font-bold text-2xl uppercase tracking-wider mb-4 group-hover:text-white transition-colors">
                            The Ultimate Guide to Sealcoating
                        </h2>
                        <p className="font-sans text-concrete/60 text-sm mb-8 flex-grow leading-relaxed">
                            Types, Brands, and Everything You Need to Know. A deep dive into chemistry, application mechanics, and real-world performance of outperforming sealcoats.
                        </p>
                        <div className="text-xs font-mono text-concrete/40 flex justify-between pt-6 border-t border-white/5 mt-auto">
                            <span>15 MIN READ</span>
                            <span>MAINTENANCE</span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}
