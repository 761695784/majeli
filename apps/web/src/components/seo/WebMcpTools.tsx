'use client';

import { useEffect } from 'react';

/**
 * WebMCP : expose des « outils » aux agents IA qui tournent dans le navigateur
 * (navigator.modelContext). Sans agent compatible, ce composant ne fait rien.
 *
 * - majeli_infos_services : lit /llms.txt (services, tarifs, contacts, réalisations).
 * - majeli_envoyer_demande : envoie une demande via le formulaire de contact
 *   (/api/contact, avec ses protections : validation, limite d'envois par IP).
 */

type ToolResult = { content: { type: 'text'; text: string }[] };

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool) => { unregister?: () => void } | void;
  unregisterTool?: (name: string) => void;
  provideContext?: (ctx: { tools: WebMcpTool[] }) => void;
};

const text = (t: string): ToolResult => ({ content: [{ type: 'text', text: t }] });

const TOOLS: WebMcpTool[] = [
  {
    name: 'majeli_infos_services',
    description:
      "Renvoie en Markdown la présentation de Majeli Connect (agence digitale à Dakar) : services, tarifs indicatifs en FCFA, délais, réalisations, horaires et coordonnées.",
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const res = await fetch('/llms.txt', { headers: { Accept: 'text/markdown' } });
      if (!res.ok) return text('Informations indisponibles pour le moment. Voir https://majeliconnect.com/services');
      return text(await res.text());
    },
  },
  {
    name: 'majeli_envoyer_demande',
    description:
      "Envoie une demande de devis ou de contact à Majeli Connect au nom de l'utilisateur. À utiliser seulement après accord explicite de l'utilisateur sur le contenu du message. L'équipe répond sous 2 heures ouvrées.",
    inputSchema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', description: 'Nom complet du demandeur' },
        email: { type: 'string', description: 'Adresse email du demandeur' },
        phone: { type: 'string', description: 'Numéro de téléphone (idéalement WhatsApp)' },
        company: { type: 'string', description: "Nom de l'entreprise (facultatif)" },
        funnelType: {
          type: 'string',
          enum: ['projet', 'intervention', 'formation'],
          description: 'projet = site, application, IA ; intervention = maintenance ou réseau ; formation',
        },
        message: { type: 'string', description: 'Description du besoin' },
      },
      required: ['fullName', 'email', 'phone', 'message'],
    },
    async execute(input) {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funnelType: 'projet', ...input, website: '' }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        return text(`Échec de l'envoi : ${data.error || `erreur ${res.status}`}. Alternative : WhatsApp https://wa.me/221782643438`);
      }
      return text("Demande envoyée à Majeli Connect. Un accusé de réception part par email ; réponse sous 2 heures ouvrées.");
    },
  },
];

export function WebMcpTools() {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc) return;

    const cleanups: (() => void)[] = [];
    try {
      if (typeof mc.registerTool === 'function') {
        for (const tool of TOOLS) {
          const registration = mc.registerTool(tool);
          cleanups.push(() => {
            if (registration && typeof registration.unregister === 'function') registration.unregister();
            else mc.unregisterTool?.(tool.name);
          });
        }
      } else if (typeof mc.provideContext === 'function') {
        mc.provideContext({ tools: TOOLS });
      }
    } catch {
      // API expérimentale : on ne casse jamais la page si elle change.
    }

    return () => {
      for (const fn of cleanups) {
        try {
          fn();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  return null;
}
