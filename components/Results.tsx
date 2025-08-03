"use client";

interface ResultsProps {
  title: string;
  description: string;
  ideas: string[];
  onBack?: () => void;
  className?: string;
}

export default function Results({
  title,
  description,
  ideas,
  onBack,
  className = "",
}: ResultsProps) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-6 ${className}`}
    >
      <div className="max-w-3xl w-full flex flex-col gap-4">
        <h2 className="text-white text-4xl font-bold">{title}</h2>
        <p className="text-white/80 text-lg">{description}</p>
        <ul className="text-left list-disc pl-5 space-y-2">
          {ideas.map((idea, idx) => (
            <li key={idx} className="text-white text-lg">
              {idea}
            </li>
          ))}
        </ul>
        {onBack && (
          <button
            className="mt-6 self-center px-4 py-2 bg-white text-[#009358] font-semibold rounded hover:bg-white/90"
            onClick={onBack}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
