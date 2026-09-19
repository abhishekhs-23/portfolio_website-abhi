import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Terminal typing animation for GitHub card
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {!done && <span className="typing-cursor" />}
    </span>
  );
};

// Glowing input field
const GlowInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  textarea = false,
  rows = 4,
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);

  const baseClass = `w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm font-mono tracking-widest transition-all duration-300 border-b`;

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClass} resize-none ${focused ? "border-amber-500/60" : "border-foreground/12"}`}
          aria-label={placeholder}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClass} ${focused ? "border-amber-500/60" : "border-foreground/12"}`}
          aria-label={placeholder}
        />
      )}

      {/* Animated glow underline */}
      <motion.div
        animate={{
          scaleX: focused ? 1 : 0,
          opacity: focused ? 1 : 0,
        }}
        style={{
          originX: 0,
          background: "linear-gradient(90deg, #f59e0b, #f97316, #a78bfa)",
          boxShadow: focused ? "0 0 8px rgba(245,158,11,0.5)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px"
      />

      {/* Floating label */}
      <motion.span
        animate={{
          y: focused || value ? -24 : 0,
          scale: focused || value ? 0.8 : 0,
          opacity: focused || value ? 1 : 0,
          color: focused ? "#f59e0b" : "hsl(var(--muted-foreground))",
        }}
        className="absolute left-4 top-3 text-[10px] font-mono uppercase tracking-widest pointer-events-none origin-left"
      >
        {placeholder}
      </motion.span>
    </div>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Abhishek",
          to_email: "abhishekhs0217@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-24">

      {/* GitHub Section */}
      <SectionWrapper id="github" title="Open Source" subtitle="Engineering in public.">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-5"
          >
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              I believe in building openly. My repositories reflect a journey of continuous learning,
              architectural experiments, and real-world AI implementations.
            </p>
            <div className="flex gap-4 flex-wrap">
              {[
                { href: "https://github.com/abhishekhs-23", icon: Github, label: "GitHub Profile →", color: "#f59e0b" },
                { href: "https://www.linkedin.com/in/abhishek-h-s-9173a541b/", icon: Linkedin, label: "LinkedIn →", color: "#6366f1" },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 3, scale: 1.02 }}
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors border-b pb-1"
                  style={{ borderColor: `${color}40` }}
                  onMouseEnter={e => (e.currentTarget.style.color = color)}
                  onMouseLeave={e => (e.currentTarget.style.color = "")}
                >
                  <Icon size={14} /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* GitHub terminal card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="border border-foreground/10 bg-foreground/[0.02] overflow-hidden shadow-2xl shadow-amber-500/5 glass-aurora">
              {/* Terminal header */}
              <div className="h-9 bg-foreground/[0.05] border-b border-foreground/8 flex items-center px-4 gap-2">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-red-500/60"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[10px] font-mono text-muted-foreground">
                  <TypingText text="github.com/abhishekhs-23" delay={500} />
                </span>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Github size={22} className="text-muted-foreground" />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ boxShadow: ["0 0 0px #f59e0b00", "0 0 10px #f59e0b40", "0 0 0px #f59e0b00"] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">abhishekhs-23</p>
                    <p className="text-xs text-muted-foreground">Abhishek H S · AI/ML Engineer</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-foreground/8">
                  {[
                    { num: "10+", label: "Repos" },
                    { num: "AI/ML", label: "Focus" },
                    { num: "Active", label: "Status" },
                  ].map(({ num, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-lg font-serif text-foreground">{num}</p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1 flex-wrap">
                  {["Python", "React", "ML", "RAG", "OpenCV"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.1, y: -1 }}
                      className="text-[10px] font-mono px-2 py-0.5 border border-foreground/10 text-muted-foreground cursor-default hover:border-amber-500/30 hover:text-amber-500 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" title="Contact" subtitle="Let's build something real.">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">

            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Whether it's a new opportunity, an AI idea, or just a conversation about technology —
                my inbox is always open.
              </p>

              <div className="space-y-6 pt-6 border-t border-foreground/10">
                {[
                  { icon: Mail, label: "abhishekhs0217@gmail.com", href: "mailto:abhishekhs0217@gmail.com", color: "#f59e0b" },
                  { icon: MapPin, label: "Tumakuru, Karnataka, India", color: "#22d3ee" },
                  { icon: Phone, label: "+91-9019867263", color: "#10b981" },
                ].map(({ icon: Icon, label, href, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 group"
                  >
                    <div className="relative">
                      <Icon size={16} className="text-muted-foreground group-hover:scale-110 transition-transform" style={{ color: "hsl(var(--muted-foreground))" }} />
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ boxShadow: `0 0 12px ${color}` }}
                      />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-mono tracking-wide text-muted-foreground group-hover:text-foreground transition-colors"
                        onMouseEnter={e => (e.currentTarget.style.color = color)}
                        onMouseLeave={e => (e.currentTarget.style.color = "")}
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-sm font-mono tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Glassmorphic Aurora Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <form
                onSubmit={handleSubmit}
                className="relative space-y-6 glass-aurora p-8 border border-foreground/8 overflow-hidden"
              >
                {/* Top shimmer line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(99,102,241,0.4), rgba(34,211,238,0.4), transparent)" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <GlowInput
                  placeholder="NAME"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <GlowInput
                  type="email"
                  placeholder="EMAIL"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <GlowInput
                  placeholder="MESSAGE"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  textarea
                  rows={4}
                />

                {/* Submit button with 3D press + ripple */}
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98, y: 1 }}
                  className="relative w-full py-3.5 border border-foreground/10 bg-foreground/[0.03] text-foreground/80 hover:border-amber-500/40 hover:text-foreground transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs font-mono overflow-hidden group"
                >
                  {/* Button hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(99,102,241,0.04))" }} />

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <CheckCircle size={14} /> Message Sent!
                      </motion.span>
                    ) : sending ? (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-3 h-3 border border-amber-500/60 border-t-amber-500 rounded-full"
                        />
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        Send Message <Send size={13} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ContactSection;
