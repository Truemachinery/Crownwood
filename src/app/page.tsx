import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Philosophy } from "@/components/Philosophy";
import { Protocol } from "@/components/Protocol";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProductCatalog } from "@/components/ProductCatalog";
import { HomepageShowcases } from "@/components/HomepageShowcases";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-asphalt overflow-hidden">
      <Navbar />
      <Hero />
      <div id="chemicals" className="scroll-mt-24">
        <Features />
      </div>
      <ProductCatalog />
      <HomepageShowcases />
      <Philosophy />
      <div id="protocol">
        <Protocol />
      </div>
      <div id="construction" className="scroll-mt-24">
        <ServiceGrid />
      </div>
      <Footer />
    </main>
  );
}
