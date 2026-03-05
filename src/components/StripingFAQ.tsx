import { Scale, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "Is my parking lot currently ADA compliant?",
        answer: "If your lot was striped over a decade ago, or re-striped by an unqualified contractor, it likely violates current Title III ADA codes. Common violations include improper stall widths, lack of van-accessible aisles (which must be 96 inches wide), missing cross-hatching, or incorrectly mounted signage."
    },
    {
        question: "What type of paint do you use?",
        answer: "We specify 100% acrylic waterborne fast-dry traffic paint for standard applications, which meets strictly formulated TxDOT Type II requirements. For high-impact zones, we utilize epoxy-based coatings or extruded thermoplastic, which permanently bonds to the asphalt."
    },
    {
        question: "Can you re-configure my parking lot to add more spaces?",
        answer: "Yes. Before laying down new lines, our layout engineers can assess your current grid. By adjusting stall angles (e.g., moving from 90 degrees to 60 degrees) and streamlining driving lanes, we can often increase parking capacity by 10-15%."
    },
    {
        question: "Do you stripe over fresh sealcoat?",
        answer: "Yes, but timing is critical. Sealcoat must reach an initial cure before traffic paint is applied; otherwise, the waterborne paint will react with the uncured emulsion, causing it to turn brown or 'bleed'. We manage this exact curing protocol internally."
    }
];

export function StripingFAQ() {
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
                    <HelpCircle className="w-10 h-10 text-safety-amber" />
                    <h2 className="font-heading font-bold text-4xl text-industrial uppercase tracking-tight">
                        Striping <span className="text-asphalt/50">Questions</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-safety-amber/50 transition-colors shadow-sm">
                            <h3 className="font-heading font-bold text-xl text-industrial mb-4 flex gap-4">
                                <span className="text-safety-amber font-mono">{(idx + 1).toString().padStart(2, '0')}.</span>
                                {faq.question}
                            </h3>
                            <p className="font-sans text-industrial/70 pl-10 leading-relaxed border-l-2 border-industrial/10 ml-2">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-red-500/10 border border-red-500/20 rounded-2xl p-8 flex items-start gap-6">
                    <Scale className="w-8 h-8 text-red-600 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-industrial uppercase mb-2">Legal Liability Warning</h4>
                        <p className="font-sans text-industrial/80 text-sm leading-relaxed">
                            'Drive-by' ADA lawsuits are a massive operational threat in Texas. If your handicap spots are non-compliant by even a few inches, you are subject to federal litigation and exorbitant settlements. Crownwood guarantees strict geometric adherence to all current accessibility guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
