import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  // OPENAI_API_KEY picked up from env
});

interface IdeasResponse {
  title: string;
  description: string;
  ideas: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Server mis-configuration: missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    // JSON schema for structured outputs
    const schema = {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Catchy heading summarising the opportunity",
        },
        description: {
          type: "string",
          description: "One-sentence summary of the opportunity",
        },
        ideas: {
          type: "array",
          description: "Monetisation ideas (max 12)",
          items: { type: "string" },
          minItems: 1,
          maxItems: 12,
        },
      },
      required: ["title", "description", "ideas"],
      additionalProperties: false,
    } as const;

    const aiRes = await openai.responses.create({
      model: "gpt-4.1-mini", // Structured Outputs supported
      input: [
        {
          role: "system",
          content:
            "You are an expert business idea generator that produces concise, useful output strictly following the given schema.",
        },
        {
          role: "user",
          content: `Generate a title, one-sentence description, and up to 12 monetisation ideas for the hobby: \"${prompt.trim()}\"`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hobby_monetization",
          schema,
          strict: true,
        },
      },
      store: false,
    });

    const parsed = aiRes.output_text
      ? (JSON.parse(aiRes.output_text) as IdeasResponse)
      : null;

    if (!parsed || !Array.isArray(parsed.ideas)) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: aiRes.output_text },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("/api/ideas error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
