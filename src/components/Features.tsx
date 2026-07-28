const capabilities = [
    {
        number: "01",
        title: "Road and soil products",
        description: "Dust control, soil stabilization, tack, patch binders, surface preservation, asphalt release, and equipment cleaners.",
    },
    {
        number: "02",
        title: "Construction services",
        description: "Field crews for asphalt, concrete, sealcoating, striping, land clearing, grading, and hydroseeding in the San Antonio area.",
    },
    {
        number: "03",
        title: "Project-specific guidance",
        description: "Clear product fit, published specifications, missing technical details, and next questions before you commit material or crews.",
    },
];

export function Features() {
    return (
        <section className="border-b border-black/10 bg-concrete px-6 py-20 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">What Crownwood does</p>
                        <h2 className="mt-4 max-w-md font-heading text-4xl font-bold leading-tight tracking-tight text-industrial md:text-5xl">
                            One call for the material and the field work.
                        </h2>
                    </div>
                    <div className="border-t-2 border-industrial">
                        {capabilities.map((capability) => (
                            <div key={capability.number} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[3rem_0.7fr_1fr]">
                                <span className="font-mono text-xs text-industrial/35">{capability.number}</span>
                                <h3 className="font-heading text-lg font-bold text-industrial">{capability.title}</h3>
                                <p className="font-sans text-sm leading-6 text-industrial/65">{capability.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
