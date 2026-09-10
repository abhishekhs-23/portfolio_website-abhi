import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-foreground/8 py-10 px-6">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-5">
      <div>
        <p className="text-xs font-mono text-muted-foreground tracking-widest">
          © 2026 Abhishek H S. Built with curiosity.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {[
          { icon: Github, href: "https://github.com/abhiahek143", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-h-s-6589ab304/", label: "LinkedIn" },
          { icon: Mail, href: "mailto:abhishekhs0217@gmail.com", label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 border border-foreground/8 bg-foreground/[0.02] flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:border-amber-500/30 transition-all"
            aria-label={label}
          >
            <Icon size={14} />
          </a>
        ))}
        <a
          href="/abhishek-hs.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 border border-foreground/8 bg-foreground/[0.02] text-xs text-muted-foreground hover:text-amber-500 hover:border-amber-500/30 transition-all font-mono"
        >
          <FileDown size={12} /> Resume
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
