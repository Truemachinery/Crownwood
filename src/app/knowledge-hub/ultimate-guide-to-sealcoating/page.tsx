import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Sealcoating: Inspection, Scope & Quote Guide | Crownwood",
    description: "A practical guide to sealcoating: what it does, pavement condition, repairs, preparation, weather, closures, striping, and quote comparison.",
    alternates: { canonical: "/knowledge-hub/ultimate-guide-to-sealcoating" },
};

const scopeItems = [
    ["Measured area", "Total square footage and any zones excluded from the work."],
    ["Named product", "Manufacturer, product line, and the current technical data that governs mixing and application."],
    ["Repairs", "Crack treatment, potholes, failed pavement, utility cuts, and oil-damaged areas listed separately."],
    ["Preparation", "Cleaning, vegetation removal, edge work, protection, and treatment of incompatible contaminants."],
    ["Application", "Number of coats, application method, planned rate, dilution or additives, and treatment of high-wear areas."],
    ["Operations", "Phasing, entrances, traffic control, weather criteria, closure, reopening, and tenant or customer notice."],
    ["Markings", "Layout, stalls, accessible markings, fire lanes, arrows, curbs, and timing after the surface is ready."],
];

const faq = [
    ["Will sealcoat repair alligator cracking?", "No. Interconnected or alligator cracking often points to movement or failure below the surface. The cause and repair limits should be evaluated before coating."],
    ["Can sealcoat fill potholes?", "No. Potholes and failed pavement require a separate repair. Coating over them does not restore the pavement section."],
    ["How long should the lot stay closed?", "There is no responsible universal answer. Product, coat thickness, temperature, humidity, shade, wind, surface condition, and traffic all affect reopening."],
    ["Should every quote include two coats?", "The appropriate system depends on the named product, pavement, application rate, wear, specification, and owner goals. Compare the complete system rather than the coat count alone."],
];

export default function SealcoatingGuidePage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Sealcoating: What to Inspect, Repair, and Specify",
        description: "A practical guide to pavement condition, sealcoat scope, preparation, application, closure planning, and quote comparison.",
        author: { "@type": "Organization", name: "Crownwood Chemicals" },
        publisher: { "@type": "Organization", name: "Crownwood Chemicals" },
        mainEntityOfPage: "https://crownwoodchemicals.com/knowledge-hub/ultimate-guide-to-sealcoating",
    };

    return (
        <main className="min-h-screen bg-concrete text-industrial">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <Navbar />

            <article>
                <header className="border-b border-black/10 px-6 pb-20 pt-40 md:px-12 lg:px-24">
                    <div className="mx-auto max-w-5xl">
                        <Link href="/knowledge-hub" className="font-mono text-xs uppercase tracking-[0.18em] text-industrial/45 hover:text-safety-amber">&larr; Guides and field notes</Link>
                        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">Pavement maintenance guide</p>
                        <h1 className="mt-6 font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Sealcoating: what to inspect, repair, and specify.</h1>
                        <p className="mt-8 max-w-3xl font-sans text-xl leading-9 text-industrial/65">Use this guide to decide whether pavement is a candidate for sealcoat, build a complete scope, and compare quotes without relying on vague promises.</p>
                        <div className="mt-10 border-y border-black/15 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-industrial/45">Condition first · repairs second · coating third · striping last</div>
                    </div>
                </header>

                <section className="px-6 py-20 md:px-12 lg:px-24">
                    <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
                        <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/45">The basic distinction</p><h2 className="mt-4 font-heading text-4xl font-bold tracking-tight">Maintenance is not reconstruction.</h2></div>
                        <div className="space-y-6 font-sans text-lg leading-8 text-industrial/70">
                            <p>Sealcoat is a surface-maintenance treatment for suitable asphalt. It can refresh appearance and provide a sacrificial surface layer, but it does not rebuild a failed base, restore missing asphalt, correct drainage, or make a structurally failed parking lot sound.</p>
                            <p>The first useful decision is therefore not which sealer to buy. It is which areas are suitable for coating, which need crack treatment, which need patching, and which may need deeper reconstruction.</p>
                        </div>
                    </div>
                </section>

                <section className="border-y border-black/10 bg-white px-6 py-20 md:px-12 lg:px-24">
                    <div className="mx-auto max-w-5xl">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/45">Condition triage</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight">Walk the pavement before requesting a coating price.</h2>
                        <div className="mt-10 border-t-2 border-industrial">
                            {[
                                ["Sound asphalt with normal weathering", "Candidate for maintenance after cleaning and project-specific preparation."],
                                ["Individual cracks", "Document width, pattern, movement, and prior treatment; price crack work separately."],
                                ["Potholes or isolated failed areas", "Repair before sealcoating and define the patch limits and method."],
                                ["Alligator cracking, rutting, or widespread movement", "Investigate base, subgrade, drainage, and loading before selecting a surface treatment."],
                                ["Standing water or poor drainage", "Correct or account for the cause; a dark coating does not change grade or provide an outlet."],
                                ["Oil, fuel, or chemical contamination", "Identify and treat incompatible areas under the selected product guidance."],
                            ].map(([condition, action], index) => (
                                <div key={condition} className="grid gap-4 border-b border-black/15 py-6 md:grid-cols-[3rem_0.8fr_1.2fr]">
                                    <span className="font-mono text-xs text-industrial/35">0{index + 1}</span><h3 className="font-heading text-lg font-bold">{condition}</h3><p className="font-sans text-sm leading-6 text-industrial/60">{action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-asphalt px-6 py-20 text-concrete md:px-12 lg:px-24">
                    <div className="mx-auto max-w-5xl">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-safety-amber">Quote checklist</p>
                        <h2 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight">A sealcoat proposal should name the work, not just the price.</h2>
                        <div className="mt-10 border-t border-white/20">
                            {scopeItems.map(([name, description], index) => (
                                <div key={name} className="grid gap-4 border-b border-white/15 py-6 md:grid-cols-[3rem_0.65fr_1.35fr]">
                                    <span className="font-mono text-xs text-concrete/30">0{index + 1}</span><h3 className="font-heading text-lg font-bold">{name}</h3><p className="font-sans text-sm leading-6 text-concrete/60">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-20 md:px-12 lg:px-24">
                    <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/45">Good scope signals</p>
                            <ul className="mt-6 border-t border-black/15">
                                {["The product and current technical sheet are identified.", "Repairs and coating are measured separately.", "Preparation and protection are described.", "Weather and reopening follow the actual product.", "Phasing reflects how the property operates."].map((item) => <li key={item} className="flex gap-3 border-b border-black/15 py-5 font-sans text-sm leading-6 text-industrial/65"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/45">Red flags</p>
                            <ul className="mt-6 border-t border-black/15">
                                {["Sealcoat is offered as the fix for structural failure.", "The quote does not name the product or application rate.", "Cleaning, crack work, and patching are assumed but not listed.", "A fixed reopening time ignores weather and site conditions.", "The proposal promises permanent restoration."].map((item) => <li key={item} className="flex gap-3 border-b border-black/15 py-5 font-sans text-sm leading-6 text-industrial/65"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-y border-black/10 bg-white px-6 py-20 md:px-12 lg:px-24">
                    <div className="mx-auto max-w-5xl">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-industrial/45">Common questions</p>
                        <div className="mt-6 border-t-2 border-industrial">
                            {faq.map(([question, answer]) => (
                                <details key={question} className="group border-b border-black/15 py-5">
                                    <summary className="flex cursor-pointer list-none justify-between gap-5 font-heading text-lg font-bold marker:hidden">{question}<span className="text-safety-amber transition-transform group-open:rotate-45">+</span></summary>
                                    <p className="mt-4 max-w-3xl font-sans text-sm leading-6 text-industrial/65">{answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-20 md:px-12 lg:px-24">
                    <div className="mx-auto flex max-w-5xl flex-col gap-7 border-l-4 border-safety-amber bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
                        <div><h2 className="font-heading text-3xl font-bold">Need a condition review and itemized scope?</h2><p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-industrial/60">Send the address, approximate area, photos, operating hours, repair history, and desired timing.</p></div>
                        <Link href="/contact" className="inline-flex shrink-0 items-center gap-3 bg-industrial px-6 py-4 font-heading text-sm font-bold text-white hover:bg-safety-amber hover:text-asphalt">Discuss the site <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                </section>
            </article>
            <Footer />
        </main>
    );
}
