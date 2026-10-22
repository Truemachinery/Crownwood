import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const productGroups = [
  {
    name: "Soil stabilization",
    description:
      "Products for treating soil and controlling dust before or instead of a conventional wearing surface.",
    links: [
      {
        name: "Permabase",
        note: "Clear soil stabilizer and dust-control treatment",
        href: "/chemicals/permabase",
      },
      {
        name: "Permabase Black",
        note: "Polymer-acrylic stabilization with a dark finish for caliche and low-speed roads",
        href: "/chemicals/permabase-black",
      },
    ],
  },
  {
    name: "Road maintenance",
    description:
      "The full PCT Fastphalt line for dust, patching, preservation, release, and equipment cleaning.",
    links: [
      {
        name: "All PCT road products",
        note: "Compare eight products by job and published specification",
        href: "/chemicals/road-building-products",
      },
      {
        name: "PHPM-50",
        note: "PCT now calls it FP PrimePatch; no-heat tack membrane for patches and overlays",
        href: "/chemicals/phpm-50",
      },
    ],
  },
  {
    name: "Asphalt equipment care",
    description:
      "Products used before and after paving to reduce sticking and remove cured material.",
    links: [
      {
        name: "MeltDown MR-1",
        note: "Asphalt remover and release agent",
        href: "/chemicals/meltdown",
      },
      {
        name: "Banana Slide + Monkey Business",
        note: "PCT release and D-limonene cleaning products",
        href: "/chemicals/banana-slide",
      },
    ],
  },
];

export function ProductCatalog() {
  return (
    <section className="bg-white px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-industrial/65">
              Products
            </p>
            <h2 className="mt-4 font-bebas text-5xl font-normal uppercase leading-none tracking-tight text-industrial md:text-6xl">
              The right material. For the work ahead.
            </h2>
          </div>
          <p className="max-w-2xl font-sans text-lg leading-8 text-industrial/65">
            From landscape beds to dirt tracks and working roads, start with
            your surface. Explore the products, find your application, and
            connect with the Crownwood team.
          </p>
        </div>

        <section aria-labelledby="new-products-title" className="mb-16">
          <h3 id="new-products-title" className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-industrial/70">
            <span className="h-2 w-2 bg-crown-red" aria-hidden="true" />
            New from Crownwood
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            <Link href="/chemicals/yardbond" className="group flex flex-col border border-black/10 bg-concrete p-7 text-asphalt transition-colors hover:border-crown-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crown-red lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.13em]">
                <span className="text-asphalt/65">Landscape / 01</span>
                <span className="border border-black/20 px-2.5 py-1.5 text-asphalt/75">Amazon launch planned</span>
              </div>
              <h4 className="mt-9 font-bebas text-5xl font-normal uppercase leading-none tracking-[-0.01em] sm:text-6xl lg:text-7xl">YardBond<span className="text-crown-red">.</span></h4>
              <p className="mt-3 text-lg font-medium leading-6">Mulch & rock glue concentrate</p>
              <div className="my-8 flex items-baseline gap-2 border-y border-black/15 py-6 sm:gap-3" role="img" aria-label="One gallon of concentrate makes four gallons of mixed product">
                <span className="font-bebas text-6xl leading-none text-crown-red" aria-hidden="true">1</span>
                <span className="font-mono text-[10px] uppercase text-asphalt/65" aria-hidden="true">gal</span>
                <ArrowRight className="mx-1 h-5 w-5 shrink-0 text-asphalt/45 sm:mx-2" aria-hidden="true" />
                <span className="font-bebas text-6xl leading-none text-crown-red" aria-hidden="true">4</span>
                <span className="font-mono text-[10px] uppercase text-asphalt/65" aria-hidden="true">gal mixed</span>
              </div>
              <p className="mb-8 max-w-sm text-sm leading-6 text-asphalt/70">One concentrate. Two landscape applications. Get to know Crownwood’s mulch and decorative rock glue.</p>
              <span className="mt-auto flex items-center justify-between gap-4 border-t border-black/15 pt-5 text-sm font-semibold">Explore YardBond <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
            </Link>
            <Link href="/chemicals/bermbond" className="group flex flex-col border border-asphalt bg-asphalt p-7 text-concrete transition-colors hover:border-crown-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crown-red lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.13em]">
                <span className="text-concrete/65">Track / 02</span>
                <span className="border border-white/25 px-2.5 py-1.5 text-concrete/80">Supplied in totes</span>
              </div>
              <h4 className="mt-9 font-bebas text-5xl font-normal uppercase leading-none tracking-[-0.01em] sm:text-6xl lg:text-7xl">BermBond<span className="text-crown-red">.</span></h4>
              <p className="mt-3 text-lg font-medium leading-6">BMX dirt track glue</p>
              <div className="my-8 border-y border-white/20 py-6">
                <p className="font-bebas text-4xl font-normal uppercase leading-[0.94] tracking-[0.01em] lg:text-5xl">Every track<br />starts with the dirt.</p>
              </div>
              <p className="mb-8 max-w-sm text-sm leading-6 text-concrete/75">BMX dirt track glue in totes for your next build or maintenance project. Tell us about your dirt, your layout, and the work ahead.</p>
              <span className="mt-auto flex items-center justify-between gap-4 border-t border-white/20 pt-5 text-sm font-semibold">Explore BermBond <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
            </Link>
          </div>
        </section>

        <div className="grid border-y-2 border-industrial lg:grid-cols-3">
          {productGroups.map((group) => (
            <section
              key={group.name}
              className="border-b border-black/15 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <h3 className="font-heading text-2xl font-bold text-industrial">
                {group.name}
              </h3>
              <p className="mt-4 min-h-20 font-sans text-sm leading-6 text-industrial/60">
                {group.description}
              </p>
              <div className="mt-7 border-t border-black/15">
                {group.links.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="group block border-b border-black/15 py-5"
                  >
                    <span className="flex items-center justify-between gap-3 font-heading text-sm font-bold text-industrial group-hover:text-crown-red">
                      {product.name}{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="mt-2 block font-sans text-xs leading-5 text-industrial/65">
                      {product.note}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
