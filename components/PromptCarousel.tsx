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
            className="flex flex-col justify-between items-start w-[280px] h-[229px] p-[21px] border border-[#00D37E] rounded-[6px] shrink-0"
          >
            <p className="text-white text-xl sm:text-2xl font-medium whitespace-normal">
              "{p.text}"
            </p>
            <span className="flex items-center justify-center px-[10px] py-[6px] bg-[#00A160] rounded-[4px] text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
              {p.ideas} BUSINESS IDEAS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
