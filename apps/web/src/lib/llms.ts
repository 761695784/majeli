// Contenu Markdown du site pour les agents IA, partagé par /llms.txt et par la
// version Markdown de la page d'accueil (négociation Accept: text/markdown).
// Généré depuis les mêmes données que les pages : il reste à jour tout seul.

import { CONTACT_INFO } from '@/lib/contact';
import { SERVICES_LIST } from '@/lib/services-data';
import { PROJECTS_LIST } from '@/lib/projects-data';

const SITE_URL = 'https://majeliconnect.com';

function formatFcfa(amount: number): string {
  return `${amount.toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, ' ')} FCFA`;
}

export function buildLlmsTxt(): string {
  const services = SERVICES_LIST.map((s) => {
    const plans = (s.plans || [])
      .map((p) => {
        const prix = p.priceAmount ? `à partir de ${formatFcfa(p.priceAmount)}` : p.priceDisplay;
        const periode = p.period ? ` / ${p.period.replace(/^\/\s*/, '')}` : '';
        return `  - ${p.name} : ${prix}${periode}. Délai : ${p.deliveryTime}. ${p.description}`;
      })
      .join('\n');
    return [
      `- [${s.title}](${SITE_URL}/services/${s.slug}) : ${s.summary}`,
      plans,
      s.customQuoteNotes ? `  - ${s.customQuoteNotes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  const projects = PROJECTS_LIST.map(
    (p) => `- [${p.title}](${SITE_URL}/realisations/${p.slug}) — ${p.client}, ${p.category} : ${p.tagline}`
  ).join('\n');

  const body = `# ${CONTACT_INFO.name}

> ${CONTACT_INFO.tagline}. ${CONTACT_INFO.description}

${CONTACT_INFO.legalName} est une agence basée à ${CONTACT_INFO.address} (${CONTACT_INFO.country}) — NINEA 012376704, RCCM SN.DKR.2025.A.30644. Elle conçoit des sites web et boutiques e-commerce (paiements Wave, Orange Money, carte bancaire), des plateformes métiers (Next.js, Laravel, Angular), des applications mobiles Flutter, des assistants IA pour WhatsApp, et assure maintenance informatique, installation réseau et formations.

## Contact

- Téléphone et WhatsApp : ${CONTACT_INFO.phone} (${CONTACT_INFO.whatsappUrl})
- Email : ${CONTACT_INFO.email}
- Adresse : ${CONTACT_INFO.address}, ${CONTACT_INFO.country}
- Horaires : ${CONTACT_INFO.operatingHours}
- Délai de réponse : ${CONTACT_INFO.responseTimeCommitment}
- Formulaire de demande de devis : ${SITE_URL}/contact

## Services et tarifs

${services}

## Réalisations

${projects}

## Pages principales

- [Accueil](${SITE_URL}/)
- [Services](${SITE_URL}/services)
- [Réalisations](${SITE_URL}/realisations)
- [Formations](${SITE_URL}/formations)
- [L'agence](${SITE_URL}/agence)
- [Contact et devis](${SITE_URL}/contact)
- [Mentions légales](${SITE_URL}/mentions-legales)
`;

  return body;
}
