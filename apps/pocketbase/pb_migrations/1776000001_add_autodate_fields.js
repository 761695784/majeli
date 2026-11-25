/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collections = ["demandes_contact", "devis", "projets", "services", "temoignages"];

  for (const name of collections) {
    try {
      const col = app.findCollectionByNameOrId(name);
      
      // Vérifier si created existe déjà
      const hasCreated = col.fields.find((f) => f.name === "created");
      if (!hasCreated) {
        col.fields.add(new AutodateField({
          name: "created",
          onCreate: true,
          onUpdate: false,
        }));
      }

      // Vérifier si updated existe déjà
      const hasUpdated = col.fields.find((f) => f.name === "updated");
      if (!hasUpdated) {
        col.fields.add(new AutodateField({
          name: "updated",
          onCreate: true,
          onUpdate: true,
        }));
      }

      app.save(col);
      console.log("Added autodate fields to " + name);
    } catch (e) {
      console.log("Error updating autodate fields on " + name + ":", e.message);
    }
  }
})
