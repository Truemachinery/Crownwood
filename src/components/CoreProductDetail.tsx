import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { coreProducts, type CoreProduct } from "@/lib/coreProducts";

export function CoreProductDetail({ product }: { product: CoreProduct }) {
    const related = coreProducts.filter((item) => item.slug !== product.slug);
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        category: product.category,
        description: product.summary,
        image: `https://crownwoodchemicals.com${product.image}`,
        brand: { "@type": "Brand", name: "Crownwood Chemicals" },
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    };

    return (
        <main className="min-h-screen bg-concrete text-industrial">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Navbar />

            <section className="relative min-h-[760px] overflow-hidden bg-asphalt pt-20 text-concrete">
                <Image src={product.image} alt={product.imageAlt} fill priority sizes="100vw" className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/20" />
                <p className="absolute right-6 top-24 z-10 hidden max-w-xs bg-black/55 px-3 py-2 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-concrete/70 md:block">{product.imageCaption}</p>
                <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
                <div className="flex flex-col justify-end px-6 py-20 md:px-12 lg:px-16">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">{product.category}</p>
                    <h1 className="mt-6 max-w-3xl font-heading text-6xl font-bold leading-[0.92] tracking-tight md:text-8xl">{product.name}</h1>
                    <p className="mt-7 max-w-2xl font-sans text-2xl leading-9 text-concrete/75">{product.title}</p>
                    <p className="mt-6 max-w-2xl font-sans leading-7 text-concrete/55">{product.summary}</p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <a href="#quote" className="inline-flex items-center justify-center gap-3 bg-safety-amber px-7 py-4 font-heading text-sm font-bold text-asphalt hover:bg-white">Ask about the product <ArrowRight className="h-4 w-4" /></a>
                        <a href="#applications" className="inline-flex items-center justify-center border border-white/25 px-7 py-4 font-heading text-sm font-bold text-concrete hover:border-white">Review applications</a>
                    </div>
                </div>
                <div className="flex flex-col justify-end border-t border-white/10 px-6 py-20 md:px-12 lg:border-l lg:border-t-0 lg:px-14">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/40">Questions before selection</p>
                    <div className="mt-5 border-t border-white/20">
                        {product.planningQuestions.slice(0, 4).map((question, index) => (
                            <div key={question} className="grid grid-cols-[2rem_1fr] border-b border-white/15 py-5">
                                <span className="font-mono text-[10px] text-concrete/30">0{index + 1}</span>
                                <span className="font-heading text-sm font-bold leading-6 text-concrete">{question}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>

            <section className="px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">What it is</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Start with the material and the job.</h2>
                    </div>
                    <p className="font-sans text-xl leading-9 text-industrial/70">{product.description}</p>
                </div>
            </section>

            <section id="applications" className="border-y border-black/10 bg-white px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Potential applications</p>
                    <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-5xl">Where the product may fit.</h2>
                    <div className="mt-12 border-t-2 border-industrial">
                        {product.applications.map((application, index) => (
                            <div key={application.name} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[3rem_0.65fr_1fr]">
                                <span className="font-mono text-xs text-industrial/35">0{index + 1}</span>
                                <h3 className="font-heading text-lg font-bold">{application.name}</h3>
                                <p className="font-sans text-sm leading-6 text-industrial/60">{application.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-asphalt px-6 py-24 text-concrete md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">Before pricing or specifying</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Questions that change the recommendation.</h2>
                        <ul className="mt-10 border-t border-white/20">
                            {product.planningQuestions.map((question) => <li key={question} className="flex gap-3 border-b border-white/15 py-5 font-sans text-sm leading-6 text-concrete/65"><Check className="mt-0.5 h-4 w-4 shrink-0 text-safety-amber" />{question}</li>)}
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">Common questions</p>
                        <div className="mt-5 border-t border-white/20">
                            {product.faqs.map((faq) => (
                                <details key={faq.question} className="group border-b border-white/15 py-5">
                                    <summary className="flex cursor-pointer list-none justify-between gap-5 font-heading text-lg font-bold marker:hidden">{faq.question}<span className="text-safety-amber transition-transform group-open:rotate-45">+</span></summary>
                                    <p className="mt-4 font-sans text-sm leading-6 text-concrete/60">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-black/10 bg-white px-6 py-16 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl border-l-4 border-safety-amber bg-concrete p-8 md:p-10">
                    <h2 className="font-heading text-2xl font-bold">Request the current technical and safety documents.</h2>
                    <p className="mt-4 max-w-4xl font-sans text-sm leading-6 text-industrial/65">Before ordering or field use, confirm the latest technical data, SDS, project specification, surface or soil information, compatible equipment, and applicable agency requirements.</p>
                </div>
            </section>

            <section className="bg-concrete px-6 py-16 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Related products</p>
                    <div className="mt-6 grid border-y border-black/15 md:grid-cols-3">
                        {related.map((item) => <Link key={item.slug} href={`/chemicals/${item.slug}`} className="group flex items-center justify-between border-b border-black/15 bg-white px-6 py-6 font-heading text-sm font-bold md:border-b-0 md:border-r md:last:border-r-0">{item.name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>)}
                        <Link href="/chemicals/road-building-products" className="group flex items-center justify-between bg-white px-6 py-6 font-heading text-sm font-bold">PCT road products<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                    </div>
                </div>
            </section>

            <section id="quote" className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Product inquiry</p>
                    <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Ask about {product.name}.</h2>
                    <p className="mt-5 font-sans leading-7 text-industrial/60">Share the application, material or surface, area, equipment, delivery location, and schedule. Attach technical or project requirements when available.</p>
                    <div className="mt-10"><ContactForm service={product.name} servicePath={`/chemicals/${product.slug}`} /></div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
