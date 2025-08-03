import Logo from "../components/Logo";
import PromptCarousel from "../components/PromptCarousel";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#009358" }}
    >
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
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-6xl">
          <SearchBar />

          <div className="text-left">
            <p className="text-white/70 text-md">
              "I like reading romance novels"
            </p>
          </div>
        </div>
      </main>

      {/* Carousel Section */}
      <section className="w-full py-16 px-8 mt-auto">
        <PromptCarousel />
      </section>
    </div>
  );
}
