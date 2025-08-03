import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  // OPENAI_API_KEY picked up from env
});

interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface GuideResponse {
  earningsPotential: string;
  competitiveScore: string;
  steps: GuideStep[];
}

export async function POST(req: NextRequest) {
  try {
    const { idea, description, originalPrompt } = (await req.json()) as {
      idea?: string;
      description?: string;
      originalPrompt?: string;
    };

    if (!idea || !description) {
      return NextResponse.json(
        { error: "Idea and description are required" },
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
        earningsPotential: {
          type: "string",
          description: "Earnings range in format like '$500-$5k'",
        },
        competitiveScore: {
          type: "string",
          description: "Competition level from 1-10 in format like '3/10'",
        },
        steps: {
          type: "array",
          description: "Exactly 10 actionable steps to monetize this idea",
          minItems: 10,
          maxItems: 10,
          items: {
            type: "object",
            properties: {
              stepNumber: {
                type: "number",
                description: "Step number from 1 to 10",
              },
              title: {
                type: "string",
                description: "Concise step title, 2-4 words",
              },
              description: {
                type: "string",
                description: "One to two sentence explanation of the step",
              },
            },
            required: ["stepNumber", "title", "description"],
            additionalProperties: false,
          },
        },
      },
      required: ["earningsPotential", "competitiveScore", "steps"],
      additionalProperties: false,
    } as const;

    const aiRes = await openai.responses.create({
      model: "gpt-4.1-mini", // Structured Outputs supported
      input: [
        {
          role: "system",
          content:
            "You are an expert business consultant that creates detailed monetization guides. Provide realistic earnings potential, accurate competitive analysis, and actionable steps.",
        },
        {
          role: "user",
          content: `Create a detailed monetization guide for this business idea:

Title: "${idea}"
Description: "${description}"
Original hobby/interest: "${originalPrompt}"

Provide:
1. Realistic monthly earnings potential (e.g., "$500-$5k")
2. Competitive score from 1-10 (1 = very competitive, 10 = low competition)
3. Exactly 10 actionable steps to start and grow this business

Make the steps specific, practical, and in logical order from start to scale.`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "monetization_guide",
          schema,
          strict: true,
        },
      },
      store: false,
    });

    const parsed = aiRes.output_text
      ? (JSON.parse(aiRes.output_text) as GuideResponse)
      : null;

    if (!parsed || !Array.isArray(parsed.steps) || parsed.steps.length !== 10) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: aiRes.output_text },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("/api/guide error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
