// Version Markdown de la page d'accueil, servie par le middleware quand un agent IA
// demande « / » avec l'en-tête Accept: text/markdown.
// Jamais mise en cache partagé : le CDN ne doit pas la confondre avec la page HTML.
import { buildLlmsTxt } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'private, no-store',
      Vary: 'Accept',
    },
  });
}
