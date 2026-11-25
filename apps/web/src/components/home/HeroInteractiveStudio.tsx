'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Terminal,
  Activity,
  MessageSquare,
  CreditCard,
  Layers,
} from 'lucide-react';

type StudioTab = 'ia-agent' | 'code-api' | 'workflow';

const STUDIO_TABS: {
  id: StudioTab;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  metric: string;
}[] = [
  {
    id: 'ia-agent',
    label: 'Agent IA WhatsApp',
    shortLabel: 'Agent IA',
    icon: Bot,
    metric: 'Réponse 140ms',
  },
  {
    id: 'code-api',
    label: 'Architecture Next.js & Wave',
    shortLabel: 'Code & API',
    icon: Code2,
    metric: 'Lighthouse 99',
  },
  {
    id: 'workflow',
    label: 'Pipeline Autonome 24/7',
    shortLabel: 'Flux 24/7',
    icon: Cpu,
    metric: '+3,8x Leads',
  },
];

const CYCLE_DURATION_MS = 6800;

export function HeroInteractiveStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>('ia-agent');
  const [isPaused, setIsPaused] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Mouse-reactive spotlight on the hero canvas
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(300);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const spotlightBg = useMotionTemplate`radial-gradient(620px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.16), rgba(96, 108, 56, 0.08) 45%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  // Auto-advance studio tabs unless user hovers/interacts
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const idx = STUDIO_TABS.findIndex((t) => t.id === prev);
        return STUDIO_TABS[(idx + 1) % STUDIO_TABS.length].id;
      });
    }, CYCLE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  // Sub-animation inside the AI tab to show live reasoning steps
  useEffect(() => {
    if (activeTab !== 'ia-agent') {
      setAiStep(0);
      return;
    }
    setAiStep(0);
    const t1 = setTimeout(() => setAiStep(1), 650);
    const t2 = setTimeout(() => setAiStep(2), 1450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTab]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#0D1508] text-white pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 border-b border-white/10"
    >
      {/* Trame d'ingénierie + Halo réactif au curseur */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlightBg }}
      />

      {/* Lumières d'ambiance organiques maîtrisées */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-ocre/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[460px] h-[460px] rounded-full bg-olive/20 blur-[120px]" />

      {/* Lignes de flux SVG décoratives en arrière-plan */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-100 620 C 320 580, 560 220, 980 260 C 1220 280, 1360 160, 1540 120"
          stroke="url(#majeliLineGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M-60 700 C 380 680, 680 420, 1120 460 C 1300 475, 1420 390, 1560 350"
          stroke="url(#majeliLineGrad2)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="majeliLineGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#606C38" stopOpacity="0" />
            <stop offset="50%" stopColor="#BC6C25" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8AA054" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="majeliLineGrad2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8AA054" stopOpacity="0" />
            <stop offset="60%" stopColor="#8AA054" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#BC6C25" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* COLONNE GAUCHE : Manifeste, Titre Cinétique & Actions */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocre-vif opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ocre-vif" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
                Ingénierie Logicielle × IA Appliquée · Dakar
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl xl:text-[3.65rem] font-extrabold text-white leading-[1.07] tracking-tight font-heading"
            >
              Le développement sur-mesure{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
                  augmenté par l&apos;IA
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: 'circOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-ocre-vif via-ocre to-transparent"
                />
              </span>{' '}
              pour propulser votre entreprise.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
              className="text-base sm:text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
            >
              Sites web haute vitesse, plateformes SaaS, applications mobiles et agents IA WhatsApp entraînés sur votre métier. Nous unissons architecture logicielle de pointe et pragmatisme local à Dakar.
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              <Link
                href="/contact?type=projet"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-ocre hover:bg-ocre-vif text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_12px_35px_-6px_rgba(188,108,37,0.55)] hover:shadow-[0_16px_42px_-4px_rgba(223,133,52,0.65)] hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-ocre-vif"
              >
                <span>Démarrer mon projet</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/realisations"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
              >
                <span>Découvrir nos réalisations</span>
              </Link>
            </motion.div>

            {/* Télémétrie & Garanties */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <div className="flex items-center gap-1.5 text-ocre-vif font-mono font-bold text-base sm:text-lg">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>&lt; 2h</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                  Réponse & chiffrage à Dakar
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-olive-vif font-mono font-bold text-base sm:text-lg">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>99/100</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                  Vitesse Next.js & Mobile
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#FEFAE0] font-mono font-bold text-base sm:text-lg">
                  <ShieldCheck className="w-4 h-4 text-ocre-vif shrink-0" />
                  <span>100%</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                  Wave, OM & Code propriétaire
                </p>
              </div>
            </motion.div>
          </div>

          {/* COLONNE DROITE : COCKPIT INTERACTIF "MAJELI NEURAL × CODE STUDIO" */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-6 relative"
          >
            {/* Halo périphérique derrière la console */}
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-tr from-ocre/25 via-olive/20 to-ocre-vif/20 blur-2xl opacity-75 pointer-events-none" />

            {/* Badge flottant supérieur droit */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-4 right-5 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16220E]/95 border border-olive-vif/35 shadow-xl backdrop-blur-md"
            >
              <Activity className="w-3.5 h-3.5 text-olive-vif" />
              <span className="text-[11px] font-mono text-white/90 font-medium">
                Moteur Majeli v3 · <span className="text-olive-vif">En ligne</span>
              </span>
            </motion.div>

            {/* Fenêtre principale du Studio Interactif */}
            <div className="relative rounded-3xl bg-[#131D0C]/90 border border-white/15 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.75)] backdrop-blur-xl overflow-hidden">
              {/* Barre supérieure style IDE / Cockpit */}
              <div className="px-4 sm:px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  <span className="ml-2 text-[11px] font-mono text-white/55 hidden sm:inline">
                    majeli-studio://dakar-edge-node
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-ocre/20 text-ocre-vif border border-ocre/30">
                  Démo Interactive
                </span>
              </div>

              {/* Sélecteur des 3 modes en direct */}
              <div
                role="tablist"
                aria-label="Démonstrations du savoir-faire Majeli Connect"
                className="grid grid-cols-3 gap-1.5 p-2 bg-black/25 border-b border-white/10"
              >
                {STUDIO_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsPaused(true);
                      }}
                      className={`relative px-2.5 py-2.5 rounded-xl text-left transition-all overflow-hidden ${
                        isActive
                          ? 'bg-white/[0.1] text-white shadow-sm border border-white/15'
                          : 'text-white/55 hover:text-white/85 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isActive ? 'text-ocre-vif' : 'text-white/45'
                          }`}
                        />
                        <span className="text-[11px] sm:text-xs font-bold truncate">
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden">{tab.shortLabel}</span>
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-white/45 mt-0.5 truncate">
                        {tab.metric}
                      </p>

                      {isActive && !isPaused && !prefersReducedMotion && (
                        <motion.span
                          key={`progress-${tab.id}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: CYCLE_DURATION_MS / 1000, ease: 'linear' }}
                          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-ocre-vif"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Scène dynamique selon l'onglet actif */}
              <div className="p-5 sm:p-6 min-h-[345px] sm:min-h-[360px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === 'ia-agent' && (
                    <motion.div
                      key="ia-agent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      {/* Message entrant WhatsApp Client */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                            WhatsApp Business API · Prospect entrant
                          </span>
                          <span>22:14 · Dakar</span>
                        </div>

                        <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm text-white/90 leading-relaxed">
                          « Bonjour, nous cherchons 30 coffrets cadeaux personnalisés avec notre logo à livrer vendredi aux Almadies. Quel est le tarif ? »
                        </div>

                        {/* Trace du moteur IA RAG */}
                        <div className="flex flex-wrap items-center gap-1.5 py-1">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors ${
                              aiStep >= 0
                                ? 'bg-olive/25 border-olive-vif/40 text-olive-vif'
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}
                          >
                            <Sparkles className="w-3 h-3" />
                            1. Lecture catalogue & stock
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors ${
                              aiStep >= 1
                                ? 'bg-ocre/25 border-ocre-vif/40 text-ocre-vif'
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}
                          >
                            2. Remise B2B (-15%) calculée
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono border transition-colors ${
                              aiStep >= 2
                                ? 'bg-[#25D366]/20 border-[#25D366]/40 text-[#59e88d]'
                                : 'bg-white/5 border-white/10 text-white/40'
                            }`}
                          >
                            3. Lien Wave prêt
                          </span>
                        </div>

                        {/* Réponse générée par l'Agent IA Majeli */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="bg-gradient-to-br from-[#1E2E14] to-[#16230E] border border-olive-vif/35 rounded-2xl rounded-tr-sm p-4 text-xs sm:text-sm text-white/95 leading-relaxed shadow-lg"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-ocre-vif font-bold flex items-center gap-1">
                              <Bot className="w-3.5 h-3.5" /> Assistant IA Sur-Mesure
                            </span>
                            <span className="text-[10px] font-mono text-olive-vif">0,8s</span>
                          </div>
                          « Disponible en stock ! Pour 30 coffrets Prestige gravés, votre tarif entreprise est de <strong className="text-[#FEFAE0]">765 000 FCFA</strong>, livraison garantie vendredi 10h aux Almadies. »
                        </motion.div>
                      </div>

                      {/* Barre de résultat conversion */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                        <span className="flex items-center gap-1.5 text-olive-vif font-medium">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          Prospect qualifié automatiquement (Score 98/100)
                        </span>
                        <span className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-white/10 text-white">
                          24h/24 · 7j/7
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'code-api' && (
                    <motion.div
                      key="code-api"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-ocre-vif" />
                            app/api/checkout/route.ts · Next.js 15 + TypeScript
                          </span>
                          <span className="text-olive-vif">Strict Mode</span>
                        </div>

                        {/* Extrait de code réel et propre */}
                        <div className="rounded-2xl bg-[#090E06] border border-white/10 p-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
                          <div className="text-white/40">// Orchestration IA + Paiement Mobile Sénégal</div>
                          <div>
                            <span className="text-ocre-vif">const</span>{' '}
                            <span className="text-[#FEFAE0]">intent</span> ={' '}
                            <span className="text-ocre-vif">await</span> majeliAI.
                            <span className="text-olive-vif">extractOrder</span>(payload);
                          </div>
                          <div>
                            <span className="text-ocre-vif">const</span>{' '}
                            <span className="text-[#FEFAE0]">session</span> ={' '}
                            <span className="text-ocre-vif">await</span> localPay.
                            <span className="text-olive-vif">createCheckout</span>(&#123;
                          </div>
                          <div className="pl-4">
                            amountFCFA: <span className="text-[#FEFAE0]">intent.total</span>,
                          </div>
                          <div className="pl-4">
                            channels:{' '}
                            <span className="text-[#98c379]">[&apos;WAVE&apos;, &apos;ORANGE_MONEY&apos;]</span>,
                          </div>
                          <div className="pl-4">
                            autoInvoicePDF: <span className="text-ocre-vif">true</span>,
                          </div>
                          <div>&#125;);</div>
                        </div>

                        {/* Jauges de performance en temps réel */}
                        <div className="grid grid-cols-3 gap-2.5 pt-1">
                          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
                            <p className="text-[10px] font-mono text-white/50 uppercase">Lighthouse</p>
                            <p className="text-lg font-extrabold text-olive-vif font-mono mt-0.5">
                              99<span className="text-xs text-white/50">/100</span>
                            </p>
                          </div>
                          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
                            <p className="text-[10px] font-mono text-white/50 uppercase">Réseau 4G</p>
                            <p className="text-lg font-extrabold text-[#FEFAE0] font-mono mt-0.5">
                              0.9s
                            </p>
                          </div>
                          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
                            <p className="text-[10px] font-mono text-white/50 uppercase">Webhook</p>
                            <p className="text-lg font-extrabold text-ocre-vif font-mono mt-0.5">
                              200 OK
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-white/80">
                          <CreditCard className="w-4 h-4 text-ocre-vif shrink-0" />
                          Encaissement Wave & Orange Money sans redirection lente
                        </span>
                        <span className="font-mono text-[11px] text-olive-vif font-semibold">
                          100% Propriétaire
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'workflow' && (
                    <motion.div
                      key="workflow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-olive-vif" />
                            Architecture d&apos;automatisation de bout en bout
                          </span>
                          <span className="text-ocre-vif">Zéro saisie manuelle</span>
                        </div>

                        {[
                          {
                            step: '01',
                            title: 'Acquisition Web & Mobile Ultra-Rapide',
                            detail: 'Interface sur-mesure optimisée SEO local Dakar',
                            badge: 'Entrée',
                            accent: 'border-white/15 bg-white/[0.04]',
                          },
                          {
                            step: '02',
                            title: 'Qualification & Devis par Agent IA',
                            detail: 'Analyse du besoin, filtrage et tarification instantanée',
                            badge: 'IA Core',
                            accent: 'border-ocre/40 bg-ocre/15',
                          },
                          {
                            step: '03',
                            title: 'Paiement Mobile & Facturation PDF',
                            detail: 'Validation Wave / Orange Money + alerte équipe WhatsApp',
                            badge: 'Conversion',
                            accent: 'border-olive-vif/40 bg-olive/20',
                          },
                        ].map((node, i) => (
                          <motion.div
                            key={node.step}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-xl border p-3.5 flex items-center justify-between gap-3 ${node.accent}`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-7 h-7 rounded-lg bg-black/35 font-mono text-xs font-bold text-ocre-vif flex items-center justify-center shrink-0">
                                {node.step}
                              </span>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-white truncate">
                                  {node.title}
                                </p>
                                <p className="text-[11px] text-white/65 truncate">{node.detail}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-black/30 text-white/85 shrink-0">
                              {node.badge}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-white/80">
                          Gain moyen constaté : <strong className="text-olive-vif">+40h / mois</strong> par équipe
                        </span>
                        <Link
                          href="/services/ia-automatisation"
                          className="text-ocre-vif hover:underline font-bold inline-flex items-center gap-1"
                        >
                          <span>Voir l&apos;offre IA</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroInteractiveStudio;
