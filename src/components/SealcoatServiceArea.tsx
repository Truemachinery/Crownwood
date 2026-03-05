import { MapPin, ArrowUpRight, Crosshair } from "lucide-react";
import Link from "next/link";

export function SealcoatServiceArea() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "PavingContractor",
        "name": "Crownwood Chemicals - Sealcoat Division",
        "image": "https://new.tmlabz.com/images/sealcoat-hero.png",
        "description": "Commercial parking lot sealcoating, asphalt preservation, and ADA striping serving San Antonio, TX, and Bexar County.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Antonio",
            "addressRegion": "TX",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "29.4241",
            "longitude": "-98.4936"
        },
        "areaServed": {
            "@type": "City",
            "name": "San Antonio"
        },
        "telephone": "+1-800-000-0000",
        "priceRange": "$$$"
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative border-t border-black/5">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial/5 text-industrial rounded-full font-mono text-xs uppercase tracking-widest mb-6">
                        <Crosshair className="w-3 h-3 text-safety-amber" />
                        Texas Fleet Deployment
                    </div>

                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6">
                        Serving <span className="text-safety-amber">San Antonio</span> & Beyond
                    </h2>

                    <p className="font-sans text-xl text-industrial/70 leading-relaxed mb-8">
                        Our high-capacity sealcoating trucks and striping crews operate rapidly across San Antonio, minimizing downtime for commercial plazas, industrial parks, and HOA communities. We work around your schedule, including night and weekend deployments.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {['San Antonio', 'Alamo Heights', 'Stone Oak', 'Live Oak', 'Converse', 'Leon Valley'].map(city => (
                            <div key={city} className="flex items-center gap-3 font-heading font-bold text-industrial/80 uppercase">
                                <div className="w-2 h-2 rounded-full bg-safety-amber" />
                                {city}
                            </div>
                        ))}
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-3 font-heading font-bold text-lg uppercase tracking-wider text-industrial hover:text-safety-amber transition-colors group">
                        Request Pavement Assessment
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square max-w-lg bg-concrete rounded-3xl overflow-hidden shadow-2xl border border-black/10">
                    <img
                        src="/images/sealcoat-service-area.png"
                        alt="Aerial map of San Antonio commercial center"
                        className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border border-safety-amber/30 rounded-full animate-ping opacity-20" />
                        <div className="absolute w-32 h-32 border border-safety-amber/50 rounded-full flex items-center justify-center bg-safety-amber/10 backdrop-blur-sm">
                            <MapPin className="w-10 h-10 text-industrial" />
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-black/5">
                        <div className="font-mono text-xs uppercase tracking-widest text-industrial/70 mb-1">Service Radius</div>
                        <div className="font-heading font-bold text-lg text-industrial uppercase">San Antonio Metro District</div>
                    </div>
                </div>

            </div>
        </section>
    );
}
