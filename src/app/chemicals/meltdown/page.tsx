import { CoreProductDetail } from "@/components/CoreProductDetail";
import { buildCoreProductMetadata, getCoreProduct } from "@/lib/coreProducts";

export const dynamic = "force-static";
const product = getCoreProduct("meltdown")!;
export const metadata = buildCoreProductMetadata(product);

export default function MeltdownPage() {
    return <CoreProductDetail product={product} />;
}
