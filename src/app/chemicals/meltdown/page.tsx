import { Metadata } from "next";
import { MeltdownNav } from "@/components/meltdown/MeltdownNav";
import { MeltdownHero } from "@/components/meltdown/MeltdownHero";
import { MeltdownTrustBar } from "@/components/meltdown/MeltdownTrustBar";
import { MeltdownComparison } from "@/components/meltdown/MeltdownComparison";
import { MeltdownFeatures } from "@/components/meltdown/MeltdownFeatures";
import { MeltdownApplications } from "@/components/meltdown/MeltdownApplications";
import { MeltdownHowToUse } from "@/components/meltdown/MeltdownHowToUse";
import { MeltdownPricing } from "@/components/meltdown/MeltdownPricing";
import { MeltdownReviews } from "@/components/meltdown/MeltdownReviews";
import { MeltdownFAQ } from "@/components/meltdown/MeltdownFAQ";
import { MeltdownCTA } from "@/components/meltdown/MeltdownCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "MeltDown MR-1 | Soy-Based Asphalt Remover & Release Agent",
    description: "One drum replaces two products. MeltDown MR-1 is a high-performance, soy-based asphalt remover and release agent. Removes cured asphalt, tar, and tack oil while preventing adhesion.",
};

export default function MeltdownPage() {
    // Note: The global Navbar built into the homepage doesn't automatically show here since it's not in layout.tsx
    // The design prompt asks for a custom STICKY NAVIGATION just for this page, so we use MeltdownNav.
    return (
        <main className="min-h-screen bg-[#111111] text-[#F5F3EE] flex flex-col font-sans overflow-x-hidden">
            <MeltdownNav />
            <MeltdownHero />
            <MeltdownTrustBar />
            <MeltdownComparison />
            <MeltdownFeatures />
            <MeltdownApplications />
            <MeltdownHowToUse />
            <MeltdownPricing />
            <MeltdownReviews />
            <MeltdownFAQ />
            <MeltdownCTA />
            <Footer />
        </main>
    );
}
