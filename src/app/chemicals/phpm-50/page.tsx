import type { Metadata } from "next";
import { RoadProductDetail } from "@/components/RoadProductDetail";
import { getRoadProduct } from "@/lib/roadProducts";

export const dynamic = "force-static";

const product = getRoadProduct("phpm-50")!;

export const metadata: Metadata = {
    title: "FP PrimePatch (PHPM-50) Tack Membrane | Crownwood Chemicals",
    description: product.summary,
    keywords: product.keywords,
    alternates: { canonical: "/chemicals/phpm-50" },
    openGraph: {
        title: "FP PrimePatch (formerly PHPM-50) | PCT Fastphalt",
        description: product.summary,
    },
};

export default function PrimePatchPage() {
    return <RoadProductDetail product={product} />;
}
