import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import {
  FiHome,
  FiUser,
  FiCode,
  FiMail,
  FiBook,
  FiCpu,
  FiBookmark,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { FaReact } from "react-icons/fa";

interface NavigationProps {
  sections: {
    home: RefObject<HTMLDivElement | null>;
    about: RefObject<HTMLDivElement | null>;
    projects?: RefObject<HTMLDivElement | null>;
    contact?: RefObject<HTMLDivElement | null>;
    academics?: RefObject<HTMLDivElement | null>;
    skills?: RefObject<HTMLDivElement | null>;
    blogs?: RefObject<HTMLDivElement | null>;
  };
}

export const Navigation = ({ sections }: NavigationProps) => {
  const [activeItem, setActiveItem] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MobileNavigation = () => (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(20, 24, 25, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <FiMenu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20 pb-32 px-6"
            style={{
              background: "rgba(15, 23, 42, 0.7)", // dark semi-transparent
              backdropFilter: "blur(16px)", // stronger blur for glass effect
              WebkitBackdropFilter: "blur(16px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item?.name}
                  className={`w-full max-w-xs py-4 px-6 rounded-xl flex items-center space-x-4 cursor-pointer transition-colors duration-200`}
                  style={
                    activeItem === index
                      ? {
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        }
                      : {
                          background: "transparent",
                        }
                  }
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    scrollTo(item?.ref as RefObject<HTMLDivElement>, index);
                    setIsMenuOpen(false);
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <div className="text-2xl">
                    {activeItem === index ? item?.activeIcon : item?.icon}
                  </div>
                  <span className="text-lg font-medium text-white">
                    {item?.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const DesktopNavigation = () => {
    return (
      <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative">
          {/* Static glass navbar */}
          <div
            className="flex items-end justify-center px-5 py-3 rounded-2xl"
            style={{
              background: "rgba(20, 24, 25, 0.35)",
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 1px rgba(255, 255, 255, 0.1)
              `,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
            }}
          >
            <ul className="flex items-end space-x-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item?.name}
                  className="relative flex flex-col items-center cursor-pointer"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() =>
                    scrollTo(item?.ref as RefObject<HTMLDivElement>, index)
                  }
                  whileHover={{
                    y: -15,
                    scale: 1.5,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 5,
                      mass: 0.5,
                    },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.15 },
                  }}
                  initial={false}
                >
                  {/* Icon with smooth glass effect */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeItem === index
                        ? "bg-white/30 shadow-md"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    style={{
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "background 0.2s ease-out",
                    }}
                  >
                    {activeItem === index ? item?.activeIcon : item?.icon}
                  </div>

                  {/* Springy tooltip */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute -top-8 bg-gray-900/80 text-white text-xs px-3 py-1.5 rounded-lg"
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                          mass: 0.3,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        transition: { duration: 0.1 },
                      }}
                      style={{
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {item?.name}
                    </motion.div>
                  )}

                  {/* Bouncy active indicator */}
                  {activeItem === index && (
                    <motion.div
                      className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 600,
                          damping: 15,
                          mass: 0.5,
                        },
                      }}
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Static reflection */}
          <div
            className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-t from-white/20 to-transparent opacity-30 rounded-b-2xl -z-10"
            style={{ filter: "blur(6px)" }}
          />
        </div>
      </nav>
    );
  };
  const navItems = [
    {
      name: "Home",
      href: "#home",
      ref: sections.home,
      icon: <FiHome className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiHome className="w-5 h-5 text-cyan-400" />,
    },
    {
      name: "About",
      href: "#about",
      ref: sections.about,
      icon: <FiUser className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiUser className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "Academics",
      href: "#academics",
      ref: sections.academics, // You'll need to add this to your sections prop
      icon: <FiBook className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiBook className="w-5 h-5 text-green-400" />,
    },
    {
      name: "Skills & Technologies",
      href: "#skills",
      ref: sections.skills, // You'll need to add this to your sections prop
      icon: <FiCpu className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiCpu className="w-5 h-5 text-yellow-400" />,
    },
    {
      name: "Blogs",
      href: "#blogs",
      ref: sections.blogs, // You'll need to add this to your sections prop
      icon: <FiBookmark className="w-5 h-5 text-gray-400" />,
    },
    {
      name: "Projects",
      href: "#projects",
      ref: sections.projects,
      icon: <FiCode className="w-5 h-5 text-gray-400" />,
      activeIcon: <FaReact className="w-5 h-5 text-purple-400" />,
    },
    {
      name: "Contact",
      href: "#contact",
      ref: sections.contact,
      icon: <FiMail className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiMail className="w-5 h-5 text-amber-400" />,
    },
    sections.home && {
      name: "Home",
      href: "#home",
      ref: sections.home,
      icon: <FiHome className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiHome className="w-5 h-5 text-cyan-400" />,
    },
    sections.about && {
      name: "About",
      href: "#about",
      ref: sections.about,
      icon: <FiUser className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiUser className="w-5 h-5 text-blue-400" />,
    },
    sections.academics && {
      name: "Academics",
      href: "#academics",
      ref: sections.academics,
      icon: <FiBook className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiBook className="w-5 h-5 text-green-400" />,
    },
    sections.skills && {
      name: "Skills & Technologies",
      href: "#skills",
      ref: sections.skills,
      icon: <FiCpu className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiCpu className="w-5 h-5 text-yellow-400" />,
    },
    sections.blogs && {
      name: "Blogs",
      href: "#blogs",
      ref: sections.blogs,
      icon: <FiBookmark className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiBookmark className="w-5 h-5 text-red-400" />,
    },
    sections.projects && {
      name: "Projects",
      href: "#projects",
      ref: sections.projects,
      icon: <FiCode className="w-5 h-5 text-gray-400" />,
      activeIcon: <FaReact className="w-5 h-5 text-purple-400" />,
    },
    sections.contact && {
      name: "Contact",
      href: "#contact",
      ref: sections.contact,
      icon: <FiMail className="w-5 h-5 text-gray-400" />,
      activeIcon: <FiMail className="w-5 h-5 text-amber-400" />,
    },
  ].filter(Boolean);

  const scrollTo = (ref: RefObject<HTMLDivElement>, index: number) => {
    setActiveItem(index);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return isMobile ? <MobileNavigation /> : <DesktopNavigation />;
};
