import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-asphalt pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/10 relative overflow-hidden">

            {/* Abstract San Antonio Map Grid Graphic */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'rotate(15deg) translate(20%, -20%)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

                    <div className="lg:col-span-2">
                        <h4 className="font-heading font-bold text-concrete tracking-widest uppercase text-2xl mb-6 flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-safety-amber" />
                            Crownwood
                        </h4>
                        <div className="flex items-center gap-3 font-mono text-xs text-concrete/60 tracking-wider">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SYSTEM OPERATIONAL
                        </div>
                        <p className="font-sans text-concrete/50 text-sm mt-6 max-w-xs">
                            Next-generation chemical infrastructure and heavy construction precision. Based in San Antonio, Texas.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-mono text-safety-amber text-sm font-bold tracking-widest uppercase mb-6">Chemicals</h5>
                        <ul className="space-y-4 font-sans text-concrete/70 text-sm">
                            <li><Link href="/chemicals/permabase" className="hover:text-high-vis-yellow transition-colors">Permabase Stabilizer</Link></li>
                            <li><Link href="/chemicals/permabase-black" className="hover:text-high-vis-yellow transition-colors">Permabase Black Sealer</Link></li>
                            <li><Link href="/chemicals/phpm-50" className="hover:text-high-vis-yellow transition-colors">PHPM-50 Tack Modifier</Link></li>
                            {/*<li><a href="#" className="hover:text-high-vis-yellow transition-colors">Haul Road Dust Control</a></li>*/}
                            {/*<li><a href="#" className="hover:text-high-vis-yellow transition-colors">Base Failures Prevention</a></li>*/}
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-mono text-safety-amber text-sm font-bold tracking-widest uppercase mb-6">Construction</h5>
                        <ul className="space-y-4 font-sans text-concrete/70 text-sm">
                            <li><Link href="/construction/asphalt-paving" className="hover:text-high-vis-yellow transition-colors">San Antonio Asphalt Paving</Link></li>
                            <li><Link href="/construction/land-clearing" className="hover:text-high-vis-yellow transition-colors">Heavy Land Clearing</Link></li>
                            <li><Link href="/construction/sealcoat" className="hover:text-high-vis-yellow transition-colors">Parking Lot Sealcoating</Link></li>
                            <li><Link href="/construction/striping" className="hover:text-high-vis-yellow transition-colors">ADA Line Striping</Link></li>
                            <li><Link href="/construction/concrete" className="hover:text-high-vis-yellow transition-colors">Structural Concrete Flatwork</Link></li>
                            <li><Link href="/construction/hydro-seeding" className="hover:text-high-vis-yellow transition-colors">Precision Hydroseeding</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-mono text-safety-amber text-sm font-bold tracking-widest uppercase mb-6">Resources</h5>
                        <ul className="space-y-4 font-sans text-concrete/70 text-sm">
                            <li><Link href="/knowledge-hub" className="hover:text-high-vis-yellow transition-colors">Knowledge Hub</Link></li>
                            <li><Link href="/knowledge-hub/ultimate-guide-to-sealcoating" className="hover:text-high-vis-yellow transition-colors">Sealcoating Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-mono text-safety-amber text-sm font-bold tracking-widest uppercase mb-6">Headquarters</h5>
                        <p className="font-sans text-concrete/70 text-sm leading-relaxed mb-6">
                            San Antonio, Texas<br />
                            Commercial & Municipal Accounts
                        </p>
                        <button className="w-full bg-industrial text-concrete py-3 rounded-lg font-heading uppercase text-sm tracking-widest hover:bg-safety-amber hover:text-asphalt transition-colors">
                            Dispatch Request
                        </button>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-concrete/40">
                    <p>© {new Date().getFullYear()} Crownwood Chemicals. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-concrete transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-concrete transition-colors">Environmental Compliance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
