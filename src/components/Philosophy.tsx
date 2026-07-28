const commitments = [
    ["Published facts stay published facts", "We identify the manufacturer behind a product and link the available technical sheet. We do not turn a short brochure into invented specifications."],
    ["Unknowns stay visible", "If coverage, cure time, packaging, certification, or surface compatibility is missing, we say so and confirm it before the job."],
    ["The recommendation starts with the site", "Traffic, pavement type, soil, equipment, drainage, schedule, and agency requirements determine the product and process."],
];

export function Philosophy() {
    return (
        <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">How we communicate</p>
                    <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-industrial md:text-5xl">
                        Useful information beats big promises.
                    </h2>
                    <p className="mt-6 font-sans text-lg leading-8 text-industrial/65">
                        Road products are technical purchases. The site should help you narrow the choice and prepare better questions, not bury you in slogans.
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
