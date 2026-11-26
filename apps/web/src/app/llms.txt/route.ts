// /llms.txt : résumé du site en Markdown, destiné aux agents IA (https://llmstxt.org).
import { buildLlmsTxt } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
