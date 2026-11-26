import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { CONTACT_INFO } from '@/lib/contact';

// Informations légales de l'éditeur : à tenir à jour en cas de changement
// (forme juridique, adresse, immatriculation).
const LEGAL_INFO = {
  denomination: 'Majeli Connect',
  ninea: '012376704',
  rccm: 'SN.DKR.2025.A.30644',
  directeurPublication: 'Malang MARNA',
  adresse: 'Sicap Liberté 5, Dakar, Sénégal',
  derniereMiseAJour: '26 novembre 2026',
};

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site majeliconnect.com : éditeur Majeli Connect (NINEA 012376704, RCCM SN.DKR.2025.A.30644), directeur de la publication, hébergeur et protection des données personnelles.',
  alternates: {
    canonical: '/mentions-legales',
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-vert-fonce font-heading">{title}</h2>
      <div className="space-y-2 text-sm text-vert-fonce/80 leading-relaxed">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Mentions légales', path: '/mentions-legales' },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce font-heading mb-3">
        Mentions légales
      </h1>
      <p className="text-xs text-vert-fonce/60 mb-10">Dernière mise à jour : {LEGAL_INFO.derniereMiseAJour}</p>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-vert-fonce/10 shadow-sm space-y-9">
        <Section title="Éditeur du site">
          <p>
            Le site <strong>majeliconnect.com</strong> est édité par <strong>{LEGAL_INFO.denomination}</strong>.
          </p>
          <ul className="space-y-1">
            <li>Adresse : {LEGAL_INFO.adresse}</li>
            <li>NINEA : {LEGAL_INFO.ninea}</li>
            <li>RCCM : {LEGAL_INFO.rccm}</li>
            <li>
              Téléphone : <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-olive font-semibold hover:text-ocre">{CONTACT_INFO.phone}</a>
            </li>
            <li>
              Email : <a href={`mailto:${CONTACT_INFO.email}`} className="text-olive font-semibold hover:text-ocre">{CONTACT_INFO.email}</a>
            </li>
          </ul>
        </Section>

        <Section title="Directeur de la publication">
          <p>{LEGAL_INFO.directeurPublication}</p>
        </Section>

        <Section title="Hébergement">
          <p>
            Le site est hébergé par <strong>Hostinger International Ltd</strong>, 61 Lordou Vironos Street, 6023 Larnaca,
            Chypre (<a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-olive font-semibold hover:text-ocre">hostinger.com</a>).
            Les serveurs sont situés en Europe.
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            Les textes, visuels, logos et le code source du site sont la propriété de {LEGAL_INFO.denomination}, sauf mention
            contraire. Les marques et visuels des clients présentés dans les réalisations restent la propriété de leurs
            titulaires respectifs. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </Section>

        <Section title="Données personnelles">
          <p>
            Les informations transmises par le formulaire de contact (nom, entreprise, email, téléphone, message et détails du
            projet) servent uniquement à répondre à votre demande et à établir un devis. Elles sont envoyées par email à
            l'équipe de {LEGAL_INFO.denomination} et ne sont ni vendues, ni cédées à des tiers.
          </p>
          <p>
            Conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel,
            vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer,
            écrivez à <a href={`mailto:${CONTACT_INFO.email}`} className="text-olive font-semibold hover:text-ocre">{CONTACT_INFO.email}</a>.
            Vous pouvez également saisir la Commission de Protection des Données Personnelles (CDP) du Sénégal.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Le site n'utilise pas de cookies publicitaires ni de traceurs de mesure d'audience tiers.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Pour toute question sur ces mentions légales, utilisez la{' '}
            <Link href="/contact" className="text-olive font-semibold hover:text-ocre">page contact</Link> ou écrivez à{' '}
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-olive font-semibold hover:text-ocre">{CONTACT_INFO.email}</a>.
          </p>
        </Section>
      </div>
    </div>
  );
}
