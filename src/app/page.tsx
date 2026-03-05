import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Philosophy } from "@/components/Philosophy";
import { Protocol } from "@/components/Protocol";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-concrete overflow-hidden">
      <Navbar />
      <Hero />
      <div id="chemicals" className="scroll-mt-24">
        <Features />
      </div>

      {/* Permabase Black Video Showcase */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div>
              <p className="font-mono text-safety-amber text-xs uppercase tracking-[0.3em] mb-4">
                Featured Product
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight mb-6">
                Permabase <span className="text-[#E6FF00]">Black™</span>
              </h2>
              <p className="font-mono text-concrete/70 text-sm leading-relaxed mb-8">
                Watch our crew apply Permabase Black™ — the polymer-based wearing surface that delivers an asphalt-grade finish at a fraction of the cost. Permanent soil stabilization meets premium aesthetics.
              </p>
              <Link
                href="/chemicals/permabase-black"
                className="inline-block bg-[#E6FF00] text-[#111111] px-8 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
              >
                View Full Specs →
              </Link>
            </div>

            {/* Video Side */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[500px]">
              <video
                className="w-full h-full max-h-[500px] object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/Videos/IMG_0705.MOV" type="video/quicktime" />
                <source src="/Videos/IMG_0705.MOV" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

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
