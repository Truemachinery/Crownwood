import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { roadProducts } from "@/lib/roadProducts";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "PCT Fastphalt Road Building Products | Crownwood Chemicals",
    description: "Compare PCT Fastphalt products for road dust control, pothole and shoulder repair, pavement preservation, asphalt release, and equipment cleaning.",
    keywords: ["PCT Fastphalt", "road building chemicals", "road dust control", "pothole patch binder", "asphalt release agent", "pavement preservation"],
    alternates: { canonical: "/chemicals/road-building-products" },
};

const jobPaths = [
    {
        need: "Control dust on gravel or dirt",
        recommendation: "Dust Defeater",
        href: "/chemicals/dust-defeater",
        reason: "Cold-pour concentrate applied with a water or distributor truck.",
    },
    {
        need: "Repair potholes or road shoulders",
        recommendation: "FP PrimePatch or BAM",
        href: "/chemicals/bam",
        reason: "Choose a tack membrane for patch mixes or a binder for injection and stockpile repair.",
    },
    {
        need: "Preserve an asphalt surface",
        recommendation: "FP Blacktrac, Eco Black, or Rumbleguard",
        href: "/chemicals/fp-blacktrac",
        reason: "Match the product to hot mix, chip seal, low-speed pavement, or milled rumble strips.",
    },
    {
        need: "Keep asphalt equipment clean",
        recommendation: "Banana Slide or Monkey Business",
        href: "/chemicals/banana-slide",
        reason: "Use a release treatment before asphalt contact or a D-limonene cleaner after buildup.",
    },
];

export default function RoadBuildingProductsPage() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "PCT Fastphalt Road Building Products",
        numberOfItems: roadProducts.length,
        itemListElement: roadProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://crownwoodchemicals.com/chemicals/${product.slug}`,
            name: product.displayName,
        })),
    };

    return (
        <main className="min-h-screen bg-concrete text-industrial">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <Navbar />

            <section className="relative overflow-hidden border-b border-black/10 bg-asphalt px-6 pb-24 pt-40 text-concrete md:px-12 lg:px-24">
                <div className="relative mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">Crownwood + PCT Fastphalt</p>
                    <h1 className="mt-6 max-w-5xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                        Road products, organized by the work they do.
                    </h1>
                    <p className="mt-8 max-w-3xl font-sans text-lg leading-8 text-concrete/75 md:text-xl">
                        Eight PCT products cover dust control, patching, preservation, asphalt release, and equipment cleaning. We reviewed every available manufacturer sheet and separated published specifications from details that still need field confirmation.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 font-mono text-xs uppercase tracking-wider text-concrete/60">
                        <span>8 manufacturer products</span>
                        <span>5 road-maintenance needs</span>
                        <span>Technical sheets linked on every page</span>
                    </div>
                </div>
            </section>

            <section className="px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Start with the job</p>
                            <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">What are you trying to fix?</h2>
                            <p className="mt-6 max-w-md font-sans leading-7 text-industrial/65">
                                Product names are not always self-explanatory. This short selector gets you to the right part of the line before you compare specifications.
                            </p>
                        </div>

                        <div className="border-t border-black/15">
                            {jobPaths.map((path, index) => (
                                <Link key={path.need} href={path.href} className="group grid gap-3 border-b border-black/15 py-7 transition-colors hover:bg-white md:grid-cols-[2rem_1fr_1fr] md:px-5">
                                    <span className="font-mono text-xs text-industrial/35">0{index + 1}</span>
                                    <div>
                                        <p className="font-heading text-lg font-bold text-industrial">{path.need}</p>
                                        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-safety-amber">{path.recommendation}</p>
                                    </div>
                                    <div className="flex items-start justify-between gap-5">
                                        <p className="font-sans text-sm leading-6 text-industrial/60">{path.reason}</p>
                                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-black/10 bg-white px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 max-w-3xl">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Complete PCT road line</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Compare all eight products</h2>
                    </div>

                    <div className="border-t-2 border-industrial">
                        {roadProducts.map((product, index) => (
                            <article key={product.slug} className="grid gap-6 border-b border-black/15 py-9 md:grid-cols-[3rem_0.8fr_1.4fr_0.7fr] md:items-start">
                                <span className="font-mono text-xs text-industrial/35">{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-safety-amber">{product.category}</p>
                                    <h3 className="mt-2 font-heading text-2xl font-bold text-industrial">{product.name}</h3>
                                    {product.formerName && <p className="mt-1 font-sans text-xs text-industrial/45">Formerly {product.formerName}</p>}
                                </div>
                                <p className="max-w-2xl font-sans leading-7 text-industrial/65">{product.summary}</p>
                                <Link href={`/chemicals/${product.slug}`} className="inline-flex items-center gap-2 font-heading text-sm font-bold text-industrial hover:text-safety-amber">
                                    Product details <ArrowRight className="h-4 w-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-concrete px-6 py-20 md:px-12 lg:px-24">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 border-l-4 border-safety-amber bg-white p-8 md:flex-row md:items-center md:justify-between md:p-12">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-safety-amber" />
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/50">A note on the source material</p>
                        </div>
                        <h2 className="mt-5 font-heading text-3xl font-bold">Useful pages without invented specifications.</h2>
                        <p className="mt-4 font-sans leading-7 text-industrial/65">
                            PCT publishes one-page product sheets rather than full technical manuals. These pages explain the published claims in plain language and clearly flag missing rates, cure times, packaging, compatibility, or certification details that should be confirmed before purchase.
                        </p>
                    </div>
                    <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-3 bg-industrial px-7 py-4 font-heading text-sm font-bold text-white hover:bg-safety-amber hover:text-asphalt">
                        Discuss a project <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
