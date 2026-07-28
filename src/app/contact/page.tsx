import { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Contact | Crownwood Chemicals",
    description:
        "Contact Crownwood Chemicals about road products, soil treatment, asphalt maintenance materials, and construction services in Texas.",
    keywords: ["Contact Crownwood Chemicals", "San Antonio Asphalt Paving Quote", "Soil Stabilizer Quote Texas", "Commercial Construction Quote San Antonio", "Crownwood Chemicals Phone"],
    openGraph: {
        title: "Contact Crownwood Chemicals",
        description: "Request product information or discuss a construction project with Crownwood Chemicals.",
        type: "website",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return <ContactPageContent />;
}
