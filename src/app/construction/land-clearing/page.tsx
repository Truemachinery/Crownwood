import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("land-clearing")!;
export const metadata = buildServiceMetadata(service);

export default function LandClearingPage() {
    return <ServiceDetail service={service} />;
}
