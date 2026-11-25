/// <reference path="../pb_data/types.d.ts" />
// Ferme la création publique des demandes de contact.
// Désormais, seule la route Next.js /api/contact (authentifiée en superuser côté serveur)
// peut créer une demande : impossible de contourner l'anti-spam en appelant PocketBase directement.
migrate((app) => {
  const col = app.findCollectionByNameOrId("demandes_contact")
  col.createRule = null // null = réservé aux superusers
  app.save(col)
}, (app) => {
  const col = app.findCollectionByNameOrId("demandes_contact")
  col.createRule = ""
  app.save(col)
})
