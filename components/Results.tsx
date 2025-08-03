"use client";

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
  return (
    <div
      className={`flex flex-col items-center text-center gap-6 ${className}`}
    >
      <div className="max-w-3xl w-full flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold">"{prompt}"</h2>
        <ul className="text-left space-y-6">
          {ideas.map((idea, idx) => (
            <li key={idx} className="text-white">
              <h3 className="text-xl font-semibold">{idea.title}</h3>
              <p className="text-white/80 text-lg">{idea.description}</p>
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
