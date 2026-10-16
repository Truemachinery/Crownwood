import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Layers3,
  Wind,
  Droplets,
  Phone,
  Play,
  Plus,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { ApplicationSelector } from "@/components/permabase-black/ApplicationSelector";
import { buildCoreProductMetadata, getCoreProduct } from "@/lib/coreProducts";
import styles from "./permabase-black.module.css";

export const dynamic = "force-static";
const product = getCoreProduct("permabase-black")!;
export const metadata = {
  ...buildCoreProductMetadata(product),
  title: "Permabase Black | Soil Stabilizer & Black Road Finish | Crownwood",
};

const benefits = [
  {
    icon: Layers3,
    title: "Give loose material a bond.",
    text: "Polymer-acrylic binder holds prepared soil and aggregate together, turning loose material into a more cohesive road surface.",
  },
  {
    icon: Wind,
    title: "Keep more of the road on the road.",
    text: "Binding dust-generating particles helps reduce the dust that follows traffic on untreated dirt and caliche.",
  },
  {
    icon: Droplets,
    title: "Finish with a different look.",
    text: "Carbon-black tint gives the treated surface a dark, asphalt-like appearance, with a water-resistant polymer bond.",
  },
];
const steps = [
  {
    title: "Prepare",
    text: "Review the soil and traffic. Grade the surface and address drainage before treatment.",
  },
  {
    title: "Apply",
    text: "Dilute concentrate with water and apply to the prepared material at the specified project rate.",
  },
  {
    title: "Compact",
    text: "Work and compact the treated material to the agreed application plan and density requirements.",
  },
  {
    title: "Cure",
    text: "Allow the water to evaporate and the polymer to bind. Confirm readiness before opening to traffic.",
  },
];

export default function PermabaseBlackPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.summary,
      category: product.category,
      image: `https://crownwoodchemicals.com${product.image}`,
      brand: { "@type": "Brand", name: "Crownwood Chemicals" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  return (
    <div className={styles.page}>
      <Navbar />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.heroCopy}>
            <Link href="/#chemicals" className={styles.breadcrumb}>
              Crownwood / Soil & road products <ArrowUpRight size={13} />
            </Link>
            <p className={styles.eyebrow}>
              <span /> Polymer-acrylic soil stabilizer
            </p>
            <h1 id="product-title" className={styles.productTitle}>
              PERMABASE<span>BLACK.</span>
            </h1>
            <h2 className={styles.heroPromise}>
              Stabilize the soil.
              <br />
              Finish it in black.
            </h2>
            <p className={styles.heroDescription}>
              A stronger bond. Less loose dust. A dark, finished surface. Give
              suitable dirt and caliche roads a new direction with Crownwood’s
              tinted polymer treatment.
            </p>
            <div className={styles.heroActions}>
              <a href="#quote" className={styles.redButton}>
                Get a project quote <ArrowUpRight size={18} />
              </a>
              <a href="#field-video" className={styles.watchLink}>
                <Play size={14} fill="currentColor" /> See it in the field
              </a>
            </div>
            <p className={styles.heroFootnote}>
              Ranch roads / Rural access / Low-speed yards
            </p>
          </div>
          <div className={styles.heroMedia}>
            <Image
              src="/images/field/permabase-black-application.webp"
              alt="Crownwood tanker applying Permabase Black to a road surface"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
              className={styles.heroImage}
            />
            <div className={styles.mediaTop}>
              <span className={styles.liveDot} /> From the field
              <span>01 / PB</span>
            </div>
            <div className={styles.mediaCaption}>
              <span>Real material. Real application.</span>
              <a
                href="#field-video"
                aria-label="Watch the Crownwood application video"
              >
                <ArrowDown size={22} />
              </a>
            </div>
          </div>
        </section>
        <nav className={styles.sectionNav} aria-label="On this page">
          <span>PERMABASE BLACK</span>
          <div>
            <a href="#overview">The difference</a>
            <a href="#applications">Applications</a>
            <a href="#process">The process</a>
            <a href="#questions">FAQs</a>
          </div>
          <a href="#quote" className={styles.sectionQuote}>
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <section id="overview" className={styles.overview}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>01 / The difference</p>
            <div>
              <h2 className={styles.heading}>
                YOUR ROAD.
                <br />
                <span>MORE POSSIBILITIES.</span>
              </h2>
              <p className={styles.introText}>
                Soil stabilization and a black finish, brought together.
                Permabase Black is a polymer-acrylic emulsion with carbon-black
                tint. As the water evaporates, the polymer binds the treated
                material.
              </p>
            </div>
          </div>
          <div className={styles.benefits}>
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <div className={styles.benefitIndex}>
                  <Icon size={25} strokeWidth={1.4} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="field-video"
          className={styles.fieldSection}
          aria-labelledby="field-title"
        >
          <div className={styles.fieldCopy}>
            <p className={styles.sectionLabel}>The product at work</p>
            <h2 id="field-title" className={styles.heading}>
              OUT OF THE TOTE.
              <br />
              <span>ONTO THE ROAD.</span>
            </h2>
            <p>
              Watch Crownwood apply Permabase Black in the field. A water truck
              distributes the diluted treatment across the prepared surface.
            </p>
            <div className={styles.fieldNote}>
              <Play size={18} />
              <span>
                Crownwood application footage
                <br />
                <small>Play the video to see the process.</small>
              </span>
            </div>
            <a href="#process" className={styles.textLink}>
              Explore the application steps <ArrowDown size={16} />
            </a>
          </div>
          <figure className={styles.videoFrame}>
            <video
              controls
              playsInline
              preload="none"
              poster="/images/field/permabase-black-application.webp"
              aria-label="Crownwood crew applying Permabase Black to an unpaved road"
              aria-describedby="video-description"
            >
              <source
                src="/Videos/permabase-black-application.mp4"
                type="video/mp4"
              />
              <a href="/Videos/permabase-black-application.mp4">
                Watch the application video
              </a>
              .
            </video>
            <figcaption id="video-description">
              Field view: a tanker sprays dark treatment across an unpaved road.
              Application shown; finished results depend on the project.
            </figcaption>
          </figure>
        </section>
        <section id="applications" className={styles.applications}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>02 / Find your application</p>
            <h2 className={styles.heading}>
              BUILT AROUND
              <br />
              <span>YOUR KIND OF ROAD.</span>
            </h2>
          </div>
          <ApplicationSelector />
          <div className={styles.fitNote}>
            <span>A good fit starts here.</span>
            <p>
              Soil, drainage, traffic, and turning loads determine the right
              surface. For high-speed roads or demanding commercial traffic,
              plan for an engineered pavement section and an appropriate wearing
              course.
            </p>
          </div>
        </section>
        <section id="process" className={styles.process}>
          <div className={styles.processHeading}>
            <div>
              <p className={styles.sectionLabel}>
                03 / From material to surface
              </p>
              <h2 className={styles.heading}>
                A PRACTICAL PROCESS.
                <br />
                <span>A PROJECT-SPECIFIC PLAN.</span>
              </h2>
            </div>
            <p>
              We help define the treatment around your material, equipment, and
              site. Rates and cure time follow that plan.
            </p>
          </div>
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <article key={step.title}>
                <div>
                  <span>0{index + 1}</span>
                  {index < steps.length - 1 ? (
                    <ArrowRight size={22} />
                  ) : (
                    <ArrowUpRight size={22} />
                  )}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.supply}>
          <div className={styles.toteNumber}>
            <span>275</span>
            <div>
              GALLONS
              <br />
              OF CONCENTRATE
            </div>
          </div>
          <div>
            <p className={styles.sectionLabel}>Supplied in IBC totes</p>
            <h2>
              Big plans start
              <br />
              with the right quantity.
            </h2>
            <p>
              Send your road length, width, existing material, and delivery
              location. We’ll help work out the application, quantity, and
              current pricing.
            </p>
            <a href="#quote" className={styles.textLink}>
              Plan your order <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section id="questions" className={styles.faqSection}>
          <div>
            <p className={styles.sectionLabel}>04 / Good questions</p>
            <h2 className={styles.heading}>
              KNOW THE
              <br />
              <span>MATERIAL.</span>
            </h2>
            <p>
              Have a specific job in mind? Talk it through with the Crownwood
              team.
            </p>
            <a href="tel:+12107925236" className={styles.textLink}>
              210-792-5236 <ArrowUpRight size={17} />
            </a>
          </div>
          <div className={styles.faqs}>
            {product.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <Plus size={20} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="quote" className={styles.quoteSection}>
          <div className={styles.quoteCopy}>
            <p className={styles.sectionLabel}>Let’s pave differently.</p>
            <h2 className={styles.heading}>
              TELL US
              <br />
              ABOUT
              <br />
              <span>YOUR ROAD.</span>
            </h2>
            <p>
              A ranch entrance. A county route. The yard that never stops
              working. Start with the site, and we’ll help you plan the next
              step.
            </p>
            <a href="tel:+12107925236" className={styles.phoneLink}>
              <Phone size={19} /> Talk to Nate · 210-792-5236
            </a>
            <a
              href="mailto:nate@crownwoodchemicals.com?subject=Permabase%20Black%20technical%20documents"
              className={styles.documentLink}
            >
              Request SDS & product information <ArrowUpRight size={15} />
            </a>
          </div>
          <ContactForm
            service="Permabase Black"
            servicePath="/chemicals/permabase-black"
            darkMode
            brandStyle
            projectFields
          />
        </section>
        <div className={styles.related}>
          <span>More from Crownwood</span>
          <Link href="/chemicals/permabase">
            Permabase <ArrowUpRight size={17} />
          </Link>
          <Link href="/chemicals/road-building-products">
            Road maintenance products <ArrowUpRight size={17} />
          </Link>
          <Link href="/construction/asphalt-paving">
            Asphalt paving services <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
