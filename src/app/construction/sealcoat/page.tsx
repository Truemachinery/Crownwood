import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("sealcoat")!;
export const metadata = buildServiceMetadata(service);

export default function SealcoatPage() {
    return <ServiceDetail service={service} />;
}
