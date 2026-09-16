import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import AbhiAIRobot from "./ai/AbhiAIRobot";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navBg = isDark
    ? scrolled
      ? "bg-background/95 border-border shadow-2xl shadow-black/50"
      : "bg-background/60 border-border"
    : scrolled
      ? "bg-background/95 border-border shadow-lg shadow-amber-900/10"
      : "bg-background/70 border-border";

  return (
    <motion.nav
      initial={{ y: -80, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 ml-[80px] z-50 transition-all duration-500 w-[95%] md:w-auto backdrop-blur-xl rounded-full border ${navBg}`}
    >
      {/* ── Desktop: 3-zone layout ── Logo | Links (center) | Actions */}
      <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center py-2 px-6 gap-6">
        {/* Logo — left */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleNavClick("#"); }}
          className={`text-base font-serif tracking-widest transition-colors ${isDark ? "text-white" : "text-[#1a1209]"}`}
        >
          A<span className="text-amber-500">.</span>
        </a>

        {/* Nav links — truly centered in the middle column */}
        <div className="flex items-center justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
              className={`text-xs font-mono uppercase tracking-widest transition-colors duration-200 hover:text-amber-500 ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions — right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${isDark
              ? "border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/30 bg-white/[0.03]"
              : "border-amber-900/15 text-gray-600 hover:text-amber-600 hover:border-amber-500/40 bg-amber-50"
              }`}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <div className="flex flex-col items-center relative">
            <a
              href="/abhishek-hs.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center whitespace-nowrap text-xs px-4 py-1 rounded-full border font-mono hover:bg-amber-500/10 transition-all uppercase tracking-widest ${isDark
                ? "border-amber-500/30 text-amber-400/80 hover:text-amber-300"
                : "border-amber-600/40 text-amber-700 hover:text-amber-800"
                }`}
            >
              Resume ↗
            </a>
            <div className="absolute top-full mt-2">
              <AbhiAIRobot isDark={isDark} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: logo left, actions right ── */}
      <div className="flex md:hidden items-center justify-between py-2 px-5">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleNavClick("#"); }}
          className={`text-base font-serif tracking-widest transition-colors ${isDark ? "text-white" : "text-[#1a1209]"}`}
        >
          A<span className="text-amber-500">.</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${isDark ? "border-white/10 text-gray-400" : "border-amber-900/15 text-gray-600"
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors ${isDark ? "text-white/70" : "text-gray-700"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border rounded-b-2xl overflow-hidden backdrop-blur-xl bg-background/95"
          >
            <div className="flex flex-col gap-3 p-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                  className={`text-sm font-mono uppercase tracking-widest py-1 hover:text-amber-500 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/abhishek-hs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className={`text-sm px-4 py-2 mt-2 border font-mono text-center uppercase tracking-widest hover:bg-amber-500/10 transition-all ${isDark
                  ? "border-amber-500/30 text-amber-400"
                  : "border-amber-600/40 text-amber-700"
                  }`}
              >
                Resume
              </a>
              <div className="flex justify-center mt-2 pb-2">
                 <AbhiAIRobot isDark={isDark} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
