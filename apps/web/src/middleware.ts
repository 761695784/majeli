import { NextResponse, type NextRequest } from 'next/server';

/**
 * Négociation de contenu pour les agents IA : quand un agent demande la page
 * d'accueil en Markdown (Accept: text/markdown) et pas en HTML, on lui sert
 * /index.md (même contenu que /llms.txt) au lieu de la page HTML.
 * Les navigateurs envoient toujours text/html : ils ne sont pas concernés.
 */
export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown') && !accept.includes('text/html')) {
    const url = request.nextUrl.clone();
    url.pathname = '/index.md';
    const response = NextResponse.rewrite(url);
    response.headers.set('Vary', 'Accept');
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  }

  return NextResponse.next();
}

// Uniquement la page d'accueil : aucun coût sur le reste du site.
export const config = {
  matcher: ['/'],
};
