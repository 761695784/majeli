import { NextResponse } from 'next/server';
import { createAdminPb } from '@/lib/pocketbase-server';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    // Authentification superuser serveur pour accéder aux données sécurisées
    const pb = await createAdminPb();

    const records = await pb.collection('demandes_contact').getFullList({
      sort: '-created',
    });

    return NextResponse.json({ success: true, items: records });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur de récupération des demandes';
    console.error('Erreur API admin :', message);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { id, statut, notes_internes } = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Identifiant manquant' }, { status: 400 });
    }
    if (statut && !['nouveau', 'en_cours', 'traite', 'archive'].includes(statut)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 });
    }

    const pb = await createAdminPb();

    const updated = await pb.collection('demandes_contact').update(id, {
      ...(statut && { statut }),
      ...(notes_internes !== undefined && { notes_internes }),
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur mise à jour';
    console.error('Erreur API admin :', message);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
