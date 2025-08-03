import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  // OPENAI_API_KEY picked up from env
});

interface Idea {
  title: string;
  description: string;
}

interface IdeasResponse {
  ideas: Idea[];
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
        ideas: {
          type: "array",
          description:
            "Exactly 12 monetisation ideas. Each idea is an object with a 3-4 word title and a one-sentence description.",
          minItems: 12,
          maxItems: 12,
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Concise 3-4 word idea name",
              },
              description: {
                type: "string",
                description: "One-sentence explanation of the idea",
              },
            },
            required: ["title", "description"],
            additionalProperties: false,
          },
        },
      },
      required: ["ideas"],
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
          content: `Generate exactly 12 monetisation ideas for the hobby: \"${prompt.trim()}\"`,
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
