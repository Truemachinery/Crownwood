import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("asphalt-paving")!;
export const metadata = buildServiceMetadata(service);

export default function AsphaltPavingPage() {
    return <ServiceDetail service={service} />;
}
