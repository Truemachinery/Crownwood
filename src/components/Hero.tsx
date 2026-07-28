import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[760px] overflow-hidden bg-asphalt px-6 pb-20 pt-40 text-concrete md:px-12 lg:px-24">
            <video aria-hidden="true" autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-45">
                <source src="/Videos/IMG_0705.MOV" type="video/quicktime" />
                <source src="/Videos/IMG_0705.MOV" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/90 to-asphalt/20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-asphalt to-transparent" />

            <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-end">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-safety-amber">
                    Materials, maintenance, and construction | San Antonio, Texas
                </p>
                <h1 className="mt-6 max-w-5xl text-balance font-heading text-5xl font-bold leading-[0.94] tracking-[-0.045em] md:text-7xl lg:text-[6rem]">
                    Road products and site work, explained clearly.
                </h1>
                <p className="mt-8 max-w-2xl font-sans text-lg leading-8 text-concrete/75 md:text-xl">
                    Crownwood supplies soil and asphalt-maintenance products, including the PCT Fastphalt road line, and provides paving, concrete, clearing, striping, sealcoating, and hydroseeding services across the San Antonio area.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link href="/chemicals/road-building-products" className="inline-flex items-center justify-center gap-3 bg-safety-amber px-7 py-4 font-heading text-sm font-bold text-asphalt hover:bg-white">
                        Browse road products <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-3 border border-white/30 bg-black/20 px-7 py-4 font-heading text-sm font-bold text-concrete hover:border-white">
                        Discuss a project
                    </Link>
                </div>

                <div className="mt-14 grid max-w-4xl grid-cols-1 border-t border-white/20 pt-6 font-mono text-[11px] uppercase tracking-wider text-concrete/55 sm:grid-cols-3">
                    <span className="py-2 sm:border-r sm:border-white/15 sm:pr-6">Product selection</span>
                    <span className="py-2 sm:border-r sm:border-white/15 sm:px-6">Quantity planning</span>
                    <span className="py-2 sm:pl-6">Technical document review</span>
                </div>
            </div>
        </section>
    );
}
