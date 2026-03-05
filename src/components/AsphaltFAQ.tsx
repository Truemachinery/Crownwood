import { ShieldAlert, HelpCircle } from "lucide-react";

const FAQS = [
    {
        question: "How long does commercial asphalt last in San Antonio?",
        answer: "A properly engineered commercial parking lot in San Antonio should last 15 to 20 years. However, survival depends entirely on the subgrade. Because South Texas soil has high clay content that swells when wet and shrinks during droughts, stabilization is mandatory. Without our Permabase treatment, untreated lots often fail within 3-5 years due to base shifting."
    },
    {
        question: "Do I need a complete tear-out, or can you just do an overlay?",
        answer: "We never pave over failure. If your existing asphalt exhibits deep 'alligator' cracking or severe rutting, the base underneath is compromised, requiring a full-depth tear-out and stabilization. If the surface is simply oxidized (graying) with minor surface cracks, a precision milling and high-density overlay will restore the pavement."
    },
    {
        question: "How soon can we drive on a new asphalt installation?",
        answer: "We recommend keeping heavy traffic off new hot mix asphalt for at least 24 to 48 hours to allow the oils to cure and the surface to stiffen. Standard vehicle traffic is generally acceptable within 24 hours, but heavy 18-wheeler traffic should be diverted if possible for the first few days, especially during extreme summer heat."
    },
    {
        question: "Why should we choose Crownwood Chemicals for paving?",
        answer: "We are an engineering-first construction firm. Most paving companies focus only on the surface layer. We manufacture the chemical soil stabilizers (Permabase, PHPM-50) that secure the foundation. By combining our proprietary materials with an elite, in-house heavy machinery crew, we build infrastructure that outright defies Texas weather."
    }
];

export function AsphaltFAQ() {
    // Generate JSON-LD for SEO
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
            {/* Inject JSON-LD Schema directly into the head for Google and LLMs */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <HelpCircle className="w-10 h-10 text-safety-amber" />
                    <h2 className="font-heading font-bold text-4xl text-industrial uppercase tracking-tight">
                        Paving <span className="text-asphalt/50">Questions</span>
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
                        <h4 className="font-heading font-bold text-lg text-industrial uppercase mb-2">Notice on Substandard Paving</h4>
                        <p className="font-sans text-industrial/80 text-sm leading-relaxed">
                            Many San Antonio contractors offer "cheap" overlays on failing subgrades. This is a predatory practice that guarantees structural collapse within 24 months. Crownwood Chemicals requires a site engineering assessment prior to any top-coat application. We build assets, not liabilities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
