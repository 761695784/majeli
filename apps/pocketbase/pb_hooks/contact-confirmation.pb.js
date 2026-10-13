/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "We received your message",
    html: "<h1>Thank you for contacting us!</h1><p>Hi " + e.record.get("name") + ",</p><p>We have received your message and will get back to you as soon as possible.</p><p><strong>Your message:</strong><br>" + e.record.get("message") + "</p><p>Best regards,<br>Our Team</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "contacts");