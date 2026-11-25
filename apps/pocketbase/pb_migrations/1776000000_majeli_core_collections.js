/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // 1. Collection: demandes_contact
  try {
    const demandesCollection = new Collection({
      name: "demandes_contact",
      type: "base",
      createRule: "", // Accessible à tous pour soumission du formulaire
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: "nom_complet", type: "text", required: true },
        { name: "entreprise", type: "text", required: false },
        { name: "email", type: "email", required: true },
        { name: "telephone", type: "text", required: true },
        { name: "type_demande", type: "text", required: true }, // projet, intervention, formation
        { name: "forfait_choisi", type: "text", required: false },
        { name: "fourchette_budget", type: "text", required: false },
        { name: "nombre_equipements", type: "text", required: false },
        { name: "urgence", type: "text", required: false },
        { name: "message", type: "text", required: true },
        { name: "statut", type: "text", required: false }, // nouveau, en_cours, traite, archive
        { name: "notes_internes", type: "text", required: false },
        { name: "source", type: "text", required: false },
      ]
    });
    app.save(demandesCollection);
  } catch (e) {
    console.log("demandes_contact already exists or handled:", e.message);
  }

  // 2. Collection: devis
  try {
    const devisCollection = new Collection({
      name: "devis",
      type: "base",
      createRule: "@request.auth.id != ''",
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: "reference", type: "text", required: true }, // ex: DEV-2026-001
        { name: "client_nom", type: "text", required: true },
        { name: "client_entreprise", type: "text", required: false },
        { name: "client_email", type: "email", required: true },
        { name: "client_telephone", type: "text", required: false },
        { name: "client_adresse", type: "text", required: false },
        { name: "items", type: "json", required: true }, // [{ description, qte, prix_unitaire, total }]
        { name: "total_ht", type: "number", required: true },
        { name: "tva_applicable", type: "bool", required: false },
        { name: "total_ttc", type: "number", required: true },
        { name: "statut", type: "text", required: true }, // brouillon, envoye, valide, refuse, facture
        { name: "date_emission", type: "text", required: false },
        { name: "date_validite", type: "text", required: false },
        { name: "modalites_paiement", type: "text", required: false },
        { name: "notes", type: "text", required: false },
      ]
    });
    app.save(devisCollection);
  } catch (e) {
    console.log("devis already exists or handled:", e.message);
  }

  // 3. Collection: projets
  try {
    const projetsCollection = new Collection({
      name: "projets",
      type: "base",
      createRule: "@request.auth.id != ''",
      listRule: "", // Public
      viewRule: "", // Public
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "titre", type: "text", required: true },
        { name: "client", type: "text", required: true },
        { name: "categorie", type: "text", required: true },
        { name: "accroche", type: "text", required: false },
        { name: "description", type: "text", required: false },
        { name: "image_url", type: "text", required: false },
        { name: "live_url", type: "text", required: false },
        { name: "tags", type: "json", required: false },
        { name: "livrables", type: "json", required: false },
        { name: "resultats", type: "json", required: false },
        { name: "contexte", type: "text", required: false },
        { name: "en_vedette", type: "bool", required: false },
        { name: "ordre", type: "number", required: false },
      ]
    });
    app.save(projetsCollection);
  } catch (e) {
    console.log("projets already exists or handled:", e.message);
  }

  // 4. Collection: services
  try {
    const servicesCollection = new Collection({
      name: "services",
      type: "base",
      createRule: "@request.auth.id != ''",
      listRule: "", // Public
      viewRule: "", // Public
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "titre", type: "text", required: true },
        { name: "titre_court", type: "text", required: false },
        { name: "resume", type: "text", required: false },
        { name: "description_complete", type: "text", required: false },
        { name: "plans", type: "json", required: false },
        { name: "livrables", type: "json", required: false },
        { name: "technologies", type: "json", required: false },
        { name: "ordre", type: "number", required: false },
      ]
    });
    app.save(servicesCollection);
  } catch (e) {
    console.log("services already exists or handled:", e.message);
  }

  // 5. Collection: temoignages
  try {
    const temoignagesCollection = new Collection({
      name: "temoignages",
      type: "base",
      createRule: "@request.auth.id != ''",
      listRule: "", // Public
      viewRule: "", // Public
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: "nom", type: "text", required: true },
        { name: "role", type: "text", required: false },
        { name: "entreprise", type: "text", required: true },
        { name: "contenu", type: "text", required: true },
        { name: "note", type: "number", required: false },
        { name: "projet_slug", type: "text", required: false },
        { name: "localisation", type: "text", required: false },
        { name: "actif", type: "bool", required: false },
      ]
    });
    app.save(temoignagesCollection);
  } catch (e) {
    console.log("temoignages already exists or handled:", e.message);
  }
}, (app) => {
  // Revert logic si nécessaire
})
