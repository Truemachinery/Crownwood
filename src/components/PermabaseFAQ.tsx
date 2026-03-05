import { Beaker, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "How does Permabase compare to traditional Lime Stabilization?",
        answer: "Lime stabilization is a temporary, physical binder. Over time (10-20 years), water leaches the lime out of the soil, causing the subgrade to fail again. Permabase creates an irreversible biochemical reaction. Once it collapses the clay lattice and forces the water out, the soil becomes permanently hydrophobic. It will never swell again."
    },
    {
        question: "What types of soil does Permabase work on?",
        answer: "Permabase is specifically engineered for cohesive soils with moderate to high plasticity indexes (PI), meaning it excels in expansive clay environments. It requires at least 15-20% clay content (the 'fines') to trigger the catalytic reaction. It is not designed for pure sand or gravel."
    },
    {
        question: "How much does Permabase cost compared to hauling out soil?",
        answer: "By avoiding excavation costs, landfill tipping fees, and the cost of importing new flex-base rock, developers and contractors typically see a 30% to 50% net reduction in their earthwork and subgrade preparation budgets when substituting undercut-and-fill with Permabase stabilization."
    },
    {
        question: "Is Permabase safe for the environment?",
        answer: "Yes. Permabase is a proprietary bio-enzyme formulation. It is 100% non-toxic, non-corrosive, and contains zero VOCs. It is entirely safe for application in sensitive environments, including the San Antonio Edwards Aquifer recharge zone, and will not harm groundwater or adjacent vegetation."
    }
];

export function PermabaseFAQ() {
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
                        Product <span className="text-asphalt/50">Questions</span>
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
                    <Beaker className="w-8 h-8 text-safety-amber shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">Technical Specifications</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            Permabase™ requires rigorous pre-application soil testing to determine the exact Plasticity Index (PI) and optimal moisture content of native soils. Crownwood Chemicals provides comprehensive geotech consulting alongside product distribution to ensure maximum California Bearing Ratio (CBR) gains.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
