const steps = [
    {
        number: "01",
        title: "Describe the condition",
        description: "Tell us what is failing, where the project is, what surface or soil is involved, and how traffic or equipment uses it.",
    },
    {
        number: "02",
        title: "Confirm the fit",
        description: "We compare the job with the published product use, identify missing technical inputs, and separate repair needs from preventive maintenance.",
    },
    {
        number: "03",
        title: "Price the actual scope",
        description: "Once the application method, quantity, schedule, and delivery or field-service needs are clear, we can prepare a useful quote.",
    },
];

export function Protocol() {
    return (
        <section className="border-y border-white/10 bg-asphalt px-6 py-24 text-concrete md:px-12 lg:px-24">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">A practical first conversation</p>
                    <h2 className="mt-4 max-w-lg font-heading text-4xl font-bold tracking-tight md:text-5xl">
                        From job condition to field plan.
                    </h2>
                </div>
                <div className="border-t border-white/25">
                    {steps.map((step) => (
                        <div key={step.number} className="grid gap-4 border-b border-white/15 py-8 md:grid-cols-[3rem_0.7fr_1fr]">
                            <span className="font-mono text-xs text-concrete/35">{step.number}</span>
                            <h3 className="font-heading text-lg font-bold text-concrete">{step.title}</h3>
                            <p className="font-sans text-sm leading-6 text-concrete/60">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
