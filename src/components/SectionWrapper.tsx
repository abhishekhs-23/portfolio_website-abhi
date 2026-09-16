import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, title, subtitle, children, className = "" }: Props) => (
  <section id={id} className={`py-16 md:py-24 px-5 md:px-6 ${className}`}>
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-3">
          {title}
        </p>
        {subtitle && (
          <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
            {subtitle}
          </h2>
        )}
        <div className="mt-5 w-10 h-px bg-foreground/15" />
      </motion.div>
      {children}
    </div>
  </section>
);

export default SectionWrapper;
