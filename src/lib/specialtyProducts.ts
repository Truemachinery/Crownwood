import type { Metadata } from "next";

export type SpecialtyProduct = {
  slug: "yardbond" | "bermbond";
  name: string;
  descriptor: string;
  summary: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  audience: string;
  action: string;
  overviewTitle: string;
  overview: string;
  applications: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const yardbond: SpecialtyProduct = {
  slug: "yardbond",
  name: "YardBond",
  descriptor: "Mulch & Rock Glue Concentrate",
  summary: "Crownwood YardBond mulch and rock glue concentrate for landscape beds and decorative borders. One 1-gallon jug makes 4 gallons. Amazon launch planned.",
  headline: "A little order.\nA lot of curb appeal.",
  intro: "Give your landscape a finishing touch. YardBond is a landscape glue for mulch and decorative rock. One gallon of concentrate mixes with three gallons of water to make four gallons of product.",
  image: "/images/products/yardbond-concept.webp",
  imageAlt: "Crownwood YardBond one-gallon jug packaging concept with an olive and charcoal label",
  imageCaption: "Packaging concept · Final packaging may vary",
  audience: "Landscape beds / Decorative borders",
  action: "Ask about availability",
  overviewTitle: "Your landscape.\nAll together.",
  overview: "Thoughtful landscaping deserves a considered finish. YardBond brings mulch and rock glue to the beds and borders around your home, in a concentrate you mix with water on site.",
  applications: [
    { title: "Mulch beds", text: "For landscape projects using mulch around beds and borders. Share your mulch type and bed dimensions so we can help with application planning." },
    { title: "Decorative rock", text: "For decorative rock in landscape beds and edging. Stone size, shape, cleanliness, and site conditions guide the application." },
  ],
  steps: [
    { title: "Plan your bed", text: "Choose your material and measure the area. Confirm material compatibility and application guidance with Crownwood." },
    { title: "Mix your batch", text: "Combine 1 part YardBond concentrate with 3 parts water. One full gallon of concentrate makes 4 gallons of mixed product." },
    { title: "Test, then apply", text: "Follow the current product directions. Start with a small test area to check appearance and bond before treating the full bed." },
  ],
  faqs: [
    { question: "How does one gallon make four gallons?", answer: "The jug contains 1 US gallon of concentrate. Mix it with 3 US gallons of water to make 4 US gallons of solution. For a smaller 1-gallon batch, use 32 fl oz of concentrate and 96 fl oz of water." },
    { question: "Is YardBond for mulch or rock?", answer: "YardBond is intended for mulch and decorative rock in landscape beds and borders. Confirm suitability for your specific material and test a small area first. Share the material type, stone size where relevant, and project photos with Crownwood." },
    { question: "How much area will a jug cover?", answer: "Mixed volume is not a square-foot coverage rating. Coverage depends on the material and application rate. Contact Crownwood with your bed dimensions and material type for product guidance before deciding how many jugs to order." },
    { question: "When will YardBond be on Amazon?", answer: "An Amazon launch is planned. Contact Crownwood for current availability and launch details. A purchase link will be added here when the listing is live." },
    { question: "Can I use it on a driveway or walking surface?", answer: "This product page is for decorative landscape beds and borders. Contact Crownwood before considering a walking surface, driveway, or another traffic-bearing application." },
    { question: "Where can I get application and safety information?", answer: "Request the current YardBond product directions and safety data sheet from Crownwood. These documents provide the handling, application, curing, and site-use guidance for your project." },
  ],
};

export const bermbond: SpecialtyProduct = {
  slug: "bermbond",
  name: "BermBond",
  descriptor: "BMX Dirt Track Glue",
  summary: "Crownwood BermBond BMX dirt track glue is supplied in totes for track projects. Get surface-treatment planning, tote pricing, and application guidance.",
  headline: "Good lines start\nfrom the ground up.",
  intro: "A surface binder for the dirt behind the ride. Supplied in totes for track projects, BermBond brings track glue to prepared dirt BMX surfaces, with application planning built around your material and layout.",
  image: "/images/products/bermbond-track.webp",
  imageAlt: "Illustrated dirt track setting with sculpted berms and rollers",
  imageCaption: "Illustrated track setting · Not an installation photograph",
  audience: "Supplied in totes / BMX dirt tracks",
  action: "Get a tote quote",
  overviewTitle: "Built around\nyour track.",
  overview: "Every track starts with its own dirt, drainage, and design. BermBond is a surface-binding option for prepared BMX dirt tracks. Work with Crownwood to define a treatment plan and trial section before the full application.",
  applications: [
    { title: "Berms & turns", text: "Evaluate treatment on prepared banked turns, with attention to surface texture, drainage, and the track operator’s riding requirements." },
    { title: "Straights & rollers", text: "Plan the surface treatment around the dirt, grading, compaction, and features that define your track." },
    { title: "Maintenance projects", text: "Include existing treatments, worn areas, repair methods, and your maintenance schedule when planning a new application." },
  ],
  steps: [
    { title: "Read the track", text: "Share the location, material, treatment area, drainage, photos, and any existing surface treatment." },
    { title: "Build the plan", text: "Confirm preparation, dilution, application rate, equipment, and curing requirements for your track with Crownwood." },
    { title: "Trial & evaluate", text: "Treat a representative test section. The track operator should assess the cured surface and riding suitability before a wider application or reopening." },
  ],
  faqs: [
    { question: "What is BermBond?", answer: "BermBond is Crownwood’s BMX dirt track glue: a surface binder intended for prepared dirt tracks. Product selection and application should be based on the track material, drainage, use, and maintenance plan." },
    { question: "Can it be used on a dirt pump track?", answer: "Contact Crownwood to review the material, layout, and riding requirements of your dirt pump track. Establish suitability with a representative trial section before specifying a full treatment." },
    { question: "What dilution and coverage should we use?", answer: "Dilution, application rate, and product quantity should be specified for the track and treatment method. Send the material details and treatment area to Crownwood for guidance. Landscape-product mixing directions are not track instructions." },
    { question: "Does it replace track preparation or drainage work?", answer: "No. Surface treatment is part of a track maintenance plan. Address drainage, shaping, material condition, and compaction before treatment." },
    { question: "How soon can the track reopen?", answer: "Reopening depends on the application, weather, curing conditions, and the operator’s evaluation of the treated surface. Agree on the curing and inspection process before application; a universal ride-ready time is not specified here." },
    { question: "How is BermBond supplied?", answer: "BermBond is supplied in totes for track projects. Contact Crownwood to confirm tote capacity, quantity, delivery requirements, pricing, and availability for your location." },
    { question: "How do we get pricing and product documents?", answer: "Send the track location, surface material, estimated area, photos, and schedule. Crownwood can discuss tote quantities, delivery, availability, application guidance, and the current safety data sheet." },
  ],
};

export function specialtyMetadata(product: SpecialtyProduct): Metadata {
  return {
    title: `${product.name} | ${product.descriptor} | Crownwood`,
    description: product.summary,
    alternates: { canonical: `/chemicals/${product.slug}` },
    openGraph: { title: `Crownwood ${product.name}`, description: product.summary, images: [{ url: product.image, alt: product.imageAlt }] },
  };
}
