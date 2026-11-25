export interface RecordModel {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export type DemandeStatut = 'nouveau' | 'en_cours' | 'traite' | 'archive';
export type DevisStatut = 'brouillon' | 'envoye' | 'valide' | 'refuse' | 'facture';

export interface DemandeContactRecord extends RecordModel {
  nom_complet: string;
  entreprise?: string;
  email: string;
  telephone: string;
  type_demande: 'projet' | 'intervention' | 'formation';
  forfait_choisi?: string;
  fourchette_budget?: string;
  nombre_equipements?: string;
  urgence?: string;
  message: string;
  statut: DemandeStatut;
  notes_internes?: string;
  source?: string;
}

export interface DevisItem {
  designation: string;
  quantite: number;
  prix_unitaire: number;
  total: number;
}

export interface DevisRecord extends RecordModel {
  reference: string;
  client_nom: string;
  client_entreprise?: string;
  client_email: string;
  client_telephone?: string;
  client_adresse?: string;
  items: DevisItem[];
  total_ht: number;
  tva_applicable: boolean;
  total_ttc: number;
  statut: DevisStatut;
  date_emission?: string;
  date_validite?: string;
  modalites_paiement?: string;
  notes?: string;
}

export interface ProjetRecord extends RecordModel {
  slug: string;
  titre: string;
  client: string;
  categorie: string;
  accroche?: string;
  description?: string;
  image_url?: string;
  live_url?: string;
  tags?: string[];
  livrables?: string[];
  resultats?: string[];
  contexte?: string;
  en_vedette?: boolean;
  ordre?: number;
}

export interface TemoignageRecord extends RecordModel {
  nom: string;
  role?: string;
  entreprise: string;
  contenu: string;
  note?: number;
  projet_slug?: string;
  localisation?: string;
  actif?: boolean;
}
