import React from 'react';
import { Metadata } from 'next';
import { FormationsInteractiveView } from '@/components/formations/FormationsInteractiveView';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Formations Pratiques IA, Bureautique & Robotique Jeunes à Dakar',
  description:
    'Ateliers pratiques à Dakar et en entreprise : Intelligence Artificielle appliquée, initiation Robotique & Codage (8–18 ans) et productivité cloud.',
  alternates: {
    canonical: '/formations',
  },
  openGraph: {
    title: 'Formations IA Entreprises & Robotique Jeunes à Dakar | Majeli Connect',
    description:
      '30% méthode, 70% pratique réelle : formez vos équipes à l’IA générative et initiez les jeunes à la robotique et au code à Dakar.',
    url: 'https://majeliconnect.com/formations',
  },
};

export default function FormationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Formations', path: '/formations' },
        ]}
      />
      <FormationsInteractiveView />
    </>
  );
}
