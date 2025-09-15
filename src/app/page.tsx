import Link from "next/link";
import Image from "next/image";
import HowItWorks from "@/components/HowItWorks";
import Rating from "@/components/Rating";
import FAQ from "@/components/FAQ";

// import PageTemplate from "@/components/PageTemplate";
import { buildPageMetadata, DOMAIN, fromSanityImage, ORGANIZATION } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/sanity/client";

// SINGLE SOURCE OF TRUTH for this static page
const PAGE_SLUG = "/"; // change only here

// ---------- Metadata ----------
export async function generateMetadata() {
  const page = await getPageBySlug(PAGE_SLUG);
  return buildPageMetadata({
    title: page?.title || "Articol",
    description: page?.description,
    image: fromSanityImage(page?.mainImage) || ORGANIZATION.photo, // Folosim poza din ORGANIZATION ca fallback dacă nu există mainImage
    path: PAGE_SLUG,
  });
}

export const revalidate = 60;

const stats = [
  { label: "Experten", value: "500+" },
  { label: "Erfahrung", value: "15 Jahre" },
  { label: "erfolgreiche Coachings und Beratungen für Studierende", value: "20.000+" },
];

const problems = [
  { name: "Zeitverlust", description: "Du verbringst Stunden mit chaotischer Recherche." },
  { name: "Unklare Rückmeldungen", description: "Dein Betreuer / deine Betreuerin gibt dir unklare Rückmeldungen." },
  { name: "Zeitdruck und Stress", description: "Du hast Angst, nicht rechtzeitig fertig zu werden." },
  { name: "Fehlende Struktur", description: "Du weißt nicht, wie du deine Gedanken klar und logisch aufbauen sollst." },
];

const benefits = [
  { name: "Integrität", description: "Ein klarer Aufbau und ein roter Faden durch deine Arbeit dank gezieltem Coaching" },
  { name: "Vertrauen", description: "Zeitersparnis durch individuelle Unterstützung bei der Literaturrecherche" },
  { name: "Wissenschaftliche Qualität", description: "Fundiertes Feedback zu Argumentation, Stil und Struktur" },
  { name: "Individualität", description: "Begleitung, die auf deine persönlichen Bedürfnisse und dein Thema abgestimmt ist" },
  { name: "Kompetenz", description: "Langjährige Erfahrung in der wissenschaftlichen Beratung und im Coaching" },
  { name: "Sicherheit", description: "Vertrauliche, transparente und professionelle Zusammenarbeit auf Augenhöhe" },
];

export default async function Home() {
  const page = await getPageBySlug(PAGE_SLUG);
  if (!page) return notFound();

  // Construim JSON-LD după ce avem `page`
  const HomePageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMAIN}#webpage`,
    "url": DOMAIN,
    "name": page.title ?? "Articol",
    "inLanguage": "de-CH",
    "isPartOf": { "@type": "WebSite", "url": DOMAIN },
    "about": {
      "@type": "Organization",
      "name": "Hauck & Autoren"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": fromSanityImage(page?.mainImage) || ORGANIZATION.photo
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Important: serializăm obiectul calculat aici (acum `page` există)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HomePageStructuredData) }}
      />

      <div className="bg-white">
        <div className="isolate">
          {/* Hero section */}
          <div className="relative isolate -z-10">
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200"
            >
              <defs>
                <pattern
                  x="50%"
                  y={-1}
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-light">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
              <div
                style={{
                  clipPath:
                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                }}
                className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-accent to-primary opacity-30"
              />
            </div>
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pt-12 pb-32  lg:px-8 lg:pt-12">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <h1 className="sm:text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-6xl">
                      Nachhilfe und Coaching für wissenschaftliche Arbeiten
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-muted sm:max-w-md sm:text-xl/8 lg:max-w-none">
                      Wir unterstützen dich im gesamten wissenschaftlichen Schreibprozess – mit Strukturierung, Literaturrecherche, Methodik, Feedback und Korrekturlesen. Persönlich, individuell und diskret. Gemeinsam entwickeln wir eine klare Strategie für deine Arbeit – Schritt für Schritt und Seite für Seite.
                      Für Bachelorarbeit, Masterarbeit, Dissertation sowie Haus- und Seminararbeiten.
                    </p>
                    <div className="mt-10 flex items-center flex-wrap gap-6">
                      <Link href="/#leistungen" className="btn btn-accent">
                        Unsere Leistungen
                      </Link>
                      <Link href="/#kontakt" className="btn btn-primary">
                        Anfrage
                      </Link>
                      <Link href="/#faq" className="btn btn-accent">
                        FAQ
                      </Link>
                    </div>
                  </div>
                  <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start lg:mt-0 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <Image
                          width={100}
                          height={300}
                          alt="Studentin liest Unterlagen"
                          src="/assets/img/01.webp"
                          className="aspect-2/3 w-full rounded-xl bg-primary/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset" />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <Image
                          width={100}
                          height={300}
                          alt="Student schreibt Notizen"
                          src="/assets/img/02.webp"
                          className="aspect-2/3 w-full rounded-xl bg-primary/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset" />
                      </div>
                      <div className="relative">
                        <Image
                          width={100}
                          height={300}
                          alt="Coaching-Situation am Laptop"
                          src="/assets/img/03.webp"
                          className="aspect-2/3 w-full rounded-xl bg-primary/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset" />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <Image
                          width={100}
                          height={300}
                          alt="Bücher und Notizen auf dem Tisch"
                          src="/assets/img/04.webp"
                          className="aspect-2/3 w-full rounded-xl bg-primary/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset" />
                      </div>
                      <div className="relative">
                        <Image
                          width={100}
                          height={300}
                          alt="Dozent gibt Feedback"
                          src="/assets/img/05.webp"
                          className="aspect-2/3 w-full rounded-xl bg-primary/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-primary/10 ring-inset" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem */}
          <div id="werte" className="mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-6xl">Kennst du das?</h2>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {problems.map((problem) => (
                <div key={problem.name}>
                  <dt className="ext-base/7 font-semibold text-primary">{problem.name}</dt>
                  <dd className="ext-base/7 mt-1 text-dark">{problem.description}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-12 text-lg font-bold text-accent">
              Viele Studierende fühlen sich beim Verfassen wissenschaftlicher Arbeiten überfordert. Ob Bachelorarbeit, Masterarbeit oder Dissertation – fehlende Struktur, unklare Fragestellung oder Zeitdruck führen schnell zu Stress, Unsicherheit und Frustration.
            </p>

            <p className="mt-8 text-lg/8 text-dark">
              Oft wird versucht, allein durch nächtelanges Lesen oder unzählige YouTube-Tutorials Klarheit zu gewinnen. Doch ohne individuelle Begleitung bleiben viele Fragen offen – und wertvolle Zeit vergeht.
            </p>
          </div>

          {/* about */}
          <div id="ueberuns" className="mx-auto mt-24 max-w-7xl px-6 lg:px-8 ">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-6xl">Wissenschaftliches Coaching</h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className="text-xl/8 text-muted">
                    Mit dem wissenschaftlichen Coaching von Hauck & Autoren erhältst du genau die Unterstützung, die du brauchst: individuell, professionell und lösungsorientiert. Gemeinsam schaffen wir Struktur, Sicherheit und akademische Qualität pentru deine Masterarbeit – Schritt für Schritt.
                  </p>

                  <p className="mt-6 text-base/7 text-dark">
                    Ob es um die Gliederung, eine fundierte Literaturrecherche oder präzises Textfeedback geht – unsere Beratung hilft dir dabei, deine Arbeit strukturiert und wissenschaftlich fundiert zu entwickeln.
                  </p>
                  <p className="mt-6 text-base/7 text-dark">
                    Dabei haben wir unzählige Geschichten gehört – von Studierenden, die an sich gezweifelt haben und schließlich mit Stolz ihre Arbeit abgegeben und erfolgreich bestanden haben.
                  </p>
                  <p className="mt-6 text-base/7 text-dark">
                    Unser Ziel ist es, dich bei deiner wissenschaftlichen Arbeit professionell zu begleiten – transparent, vertrauensvoll und auf Augenhöhe.
                  </p>
                </div>
                <div className="lg:flex lg:flex-auto lg:justify-center">
                  <dl className="w-64 space-y-8 xl:w-80">
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                        <dt className="text-base/7 text-accent font-bold">{stat.label}</dt>
                        <dd className="text-5xl font-semibold tracking-tight text-primary">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* wowirhelfen */}
          <div id="leistungen" className="mx-auto mt-16 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-6xl">
                Unsere Leistungen
              </h2>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div>
                <dt className="font-semibold text-primary">Themenfindung und Gliederung</dt>
                <dd className="mt-1 text-dark">
                  Unterstützung bei der Auswahl des Themas und Entwicklung einer klaren, logischen Struktur für Ihre Arbeit.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Wissenschaftliche Recherche</dt>
                <dd className="mt-1 text-dark">
                  Gezielte Literatur- und Quellenrecherche, angepasst an Ihr Fachgebiet und Ihre Fragestellung.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Schreibcoaching und Betreuung</dt>
                <dd className="mt-1 text-dark">
                  Individuelle Begleitung während des gesamten Schreibprozesses mit Tipps zu Argumentation, Stil und Methodik.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Lektorat und Korrektur</dt>
                <dd className="mt-1 text-dark">
                  Sprachliche și stilistische Optimierung sowie professionelle Rechtschreib- und Grammatikprüfung.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Formatierung und Zitierweise</dt>
                <dd className="mt-1 text-dark">
                  Einheitliche Formatierung nach Hochschulstandards und korrekte Anwendung der gewünschten Zitierweise (APA, MLA, Chicago, usw.).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Plagiatsprüfung</dt>
                <dd className="mt-1 text-dark">
                  Sicherstellung der wissenschaftlichen Integrität durch eine professionelle Plagiatskontrolle.
                </dd>
              </div>
            </dl>
          </div>

          {/* Image section */}
          <div className="m-16 md:mx-auto md:max-w-7xl xl:px-8">
            <Image
              width={600}
              height={400}
              alt="Nachhilfe und Coaching für wissenschaftliche Arbeiten – Hauck & Autoren"
              src="/hero01.webp"
              className="object-contain w-full md:aspect-5/2 md:w-full md:object-cover"
            />
          </div>

          <HowItWorks />

          {/* Values section */}
          <div id="vorteile" className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary lg:text-6xl">Deine Vorteile</h2>
              <p className="mt-6 text-lg/8 text-dark">
                Wir hören oft von Studierenden, die an sich gezweifelt haben – și schließlich stolz ihre Arbeit eingereicht haben.
              </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {benefits.map((value) => (
                <div key={value.name}>
                  <dt className="font-semibold text-primary">{value.name}</dt>
                  <dd className="mt-1 text-dark">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Rating />
          {Array.isArray(page?.faq) && page.faq.length > 0 && <FAQ FAQ={page.faq} />}
        </div>
      </div>
    </>
  );
}
