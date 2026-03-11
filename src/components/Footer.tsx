import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <span className="text-gradient font-mono font-bold text-lg">{"< ❤️/>"}</span>
        <p className="text-xs text-muted-foreground mt-1">© 2026 Abhishek H S. All rights reserved.</p>
      </div>

      <div className="flex items-center gap-4">
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
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label={label}
          >
            <Icon size={16} />
          </a>
        ))}
        <a
  href="/abhishek-hs.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-muted-foreground hover:text-primary transition-colors"
>
  <FileDown size={14} /> Resume
</a>
      </div>
    </div>
  </footer>
);

export default Footer;
