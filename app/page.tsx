import Logo from "../components/Logo";
import PromptCarousel from "../components/PromptCarousel";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#009358" }}>
      {/* Header */}
      <header className="w-full px-8 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
            <input
              type="text"
              placeholder="What is an interest or hobby that you enjoy?"
              className="flex-1 px-8 py-6 text-xl text-white placeholder-white/80 bg-transparent border-2 border-white/30 rounded-[15px] focus:outline-none focus:border-white/60"
            />
            <button
              className="px-8 py-6 bg-white text-xl font-semibold rounded-[15px] hover:bg-white/90 transition-colors whitespace-nowrap flex items-center gap-2"
              style={{ color: "#009358" }}
            >
              <span className="text-2xl">💰</span>
              Show me the money
            </button>
          </div>

          <div className="text-center">
            <p className="text-white/70 text-lg">
              "I like reading romance novels"
            </p>
          </div>
        </div>
      </main>

      {/* Carousel Section */}
      <section className="w-full py-16 px-8">
        <PromptCarousel />
      </section>
    </div>
  );
}
