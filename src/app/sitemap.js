// src/app/sitemap.js
import { client, SANITY_DOC_TYPE } from "@/sanity/client";
import { DOMAIN } from "@/lib/metadata";
import { NAVIGATION } from "@/lib/metadata";

const baseUrl = DOMAIN; // folosește domeniul din metadata centralizată
export const revalidate = 60; // ISR pentru sitemap

export default async function sitemap() {
    // Articole (toate articolele publicate cu slug)
    const articles = await client.fetch(`
        *[_type == "${SANITY_DOC_TYPE.article}" 
          && defined(slug.current)
          && !(_id in path("drafts.**"))
          && _createdAt <= now()
        ]{
          "slug": slug.current,
          _updatedAt
        }
    `);

    // 3) Rute statice reale (fără #ancore)
    // Extrage rutele statice din meniuri (header + footer), ignorând ancorele (#)
    const staticMenuRoutes = [
        ...NAVIGATION.header,
        ...NAVIGATION.footer,
    ]
        .map(item => item.href)
        .filter(href => href && href.startsWith("/") && !href.includes("#"))
        .map(path => {
            // Setează priorități și frecvențe implicite, sau ajustează după caz
            let changeFrequency = "monthly";
            let priority = 0.5;
            if (path === "/") {
                changeFrequency = "weekly";
                priority = 1.0;
            }
            if (path === "/datenschutz" || path === "/impressum" || path === "/agb") {
                changeFrequency = "yearly";
                priority = 0.2;
            }
            return { path, changeFrequency, priority };
        });

    // Poți adăuga manual alte rute statice dacă e nevoie
    const staticRoutes = staticMenuRoutes;

    const nowIso = new Date().toISOString();

    const staticEntries = staticRoutes.map(({ path, changeFrequency, priority }) => ({
        url: `${baseUrl}${path}`,
        lastModified: nowIso,
        changeFrequency,
        priority,
    }));

    const articleEntries = articles.map((a) => ({
        url: `${baseUrl}/${a.slug}`,
        lastModified: a._updatedAt ? new Date(a._updatedAt).toISOString() : nowIso,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticEntries, ...articleEntries];
}