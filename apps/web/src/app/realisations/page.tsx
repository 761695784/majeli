import React from 'react';
import { Metadata } from 'next';
import { PROJECTS_LIST } from '@/lib/projects-data';
import { RealisationsInteractiveView } from '@/components/realisations/RealisationsInteractiveView';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Nos Réalisations E-Commerce, Web & IA au Sénégal',
  description:
    'Découvrez le portfolio de Majeli Connect à Dakar : AMPA Boutique (costumes & essayage IA), AMEG International (équipements cuisine pro), Teranga Box, Résidence Good House et Casa Impact.',
  alternates: {
    canonical: '/realisations',
  },
  openGraph: {
    title: 'Portfolio & Études de Cas | Majeli Connect Dakar',
    description:
      'Boutiques e-commerce, assistants IA, sites vitrines haut de gamme et plateformes B2B conçus et déployés par Majeli Connect au Sénégal.',
    url: 'https://majeliconnect.com/realisations',
  },
};

export default function RealisationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Réalisations', path: '/realisations' },
        ]}
      />
      <RealisationsInteractiveView projects={PROJECTS_LIST} />
    </>
  );
}
