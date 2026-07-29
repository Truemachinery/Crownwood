import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    Download,
    ExternalLink,
    FileText,
    Gauge,
    Layers3,
    ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { roadProducts, type RoadProduct } from "@/lib/roadProducts";

export function RoadProductDetail({ product }: { product: RoadProduct }) {
    const relatedProducts = roadProducts
        .filter((candidate) => candidate.slug !== product.slug)
        .slice(0, 3);

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.displayName,
        description: product.summary,
        category: product.category,
        image: `https://crownwoodchemicals.com${product.image}`,
        brand: {
            "@type": "Brand",
            name: "PCT Fastphalt",
        },
        manufacturer: {
            "@type": "Organization",
            name: "PCT, Inc.",
            url: "https://www.procoat.tech/asphalt-road-building-products",
        },
        offers: {
            "@type": "Offer",
            url: `https://crownwoodchemicals.com/chemicals/${product.slug}`,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Crownwood Chemicals",
            },
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://crownwoodchemicals.com" },
            { "@type": "ListItem", position: 2, name: "Road Building Products", item: "https://crownwoodchemicals.com/chemicals/road-building-products" },
            { "@type": "ListItem", position: 3, name: product.name, item: `https://crownwoodchemicals.com/chemicals/${product.slug}` },
        ],
    };

    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <Navbar />

            <section className="relative min-h-[92dvh] overflow-hidden bg-asphalt px-6 pb-20 pt-40 md:px-12 lg:px-24">
                <Image src={product.image} alt={product.imageAlt} fill priority sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/30" />

                <p className="absolute right-8 top-28 z-10 hidden max-w-xs border-l border-white/30 pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-concrete/60 md:block">
                    {product.imageCaption}
                </p>

                <div className="relative z-10 mx-auto flex min-h-[65dvh] max-w-7xl flex-col justify-between gap-16">
                    <div>
                        <Link
                            href="/chemicals/road-building-products"
                            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-concrete/55 transition-colors hover:text-high-vis-yellow"
                        >
                            <span aria-hidden="true">&larr;</span> All road products
                        </Link>

                        <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-l-2 border-safety-amber pl-4">
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-safety-amber">
                                PCT / Fastphalt
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete/60">
                                {product.category}
                            </span>
                            {product.formerName && (
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-concrete/60">
                                    Formerly {product.formerName}
                                </span>
                            )}
                        </div>

                        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-safety-amber">
                            {product.eyebrow}
                        </p>
                        <h1 className="max-w-5xl text-balance font-heading text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em] text-concrete md:text-7xl lg:text-[6.5rem]">
                            {product.name}
                        </h1>
                        <p className="mt-7 max-w-3xl text-balance font-sans text-xl leading-relaxed text-concrete/75 md:text-2xl">
                            {product.tagline}
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#quote"
                                className="group inline-flex items-center justify-center gap-3 bg-safety-amber px-8 py-4 font-heading text-sm font-bold text-asphalt transition-colors hover:bg-white"
                            >
                                Request pricing
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href={product.manufacturerPdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 border border-white/25 bg-black/20 px-8 py-4 font-heading text-sm font-bold text-concrete transition-colors hover:border-white"
                            >
                                Manufacturer sheet
                                <Download className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 border-y border-white/10 bg-black/20 backdrop-blur-sm md:grid-cols-4">
                        {product.specifications.map((spec) => (
                            <div key={spec.label} className="border-white/10 p-5 even:border-l md:border-l md:first:border-l-0">
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/40">{spec.label}</p>
                                <p className="mt-2 font-heading text-sm font-bold uppercase text-concrete md:text-base">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                    <div>
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-industrial/45">Product overview</p>
                        <h2 className="max-w-4xl font-heading text-4xl font-bold uppercase tracking-tight text-industrial md:text-6xl">
                            What {product.name} is built to do
                        </h2>
                        <p className="mt-8 max-w-3xl font-sans text-lg leading-8 text-industrial/70 md:text-xl">
                            {product.description}
                        </p>
                    </div>

                    <aside className="border border-black/15 bg-white p-8 md:p-10">
                        <div className="mb-7 flex items-center gap-3">
                            <Gauge className="h-6 w-6 text-safety-amber" />
                            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-industrial">Best-fit applications</h3>
                        </div>
                        <ul className="space-y-4">
                            {product.applications.map((application) => (
                                <li key={application} className="flex gap-3 font-sans leading-relaxed text-industrial/70">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                    {application}
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>

            <section className="border-y border-white/5 bg-industrial px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-safety-amber">Product benefits</p>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete md:text-5xl">Why crews specify it</h2>
                        </div>
                        <p className="max-w-xl font-sans text-sm leading-6 text-concrete/50">
                            Performance depends on pavement condition, preparation, equipment, weather, traffic, and application.
                        </p>
                    </div>

                    <div className="grid border-y border-white/20 md:grid-cols-2">
                        {product.benefits.map((benefit, index) => (
                            <article key={benefit.title} className="border-b border-white/15 p-8 md:border-r md:odd:border-r">
                                <div className="mb-5 flex items-center justify-between">
                                    <ShieldCheck className="h-6 w-6 text-safety-amber" />
                                    <span className="font-mono text-xs text-concrete/30">0{index + 1}</span>
                                </div>
                                <h3 className="font-heading text-2xl font-bold uppercase text-concrete">{benefit.title}</h3>
                                <p className="mt-4 font-sans leading-7 text-concrete/60">{benefit.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-industrial/45">Field planning</p>
                            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-industrial md:text-5xl">From product fit to deployment</h2>
                        </div>
                        <p className="font-sans text-lg leading-8 text-industrial/65">
                            Product fit is only the first decision. The field plan still needs project-specific rates, equipment checks, safety documents, and acceptance criteria.
                        </p>
                    </div>

                    <div className="grid border-y-2 border-industrial lg:grid-cols-4">
                        {product.steps.map((step, index) => (
                            <article key={step.title} className="relative border-b border-black/15 bg-white p-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
                                <span className="font-mono text-sm text-safety-amber">0{index + 1}</span>
                                <h3 className="mt-4 font-heading text-xl font-bold uppercase text-industrial">{step.title}</h3>
                                <p className="mt-4 font-sans text-sm leading-6 text-industrial/65">{step.description}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-5 border-l-4 border-safety-amber bg-white p-8 md:flex-row md:items-start">
                        <ClipboardCheck className="h-7 w-7 shrink-0 text-industrial" />
                        <div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-industrial">Project details to confirm</h3>
                            <p className="mt-2 max-w-5xl font-sans text-sm leading-6 text-industrial/70">{product.fieldNote}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-asphalt px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.8fr]">
                    <div>
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-safety-amber">Product questions</p>
                        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete md:text-5xl">Answers for product planning</h2>
                        <div className="mt-10 space-y-4">
                            {product.faqs.map((faq, index) => (
                                <details key={faq.question} className="group border-b border-white/15 px-1 py-6">
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-heading text-lg font-bold text-concrete marker:hidden">
                                        <span><span className="mr-3 font-mono text-xs text-high-vis-yellow">0{index + 1}</span>{faq.question}</span>
                                        <span className="font-mono text-high-vis-yellow transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="mt-5 border-t border-white/10 pt-5 font-sans leading-7 text-concrete/60">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <aside className="h-fit border-l-2 border-safety-amber bg-white/[0.04] p-8 md:p-10">
                        <FileText className="h-9 w-9 text-high-vis-yellow" />
                        <h3 className="mt-6 font-heading text-3xl font-bold uppercase text-concrete">Get the current documents</h3>
                        <p className="mt-5 font-sans leading-7 text-concrete/60">
                            Before ordering, confirm the latest technical data sheet, SDS, application rate, package size, equipment requirements, and any agency or project specification.
                        </p>
                        <a
                            href={product.manufacturerPdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-wider text-high-vis-yellow hover:text-white"
                        >
                            Open the PCT product sheet <ExternalLink className="h-4 w-4" />
                        </a>
                    </aside>
                </div>
            </section>

            <section className="border-t border-black/10 bg-concrete px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex items-end justify-between gap-6">
                        <div>
                            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-industrial/45">Build the system</p>
                            <h2 className="font-heading text-3xl font-bold uppercase text-industrial md:text-4xl">Related road products</h2>
                        </div>
                        <Link href="/chemicals/road-building-products" className="hidden items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-industrial md:flex">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid border-y border-black/15 md:grid-cols-3">
                        {relatedProducts.map((related) => (
                            <Link key={related.slug} href={`/chemicals/${related.slug}`} className="group border-b border-black/15 bg-white p-7 transition-colors hover:bg-safety-amber/5 md:border-b-0 md:border-r md:last:border-r-0">
                                <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-asphalt">
                                    <Image src={related.image} alt={related.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <Layers3 className="h-6 w-6 text-safety-amber" />
                                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-industrial/40">{related.category}</p>
                                <h3 className="mt-2 font-heading text-xl font-bold uppercase text-industrial">{related.name}</h3>
                                <p className="mt-3 font-sans text-sm leading-6 text-industrial/60">{related.summary}</p>
                                <span className="mt-6 inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-industrial">
                                    View product <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="quote" className="relative overflow-hidden bg-industrial px-6 py-24 md:px-12 lg:px-24">
                <div className="relative z-10 mx-auto max-w-3xl">
                    <div className="mb-12 text-center">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-safety-amber">Pricing and technical support</p>
                        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete md:text-5xl">
                            Ask about <span className="text-high-vis-yellow">{product.name}</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl font-sans leading-7 text-concrete/60">
                            Share the road, surface, equipment, project size, and timeline. Crownwood will help confirm product fit and current technical documentation.
                        </p>
                    </div>
                    <ContactForm service={product.displayName} servicePath={`/chemicals/${product.slug}`} darkMode />
                </div>
            </section>

            <Footer />
        </main>
    );
}
