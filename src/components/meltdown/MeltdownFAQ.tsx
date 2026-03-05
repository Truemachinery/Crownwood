import Head from "next/head";

export function MeltdownFAQ() {
    const faqs = [
        {
            q: "What is the best asphalt remover for paving equipment?",
            a: "MeltDown MR-1 by Crownwood Chemicals is a soy-based 2-in-1 asphalt remover and release agent that outperforms petroleum and citrus-based cleaners. It removes cured asphalt, tar, and tack oil while also functioning as a release agent to prevent future buildup — making it the most versatile and cost-effective asphalt remover on the market."
        },
        {
            q: "Can MeltDown MR-1 be used as both an asphalt remover and release agent?",
            a: "Yes. MeltDown MR-1 is the only dual-action formula available that functions as both a heavy-duty asphalt remover for cleanup and a release agent that prevents asphalt from bonding to truck beds, pavers, rollers, and tools. One product, two jobs, one drum."
        },
        {
            q: "Is soy-based asphalt remover better than citrus or diesel?",
            a: "Soy-based formulas like MeltDown MR-1 offer superior penetration and dwell time compared to citrus solvents, which evaporate too quickly to be effective on cured asphalt. Unlike petroleum-based cleaners and diesel, soy-based removers are biodegradable, have higher flash points for safer jobsite use, and won't damage rubber, seals, or painted surfaces."
        },
        {
            q: "What sizes does MeltDown MR-1 come in?",
            a: "MeltDown MR-1 is available in 1-gallon jugs, 5-gallon pails, 55-gallon drums, and 330-gallon IBC totes. Volume pricing and Net 30 terms are available for municipal and commercial accounts. Contact us for drum and tote pricing."
        },
        {
            q: "Is MeltDown MR-1 safe for painted surfaces and rubber?",
            a: "Absolutely. The soy-based formula is non-corrosive and safe for use on metal, rubber, painted surfaces, aluminum, chrome, and glass. It will not degrade hydraulic seals, hoses, or protective coatings on your equipment."
        },
        {
            q: "How do I remove hardened asphalt from my paving equipment?",
            a: "Apply MeltDown MR-1 directly to asphalt buildup and allow 10–30 minutes of dwell time. For heavy or fully cured asphalt, use a brush or pressure washer to agitate. Rinse with water. The soy-based formula penetrates deep and stays active longer than citrus or solvent-based cleaners, breaking the bond without damaging your equipment."
        },
        {
            q: "How do I prevent asphalt from sticking to truck beds and rollers?",
            a: "Spray a thin coat of MeltDown MR-1 onto clean truck beds, roller drums, paver screeds, and tools before contact with hot mix asphalt. The soy-based formula creates a release film that prevents adhesion, allowing asphalt to slide off cleanly — no scraping, no diesel, no secondary products needed."
        },
        {
            q: "Where can I buy industrial-grade asphalt remover in bulk?",
            a: "MeltDown MR-1 is available direct from Crownwood Chemicals in San Antonio, TX. We ship nationwide and offer volume pricing on 55-gallon drums and 330-gallon totes. Contact us at 210-792-5236 or Nate@crownwoodchemicals.com for a quote."
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <>
            {/* Inject FAQ Schema for Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section id="faq" className="bg-[#000000] py-24 border-t border-white/5 select-none">
                <div className="max-w-3xl mx-auto px-6 md:px-12">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block bg-[#111111] border border-white/10 px-[12px] py-[4px] rounded-full text-[12px] font-bold tracking-[2px] text-concrete/60 uppercase mb-4">
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                        <h2 className="font-bebas text-[48px] md:text-[56px] text-white tracking-[1px] leading-tight mb-4">
                            ASPHALT REMOVER & RELEASE AGENT FAQ
                        </h2>
                    </div>

                    {/* FAQ Items (Single Column) */}
                    <div className="space-y-0">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="py-8 border-b border-white/10 last:border-b-0">
                                <h3 className="font-barlow text-[20px] font-bold text-safety-amber tracking-[0.5px] uppercase mb-3">
                                    Q: {faq.q}
                                </h3>
                                <p className="text-[15px] text-concrete/70 leading-[1.7]">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}
