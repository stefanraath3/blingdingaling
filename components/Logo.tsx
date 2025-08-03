export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-white rounded-lg p-2">
        <div className="w-6 h-6 bg-[#009358] rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">S</span>
        </div>
      </div>
      <span className="text-white font-semibold text-xl">BLINGDINGALING</span>
      <span className="text-white/70 text-sm hidden sm:block">
        MONETIZE YOUR DINGALING
      </span>
    </div>
  );
}
