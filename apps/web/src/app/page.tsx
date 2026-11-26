import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, Quote } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: { 'text/markdown': '/llms.txt' },
  },
};
import { SERVICES_LIST, ALL_PRICING_PLANS } from '@/lib/services-data';
import { PROJECTS_LIST } from '@/lib/projects-data';
import { TESTIMONIALS_LIST } from '@/lib/testimonials-data';
import { PricingCard } from '@/components/PricingCard';
import { ProjectCard } from '@/components/ProjectCard';
import { ContactFunnel } from '@/components/ContactFunnel';
import { HeroInteractiveStudio } from '@/components/home/HeroInteractiveStudio';
import {
  TechEcosystemMarquee,
  InteractiveExpertiseBento,
  AiDevSynergySection,
} from '@/components/home/HomeDynamicSections';

export default function HomePage() {
  const featuredProjects = PROJECTS_LIST.filter((p) => p.featured);
  const highlightedPlans = ALL_PRICING_PLANS.filter((p) =>
    ['site-vitrine', 'plateforme-mvp', 'assistant-ia-qualification'].includes(p.id)
  );

  return (
    <div className="flex flex-col pb-20">
      {/* 1. HERO INTERACTIF IA × DÉVELOPPEMENT SUR-MESURE */}
      <HeroInteractiveStudio />

      {/* 2. BANDEAU CINÉTIQUE DES TECHNOLOGIES & ÉCOSYSTÈME */}
      <TechEcosystemMarquee />

      <div className="flex flex-col gap-24 lg:gap-32 pt-20 lg:pt-28">
        {/* 3. BENTO INTERACTIF : NOS 5 DOMAINES D'EXPERTISE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
                Expertises 360°
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-vert-fonce mt-4 leading-tight font-heading">
                Tout l&apos;écosystème technologique pour accélérer votre croissance
              </h2>
            </div>
            <p className="text-sm sm:text-base text-vert-fonce/70 max-w-md leading-relaxed font-body">
              Du développement logiciel couplé à l&apos;IA jusqu&apos;à la maintenance physique de votre parc informatique à Dakar.
            </p>
          </div>

          <InteractiveExpertiseBento services={SERVICES_LIST} />
        </section>

        {/* 4. SYNERGIE DÉVELOPPEMENT × INTELLIGENCE ARTIFICIELLE */}
        <AiDevSynergySection />

        {/* 5. FORFAITS & TARIFS TRANSPARENTS */}
        <section className="bg-[#EFF2EC]/75 py-20 sm:py-24 border-y border-vert-fonce/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-ocre bg-ocre/10 px-3.5 py-1.5 rounded-full">
                Tarifs Fermes & Sans Surprise
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-4 font-heading">
                Nos formules les plus demandées à Dakar
              </h2>
              <p className="text-sm sm:text-base text-vert-fonce/75 leading-relaxed font-body">
                Chaque forfait inclut une architecture moderne, un accompagnement dédié et une livraison garantie dans les délais convenus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {highlightedPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  featuredOverride={plan.id === 'plateforme-mvp'}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-vert-fonce hover:text-ocre transition-colors group"
              >
                <span>Consulter l&apos;ensemble de notre grille tarifaire et offres sur-mesure</span>
                <ArrowRight className="w-4 h-4 text-ocre group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. RÉALISATIONS CONCRÈTES EN PRODUCTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
                Preuves par l&apos;Exécution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-2 font-heading">
                Projets déployés avec succès
              </h2>
              <p className="text-sm sm:text-base text-vert-fonce/70 font-body">
                Des plateformes réelles, rapides et mesurables conçues par notre équipe au Sénégal.
              </p>
            </div>

            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-vert-fonce/15 text-sm font-bold text-vert-fonce hover:border-ocre hover:text-ocre transition-all shrink-0 shadow-sm group"
            >
              <span>Voir les {PROJECTS_LIST.length} réalisations</span>
              <ArrowRight className="w-4 h-4 text-ocre group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* 7. TÉMOIGNAGES CLIENTS VÉRIFIÉS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-[#0F170A] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-16 rounded-[2.25rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(15,23,10,0.45)] relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid-dark opacity-60 pointer-events-none" />
            <div className="pointer-events-none absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-ocre/15 blur-[110px]" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-ocre-vif bg-ocre/20 px-3.5 py-1.5 rounded-full border border-ocre/30">
                  Retours Clients
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-3 font-heading">
                  La parole aux dirigeants que nous accompagnons
                </h2>
                <p className="text-sm sm:text-base text-white/70 font-body">
                  Des résultats tangibles sur leurs réservations, leurs ventes en ligne et leur organisation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS_LIST.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white/[0.05] hover:bg-white/[0.08] transition-colors rounded-2xl p-6 sm:p-7 border border-white/10 backdrop-blur-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1 text-ocre-vif">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-ocre-vif stroke-none" />
                          ))}
                        </div>
                        <Quote className="w-5 h-5 text-white/20" />
                      </div>
                      <p className="text-sm text-white/85 leading-relaxed mb-6">
                        « {t.content} »
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-white">{t.name}</p>
                        <p className="text-xs text-ocre-vif font-medium">{t.role}</p>
                        <p className="text-xs text-white/60 mt-0.5">{t.company}</p>
                      </div>
                      <span className="text-[11px] font-mono text-white/45 shrink-0">
                        {t.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. FORMULAIRE DE CONTACT & DEVIS RAPIDE */}
        <section id="contact-funnel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
              Démarrer Aujourd&apos;hui
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-3 font-heading">
              Transformons votre vision en solution performante
            </h2>
            <p className="text-sm sm:text-base text-vert-fonce/75 leading-relaxed font-body">
              Décrivez votre besoin en 2 minutes. Nos ingénieurs basés à Dakar vous répondent sous 2 heures ouvrées avec un plan d&apos;action chiffré.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="text-center py-12 text-sm text-vert-fonce">
                Chargement du simulateur de projet...
              </div>
            }
          >
            <ContactFunnel />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
