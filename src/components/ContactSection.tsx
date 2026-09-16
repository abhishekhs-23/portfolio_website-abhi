import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Send, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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
          <div className="flex-1 space-y-5">
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              I believe in building openly. My repositories reflect a journey of continuous learning,
              architectural experiments, and real-world AI implementations.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://github.com/abhishekhs-23"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-amber-500 transition-colors border-b border-amber-500/30 pb-1"
              >
                <Github size={14} /> GitHub Profile →
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-h-s-6589ab304/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-amber-500 transition-colors border-b border-amber-500/30 pb-1"
              >
                <Linkedin size={14} /> LinkedIn →
              </a>
            </div>
          </div>

          {/* GitHub stats card */}
          <div className="flex-1 w-full">
            <div className="border border-foreground/10 bg-foreground/[0.02] overflow-hidden shadow-xl">
              <div className="h-8 bg-foreground/[0.04] border-b border-foreground/8 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-3 text-[10px] font-mono text-muted-foreground">github.com/abhishekhs-23</span>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-muted-foreground" />
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
                  ].map(({ num, label }) => (
                    <div key={label}>
                      <p className="text-lg font-serif text-foreground">{num}</p>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1 flex-wrap">
                  {["Python", "React", "ML", "RAG", "OpenCV"].map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 border border-foreground/10 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" title="Contact" subtitle="Let's build something real.">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Whether it's a new opportunity, an AI idea, or just a conversation about technology —
                my inbox is always open.
              </p>
              <div className="space-y-5 pt-6 border-t border-foreground/10">
                {[
                  { icon: Mail, label: "abhishekhs0217@gmail.com", href: "mailto:abhishekhs0217@gmail.com" },
                  { icon: MapPin, label: "Tumakuru, Karnataka, India" },
                  { icon: Phone, label: "+91-9019867263" },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-5 group">
                    <Icon size={16} className="text-muted-foreground group-hover:text-amber-500 transition-colors shrink-0" />
                    {href ? (
                      <a href={href} className="text-sm font-mono tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                        {label}
                      </a>
                    ) : (
                      <span className="text-sm font-mono tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                        {label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-foreground/[0.02] p-8 border border-foreground/8"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
              {[
                { name: "name" as const, placeholder: "NAME", type: "text" },
                { name: "email" as const, placeholder: "EMAIL", type: "email" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent border-b border-foreground/12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/50 transition-all text-sm font-mono tracking-widest"
                  aria-label={field.placeholder}
                />
              ))}
              <textarea
                rows={4}
                placeholder="MESSAGE"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-0 py-3 bg-transparent border-b border-foreground/12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/50 transition-all text-sm font-mono tracking-widest resize-none"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 bg-foreground/[0.03] border border-foreground/10 text-foreground/80 hover:bg-amber-500/12 hover:border-amber-500/35 hover:text-foreground transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs font-mono"
              >
                {sending ? "SENDING..." : <><span>SEND MESSAGE</span> <Send size={13} /></>}
              </button>
            </motion.form>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ContactSection;
