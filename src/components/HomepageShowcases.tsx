import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomepageShowcases() {
    return (
        <section className="border-y border-white/10 bg-asphalt px-6 py-24 text-concrete md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    <article>
                        <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-industrial">
                            <video className="h-full w-full object-cover" controls playsInline preload="metadata">
                                <source src="/Videos/IMG_0705.MOV" type="video/quicktime" />
                                <source src="/Videos/IMG_0705.MOV" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-safety-amber">Application video</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold">Permabase Black</h2>
                        <p className="mt-4 max-w-xl font-sans leading-7 text-concrete/60">
                            See the tinted soil treatment being applied, then review the product page for use cases, process notes, and project questions.
                        </p>
                        <Link href="/chemicals/permabase-black" className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-concrete hover:text-safety-amber">
                            Review Permabase Black <ArrowRight className="h-4 w-4" />
                        </Link>
                    </article>

                    <article>
                        <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-white">
                            <Image src="/Meltdown.png" alt="MeltDown MR-1 product container" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-10" />
                        </div>
                        <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-safety-amber">Equipment care</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold">MeltDown MR-1</h2>
                        <p className="mt-4 max-w-xl font-sans leading-7 text-concrete/60">
                            A product for removing asphalt buildup and helping prevent material from adhering to paving equipment.
                        </p>
                        <Link href="/chemicals/meltdown" className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-concrete hover:text-safety-amber">
                            Review MeltDown MR-1 <ArrowRight className="h-4 w-4" />
                        </Link>
                    </article>
                </div>
            </div>
        </section>
    );
}
