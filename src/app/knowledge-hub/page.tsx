import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const dynamic = "force-static";

export const metadata = {
    title: "Guides & Field Notes | Crownwood Chemicals",
    description: "Practical guides for evaluating road products, pavement maintenance, and construction scopes.",
    alternates: { canonical: "/knowledge-hub" },
};

export default function KnowledgeHubPage() {
    return (
        <main className="min-h-screen bg-concrete text-industrial">
            <Navbar />
            <section className="border-b border-black/10 px-6 pb-20 pt-40 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Guides and field notes</p>
                    <h1 className="mt-6 max-w-4xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Read the scope before you price the work.</h1>
                    <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-industrial/65">Plain-language references for owners, facility teams, and public works staff comparing materials and maintenance options.</p>
                </div>
            </section>
            <section className="px-6 py-20 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl border-t-2 border-industrial">
                    <Link href="/knowledge-hub/ultimate-guide-to-sealcoating" className="group grid gap-5 border-b border-black/15 py-9 md:grid-cols-[3rem_0.7fr_1.2fr_1.5rem]">
                        <span className="font-mono text-xs text-industrial/35">01</span>
                        <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-safety-amber">Pavement maintenance</p><h2 className="mt-2 font-heading text-2xl font-bold">Sealcoating: what to inspect, repair, and specify</h2></div>
                        <p className="font-sans text-sm leading-6 text-industrial/60">A practical guide to product categories, pavement condition, surface preparation, crack and patch coordination, weather, closure planning, and quote comparison.</p>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}
