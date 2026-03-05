import { HelpCircle, AlertTriangle } from "lucide-react";

const FAQS = [
    {
        question: "Do you haul away the cleared debris, or mulch it on-site?",
        answer: "It depends on the project spec and environmental regulations. For pure agricultural or ranch clearing, on-site forestry mulching is often preferred as it returns nutrients to the soil. For commercial pad sites, all organic material must be completely hauled away or burned (if permitted) to ensure a stable subgrade for building."
    },
    {
        question: "Can you clear steep, rocky terrain in the Texas Hill Country?",
        answer: "Yes. Our heavy-duty tracked machinery is built specifically for severe uneven terrain. We frequently operate in the rocky, limestone-heavy environments north of San Antonio, executing cuts through solid rock when necessary."
    },
    {
        question: "Do you handle the environmental permitting?",
        answer: "While the property owner or general contractor is typically responsible for securing overall development permits, we strictly adhere to all local San Antonio and Bexar County environmental protocols. We install silt fencing, SWPPP compliance measures, and protect marked heritage trees to ensure the site passes inspection."
    },
    {
        question: "How long does it take to clear a commercial acre?",
        answer: "Timeline heavily depends on the density of the brush and the topography. A heavily wooded acre of solid mature cedar could take 2-4 days, whereas light brush can be mulched in hours. We deploy multiple machines simultaneously on large tracts to compress the timeline."
    }
];

export function LandClearingFAQ() {
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
                        Earthwork <span className="text-asphalt/50">Questions</span>
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

                <div className="mt-16 bg-asphalt border border-white/10 rounded-2xl p-8 flex items-start gap-6">
                    <AlertTriangle className="w-8 h-8 text-safety-amber shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">Warning on Buried Debris</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            Amateur operators will often push trees into a trench and bury them to save haul-off costs. Over years, this wood rots, creating massive subterranean voids causing the ground above to collapse. We guarantee 100% extraction of all structural organics before grading.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
