import React from "react";

interface SearchBarProps {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

/**
 * Central search bar seen on the landing page – extracted for reuse.
 * Purely presentational for now (uncontrolled input).
 */
export default function SearchBar({
  placeholder = "What is an interest or hobby that you enjoy?",
  buttonLabel = "Show me the money",
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`flex h-[132px] p-[15px] bg-[#00A160] rounded-[15px] gap-2 items-center justify-center mb-3 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 px-[21px] py-[33px] text-[26px] leading-[20px] font-semibold text-white placeholder-white/80 bg-[#00A160] border border-[#00D37E] rounded-[6px] focus:outline-none focus:border-white/60"
        />
        <button
          className="w-[286px] px-[21px] py-[33px] bg-white text-sm sm:text-base font-semibold rounded-[6px] hover:bg-white/90 transition-colors whitespace-nowrap flex items-center gap-2 shrink-0 justify-center"
          style={{ color: "#009358" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.333-1-4 0-4 2s2 2 4 2 4 0 4 2-2.667 3-4 2m0-10v2m0 12v-2"
            />
          </svg>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
