import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectDetail } from '@/lib/projects-data';

interface ProjectCardProps {
  project: ProjectDetail;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-3xl overflow-hidden bg-white border border-vert-fonce/10 shadow-[0_8px_30px_rgba(15,23,10,0.04)] hover:shadow-[0_24px_50px_rgba(15,23,10,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
      {/* Aperçu visuel réel */}
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
            <span className="text-xs uppercase tracking-widest text-ocre-vif font-bold mb-2">
              {project.category}
            </span>
            <h4 className="text-xl font-bold text-white">{project.title}</h4>
            <p className="text-xs text-white/75 mt-2 max-w-xs">{project.tagline}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F170A]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badge catégorie en overlay */}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0F170A]/85 text-white backdrop-blur-md border border-white/15 shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <h3 className="text-xl font-bold text-vert-fonce group-hover:text-ocre transition-colors">
              {project.title}
            </h3>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#EFF2EC] text-vert-fonce hover:bg-vert-fonce hover:text-white flex items-center justify-center transition-colors"
                title={`Visiter le site en direct (${project.liveUrl})`}
                aria-label={`Visiter le site ${project.title} dans un nouvel onglet`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <p className="text-sm text-vert-fonce/75 mb-5 leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          {/* Tags technologiques */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#F4F6F2] text-vert-fonce/90 font-medium border border-vert-fonce/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lien étude de cas */}
        <div className="pt-4 border-t border-vert-fonce/10 flex items-center justify-between">
          <span className="text-xs text-olive font-semibold">{project.client}</span>
          <Link
            href={`/realisations/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-vert-fonce group-hover:text-ocre transition-colors"
          >
            <span>Étude de cas</span>
            <ArrowUpRight className="w-4 h-4 text-ocre group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
export default ProjectCard;
