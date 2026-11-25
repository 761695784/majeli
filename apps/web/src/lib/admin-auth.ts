import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

/**
 * Protège les routes /api/admin/*.
 *
 * L'appelant doit envoyer l'en-tête :
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 *
 * Retourne une réponse d'erreur si l'accès est refusé, ou null si l'accès est autorisé.
 */
export function requireAdmin(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_API_TOKEN;

  // Sans jeton configuré (ou jeton trop court), les routes admin restent fermées.
  if (!expected || expected.length < 32) {
    console.error('ADMIN_API_TOKEN absent ou trop court (32 caractères minimum) : routes admin désactivées.');
    return NextResponse.json({ error: 'Administration non configurée.' }, { status: 503 });
  }

  const header = request.headers.get('authorization') || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  const ok = a.length === b.length && timingSafeEqual(a, b);

  if (!ok) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }
  return null;
}
