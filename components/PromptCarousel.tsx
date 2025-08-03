interface Prompt {
  text: string;
  ideas: number;
}

const prompts: Prompt[] = [
  { text: "I like to find broken things and fix them.", ideas: 11 },
  { text: "I enjoy baking sourdough bread on weekends.", ideas: 8 },
  { text: "I love organizing other people's spaces.", ideas: 15 },
  { text: "I take photos of my dog every day.", ideas: 12 },
  { text: "I collect vintage vinyl records.", ideas: 9 },
  { text: "I enjoy teaching my kids math tricks.", ideas: 14 },
];

export default function PromptCarousel() {
  const duplicated = [...prompts, ...prompts]; // duplicate for seamless scroll
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-6 animate-scroll whitespace-nowrap">
        {duplicated.map((p, idx) => (
          <div
            key={idx}
            className="min-w-[20rem] sm:min-w-[24rem] p-6 border-2 border-white/30 rounded-lg shrink-0"
          >
            <p className="text-white text-lg mb-4 whitespace-normal">
              "{p.text}"
            </p>
            <p className="text-white/70 text-sm font-semibold">
              {p.ideas} BUSINESS IDEAS
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
