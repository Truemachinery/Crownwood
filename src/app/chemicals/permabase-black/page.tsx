import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PermabaseBlackHero } from "@/components/PermabaseBlackHero";
import { PermabaseBlackFeatures } from "@/components/PermabaseBlackFeatures";
import { PermabaseBlackProcess } from "@/components/PermabaseBlackProcess";
import { PermabaseBlackPricing } from "@/components/PermabaseBlackPricing";
import { PermabaseBlackFAQ } from "@/components/PermabaseBlackFAQ";
import { PermabaseBlackComparison } from "@/components/PermabaseBlackComparison";
import { PermabaseBlackApplications } from "@/components/PermabaseBlackApplications";
import { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Permabase Black™ | Polymer Soil Stabilization & Asphalt Alternative | Crownwood Chemicals",
    description: "Permabase Black™ is a polymer bio-enzyme soil stabilizer that permanently alters expansive clay, eliminates PM10 fugitive dust, and delivers an asphalt-like dark finish — all in one application. Used as a chipseal underseal, asphalt prime/tack coat, and road rejuvenation topcoat.",
    keywords: [
        "polymer soil stabilization",
        "polymer soil stabilizer",
        "bio-enzyme soil stabilizer",
        "enzyme soil stabilization",
        "Permabase Black",
        "expansive clay stabilization",
        "dirt road stabilization",
        "subgrade stabilization chemical",
        "dust control chemical",
        "PM10 dust suppression",
        "PM10 fugitive dust control",
        "asphalt alternative",
        "rural road paving alternative",
        "hydrophobic soil treatment",
        "carbon black soil additive",
        "tinted soil stabilizer",
        "CBR improvement soil",
        "chipseal underseal",
        "asphalt prime coat",
        "asphalt tack coat alternative",
        "chipseal rejuvenation",
        "road stabilization chemical Texas",
        "polymer emulsion soil stabilizer",
        "non-toxic soil stabilizer",
        "San Antonio dust control",
    ],
    openGraph: {
        title: "Permabase Black™ | Polymer Soil Stabilization & Asphalt Alternative",
        description: "Polymer bio-enzyme soil stabilizer that permanently alters expansive clay, eliminates dust, and provides an asphalt-like aesthetic. Also used as chipseal underseal, prime coat, and road rejuvenation topcoat.",
        images: [{ url: "/images/permabase-black-hero.png", width: 1200, height: 630 }],
        type: "website",
    }
};

/* ── FAQ Data (shared between component and schema) ── */
const FAQS = [
    {
        question: "What is polymer soil stabilization?",
        answer: "Polymer soil stabilization is a ground engineering technique that uses polymer-based chemical agents — such as bio-enzyme catalysts — to permanently alter the mineralogy of expansive clay soils. The polymer collapses the clay lattice structure, expels moisture, and binds soil particles into a dense, rock-solid, hydrophobic matrix. Permabase Black™ is a polymer soil stabilizer that adds a proprietary carbon-black tint to this process, delivering structural stabilization and a dark asphalt-like aesthetic in a single application."
    },
    {
        question: "Is Permabase Black a permanent replacement for asphalt?",
        answer: "Permabase Black is a permanent soil stabilizer that provides the aesthetic of asphalt. For low-speed, rural, or agricultural applications — like ranch roads, laydown yards, or rural driveways — it is an exceptional asphalt alternative. For high-traffic, high-speed commercial roads, it should be used as the superior stabilized subgrade beneath a standard wearing course."
    },
    {
        question: "Will the black tint wash away in the rain?",
        answer: "No. The carbon-black tint is catalyzed directly into the soil matrix alongside the bio-enzyme. Because Permabase creates a permanently hydrophobic (water-repelling) soil structure, the tint does not wash off, leach into the water table, or fade rapidly during rainstorms."
    },
    {
        question: "Can Permabase Black be used for PM10 dust control?",
        answer: "Yes. Permabase Black is one of the most effective PM10 fugitive dust suppressants available. Unlike water spraying (which evaporates within hours) or oil-based applications (which leach hydrocarbons), Permabase Black permanently binds dust-generating soil particles into a solid, dark, hardened surface that eliminates airborne particulate matter."
    },
    {
        question: "How does Permabase Black compare to lime stabilization?",
        answer: "Lime stabilization raises soil pH to extremely caustic levels (12+) and requires a separate asphalt or gravel cap since lime does not provide an aesthetic wearing surface. Permabase Black uses a non-toxic polymer bio-enzyme that stabilizes the soil AND provides a finished dark surface in one pass — no additional capping required for low-speed applications."
    },
    {
        question: "Can Permabase Black be used on expansive clay soils?",
        answer: "Absolutely. Permabase Black is specifically engineered for expansive CH and CL classification clays. The bio-enzyme catalyst permanently collapses the montmorillonite clay lattice, eliminating swell potential and creating a dense, non-expansive, load-bearing subgrade with dramatically improved CBR values."
    },
    {
        question: "Is polymer soil treatment safe near water sources?",
        answer: "Yes. Permabase Black relies on a non-toxic bio-enzyme catalyst combined with an inert carbon pigment. It contains zero hydrocarbons and zero petroleum-based products. It is 100% safe for use in agricultural perimeters, near livestock, and adjacent to aquifer recharge zones — unlike oil-based emulsions or chemical dust palliatives."
    },
    {
        question: "Can Permabase Black be used as a chipseal underseal or asphalt prime coat?",
        answer: "Yes. Permabase Black at its standard 10:1 dilution serves as an ideal underseal before chipseal applications — stabilizing and sealing the base course. It also functions as a polymer-based prime coat and tack coat for asphalt overlays, replacing traditional petroleum emulsions with an environmentally safe alternative."
    },
    {
        question: "What is the CBR improvement from polymer soil stabilization?",
        answer: "Polymer bio-enzyme soil stabilization using Permabase Black can increase California Bearing Ratio (CBR) values by 300% or more compared to untreated soil. The exact improvement depends on soil classification, moisture content, and compaction effort, but the permanent chemical alteration of the clay mineralogy consistently produces dramatic load-bearing improvements."
    }
];

export default function PermabaseBlackPage() {

    /* ── Stacked @graph Schema: Product + Service + FAQPage + Video ── */
    const pageSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "name": "Permabase Black™",
                "image": "/images/permabase-black-hero.png",
                "description": "Proprietary polymer bio-enzyme soil stabilizer with carbon-black tint that permanently alters expansive clay mineralogy, eliminates PM10 fugitive dust, and provides a dark asphalt-like aesthetic finish.",
                "brand": {
                    "@type": "Brand",
                    "name": "Crownwood Chemicals"
                },
                "category": "Polymer Soil Stabilization Chemicals",
                "material": "Polymer bio-enzyme catalyst with carbon-black pigment",
                "offers": {
                    "@type": "Offer",
                    "url": "https://crownwoodchemicals.com/chemicals/permabase-black",
                    "priceCurrency": "USD",
                    "price": "5400.00",
                    "unitText": "275-gallon tote",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@type": "Organization",
                        "name": "Crownwood Chemicals"
                    }
                }
            },
            {
                "@type": "Service",
                "serviceType": "Polymer Soil Stabilization",
                "name": "Polymer Soil Stabilization with Permabase Black™",
                "description": "Professional polymer bio-enzyme soil stabilization service using Permabase Black™. Permanently stabilizes expansive clay soils, suppresses PM10 dust, and delivers an asphalt-like dark finish. Also used as chipseal underseal, asphalt prime/tack coat, and road rejuvenation topcoat.",
                "provider": {
                    "@type": "Organization",
                    "name": "Crownwood Chemicals",
                    "url": "https://crownwoodchemicals.com"
                },
                "areaServed": {
                    "@type": "State",
                    "name": "Texas"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Permabase Black Applications",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Soil Stabilization & Dust Control"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Chipseal Underseal & Base Preparation"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Asphalt Prime Coat & Tack Coat"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Road Rejuvenation Topcoat (Chipseal & Asphalt)"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": FAQS.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            },
            {
                "@type": "VideoObject",
                "name": "Permabase Black™ Polymer Soil Stabilization — Field Application",
                "description": "Watch the Crownwood Chemicals crew applying Permabase Black™ polymer soil stabilizer in the field. See how the bio-enzyme catalyst and carbon-black tint stabilize the subgrade and create an asphalt-like finish in a single pass.",
                "thumbnailUrl": "/images/permabase-black-hero.png",
                "uploadDate": "2025-01-01"
            }
        ]
    };

    return (
        <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
            />
            <Navbar />
            <PermabaseBlackHero />

            {/* ── TL;DR Executive Summary + Key Specifications ── */}
            <article className="py-20 px-6 md:px-12 lg:px-24 bg-concrete border-b border-black/5">
                <div className="max-w-5xl mx-auto">
                    {/* TL;DR for AI extraction */}
                    <div className="mb-16 bg-asphalt/5 border-l-4 border-safety-amber p-8 rounded-r-2xl">
                        <h2 className="font-heading font-bold text-sm text-safety-amber uppercase tracking-widest mb-4">
                            TL;DR — What Is Permabase Black?
                        </h2>
                        <p className="font-sans text-industrial text-lg leading-relaxed">
                            <strong>Permabase Black™</strong> is a <strong>polymer bio-enzyme soil stabilizer</strong> that permanently alters expansive clay mineralogy, eliminates PM10 fugitive dust, and provides a dark, asphalt-like aesthetic finish — all in a single application at a fraction of traditional paving costs. It can also be used as a <strong>chipseal underseal</strong>, <strong>asphalt prime and tack coat</strong>, and a concentrated <strong>5:1 rejuvenation topcoat</strong> for existing chipseal and asphalt roads.
                        </p>
                    </div>

                    {/* Key Specifications - structured for zero-click extraction */}
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-industrial uppercase tracking-tight mb-8">
                        Key <span className="text-safety-amber">Specifications</span>
                    </h2>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            { term: "Chemistry", def: "Polymer bio-enzyme catalyst + inert carbon-black pigment" },
                            { term: "Treatment Depth", def: "6–12 inches (full-lift stabilization)" },
                            { term: "Standard Dilution", def: "10:1 water-to-concentrate ratio" },
                            { term: "Topcoat Dilution", def: "5:1 for rejuvenation & re-sealing applications" },
                            { term: "Tote Size", def: "275-gallon IBC concentrate" },
                            { term: "Finished Volume per Tote", def: "2,750 gallons at 10:1" },
                            { term: "Coverage per Tote", def: "~1 mile at 20ft wide road" },
                            { term: "Target Soils", def: "Expansive clays (CH/CL), silts, sandy clays" },
                            { term: "CBR Improvement", def: "Up to 300%+ increase vs. untreated soil" },
                            { term: "Hydrophobic", def: "Yes — permanently water-repellent matrix" },
                            { term: "Environmental", def: "Non-toxic, zero hydrocarbons, zero petroleum" },
                            { term: "Applications", def: "Soil stabilization, dust control, chipseal underseal, asphalt prime/tack, road rejuvenation topcoat" },
                        ].map(spec => (
                            <div key={spec.term} className="flex flex-col py-3 border-b border-black/5">
                                <dt className="font-heading font-bold text-sm text-industrial/60 uppercase tracking-widest mb-1">{spec.term}</dt>
                                <dd className="font-sans text-industrial text-base">{spec.def}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </article>

            {/* Video Showcase */}
            <section className="py-16 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-concrete uppercase tracking-tight text-center mb-4">
                        See It <span className="text-safety-amber">In Action</span>
                    </h2>
                    <p className="font-mono text-concrete/60 text-sm uppercase tracking-widest text-center mb-10">
                        Watch our crew applying Permabase Black™ polymer soil stabilizer in the field
                    </p>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[500px]">
                        <video
                            className="w-full h-full max-h-[500px] object-cover"
                            controls
                            playsInline
                            preload="metadata"
                        >
                            <source src="/Videos/IMG_0705.MOV" type="video/quicktime" />
                            <source src="/Videos/IMG_0705.MOV" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            <PermabaseBlackFeatures />
            <PermabaseBlackApplications />
            <PermabaseBlackProcess />
            <PermabaseBlackComparison />
            <PermabaseBlackPricing />
            <PermabaseBlackFAQ faqs={FAQS} />

            <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl text-concrete uppercase tracking-tight mb-8">
                        Pave <span className="text-[#666666]">Differently.</span>
                    </h2>
                    <p className="font-mono text-concrete/80 text-lg uppercase tracking-widest mb-10 max-w-2xl mx-auto">
                        Achieve polymer soil stabilization and an asphalt finish in a single application.
                    </p>
                    <button className="bg-concrete text-asphalt px-12 py-5 rounded-full font-heading font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-2xl hover:scale-105 transform duration-300">
                        Request Permabase Black Specs
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
