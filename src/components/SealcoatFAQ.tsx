import { ShieldAlert, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "How often should I sealcoat my commercial parking lot?",
        answer: "In San Antonio's harsh climate, a commercial-grade sealcoat should be applied every 2 to 3 years. This interval prevents the oils in the original asphalt from evaporating, which is what causes the pavement to turn gray, brittle, and eventually crack."
    },
    {
        question: "Can you sealcoat a failing or potholed parking lot?",
        answer: "No. Sealcoat is a preventative maintenance measure, not a structural repair. Applying sealer over alligatored cracks or failing base material is throwing money away. We must first saw-cut and repair structural damage using PHPM-50 and hot-mix patching before the lot can be successfully sealed."
    },
    {
        question: "How long does the parking lot need to be shut down?",
        answer: "Our standard emulsions require 24 hours of zero vehicle traffic to fully cure. However, we specialize in phased execution—routing traffic and sectioning off your lot so your retail or commercial operations never fully shut down. For zero-downtime requirements, we utilize fast-curing Permabase Black."
    },
    {
        question: "What is the difference between spray and squeegee application?",
        answer: "Squeegee application forces sealer deep into porous, highly oxidized asphalt but can leave ridges. High-pressure spray application provides a uniform, thicker wearing surface. Our protocol often combines both—squeegee on the first coat for maximum penetration, and spray on the second coat for a seamless aesthetic finish."
    }
];

export function SealcoatFAQ() {
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
                        Sealcoat <span className="text-asphalt/50">Questions</span>
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

                <div className="mt-16 bg-safety-amber/10 border border-safety-amber/20 rounded-2xl p-8 flex items-start gap-6">
                    <ShieldAlert className="w-8 h-8 text-safety-amber shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-industrial uppercase mb-2">Dilution Warning</h4>
                        <p className="font-sans text-industrial/80 text-sm leading-relaxed">
                            A common predatory practice in San Antonio is diluting sealcoat emulsion with excessive water to increase contractor profit margins. This results in a "black wash" that washes away after the first rain. Crownwood Chemicals strictly adheres to manufacturer mix ratios, integrating quartz aggregate for traction and hardening polymers for maximum durability.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
