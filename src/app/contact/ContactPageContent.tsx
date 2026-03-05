"use client";

import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const SERVICES = [
    { name: "Permabase™", desc: "Polymer soil stabilization", href: "/chemicals/permabase" },
    { name: "Permabase Black™", desc: "Asphalt rejuvenation", href: "/chemicals/permabase-black" },
    { name: "MeltDown MR-1™", desc: "Soy-based asphalt remover", href: "/chemicals/meltdown" },
    { name: "PHPM-50™", desc: "Pothole & patch material", href: "/chemicals/phpm-50" },
    { name: "Asphalt Paving", desc: "Full-service paving", href: "/construction/asphalt-paving" },
    { name: "Concrete", desc: "Flatwork & structural", href: "/construction/concrete" },
    { name: "Sealcoat", desc: "Protective surface coating", href: "/construction/sealcoat" },
    { name: "Striping", desc: "Pavement markings", href: "/construction/striping" },
];

export function ContactPageContent() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0A0A0A] text-concrete">
                {/* Hero */}
                <section className="pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-safety-amber/5 via-transparent to-transparent" />
                    <div className="max-w-6xl mx-auto relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-[2px] bg-safety-amber" />
                            <span className="font-mono text-xs text-safety-amber uppercase tracking-[0.25em]">
                                Get in Touch
                            </span>
                        </div>
                        <h1 className="font-heading font-bold text-4xl md:text-6xl uppercase tracking-tight leading-[0.95]">
                            Let&apos;s Build
                            <br />
                            <span className="text-safety-amber">Something</span> Together
                        </h1>
                        <p className="font-sans text-lg text-concrete/60 mt-6 max-w-xl">
                            Whether you need a quote on chemicals, a site assessment for construction,
                            or want to discuss a municipal contract — we&apos;re here to help.
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="px-6 md:px-12 pb-24">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

                        {/* Left: Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Details */}
                            <div className="space-y-5">
                                <a
                                    href="mailto:nate@crownwoodchemicals.com"
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-safety-amber/10 border border-safety-amber/20 flex items-center justify-center shrink-0 group-hover:bg-safety-amber/20 transition-colors">
                                        <Mail className="w-5 h-5 text-safety-amber" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-sm uppercase tracking-wider text-concrete/50 mb-1">Email</p>
                                        <p className="font-sans text-safety-amber group-hover:underline">nate@crownwoodchemicals.com</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+12105550123"
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                        <Phone className="w-5 h-5 text-concrete/60" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-sm uppercase tracking-wider text-concrete/50 mb-1">Phone</p>
                                        <p className="font-sans text-concrete/80">Call for Pricing</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-concrete/60" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-sm uppercase tracking-wider text-concrete/50 mb-1">Service Area</p>
                                        <p className="font-sans text-concrete/80">
                                            San Antonio, TX &amp; Statewide
                                            <br />
                                            <span className="text-concrete/50 text-sm">
                                                Serving all 254 Texas counties
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-concrete/60" />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-sm uppercase tracking-wider text-concrete/50 mb-1">Response Time</p>
                                        <p className="font-sans text-concrete/80">
                                            Typically within 24 hours
                                            <br />
                                            <span className="text-concrete/50 text-sm">
                                                Mon – Fri, 7am – 6pm CT
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/5" />

                            {/* Quick links */}
                            <div>
                                <h3 className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-concrete/40 mb-4">
                                    Our Products &amp; Services
                                </h3>
                                <div className="grid grid-cols-1 gap-1.5">
                                    {SERVICES.map((s) => (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            <div>
                                                <span className="font-heading font-bold text-sm text-concrete/80 group-hover:text-safety-amber transition-colors">
                                                    {s.name}
                                                </span>
                                                <span className="font-mono text-xs text-concrete/30 ml-2 hidden md:inline">
                                                    {s.desc}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 text-concrete/20 group-hover:text-safety-amber transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-3">
                            <ContactForm
                                service="General Inquiry"
                                servicePath="/contact"
                                darkMode={true}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
