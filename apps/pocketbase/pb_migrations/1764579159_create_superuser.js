/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    // Le compte superuser est créé UNIQUEMENT à partir des variables d'environnement.
    // Aucun mot de passe par défaut dans le code : sans variables, on ne crée rien
    // (le compte peut alors être créé avec `pocketbase superuser upsert EMAIL MOTDEPASSE`).
    const email = $os.getenv("PB_SUPERUSER_EMAIL")
    const password = $os.getenv("PB_SUPERUSER_PASSWORD")

    if (!email || !password) {
        console.log("PB_SUPERUSER_EMAIL / PB_SUPERUSER_PASSWORD absents : création du superuser ignorée.")
        return
    }

    try {
        const superusers = app.findCollectionByNameOrId("_superusers")
        const record = new Record(superusers)

        record.set("email", email)
        record.set("password", password)

        app.save(record)
    } catch (e) {
        console.log("Superuser already exists or skipped:", e.message)
    }
})
