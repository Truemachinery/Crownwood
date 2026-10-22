import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const productLinks = [
  ["Permabase Black", "/chemicals/permabase-black"],
  ["YardBond · Mulch & rock glue", "/chemicals/yardbond"],
  ["BermBond · BMX track glue", "/chemicals/bermbond"],
  ["Permabase", "/chemicals/permabase"],
  ["MeltDown MR-1", "/chemicals/meltdown"],
  ["Road maintenance products", "/chemicals/road-building-products"],
];

const serviceLinks = [
  ["Asphalt paving", "/construction/asphalt-paving"],
  ["Concrete", "/construction/concrete"],
  ["Sealcoating", "/construction/sealcoat"],
  ["Striping", "/construction/striping"],
  ["Land clearing", "/construction/land-clearing"],
  ["Hydroseeding", "/construction/hydro-seeding"],
];

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-asphalt px-6 pb-8 pt-16 text-concrete md:px-12 md:pt-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/20 pb-14 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/55">
              Your next project starts here.
            </p>
            <h2 className="mt-4 font-bebas text-6xl font-normal uppercase leading-none tracking-[-0.01em] md:text-7xl">
              Let’s get to work<span className="text-crown-red">.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center gap-8 bg-crown-red px-6 text-sm font-semibold text-white transition-colors hover:bg-[#bb0023]"
          >
            Talk about your project{" "}
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-x-10 gap-y-12 border-b border-white/15 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1.1fr]">
          <div>
            <Link
              href="/"
              aria-label="Crownwood Chemicals home"
              className="inline-flex items-center gap-3"
            >
              <svg
                className="h-7 w-8 text-crown-red"
                viewBox="0 0 32 28"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2 5 10 11 16 1 22 11 30 5 26 23H6L2 5ZM6 26H26V28H6Z" />
              </svg>
              <span className="font-bebas text-3xl leading-none tracking-[0.045em]">
                Crownwood
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-concrete/60">
              Road and soil products. Construction services. Practical solutions
              from the ground up.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/50">
              San Antonio, Texas
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/50">
              Products
            </h3>
            <ul className="mt-6 space-y-3">
              {productLinks.map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-concrete/75 transition-colors hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/50">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {serviceLinks.map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-concrete/75 transition-colors hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete/50">
              Let’s talk
            </h3>
            <a
              href="tel:+12107925236"
              className="mt-5 inline-block text-xl font-medium text-white hover:text-concrete/75"
            >
              210-792-5236
            </a>
            <a
              href="mailto:nate@crownwoodchemicals.com"
              className="mt-3 block break-words text-sm text-concrete/75 hover:text-white"
            >
              nate@crownwoodchemicals.com
            </a>
            <address className="mt-6 text-xs not-italic leading-6 text-concrete/50">
              6454 Lake Superior St
              <br />
              San Antonio, TX 78222
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 font-mono text-[9px] uppercase tracking-[0.13em] text-concrete/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Crownwood Chemicals LLC</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <Link href="/knowledge-hub" className="hover:text-white">
              Knowledge hub
            </Link>
            <span>Pave differently.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
