import React from 'react';
import { CONTACT_INFO } from '@/lib/contact';
import { SERVICES_LIST } from '@/lib/services-data';
import { TESTIMONIALS_LIST } from '@/lib/testimonials-data';

const SITE_URL = 'https://majeliconnect.com';

export function GlobalStructuredData() {
  const offers = SERVICES_LIST.flatMap((s) =>
    (s.plans || []).map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      url: `${SITE_URL}/services/${s.slug}`,
      ...(plan.priceAmount
        ? {
            price: plan.priceAmount,
            priceCurrency: 'XOF',
          }
        : {}),
      availability: 'https://schema.org/InStock',
    }))
  );

  const reviews = TESTIMONIALS_LIST.map((t) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.name,
      jobTitle: t.role,
    },
    reviewBody: t.content,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Majeli Connect',
        alternateName: ['Majeli Connect SARL', 'Agence Majeli Connect Dakar'],
        description: CONTACT_INFO.description,
        inLanguage: 'fr-SN',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': ['ProfessionalService', 'Organization'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Majeli Connect',
        legalName: CONTACT_INFO.legalName,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/assets/og-majeli.png`,
        description:
          "Agence d'ingénierie logicielle, de création de sites web et e-commerce (Next.js, Laravel, Angular), d'applications mobiles Flutter, d'assistants IA WhatsApp et de maintenance informatique à Dakar, Sénégal.",
        telephone: CONTACT_INFO.phoneRaw,
        email: CONTACT_INFO.email,
        priceRange: '200 000 FCFA - 2 500 000 FCFA',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sicap Liberté 5',
          addressLocality: 'Dakar',
          addressRegion: 'Dakar',
          addressCountry: 'SN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 14.7225,
          longitude: -17.4589,
        },
        hasMap: 'https://www.google.com/maps?cid=7270886052611895488',
        sameAs: [
          'https://www.google.com/maps?cid=7270886052611895488',
          'https://www.tiktok.com/@majeliconnect',
          'https://www.linkedin.com/company/majeli-connect/',
        ],
        areaServed: [
          { '@type': 'City', name: 'Dakar' },
          { '@type': 'Country', name: 'Sénégal' },
          { '@type': 'Place', name: "Afrique de l'Ouest" },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '18:30',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '14:00',
          },
        ],
        knowsAbout: [
          'Création de site web à Dakar',
          'Développement E-Commerce Wave et Orange Money',
          'Next.js',
          'Laravel',
          'Angular',
          'MySQL',
          'PostgreSQL',
          'Applications mobiles Flutter iOS et Android',
          'Assistant IA WhatsApp Business',
          'Maintenance informatique et réseaux entreprise à Dakar',
          'Formations Intelligence Artificielle et Robotique au Sénégal',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: String(TESTIMONIALS_LIST.length),
          bestRating: '5',
          worstRating: '1',
        },
        review: reviews,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services Digitaux & Technologiques Majeli Connect',
          itemListElement: offers,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
