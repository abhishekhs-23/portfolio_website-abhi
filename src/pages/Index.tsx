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
        style={{ opacity: isDark ? 1 : 0.08 }}
      >
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Light mode subtle texture overlay */}
      {!isDark && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(212,165,116,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(180,120,60,0.04) 0%, transparent 50%)",
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
