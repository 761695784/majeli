import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function GET(request: Request) {
  try {
    // Authentification superuser serveur pour accéder aux données sécurisées
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL || 'admin@majeliconnect.com',
      process.env.PB_SUPERUSER_PASSWORD || 'Majeli2026Admin!'
    );

    const records = await pb.collection('demandes_contact').getFullList({
      sort: '-created',
    });

    return NextResponse.json({ success: true, items: records });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur de récupération des demandes';
    console.error('Erreur API admin demandes:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, statut, notes_internes } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Identifiant manquant' }, { status: 400 });
    }

    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL || 'admin@majeliconnect.com',
      process.env.PB_SUPERUSER_PASSWORD || 'Majeli2026Admin!'
    );

    const updated = await pb.collection('demandes_contact').update(id, {
      ...(statut && { statut }),
      ...(notes_internes !== undefined && { notes_internes }),
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur mise à jour';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
