import Link from "next/link";
import { ArrowRight } from "lucide-react";

const productGroups = [
    {
        name: "Soil stabilization",
        description: "Products for treating soil and controlling dust before or instead of a conventional wearing surface.",
        links: [
            { name: "Permabase", note: "Clear soil stabilizer and dust-control treatment", href: "/chemicals/permabase" },
            { name: "Permabase Black", note: "Tinted soil treatment and wearing-surface option", href: "/chemicals/permabase-black" },
        ],
    },
    {
        name: "Road maintenance",
        description: "The full PCT Fastphalt line for dust, patching, preservation, release, and equipment cleaning.",
        links: [
            { name: "All PCT road products", note: "Compare eight products by job and published specification", href: "/chemicals/road-building-products" },
            { name: "FP PrimePatch", note: "Formerly PHPM-50; no-heat tack membrane for patches and overlays", href: "/chemicals/phpm-50" },
        ],
    },
    {
        name: "Asphalt equipment care",
        description: "Products used before and after paving to reduce sticking and remove cured material.",
        links: [
            { name: "MeltDown MR-1", note: "Asphalt remover and release agent", href: "/chemicals/meltdown" },
            { name: "Banana Slide + Monkey Business", note: "PCT release and D-limonene cleaning products", href: "/chemicals/banana-slide" },
        ],
    },
];

export function ProductCatalog() {
    return (
        <section className="bg-white px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Products</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-industrial md:text-5xl">Choose by the work, not the label.</h2>
                    </div>
                    <p className="max-w-2xl font-sans text-lg leading-8 text-industrial/65">
                        Start with the road, soil, or equipment problem. Each product page shows the published use, practical applications, source material, and questions that still need a project-specific answer.
                    </p>
                </div>

                <div className="grid border-y-2 border-industrial lg:grid-cols-3">
                    {productGroups.map((group) => (
                        <section key={group.name} className="border-b border-black/15 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                            <h3 className="font-heading text-2xl font-bold text-industrial">{group.name}</h3>
                            <p className="mt-4 min-h-20 font-sans text-sm leading-6 text-industrial/60">{group.description}</p>
                            <div className="mt-7 border-t border-black/15">
                                {group.links.map((product) => (
                                    <Link key={product.href} href={product.href} className="group block border-b border-black/15 py-5">
                                        <span className="flex items-center justify-between gap-3 font-heading text-sm font-bold text-industrial group-hover:text-safety-amber">
                                            {product.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                        <span className="mt-2 block font-sans text-xs leading-5 text-industrial/50">{product.note}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
