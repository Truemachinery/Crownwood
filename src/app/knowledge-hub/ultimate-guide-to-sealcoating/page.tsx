import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "The Ultimate Guide to Sealcoating | Crownwood Chemicals",
    description: "Types, Brands, and Everything You Need to Know. A deep dive into chemistry, application mechanics, and real-world performance.",
};

export default function SealcoatingGuidePage() {
    return (
        <main className="min-h-screen bg-asphalt text-concrete pt-32 pb-24 font-sans selection:bg-safety-amber selection:text-asphalt">
            <article className="max-w-4xl mx-auto px-6 md:px-12 relative pb-20">

                {/* Header Section */}
                <header className="mb-16 border-b border-white/10 pb-12">
                    <div className="flex items-center gap-3 font-mono text-xs text-safety-amber tracking-widest uppercase mb-6">
                        <Link href="/knowledge-hub" className="hover:text-high-vis-yellow transition-colors flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Knowledge Hub
                        </Link>
                        <span>/</span>
                        <span>Maintenance Guide</span>
                    </div>

                    <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-6 leading-tight">
                        The Ultimate Guide to <br className="hidden md:block" /><span className="text-safety-amber">Sealcoating</span>:<br />
                        <span className="text-2xl md:text-3xl lg:text-4xl text-concrete/80 tracking-wide mt-2 block">Types, Brands, and Everything You Need to Know</span>
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm font-mono text-concrete/50 border-t border-white/5 pt-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-safety-amber"></div>
                            15 MIN READ
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full border border-concrete/50"></div>
                            TECHNICAL PROTOCOL
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <div className="prose-custom max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6 border-l-4 border-safety-amber pl-4">Introduction</h2>
                        <p className="text-concrete/80 leading-relaxed mb-6 text-lg">
                            Sealcoating is one of the most cost-effective maintenance strategies available for asphalt pavement. Whether you're a property manager overseeing a commercial parking lot, a contractor bidding on paving jobs, or a homeowner trying to squeeze more life out of your driveway, choosing the right sealcoat can mean the difference between a surface that lasts 20+ years and one that crumbles within a decade. Yet for all its importance, sealcoat selection is frequently treated as an afterthought — a commodity buy where the lowest price wins.
                        </p>
                        <p className="text-concrete/80 leading-relaxed mb-6 text-lg">
                            This guide changes that. We'll go deep into the chemistry, application mechanics, real-world performance, and brand-by-brand comparison of every major sealcoat category on the market. By the end, you'll understand not just <em className="text-white not-italic font-bold bg-white/5 px-2 py-0.5 rounded">what</em> to buy, but <em className="text-white not-italic font-bold bg-white/5 px-2 py-0.5 rounded">why</em> one product outperforms another in your specific climate, traffic conditions, and substrate type.
                        </p>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6 border-l-4 border-safety-amber pl-4">Part 1: Why Asphalt Needs Sealcoating in the First Place</h2>
                        <p className="text-concrete/80 leading-relaxed mb-6">
                            Before comparing products, it helps to understand what you're actually protecting against. Fresh asphalt is a flexible, relatively resilient material made of aggregate (sand, gravel, and crushed stone) bound together by bitumen — a petroleum-derived binder. The problem is that bitumen is inherently vulnerable to:
                        </p>
                        <ul className="space-y-4 text-concrete/80 leading-relaxed mb-6 list-none p-0">
                            <li className="flex gap-4"><span className="text-safety-amber mt-1 shrink-0">▹</span> <div><strong className="text-white font-bold text-[1.05rem]">UV Oxidation</strong> — Sunlight degrades the molecular chains in bitumen, causing it to harden, become brittle, and eventually crack. This is the single largest cause of premature asphalt failure in sunbelt states like Texas, Arizona, and Florida.</div></li>
                            <li className="flex gap-4"><span className="text-safety-amber mt-1 shrink-0">▹</span> <div><strong className="text-white font-bold text-[1.05rem]">Water Infiltration</strong> — Once surface cracking begins, water finds its way into the subsurface layers. Freeze-thaw cycles in northern climates turn this water into ice that pries the structure apart from the inside. Even in warmer climates, standing water softens the subbase and accelerates rutting.</div></li>
                            <li className="flex gap-4"><span className="text-safety-amber mt-1 shrink-0">▹</span> <div><strong className="text-white font-bold text-[1.05rem]">Fuel and Chemical Spills</strong> — Gasoline, diesel, motor oil, and hydraulic fluid are petroleum-based solvents that dissolve bitumen on contact. High-traffic areas like gas stations, bus depots, and industrial facilities are especially vulnerable.</div></li>
                            <li className="flex gap-4"><span className="text-safety-amber mt-1 shrink-0">▹</span> <div><strong className="text-white font-bold text-[1.05rem]">Oxidation Fading</strong> — Beyond structural degradation, oxidized asphalt turns gray, loses its fresh black appearance, and signals neglect to customers, tenants, and visitors.</div></li>
                        </ul>
                        <p className="text-concrete/80 leading-relaxed mb-6">
                            Sealcoating addresses all four threats simultaneously by applying a protective layer over the existing asphalt. Done on a proper maintenance schedule (typically every 2–4 years), it can double or triple the life of a pavement investment.
                        </p>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-8 border-l-4 border-safety-amber pl-4">Part 2: The Four Main Types of Sealcoat</h2>

                        {/* Type 1 */}
                        <div className="mb-10 bg-industrial/50 p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-safety-amber/5 rounded-full blur-3xl group-hover:bg-safety-amber/10 transition-all pointer-events-none"></div>
                            <h3 className="text-2xl font-bold text-safety-amber mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded bg-safety-amber/10 flex items-center justify-center text-sm">1</span>
                                Coal Tar Emulsion
                            </h3>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">What it is:</strong> Coal tar is a thick, dark liquid produced as a byproduct of coke production in the steel industry. When emulsified with water, clay fillers, and sand, it creates one of the most durable and chemically resistant sealcoats available.
                            </p>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">How it works:</strong> Coal tar forms an extremely hard, dense film over asphalt that is virtually impervious to petroleum solvents. Its polycyclic aromatic hydrocarbon (PAH) structure makes it resistant to fuel spills in a way that no other sealcoat type can fully replicate.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-6">
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-high-vis-yellow mb-4 border-l-2 border-high-vis-yellow pl-2">Strengths</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Best-in-class resistance to gasoline, diesel, and motor oil</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Excellent durability — 3 to 5 year service life in commercial applications</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Deep, rich black appearance that holds color well</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Low cost per square foot, especially in bulk</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Long track record — used in the US since the 1950s</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-red-400 mb-4 border-l-2 border-red-400 pl-2">Weaknesses</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Contains PAHs, classified as probable human carcinogens by the EPA</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Banned in over 30 municipalities across the US</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Runoff concerns — linked to elevated PAH levels in waterways</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Not suitable for cold-weather application</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Strong odor during application</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Brittle in extreme cold</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 bg-asphalt/50 p-4 rounded-lg border border-white/5">
                                <p className="text-sm text-concrete/80 flex gap-2"><strong className="text-white whitespace-nowrap">IDEAL USE CASES:</strong> <span className="leading-relaxed">Industrial facilities, airports, bus terminals, and commercial properties in jurisdictions where it remains legal and fuel resistance is the primary concern.</span></p>
                                <p className="text-sm text-concrete/80 mt-3 flex gap-2"><strong className="text-white whitespace-nowrap">COMMON BRANDS:</strong> <span className="leading-relaxed">GemSeal Coal Tar, Neyra Industries (STYRACO, KOAL-TAR), SealMaster, Brewer Company, Star Seal.</span></p>
                            </div>
                        </div>

                        {/* Type 2 */}
                        <div className="mb-10 bg-industrial/50 p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                            <h3 className="text-2xl font-bold text-safety-amber mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded bg-safety-amber/10 flex items-center justify-center text-sm">2</span>
                                Asphalt Emulsion <span className="text-concrete/50 font-mono text-sm block md:inline mt-1 md:mt-0">(Petroleum-Based)</span>
                            </h3>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">What it is:</strong> Asphalt emulsion sealcoat is made from the same bitumen that makes up the asphalt pavement itself — just liquefied, emulsified with water and additives, and reformulated for surface application. This category is often called "asphalt-based" or "petroleum resin" sealcoat.
                            </p>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">How it works:</strong> The emulsion re-introduces fresh bituminous material to the oxidized surface layer, essentially replenishing what UV degradation has burned away. The film it forms is more flexible than coal tar but less chemically resistant.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-6">
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-high-vis-yellow mb-4 border-l-2 border-high-vis-yellow pl-2">Strengths</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Environmentally friendlier than coal tar — legal everywhere</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Better cold-weather flexibility</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Bonds extremely well to the existing asphalt substrate</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> No toxic runoff concerns; easier disposal</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Good adhesion on freshly placed/milled asphalt</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-red-400 mb-4 border-l-2 border-red-400 pl-2">Weaknesses</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Poor resistance to petroleum spills</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Shorter service life than coal tar (2 to 3 years)</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Higher product cost per gallon than coal tar</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Less consistent deep-black finish</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> More susceptible to tracking in hot weather</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 bg-asphalt/50 p-4 rounded-lg border border-white/5">
                                <p className="text-sm text-concrete/80 flex gap-2"><strong className="text-white whitespace-nowrap">IDEAL USE CASES:</strong> <span className="leading-relaxed">Residential driveways, ban-state municipalities, areas adjacent to water, and northern climates with severe freeze-thaw cycles.</span></p>
                                <p className="text-sm text-concrete/80 mt-3 flex gap-2"><strong className="text-white whitespace-nowrap">COMMON BRANDS:</strong> <span className="leading-relaxed">GemSeal (AE-series), EZ Street / EZ Seal, Latexite, Quikrete, Fabriko, Henry Company.</span></p>
                            </div>
                        </div>

                        {/* Type 3 */}
                        <div className="mb-10 bg-industrial/50 p-6 md:p-8 rounded-2xl border border-white/5 border-l-4 border-l-blue-400 transition-colors">
                            <h3 className="text-2xl font-bold text-concrete mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded bg-blue-400/10 text-blue-400 flex items-center justify-center text-sm">3</span>
                                Refined Tar (RT) Sealcoat — The Hybrid Category
                            </h3>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                This is a category that causes significant confusion. Some manufacturers market their product as "tar-based" but use refined tar rather than raw coal tar. Others blend coal tar with asphalt emulsion to create hybrid formulations that try to balance the fuel resistance of coal tar with the environmental profile of asphalt emulsion.
                            </p>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                True refined tar products contain lower PAH concentrations and may be legal in some jurisdictions where pure coal tar is banned. However, regulations vary by municipality.
                            </p>
                            <div className="mt-6 bg-asphalt/50 p-4 rounded-lg border border-white/5">
                                <p className="text-sm text-concrete/80 flex gap-2"><strong className="text-white whitespace-nowrap">COMMON BRANDS:</strong> <span className="leading-relaxed">SealBoss, Neyra DURAFLEX.</span></p>
                            </div>
                        </div>

                        {/* Type 4 */}
                        <div className="mb-10 bg-industrial/50 p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                            <h3 className="text-2xl font-bold text-safety-amber mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded bg-safety-amber/10 flex items-center justify-center text-sm">4</span>
                                Acrylic / Polymer-Modified Sealcoat
                            </h3>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">What it is:</strong> Acrylic sealcoats use water-based acrylic polymer resins as their primary binder rather than coal tar or bitumen. They were originally developed for tennis courts and specialty surfaces but evolved into commercial use.
                            </p>
                            <p className="text-concrete/80 leading-relaxed mb-4">
                                <strong className="text-white font-bold">How it works:</strong> The acrylic polymer forms a tough, UV-stable film. Unlike bitumen-based products, acrylic resins are inherently UV-resistant.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-6">
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-high-vis-yellow mb-4 border-l-2 border-high-vis-yellow pl-2">Strengths</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Excellent UV resistance</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Legal everywhere, no PAH concerns</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Available in multiple colors</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Excellent adhesion to concrete</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Very flexible</li>
                                        <li className="flex gap-2"><span className="text-high-vis-yellow">✓</span> Resistant to many chemicals</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-mono text-sm tracking-widest uppercase text-red-400 mb-4 border-l-2 border-red-400 pl-2">Weaknesses</h4>
                                    <ul className="space-y-3 text-sm text-concrete/70 list-none">
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Highest product cost (3x to 5x of coal tar)</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Not as resistant to gasoline/diesel as coal tar</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Less dramatic "jet black" appearance</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Can chip/flake if applied too thick</li>
                                        <li className="flex gap-2"><span className="text-red-400">✗</span> Requires more surface prep</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 bg-asphalt/50 p-4 rounded-lg border border-white/5">
                                <p className="text-sm text-concrete/80 flex gap-2"><strong className="text-white whitespace-nowrap">IDEAL USE CASES:</strong> <span className="leading-relaxed">Tennis/basketball courts, colored markings, airport runways edges, heavy UV exposure ban states.</span></p>
                                <p className="text-sm text-concrete/80 mt-3 flex gap-2"><strong className="text-white whitespace-nowrap">COMMON BRANDS:</strong> <span className="leading-relaxed">SealMaster Acrylic, DecoCoat, Armor-Seal, StreetBond, ColorSeal.</span></p>
                            </div>
                        </div>

                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6 border-l-4 border-safety-amber pl-4">Part 3: Polymer Modification — The Performance Multiplier</h2>
                        <p className="text-concrete/80 leading-relaxed mb-6">
                            Across all four categories above, the single most impactful upgrade you can make to any sealcoat product is polymer modification. Adding rubberized latex polymers (SBR — Styrene Butadiene Rubber — is the most common) transforms the performance envelope in meaningful ways.
                        </p>

                        <div className="bg-industrial border border-white/5 p-8 rounded-xl mb-8">
                            <h4 className="font-mono text-sm tracking-widest uppercase text-safety-amber mb-6 border-b border-white/5 pb-4">What polymer modification does:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-concrete/80">
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Increases flexibility, reducing cracking in temperature extremes</span></li>
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Improves adhesion to the existing substrate</span></li>
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Enhances abrasion resistance — suited to turning lanes</span></li>
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Extends service life by 25–50% in most applications</span></li>
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Improves resistance to freeze-thaw cycling</span></li>
                                <li className="flex gap-4"><div className="w-2 h-2 rounded-full bg-high-vis-yellow mt-1.5 shrink-0 shadow-[0_0_8px_rgba(230,255,0,0.5)]"></div><span className="leading-relaxed">Creates a more uniform, aesthetic finish</span></li>
                            </ul>
                        </div>

                        <p className="text-concrete/80 leading-relaxed mb-8">
                            Most professional-grade sealcoats sold today include some level of polymer modification. Products marketed to DIYers often contain 1–3% polymer solids, while commercial-grade formulations commonly run 5–12%.
                        </p>

                        <div className="bg-asphalt/80 border border-white/10 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm border-b border-white/10 pb-4">Key polymer-modified products worth noting:</h4>
                            <ul className="space-y-4 text-concrete/80 list-none text-sm">
                                <li className="flex flex-col md:flex-row gap-2 md:gap-4"><strong className="text-safety-amber min-w-[200px]">GemSeal CT-PLUS</strong> <span>Polymer-modified coal tar with SBR latex; high-traffic standard.</span></li>
                                <li className="flex flex-col md:flex-row gap-2 md:gap-4"><strong className="text-safety-amber min-w-[200px]">Neyra STYRACO</strong> <span>Well-known SBR-modified coal tar product, trusted consistency.</span></li>
                                <li className="flex flex-col md:flex-row gap-2 md:gap-4"><strong className="text-safety-amber min-w-[200px]">SealMaster Polymer Modified</strong> <span>Commercial-grade SBR formulation, consistent nationwide.</span></li>
                                <li className="flex flex-col md:flex-row gap-2 md:gap-4"><strong className="text-safety-amber min-w-[200px]">GemSeal AE-PLUS</strong> <span>Polymer-modified asphalt emulsion for ban-state commercial uses.</span></li>
                                <li className="flex flex-col md:flex-row gap-2 md:gap-4"><strong className="text-safety-amber min-w-[200px]">Brewer PolyTar</strong> <span>Highly regarded for clean application characteristics.</span></li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-8 border-l-4 border-safety-amber pl-4">Part 4: Brand Deep Dives</h2>

                        <div className="space-y-6">
                            <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">GemSeal Pavement Products</h3>
                                <p className="text-concrete/80 mb-4 text-sm leading-relaxed">Most established name in professional sealcoating. Offers the broadest product line (coal tar, asphalt emulsion, polymer-modified) under one roof.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t border-white/5">
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Who uses them:</strong> Large commercial contractors, national property management, municipalities.</p>
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Reputation:</strong> Consistently high quality with tight formulation control. Professional tier.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">SealMaster</h3>
                                <p className="text-concrete/80 mb-4 text-sm leading-relaxed">Operates as both manufacturer and franchise distribution system. Highly accessible nationwide with nearly 100 franchise locations.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t border-white/5">
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Who uses them:</strong> Regional paving contractors, municipalities.</p>
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Reputation:</strong> Strong and reliable. Excellent local support and quick delivery.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">Neyra Industries</h3>
                                <p className="text-concrete/80 mb-4 text-sm leading-relaxed">Cincinnati-based, technically sophisticated. Strong product engineering, documented application guides, and robust technical support.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t border-white/5">
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Who uses them:</strong> Mid-size and large contractors, particularly in the Midwest.</p>
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Reputation:</strong> Excellent among professionals; strong technical backing.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-2">Rust-Oleum <span className="text-concrete/50 font-mono text-xs ml-2">(Consumer)</span></h3>
                                    <p className="text-concrete/80 text-sm mb-4 leading-relaxed">High-volume DIY asphalt emulsion products sold at home improvement stores.</p>
                                    <p className="text-sm text-concrete/60 pt-4 border-t border-white/5"><strong className="text-concrete block mb-1">Best for:</strong> Homeowners with low traffic driveways.</p>
                                </div>
                                <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-2">Latex-ite / Driveway Armor</h3>
                                    <p className="text-concrete/80 text-sm mb-4 leading-relaxed">Consumer grade asphalt emulsion. Note: "Airport Grade" is a marketing label.</p>
                                    <p className="text-sm text-concrete/60 pt-4 border-t border-white/5"><strong className="text-concrete block mb-1">Best for:</strong> Residential driveways.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/30 p-6 rounded-xl border border-white/5 border-l-4 border-l-safety-amber hover:border-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-3">Brewer Company</h3>
                                <p className="text-concrete/80 mb-4 text-sm leading-relaxed">Focused range of professional products including PolyTar. Contractor channel exclusive. Strong reputation for formulation consistency.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t border-white/5">
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Who uses them:</strong> Professional contractors in Midwest/Southeast.</p>
                                    <p className="text-concrete/60"><strong className="text-concrete block mb-1">Reputation:</strong> Excellent, high loyalty among users.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6 border-l-4 border-safety-amber pl-4">Part 5: Application Rates, Dilution, and Coverage</h2>
                        <p className="text-concrete/80 leading-relaxed mb-8">
                            One of the most misunderstood aspects of sealcoating is the relationship between dilution, application rate, and finished film performance.
                        </p>

                        <div className="bg-industrial border border-white/10 rounded-xl overflow-hidden mb-8">
                            <div className="bg-safety-amber/10 border-b border-safety-amber/20 p-4">
                                <h4 className="font-bold text-safety-amber uppercase tracking-widest text-sm flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                    Standard Commercial Mixing Specifications
                                </h4>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4 font-mono text-sm text-concrete/90">
                                    <li className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-white/5 pb-4"><span className="text-concrete/50 min-w-[120px]">Dilution:</span> <span className="text-white bg-white/5 px-2 py-0.5 rounded">1 gallon concentrate : 0.25–0.35 gallons water (25–35%)</span></li>
                                    <li className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-white/5 pb-4"><span className="text-concrete/50 min-w-[120px]">Sand load:</span> <span className="text-white">3–5 lbs fine silica sand per gallon of diluted mix</span></li>
                                    <li className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-white/5 pb-4"><span className="text-concrete/50 min-w-[120px]">Coverage:</span> <span className="text-white">60–80 sq ft per gallon of diluted material, per coat</span></li>
                                    <li className="flex flex-col md:flex-row gap-2 md:gap-6"><span className="text-concrete/50 min-w-[120px]">Coats:</span> <span className="text-white font-bold text-safety-amber">2 coats minimum on commercial surfaces</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-start gap-4">
                            <svg className="w-6 h-6 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                            <div>
                                <strong className="text-red-400 font-bold uppercase tracking-wider text-sm block mb-2">Critical mistake to avoid: Over-diluting.</strong>
                                <p className="text-concrete/80 text-sm leading-relaxed">Cheap contractors add too much water to stretch coverage and reduce material cost. The result is a thin film with poor UV protection, short service life, and a grayish appearance. <strong className="text-white bg-red-500/20 px-1 py-0.5 rounded">Any dilution beyond 35% water by volume on a commercial product is a quality red flag.</strong></p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-8 border-l-4 border-safety-amber pl-4">Part 6: Climate and Regional Considerations</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 border border-white/5 bg-industrial rounded-xl shadow-lg">
                                <h4 className="font-bold text-safety-amber mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-safety-amber shadow-[0_0_8px_rgba(255,149,0,0.8)]"></div> Hot, Sunny (TX, FL, AZ, CA)</h4>
                                <p className="text-sm text-concrete/80 leading-relaxed">UV oxidation is the dominant threat. Coal tar's high resistance to UV degradation gives it a strong advantage. Polymer modification is recommended. Surface temperatures above 130°F can cause fresh sealcoat to bubble — early morning application is preferred.</p>
                            </div>

                            <div className="p-6 border border-white/5 bg-industrial rounded-xl shadow-lg">
                                <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div> Freeze-Thaw (MN, WI, NY, CO)</h4>
                                <p className="text-sm text-concrete/80 leading-relaxed">Flexibility is paramount. Polymer-modified asphalt emulsion often outperforms coal tar in extreme cold. In mixed climates, PM coal tar or high-SBR asphalt emulsion represents the best compromise.</p>
                            </div>

                            <div className="p-6 border border-white/5 bg-industrial rounded-xl shadow-lg">
                                <h4 className="font-bold text-green-400 mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div> Coastal / High-Humidity</h4>
                                <p className="text-sm text-concrete/80 leading-relaxed">Extended cure times are a challenge. High ambient humidity slows evaporation. In salt-spray environments, acrylic-based products show superior long-term adhesion and corrosion resistance.</p>
                            </div>

                            <div className="p-6 border border-white/5 bg-industrial rounded-xl shadow-lg">
                                <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div> High-Altitude</h4>
                                <p className="text-sm text-concrete/80 leading-relaxed">Intense UV radiation at elevation accelerates oxidation. Coal tar or acrylic products are preferable. Thin-film failures are more common due to rapid solvent evaporation.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6 border-l-4 border-safety-amber pl-4">Part 7: Environmental and Regulatory Landscape</h2>

                        <div className="bg-industrial/50 p-6 md:p-8 rounded-xl border border-white/5 space-y-6">
                            <div>
                                <strong className="text-white font-bold block mb-2 text-lg">Coal tar bans:</strong>
                                <p className="text-concrete/80 leading-relaxed text-sm">As of 2025, coal tar sealcoats are prohibited in jurisdictions including Washington state, Washington D.C., Austin TX, San Francisco Bay Area, Minneapolis/St. Paul, and others. Contractors must maintain awareness of local ordinances.</p>
                            </div>

                            <div className="border-t border-white/5 pt-6">
                                <strong className="text-white font-bold block mb-2 text-lg">EPA stance:</strong>
                                <p className="text-concrete/80 leading-relaxed text-sm">The EPA has funded research documenting PAH contamination from runoff but hasn't issued a federal ban. The scientific consensus supports the connection in waterways.</p>
                            </div>

                            <div className="border-t border-white/5 pt-6">
                                <strong className="text-white font-bold block mb-2 text-lg">Industry Response:</strong>
                                <p className="text-concrete/80 leading-relaxed text-sm">The PCTC disputes some conclusions, advocating for responsible use. However, the practical reality is: if you're in a ban jurisdiction, near water features, or dealing with environmental clients, asphalt emulsion or acrylic products are the clear choice.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-8 border-l-4 border-safety-amber pl-4">Part 8: Head-to-Head Comparison Table</h2>

                        <div className="overflow-x-auto border border-white/10 rounded-xl shadow-2xl bg-industrial/80">
                            <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
                                <caption className="sr-only">Sealcoat Categories Comparison Table</caption>
                                <thead className="bg-[#1a1a1c] text-concrete font-mono uppercase tracking-widest text-xs">
                                    <tr>
                                        <th className="px-6 py-5 font-bold border-b border-white/10">Category</th>
                                        <th className="px-6 py-5 font-bold border-b border-white/10 border-l border-white/10 w-1/4">Coal Tar</th>
                                        <th className="px-6 py-5 font-bold border-b border-white/10 border-l border-white/10 w-1/4">Asphalt Emulsion</th>
                                        <th className="px-6 py-5 font-bold border-b border-white/10 border-l border-white/10 w-1/4">Acrylic</th>
                                    </tr>
                                </thead>
                                <tbody className="text-concrete/80 divide-y divide-white/5">
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Fuel Resistance</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Excellent</td><td className="px-6 py-4 border-l border-white/5 text-red-400 bg-red-400/5">Poor</td><td className="px-6 py-4 border-l border-white/5 text-yellow-500 bg-yellow-500/5">Moderate</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">UV Resistance</td><td className="px-6 py-4 border-l border-white/5 text-green-400">Very Good</td><td className="px-6 py-4 border-l border-white/5 text-yellow-500">Moderate</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Excellent</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Flexibility / Cold</td><td className="px-6 py-4 border-l border-white/5 text-yellow-500">Fair</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Good</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Excellent</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Appearance</td><td className="px-6 py-4 border-l border-white/5 font-bold">Deep Black</td><td className="px-6 py-4 border-l border-white/5">Medium Black</td><td className="px-6 py-4 border-l border-white/5">Varies</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Service Life</td><td className="px-6 py-4 border-l border-white/5 font-bold">3–5 Years</td><td className="px-6 py-4 border-l border-white/5">2–3 Years</td><td className="px-6 py-4 border-l border-white/5 font-bold">3–6 Years</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Environmental Safety</td><td className="px-6 py-4 border-l border-white/5 text-red-400 bg-red-400/5">Concerns (PAH)</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Clean</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Clean</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Legal Everywhere</td><td className="px-6 py-4 border-l border-white/5 text-red-400 bg-red-400/5">No</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Yes</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Yes</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Relative Cost</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Low–Medium</td><td className="px-6 py-4 border-l border-white/5 text-yellow-500">Medium</td><td className="px-6 py-4 border-l border-white/5 text-red-400 bg-red-400/5">High</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">DIY Friendly</td><td className="px-6 py-4 border-l border-white/5 text-yellow-500 bg-yellow-500/5">Fair</td><td className="px-6 py-4 border-l border-white/5 text-green-400 font-bold bg-green-400/5">Yes</td><td className="px-6 py-4 border-l border-white/5 text-red-400 bg-red-400/5">No</td></tr>
                                    <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-bold text-white bg-white/[0.01]">Color Options</td><td className="px-6 py-4 border-l border-white/5 text-concrete/50">Black Only</td><td className="px-6 py-4 border-l border-white/5 text-concrete/50">Black Only</td><td className="px-6 py-4 border-l border-white/5 text-white font-bold bg-white/5">Many</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-8 border-l-4 border-safety-amber pl-4">Part 9: Choosing the Right Product</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-industrial/50 p-5 rounded-lg border border-white/5 flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 flex items-center justify-center text-concrete/50">1</div>
                                <div>
                                    <strong className="text-white block mb-1">Residential driveway in a non-ban state:</strong>
                                    <p className="text-sm text-concrete/70 leading-relaxed">High-quality PM asphalt emulsion (Latex-ite, Rust-Oleum) is best for environmental safety and adequate performance.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/50 p-5 rounded-lg border border-white/5 flex gap-4 items-start border-l-2 border-l-safety-amber">
                                <div className="w-8 h-8 rounded-full bg-safety-amber/10 shrink-0 flex items-center justify-center text-safety-amber font-bold">2</div>
                                <div>
                                    <strong className="text-white block mb-1">Commercial contractor in a non-ban state:</strong>
                                    <p className="text-sm text-concrete/70 leading-relaxed">Professional-grade PM coal tar is the industry standard for fuel resistance and cost economics.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/50 p-5 rounded-lg border border-white/5 flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 flex items-center justify-center text-concrete/50">3</div>
                                <div>
                                    <strong className="text-white block mb-1">Coal tar ban jurisdiction:</strong>
                                    <p className="text-sm text-concrete/70 leading-relaxed">Professional-grade PM asphalt emulsion.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/50 p-5 rounded-lg border border-white/5 flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 flex items-center justify-center text-concrete/50">4</div>
                                <div>
                                    <strong className="text-white block mb-1">Gas station / Industrial facility:</strong>
                                    <p className="text-sm text-concrete/70 leading-relaxed">Coal tar where legal. Nothing else comes close to the required fuel resistance.</p>
                                </div>
                            </div>

                            <div className="bg-industrial/50 p-5 rounded-lg border border-white/5 flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-white/5 shrink-0 flex items-center justify-center text-concrete/50">5</div>
                                <div>
                                    <strong className="text-white block mb-1">Colored surface or concrete compatibility:</strong>
                                    <p className="text-sm text-concrete/70 leading-relaxed">Acrylic sealcoat is your only option.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-2 border-l-4 border-safety-amber pl-4">Part 10: Surface Preparation</h2>
                            <p className="text-safety-amber uppercase tracking-widest text-sm font-bold pl-5">Where Projects Succeed or Fail</p>
                        </div>

                        <p className="text-concrete/80 leading-relaxed mb-8">No sealcoat product, regardless of brand or price, will perform well over a poorly prepared surface.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-white/5 p-6 bg-industrial rounded-xl relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h4 className="font-bold text-white mb-3 text-lg">Crack filling</h4>
                                <p className="text-sm text-concrete/70 leading-relaxed">Cracks &gt; 1/8 inch need dedicated hot/cold emulsion filler. Sealcoat bridges hairlines but will not fill structural cracks.</p>
                            </div>
                            <div className="border border-white/5 p-6 bg-industrial rounded-xl relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h4 className="font-bold text-white mb-3 text-lg">Oil spot treatment</h4>
                                <p className="text-sm text-concrete/70 leading-relaxed">Active petroleum stains must be primed (acrylic primer). Coal tar over heavy oil will fail to adhere and delaminate.</p>
                            </div>
                            <div className="border border-white/5 p-6 bg-industrial rounded-xl relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h4 className="font-bold text-white mb-3 text-lg">Cleaning</h4>
                                <p className="text-sm text-concrete/70 leading-relaxed">Must be free of dirt/dust/vegetation. Pressure washing and degreasing is the professional standard. Treat crack vegetation.</p>
                            </div>
                            <div className="border border-white/5 p-6 bg-industrial rounded-xl relative group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-safety-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h4 className="font-bold text-white mb-3 text-lg">Edge concerns</h4>
                                <p className="text-sm text-concrete/70 leading-relaxed">Thick edges crack/peel due to differential thermal movement. Needs careful edging over curbs, borders, & transitions.</p>
                            </div>
                            <div className="border border-red-500/20 p-6 bg-red-500/5 rounded-xl md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                                    <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-lg">Temperature and Weather</h4>
                                    <p className="text-sm text-concrete/80 leading-relaxed"><strong className="text-red-400">Minimum 50–55°F ambient and rising. No rain within 24 hours.</strong> Violations of these parameters are the single most common cause of early sealcoat failure.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-white/10 my-12" />

                    <section className="mb-12 bg-industrial/80 p-8 md:p-12 rounded-2xl border border-safety-amber/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-safety-amber to-transparent"></div>
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider text-concrete mb-6">Conclusion</h2>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-concrete/90 leading-relaxed mb-6 text-lg">
                                Sealcoating is not a commodity. The difference between a budget-grade DIY product and a professional polymer-modified formulation from a reputable manufacturer can mean an extra <strong className="text-safety-amber">2–3 years of service life</strong> — a significant return on a relatively modest investment.
                            </p>
                            <p className="text-concrete/80 leading-relaxed mb-8 text-sm">
                                The right answer depends on your jurisdiction, climate, traffic type, environmental priorities, and budget. For most commercial applications in non-ban states, PM coal tar from GemSeal, Neyra, or SealMaster is the best overall value. For residential use or ban-state commercial work, high-quality PM asphalt emulsion is the responsible choice.
                            </p>

                            <div className="bg-asphalt p-6 rounded-xl border border-white/5 max-w-2xl mx-auto">
                                <p className="font-mono text-xs tracking-widest uppercase text-safety-amber mb-3">THE THREE PRINCIPLES</p>
                                <p className="text-white font-serif italic text-lg leading-relaxed">
                                    "Buy commercial-grade, follow manufacturer mixing specifications, and prioritize surface preparation. Those three principles will determine 80% of your results regardless of which brand is on the bucket."
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </article>

            {/* Floating CTA */}
            <div className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-asphalt via-asphalt to-transparent pointer-events-none z-40 flex justify-center">
                <Link href="/#contact" className="pointer-events-auto bg-safety-amber text-asphalt font-heading font-bold px-8 py-4 rounded-full uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,149,0,0.3)] border-2 border-transparent hover:border-white">
                    Request Sealcoating Assessment
                </Link>
            </div>

        </main>
    )
}
