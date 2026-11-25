'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Cpu,
  Palette,
  Wrench,
  GraduationCap,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Workflow,
  Smartphone,
} from 'lucide-react';
import { ServiceDetail } from '@/lib/services-data';

const TECH_MARQUEE_ITEMS = [
  'Next.js 15 & React',
  'Laravel & PHP Architecture',
  'Angular Enterprise',
  'MySQL & PostgreSQL',
  'TypeScript Strict',
  'Agents IA WhatsApp 24/7',
  'Applications Mobiles Flutter',
  'API Wave & Orange Money',
  'Modèles LLM & RAG Privé',
  'Infrastructure Réseaux UniFi',
];

export function TechEcosystemMarquee() {
  const repeated = [...TECH_MARQUEE_ITEMS, ...TECH_MARQUEE_ITEMS];

  return (
    <div className="bg-[#131D0C] border-b border-vert-fonce/15 py-4 overflow-hidden select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {repeated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 text-xs sm:text-sm font-mono text-white/75 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ocre-vif" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface InteractiveExpertiseBentoProps {
  services: ServiceDetail[];
}

export function InteractiveExpertiseBento({ services }: InteractiveExpertiseBentoProps) {
  const getIcon = (slug: string, isDarkCard: boolean) => {
    const cls = `w-6 h-6 ${isDarkCard ? 'text-ocre-vif' : 'text-vert-fonce group-hover:text-white transition-colors'}`;
    switch (slug) {
      case 'developpement-web-mobile':
        return <Code2 className={cls} />;
      case 'ia-automatisation':
        return <Cpu className="w-6 h-6 text-ocre-vif" />;
      case 'branding-marketing':
        return <Palette className={cls} />;
      case 'maintenance-it-reseaux':
        return <Wrench className={cls} />;
      case 'formations-pratiques':
        return <GraduationCap className={cls} />;
      default:
        return <Sparkles className={cls} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
      {services.map((service, index) => {
        const isTopRow = index < 2;
        const isAiCard = service.slug === 'ia-automatisation';
        const colSpan = isTopRow ? 'lg:col-span-6' : 'lg:col-span-4';

        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
            className={`${colSpan} rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden ${
              isAiCard
                ? 'bg-[#0F170A] text-white border border-ocre/35 shadow-[0_24px_60px_-15px_rgba(15,23,10,0.35)] hover:-translate-y-1.5'
                : 'bg-white text-vert-fonce border border-vert-fonce/10 shadow-[0_8px_30px_rgba(15,23,10,0.04)] hover:shadow-[0_22px_50px_rgba(15,23,10,0.1)] hover:-translate-y-1.5'
            }`}
          >
            {isAiCard && (
              <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-ocre/20 blur-3xl" />
            )}

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isAiCard
                      ? 'bg-ocre/20 border border-ocre/30'
                      : 'bg-[#EFF2EC] group-hover:bg-vert-fonce'
                  }`}
                >
                  {getIcon(service.slug, isAiCard)}
                </div>

                {isAiCard ? (
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-ocre/20 text-ocre-vif border border-ocre/30 font-semibold">
                    Accélérateur IA 24/7
                  </span>
                ) : (
                  service.plans &&
                  service.plans.length > 0 && (
                    <span className="text-[11px] font-mono font-semibold text-olive bg-[#EFF2EC] px-3 py-1 rounded-full border border-vert-fonce/10">
                      Dès {service.plans[0].priceDisplay}
                    </span>
                  )
                )}
              </div>

              <h3
                className={`text-xl sm:text-2xl font-bold mb-3 font-heading transition-colors ${
                  isAiCard ? 'text-white' : 'text-vert-fonce group-hover:text-ocre'
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`text-sm mb-6 leading-relaxed ${
                  isAiCard ? 'text-white/75' : 'text-vert-fonce/70'
                }`}
              >
                {service.summary}
              </p>

              {/* Livrables clés */}
              <ul className="space-y-2.5 mb-7">
                {service.deliverables.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2.5 text-xs sm:text-[13px] ${
                      isAiCard ? 'text-white/85' : 'text-vert-fonce/85'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        isAiCard ? 'bg-ocre-vif' : 'bg-ocre'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Badges de stack pour les 2 cartes phares du haut */}
              {isTopRow && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                        isAiCard
                          ? 'bg-white/[0.06] border-white/10 text-white/80'
                          : 'bg-[#F8F9F6] border-vert-fonce/10 text-vert-fonce/80'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`relative z-10 pt-4 border-t flex items-center justify-between ${
                isAiCard ? 'border-white/10' : 'border-vert-fonce/10'
              }`}
            >
              <Link
                href={`/services/${service.slug}`}
                className={`text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors ${
                  isAiCard
                    ? 'text-ocre-vif hover:text-white'
                    : 'text-vert-fonce hover:text-ocre'
                }`}
              >
                <span>Explorer l&apos;expertise</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {isAiCard && service.plans && service.plans[0] && (
                <span className="text-[11px] font-mono text-white/60">
                  {service.plans[0].priceDisplay}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const SYNERGY_PILLARS = [
  {
    id: 'vitesse',
    tag: 'Ingénierie Frontend & Edge',
    title: 'Interfaces ultra-fluides pensées pour le mobile au Sénégal',
    description:
      'Fini les thèmes WordPress lourds qui mettent 8 secondes à charger. Nous codons en Next.js et TypeScript pour offrir un affichage quasi-instantané sur 4G/3G et doubler votre taux de conversion.',
    stat: '< 1,2s',
    statLabel: 'Temps de chargement moyen constaté',
    highlights: [
      'Architecture composant par composant sur-mesure',
      'Optimisation SEO local Dakar & données structurées',
      'Expérience tactile irréprochable sur tous les smartphones',
    ],
    icon: Smartphone,
  },
  {
    id: 'ia-metier',
    tag: 'Intelligence Artificielle Embarquée',
    title: 'Des agents IA formés sur vos tarifs, vos stocks et vos process',
    description:
      'Nous connectons les meilleurs modèles de langage directement à votre WhatsApp Business et à votre site web. Votre assistant répond en quelques dixièmes de seconde, qualifie le budget et prépare la vente.',
    stat: '24h/24',
    statLabel: 'Qualification commerciale sans interruption',
    highlights: [
      'Base de connaissances privée et strictement confidentielle',
      'Transfert immédiat vers un humain dès qu’un dossier est complexe',
      'Zéro prospect perdu le soir, le week-end ou les jours fériés',
    ],
    icon: Workflow,
  },
  {
    id: 'souverainete',
    tag: 'Paiements Locaux & Souveraineté',
    title: 'Wave, Orange Money et propriété intégrale de votre code',
    description:
      'Chaque plateforme intègre nativement les habitudes de paiement ouest-africaines, génère automatiquement vos reçus PDF et vous appartient à 100%, sans abonnement captif caché.',
    stat: '100%',
    statLabel: 'Propriété intellectuelle livrée au client',
    highlights: [
      'Raccordement sécurisé Wave, Orange Money & Carte Bancaire',
      'Back-office clair pour piloter vos ventes en autonomie',
      'Garantie corrective de 3 mois incluse après mise en ligne',
    ],
    icon: ShieldCheck,
  },
];

export function AiDevSynergySection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SYNERGY_PILLARS[selectedIdx];
  const ActiveIcon = current.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white border border-vert-fonce/10 shadow-[0_20px_60px_-20px_rgba(15,23,10,0.08)] p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-light opacity-60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Colonne gauche : Sélecteur interactif */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-ocre bg-ocre/10 px-3 py-1 rounded-full">
                <Terminal className="w-3.5 h-3.5" /> La Signature Majeli
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-vert-fonce mt-3 font-heading leading-tight">
                Quand la rigueur du code rencontre la puissance de l&apos;IA.
              </h2>
            </div>

            <div className="space-y-2.5">
              {SYNERGY_PILLARS.map((pillar, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#0F170A] text-white border-[#0F170A] shadow-lg'
                        : 'bg-[#F8F9F6] text-vert-fonce border-vert-fonce/10 hover:bg-[#EFF2EC]'
                    }`}
                  >
                    <div>
                      <p
                        className={`text-[11px] font-mono uppercase tracking-wider ${
                          isSelected ? 'text-ocre-vif' : 'text-olive'
                        }`}
                      >
                        {pillar.tag}
                      </p>
                      <p className="text-sm font-bold mt-0.5 line-clamp-1">{pillar.title}</p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-ocre-vif translate-x-0.5' : 'text-vert-fonce/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : Panneau de démonstration animé */}
          <div className="lg:col-span-7">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-3xl bg-[#F8F9F6] border border-vert-fonce/10 p-6 sm:p-9 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-vert-fonce/10">
                <div className="w-12 h-12 rounded-2xl bg-vert-fonce text-white flex items-center justify-center shadow-sm">
                  <ActiveIcon className="w-6 h-6 text-ocre-vif" />
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-extrabold font-mono text-vert-fonce">
                    {current.stat}
                  </p>
                  <p className="text-xs text-olive font-medium">{current.statLabel}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-vert-fonce font-heading">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-vert-fonce/75 leading-relaxed">
                  {current.description}
                </p>
              </div>

              <ul className="space-y-2.5 pt-1">
                {current.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-vert-fonce font-medium">
                    <CheckCircle2 className="w-4 h-4 text-ocre shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/contact?type=projet"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-vert-fonce text-white text-xs sm:text-sm font-bold hover:bg-[#1A2612] transition-colors"
                >
                  <span>Discuter de votre architecture</span>
                  <ArrowRight className="w-4 h-4 text-ocre-vif" />
                </Link>
                <span className="text-xs font-mono text-olive">
                  Dakar, Liberté 5 · Équipe interne
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
