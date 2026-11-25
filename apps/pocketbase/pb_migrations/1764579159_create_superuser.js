/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    try {
        const superusers = app.findCollectionByNameOrId("_superusers")
        const record = new Record(superusers)
        
        const email = $os.getenv("PB_SUPERUSER_EMAIL") || "admin@majeliconnect.com"
        const password = $os.getenv("PB_SUPERUSER_PASSWORD") || "Majeli2026Admin!"
        
        record.set("email", email)
        record.set("password", password)
        
        app.save(record)
    } catch (e) {
        console.log("Superuser already exists or skipped:", e.message)
    }
})
