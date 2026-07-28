import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("concrete")!;
export const metadata = buildServiceMetadata(service);

export default function ConcretePage() {
    return <ServiceDetail service={service} />;
}
