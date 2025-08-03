"use client";
import { useState } from "react";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Results from "../components/Results";
import PromptCarousel from "../components/PromptCarousel";

interface ApiResponse {
  title: string;
  description: string;
  ideas: string[];
  error?: string;
}

export default function Home() {
  type Stage = "input" | "loading" | "result";
  const [stage, setStage] = useState<Stage>("input");
  const [result, setResult] = useState<ApiResponse | null>(null);

  async function handleSubmit(prompt: string) {
    if (!prompt.trim()) return;
    setStage("loading");
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data);
      setStage("result");
    } catch (err) {
      console.error(err);
      setResult({
        title: "Error",
        description: "",
        ideas: [],
        error: String(err),
      });
      setStage("result");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#009358" }}
    >
      {/* Header */}
      <header className="w-full px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <nav className="flex items-center space-x-8 text-lg">
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-6xl flex flex-col items-center gap-8">
          {stage === "input" && (
            <>
              <SearchBar onSubmit={handleSubmit} />
              <div className="text-left w-full">
                <p className="text-white/70 text-md">
                  "I like reading romance novels"
                </p>
              </div>
            </>
          )}

          {stage === "loading" && <Loader />}

          {stage === "result" && result && (
            <Results
              title={result.title}
              description={result.description}
              ideas={result.ideas}
              onBack={() => {
                setStage("input");
                setResult(null);
              }}
            />
          )}
        </div>
      </main>

      {/* Carousel Section */}
      {stage === "input" && (
        <section className="w-full py-16 px-8 mt-auto">
          <PromptCarousel />
        </section>
      )}
    </div>
  );
}
