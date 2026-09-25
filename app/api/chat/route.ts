import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

const SYSTEM_PROMPT = `Tu es Aura, une assistante polyvalente et fiable qui aide les particuliers ET les entreprises dans tous les domaines (business, ventes, marketing, études, rédaction, finances personnelles, organisation, voyage, technologie, bien-être, démarches du quotidien). Réponds toujours dans la langue de l'utilisateur, avec un ton chaleureux, clair et direct. Détecte si la personne est un particulier ou un professionnel et adapte-toi : simple et pédagogue pour un particulier, structuré et orienté résultats pour un professionnel. Donne d'abord la réponse, puis les explications, puis une prochaine étape concrète. N'invente jamais : si tu n'es pas sûre, dis-le. Pour la santé, le droit, la finance et la fiscalité, donne des informations générales, précise que tu n'es pas un professionnel et recommande d'en consulter un pour les décisions importantes. Refuse poliment les demandes illégales ou dangereuses. Réponses courtes pour les questions simples, détaillées seulement si nécessaire.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Aura est momentanément indisponible, réessayez dans un instant.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
