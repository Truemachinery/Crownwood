import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-asphalt pt-20 text-concrete">
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[58%]">
        <Image
          src="/images/field/permabase-black-application.webp"
          alt="Crownwood tanker applying Permabase Black to an unpaved road"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[45%_48%] opacity-45 lg:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/15" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-9 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-24">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/75 sm:text-xs">
          <span className="h-2 w-2 bg-crown-red" aria-hidden="true" />
          Texas roots. Ground-level solutions.
        </div>
        <h1 className="mt-9 font-bebas text-[clamp(3.75rem,12.5vw,11.5rem)] font-normal uppercase leading-[0.83] tracking-[-0.025em]">
          Pave
          <br />
          differently<span className="text-crown-red">.</span>
        </h1>
        <p className="mt-8 max-w-md font-sans text-base leading-7 text-concrete/80 md:mt-10 md:text-lg md:leading-8">
          Better ground starts here. Soil stabilizers, road maintenance
          products, and crews ready for the work ahead.
        </p>
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Link
            href="/chemicals/permabase-black"
            className="inline-flex min-h-14 items-center justify-center gap-6 bg-crown-red px-6 text-sm font-semibold text-white transition-colors hover:bg-[#bb0023] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Discover Permabase Black{" "}
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/#chemicals"
            className="inline-flex items-center gap-3 py-3 text-sm font-medium text-white hover:text-white/70"
          >
            Explore our products{" "}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-6 lg:mt-24">
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/65">
            <span>Soil stabilization</span>
            <span>Road maintenance</span>
            <span>Construction services</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/65">
            Based in San Antonio, TX
          </span>
        </div>
      </div>
    </section>
  );
}
