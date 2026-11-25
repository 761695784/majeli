import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ExternalLink, Check, Award } from 'lucide-react';
import { PROJECTS_LIST } from '@/lib/projects-data';
import { getWhatsAppUrl } from '@/lib/contact';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_LIST.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_LIST.find((p) => p.slug === slug);
  if (!project) return { title: 'Projet non trouvé' };

  return {
    title: `${project.title} — Étude de Cas & Réalisation`,
    description: project.tagline,
    alternates: {
      canonical: `/realisations/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Réalisation Majeli Connect`,
      description: project.tagline,
      url: `https://majeliconnect.com/realisations/${project.slug}`,
      images: project.image
        ? [{ url: project.image, alt: project.title }]
        : [{ url: '/assets/og-majeli.png', width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_LIST.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pb-20 space-y-16">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Réalisations', path: '/realisations' },
          { name: project.title, path: `/realisations/${project.slug}` },
        ]}
      />
      {/* En-tête sombre immersif */}
      <section className="relative overflow-hidden bg-[#0D1508] text-white pt-10 sm:pt-14 pb-14 sm:pb-18 border-b border-white/10">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-85 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/65 hover:text-ocre-vif mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à toutes les réalisations</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-ocre-vif bg-ocre/20 border border-ocre/30 px-3.5 py-1 rounded-full">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-white/75 font-body leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ocre text-white font-bold text-sm hover:bg-ocre-vif transition-colors shrink-0 shadow-lg shadow-ocre/30"
              >
                <span>Visiter le site en ligne</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Visuel principal style fenêtre navigateur & Fiche technique */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="rounded-3xl overflow-hidden bg-white border border-vert-fonce/10 shadow-[0_20px_60px_-15px_rgba(15,23,10,0.12)]">
              <div className="px-4 py-3 bg-[#EFF2EC] border-b border-vert-fonce/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[11px] font-mono text-vert-fonce/60">
                  {project.title} · Aperçu Production
                </span>
              </div>

              <div className="relative aspect-[16/10] bg-[#F8F9F6] overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Capture d'écran complète ${project.title}`}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0F170A] via-[#1A2612] to-olive text-white text-center">
                    <span className="text-sm uppercase tracking-widest text-ocre-vif font-bold mb-3">
                      {project.category}
                    </span>
                    <h2 className="text-3xl font-extrabold">{project.title}</h2>
                    <p className="text-sm text-white/80 mt-2 max-w-md">{project.tagline}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fiche d'identité projet */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-vert-fonce/10 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-vert-fonce border-b border-vert-fonce/10 pb-3 font-heading">
                Fiche d&apos;identité
              </h3>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-vert-fonce/55 font-semibold">
                  Client / Partenaire
                </p>
                <p className="text-sm font-bold text-vert-fonce mt-0.5">{project.client}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-vert-fonce/55 font-semibold">
                  Domaine
                </p>
                <p className="text-sm font-bold text-vert-fonce mt-0.5">{project.category}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-vert-fonce/55 font-semibold">
                  Stack & Mots-clés
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#EFF2EC] text-vert-fonce text-xs font-mono font-semibold border border-vert-fonce/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-vert-fonce/10">
              <Link
                href={`/contact?type=projet&projetRef=${project.slug}`}
                className="w-full py-3.5 px-4 rounded-xl bg-vert-fonce text-white font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-[#1A2612] transition-colors"
              >
                <span>Lancer un projet similaire</span>
                <ArrowRight className="w-4 h-4 text-ocre-vif" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description approfondie, Livrables & Résultats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-vert-fonce/10 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-vert-fonce font-heading">
                Contexte & Architecture déployée
              </h2>
              <p className="text-sm sm:text-base text-vert-fonce/80 leading-relaxed font-body">
                {project.description}
              </p>
              <div className="p-4 rounded-2xl bg-[#EFF2EC] text-xs sm:text-sm text-vert-fonce/85 border border-vert-fonce/10 mt-4">
                <strong>Intervention Majeli Connect :</strong> {project.context}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-vert-fonce/10 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-vert-fonce font-heading">
                Livrables clés réalisés
              </h2>
              <ul className="space-y-3">
                {project.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-vert-fonce/85">
                    <div className="w-5 h-5 rounded-full bg-[#EFF2EC] text-olive flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0F170A] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-ocre-vif font-mono font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Impact & Bénéfices Clients</span>
              </div>
              <ul className="space-y-3.5">
                {project.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocre-vif mt-2 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF2EC] border border-vert-fonce/10 text-center space-y-4">
              <h3 className="text-base font-bold text-vert-fonce font-heading">
                Besoin d&apos;un chiffrage pour votre activité ?
              </h3>
              <p className="text-xs text-vert-fonce/75 leading-relaxed">
                Nos forfaits débutent à 450 000 FCFA pour un site vitrine et 800 000 FCFA pour une plateforme e-commerce ou métier sur-mesure.
              </p>
              <a
                href={getWhatsAppUrl(`Bonjour Majeli Connect, je viens de consulter l'étude de cas ${project.title} et je souhaite un devis.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-ocre hover:text-vert-fonce transition-colors"
              >
                <span>Échanger en direct sur WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
