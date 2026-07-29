const commitments = [
    ["A product matched to the job", "Traffic, pavement condition, soil, equipment, drainage, and schedule all shape the recommendation."],
    ["A quote you can build around", "Get current pricing, availability, quantity guidance, and the documents your crew or owner needs."],
    ["Support beyond the order", "Crownwood stays available for application planning, field questions, and the next phase of work."],
];

export function Philosophy() {
    return (
        <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Why Crownwood</p>
                    <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-industrial md:text-5xl">
                        Start with the site. Finish with the right material.
                    </h2>
                    <p className="mt-6 font-sans text-lg leading-8 text-industrial/65">
                        Tell us what you are building, repairing, or maintaining. We will help narrow the options and put together a practical order for the work ahead.
                    </p>
                </div>
                <div className="mt-14 grid border-y border-black/15 md:grid-cols-3">
                    {commitments.map(([title, description], index) => (
                        <div key={title} className="border-b border-black/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                            <span className="font-mono text-xs text-safety-amber">0{index + 1}</span>
                            <h3 className="mt-4 font-heading text-xl font-bold text-industrial">{title}</h3>
                            <p className="mt-4 font-sans text-sm leading-6 text-industrial/60">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
