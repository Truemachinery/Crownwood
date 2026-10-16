import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const applications = [
  "Ranch & rural roads",
  "Caliche & unpaved surfaces",
  "Laydown yards & work sites",
];

export function HomepageShowcases() {
  return (
    <section
      className="bg-concrete px-6 py-20 text-asphalt md:px-12 md:py-28 lg:px-20"
      aria-labelledby="flagship-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-5 border-b border-black/20 pb-5">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="h-2 w-2 bg-crown-red" aria-hidden="true" />
            The Crownwood flagship
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-asphalt/60">
            01 / Soil stabilization
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <h2
              id="flagship-heading"
              className="font-bebas text-[clamp(4.5rem,7.5vw,7.5rem)] font-normal uppercase leading-[0.9] tracking-[-0.015em]"
            >
              Permabase
              <br />
              <span className="text-crown-red">Black.</span>
            </h2>
            <h3 className="mt-7 max-w-md text-xl font-medium leading-snug md:text-2xl">
              Stronger ground.
              <br />A whole new surface.
            </h3>
            <p className="mt-5 max-w-md text-base leading-7 text-asphalt/65">
              A polymer-acrylic soil stabilizer with a carbon-black tint. It
              binds soil and aggregate, controls dust, and brings an
              asphalt-like appearance to suitable low-speed roads and work
              sites.
            </p>
            <div className="mt-7 max-w-md border-t border-black/15">
              {applications.map((application) => (
                <p
                  key={application}
                  className="flex items-center gap-3 border-b border-black/15 py-3 text-sm"
                >
                  <span className="h-1 w-1 bg-crown-red" aria-hidden="true" />
                  {application}
                </p>
              ))}
            </div>
            <Link
              href="/chemicals/permabase-black"
              className="mt-8 inline-flex min-h-14 items-center gap-8 bg-asphalt px-6 text-sm font-semibold text-white transition-colors hover:bg-crown-red"
            >
              Meet Permabase Black{" "}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <figure className="relative bg-asphalt">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-crown-red" aria-hidden="true" />{" "}
                In the field
              </span>
              <span className="text-concrete/60">Crownwood / Texas</span>
            </div>
            <video
              className="aspect-[4/5] w-full bg-asphalt object-contain object-center sm:aspect-[5/4] lg:aspect-[4/5]"
              controls
              playsInline
              preload="none"
              poster="/images/field/permabase-black-application.webp"
              aria-label="Permabase Black road application footage"
              aria-describedby="homepage-field-caption"
            >
              <source
                src="/Videos/permabase-black-application.mp4"
                type="video/mp4"
              />
              <p>
                Your browser does not support this video.{" "}
                <a href="/Videos/permabase-black-application.mp4">
                  Download the application video.
                </a>
              </p>
            </video>
            <figcaption
              id="homepage-field-caption"
              className="flex items-center justify-between gap-6 border-t border-white/15 px-5 py-5 text-xs leading-5 text-concrete/70"
            >
              A tanker sprays treatment across the prepared road.
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-white">
                Field footage
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
