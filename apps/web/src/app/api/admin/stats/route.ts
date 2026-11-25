import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function GET(request: Request) {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL || 'admin@majeliconnect.com',
      process.env.PB_SUPERUSER_PASSWORD || 'Majeli2026Admin!'
    );

    const [demandes, devis, projets] = await Promise.all([
      pb.collection('demandes_contact').getFullList({ sort: '-created' }),
      pb.collection('devis').getFullList({ sort: '-created' }),
      pb.collection('projets').getFullList(),
    ]);

    const totalDemandes = demandes.length;
    const nouvellesDemandes = demandes.filter((d) => d.statut === 'nouveau').length;
    const demandesProjets = demandes.filter((d) => d.type_demande === 'projet').length;
    const demandesInterventions = demandes.filter((d) => d.type_demande === 'intervention').length;
    const demandesFormations = demandes.filter((d) => d.type_demande === 'formation').length;

    const totalDevis = devis.length;
    const devisAcceptes = devis.filter((d) => d.statut === 'valide' || d.statut === 'facture').length;
    const montantTotalTTC = devis.reduce((acc, d) => acc + (Number(d.total_ttc) || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalDemandes,
        nouvellesDemandes,
        demandesProjets,
        demandesInterventions,
        demandesFormations,
        totalDevis,
        devisAcceptes,
        montantTotalTTC,
        totalProjetsEnLigne: projets.length,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur calcul statistiques';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
