import { NextResponse } from 'next/server';

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

  // 4. Envoi à l'API (Laravel, hébergée avec l'API AMEG) qui expédie les deux emails
  //    avec le compte SMTP de Majeli Connect. Appel serveur à serveur : la clé
  //    secrète ne quitte jamais le serveur Next.js.
  const apiUrl = process.env.MAJELI_MAIL_API_URL;
  const apiKey = process.env.MAJELI_MAIL_API_KEY;
  const echec = NextResponse.json(
    { error: 'Notre serveur n’a pas pu envoyer votre demande. Envoyez-la-nous sur WhatsApp, nous vous répondons rapidement.' },
    { status: 503 }
  );

  if (!apiUrl || !apiKey) {
    console.error('MAJELI_MAIL_API_URL ou MAJELI_MAIL_API_KEY manquant : impossible d’envoyer la demande de contact.');
    return echec;
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Majeli-Key': apiKey,
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
        company: clean(data.company, 150) || null,
        request_type: funnelType,
        selected_plan: clean(data.selectedPlan, 100) || null,
        budget_range: clean(data.budgetRange, 50) || null,
        equipment_count: clean(data.equipmentCount, 50) || null,
        urgency: clean(data.urgency, 50) || null,
        message,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(25_000),
    });

    if (res.status === 422) {
      // Erreur de validation côté API : on renvoie le premier message au visiteur
      const body = (await res.json().catch(() => ({}))) as { errors?: Record<string, string[]> };
      const premier = body.errors ? Object.values(body.errors)[0]?.[0] : undefined;
      return NextResponse.json({ error: premier || 'Certaines informations sont invalides.' }, { status: 400 });
    }

    if (!res.ok) {
      const texte = await res.text().catch(() => '');
      console.error(`API d’envoi Majeli : HTTP ${res.status}`, texte.slice(0, 300));
      return echec;
    }

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès.',
    });
  } catch (error) {
    // Réseau coupé, délai dépassé, API injoignable : on le dit clairement au visiteur.
    console.error('Échec de l’appel à l’API d’envoi Majeli :', error);
    return echec;
  }
}
