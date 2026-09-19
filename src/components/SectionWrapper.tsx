import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, delay: i * 0.04, ease: "easeOut" },
  }),
};

const SectionWrapper = ({ id, title, subtitle, children, className = "" }: Props) => (
  <section id={id} className={`py-16 md:py-28 px-5 md:px-6 ${className}`}>
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        {/* Animated mono label with scan-line */}
        <div className="relative inline-block mb-4 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono text-amber-500 uppercase tracking-[0.35em]"
          >
            {title}
          </motion.p>
          {/* Scan-line sweep */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-amber-500/80 via-amber-300/60 to-transparent"
          />
        </div>

        {/* Staggered subtitle characters */}
        {subtitle && (
          <div className="overflow-hidden" style={{ perspective: "800px" }}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight"
            >
              {subtitle.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        )}

        {/* Animated decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="mt-6 h-px w-16 bg-gradient-to-r from-amber-500/80 to-transparent"
        />
      </motion.div>
      {children}
    </div>
  </section>
);

export default SectionWrapper;
