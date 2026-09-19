import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{
          scaleX,
          background: isDark
            ? "linear-gradient(90deg, #f59e0b, #f97316, #a78bfa)"
            : "linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee)",
          boxShadow: isDark
            ? "0 0 10px rgba(245,158,11,0.6), 0 0 20px rgba(245,158,11,0.3)"
            : "0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.3)",
        }}
      />
    </>
  );
};

export default ScrollProgress;
