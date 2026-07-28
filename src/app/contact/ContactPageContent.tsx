import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const startingPoints = [
    ["PCT road products", "Dust, patching, preservation, release, and cleaning", "/chemicals/road-building-products"],
    ["Soil products", "Permabase and Permabase Black", "/chemicals/permabase"],
    ["Construction services", "Paving, concrete, surface work, clearing, and seeding", "/#construction"],
];

export function ContactPageContent() {
    return (
        <main className="min-h-screen bg-asphalt text-concrete">
            <Navbar />
            <section className="border-b border-white/10 px-6 pb-20 pt-40 md:px-12 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">Contact Crownwood</p>
                    <h1 className="mt-6 max-w-4xl font-heading text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Tell us what the road, site, or equipment needs.</h1>
                    <p className="mt-7 max-w-2xl font-sans text-lg leading-8 text-concrete/65">A useful first message includes the location, dimensions or quantity, current condition, intended use, schedule, and any plans or specifications.</p>
                </div>
            </section>

            <section className="px-6 py-20 md:px-12 lg:px-24">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <div className="border-t border-white/20">
                            <a href="mailto:nate@crownwoodchemicals.com" className="flex gap-4 border-b border-white/15 py-6">
                                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-safety-amber" />
                                <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete/40">Email</p><p className="mt-2 break-all font-sans text-sm text-concrete">nate@crownwoodchemicals.com</p></div>
                            </a>
                            <div className="flex gap-4 border-b border-white/15 py-6">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-safety-amber" />
                                <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete/40">Based in</p><p className="mt-2 font-sans text-sm text-concrete">San Antonio, Texas</p></div>
                            </div>
                        </div>

                        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete/40">Useful starting points</p>
                        <div className="mt-4 border-t border-white/20">
                            {startingPoints.map(([name, note, href]) => (
                                <Link key={href} href={href} className="group grid gap-2 border-b border-white/15 py-5">
                                    <span className="flex items-center justify-between font-heading text-sm font-bold text-concrete">{name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                                    <span className="font-sans text-xs leading-5 text-concrete/45">{note}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <ContactForm service="General inquiry" servicePath="/contact" darkMode />
                </div>
            </section>
            <Footer />
        </main>
    );
}
