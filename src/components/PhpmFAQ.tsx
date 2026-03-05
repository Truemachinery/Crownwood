import { HardHat, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "How is this different from bagged cold patch at the hardware store?",
        answer: "Hardware store 'cold patch' is essentially loose aggregate coated in cutback asphalt. It relies on solvent evaporation to 'cure'—a process that takes weeks and remains soft in the sun. PHPM-50 is a reactive polymer binder. It physically cures under compaction pressure, achieving instantaneous structural rigidity."
    },
    {
        question: "Can I really patch a pothole filled with water?",
        answer: "Yes. Our hydro-reactive formula is heavier than water and contains hydrophobic displacement agents. When poured into standing water, it sinks to the bottom, forces the water up and out of the void, and adheres directly to the submerged asphalt."
    },
    {
        question: "Will the patch be dislodged by snowplows or heavy trucks?",
        answer: "No. Because PHPM-50 is highly ductile, it moves with the surrounding pavement rather than shattering. Unlike rigid concrete patches or brittle cold mixes, its elastomeric bond absorbs the kinetic impact of 18-wheelers, making it virtually impervious to roll-out or plow shearing."
    },
    {
        question: "How much material do I need?",
        answer: "A standard 50lb bag of PHPM-50 will cover approximately a 5-square-foot area at a 1-inch depth. Because of its extreme density, we recommend purchasing by the pallet (56 bags) for commercial property management or municipal street repair fleets."
    }
];

export function PhpmFAQ() {
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
                    <HelpCircle className="w-10 h-10 text-asphalt" />
                    <h2 className="font-heading font-bold text-4xl text-industrial uppercase tracking-tight">
                        Product <span className="text-asphalt/50">Questions</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-black/20 transition-colors shadow-sm">
                            <h3 className="font-heading font-bold text-xl text-industrial mb-4 flex gap-4">
                                <span className="text-high-vis-yellow font-mono text-shadow-sm opacity-80">{(idx + 1).toString().padStart(2, '0')}.</span>
                                {faq.question}
                            </h3>
                            <p className="font-sans text-industrial/70 pl-10 leading-relaxed border-l-2 border-industrial/10 ml-2">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-asphalt border border-white/10 rounded-2xl p-8 flex items-start gap-6">
                    <HardHat className="w-8 h-8 text-high-vis-yellow shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">Municipal Approved</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            Crownwood Chemicals supplies bulk pallets of PHPM-50 to public works departments across Texas. Its ability to be deployed in freezing rain or blistering heat makes it the premier choice for rapid-response emergency pothole mitigation on high-speed arterial roads.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
