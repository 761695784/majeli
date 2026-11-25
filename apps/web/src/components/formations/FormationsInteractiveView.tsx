'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import {
  Bot,
  Cpu,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact';

const FORMATIONS_TRACKS = [
  {
    id: 'ia-entreprises',
    title: 'Intelligence Artificielle Appliquée aux Entreprises',
    badge: 'Professionnels & Équipes',
    featured: true,
    description:
      'Passez de la simple curiosité à des gains de productivité mesurables. Formez vos équipes à maîtriser les LLM (ChatGPT, Claude) et à automatiser leurs flux quotidiens.',
    target: 'Dirigeants, cadres administratifs, chargés de communication, équipes commerciales.',
    duration: '2 à 3 jours (14h à 21h) en présentiel ou hybride',
    tools: ['ChatGPT Team', 'Claude Pro', 'Prompt Engineering', 'Make / n8n'],
    modules: [
      'Fondamentaux de l’IA générative et structuration de prompts métiers',
      'Rédaction accélérée : rapports, propositions commerciales, relances clients',
      'Création visuelle et supports marketing assistés par IA',
      'Automatisation sans code entre emails, CRM et feuilles de calcul',
      'Charte de confidentialité et protection des données d’entreprise',
    ],
    icon: Cpu,
  },
  {
    id: 'robotique-jeunes',
    title: 'Initiation Robotique & Codage (8 – 18 ans)',
    badge: 'Jeunesse & Écoles',
    featured: false,
    description:
      'Éveillez l’esprit d’ingénieur des plus jeunes grâce à l’assemblage réel de capteurs, microcontrôleurs et programmation ludique.',
    target: 'Enfants et adolescents de 8 à 18 ans, écoles partenaires et stages vacances.',
    duration: 'Ateliers mercredis / samedis ou stages intensifs vacances (1 semaine)',
    tools: ['Arduino', 'Micro:bit', 'Scratch', 'Python'],
    modules: [
      'Bases concrètes de l’électronique : circuits, DEL, capteurs et moteurs',
      'Logique algorithmique par blocs (Scratch) puis initiation à Python',
      'Montage de maquettes fonctionnelles (évitement d’obstacles, feux intelligents)',
      'Travail collaboratif en mini-équipe d’ingénieurs en herbe',
      'Démonstration finale du prototype devant les parents ou enseignants',
    ],
    icon: Bot,
  },
  {
    id: 'bureautique-cloud',
    title: 'Productivité Cloud & Cybersécurité Pratique',
    badge: 'Administration & PME',
    featured: false,
    description:
      'Fluidifiez la collaboration interne autour de Google Workspace, Microsoft 365 et des bonnes pratiques de sécurité numérique.',
    target: 'Assistantes de direction, comptables, gestionnaires, équipes PME.',
    duration: '1 à 2 jours intensifs sur cas réels',
    tools: ['Excel Avancé', 'Google Workspace', 'Microsoft 365', 'Cybersécurité'],
    modules: [
      'Tableaux de bord automatisés et formules avancées sur Excel / Sheets',
      'Gestion documentaire cloud, permissions d’accès et co-édition fluide',
      'Organisation de réunions hybrides efficaces et suivi de tâches',
      'Réflexes anti-phishing, gestionnaire de mots de passe et sauvegardes',
    ],
    icon: Users,
  },
];

export function FormationsInteractiveView() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(220);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.16), rgba(96, 108, 56, 0.08) 45%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  return (
    <div className="pb-20 space-y-24 lg:space-y-28">
      {/* 1. HERO FORMATIONS DYNAMIQUE */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#0D1508] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: spotlight }}
        />
        <div className="pointer-events-none absolute -top-24 right-1/4 w-[460px] h-[460px] rounded-full bg-ocre/15 blur-[130px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15"
              >
                <Sparkles className="w-3.5 h-3.5 text-ocre-vif" />
                <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
                  Académie Pratique · Entreprises & Jeunesse
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl sm:text-5xl xl:text-[3.3rem] font-extrabold text-white leading-[1.08] font-heading"
              >
                Maîtrisez l&apos;IA, le code et la{' '}
                <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
                  robotique par l&apos;action
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body"
              >
                Pas de cours magistraux théoriques interminables. Nos formateurs ingénieurs animent des ateliers intensifs basés sur vos vrais outils métiers et sur du matériel électronique réel.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-white/85"
              >
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                  <Award className="w-4 h-4 text-ocre-vif" /> Certificat Majeli délivré
                </span>
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                  <MapPin className="w-4 h-4 text-olive-vif" /> Sur site ou Liberté 5, Dakar
                </span>
              </motion.div>
            </div>

            {/* Jauge pédagogique animée 30% / 70% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-[#131D0C]/90 border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                    Ratio Pédagogique Majeli
                  </span>
                  <span className="text-xs font-mono text-olive-vif font-bold">
                     Apprentissage Actif
                  </span>
                </div>

                {/* Barre animée */}
                <div className="space-y-3">
                  <div className="h-4 rounded-full bg-white/10 overflow-hidden flex p-0.5 gap-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '30%' }}
                      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                      className="h-full rounded-full bg-olive"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-ocre to-ocre-vif"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/70">30% Méthode & Cadrage</span>
                    <span className="text-ocre-vif font-bold">70% Manipulation & Cas Réels</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    <p className="text-2xl font-extrabold font-mono text-white">30 j</p>
                    <p className="text-[11px] text-white/60 mt-1">
                      Suivi post-formation & entraide inclus
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    <p className="text-2xl font-extrabold font-mono text-ocre-vif">100%</p>
                    <p className="text-[11px] text-white/60 mt-1">
                      Supports & kits fournis en séance
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CARTES DES 3 PARCOURS DYNAMIQUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
            Programmes Certifiants
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 font-heading">
            Choisissez le parcours adapté à vos enjeux
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {FORMATIONS_TRACKS.map((track, idx) => {
            const Icon = track.icon;
            const isDark = track.featured;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-[#0F170A] text-white border border-ocre/45 shadow-[0_25px_60px_-15px_rgba(15,23,10,0.35)]'
                    : 'bg-white text-vert-fonce border border-vert-fonce/10 shadow-[0_10px_35px_rgba(15,23,10,0.05)] hover:shadow-[0_22px_50px_rgba(15,23,10,0.1)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isDark
                          ? 'bg-ocre/20 text-ocre-vif border border-ocre/30'
                          : 'bg-[#EFF2EC] text-vert-fonce'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isDark
                          ? 'bg-ocre text-white'
                          : 'bg-ocre/10 text-ocre'
                      }`}
                    >
                      {track.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-3 font-heading ${
                      isDark ? 'text-white' : 'text-vert-fonce'
                    }`}
                  >
                    {track.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-body ${
                      isDark ? 'text-white/75' : 'text-vert-fonce/75'
                    }`}
                  >
                    {track.description}
                  </p>

                  {/* Outils pratiqués */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {track.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                          isDark
                            ? 'bg-white/[0.06] border-white/10 text-[#FEFAE0]'
                            : 'bg-[#F8F9F6] border-vert-fonce/10 text-vert-fonce/85'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`p-4 rounded-2xl border mb-6 text-xs space-y-1.5 ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10'
                        : 'bg-[#F8F9F6] border-vert-fonce/10'
                    }`}
                  >
                    <p className={isDark ? 'text-white font-bold' : 'text-vert-fonce font-bold'}>
                      Public cible :
                    </p>
                    <p className={isDark ? 'text-white/75' : 'text-vert-fonce/75'}>
                      {track.target}
                    </p>
                    <p
                      className={`font-bold pt-1 ${
                        isDark ? 'text-white' : 'text-vert-fonce'
                      }`}
                    >
                      Format :
                    </p>
                    <p className={isDark ? 'text-ocre-vif font-medium' : 'text-olive font-semibold'}>
                      {track.duration}
                    </p>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <p
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isDark ? 'text-white/50' : 'text-vert-fonce/55'
                      }`}
                    >
                      Compétences acquises
                    </p>
                    <ul className="space-y-2.5">
                      {track.modules.map((m, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 text-xs sm:text-[13px] ${
                            isDark ? 'text-white/85' : 'text-vert-fonce/85'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDark ? 'text-olive-vif' : 'text-olive'
                            }`}
                          />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`pt-5 border-t space-y-2.5 ${
                    isDark ? 'border-white/10' : 'border-vert-fonce/10'
                  }`}
                >
                  <Link
                    href={`/contact?type=formation&programme=${track.id}`}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all group ${
                      isDark
                        ? 'bg-ocre text-white hover:bg-ocre-vif shadow-lg shadow-ocre/25'
                        : 'bg-vert-fonce text-white hover:bg-[#1A2612]'
                    }`}
                  >
                    <span>Demander le programme & tarif</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href={getWhatsAppUrl(`Bonjour Majeli Connect, je souhaite des renseignements sur la formation : ${track.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center text-xs font-medium py-1 transition-colors ${
                      isDark
                        ? 'text-white/65 hover:text-white'
                        : 'text-olive hover:text-vert-fonce'
                    }`}
                  >
                    Poser une question sur WhatsApp
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ENGAGEMENT ROBOTIQUE & JEUNESSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-[#EFF2EC] rounded-3xl p-8 sm:p-12 border border-vert-fonce/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-olive bg-white px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
              <Layers className="w-3.5 h-3.5 text-ocre" /> Impact Éducatif au Sénégal
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-vert-fonce font-heading">
              Transformer les jeunes d&apos;utilisateurs passifs en créateurs de technologies
            </h3>
            <p className="text-sm sm:text-base text-vert-fonce/80 leading-relaxed font-body">
              En manipulant capteurs, servomoteurs et code dès 8 ans, les élèves développent la rigueur logique et la confiance nécessaires pour inventer les solutions technologiques africaines de demain.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/contact?type=formation&programme=robotique-jeunes"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-vert-fonce text-white font-bold text-sm hover:bg-[#1A2612] transition-colors inline-flex items-center justify-center gap-2 shadow-md"
            >
              <span>Organiser un atelier école</span>
              <ArrowRight className="w-4 h-4 text-ocre-vif" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F170A] text-white rounded-[2.25rem] p-8 sm:p-14 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid-dark opacity-60 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Planifions la montée en compétence de vos équipes
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-body">
              Programme sur-mesure intra-entreprise ou inscription collective. Chiffrage clair sous 2 heures ouvrées.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact?type=formation"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-ocre text-white font-bold text-sm hover:bg-ocre-vif transition-all shadow-lg shadow-ocre/30"
              >
                Demander un devis de formation
              </Link>
              <a
                href={getWhatsAppUrl('Bonjour Majeli Connect, je souhaite organiser une session de formation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.08] text-white border border-white/15 font-bold text-sm hover:bg-white/[0.14] transition-colors"
              >
                Échanger avec le responsable pédagogique
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormationsInteractiveView;
