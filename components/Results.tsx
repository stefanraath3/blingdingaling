"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import GuideSkeleton from "./GuideSkeleton";

interface Idea {
  title: string;
  description: string;
}

interface GuideData {
  earningsPotential: string;
  competitiveScore: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    description: string;
  }>;
}

interface ResultsProps {
  prompt: string;
  ideas: Idea[];
  className?: string;
  apiKey?: string;
}

export default function Results({
  prompt,
  ideas,
  className = "",
  apiKey,
}: ResultsProps) {
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const idea = ideas[index];

  const paginate = (direction: number) =>
    setPage(([i]) => [
      (i + direction + ideas.length) % ideas.length,
      direction,
    ]);

  const prev = () => {
    paginate(-1);
    setGuideData(null); // Reset guide when changing ideas
    setShowAllSteps(false);
  };
  const next = () => {
    paginate(1);
    setGuideData(null); // Reset guide when changing ideas
    setShowAllSteps(false);
  };

  const handleGenerateGuide = async () => {
    if (isLoadingGuide || !apiKey) return;

    setIsLoadingGuide(true);
    try {
      const response = await fetch("/api/guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OpenAI-Key": apiKey,
        },
        body: JSON.stringify({
          idea: idea.title,
          description: idea.description,
          originalPrompt: prompt,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate guide");

      const data = await response.json();
      setGuideData(data);
    } catch (error) {
      console.error("Error generating guide:", error);
      // TODO: Add error handling UI
    } finally {
      setIsLoadingGuide(false);
    }
  };

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 400 : -400,
      y: 0,
      opacity: 0,
      rotate: d > 0 ? 8 : -8,
      scale: 0.9,
    }),
    center: { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -400 : 400,
      y: 0,
      opacity: 0,
      rotate: d > 0 ? -8 : 8,
      scale: 0.9,
    }),
  };

  return (
    <div
      className={`flex flex-col items-center text-center gap-8 pb-8 ${className}`}
    >
      {/* Prompt */}
      <h2 className="text-white text-2xl sm:text-3xl font-bold">
        &ldquo;{prompt}&rdquo;
      </h2>

      {/* Navigation */}
      <div className="flex w-full max-w-[1060px] justify-between mb-4">
        <button
          onClick={prev}
          className="flex h-[54px] px-[18px] py-[10px] justify-center items-center gap-[8px] rounded-[6px] bg-[#00D37E] text-[#006E42] font-semibold text-[22px] leading-[30px] hover:bg-[#00c87a]"
        >
          <ChevronLeft size={24} />
          PREV IDEA
        </button>
        <button
          onClick={next}
          className="flex h-[54px] px-[18px] py-[10px] justify-center items-center gap-[8px] rounded-[6px] bg-[#00D37E] text-[#006E42] font-semibold text-[22px] leading-[30px] hover:bg-[#00c87a]"
        >
          NEXT IDEA
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Idea Card */}
      <AnimatePresence custom={dir} mode="wait" initial={false}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 800,
            damping: 35,
            mass: 0.8,
          }}
          className="w-full max-w-[1060.183px] flex flex-col items-start gap-[64px] rounded-[6px] border border-[#00D37E]"
          style={{ padding: "71px 78px 99px 61.817px" }}
        >
          <div className="flex flex-col items-start gap-[17px] w-full">
            <span className="flex h-[28px] px-2 justify-center items-center gap-[10px] rounded-[4px] border border-[#00D37E] text-[#00FF98] font-bold text-[18px] leading-[26px]">
              IDEA {index + 1} OF {ideas.length}
            </span>
            <h3 className="text-white text-4xl sm:text-5xl font-bold">
              {idea.title}
            </h3>
            <p className="text-white text-[22px] leading-[33px] font-normal w-full text-left">
              {idea.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-[32px] w-full">
            <button
              onClick={handleGenerateGuide}
              disabled={isLoadingGuide}
              className="flex w-[382px] py-[33px] justify-center items-center gap-[10px] rounded-[4px] bg-white text-[#009358] font-bold text-lg hover:bg-white/90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Sparkles size={24} color="#009358" />
              {isLoadingGuide ? "GENERATING..." : "GENERATE GUIDE"}
            </button>
            <p className="text-white/70 text-sm text-center max-w-[382px]">
              This will provide you with every bling-worthy step required to
              pull this off.
            </p>
          </div>

          {/* Guide Section */}
          {isLoadingGuide && <GuideSkeleton />}

          {guideData && !isLoadingGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-8 w-full mt-8"
            >
              {/* Earnings and Competitive Score Row */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-white/70 text-sm uppercase tracking-wide">
                    EARNINGS POTENTIAL
                  </span>
                  <span className="text-white text-2xl font-bold">
                    {guideData.earningsPotential}
                  </span>
                  <span className="text-white/70 text-sm">PER MONTH</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white/70 text-sm uppercase tracking-wide">
                    COMPETITIVE SCORE
                  </span>
                  <span className="text-white text-2xl font-bold">
                    {guideData.competitiveScore}
                  </span>
                </div>
              </div>

              {/* Steps Section */}
              <div className="flex flex-col gap-4 w-full">
                {guideData.steps
                  .slice(0, showAllSteps ? guideData.steps.length : 3)
                  .map((step, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 p-4 border border-[#00D37E]/30 rounded-[4px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center px-2 py-1 bg-[#00D37E] text-[#006E42] text-xs font-bold rounded">
                          STEP {step.stepNumber}
                        </span>
                        <h4 className="text-white text-lg font-semibold">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-white/80 text-sm">
                        {step.description}
                      </p>
                    </div>
                  ))}

                {!showAllSteps && guideData.steps.length > 3 && (
                  <button
                    onClick={() => setShowAllSteps(true)}
                    className="flex items-center justify-center gap-2 py-3 text-[#00D37E] hover:text-[#00c87a] cursor-pointer"
                  >
                    <span>Show all {guideData.steps.length} steps</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
