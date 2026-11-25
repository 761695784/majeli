import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight, Check, ArrowLeft, Clock } from 'lucide-react';
import { SERVICES_LIST } from '@/lib/services-data';
import { PricingCard } from '@/components/PricingCard';
import { getWhatsAppUrl } from '@/lib/contact';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_LIST.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_LIST.find((s) => s.slug === slug);
  if (!service) return { title: 'Service non trouvé' };

  return {
    title: `${service.title} à Dakar`,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Majeli Connect Dakar`,
      description: service.summary,
      url: `https://majeliconnect.com/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_LIST.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pb-20 space-y-16">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Services & Tarifs', path: '/services' },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
      />
      {/* En-tête sombre architectural */}
      <section className="relative overflow-hidden bg-[#0D1508] text-white pt-10 sm:pt-14 pb-14 sm:pb-18 border-b border-white/10">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-85 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/65 hover:text-ocre-vif mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à tous les services & tarifs</span>
          </Link>

          <div className="max-w-4xl space-y-4">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-ocre-vif bg-ocre/20 border border-ocre/30 px-3.5 py-1 rounded-full">
              Pôle d&apos;Expertise Majeli
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed font-body">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Livrables & Technologies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-vert-fonce/10 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-vert-fonce font-heading">
              Ce que comprend notre accompagnement
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-vert-fonce/90">
                  <div className="w-5 h-5 rounded-full bg-[#EFF2EC] text-olive flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-[#EFF2EC] rounded-3xl p-6 sm:p-8 border border-vert-fonce/10 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-vert-fonce mb-3 font-heading">
                Stack technique & Outils maîtrisés
              </h3>
              <p className="text-xs text-vert-fonce/75 mb-6 leading-relaxed">
                Des technologies pérennes, rapides et documentées pour garantir la souveraineté de votre plateforme.
              </p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-xs font-mono font-bold text-vert-fonce border border-vert-fonce/10 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F170A] text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-ocre-vif font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Délais & Validation par Jalon</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Cahier des charges sous 48h et démonstration régulière à chaque étape avant la mise en production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes du processus */}
      <section className="bg-white py-16 border-y border-vert-fonce/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full">
              Méthode en 4 Jalons
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-vert-fonce mt-3 font-heading">
              Comment se déroule votre projet ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#F8F9F6] rounded-3xl p-6 border border-vert-fonce/10 space-y-3"
              >
                <span className="text-xs font-mono font-bold text-ocre uppercase tracking-wider">
                  Étape 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-vert-fonce font-heading">
                  {step.title.replace(/^\d+\.\s*/, '')}
                </h3>
                <p className="text-xs text-vert-fonce/75 leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forfaits tarifaires si applicables */}
      {service.plans && service.plans.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-vert-fonce mb-2 font-heading">
              Formules & Tarifs — {service.shortTitle}
            </h2>
            <p className="text-sm text-vert-fonce/75 font-body">
              Tarification claire et ferme, livrée clé en main.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {service.plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>
      )}

      {service.customQuoteNotes && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-7 rounded-3xl bg-white border border-vert-fonce/10 shadow-sm text-center space-y-3">
            <p className="text-sm text-vert-fonce/85 leading-relaxed font-body">
              {service.customQuoteNotes}
            </p>
            <Link
              href="/contact?type=projet"
              className="inline-flex items-center gap-2 text-xs font-bold text-ocre hover:text-vert-fonce transition-colors"
            >
              <span>Demander un chiffrage personnalisé</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F170A] text-white rounded-[2.25rem] p-8 sm:p-12 text-center border border-white/10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-heading">
            Prêt à démarrer votre projet {service.shortTitle} ?
          </h2>
          <p className="text-sm text-white/75 max-w-xl mx-auto mb-6 font-body">
            Échangez avec nos ingénieurs à Dakar pour obtenir une étude de faisabilité et un devis sous 2h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contact?type=projet&service=${service.slug}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ocre text-white font-bold text-sm hover:bg-ocre-vif transition-colors"
            >
              Demander un devis pour {service.shortTitle}
            </Link>
            <a
              href={getWhatsAppUrl(`Bonjour Majeli Connect, je souhaite échanger sur votre service : ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.08] text-white border border-white/15 font-bold text-sm hover:bg-white/[0.15] transition-colors"
            >
              Poser une question sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
