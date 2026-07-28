import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("striping")!;
export const metadata = buildServiceMetadata(service);

export default function StripingPage() {
    return <ServiceDetail service={service} />;
}
