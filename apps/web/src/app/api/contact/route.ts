import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation minimale côté serveur
    if (!data.fullName || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants (nom, email, téléphone, message).' },
        { status: 400 }
      );
    }

    // Tentative de sauvegarde dans PocketBase si disponible
    try {
      const record = await pb.collection('demandes_contact').create({
        nom_complet: data.fullName,
        entreprise: data.company || '',
        email: data.email,
        telephone: data.phone,
        type_demande: data.funnelType || 'projet',
        forfait_choisi: data.selectedPlan || '',
        fourchette_budget: data.budgetRange || '',
        nombre_equipements: data.equipmentCount || '',
        urgence: data.urgency || '',
        message: data.message,
        statut: 'nouveau',
        source: 'site_web',
      });

      return NextResponse.json({
        success: true,
        id: record.id,
        message: 'Votre demande a été enregistrée avec succès.',
      });
    } catch (pbError) {
      // En mode développement ou avant l'Étape 4 (PocketBase), on loggue et on confirme pour la démo
      console.warn('PocketBase non connecté ou collection non créée pour le moment:', pbError);
      return NextResponse.json({
        success: true,
        demoMode: true,
        message: 'Demande prise en compte en mode démonstration.',
      });
    }
  } catch (error) {
    console.error('Erreur traitement contact:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue lors de la transmission.' },
      { status: 500 }
    );
  }
}
