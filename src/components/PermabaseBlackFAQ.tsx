import { PaintBucket, HelpCircle } from "lucide-react";

interface FAQ {
    question: string;
    answer: string;
}

interface PermabaseBlackFAQProps {
    faqs: FAQ[];
}

export function PermabaseBlackFAQ({ faqs }: PermabaseBlackFAQProps) {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-concrete relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <HelpCircle className="w-10 h-10 text-asphalt" />
                    <h2 className="font-heading font-bold text-4xl text-industrial uppercase tracking-tight">
                        Polymer Soil Stabilization <span className="text-asphalt/50">FAQ</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 hover:border-black/20 transition-colors shadow-sm">
                            <h3 className="font-heading font-bold text-xl text-industrial mb-4 flex gap-4">
                                <span className="text-asphalt font-mono">{(idx + 1).toString().padStart(2, '0')}.</span>
                                {faq.question}
                            </h3>
                            <p className="font-sans text-industrial/70 pl-10 leading-relaxed border-l-2 border-industrial/10 ml-2">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-asphalt border border-white/10 rounded-2xl p-8 flex items-start gap-6">
                    <PaintBucket className="w-8 h-8 text-concrete shrink-0 mt-1" />
                    <div>
                        <h4 className="font-heading font-bold text-lg text-concrete uppercase mb-2">Pigment Permanency</h4>
                        <p className="font-sans text-concrete/80 text-sm leading-relaxed">
                            While highly UV resistant, the upper millimeter of the surface may lighten slightly over years of intense Texas sun exposure. For maintenance, a rapid, inexpensive surface re-application of the tint can instantly restore the deep black asphalt-like finish without requiring structural re-work.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
