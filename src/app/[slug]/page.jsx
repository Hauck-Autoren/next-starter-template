// app/[slug]/page.jsx
import {
    getArticleBySlugPublic,
    getAllArticleSlugs,
} from "@/sanity/client";
import { buildPageMetadata, fromSanityImage } from "@/lib/metadata";
import FAQ from "@/components/FAQ";
import PageTemplate from "@/components/PageTemplate";
import { notFound } from "next/navigation";
import { ORGANIZATION } from "@/lib/metadata";

export const revalidate = 60;

// ---------- SSG ----------
export async function generateStaticParams() {
    const slugs = await getAllArticleSlugs(); // ['slug-1', 'slug-2', ...]
    return slugs.map((slug) => ({ slug }));
}

// ---------- Metadata ----------
export async function generateMetadata(props) {
    const { slug } = await props.params;
    const data = await getArticleBySlugPublic(slug);


    return buildPageMetadata({
        title: data?.title || "Articol",
        description: data?.description,
        image: fromSanityImage(data?.mainImage) || ORGANIZATION.photo, // Folosim poza din ORGANIZATION ca fallback dacă nu există mainImage
        path: `/${slug}`,
    });
}

// ---------- Page ----------
export default async function PageArticle(props) {
    const { slug } = await props.params;
    const article = await getArticleBySlugPublic(slug);

    if (!article) return notFound();

    return (
        <>
            <PageTemplate page={article} jsonLdType="Article" canonical={`/${slug}`} />
            {Array.isArray(article?.faq) && article.faq.length > 0 && (
                <FAQ FAQ={article.faq} />
            )}
        </>
    );
}