import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

// Replace these with your EmailJS credentials
// Get them from: https://www.emailjs.com/
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
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Have a question or want to work together? Drop me a message.">
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
          </p>
          {[
            { icon: Mail, label: "abhishekhs0217@gmail.com" },
            { icon: MapPin, label: "near ssit college kunigal road , Tumakuru" },
            { icon: Phone, label: "+91-9019867263" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-primary">
                <Icon size={16} />
              </div>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {[
            { name: "name" as const, placeholder: "Your name", type: "text" },
            { name: "email" as const, placeholder: "Your email", type: "email" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            />
          ))}
          <textarea
            rows={5}
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
          />
          <button
  type="submit"
  disabled={sending}
  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-primary flex items-center justify-center gap-2 disabled:opacity-50"
>
  {sending ? "Sending..." : <>Send Message <Send size={16} /></>}
</button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
