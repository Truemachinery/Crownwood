import Link from "next/link";
import { ArrowRight, Beaker, Droplets, Flame, Construction } from "lucide-react";

const products = [
    {
        name: "Permabase™",
        tagline: "Bio-Enzyme Soil Stabilizer",
        description: "Permanently alters expansive clay at the molecular level. Eliminates undercut-and-haul costs on failing subgrades.",
        href: "/chemicals/permabase",
        icon: Beaker,
        color: "from-blue-500/20 to-transparent",
        accent: "text-blue-400",
        border: "hover:border-blue-400/50",
    },
    {
        name: "Permabase Black™",
        tagline: "Tinted Soil Stabilizer & Wearing Surface",
        description: "Polymer-based wearing surface that delivers an asphalt-grade finish at a fraction of the cost. Stabilization meets aesthetics.",
        href: "/chemicals/permabase-black",
        icon: Droplets,
        color: "from-[#E6FF00]/10 to-transparent",
        accent: "text-[#E6FF00]",
        border: "hover:border-[#E6FF00]/50",
    },
    {
        name: "MeltDown MR-1",
        tagline: "2-in-1 Asphalt Remover & Release Agent",
        description: "Soy-based formula that cleans cured asphalt from equipment and doubles as a release agent. One drum replaces two products.",
        href: "/chemicals/meltdown",
        icon: Flame,
        color: "from-safety-amber/15 to-transparent",
        accent: "text-safety-amber",
        border: "hover:border-safety-amber/50",
    },
    {
        name: "PHPM-50™",
        tagline: "Pothole Patch & Tack Modifier",
        description: "High-performance pothole repair compound engineered for permanent, load-bearing patches in any weather condition.",
        href: "/chemicals/phpm-50",
        icon: Construction,
        color: "from-emerald-500/15 to-transparent",
        accent: "text-emerald-400",
        border: "hover:border-emerald-400/50",
    },
];

export function ProductCatalog() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative overflow-hidden border-t border-white/5">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,149,0,0.03)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="font-mono text-safety-amber text-xs uppercase tracking-[0.3em] mb-4">
                        Our Product Line
                    </p>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-4">
                        Industrial-Grade <span className="text-safety-amber">Chemical Solutions</span>
                    </h2>
                    <p className="font-sans text-concrete/60 text-base max-w-2xl mx-auto leading-relaxed">
                        Every product is manufactured in-house at our San Antonio facility. Engineered for Texas soils, built for nationwide deployment.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => {
                        const Icon = product.icon;
                        return (
                            <Link
                                key={product.name}
                                href={product.href}
                                className={`group relative bg-industrial/80 border border-white/5 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:bg-industrial hover:shadow-2xl hover:-translate-y-1 ${product.border}`}
                            >
                                {/* Background gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                                <div className="relative z-10">
                                    {/* Icon + Name */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${product.accent} group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-heading font-bold text-xl text-concrete uppercase tracking-tight group-hover:text-white transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className={`font-mono text-xs uppercase tracking-widest mt-0.5 ${product.accent}`}>
                                                {product.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="font-sans text-concrete/50 text-sm leading-relaxed mb-6 group-hover:text-concrete/70 transition-colors">
                                        {product.description}
                                    </p>

                                    {/* CTA Arrow */}
                                    <div className={`flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wider ${product.accent}`}>
                                        View Product
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
