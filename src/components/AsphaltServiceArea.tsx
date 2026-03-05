import { MapPin, ArrowUpRight, Crosshair } from "lucide-react";
import Link from "next/link";

export function AsphaltServiceArea() {
    // Generate JSON-LD LocalBusiness Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "PavingContractor",
        "name": "Crownwood Chemicals - Asphalt Paving Division",
        "image": "https://new.tmlabz.com/logo.png",
        "description": "Elite asphalt paving, parking lot tear-outs, and heavy infrastructure construction serving San Antonio, TX, and Bexar County.",
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
        "priceRange": "$$$$"
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative border-t border-black/5">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                {/* Content Side */}
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial/5 text-industrial rounded-full font-mono text-xs uppercase tracking-widest mb-6">
                        <Crosshair className="w-3 h-3 text-safety-amber" />
                        South Texas Operations
                    </div>

                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-industrial uppercase tracking-tight mb-6">
                        Serving <span className="text-safety-amber">San Antonio</span> & Bexar County
                    </h2>

                    <p className="font-sans text-xl text-industrial/70 leading-relaxed mb-8">
                        Our equipment yard and chemical manufacturing facilities are strategically located to dispatch elite paving crews rapidly across the San Antonio metropolitan area. We understand the specific geotechnical demands of building on Edwards Plateau limestone and the surrounding expansive clay belts.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {['San Antonio', 'New Braunfels', 'Boerne', 'Schertz', 'Helotes', 'Seguin'].map(city => (
                            <div key={city} className="flex items-center gap-3 font-heading font-bold text-industrial/80 uppercase">
                                <div className="w-2 h-2 rounded-full bg-safety-amber" />
                                {city}
                            </div>
                        ))}
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-3 font-heading font-bold text-lg uppercase tracking-wider text-industrial hover:text-safety-amber transition-colors group">
                        Contact Operations
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Map/Visual Side */}
                <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square max-w-lg bg-concrete rounded-3xl overflow-hidden shadow-2xl border border-black/10">
                    <img
                        src="/images/asphalt-service-area.png"
                        alt="Aerial view of San Antonio infrastructure"
                        className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    />

                    {/* Radar / Target Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border border-safety-amber/30 rounded-full animate-ping opacity-20" />
                        <div className="absolute w-32 h-32 border border-safety-amber/50 rounded-full flex items-center justify-center bg-safety-amber/10 backdrop-blur-sm">
                            <MapPin className="w-10 h-10 text-industrial" />
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-black/5">
                        <div className="font-mono text-xs uppercase tracking-widest text-industrial/70 mb-1">HQ Location</div>
                        <div className="font-heading font-bold text-lg text-industrial uppercase">San Antonio Division</div>
                    </div>
                </div>

            </div>
        </section>
    );
}
