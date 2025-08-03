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
    <div className={`p-4 sm:p-5 bg-[#00A160] rounded-[10px] mb-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 px-6 py-7 sm:py-8 text-lg sm:text-xl text-white placeholder-white/80 bg-transparent border-2 border-white/30 rounded-md focus:outline-none focus:border-white/60"
        />
        <button
          className="px-10 py-7 sm:py-8 bg-white text-sm sm:text-base font-semibold rounded-md hover:bg-white/90 transition-colors whitespace-nowrap flex items-center gap-2"
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
