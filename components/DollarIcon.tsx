import React from "react";
import { DollarSign } from "lucide-react";

interface DollarIconProps {
  size?: number; // diameter in px
  bgColor?: string;
  color?: string;
  className?: string;
}

export default function DollarIcon({
  size = 24,
  bgColor = "#009358",
  color = "#FFFFFF",
  className = "",
}: DollarIconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      <DollarSign color={color} strokeWidth={2} size={size * 0.6} />
    </div>
  );
}
