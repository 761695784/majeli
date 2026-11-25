import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function GET(request: Request) {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL || 'admin@majeliconnect.com',
      process.env.PB_SUPERUSER_PASSWORD || 'Majeli2026Admin!'
    );

    const records = await pb.collection('devis').getFullList({
      sort: '-created',
    });

    return NextResponse.json({ success: true, items: records });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur récupération devis';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.client_nom || !data.client_email || !data.items || !Array.isArray(data.items)) {
      return NextResponse.json({ error: 'Données client ou prestations incomplètes' }, { status: 400 });
    }

    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL || 'admin@majeliconnect.com',
      process.env.PB_SUPERUSER_PASSWORD || 'Majeli2026Admin!'
    );

    // Calcul automatique des totaux
    const total_ht = data.items.reduce(
      (acc: number, item: { quantite: number; prix_unitaire: number }) =>
        acc + (Number(item.quantite) || 1) * (Number(item.prix_unitaire) || 0),
      0
    );
    const tva_applicable = Boolean(data.tva_applicable);
    const total_ttc = tva_applicable ? Math.round(total_ht * 1.18) : total_ht;

    // Numérotation séquentielle de référence
    const existing = await pb.collection('devis').getList(1, 1, { sort: '-created' });
    const count = (existing.totalItems || 0) + 1;
    const year = new Date().getFullYear();
    const reference = data.reference || `DEV-${year}-${String(count).padStart(3, '0')}`;

    const createdRecord = await pb.collection('devis').create({
      reference,
      client_nom: data.client_nom,
      client_entreprise: data.client_entreprise || '',
      client_email: data.client_email,
      client_telephone: data.client_telephone || '',
      client_adresse: data.client_adresse || '',
      items: data.items,
      total_ht,
      tva_applicable,
      total_ttc,
      statut: data.statut || 'brouillon',
      date_emission: data.date_emission || new Date().toISOString().split('T')[0],
      date_validite: data.date_validite || '',
      modalites_paiement: data.modalites_paiement || '50% à la commande (Wave / Virement), 50% à la livraison',
      notes: data.notes || '',
    });

    return NextResponse.json({ success: true, item: createdRecord });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur création devis';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
