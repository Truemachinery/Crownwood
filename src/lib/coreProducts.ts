import type { Metadata } from "next";

export type CoreProduct = {
    slug: string;
    name: string;
    category: string;
    title: string;
    summary: string;
    description: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    applications: { name: string; description: string }[];
    planningQuestions: string[];
    faqs: { question: string; answer: string }[];
    keywords: string[];
};

export const coreProducts: CoreProduct[] = [
    {
        slug: "permabase",
        name: "Permabase",
        category: "Soil treatment",
        title: "A soil-treatment option for cohesive native material.",
        summary: "Concentrated bio-enzyme soil treatment for projects evaluating subgrade conditioning, native-soil reuse, and dust control.",
        description: "Permabase is intended to be diluted, applied to suitable soil, mixed to the planned treatment depth, and compacted as part of a defined earthwork process. Product fit should be based on the soil, moisture, gradation, plasticity, treatment depth, density target, loading, and project specification - not a product name alone.",
        image: "/images/field/crownwood-road-application.webp",
        imageAlt: "Crownwood tanker applying road treatment to an unpaved surface",
        imageCaption: "Crownwood field application video still.",
        applications: [
            { name: "Subgrade treatment", description: "Evaluation of suitable native soil beneath roads, parking, pads, and other paved or working surfaces." },
            { name: "Unpaved roads and access", description: "Treatment planning for dirt or aggregate routes where dust and surface condition are recurring concerns." },
            { name: "Native-soil reuse", description: "Projects comparing treatment of on-site material with excavation, export, and imported base." },
            { name: "Working areas", description: "Yards, staging areas, and low-speed surfaces where the project criteria support a treated-soil system." },
        ],
        planningQuestions: ["What are the soil classification, plasticity, and gradation?", "What depth and area need treatment?", "What density, strength, or proof-roll criteria apply?", "How will moisture, mixing, grading, and compaction be controlled?", "What testing or demonstration section will verify the design?"],
        faqs: [
            { question: "Is Permabase suitable for every soil?", answer: "No soil-treatment product should be selected without understanding the material. Soil classification, fines, plasticity, moisture, gradation, organics, and the performance target all matter." },
            { question: "Can it replace excavation and imported base?", answer: "It may be evaluated as an alternative on suitable projects, but that decision depends on testing, design requirements, loading, drainage, and acceptance criteria." },
            { question: "What application rate should be used?", answer: "Use current Crownwood technical guidance for the tested soil and planned depth. A universal rate would not account for the soil, moisture, treatment depth, density target, or project requirements." },
            { question: "What should I send for product planning?", answer: "Send the project location, area and depth, geotechnical or soil information, intended use and loads, plans, schedule, and available water and mixing equipment." },
        ],
        keywords: ["Permabase", "soil stabilization", "bio-enzyme soil treatment", "clay soil treatment", "dust control", "subgrade treatment"],
    },
    {
        slug: "permabase-black",
        name: "Permabase Black",
        category: "Tinted soil treatment",
        title: "Soil treatment with a dark finished appearance.",
        summary: "A tinted Permabase treatment for suitable soil projects where stabilization planning and a darker low-speed surface are both desired.",
        description: "Permabase Black combines the Permabase soil-treatment approach with a dark tint. It may fit selected unpaved roads, yards, access routes, and low-speed working surfaces, but it should not be presented as interchangeable with a designed asphalt pavement section. Soil suitability, treatment depth, traffic, drainage, maintenance, and finish expectations need to be agreed before use.",
        image: "/images/field/crownwood-road-application.webp",
        imageAlt: "Crownwood tanker spraying dark road treatment across an unpaved surface",
        imageCaption: "Permabase Black field application from Crownwood video.",
        applications: [
            { name: "Ranch and private roads", description: "Suitable low-speed routes where a treated soil surface and darker appearance are being evaluated." },
            { name: "Yards and staging areas", description: "Working surfaces where dust, tracking, maintenance, and appearance all matter." },
            { name: "Access and service routes", description: "Selected drives and service areas matched to the expected vehicles and maintenance plan." },
            { name: "Demonstration sections", description: "Test areas used to confirm soil response, mixing, compaction, finish, and owner expectations before larger deployment." },
        ],
        planningQuestions: ["Is the soil suitable for Permabase treatment?", "What traffic and turning movements will the surface carry?", "What dark finish and color uniformity are expected?", "How will drainage and routine maintenance be handled?", "Should a demonstration section be approved before full application?"],
        faqs: [
            { question: "Is Permabase Black asphalt?", answer: "No. It is presented as a tinted soil-treatment system, not hot-mix asphalt. The pavement or surface design should reflect the actual material and intended use." },
            { question: "Where is a tinted surface most appropriate?", answer: "Potential uses include suitable low-speed private roads, yards, access routes, and working areas. Traffic, soil, drainage, and owner expectations should be reviewed first." },
            { question: "Will every soil produce the same finish?", answer: "No. Native soil color, gradation, moisture, mixing, compaction, application, and wear can affect appearance. A demonstration area is the clearest way to set expectations." },
            { question: "What is needed for pricing?", answer: "Provide the location, dimensions and depth, soil information, traffic, desired finish, schedule, and available water and mixing equipment." },
        ],
        keywords: ["Permabase Black", "tinted soil stabilizer", "dark soil treatment", "dust control road", "low speed road surface"],
    },
    {
        slug: "meltdown",
        name: "MeltDown MR-1",
        category: "Asphalt equipment care",
        title: "Remove asphalt buildup and prepare equipment before the next load.",
        summary: "Soy-based product used as an asphalt remover and release treatment on compatible paving equipment and tools.",
        description: "MeltDown MR-1 is used around paving operations to loosen asphalt, tar, and tack residue and to help reduce future adhesion when applied as a release treatment. The right procedure depends on whether the task is cleanup or prevention, how heavy the buildup is, and what metals, coatings, rubber, seals, or plastics are present.",
        image: "/images/pct/monkey-business.webp",
        imageAlt: "Road roller used during an asphalt paving operation",
        imageCaption: "Paving-equipment maintenance and cleanup context.",
        applications: [
            { name: "Paver and roller cleanup", description: "Removal planning for asphalt and tack residue on compatible equipment surfaces." },
            { name: "Truck beds and hoppers", description: "Release treatment applied before material contact where the equipment manufacturer and product guidance allow it." },
            { name: "Hand tools", description: "Cleaning or preventive treatment for shovels, lutes, rakes, and other compatible paving tools." },
            { name: "Fleet maintenance", description: "Routine procedures for asphalt buildup as part of a managed equipment-care program." },
        ],
        planningQuestions: ["Is the task release, light cleanup, or cured buildup removal?", "Which surfaces, coatings, seals, and components may contact the product?", "What dwell, agitation, and residue-control procedure applies?", "What PPE and ventilation does the current SDS require?", "What container size and monthly usage fit the operation?"],
        faqs: [
            { question: "Is MeltDown MR-1 a cleaner or a release agent?", answer: "It is presented for both uses. The application procedure should match the task: removing existing buildup is different from applying a preventive film before asphalt contact." },
            { question: "Can it be used on every equipment surface?", answer: "Compatibility should be confirmed against the current technical and safety information, especially for painted surfaces, plastics, rubber, seals, and sensitive finishes. Test a small area when appropriate." },
            { question: "Does a soy-based formula eliminate PPE requirements?", answer: "No. Product origin does not replace the SDS, exposure controls, gloves, eye protection, ventilation, storage, and site rules." },
            { question: "What information helps with pricing?", answer: "Share the equipment, buildup type, current cleaning method, frequency, estimated monthly use, preferred package size, and delivery location." },
        ],
        keywords: ["MeltDown MR-1", "soy asphalt remover", "asphalt release agent", "paving equipment cleaner", "tack oil remover"],
    },
];

export function getCoreProduct(slug: string) {
    return coreProducts.find((product) => product.slug === slug);
}

export function buildCoreProductMetadata(product: CoreProduct): Metadata {
    return {
        title: `${product.name} | Crownwood Chemicals`,
        description: product.summary,
        keywords: product.keywords,
        alternates: { canonical: `/chemicals/${product.slug}` },
        openGraph: {
            title: `${product.name} | Crownwood Chemicals`,
            description: product.summary,
            images: [{ url: product.image }],
        },
    };
}
