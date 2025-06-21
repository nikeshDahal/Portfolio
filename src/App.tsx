import { useRef, useState, useEffect } from "react";
import { HeroSection } from "./components/HomePage";
import InteractiveLoader from "./components/loader";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import AboutSection from "./components/About";
import { NoPage } from "./components/test";
// import ProjectsSection from "./components/Projects";
// import ContactSection from "./components/Contact";

function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  // const projectsRef = useRef<HTMLDivElement>(null);
  // const contactRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <InteractiveLoader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full gradient-background">
      <main className="relative h-full">
        <div ref={homeRef} id="home">
          <HeroSection scrollToAbout={scrollToAbout} />
        </div>
        <Navigation
          sections={{
            home: homeRef,
            about: aboutRef,
            // projects: projectsRef, // Uncomment when ready
            // contact: contactRef,  // Uncomment when ready
          }}
        />
        <div ref={aboutRef} id="about">
          <AboutSection />
        </div>
        {/* <div ref={projectsRef} id="projects">
          <ProjectsSection />
        </div>
        <div ref={contactRef} id="contact">
          <ContactSection />
        </div> */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
