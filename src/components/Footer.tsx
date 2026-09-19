import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-foreground/8 py-10 px-6 overflow-hidden">
    {/* Shimmer top border */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-px"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.4) 25%, rgba(99,102,241,0.3) 50%, rgba(34,211,238,0.3) 75%, transparent 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />

    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-mono text-muted-foreground tracking-widest">
          © 2026{" "}
          <span className="text-foreground/70">Abhishek H S.</span>{" "}
          <span className="text-amber-500/60">Built with curiosity.</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3"
      >
        {[
          { icon: Github, href: "https://github.com/abhishekhs-23", label: "GitHub", color: "#f59e0b" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-h-s-9173a541b/", label: "LinkedIn", color: "#6366f1" },
          { icon: Mail, href: "mailto:abhishekhs0217@gmail.com", label: "Email", color: "#22d3ee" },
        ].map(({ icon: Icon, href, label, color }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.15, y: -2, rotateY: 15 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-9 h-9 border border-foreground/8 bg-foreground/[0.02] flex items-center justify-center text-muted-foreground transition-colors duration-300 group overflow-hidden"
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = color;
              (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${color}30`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "";
              (e.currentTarget as HTMLElement).style.borderColor = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            {/* Radial glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle, ${color}15, transparent)` }}
            />
            <Icon size={14} className="relative z-10" />
          </motion.a>
        ))}

        <motion.a
          href="/abhishek-hs.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-3 py-1.5 border border-foreground/8 bg-foreground/[0.02] text-xs text-muted-foreground hover:text-amber-500 hover:border-amber-500/30 transition-all font-mono relative overflow-hidden group"
        >
          {/* Shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)" }} />
          <FileDown size={12} className="relative z-10" />
          <span className="relative z-10">Resume</span>
        </motion.a>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
