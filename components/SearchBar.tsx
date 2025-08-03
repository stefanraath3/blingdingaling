"use client";
import React, { useState } from "react";
import CTAButton from "./CTAButton";

interface SearchBarProps {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  onSubmit?: (value: string) => void;
}

/**
 * Central search bar seen on the landing page – extracted for reuse.
 * Purely presentational for now (uncontrolled input).
 */
export default function SearchBar({
  placeholder = "What is an interest or hobby that you enjoy?",
  buttonLabel = "Show me the money",
  className = "",
  onSubmit,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  return (
    <div
      className={`flex w-full h-[132px] p-[15px] bg-[#00A160] rounded-[15px] gap-2 items-center justify-center mb-3 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
        {/* Input + floating label */}
        <div className="relative flex-1">
          <input
            id="floating-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="peer w-full px-[21px] py-[33px] text-[26px] leading-[20px] font-semibold text-white bg-[#00A160] border border-[#00D37E] rounded-[6px] focus:outline-none focus:border-white/60 placeholder-transparent"
            placeholder=" "
            // placeholder kept blank; label will show instead
          />
          <label
            htmlFor="floating-input"
            className={`pointer-events-none absolute left-[21px] transition-all duration-200 ease-out origin-left text-white ${
              isActive
                ? "top-[10px] scale-75 text-white/80"
                : "top-1/2 -translate-y-1/2 text-[26px]"
            }`}
          >
            {placeholder}
          </label>
        </div>
        <CTAButton label={buttonLabel} onClick={() => onSubmit?.(value)} />
      </div>
    </div>
  );
}
