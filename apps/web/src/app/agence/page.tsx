import React from 'react';
import { Metadata } from 'next';
import { AgenceInteractiveView } from '@/components/agence/AgenceInteractiveView';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: "L'Agence Majeli Connect | Ingénierie Logicielle & IA à Dakar",
  description:
    "Découvrez l'équipe, les valeurs et les 4 pôles d'ingénierie (Next.js, Laravel, Angular, IA, Réseaux IT) de Majeli Connect à Dakar, Liberté 5.",
  alternates: {
    canonical: '/agence',
  },
  openGraph: {
    title: "À Propos de Majeli Connect | Agence Technologique à Dakar",
    description:
      'Ingénierie logicielle souveraine, intelligence artificielle appliquée et proximité terrain à Dakar, Liberté 5.',
    url: 'https://majeliconnect.com/agence',
  },
};

export default function AgencePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: "L'Agence", path: '/agence' },
        ]}
      />
      <AgenceInteractiveView />
    </>
  );
}
