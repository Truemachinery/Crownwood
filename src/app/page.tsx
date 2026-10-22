import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProductCatalog } from "@/components/ProductCatalog";
import { HomepageShowcases } from "@/components/HomepageShowcases";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Crownwood Chemicals | Pave Differently",
  description:
    "Explore YardBond mulch and rock glue, BermBond BMX track glue, Permabase Black soil stabilization, and construction services from Crownwood Chemicals.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-asphalt">
        <Hero />
        <HomepageShowcases />
        <div id="chemicals" className="scroll-mt-20">
          <ProductCatalog />
        </div>
        <section
          className="border-y border-white/15 bg-asphalt px-6 py-14 text-concrete md:px-12 lg:px-20"
          aria-label="Project planning"
        >
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-12">
            {[
              [
                "01",
                "Start with the site.",
                "Soil, traffic, drainage, and the job ahead. We help you find the right fit.",
              ],
              [
                "02",
                "Build a practical plan.",
                "Application guidance, material quantities, and current pricing for your project.",
              ],
              [
                "03",
                "Put it to work.",
                "Products and field services, with a direct line to the Crownwood team.",
              ],
            ].map(([number, title, description]) => (
              <div key={number} className="border-l border-white/20 pl-6">
                <span className="font-mono text-[10px] text-crown-red">
                  {number}
                </span>
                <h2 className="mt-4 text-xl font-medium">{title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-concrete/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <div id="construction" className="scroll-mt-20">
          <ServiceGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
