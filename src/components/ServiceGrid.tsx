import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    ["Asphalt paving", "New pavement, overlays, tear-outs, mill-and-overlay work, parking lots, roadways, and repair.", "/construction/asphalt-paving"],
    ["Concrete", "Commercial flatwork, curbs, pads, ramps, loading areas, demolition, and replacement.", "/construction/concrete"],
    ["Sealcoating", "Surface preparation and sealcoating for parking lots, private roads, and paved commercial sites.", "/construction/sealcoat"],
    ["Striping", "Parking layouts, restriping, accessible stalls, fire lanes, markings, and traffic-flow updates.", "/construction/striping"],
    ["Land clearing", "Brush and tree removal, site cleanup, grading, access preparation, and construction-ready lots.", "/construction/land-clearing"],
    ["Hydroseeding", "Seed, mulch, and erosion-control applications for disturbed soil, slopes, rights-of-way, and large sites.", "/construction/hydro-seeding"],
];

export function ServiceGrid() {
    return (
        <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Construction services</p>
                        <h2 className="mt-4 max-w-lg font-heading text-4xl font-bold tracking-tight text-industrial md:text-5xl">
                            Field crews for the work around the product.
                        </h2>
                        <p className="mt-6 max-w-md font-sans leading-7 text-industrial/65">
                            Crownwood handles commercial and municipal scopes in San Antonio and surrounding areas. Start with the service page, then send the site, quantity, timing, and access details.
                        </p>
                    </div>

                    <div className="border-t-2 border-industrial">
                        {services.map(([title, description, href], index) => (
                            <Link key={href} href={href} className="group grid gap-4 border-b border-black/15 py-7 md:grid-cols-[3rem_0.65fr_1fr_1.5rem] md:items-start">
                                <span className="font-mono text-xs text-industrial/35">0{index + 1}</span>
                                <h3 className="font-heading text-lg font-bold text-industrial group-hover:text-safety-amber">{title}</h3>
                                <p className="font-sans text-sm leading-6 text-industrial/60">{description}</p>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
