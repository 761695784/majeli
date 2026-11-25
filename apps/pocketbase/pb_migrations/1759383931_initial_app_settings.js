/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let settings = app.settings()

    settings.meta.appName = "Majeli Connect"
    settings.meta.appURL = "https://majeliconnect.com"
    settings.meta.hideControls = false
    settings.meta.senderName = "Majeli Connect"
    settings.meta.senderAddress = "contact@majeliconnect.com"

    settings.logs.maxDays = 14
    settings.logs.minLevel = 0
    settings.logs.logIP = true
    
    settings.trustedProxy.headers = [
        "X-Real-IP",
        "X-Forwarded-For",
        "CF-Connecting-IP",
    ]

    app.save(settings)
})
