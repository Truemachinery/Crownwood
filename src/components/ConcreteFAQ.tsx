import { HardHat, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "Why does concrete crack in San Antonio?",
        answer: "Concrete itself doesn't just fail; the ground beneath it fails. South Texas is notorious for expansive clay soils that violently swell during rain and shrink during extreme summer droughts. This movement shatters concrete that hasn't been poured on a chemically stabilized subgrade (like Permabase) or lacks proper steel reinforcement."
    },
    {
        question: "Do I need concrete or asphalt for my commercial lot?",
        answer: "It depends on the application. Asphalt is flexible, cheaper to install over massive square footage, and easier to repair, making it ideal for standard parking spaces and driving lanes. Concrete is rigid and bears extreme point-loads, making it mandatory for loading docks, dumpster pads, and heavy truck turnaround zones."
    },
    {
        question: "How long does commercial concrete need to cure?",
        answer: "While concrete reaches a significant portion of its strength within 7 days, it technically takes 28 days to fully cure to its maximum PSI rating. For heavy commercial applications (like 18-wheeler loading docks), we mandate keeping extreme loads off the slab for a minimum of 7 to 10 days to prevent internal fracturing."
    },
    {
        question: "Are your concrete ramps fully ADA compliant?",
        answer: "Absolutely. ADA compliance in Texas is vigorously enforced. Crownwood engineers all access ramps, slopes (max 1:12), cross-slopes (max 1:48), and tactile warning domes to exact federal Title III and local San Antonio municipal specifications, guaranteeing you pass inspection."
    }
];

export function ConcreteFAQ() {
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
                        Concrete <span className="text-asphalt/50">Questions</span>
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
                    <HardHat className="w-8 h-8 text-safety-amber shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">The Steel Mandate</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            Many low-bid contractors pour slabs directly on dirt without rebar grids, using only wire mesh (which often gets trampled to the bottom of the pour). This is architectural malpractice in South Texas. Crownwood Chemicals mandates elevated, tied steel rebar grids for all structural commercial concrete.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
