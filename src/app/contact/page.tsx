import { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Contact | Crownwood Chemicals",
    description:
        "Get in touch with Crownwood Chemicals for soil stabilization, asphalt paving, sealcoating, and industrial construction services across Texas.",
    keywords: ["Contact Crownwood Chemicals", "San Antonio Asphalt Paving Quote", "Soil Stabilizer Quote Texas", "Commercial Construction Quote San Antonio", "Crownwood Chemicals Phone"],
    openGraph: {
        title: "Contact Crownwood Chemicals",
        description: "Request a quote or schedule a site assessment for soil stabilization, asphalt paving, sealcoating, or industrial construction in Texas.",
        type: "website",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactPageContent />;
}
