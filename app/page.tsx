"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            {[
              { label: "Home", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Login", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-6xl flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            {stage === "input" && (
              <motion.div
                key="input-group"
                className="w-full flex flex-col items-center gap-8"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
              >
                <SearchBar onSubmit={handleSubmit} />
                <div className="text-left w-full">
                  <p className="text-white/70 text-md">
                    "I like reading romance novels"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loader */}
          <AnimatePresence>
            {stage === "loading" && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Loader />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {stage === "result" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Results
                  title={result.title}
                  description={result.description}
                  ideas={result.ideas}
                  onBack={() => {
                    setStage("input");
                    setResult(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Carousel Section */}
      <AnimatePresence>
        {stage === "input" && (
          <motion.section
            key="carousel"
            className="w-full py-16 px-8 mt-auto"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.4 } }}
          >
            <PromptCarousel />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
