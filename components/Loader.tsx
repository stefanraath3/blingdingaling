"use client";

export default function Loader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-2 ${className}`}
    >
      <h2 className="text-white text-5xl font-bold">Thinking</h2>
      <p className="text-white/80 text-lg">Gathering ideas…</p>
    </div>
  );
}
