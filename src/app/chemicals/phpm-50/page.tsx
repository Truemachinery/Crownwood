import type { Metadata } from "next";
import { RoadProductDetail } from "@/components/RoadProductDetail";
import { getRoadProduct } from "@/lib/roadProducts";

export const dynamic = "force-static";

const product = getRoadProduct("phpm-50")!;

export const metadata: Metadata = {
    title: "PHPM-50 Tack Membrane | Crownwood Chemicals",
    description: product.summary,
    keywords: product.keywords,
    alternates: { canonical: "/chemicals/phpm-50" },
    openGraph: {
        title: "PHPM-50 / FP PrimePatch | PCT Fastphalt",
        description: product.summary,
        images: [{ url: product.image }],
    },
};

export default function Phpm50Page() {
    return <RoadProductDetail product={product} />;
}
