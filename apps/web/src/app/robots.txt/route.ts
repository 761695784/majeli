// robots.txt écrit à la main (remplace app/robots.ts) pour pouvoir déclarer
// les « Content Signals » : ce que les moteurs et les IA ont le droit de faire
// avec le contenu du site (https://contentsignals.org).
//   search   : indexation et résultats de recherche
//   ai-input : utilisation pour répondre en direct (ChatGPT, Perplexity, Claude…)
//   ai-train : utilisation pour entraîner des modèles d'IA
// Mettre ai-train=no si Majeli Connect ne veut pas que ses textes servent à l'entraînement.

export const dynamic = 'force-static';

const SITE_URL = 'https://majeliconnect.com';

// Robots d'IA explicitement autorisés (visibilité dans les réponses des assistants)
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];

export function GET() {
  const lines = [
    '# robots.txt — majeliconnect.com',
    '',
    'User-agent: *',
    'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
    'Allow: /',
    'Disallow: /api/',
    '',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /api/', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `# Résumé du site pour les agents IA : ${SITE_URL}/llms.txt`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
