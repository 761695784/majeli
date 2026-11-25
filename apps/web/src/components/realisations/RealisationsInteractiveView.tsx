'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { ProjectDetail } from '@/lib/projects-data';
import { getWhatsAppUrl } from '@/lib/contact';

interface RealisationsInteractiveViewProps {
  projects: ProjectDetail[];
}

const SECTOR_FILTERS = [
  { id: 'all', label: 'Toutes les réalisations' },
  { id: 'ecommerce', label: 'E-Commerce & IA' },
  { id: 'vitrine', label: 'Sites Vitrines & B2B' },
  { id: 'impact', label: 'Impact & Communauté' },
];

export function RealisationsInteractiveView({
  projects,
}: RealisationsInteractiveViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [spotlightSlug, setSpotlightSlug] = useState<string>(
    projects[0]?.slug || 'ampa-boutique'
  );
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(540);
  const mouseY = useMotionValue(240);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const heroSpotlight = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.17), rgba(96, 108, 56, 0.09) 45%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.sectorGroup === activeFilter);

  const showcaseProjects = projects.filter((p) => p.image).slice(0, 3);
  const activeSpotlight =
    showcaseProjects.find((p) => p.slug === spotlightSlug) || showcaseProjects[0];

  return (
    <div className="pb-20 space-y-24 lg:space-y-28">
      {/* 1. HERO PORTFOLIO IMMERSIF AVEC VITRINE INTERACTIVE */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#0D1508] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: heroSpotlight }}
        />
        <div className="pointer-events-none absolute -top-28 left-1/3 w-[500px] h-[500px] rounded-full bg-ocre/15 blur-[130px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texte & Chiffres */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15"
              >
                <Sparkles className="w-3.5 h-3.5 text-ocre-vif" />
                <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
                  Portfolio & Études de Cas Réelles
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl sm:text-5xl xl:text-[3.35rem] font-extrabold text-white leading-[1.08] font-heading"
              >
                Des plateformes conçues &{' '}
                <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
                  déployées avec impact
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
              >
                Du e-commerce sartorial avec recommandation IA aux portails d&apos;équipements industriels CHR et résidences de standing : explorez nos réalisations en production.
              </motion.p>

              {/* Sélecteur rapide du projecteur visuel */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="space-y-2.5 pt-2"
              >
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                  Aperçu rapide en vedette :
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {showcaseProjects.map((proj) => {
                    const isSelected = proj.slug === activeSpotlight?.slug;
                    return (
                      <button
                        key={proj.slug}
                        type="button"
                        onClick={() => setSpotlightSlug(proj.slug)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-ocre text-white border-ocre shadow-lg shadow-ocre/30'
                            : 'bg-white/[0.05] text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {proj.title}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Fenêtre Browser Interactive animée */}
            {activeSpotlight && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="lg:col-span-6 relative"
              >
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-ocre/25 via-olive/20 to-transparent blur-2xl opacity-75 pointer-events-none" />

                <div className="relative rounded-3xl bg-[#131D0C] border border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Barre navigateur */}
                  <div className="px-4 py-3 bg-black/35 border-b border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                    </div>
                    <span className="text-[11px] font-mono text-white/60 truncate px-3 py-0.5 rounded-md bg-white/[0.05] border border-white/10">
                      {activeSpotlight.title} · {activeSpotlight.category}
                    </span>
                    <Link
                      href={`/realisations/${activeSpotlight.slug}`}
                      className="text-[11px] font-mono text-ocre-vif hover:underline shrink-0"
                    >
                      Détails →
                    </Link>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpotlight.slug}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                        {activeSpotlight.image && (
                          <Image
                            src={activeSpotlight.image}
                            alt={activeSpotlight.title}
                            fill
                            priority
                            className="object-cover object-top"
                          />
                        )}
                      </div>
                      <div className="p-4 sm:p-5 bg-[#131D0C] flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white truncate">
                            {activeSpotlight.title}
                          </p>
                          <p className="text-xs text-white/65 truncate">
                            {activeSpotlight.tagline}
                          </p>
                        </div>
                        <Link
                          href={`/realisations/${activeSpotlight.slug}`}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-ocre text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0"
                        >
                          <span>Étude de cas</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2. FILTRES DYNAMIQUES & GRILLE ANIMÉE DES RÉALISATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
              Catalogue des Réalisations ({filteredProjects.length})
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-3 font-heading">
              Explorez nos projets par secteur
            </h2>
          </div>

          {/* Filtres animés */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#EFF2EC] border border-vert-fonce/10">
            {SECTOR_FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? 'text-white' : 'text-vert-fonce/70 hover:text-vert-fonce'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolioFilterPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-vert-fonce shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-3xl overflow-hidden bg-white border border-vert-fonce/10 shadow-[0_10px_30px_rgba(15,23,10,0.05)] hover:shadow-[0_26px_55px_rgba(15,23,10,0.13)] hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                {/* En-tête mini-fenêtre navigateur */}
                <div className="px-4 py-2.5 bg-[#F4F6F2] border-b border-vert-fonce/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-vert-fonce/25 group-hover:bg-[#FF5F56] transition-colors" />
                    <span className="w-2 h-2 rounded-full bg-vert-fonce/25 group-hover:bg-[#FFBD2E] transition-colors" />
                    <span className="w-2 h-2 rounded-full bg-vert-fonce/25 group-hover:bg-[#27C93F] transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono text-vert-fonce/55 uppercase tracking-wider truncate max-w-[200px]">
                    {project.category}
                  </span>
                </div>

                {/* Aperçu visuel */}
                <div className="relative aspect-[16/10] bg-[#EFF2EC] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Capture d'écran du projet ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0F170A] via-[#1A2612] to-olive text-white text-center">
                      <Code2 className="w-8 h-8 text-ocre-vif mb-2" />
                      <h4 className="text-xl font-bold text-white">{project.title}</h4>
                      <p className="text-xs text-white/75 mt-1.5 max-w-xs">{project.tagline}</p>
                    </div>
                  )}

                  {/* Overlay dégradé discret au survol */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F170A]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <span className="text-xs font-mono text-white font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-olive-vif" />
                      Déployé en production
                    </span>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-vert-fonce group-hover:text-ocre transition-colors font-heading">
                        {project.title}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#EFF2EC] text-vert-fonce hover:bg-vert-fonce hover:text-white flex items-center justify-center transition-colors"
                          title={`Visiter ${project.liveUrl}`}
                          aria-label={`Visiter le site ${project.title}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-vert-fonce/75 mb-5 leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#F4F6F2] text-vert-fonce/90 font-medium border border-vert-fonce/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-vert-fonce/10 flex items-center justify-between">
                    <span className="text-xs text-olive font-semibold truncate max-w-[150px]">
                      {project.client}
                    </span>
                    <Link
                      href={`/realisations/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-vert-fonce group-hover:text-ocre transition-colors shrink-0"
                    >
                      <span>Voir l&apos;étude</span>
                      <ArrowUpRight className="w-4 h-4 text-ocre group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. BANNIÈRE D'ENGAGEMENT QUALITÉ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-vert-fonce/10 shadow-[0_12px_40px_rgba(15,23,10,0.05)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-vert-fonce/10">
            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EFF2EC] text-vert-fonce flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-5 h-5 text-olive" />
              </div>
              <p className="text-3xl font-extrabold text-vert-fonce font-mono">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-olive">
                Code Propriétaire
              </p>
              <p className="text-xs text-vert-fonce/75">
                Vous détenez l&apos;intégralité de votre code source, de votre base de données et de votre domaine.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-ocre/10 text-ocre flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-3xl font-extrabold text-ocre font-mono">&lt; 1,2s</p>
              <p className="text-xs font-bold uppercase tracking-wider text-olive">
                Affichage Ultra-Rapide
              </p>
              <p className="text-xs text-vert-fonce/75">
                Optimisé pour convertir immédiatement sur les connexions mobiles 4G/3G en Afrique de l&apos;Ouest.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EFF2EC] text-vert-fonce flex items-center justify-center mx-auto mb-2">
                <Layers className="w-5 h-5 text-olive" />
              </div>
              <p className="text-3xl font-extrabold text-vert-fonce font-mono">3 Mois</p>
              <p className="text-xs font-bold uppercase tracking-wider text-olive">
                Garantie Corrective
              </p>
              <p className="text-xs text-vert-fonce/75">
                Suivi technique rigoureux et accompagnement après la mise en production de votre projet.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. CTA PROJET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F170A] text-white rounded-[2.25rem] p-8 sm:p-14 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid-dark opacity-60 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Prêt à concevoir votre prochaine boutique e-commerce ou plateforme ?
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-body leading-relaxed">
              Nos ingénieurs vous accompagnent du maquettage UI/UX jusqu&apos;au déploiement sécurisé avec paiement mobile et intelligence artificielle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact?type=projet"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-ocre text-white font-bold text-sm hover:bg-ocre-vif transition-all shadow-lg shadow-ocre/30 inline-flex items-center justify-center gap-2"
              >
                <span>Démarrer mon projet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsAppUrl("Bonjour Majeli Connect, j'ai vu vos réalisations (AMPA, AMEG, Teranga Box...) et je souhaite lancer mon projet.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.08] text-white border border-white/15 font-bold text-sm hover:bg-white/[0.14] transition-colors"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RealisationsInteractiveView;
