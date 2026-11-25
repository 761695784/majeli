import { NextResponse } from 'next/server';
import { createAdminPb } from '@/lib/pocketbase-server';

const FUNNEL_TYPES = ['projet', 'intervention', 'formation'] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// --- Anti-spam : limite par adresse IP (5 envois / 10 minutes) ---
// Limite en mémoire : suffisante pour un serveur Node unique (VPS / hébergement Node Hostinger).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Nettoyage pour éviter que la table grossisse indéfiniment
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'inconnue';
}

/** Retourne une chaîne nettoyée et tronquée, ou '' si la valeur n'est pas une chaîne. */
function clean(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  // 1. Champ piège (honeypot) : invisible pour un humain, rempli par les robots.
  //    On répond « succès » sans rien enregistrer pour ne pas renseigner le robot.
  if (clean(data.website, 200) !== '') {
    return NextResponse.json({ success: true });
  }

  // 2. Limite d'envois par IP
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: 'Trop de demandes envoyées en peu de temps. Réessayez dans quelques minutes ou écrivez-nous sur WhatsApp.' },
      { status: 429 }
    );
  }

  // 3. Validation serveur
  const fullName = clean(data.fullName, 120);
  const email = clean(data.email, 200).toLowerCase();
  const phone = clean(data.phone, 40);
  const message = clean(data.message, 5000);
  const funnelTypeRaw = clean(data.funnelType, 20);
  const funnelType = (FUNNEL_TYPES as readonly string[]).includes(funnelTypeRaw) ? funnelTypeRaw : 'projet';

  if (!fullName || !email || !phone || !message) {
    return NextResponse.json(
      { error: 'Merci de remplir les champs obligatoires : nom, email, téléphone et message.' },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'L’adresse email semble invalide.' }, { status: 400 });
  }
  if (phone.replace(/[^0-9]/g, '').length < 7) {
    return NextResponse.json({ error: 'Le numéro de téléphone semble invalide.' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Votre message est trop court : décrivez votre besoin en quelques mots.' }, { status: 400 });
  }

  // 4. Enregistrement dans PocketBase (le hook PocketBase envoie ensuite les emails)
  try {
    const pb = await createAdminPb();
    const record = await pb.collection('demandes_contact').create({
      nom_complet: fullName,
      entreprise: clean(data.company, 150),
      email,
      telephone: phone,
      type_demande: funnelType,
      forfait_choisi: clean(data.selectedPlan, 100),
      fourchette_budget: clean(data.budgetRange, 50),
      nombre_equipements: clean(data.equipmentCount, 50),
      urgence: clean(data.urgency, 50),
      message,
      statut: 'nouveau',
      source: 'site_web',
    });

    return NextResponse.json({
      success: true,
      id: record.id,
      message: 'Votre demande a été enregistrée avec succès.',
    });
  } catch (error) {
    // Plus de « mode démo » : si l'enregistrement échoue, on le dit clairement au visiteur.
    console.error('Échec enregistrement demande de contact :', error);
    return NextResponse.json(
      { error: 'Notre serveur n’a pas pu enregistrer votre demande. Envoyez-la-nous sur WhatsApp, nous vous répondons rapidement.' },
      { status: 503 }
    );
  }
}
