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
  ShieldCheck,
  HeartHandshake,
  Zap,
  Target,
  MapPin,
  Clock,
  ArrowRight,
  Code2,
  Cpu,
  Wrench,
  Palette,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl } from '@/lib/contact';

const VALUES_LIST = [
  {
    title: 'Rigueur Technique & Souveraineté',
    description:
      'Nous ne livrons aucun bricolage fragile. Nous concevons du code propre, typé et documenté. Vous restez propriétaire à 100% de votre code source, de vos bases de données et de vos accès.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparence & Tarification Ferme',
    description:
      'Nos devis détaillent chaque livrable, chaque jalon et le budget exact dès le premier échange. Zéro dépassement surprise en cours de développement.',
    icon: Target,
  },
  {
    title: 'Ancrage Local & Réactivité Terrain',
    description:
      'Basés à Liberté 5 à Dakar, nous maîtrisons les réalités de connectivité mobile, les API Wave & Orange Money et les exigences opérationnelles des entreprises ouest-africaines.',
    icon: HeartHandshake,
  },
  {
    title: 'Impact Mesurable & Pragmatisme',
    description:
      'Chaque fonctionnalité ou agent IA déployé répond à un objectif chiffré : accélérer vos ventes, automatiser vos opérations ou sécuriser votre parc informatique.',
    icon: Zap,
  },
];

const POLES_EXPERTISE = [
  {
    title: 'Pôle Ingénierie Logicielle, Web & Mobile',
    stacks: ['Next.js', 'Laravel', 'Angular', 'React', 'TypeScript', 'Flutter', 'MySQL', 'PostgreSQL'],
    role: 'Conception de plateformes e-commerce, portails métiers SaaS et applications mobiles rapides et évolutives.',
    icon: Code2,
  },
  {
    title: 'Pôle Intelligence Artificielle & Automatisation',
    stacks: ['OpenAI / Claude API', 'WhatsApp Cloud API', 'RAG Métier', 'Make / n8n', 'Webhooks'],
    role: 'Déploiement d’assistants IA commerciaux 24/7 et automatisation de bout en bout des processus répétitifs.',
    icon: Cpu,
  },
  {
    title: 'Pôle Infrastructure & Maintenance IT',
    stacks: ['Hardware PC', 'Windows / Linux', 'MikroTik', 'Ubiquiti UniFi', 'Câblage RJ45', 'Sauvegardes'],
    role: 'Maintien en condition opérationnelle du parc informatique et des réseaux Wi-Fi/filaires des entreprises à Dakar.',
    icon: Wrench,
  },
  {
    title: 'Pôle Design de Marque & Académie',
    stacks: ['Figma UI/UX', 'Design System', 'Identité Visuelle', 'Formations IA', 'Robotique Arduino'],
    role: 'Création d’univers visuels distinctifs et transfert de compétences vers les équipes et la jeunesse.',
    icon: Palette,
  },
];

const DAKAR_ZONES = [
  'Liberté 5 (Siège)',
  'Plateau',
  'Ngor & Almadies',
  'Mermoz & Sacré-Cœur',
  'Point E & Fann',
  'Yoff & Virage',
  'Diamniadio',
];

export function AgenceInteractiveView() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(220);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(580px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.16), rgba(96, 108, 56, 0.08) 45%, transparent 75%)`;

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
      {/* 1. HERO MANIFESTE DE L'AGENCE */}
      <section
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[#0D1508] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: spotlight }}
        />
        <div className="pointer-events-none absolute -top-24 left-1/3 w-[480px] h-[480px] rounded-full bg-ocre/15 blur-[130px]" />

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
                  ADN & Vision · Majeli Connect Dakar
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl sm:text-5xl xl:text-[3.3rem] font-extrabold text-white leading-[1.08] font-heading"
              >
                Bâtir des outils numériques{' '}
                <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
                  solides, souverains et durables
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body"
              >
                Majeli Connect est née à Dakar d&apos;une conviction forte : les entreprises et institutions africaines méritent une ingénierie logicielle et IA de rang international, portée par une équipe locale réactive et sans intermédiaires opaques.
              </motion.p>
            </div>

            {/* Bloc de repères clés */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="lg:col-span-5 grid grid-cols-2 gap-3.5"
            >
              {[
                { val: '< 2h', label: 'Temps de réponse garanti aux heures ouvrées' },
                { val: '6j / 7', label: 'Équipe technique mobilisée du lundi au samedi' },
                { val: '100%', label: 'Développement interne sans sous-traitance cachée' },
                { val: 'Dakar', label: 'Ancrage opérationnel à Liberté 5, Sénégal' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#131D0C]/90 border border-white/15 p-5 space-y-1.5 backdrop-blur-xl"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold font-mono text-ocre-vif">
                    {stat.val}
                  </p>
                  <p className="text-xs text-white/70 leading-snug">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. LES 4 PILIERS DE NOTRE ENGAGEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
            Principes Fondateurs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-3 font-heading">
            Les 4 piliers de notre exigence
          </h2>
          <p className="text-sm sm:text-base text-vert-fonce/70 font-body">
            Ce qui guide chacune de nos architectures logicielles et chacune de nos interventions sur site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {VALUES_LIST.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-vert-fonce/10 shadow-[0_8px_30px_rgba(15,23,10,0.04)] hover:shadow-[0_20px_45px_rgba(15,23,10,0.1)] hover:-translate-y-1 transition-all flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFF2EC] text-vert-fonce group-hover:bg-vert-fonce group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-vert-fonce font-heading">
                    {val.title}
                  </h3>
                  <p className="text-sm text-vert-fonce/75 leading-relaxed font-body">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ORGANISATION EN PÔLES D'EXPERTISE */}
      <section className="bg-[#EFF2EC]/80 py-20 sm:py-24 border-y border-vert-fonce/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ocre bg-ocre/10 px-3.5 py-1.5 rounded-full">
              Organisation Interne
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-vert-fonce mt-4 mb-3 font-heading">
              4 pôles techniques complémentaires
            </h2>
            <p className="text-sm sm:text-base text-vert-fonce/75 font-body">
              Une équipe pluridisciplinaire capable de couvrir l&apos;ensemble du cycle de vie numérique de votre structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {POLES_EXPERTISE.map((pole, idx) => {
              const Icon = pole.icon;
              const isFirst = idx === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`rounded-3xl p-7 sm:p-8 border space-y-5 transition-all hover:-translate-y-1 ${
                    isFirst
                      ? 'bg-[#0F170A] text-white border-ocre/40 shadow-xl'
                      : 'bg-white text-vert-fonce border-vert-fonce/10 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                        isFirst ? 'bg-ocre/20 text-ocre-vif' : 'bg-[#EFF2EC] text-vert-fonce'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isFirst ? 'text-ocre-vif' : 'text-ocre'
                      }`}
                    >
                      Pôle 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-xl font-bold font-heading mb-2 ${
                        isFirst ? 'text-white' : 'text-vert-fonce'
                      }`}
                    >
                      {pole.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed font-body ${
                        isFirst ? 'text-white/75' : 'text-vert-fonce/75'
                      }`}
                    >
                      {pole.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pole.stacks.map((s) => (
                      <span
                        key={s}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                          isFirst
                            ? 'bg-white/[0.08] border-white/15 text-[#FEFAE0]'
                            : 'bg-[#F8F9F6] border-vert-fonce/10 text-vert-fonce/85'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRÉSENCE TERRAIN À DAKAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-vert-fonce/10 shadow-[0_15px_50px_rgba(15,23,10,0.06)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-olive bg-[#EFF2EC] px-3.5 py-1.5 rounded-full border border-vert-fonce/10">
                Proximité & Interventions sur Site
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vert-fonce font-heading">
                Une équipe accessible et présente sur le terrain à Dakar
              </h2>
              <p className="text-sm sm:text-base text-vert-fonce/75 leading-relaxed font-body">
                Nous nous déplaçons dans toute l&apos;agglomération dakaroise pour vos réunions de cadrage, audits de parc informatique et déploiements techniques.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {DAKAR_ZONES.map((zone) => (
                  <span
                    key={zone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9F6] border border-vert-fonce/10 text-xs font-semibold text-vert-fonce"
                  >
                    <MapPin className="w-3.5 h-3.5 text-ocre" />
                    {zone}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-vert-fonce/80 font-medium">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-olive" /> {CONTACT_INFO.operatingHours}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0F170A] text-white rounded-3xl p-7 sm:p-8 border border-white/10 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold font-heading">
                Envie d&apos;échanger sur votre prochain jalon ?
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Prenons rendez-vous à Liberté 5 ou en visioconférence pour étudier la faisabilité technique et le ROI de votre projet.
              </p>
              <div className="flex flex-col gap-3 pt-1">
                <Link
                  href="/contact"
                  className="py-3.5 px-5 rounded-xl bg-ocre text-white font-bold text-xs sm:text-sm hover:bg-ocre-vif transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Planifier un échange</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={getWhatsAppUrl('Bonjour, je souhaite échanger avec la direction de Majeli Connect.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-white/[0.08] border border-white/15 text-white hover:bg-white/[0.15] font-bold text-xs sm:text-sm transition-colors text-center"
                >
                  WhatsApp Direct ({CONTACT_INFO.phone})
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AgenceInteractiveView;
