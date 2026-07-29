import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoadProductDetail } from "@/components/RoadProductDetail";
import { getRoadProduct, roadProducts } from "@/lib/roadProducts";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return roadProducts
        .filter((product) => product.slug !== "phpm-50")
        .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getRoadProduct(slug);
    if (!product) return {};

    return {
        title: `${product.displayName} | Crownwood Chemicals`,
        description: product.summary,
        keywords: product.keywords,
        alternates: { canonical: `/chemicals/${product.slug}` },
        openGraph: {
            title: `${product.displayName} | PCT Fastphalt Road Product`,
            description: product.summary,
            images: [{ url: product.image }],
        },
    };
}

export default async function RoadProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getRoadProduct(slug);
    if (!product || product.slug === "phpm-50") notFound();

    return <RoadProductDetail product={product} />;
}
