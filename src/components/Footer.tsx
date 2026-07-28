import Link from "next/link";

const productLinks = [
    ["Road building products", "/chemicals/road-building-products"],
    ["Permabase", "/chemicals/permabase"],
    ["Permabase Black", "/chemicals/permabase-black"],
    ["MeltDown MR-1", "/chemicals/meltdown"],
];

const serviceLinks = [
    ["Asphalt paving", "/construction/asphalt-paving"],
    ["Concrete", "/construction/concrete"],
    ["Sealcoating", "/construction/sealcoat"],
    ["Striping", "/construction/striping"],
    ["Land clearing", "/construction/land-clearing"],
    ["Hydroseeding", "/construction/hydro-seeding"],
];

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-asphalt px-6 pb-10 pt-20 text-concrete md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b border-white/15 pb-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.75fr]">
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <span className="h-3 w-3 bg-safety-amber" />
                            <span className="font-heading text-xl font-bold tracking-[0.12em]">CROWNWOOD</span>
                        </Link>
                        <p className="mt-6 max-w-sm font-sans text-sm leading-6 text-concrete/55">
                            Road and soil products, asphalt-maintenance materials, and construction services for commercial and municipal work in Texas.
                        </p>
                        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-concrete/40">San Antonio, Texas</p>
                    </div>

                    <div>
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-safety-amber">Products</h2>
                        <ul className="mt-5 space-y-3">
                            {productLinks.map(([name, href]) => <li key={href}><Link href={href} className="font-sans text-sm text-concrete/60 hover:text-white">{name}</Link></li>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-safety-amber">Services</h2>
                        <ul className="mt-5 space-y-3">
                            {serviceLinks.map(([name, href]) => <li key={href}><Link href={href} className="font-sans text-sm text-concrete/60 hover:text-white">{name}</Link></li>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-safety-amber">Contact</h2>
                        <p className="mt-5 font-sans text-sm leading-6 text-concrete/60">Commercial and municipal accounts</p>
                        <a href="mailto:nate@crownwoodchemicals.com" className="mt-4 block break-all font-sans text-sm text-concrete hover:text-safety-amber">nate@crownwoodchemicals.com</a>
                        <Link href="/contact" className="mt-6 inline-block border border-white/25 px-5 py-3 font-heading text-xs font-bold text-concrete hover:border-white">Contact Crownwood</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-8 font-mono text-[10px] uppercase tracking-wider text-concrete/35 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} Crownwood Chemicals</p>
                    <div className="flex gap-6">
                        <Link href="/knowledge-hub" className="hover:text-concrete">Knowledge hub</Link>
                        <Link href="/contact" className="hover:text-concrete">Request information</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
