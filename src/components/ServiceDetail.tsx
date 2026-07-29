import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { servicePages, type ServicePage } from "@/lib/servicePages";

export function ServiceDetail({ service }: { service: ServicePage }) {
    const related = servicePages.filter((item) => item.slug !== service.slug).slice(0, 3);
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.name,
        description: service.summary,
        image: `https://crownwoodchemicals.com${service.image}`,
        provider: {
            "@type": "LocalBusiness",
            name: "Crownwood Chemicals",
            address: { "@type": "PostalAddress", addressLocality: "San Antonio", addressRegion: "TX", addressCountry: "US" },
        },
        areaServed: { "@type": "City", name: "San Antonio" },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    return (
        <main className="min-h-screen bg-concrete text-industrial">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Navbar />

            <section className="relative min-h-[760px] overflow-hidden bg-asphalt pt-20 text-concrete">
                <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="object-cover opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/25" />
                <a href={service.imageCreditUrl} target="_blank" rel="noreferrer" className="absolute right-6 top-24 z-10 hidden bg-black/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-concrete/70 hover:text-white md:block">
                    Photo: {service.imageCredit}
                </a>
                <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
                <div className="flex flex-col justify-end px-6 py-20 md:px-12 lg:px-16">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">San Antonio construction services</p>
                    <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">{service.title}</h1>
                    <p className="mt-8 max-w-2xl font-sans text-lg leading-8 text-concrete/70">{service.summary}</p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <a href="#quote" className="inline-flex items-center justify-center gap-3 bg-safety-amber px-7 py-4 font-heading text-sm font-bold text-asphalt hover:bg-white">Request a site quote <ArrowRight className="h-4 w-4" /></a>
                        <a href="#scope" className="inline-flex items-center justify-center border border-white/25 px-7 py-4 font-heading text-sm font-bold text-concrete hover:border-white">Review the scope</a>
                    </div>
                </div>
                <div className="flex flex-col justify-end border-t border-white/10 px-6 py-20 md:px-12 lg:border-l lg:border-t-0 lg:px-14">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/40">Typical work</p>
                    <div className="mt-5 border-t border-white/20">
                        {service.scope.slice(0, 4).map((item, index) => (
                            <div key={item.name} className="grid grid-cols-[2rem_1fr] border-b border-white/15 py-5">
                                <span className="font-mono text-[10px] text-concrete/30">0{index + 1}</span>
                                <span className="font-heading text-base font-bold text-concrete">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>

            <section className="px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">The service</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Scope before slogans.</h2>
                    </div>
                    <p className="font-sans text-xl leading-9 text-industrial/70">{service.description}</p>
                </div>
            </section>

            <section id="scope" className="border-y border-black/10 bg-white px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 max-w-3xl">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Typical scope</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Work Crownwood can price and plan.</h2>
                    </div>
                    <div className="border-t-2 border-industrial">
                        {service.scope.map((item, index) => (
                            <div key={item.name} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[3rem_0.65fr_1fr]">
                                <span className="font-mono text-xs text-industrial/35">0{index + 1}</span>
                                <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                                <p className="font-sans text-sm leading-6 text-industrial/60">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-asphalt px-6 py-24 text-concrete md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.65fr_1.35fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">How the work is scoped</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">A straightforward four-step process.</h2>
                    </div>
                    <div className="border-t border-white/25">
                        {service.process.map((step, index) => (
                            <div key={step.name} className="grid gap-4 border-b border-white/15 py-8 md:grid-cols-[3rem_0.65fr_1fr]">
                                <span className="font-mono text-xs text-concrete/35">0{index + 1}</span>
                                <h3 className="font-heading text-lg font-bold">{step.name}</h3>
                                <p className="font-sans text-sm leading-6 text-concrete/60">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
                    <div className="border-l-4 border-safety-amber bg-white p-8 md:p-10">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">For a useful quote</p>
                        <h2 className="mt-4 font-heading text-3xl font-bold">Send the information that changes the scope.</h2>
                        <ul className="mt-7 space-y-4">
                            {service.projectDetails.map((detail) => <li key={detail} className="flex gap-3 font-sans text-sm leading-6 text-industrial/65"><Check className="mt-0.5 h-4 w-4 shrink-0 text-safety-amber" />{detail}</li>)}
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Common questions</p>
                        <div className="mt-5 border-t-2 border-industrial">
                            {service.faqs.map((faq) => (
                                <details key={faq.question} className="group border-b border-black/15 py-5">
                                    <summary className="flex cursor-pointer list-none justify-between gap-5 font-heading text-lg font-bold marker:hidden">{faq.question}<span className="text-safety-amber transition-transform group-open:rotate-45">+</span></summary>
                                    <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-industrial/65">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-black/10 bg-white px-6 py-16 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Related services</p>
                    <div className="mt-6 grid border-y border-black/15 md:grid-cols-3">
                        {related.map((item) => <Link key={item.slug} href={`/construction/${item.slug}`} className="group flex items-center justify-between border-b border-black/15 px-5 py-6 font-heading text-sm font-bold md:border-b-0 md:border-r md:last:border-r-0">{item.name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>)}
                    </div>
                </div>
            </section>

            <section id="quote" className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-10">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Project inquiry</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">Request a {service.name.toLowerCase()} quote.</h2>
                        <p className="mt-5 font-sans leading-7 text-industrial/60">Share the site, scope, quantities, operating constraints, and target schedule. Photos and plans help.</p>
                    </div>
                    <ContactForm service={service.name} servicePath={`/construction/${service.slug}`} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
