import type { Metadata } from "next";

export type ServicePage = {
    slug: string;
    name: string;
    title: string;
    summary: string;
    description: string;
    scope: { name: string; description: string }[];
    process: { name: string; description: string }[];
    projectDetails: string[];
    faqs: { question: string; answer: string }[];
    keywords: string[];
};

export const servicePages: ServicePage[] = [
    {
        slug: "asphalt-paving",
        name: "Asphalt Paving",
        title: "Asphalt paving and repair for working properties.",
        summary: "Parking lots, private roads, overlays, repairs, tear-outs, and new asphalt work in San Antonio and surrounding areas.",
        description: "Crownwood handles asphalt projects for commercial, municipal, industrial, and private sites. The right scope depends on the existing pavement and base: some sites need isolated repair, some are candidates for an overlay, and others need removal and reconstruction.",
        scope: [
            { name: "New asphalt paving", description: "New parking areas, drives, access roads, and paved work surfaces built to the project plan." },
            { name: "Mill and overlay", description: "Removal of a controlled surface depth followed by a new asphalt lift where the underlying section remains suitable." },
            { name: "Full-depth replacement", description: "Removal of failed pavement and correction of the section below before new asphalt placement." },
            { name: "Patching and repair", description: "Localized repair of potholes, failed areas, utility cuts, transitions, and pavement edges." },
            { name: "Parking lot work", description: "Phased paving and repair planned around entrances, customers, tenants, loading, and site access." },
            { name: "Base and drainage coordination", description: "Review of soft areas, water movement, grades, and base condition before the wearing surface is selected." },
        ],
        process: [
            { name: "Site review", description: "Walk the pavement, document distress, drainage, access, traffic, and likely base problems." },
            { name: "Scope selection", description: "Separate surface maintenance from structural repair and define limits, transitions, and phasing." },
            { name: "Preparation and placement", description: "Complete the agreed removals, base work, tack, paving, compaction, and edge transitions." },
            { name: "Closeout", description: "Confirm the completed limits, access, markings or follow-on work, and any care instructions." },
        ],
        projectDetails: ["Site address and approximate square footage", "Photos of cracking, potholes, drainage, and edges", "Traffic type and operating hours", "Known utility cuts or base failures", "Target schedule and access restrictions"],
        faqs: [
            { question: "Do I need an overlay or full replacement?", answer: "That depends on whether distress is limited to the surface or reflects failures in the base and subgrade. A site review is the appropriate way to separate overlay candidates from areas that need deeper repair." },
            { question: "Can work be phased around an operating property?", answer: "Often, yes. Phasing depends on entrances, loading, tenant or customer traffic, cure and cooling requirements, and the size of each work area." },
            { question: "Does new asphalt fix drainage problems?", answer: "Not automatically. Grades, collection points, adjacent elevations, and outlet conditions need to be reviewed as part of the paving scope." },
            { question: "What makes a useful paving quote request?", answer: "Provide the location, approximate area, photos, traffic type, known failures, access constraints, and desired timing. Plans or prior pavement information are also helpful when available." },
        ],
        keywords: ["asphalt paving San Antonio", "commercial paving", "parking lot paving", "asphalt overlay", "pothole repair", "mill and overlay"],
    },
    {
        slug: "concrete",
        name: "Commercial Concrete",
        title: "Concrete flatwork, access, and site repairs.",
        summary: "Commercial slabs, pads, curbs, ramps, walkways, demolition, and replacement work in the San Antonio area.",
        description: "Concrete performance starts below the slab. Crownwood scopes the use, loads, drainage, reinforcement, access, and existing base before pricing new work or replacement. The result is a buildable scope rather than a generic price per square foot.",
        scope: [
            { name: "Commercial flatwork", description: "Slabs, walkways, approaches, equipment areas, and paved work surfaces." },
            { name: "Loading and dumpster pads", description: "Concrete areas planned around vehicle paths, wheel loads, container service, and drainage." },
            { name: "Curbs and gutters", description: "New or replacement curb sections, drainage edges, islands, and pavement transitions." },
            { name: "Accessible routes and ramps", description: "Site work coordinated with the project plan, current standards, field elevations, and the authority having jurisdiction." },
            { name: "Demolition and replacement", description: "Sawcutting, removal, base correction, forming, reinforcement, placement, and joint planning." },
            { name: "Concrete repair", description: "Targeted replacement of failed panels and transitions where the surrounding work can remain." },
        ],
        process: [
            { name: "Measure and document", description: "Confirm limits, elevations, drainage, access, loading, and adjoining surfaces." },
            { name: "Define the section", description: "Coordinate thickness, reinforcement, joints, base preparation, concrete requirements, and finish with the project needs." },
            { name: "Remove and form", description: "Complete demolition where required, correct the base, set forms and reinforcement, and prepare transitions." },
            { name: "Place and protect", description: "Place, finish, joint, cure, and protect the work until it is ready for its intended use." },
        ],
        projectDetails: ["Plans, dimensions, or approximate square footage", "Intended vehicle or equipment loads", "Required slopes, drains, and tie-in elevations", "Access, demolition, and haul-off constraints", "Finish, joint, and schedule requirements"],
        faqs: [
            { question: "Can you replace only the failed concrete?", answer: "In many cases. Replacement limits should follow sound concrete, practical sawcut lines, joint layout, base condition, and the way the area is loaded." },
            { question: "How long before concrete can be used?", answer: "That depends on the mix, weather, thickness, curing approach, and intended load. The project plan should define when foot traffic, light vehicles, and heavy service can return." },
            { question: "Do ramps automatically meet accessibility requirements?", answer: "No contractor should make that assumption without measurements and the applicable design criteria. Slopes, cross-slopes, landings, transitions, markings, and site constraints all matter." },
            { question: "What should I send for a quote?", answer: "Send the site, dimensions or plans, photos, intended use and loads, drainage information, finish requirements, and desired schedule." },
        ],
        keywords: ["commercial concrete San Antonio", "concrete flatwork", "dumpster pad", "loading dock concrete", "ADA ramp concrete", "curb and gutter"],
    },
    {
        slug: "sealcoat",
        name: "Commercial Sealcoating",
        title: "Sealcoating planned around pavement condition and site use.",
        summary: "Parking-lot and private-road sealcoating with surface preparation, repair coordination, traffic planning, and restriping.",
        description: "Sealcoating is preventive surface maintenance, not a structural repair. Crownwood first separates cracks, potholes, drainage issues, and failed pavement from areas that are suitable for treatment, then plans cleaning, application, closure, and markings around the property.",
        scope: [
            { name: "Parking lots", description: "Sealcoating and reopening plans for retail, office, multifamily, industrial, and institutional properties." },
            { name: "Private roads and drives", description: "Surface treatment for suitable asphalt roads, drives, and low-speed paved areas." },
            { name: "Surface preparation", description: "Cleaning and preparation of the areas included in the agreed scope before material application." },
            { name: "Crack and patch coordination", description: "Identification and separate treatment of cracks or failed areas that sealcoat alone will not correct." },
            { name: "Phased closures", description: "Work sequencing around entrances, parking demand, tenants, deliveries, and operating hours." },
            { name: "Restriping coordination", description: "Layout confirmation and repainting after the treated surface is ready to receive markings." },
        ],
        process: [
            { name: "Condition review", description: "Identify suitable pavement and separate maintenance needs from structural failures." },
            { name: "Repair and cleaning plan", description: "Define crack, patch, cleaning, edge, and protection requirements before coating." },
            { name: "Application and closure", description: "Apply the specified system under suitable conditions and maintain the planned closure." },
            { name: "Reopen and restripe", description: "Confirm the surface is ready, restore markings where included, and reopen the area by phase." },
        ],
        projectDetails: ["Site address and pavement area", "Current photos and repair history", "Parking demand and closure windows", "Number and type of existing markings", "Desired timing and any tenant requirements"],
        faqs: [
            { question: "Will sealcoat fix cracks or potholes?", answer: "No. Cracks and failed pavement need to be evaluated and handled separately. Sealcoat is a surface-maintenance treatment." },
            { question: "How long will the lot be closed?", answer: "Closure depends on the selected material, weather, shade, application, site layout, and traffic. The schedule should be set for the actual product and conditions." },
            { question: "Can the property stay open during work?", answer: "Many lots can be divided into phases, but the available entrances, parking supply, deliveries, fire access, and tenant operations determine whether phasing is practical." },
            { question: "When should striping be restored?", answer: "After the sealcoat is ready to accept traffic paint under the product and weather conditions. Striping is normally coordinated as part of the reopening plan." },
        ],
        keywords: ["sealcoating San Antonio", "commercial sealcoat", "parking lot sealcoating", "asphalt maintenance", "private road sealcoat"],
    },
    {
        slug: "striping",
        name: "Parking Lot Striping",
        title: "Clear parking layouts and traffic markings.",
        summary: "New layouts, restriping, accessible spaces, fire lanes, curbs, directional markings, and staged work in San Antonio.",
        description: "Striping has to work for the property, not just look fresh. Crownwood reviews the existing layout, traffic paths, stalls, access areas, curbs, signage, and operating schedule before marking new pavement or restoring an existing plan.",
        scope: [
            { name: "Parking stalls and aisles", description: "New layouts and restriping for customer, employee, fleet, and visitor parking." },
            { name: "Accessible parking markings", description: "Markings and access aisles coordinated with the site plan, current requirements, signage, and field conditions." },
            { name: "Fire lanes and curbs", description: "Color, legends, and curb markings installed to the approved site or authority requirements." },
            { name: "Arrows and legends", description: "Directional arrows, stop bars, loading zones, numbers, and other traffic-control markings." },
            { name: "Warehouse and yard markings", description: "Traffic, staging, safety, and operating zones for industrial sites." },
            { name: "Post-paving or sealcoat striping", description: "Layout restoration after pavement work, coordinated with surface readiness and the approved plan." },
        ],
        process: [
            { name: "Confirm the layout", description: "Use the approved plan or document the existing markings, dimensions, signs, and traffic flow." },
            { name: "Prepare the surface", description: "Confirm the pavement or coating is clean, dry, sound, and ready for the specified marking material." },
            { name: "Lay out and stripe", description: "Set reference lines and apply the agreed stalls, aisles, curbs, legends, and directional markings." },
            { name: "Check and reopen", description: "Review the completed layout and keep traffic off the markings until the selected material is ready." },
        ],
        projectDetails: ["Current plan or clear site photos", "Count of stalls, symbols, arrows, and curb lengths", "Required colors and marking material", "Known accessibility or fire-lane requirements", "Closure window and operating schedule"],
        faqs: [
            { question: "Can you copy the existing layout?", answer: "Yes, when the existing layout is still appropriate and documented. Changes in site use, accessibility requirements, fire access, or parking demand may justify a revised plan." },
            { question: "Does fresh striping guarantee code compliance?", answer: "No. Compliance depends on the complete site condition, dimensions, slopes, signs, routes, current requirements, and authority review - not paint alone." },
            { question: "When can vehicles return?", answer: "That depends on the marking material, surface temperature, weather, film thickness, and manufacturer instructions. The closure plan should reflect the actual product used." },
            { question: "What is needed for an accurate quote?", answer: "Provide a plan or photos, counts and dimensions, required markings and colors, site hours, surface condition, and the date the work must be complete." },
        ],
        keywords: ["parking lot striping San Antonio", "ADA parking striping", "fire lane painting", "parking layout", "traffic markings"],
    },
    {
        slug: "land-clearing",
        name: "Land Clearing & Site Prep",
        title: "Clear, grade, and prepare the site for what comes next.",
        summary: "Brush and tree removal, mulching, cleanup, grading, access preparation, and commercial site work around San Antonio.",
        description: "Crownwood clears and prepares properties for construction, access, drainage, maintenance, or land use. The scope starts with what stays, what goes, where material can be processed or hauled, and the grades and access the next phase requires.",
        scope: [
            { name: "Brush and small-tree clearing", description: "Removal or processing of brush, cedar, mesquite, and volunteer growth within the agreed limits." },
            { name: "Forestry mulching", description: "On-site reduction of suitable vegetation where mulching fits the land-use and cleanup plan." },
            { name: "Tree and stump removal", description: "Removal of selected larger material with protection for trees, utilities, and areas that remain." },
            { name: "Site cleanup and haul-off", description: "Collection, loading, hauling, or on-site management of clearing debris as the scope allows." },
            { name: "Rough and finish grading", description: "Cutting, filling, shaping, and smoothing coordinated with drainage and the next construction phase." },
            { name: "Access and work areas", description: "Preparation of routes, laydown areas, fence lines, pads, and other practical site zones." },
        ],
        process: [
            { name: "Mark limits and exclusions", description: "Confirm property access, work boundaries, protected trees, utilities, structures, and material-disposal expectations." },
            { name: "Choose the clearing method", description: "Match mulching, cutting, grubbing, excavation, or haul-off to the vegetation and finished condition." },
            { name: "Clear and process", description: "Complete the agreed removal while maintaining access and protecting marked exclusions." },
            { name: "Grade and hand off", description: "Shape and clean the site to the defined grade, drainage, stabilization, or next-phase requirement." },
        ],
        projectDetails: ["Property address and acreage or marked limits", "Survey, site plan, or aerial markup", "Trees, structures, and areas that must remain", "Known utilities, easements, and access constraints", "Debris handling and desired finished condition"],
        faqs: [
            { question: "Is forestry mulching right for every clearing job?", answer: "No. Vegetation size, rock, slope, soil, desired finish, fire risk, and what happens to the mulch all affect the method." },
            { question: "Can you clear only selected areas?", answer: "Yes. Work limits and exclusions should be clearly marked or shown on a plan before equipment begins." },
            { question: "Does clearing include grading?", answer: "Only when grading is part of the agreed scope. Clearing, grubbing, rough grading, finish grading, stabilization, and haul-off should be listed separately." },
            { question: "What should I send for pricing?", answer: "Send the address, acreage or limits, aerial photos or a plan, current site photos, access information, what must remain, and the desired finished condition." },
        ],
        keywords: ["land clearing San Antonio", "site preparation", "forestry mulching", "commercial grading", "brush clearing", "lot clearing"],
    },
    {
        slug: "hydro-seeding",
        name: "Hydroseeding & Erosion Control",
        title: "Hydroseeding for disturbed soil and large sites.",
        summary: "Seed-and-mulch applications for commercial sites, slopes, rights-of-way, drainage areas, and revegetation projects.",
        description: "Hydroseeding combines seed, water, mulch, and specified additives into a spray-applied slurry. Crownwood plans the work around the soil, slope, season, seed requirements, water access, erosion risk, and the maintenance needed after application.",
        scope: [
            { name: "Commercial revegetation", description: "Large disturbed areas, development sites, utility work, and other projects that need seeded cover." },
            { name: "Slopes and drainage areas", description: "Applications planned around slope length, runoff, soil condition, and the selected erosion-control system." },
            { name: "Rights-of-way", description: "Seed and mulch placement for suitable roadside, utility, and access corridors." },
            { name: "Retention and detention areas", description: "Revegetation around basins and channels coordinated with drainage, access, and maintenance needs." },
            { name: "Native and project seed mixes", description: "Use of the specified or approved seed mix for the site, season, soils, and project requirements." },
            { name: "Mulch and tackifier options", description: "Selection of slurry components based on the project specification and expected erosion conditions." },
        ],
        process: [
            { name: "Review the specification", description: "Confirm the required seed, mulch, additives, area, schedule, and acceptance criteria." },
            { name: "Prepare the soil", description: "Address grade, debris, compaction, soil condition, and any amendments or erosion measures in the scope." },
            { name: "Mix and apply", description: "Prepare the specified slurry and apply it evenly to the planned area with suitable equipment and access." },
            { name: "Water and maintain", description: "Follow the project watering, establishment, inspection, mowing, and repair requirements after application." },
        ],
        projectDetails: ["Plans and measured treatment area", "Seed and erosion-control specification", "Slope, soil, and drainage information", "Water source and truck access", "Schedule, watering, and establishment responsibilities"],
        faqs: [
            { question: "Is hydroseeding the same as erosion control?", answer: "Hydroseeding can support erosion control and vegetation establishment, but some slopes and flow conditions require additional blankets, matrices, checks, or structural measures specified by the project designer." },
            { question: "How quickly will grass establish?", answer: "Establishment depends on seed, season, soil, temperature, moisture, preparation, and maintenance. A universal germination or coverage promise would not be reliable." },
            { question: "Who handles watering?", answer: "That should be assigned in the project scope. Hydroseeding needs an appropriate watering and maintenance plan after application." },
            { question: "What information is needed for pricing?", answer: "Provide the plans and area, seed and mulch specification, slopes and access, water source, schedule, and who is responsible for watering and establishment." },
        ],
        keywords: ["hydroseeding San Antonio", "commercial hydroseeding", "erosion control", "retention pond seeding", "right of way revegetation"],
    },
];

export function getServicePage(slug: string) {
    return servicePages.find((service) => service.slug === slug);
}

export function buildServiceMetadata(service: ServicePage): Metadata {
    return {
        title: `${service.name} in San Antonio | Crownwood Chemicals`,
        description: service.summary,
        keywords: service.keywords,
        alternates: { canonical: `/construction/${service.slug}` },
        openGraph: {
            title: `${service.name} | Crownwood Chemicals`,
            description: service.summary,
        },
    };
}
