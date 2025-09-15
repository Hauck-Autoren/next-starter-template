import { ORGANIZATION, DOMAIN } from '@/lib/metadata';

const CompanyData = () => {
    const {
        name,
        logo,
        photo,
        email,
        telephone,
        address,
        representative,
    } = ORGANIZATION;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": name,
        "url": DOMAIN,
        "logo": logo,
        "image": photo,
        "email": email,
        "telephone": telephone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address.streetAddress,
            "addressLocality": address.addressLocality,
            "addressRegion": address.addressRegion,
            "postalCode": address.postalCode,
            "addressCountry": address.addressCountry
        },
        "founder": representative,
        "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "telephone",
            "contactType": "customer support",
            "availableLanguage": ["de", "en"],
            "areaServed": "DE"
        }],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </>
    );
};

export default CompanyData;