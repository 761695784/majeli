import React from 'react';
import { Metadata } from 'next';
import { SERVICES_LIST, SUR_DEVIS_SERVICES } from '@/lib/services-data';
import { ServicesInteractiveView } from '@/components/services/ServicesInteractiveView';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Services & Tarifs Transparents | Next.js, Laravel, Angular & IA à Dakar',
  description:
    'Découvrez nos offres forfaitaires fermes à Dakar : Site vitrine (450 000 FCFA), Plateforme Web & E-Commerce (dès 800 000 FCFA), App mobile Flutter, Assistant IA WhatsApp et maintenance IT.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services Digitaux & Tarifs Transparents | Majeli Connect Dakar',
    description:
      'Forfaits clairs en FCFA : développement Next.js, Laravel, Angular, MySQL, applications mobiles Flutter, agents IA WhatsApp et maintenance informatique à Dakar.',
    url: 'https://majeliconnect.com/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Services & Tarifs', path: '/services' },
        ]}
      />
      <ServicesInteractiveView
        services={SERVICES_LIST}
        surDevisList={SUR_DEVIS_SERVICES}
      />
    </>
  );
}
