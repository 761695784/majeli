/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  // Échappement HTML : le contenu saisi par le visiteur ne doit jamais être interprété
  // comme du HTML dans les emails (liens piégés, faux boutons, etc.).
  // NB : défini DANS le handler, car PocketBase n'expose pas les fonctions du haut du fichier aux handlers.
  const esc = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  // Pour les objets d'email : texte brut sur une seule ligne
  const oneLine = (value) => String(value == null ? "" : value).replace(/[\r\n]+/g, " ").slice(0, 120);

  const nomBrut = e.record.get("nom_complet") || "Client";
  const emailClient = e.record.get("email");
  const telephoneBrut = e.record.get("telephone") || "Non renseigné";
  const forfaitBrut = e.record.get("forfait_choisi") || "";
  const typeBrut = e.record.get("type_demande") || "projet";

  const nom = esc(nomBrut);
  const emailHtml = esc(emailClient);
  const telephone = esc(telephoneBrut);
  const telephoneChiffres = String(telephoneBrut).replace(/[^0-9]/g, "");
  const entreprise = esc(e.record.get("entreprise") || "Particulier / Non renseignée");
  const typeDemande = esc(typeBrut);
  const forfait = esc(forfaitBrut || "Non spécifié");
  const budget = esc(e.record.get("fourchette_budget") || "À définir");
  const urgence = esc(e.record.get("urgence") || "Non précisée");
  // Message : échappé puis retours à la ligne conservés
  const messageContenu = esc(e.record.get("message") || "").replace(/\n/g, "<br>");

  // 1. Email de confirmation au client
  try {
    const confirmationClient = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress || "contact@majeliconnect.com",
        name: "Majeli Connect"
      },
      to: [{ address: emailClient }],
      subject: "Nous avons bien reçu votre demande - Majeli Connect Dakar",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #283618; line-height: 1.6; border: 1px solid #606C38; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #283618; color: #FEFAE0; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Majeli Connect</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #BC6C25; font-weight: bold;">Solutions Technologiques & Agence Digitale à Dakar</p>
          </div>
          <div style="padding: 24px; background-color: #FEFAE0;">
            <p style="font-size: 16px; font-weight: bold;">Bonjour ${nom},</p>
            <p>Nous vous remercions d'avoir contacté <strong>Majeli Connect</strong>. Votre demande a bien été enregistrée par notre équipe technique basée à Liberté 5, Dakar.</p>
            
            <div style="background-color: #FFFFFF; padding: 16px; border-radius: 8px; border: 1px solid #606C38; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #283618; font-size: 14px; text-transform: uppercase;">Récapitulatif de votre demande :</h3>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Type :</strong> ${typeDemande.toUpperCase()}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Prestation ciblée :</strong> ${forfait}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Budget indicatif :</strong> ${budget}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Votre message :</strong><br><em>${messageContenu}</em></p>
            </div>

            <div style="background-color: #283618; color: #FEFAE0; padding: 14px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px;"><strong>Notre engagement :</strong> Nous examinons votre cahier des charges et revenons vers vous sous <strong>2 heures ouvrées</strong> avec un retour technique précis.</p>
            </div>

            <p style="font-size: 13px; color: #283618;">Une urgence ou un besoin d'échange immédiat ? Contactez notre permanence directe :</p>
            <p style="font-size: 13px; margin-top: 4px;">
              📞 Téléphone : <strong>+221 78 264 34 38</strong><br>
              💬 WhatsApp : <a href="https://wa.me/221782643438" style="color: #BC6C25; font-weight: bold;">Ouvrir la discussion</a><br>
              📍 Bureau : Liberté 5, Dakar, Sénégal
            </p>
          </div>
          <div style="background-color: #606C38; color: #FEFAE0; padding: 12px; text-align: center; font-size: 12px;">
            © ${new Date().getFullYear()} Majeli Connect SARL. Tous droits réservés.
          </div>
        </div>
      `
    });
    $app.newMailClient().send(confirmationClient);
  } catch (err) {
    console.error("Erreur envoi email client:", err);
  }

  // 2. Email d'alerte interne pour l'équipe commerciale / fondateurs Majeli
  try {
    const alerteEquipe = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress || "contact@majeliconnect.com",
        name: "Système Site Majeli Connect"
      },
      to: [{ address: "contact@majeliconnect.com" }],
      subject: `🚨 [NOUVEAU PROSPECT] ${oneLine(nomBrut)} - ${oneLine(forfaitBrut || typeBrut)}`,
      // « Répondre » dans la boîte mail répond directement au prospect
      headers: { "Reply-To": emailClient },
      html: `
        <h2>Nouvelle demande de devis reçue sur majeliconnect.com</h2>
        <ul>
          <li><strong>Nom complet :</strong> ${nom}</li>
          <li><strong>Entreprise :</strong> ${entreprise}</li>
          <li><strong>Email :</strong> <a href="mailto:${emailHtml}">${emailHtml}</a></li>
          <li><strong>Téléphone :</strong> <a href="tel:${telephone}">${telephone}</a> (WhatsApp direct : <a href="https://wa.me/${telephoneChiffres}">Cliquer ici</a>)</li>
          <li><strong>Type de demande :</strong> ${typeDemande}</li>
          <li><strong>Forfait ciblé :</strong> ${forfait}</li>
          <li><strong>Fourchette budget :</strong> ${budget}</li>
          <li><strong>Urgence :</strong> ${urgence}</li>
        </ul>
        <h3>Message du prospect :</h3>
        <blockquote style="background:#f4f4f4; padding:12px; border-left:4px solid #283618;">
          ${messageContenu}
        </blockquote>
        <p><strong>Délai de rappel recommandé :</strong> Moins de 2h ouvrées.</p>
      `
    });
    $app.newMailClient().send(alerteEquipe);
  } catch (err) {
    console.error("Erreur envoi email équipe:", err);
  }

  e.next();
}, "demandes_contact");
