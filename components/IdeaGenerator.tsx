"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import Results from "./Results";
import PromptCarousel from "./PromptCarousel";

interface Idea {
  title: string;
  description: string;
}

interface ApiResponse {
  ideas: Idea[];
  error?: string;
}

export default function IdeaGenerator() {
  type Stage = "input" | "loading" | "result";
  const [stage, setStage] = useState<Stage>("input");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [prompt, setPrompt] = useState("");

  async function handleSubmit(userPrompt: string) {
    if (!userPrompt.trim()) return;
    setPrompt(userPrompt);
    setStage("loading");
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data);
      setStage("result");
    } catch (err) {
      console.error(err);
      setResult({ ideas: [], error: String(err) });
      setStage("result");
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
      {stage === "input" && (
        <>
          <SearchBar onSubmit={handleSubmit} />
          <div className="text-left w-full">
            <p className="text-white/70 text-md">
              &ldquo;I like reading romance novels&rdquo;
            </p>
          </div>
        </>
      )}

      {stage === "loading" && <Loader />}

      {stage === "result" && result && (
        <Results prompt={prompt} ideas={result.ideas} />
      )}

      {/* Carousel only show in input stage */}
      {stage === "input" && (
        <section className="w-full py-16 px-8 mt-auto">
          <PromptCarousel />
        </section>
      )}
    </div>
  );
}
