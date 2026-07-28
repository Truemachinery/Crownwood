import { CoreProductDetail } from "@/components/CoreProductDetail";
import { buildCoreProductMetadata, getCoreProduct } from "@/lib/coreProducts";

export const dynamic = "force-static";
const product = getCoreProduct("permabase-black")!;
export const metadata = buildCoreProductMetadata(product);

export default function PermabaseBlackPage() {
    return <CoreProductDetail product={product} />;
}
