import { CoreProductDetail } from "@/components/CoreProductDetail";
import { buildCoreProductMetadata, getCoreProduct } from "@/lib/coreProducts";

export const dynamic = "force-static";
const product = getCoreProduct("permabase")!;
export const metadata = buildCoreProductMetadata(product);

export default function PermabasePage() {
    return <CoreProductDetail product={product} />;
}
