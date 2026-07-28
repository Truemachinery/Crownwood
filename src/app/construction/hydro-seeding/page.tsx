import { ServiceDetail } from "@/components/ServiceDetail";
import { buildServiceMetadata, getServicePage } from "@/lib/servicePages";

export const dynamic = "force-static";
const service = getServicePage("hydro-seeding")!;
export const metadata = buildServiceMetadata(service);

export default function HydroSeedingPage() {
    return <ServiceDetail service={service} />;
}
