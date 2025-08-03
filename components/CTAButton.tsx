import React from "react";
import DollarIcon from "./DollarIcon";

interface CTAButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({
  label = "Show me the money",
  className = "",
  onClick,
}: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex w-[286px] px-[21px] py-[33px] bg-white rounded-[6px] items-center justify-center gap-2 shrink-0 hover:bg-white/90 transition-colors ${className}`}
      style={{ color: "#009358" }}
    >
      <DollarIcon size={24} />
      <span className="text-[18px] leading-[26px] font-bold text-[#009358] whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
