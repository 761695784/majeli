import { NextResponse } from 'next/server';
import { createAdminPb } from '@/lib/pocketbase-server';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const pb = await createAdminPb();

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
    console.error('Erreur API admin :', message);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
