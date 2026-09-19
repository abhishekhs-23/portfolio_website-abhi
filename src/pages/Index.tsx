import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/canvas/Scene";
import { Suspense } from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

const PortfolioContent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden theme-transition bg-background ${isDark ? "dark" : "light"}`}
    >
      {/* 3D WebGL Background — only visible in dark mode, faded in light */}
      <div
        className="fixed inset-0 z-0 pointer-events-none three-canvas transition-opacity duration-700"
        aria-hidden="true"
        style={{ opacity: isDark ? 1 : 0.20 }}
      >
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Light mode: multi-layered premium gradient mesh */}
      {!isDark && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse at 15% 10%, rgba(99,102,241,0.12) 0%, transparent 45%)",
              "radial-gradient(ellipse at 85% 20%, rgba(139,92,246,0.10) 0%, transparent 40%)",
              "radial-gradient(ellipse at 50% 80%, rgba(34,211,238,0.08) 0%, transparent 45%)",
              "radial-gradient(ellipse at 80% 85%, rgba(99,102,241,0.07) 0%, transparent 40%)",
              "radial-gradient(ellipse at 10% 60%, rgba(168,85,247,0.06) 0%, transparent 40%)",
            ].join(", "),
          }}
        />
      )}

      {/* Light mode: subtle dot grid pattern for depth */}
      {!isDark && (
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.25) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      )}

      {/* All HTML content sits above the canvas */}
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

const Index = () => (
  <ThemeProvider>
    <PortfolioContent />
  </ThemeProvider>
);

export default Index;
