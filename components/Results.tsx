"use client";

import { useState } from "react";

interface Idea {
  title: string;
  description: string;
}

interface ResultsProps {
  prompt: string;
  ideas: Idea[];
  onBack?: () => void;
  className?: string;
}

export default function Results({
  prompt,
  ideas,
  onBack,
  className = "",
}: ResultsProps) {
  const [index, setIndex] = useState(0);
  const idea = ideas[index];

  const prev = () => setIndex((index - 1 + ideas.length) % ideas.length);
  const next = () => setIndex((index + 1) % ideas.length);

  return (
    <div
      className={`flex flex-col items-center text-center gap-8 ${className}`}
    >
      {/* Prompt */}
      <h2 className="text-white text-2xl sm:text-3xl font-bold">"{prompt}"</h2>

      {/* Navigation */}
      <div className="flex w-full max-w-[1060px] justify-between mb-4">
        <button
          onClick={prev}
          className="flex w-[178px] h-[54px] px-[9px] py-[10px] justify-center items-center gap-[2px] rounded-[6px] bg-[#00D37E] text-[#006E42] font-semibold text-[22px] leading-[30px] hover:bg-[#00c87a]"
        >
          ‹ PREV IDEA
        </button>
        <button
          onClick={next}
          className="flex w-[178px] h-[54px] px-[9px] py-[10px] justify-center items-center gap-[2px] rounded-[6px] bg-[#00D37E] text-[#006E42] font-semibold text-[22px] leading-[30px] hover:bg-[#00c87a]"
        >
          NEXT IDEA ›
        </button>
      </div>

      {/* Idea Card */}
      <div
        className="w-full max-w-[1060.183px] flex flex-col items-start gap-[48px] rounded-[6px] border border-[#00D37E]"
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

        <div className="flex flex-col items-center gap-[17px] w-full">
          <button className="flex w-[382px] py-[33px] justify-center items-center gap-[10px] rounded-[4px] bg-white text-[#009358] font-bold text-lg hover:bg-white/90">
            ✨ GENERATE GUIDE
          </button>
          <p className="text-white/70 text-sm text-center max-w-xl">
            This will provide you with every bling-worthy step required to pull
            this off.
          </p>
        </div>
      </div>

      {/* Back button */}
      {onBack && (
        <button
          className="mt-8 self-center px-4 py-2 bg-white text-[#009358] font-semibold rounded hover:bg-white/90"
          onClick={onBack}
        >
          Back
        </button>
      )}
    </div>
  );
}
