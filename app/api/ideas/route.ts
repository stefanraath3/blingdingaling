import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  // Rely on OPENAI_API_KEY in environment
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

    // Craft the instruction so the model reliably returns JSON we can parse.
    const instruction = `You are a startup guru. Given a hobby or interest, you suggest ways to monetise it.\n\nReturn **only** valid JSON with this exact shape:\n{\n  \"title\": string,             // catchy heading\n  \"description\": string,       // 1–2 sentence summary\n  \"ideas\": string[]            // array length 1-12 with concise ideas\n}\nDo NOT wrap the JSON in markdown backticks. Maximum 12 ideas.\n\nHOBBY: ${prompt.trim()}`;

    const aiRes = await openai.responses.create({
      model: "gpt-4.1",
      input: instruction,
      // disable log storage for privacy
      store: false,
    });

    // The Responses API puts the text in output_text
    const raw = aiRes.output_text ?? "";

    let parsed: IdeasResponse | null = null;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // Fallback: attempt to extract JSON substring
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      }
    }

    if (!parsed || !Array.isArray(parsed.ideas)) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw },
        { status: 500 }
      );
    }

    // Enforce max 12 ideas on server just in case
    parsed.ideas = parsed.ideas.slice(0, 12);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("/api/ideas error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
