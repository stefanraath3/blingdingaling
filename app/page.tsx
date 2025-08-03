"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Results from "../components/Results";
import PromptCarousel from "../components/PromptCarousel";
import ApiKeyModal from "../components/ApiKeyModal";

interface Idea {
  title: string;
  description: string;
}

interface ApiResponse {
  ideas: Idea[];
  error?: string;
}

type Stage = "input" | "loading" | "result";

export default function Home() {
  const [stage, setStage] = useState<Stage>("input");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [showCarousel, setShowCarousel] = useState(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string>("");
  const nextStage = useRef<Stage>(stage);

  async function handleSubmit(prompt: string) {
    if (!prompt.trim()) return;

    // Check if we have an API key
    if (!apiKey) {
      setPendingPrompt(prompt);
      setShowApiKeyModal(true);
      return;
    }

    await generateIdeas(prompt, apiKey);
  }

  async function generateIdeas(prompt: string, userApiKey: string) {
    setShowCarousel(false); // hide immediately
    setUserPrompt(prompt);
    nextStage.current = "loading";
    setStage("loading");
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OpenAI-Key": userApiKey,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data);
      nextStage.current = "result";
      setStage("result");
    } catch (err) {
      console.error(err);
      setResult({ ideas: [], error: String(err) });
      nextStage.current = "result";
      setStage("result");
    }
  }

  function handleBack() {
    setShowCarousel(false); // hide while results exit
    nextStage.current = "input";
    setStage("input");
    setUserPrompt("");
  }

  function handleApiKeySubmit(userApiKey: string) {
    setApiKey(userApiKey);
    setShowApiKeyModal(false);
    if (pendingPrompt) {
      generateIdeas(pendingPrompt, userApiKey);
      setPendingPrompt("");
    }
  }

  function handleApiKeyCancel() {
    setShowApiKeyModal(false);
    setPendingPrompt("");
    setShowCarousel(true); // Show carousel again since we're staying on input stage
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
            {["Home", "FAQ", "Login"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main
        className={`flex-1 flex justify-center px-8 ${
          stage === "result" ? "items-start pt-8 pb-16" : "items-center"
        }`}
      >
        <div className="w-full max-w-6xl relative flex flex-col items-center min-h-[260px]">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              if (nextStage.current === "input") setShowCarousel(true);
            }}
          >
            {stage === "input" && (
              <motion.div
                key="input"
                className="w-full flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
              >
                <SearchBar onSubmit={handleSubmit} />
                <div className="text-left w-full">
                  <p className="text-white/70 text-md">
                    &ldquo;I like reading romance novels&rdquo;
                  </p>
                </div>
              </motion.div>
            )}

            {stage === "loading" && (
              <motion.div
                key="loading"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
              >
                <Loader />
              </motion.div>
            )}

            {stage === "result" && result && (
              <motion.div
                key="result"
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Results
                  prompt={userPrompt}
                  ideas={result.ideas}
                  apiKey={apiKey}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Carousel */}
      <AnimatePresence>
        {showCarousel && (
          <motion.section
            key="carousel"
            className="w-full py-16 px-8 mt-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.4 } }}
          >
            <PromptCarousel />
          </motion.section>
        )}
      </AnimatePresence>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={handleApiKeyCancel}
        onSubmit={handleApiKeySubmit}
        isLoading={stage === "loading"}
      />
    </div>
  );
}
