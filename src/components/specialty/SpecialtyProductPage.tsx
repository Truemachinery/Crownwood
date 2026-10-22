import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { MixGuide } from "./MixGuide";
import type { SpecialtyProduct } from "@/lib/specialtyProducts";
import styles from "./specialty.module.css";

export function SpecialtyProductPage({ product }: { product: SpecialtyProduct }) {
  const landscape = product.slug === "yardbond";
  const schema = [
    { "@context": "https://schema.org", "@type": "Product", name: `Crownwood ${product.name}`, description: product.summary, category: product.descriptor, brand: { "@type": "Brand", name: "Crownwood" }, url: `https://crownwoodchemicals.com/chemicals/${product.slug}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: product.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ];

  return (
    <div className={`${styles.page} ${landscape ? styles.landscape : styles.track}`}>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <section className={styles.hero} aria-labelledby="product-name">
          <div className={styles.heroCopy}>
            <Link href="/#chemicals" className={styles.breadcrumb}>Crownwood / {landscape ? "Landscape products" : "Track products"}<ArrowUpRight size={13} aria-hidden="true" /></Link>
            <p className={styles.eyebrow}><span />{product.descriptor}</p>
            <h1 id="product-name" className={styles.productName}>{product.name}<span>.</span></h1>
            <p className={styles.headline}>{product.headline}</p>
            <p className={styles.heroIntro}>{product.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#inquire">{product.action}<ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className={styles.textLink} href={landscape ? "#mixing" : "#process"}>{landscape ? "See the mix" : "Explore the process"}<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className={styles.heroFootnote}>{landscape ? "1 US gallon concentrate · Amazon launch planned" : product.audience}</p>
          </div>
          <figure className={styles.heroMedia}>
            <Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 50vw" className={styles.heroImage} />
            <div className={styles.mediaLabel}>{landscape ? "A little concentrate. A bigger batch." : "The shape of a good ride."}</div>
            <figcaption className={styles.mediaCaption}>
              <span>{product.imageCaption}</span>
              {product.imageCredit ? (
                <span className={styles.imageCredit}>
                  Photo: <a href={product.imageCredit.sourceUrl}>{product.imageCredit.author}</a>
                  {" · "}<a href={product.imageCredit.licenseUrl}>{product.imageCredit.license}</a>
                  {" · Resized; display crop"}
                </span>
              ) : null}
            </figcaption>
          </figure>
        </section>

        <nav className={styles.sectionNav} aria-label="On this page">
          <span>{product.name}</span>
          <div><a href="#applications">Applications</a><a href={landscape ? "#mixing" : "#process"}>{landscape ? "Mixing guide" : "Treatment planning"}</a><a href="#questions">Questions</a></div>
          <a href="#inquire" className={styles.navAction}>Let’s talk<ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>

        {landscape ? (
          <section className={styles.yieldStrip} aria-label="Concentrate yield">
            <div><span className={styles.eyebrow}>One jug. Four gallons.</span><p>Big on the mix.<br />Small on the shelf.</p></div>
            <div className={styles.yieldFact}><strong>1</strong><span>gallon<br />concentrate</span></div>
            <span className={styles.yieldPlus}>+ 3 gal water</span>
            <div className={styles.yieldFact}><strong>4</strong><span>gallons<br />mixed product</span></div>
          </section>
        ) : (
          <section className={styles.trackStrip} aria-label="Track treatment focus">
            <span>From the first berm<br />to the final straight.</span>
            <p>Supplied in totes.<br /><strong>Planned around your track.</strong></p>
            <a href="#inquire">Talk with Crownwood<ArrowUpRight size={22} aria-hidden="true" /></a>
          </section>
        )}

        <section id="applications" className={styles.applications}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>01 / {landscape ? "A place for everything" : "The ground behind the ride"}</p>
            <h2>{product.overviewTitle}</h2>
            <p className={styles.overviewText}>{product.overview}</p>
          </div>
          {landscape ? <figure className={styles.materials}><Image src="/images/products/yardbond-materials.webp" alt="Illustrated landscape materials: brown mulch beside natural decorative pebbles" fill sizes="(max-width: 800px) 100vw, 85vw" /><figcaption>Illustrated material setting</figcaption></figure> : null}
          <div className={`${styles.applicationGrid} ${landscape ? styles.twoColumns : ""}`}>
            {product.applications.map((item, index) => <article key={item.title}><span className={styles.itemNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        {landscape ? <section id="mixing" className={styles.mixing}><div className={styles.mixingIntro}><p className={styles.eyebrow}>02 / Make the most of your jug</p><h2>One part.<br />Three parts.<br /><span>Ready to plan.</span></h2><p>A simple ratio for a full jug or a smaller batch. Select how much you want to mix.</p></div><MixGuide /></section> : null}

        <section id="process" className={styles.process}>
          <div className={styles.processHeading}><p className={styles.eyebrow}>{landscape ? "03" : "02"} / {landscape ? "From jug to landscape" : "A plan before the application"}</p><h2>{landscape ? "A considered finish.\nA simple starting point." : "Your dirt. Your layout.\nYour treatment plan."}</h2></div>
          <div className={styles.steps}>{product.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          <p className={styles.processNote}>{landscape ? "Use the current product directions for surface preparation, equipment, application rate, and curing. Contact Crownwood for the details that fit your material." : "Track treatment requires a site-specific plan. Surface texture, curing, and suitability for riding must be evaluated by the track operator before reopening."}</p>
        </section>

        <section id="questions" className={styles.faq}>
          <div><p className={styles.eyebrow}>Good questions.</p><h2>Let’s clear<br />a few things up.</h2><a href="#inquire" className={styles.textLink}>Ask us something else<ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <div className={styles.faqList}>{product.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={18} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section id="inquire" className={styles.inquiry}>
          <div className={styles.inquiryCopy}><p className={styles.eyebrow}>{landscape ? "Bring YardBond to your landscape" : "Bring BermBond to your track"}</p><h2>{landscape ? "Good things\nstart here." : "Let’s talk\ntrack."}</h2><p>{landscape ? "Ask about availability, the upcoming Amazon launch, and the right approach for your mulch or decorative rock. Share your material and approximate area, and we’ll take it from there." : "Tell us about your track: location, dirt, treatment area, existing surface treatments, and timeline. We’ll help you work through the application plan, quantities, and availability."}</p><a href="tel:+12107925236"><Phone size={18} aria-hidden="true" />210-792-5236</a><p className={styles.documentNote}>Need product directions or an SDS? Include that in your message.</p></div>
          <ContactForm service={`Crownwood ${product.name} — ${product.descriptor}`} servicePath={`/chemicals/${product.slug}`} darkMode brandStyle />
        </section>

        <aside className={styles.related} aria-label="Another Crownwood product"><span>{landscape ? "For the dirt behind the ride." : "For the landscape around you."}</span><Link href={`/chemicals/${landscape ? "bermbond" : "yardbond"}`}>Meet {landscape ? "BermBond" : "YardBond"}<ArrowUpRight size={24} aria-hidden="true" /></Link></aside>
      </main>
      <Footer />
    </div>
  );
}
