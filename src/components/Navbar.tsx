import { useState, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Terminal", href: "#terminal-section" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/5 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo / Title */}
          <a
            href="#"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-transform duration-300 group-hover:scale-105"></div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              kishor.dev
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors cursor-pointer py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Resume Button */}
          <div className="hidden md:block px-5 py-2 rounded-full border border-purple-500/50 text-purple-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-purple-500/5 hover:bg-purple-500/10 hover:text-white transition-all cursor-pointer">
            Resume
          </div>

          {/* Mobile Menu Button - 44px touch target */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-purple-500/10 bg-zinc-950/40 text-purple-300 hover:text-white hover:border-purple-500/30 active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-30 bg-[#020205]/95 backdrop-blur-2xl border-b border-white/5 md:hidden flex flex-col p-8 space-y-6"
          >
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="font-display text-xl font-medium text-zinc-300 hover:text-white hover:pl-2 transition-all duration-200 border-l-2 border-transparent hover:border-purple-400"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
