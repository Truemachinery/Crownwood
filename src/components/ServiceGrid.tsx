import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicePages } from "@/lib/servicePages";

export function ServiceGrid() {
    return (
        <section className="bg-concrete px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/45">Construction services</p>
                        <h2 className="mt-4 max-w-lg font-heading text-4xl font-bold tracking-tight text-industrial md:text-5xl">
                            Field crews for the work around the product.
                        </h2>
                        <p className="mt-6 max-w-md font-sans leading-7 text-industrial/65">
                            Crownwood handles commercial and municipal scopes in San Antonio and surrounding areas. Start with the service page, then send the site, quantity, timing, and access details.
                        </p>
                    </div>

                    <div className="grid gap-px bg-black/15 sm:grid-cols-2">
                        {servicePages.map((service, index) => (
                            <Link key={service.slug} href={`/construction/${service.slug}`} className="group bg-white">
                                <div className="relative aspect-[16/9] overflow-hidden bg-asphalt">
                                    <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <span className="absolute left-4 top-4 bg-asphalt px-2 py-1 font-mono text-[10px] text-white">0{index + 1}</span>
                                </div>
                                <div className="p-6">
                                <span className="flex items-start justify-between gap-4">
                                    <h3 className="font-heading text-xl font-bold text-industrial group-hover:text-safety-amber">{service.name}</h3>
                                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                                </span>
                                <p className="mt-3 font-sans text-sm leading-6 text-industrial/60">{service.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
