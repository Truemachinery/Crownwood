import { ShieldAlert, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "Is hydro-seeding cheaper than laying sod?",
        answer: "Yes. For commercial deployments in San Antonio, hydro-seeding generally costs 60% to 75% less than purchasing and installing sod. This makes it the only financially viable option for revegetating large footprints like highway right-of-ways, retention ponds, and new subdivision greenbelts."
    },
    {
        question: "How long does hydro-seeding take to grow?",
        answer: "Under optimal watering conditions in South Texas, you will begin to see green shoots within 7 to 14 days. A sturdy, mowable lawn is typically established within 3 to 4 weeks. The mulch and tackifier within the slurry act like a greenhouse, significantly accelerating germination compared to dry seeding."
    },
    {
        question: "Do the seeds wash away when it rains?",
        answer: "No. Crownwood utilizes a proprietary heavy-duty tackifier and Bonded Fiber Matrix (BFM) mixed into the slurry. This acts as an industrial glue, pinning the seed and mulch directly to the soil to prevent washout and sheet erosion, even on steep retention pond embankments."
    },
    {
        question: "How much watering is required for commercial hydro-seed?",
        answer: "Watering is absolutely critical for the first 14-21 days. The hydro-seeded area must be kept consistently damp (light watering 2-3 times per day) so the seed does not dry out and die. Once the root system establishes, we design our native grass blends to be highly drought tolerant."
    }
];

export function HydroSeedingFAQ() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <HelpCircle className="w-10 h-10 text-[#4CAF50]" />
                    <h2 className="font-heading font-bold text-4xl text-industrial uppercase tracking-tight">
                        Revegetation <span className="text-asphalt/50">Questions</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-[#4CAF50]/50 transition-colors shadow-sm">
                            <h3 className="font-heading font-bold text-xl text-industrial mb-4 flex gap-4">
                                <span className="text-[#4CAF50] font-mono">{(idx + 1).toString().padStart(2, '0')}.</span>
                                {faq.question}
                            </h3>
                            <p className="font-sans text-industrial/70 pl-10 leading-relaxed border-l-2 border-industrial/10 ml-2">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-asphalt border border-white/10 rounded-2xl p-8 flex items-start gap-6">
                    <ShieldAlert className="w-8 h-8 text-[#4CAF50] shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">SWPPP Compliance Notice</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            Failure to properly stabilize a construction site can result in severe municipal and TCEQ (Texas Commission on Environmental Quality) fines. Our aggressive slurry formulations are engineered to lock down soil immediately, ensuring you pass SWPPP inspections and keep your commercial project moving.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
