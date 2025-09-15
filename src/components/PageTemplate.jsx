'use client';
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/client";
import { DOMAIN, SITE_NAME } from "@/lib/metadata";
import Link from "next/link";

/**
 * This component augments your existing JSON-LD by:
 * 1) Emitting ImageObject schema for the main image + any inline images.
 * 2) Declaring primaryImageOfPage on a WebPage node and linking to the main ImageObject via @id.
 * 3) Keeping your Article/WebPage/BreadcrumbList in one consolidated @graph for clarity.
 * 4) Populating Google-supported image licensing fields: contentUrl, license, acquireLicensePage,
 *    creditText, creator, copyrightNotice, caption, representativeOfPage.
 */
export default function PageTemplate({ page, jsonLdType = "WebPage", canonical }) {
    const path = canonical?.startsWith('/') ? canonical : `/${canonical ?? ''}`;
    const absUrl = `${DOMAIN}${path}`;

    // Main image URLs (prefer optimal format from Sanity first)
    const mainImgBuilder = page?.mainImage ? urlFor(page.mainImage).fit('crop').auto('format') : undefined;
    const mainImg1200x630 = mainImgBuilder ? mainImgBuilder.width(1200).height(630).url() : undefined;
    const mainImg1200x800 = mainImgBuilder ? mainImgBuilder.width(1200).height(800).url() : undefined;

    const isArticle = jsonLdType === "Article";

    // Build ImageObject for the main image (if any)
    const mainImageId = `${absUrl}#primaryimage`;
    const mainImageObject = page?.mainImage
        ? {
            "@type": "ImageObject",
            "@id": mainImageId,
            contentUrl: mainImg1200x800 || mainImg1200x630, // required by Google
            url: mainImg1200x800 || mainImg1200x630,
            thumbnailUrl: mainImg1200x630 || mainImg1200x800,
            caption: page?.mainImage?.alt || page?.title || undefined,
            creditText: page?.mainImage?.credit || page?.author?.name || SITE_NAME || undefined,
            creator: page?.mainImage?.creatorName || page?.author?.name
                ? { "@type": "Person", name: page?.mainImage?.creatorName || page?.author?.name }
                : { "@type": "Organization", name: SITE_NAME },
            copyrightNotice: page?.mainImage?.copyright || undefined,
            license: page?.mainImage?.license || undefined,
            acquireLicensePage: page?.mainImage?.acquireLicensePage || undefined,
            representativeOfPage: true,
        }
        : undefined;

    // Inline/PortableText images → ImageObject array (non-primary)
    const portableImages = Array.isArray(page?.body)
        ? page.body
            .filter((b) => b?._type === 'image')
            .map((img, idx) => {
                const url = urlFor(img).width(1200).url();
                return {
                    "@type": "ImageObject",
                    // Give each a stable @id so other nodes can reference if needed
                    "@id": `${absUrl}#image-${idx + 1}`,
                    contentUrl: url,
                    url,
                    caption: img?.alt || page?.title || undefined,
                    creditText: img?.credit || undefined,
                    creator: img?.creatorName
                        ? { "@type": "Person", name: img.creatorName }
                        : undefined,
                    copyrightNotice: img?.copyright || undefined,
                    license: img?.license || undefined,
                    acquireLicensePage: img?.acquireLicensePage || undefined,
                    representativeOfPage: false,
                };
            })
        : [];

    // Article or generic WebPage entity
    const articleOrPageNode = isArticle
        ? {
            "@type": "Article",
            "@id": `${absUrl}#article`,
            headline: page?.title,
            description: page?.description,
            datePublished: page?._createdAt || undefined,
            dateModified: page?._updatedAt || undefined,
            author: page?.author?.name
                ? { "@type": "Person", name: page.author.name, url: page?.author?.url || undefined }
                : { "@type": "Organization", name: SITE_NAME, url: DOMAIN },
            publisher: { "@type": "Organization", name: SITE_NAME, url: DOMAIN },
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl },
            // For Article.image Google accepts URL or ImageObject; we pass the ImageObject if available
            image: mainImageObject || (mainImg1200x630 ? [mainImg1200x630] : undefined),
        }
        : {
            "@type": jsonLdType,
            "@id": `${absUrl}#page`,
            name: page?.title,
            description: page?.description,
            mainEntityOfPage: { "@type": "WebPage", "@id": absUrl },
        };

    // Explicit WebPage node with primaryImageOfPage → ImageObject
    const webPageNode = {
        "@type": "WebPage",
        "@id": absUrl,
        url: absUrl,
        name: page?.title || undefined,
        primaryImageOfPage: mainImageObject ? { "@id": mainImageId } : undefined,
    };

    // Build dynamic breadcrumbs from canonical path
    const segments = path.split('/').filter(Boolean);
    let acc = '';
    const dynamicCrumbs = segments.map((seg) => {
        acc += `/${seg}`;
        return {
            name: decodeURIComponent(seg)
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (ch) => ch.toUpperCase()),
            href: `${DOMAIN}${acc}`,
        };
    });

    let crumbs = [{ name: '🏠', href: `${DOMAIN}/` }, ...dynamicCrumbs];
    if (page?.title && crumbs.length > 1) {
        crumbs[crumbs.length - 1] = { name: page.title, href: absUrl };
    }

    // Consolidate JSON-LD via @graph (Article/WebPage/BreadcrumbList/ImageObjects)
    const graph = [articleOrPageNode, webPageNode];

    if (crumbs?.length) {
        graph.push({
            "@type": "BreadcrumbList",
            "@id": `${absUrl}#breadcrumbs`,
            itemListElement: crumbs.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
                item: c.href,
            })),
        });
    }

    if (mainImageObject) graph.push(mainImageObject);
    if (portableImages?.length) graph.push(...portableImages);

    const ld = { "@context": "https://schema.org", "@graph": graph };

    return (
        <>
            {/* Consolidated JSON-LD (Article/WebPage/Breadcrumbs/ImageObject[s]) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            />
            <section className="mx-auto mt-4 md:mt-16 max-w-7xl px-6 lg:px-8">
                <div className="lg:max-w-lg">
                    {/* Breadcrumbs */}
                    <p className="text-sm font-semibold text-accent">
                        {crumbs.map((crumb, index) => (
                            <span key={crumb.href}>
                                <a href={crumb.href}>{crumb.name}</a>
                                {index < crumbs.length - 1 && ' / '}
                            </span>
                        ))}
                    </p>
                </div>
                {/* article */}
                <article className="relative isolate overflow-hidden bg-white px-4 lg:overflow-visible lg:px-0">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        </div>


                        {/* Article Photo*/}
                        <div className=" p-2 lg:p-8 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden flex justify-center items-center">
                            <div className="relative w-full aspect-[3/2]">
                                <Image
                                    alt={page?.mainImage?.alt || page?.title || `${DOMAIN}${path}`}
                                    src={mainImg1200x800 || mainImg1200x630}
                                    fill
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    quality={55}
                                    sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 520px"
                                    className="object-cover rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
                                />
                            </div>
                        </div>
                        {/* Article Content*/}
                        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                            <div className="lg:pr-4">
                                <div className="max-w-xl text-base/7 text-dark lg:max-w-lg text-justify">
                                    <PortableText
                                        value={page?.body}
                                        components={{
                                            block: {
                                                h1: ({ children }) => (
                                                    <h1 className="text-3xl font-bold mt-6 mb-4 text-primary">{children}</h1>
                                                ),
                                                h2: ({ children }) => (
                                                    <h2 className="text-2xl font-semibold mt-5 mb-3 text-primary">{children}</h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <h3 className="text-xl font-medium mt-4 mb-2 text-primary">{children}</h3>
                                                ),
                                                normal: ({ children }) => <p className="mb-4 text-dark">{children}</p>,
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-4 border-accent pl-4 italic text-accent my-4">{children}</blockquote>
                                                ),
                                            },
                                            list: {
                                                bullet: ({ children }) => (
                                                    <ul className="text-accent list-disc pl-5 mb-4">{children}</ul>
                                                ),
                                                number: ({ children }) => (
                                                    <ol className="list-decimal pl-5 mb-4">{children}</ol>
                                                ),
                                            },
                                            listItem: {
                                                bullet: ({ children }) => <li className="mb-1">{children}</li>,
                                                number: ({ children }) => <li className="mb-1">{children}</li>,
                                            },
                                            types: {
                                                image: ({ value }) => (
                                                    <Image
                                                        src={urlFor(value).auto('format').width(800).url()}
                                                        alt={value.alt || "Imagine"}
                                                        width={800}
                                                        height={533}
                                                        quality={70}
                                                        sizes="(max-width:768px) 100vw, 800px"
                                                        className="my-4 rounded-lg shadow-md"
                                                    />
                                                ),
                                            },
                                            marks: {
                                                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                                underline: ({ children }) => <span className="underline">{children}</span>,
                                                link: ({ value, children }) => {
                                                    const href = value?.href || "";
                                                    const isHash = href.startsWith("#"); // ex: #kontakt
                                                    const isInternal = href.startsWith("/") || isHash; // ex: /contact, #kontakt
                                                    const isExternal = /^https?:\/\//.test(href); // ex: https://...
                                                    const className = "text-accent font-bold underline hover:text-primary transition";

                                                    if (isHash) {
                                                        return (
                                                            <a href={href} className={className}>
                                                                {children}
                                                            </a>
                                                        );
                                                    }

                                                    if (isInternal) {
                                                        return (
                                                            <Link href={href} className={className}>
                                                                {children}
                                                            </Link>
                                                        );
                                                    }

                                                    const rel = [
                                                        value?.blank ? "noopener" : null,
                                                        value?.blank ? "noreferrer" : null,
                                                        value?.nofollow ? "nofollow" : null,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ") || undefined;

                                                    return (
                                                        <a
                                                            href={href}
                                                            target={value?.blank ? "_blank" : undefined}
                                                            rel={rel}
                                                            className={className}
                                                        >
                                                            {children}
                                                        </a>
                                                    );
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
}
