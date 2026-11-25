'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import {
  Code2,
  Cpu,
  Palette,
  Wrench,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Laptop,
  Network,
  Users,
  Bot,
  CheckCircle2,
  Layers,
  Terminal,
  Zap,
} from 'lucide-react';
import { ServiceDetail, PricingPlan } from '@/lib/services-data';
import { PricingCard } from '@/components/PricingCard';
import { getWhatsAppUrl } from '@/lib/contact';

interface SurDevisItem {
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface ServicesInteractiveViewProps {
  services: ServiceDetail[];
  surDevisList: SurDevisItem[];
}

const PRICING_FILTERS = [
  { id: 'all', label: 'Toutes les formules' },
  { id: 'developpement-web-mobile', label: 'Web, Mobile & SaaS' },
  { id: 'ia-automatisation', label: 'IA & Automatisation' },
  { id: 'branding-marketing', label: 'Branding & Réseaux' },
];

export function ServicesInteractiveView({
  services,
  surDevisList,
}: ServicesInteractiveViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activePoleSlug, setActivePoleSlug] = useState<string>(services[0]?.slug || 'developpement-web-mobile');
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(240);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const heroSpotlight = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.16), rgba(96, 108, 56, 0.08) 45%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const allPlans: PricingPlan[] = services.flatMap((s) => s.plans || []);
  const filteredPlans =
    selectedFilter === 'all'
      ? allPlans
      : allPlans.filter((p) => p.serviceCategory === selectedFilter);

  const activePole = services.find((s) => s.slug === activePoleSlug) || services[0];

  const renderPoleIcon = (slug: string, className = 'w-5 h-5') => {
    switch (slug) {
      case 'developpement-web-mobile':
        return <Code2 className={className} />;
      case 'ia-automatisation':
        return <Cpu className={className} />;
      case 'branding-marketing':
        return <Palette className={className} />;
      case 'maintenance-it-reseaux':
        return <Wrench className={className} />;
      case 'formations-pratiques':
        return <GraduationCap className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  const renderSurDevisIcon = (iconName: string) => {
    const cls = 'w-6 h-6 text-ocre';
    switch (iconName) {
      case 'Laptop':
        return <Laptop className={cls} />;
      case 'ShieldCheck':
        return <ShieldCheck className={cls} />;
      case 'Network':
        return <Network className={cls} />;
      case 'Users':
        return <Users className={cls} />;
      case 'Bot':
        return <Bot className={cls} />;
      default:
        return <Sparkles className={cls} />;
    }
  };

  return (
    <div className="pb-20 space-y-24 lg:space-y-32">
      {/* 1. HERO ARCHITECTURAL INTERACTIF */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#0D1508] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: heroSpotlight }}
        />
        <div className="pointer-events-none absolute -top-32 right-1/4 w-[480px] h-[480px] rounded-full bg-ocre/15 blur-[130px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Gauche : Promesse & Engagements */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15"
              >
                <span className="w-2 h-2 rounded-full bg-ocre-vif animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
                  Offres Claires · Architecture Sur-Mesure · Dakar
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl sm:text-5xl xl:text-[3.35rem] font-extrabold text-white leading-[1.08] font-heading"
              >
                Nos expertises technologiques &{' '}
                <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
                  tarifs transparents
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body"
              >
                Zéro frais cachés, zéro template fragile. Que vous lanciez un site vitrine, un portail métier en Next.js, Laravel ou Angular, ou un agent IA WhatsApp, vous connaissez chaque livrable et chaque franc CFA dès le départ.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-white/80"
              >
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                  <Clock className="w-4 h-4 text-ocre-vif" /> Devis détaillé sous 2h
                </span>
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-olive-vif" /> Code 100% propriétaire
                </span>
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                  <Zap className="w-4 h-4 text-ocre-vif" /> Garantie corrective 3 mois
                </span>
              </motion.div>
            </div>

            {/* Droite : Sélecteur Radar Interactif des Stacks par Pôle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-[#131D0C]/90 border border-white/15 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <span className="text-xs font-mono text-white/70 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ocre-vif" />
                    Explorateur de Stack Technique
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-olive/25 text-olive-vif border border-olive-vif/30">
                    5 Pôles Actifs
                  </span>
                </div>

                {/* Boutons Pôles rapides */}
                <div className="flex flex-wrap gap-1.5">
                  {services.map((s, idx) => {
                    const isSelected = s.slug === activePole.slug;
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => setActivePoleSlug(s.slug)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-ocre text-white shadow-md shadow-ocre/30'
                            : 'bg-white/[0.05] text-white/65 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
                        <span>{s.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Détail animé du pôle sélectionné */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePole.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-2xl bg-black/30 border border-white/10 p-4 space-y-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-white">{activePole.title}</p>
                    </div>
                    <p className="text-xs text-white/65 leading-relaxed line-clamp-2">
                      {activePole.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activePole.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/[0.07] border border-white/15 text-[11px] font-mono text-[#FEFAE0]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={`#${activePole.slug}`}
                    className="text-ocre-vif hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>Voir les livrables de ce pôle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <span className="font-mono text-[11px] text-white/45">
                    Ingénierie interne
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. GRILLE TARIFAIRE FILTRABLE ANIMÉE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ocre bg-ocre/10 px-3.5 py-1.5 rounded-full">
              Grille Tarifaire Officielle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-3 font-heading">
              Forfaits clé en main à prix fermes
            </h2>
          </div>

          {/* Barre de filtre avec pilule coulissante Framer Motion */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#EFF2EC] border border-vert-fonce/10">
            {PRICING_FILTERS.map((filter) => {
              const active = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    active ? 'text-white' : 'text-vert-fonce/70 hover:text-vert-fonce'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricingActivePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-vert-fonce shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="flex"
              >
                <div className="w-full flex [&>*]:w-full">
                  <PricingCard
                    plan={plan}
                    featuredOverride={plan.id === 'plateforme-mvp'}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. LES 5 PÔLES D'INTERVENTION EN DÉTAIL */}
      <section className="bg-[#EFF2EC]/80 py-20 sm:py-24 border-y border-vert-fonce/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-white px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
              Architecture & Méthodologie
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-3 font-heading">
              Nos 5 Pôles d&apos;Ingénierie en détail
            </h2>
            <p className="text-sm sm:text-base text-vert-fonce/75 font-body leading-relaxed">
              Chaque domaine combine des livrables contractuels précis, un processus structuré en 4 étapes et des technologies éprouvées en production.
            </p>
          </div>

          <div className="space-y-10">
            {services.map((service, index) => {
              const isPole1 = index === 0;
              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className={`rounded-3xl p-6 sm:p-10 border scroll-mt-24 transition-shadow ${
                    isPole1
                      ? 'bg-[#0F170A] text-white border-ocre/40 shadow-[0_25px_70px_-15px_rgba(15,23,10,0.35)]'
                      : 'bg-white text-vert-fonce border-vert-fonce/10 shadow-[0_10px_35px_rgba(15,23,10,0.05)] hover:shadow-[0_20px_50px_rgba(15,23,10,0.09)]'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Présentation du pôle */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                            isPole1
                              ? 'bg-ocre/20 text-ocre-vif border border-ocre/30'
                              : 'bg-[#EFF2EC] text-vert-fonce'
                          }`}
                        >
                          {renderPoleIcon(service.slug, 'w-5 h-5')}
                        </div>
                        <span
                          className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                            isPole1
                              ? 'bg-white/10 text-ocre-vif'
                              : 'bg-ocre/10 text-ocre'
                          }`}
                        >
                          Pôle 0{index + 1}
                        </span>
                      </div>

                      <h3
                        className={`text-2xl sm:text-3xl font-extrabold font-heading leading-tight ${
                          isPole1 ? 'text-white' : 'text-vert-fonce'
                        }`}
                      >
                        {service.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed font-body ${
                          isPole1 ? 'text-white/75' : 'text-vert-fonce/75'
                        }`}
                      >
                        {service.fullDescription}
                      </p>

                      {/* Mini-timeline des 4 étapes */}
                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {service.processSteps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className={`p-3 rounded-xl border text-xs ${
                              isPole1
                                ? 'bg-white/[0.04] border-white/10 text-white/85'
                                : 'bg-[#F8F9F6] border-vert-fonce/10 text-vert-fonce'
                            }`}
                          >
                            <span className="font-mono text-[10px] text-ocre-vif font-bold block">
                              ÉTAPE 0{sIdx + 1}
                            </span>
                            <span className="font-bold line-clamp-1 mt-0.5">
                              {step.title.replace(/^\d+\.\s*/, '')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className={`inline-flex items-center gap-2 text-sm font-bold transition-colors group ${
                            isPole1
                              ? 'text-ocre-vif hover:text-white'
                              : 'text-vert-fonce hover:text-ocre'
                          }`}
                        >
                          <span>Découvrir la fiche complète du pôle</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Livrables & Technologies */}
                    <div className="lg:col-span-7 space-y-6">
                      <div
                        className={`rounded-2xl p-5 sm:p-6 border ${
                          isPole1
                            ? 'bg-white/[0.04] border-white/10'
                            : 'bg-[#F8F9F6] border-vert-fonce/10'
                        }`}
                      >
                        <h4
                          className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${
                            isPole1 ? 'text-white/60' : 'text-vert-fonce/60'
                          }`}
                        >
                          Livrables contractuels garantis
                        </h4>
                        <ul className="space-y-3 text-sm">
                          {service.deliverables.map((item, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2.5 ${
                                isPole1 ? 'text-white/90' : 'text-vert-fonce/90'
                              }`}
                            >
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isPole1 ? 'text-olive-vif' : 'text-olive'
                                }`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4
                          className={`text-xs font-mono font-bold uppercase tracking-wider mb-3 ${
                            isPole1 ? 'text-white/60' : 'text-vert-fonce/60'
                          }`}
                        >
                          Technologies & Environnements maîtrisés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => {
                            const highlightTech = ['Laravel', 'Angular', 'MySQL', 'Next.js', 'Flutter'].includes(tech);
                            return (
                              <span
                                key={tech}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-transform hover:-translate-y-0.5 ${
                                  isPole1
                                    ? highlightTech
                                      ? 'bg-ocre/20 text-[#FEFAE0] border-ocre-vif/50 shadow-sm'
                                      : 'bg-white/[0.07] text-white/85 border-white/15'
                                    : 'bg-[#EFF2EC] text-vert-fonce border-vert-fonce/10'
                                }`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRESTATIONS SUR DEVIS : INFRASTRUCTURE, RÉSEAUX & FORMATIONS */}
      <section id="sur-devis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-ocre bg-ocre/10 px-3.5 py-1.5 rounded-full">
            Interventions sur Site & Sur-Mesure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-3 font-heading">
            Maintenance IT, Réseaux & Formations sur devis
          </h2>
          <p className="text-sm sm:text-base text-vert-fonce/75 font-body">
            Nous réalisons un diagnostic initial gratuit de votre infrastructure ou de vos besoins d&apos;équipe à Dakar avant de vous soumettre une proposition chiffrée sur mesure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surDevisList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white rounded-3xl p-7 border border-vert-fonce/10 shadow-[0_8px_30px_rgba(15,23,10,0.04)] hover:shadow-[0_22px_45px_rgba(15,23,10,0.1)] hover:-translate-y-1.5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF2EC] flex items-center justify-center group-hover:bg-vert-fonce transition-colors">
                    {renderSurDevisIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-olive bg-[#EFF2EC] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-vert-fonce mb-2.5 group-hover:text-ocre transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-vert-fonce/75 leading-relaxed mb-6 font-body">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-vert-fonce/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-ocre">Diagnostic gratuit</span>
                <Link
                  href="/contact?type=intervention"
                  className="inline-flex items-center gap-1 text-xs font-bold text-vert-fonce group-hover:text-ocre transition-colors"
                >
                  <span>Demander un devis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ocre group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F170A] text-white rounded-[2.25rem] p-8 sm:p-14 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid-dark opacity-65 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Un cahier des charges spécifique à chiffrer ?
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-body leading-relaxed">
              Échangeons autour de votre architecture cible (Next.js, Laravel, Angular, Mobile ou Agent IA). Rencontre dans nos bureaux à Liberté 5 ou visioconférence rapide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact?type=projet"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-ocre text-white font-bold text-sm hover:bg-ocre-vif transition-all shadow-lg shadow-ocre/30"
              >
                Demander un devis sur-mesure
              </Link>
              <a
                href={getWhatsAppUrl('Bonjour Majeli Connect, je souhaite échanger sur une prestation sur-mesure.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.08] text-white border border-white/15 font-bold text-sm hover:bg-white/[0.14] transition-colors"
              >
                Discuter sur WhatsApp (+221 78 264 34 38)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesInteractiveView;
