import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Clock } from 'lucide-react';
import { ContactFunnel } from '@/components/ContactFunnel';
import { ContactInteractiveHero } from '@/components/contact/ContactInteractiveHero';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { CONTACT_INFO } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contact & Devis Gratuit sous 2h à Dakar',
  description:
    'Contactez Majeli Connect à Dakar (Liberté 5) : devis rapide sous 2h ouvrées pour votre site web, e-commerce, application mobile, agent IA ou maintenance informatique.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contacter Majeli Connect à Dakar | Devis Gratuit sous 2h',
    description:
      'Ligne directe +221 78 264 34 38, WhatsApp Business et simulateur de devis pour vos projets web, IA et IT au Sénégal.',
    url: 'https://majeliconnect.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pb-20 space-y-16">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Contact & Devis', path: '/contact' },
        ]}
      />
      <ContactInteractiveHero />

      {/* Formulaire & Entonnoir interactif */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="text-center py-12 text-sm text-vert-fonce">
              Chargement du simulateur...
            </div>
          }
        >
          <ContactFunnel />
        </Suspense>
      </section>

      {/* Engagements de confidentialité */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-vert-fonce/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#EFF2EC] flex items-center justify-center text-olive shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-vert-fonce">
                Confidentialité & Protection de votre Idée
              </p>
              <p className="text-xs text-vert-fonce/70">
                Votre cahier des charges reste strictement confidentiel. Accord de non-divulgation (NDA) disponible sur simple demande.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-olive font-semibold shrink-0">
            <Clock className="w-3.5 h-3.5 text-ocre" />
            <span>Lun–Sam</span>
          </div>
        </div>
      </section>
    </div>
  );
}
