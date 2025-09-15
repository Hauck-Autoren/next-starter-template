import { urlFor } from "@/sanity/client";

// Centralize these two so you don't repeat them anywhere else
export const SITE_NAME = "Hauck & Autoren";
export const DOMAIN = "https://hauckautoren.de";

export const ORGANIZATION = {
    name: "Hauck & Autoren - Die Akademike in Deutschland",
    logo: "/logo.png",
    icon: "/favicon.ico",
    photo: "/hauckautoren.webp",
    email: "kontakt@email.hauckautoren.com",
    telephone: "+49 211 86942731",
    address: {
        streetAddress: "Talstraße 93c",
        addressLocality: "Düsseldorf",
        addressRegion: "Nordrhein-Westfalen",
        postalCode: "40217",
        addressCountry: "DE"
    },
    representative: "Dr. Johannes Weigl"
}


export const NAVIGATION = {

    header: [
        { name: "Leistungen", href: "/wissenschaftliche-arbeiten" },
        { name: "Studiumwahl", href: "/studiumwahl" },
        { name: "Fachrichtungen", href: "/fachrichtungen" },
        { name: "Recherche", href: "/recherche" },
        { name: "Promotion", href: "/promotion" },
        { name: "Lektorat", href: "/lektorat" },
        { name: "Plagiatspruefung", href: "/plagiatspruefung" },
        { name: "Ghostwriter", href: "/ghostwriter" },
        { name: "Biografie", href: "/biografie" },
        { name: "Glossar", href: "/glossar" },
        { name: "FAQ", href: "#faq" },
    ],
    footer: [
        { name: 'Impressum', href: '/impressum' },
        { name: 'AGB', href: '/agb' },
        { name: 'Datenschutz', href: '/datenschutz' },
    ],
}


// Helper if you use Sanity images for OG
export function fromSanityImage(img) {
    return img ? urlFor(img).width(1200).height(630).url() : undefined;
}

/**
 * Tiny, universal builder for Next.js metadata.
 * Call it with raw pieces, NOT with the whole page object.
 *
 * Example:
 *   const image = fromSanityImage(page?.mainImage);
 *   return buildPageMetadata({
 *     title: page?.title,
 *     description: page?.description,
 *     image,
 *     path: `/${slug}`
 *   });
 */
export function buildPageMetadata(input) {
    const { title, description, image, path = "/" } = input || {};
    const fullTitle = title ? title : SITE_NAME;
    const desc = description ? description : title;
    const canonical = `${DOMAIN}${path}`;

    return {
        title: fullTitle,
        description: desc,
        alternates: { canonical: canonical },
        openGraph: {
            title: fullTitle,
            description: desc,
            url: canonical,
            type: "website",
            images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        },
        twitter: {
            card: image ? "summary_large_image" : "summary",
            title: fullTitle,
            description: desc,
            images: image ? [image] : undefined,
        },
        robots: { index: true, follow: true },
    };
}