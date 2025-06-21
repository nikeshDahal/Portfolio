import { motion, useMotionValue, animate } from "framer-motion";
import { useState } from "react";
import type { RefObject } from "react";
import {
  FiHome,
  FiUser,
  FiCode,
  FiMail,
  FiTool,
  FiBookOpen,
  FiBook,
  FiCpu,
  FiBookmark,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";

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
  const scaleValues = navItems.map(() => useMotionValue(1));
  const yValues = navItems.map(() => useMotionValue(0));

  const scrollTo = (ref: RefObject<HTMLDivElement>, index: number) => {
    setActiveItem(index);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    animate(scaleValues[index], [1.4, 1], { duration: 0.6, type: "spring" });
    animate(yValues[index], [-20, 0], { duration: 0.6 });
  };

  return (
    <motion.nav
      className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Premium Glassmorphism Dock */}
        <motion.div
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
          {/* Navigation Items */}
          <ul className="flex items-end space-x-4">
            {navItems.map((item, index) => (
              <motion.li
                key={item?.name}
                className="relative flex flex-col items-center cursor-pointer"
                onHoverStart={() => {
                  setHoveredIndex(index);
                  animate(scaleValues[index], 1.5, { duration: 0.25 });
                  animate(yValues[index], -15, { duration: 0.25 });
                }}
                onHoverEnd={() => {
                  setHoveredIndex(null);
                  animate(scaleValues[index], 1, { duration: 0.25 });
                  animate(yValues[index], 0, { duration: 0.25 });
                }}
                onClick={() =>
                  scrollTo(item?.ref as RefObject<HTMLDivElement>, index)
                }
                style={{
                  scale: scaleValues[index],
                  y: yValues[index],
                }}
                initial={false}
              >
                {/* Glassmorphic Icon Container */}
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    activeItem === index
                      ? "bg-white/30 shadow-md"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {activeItem === index ? item?.activeIcon : item?.icon}
                </motion.div>

                {/* Glass Tooltip */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-8 bg-gray-900/80 text-white text-xs px-3 py-1.5 rounded-lg"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {item?.name}
                  </motion.div>
                )}

                {/* Active Indicator */}
                {activeItem === index && (
                  <motion.div
                    className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Subtle Reflection */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-t from-white/20 to-transparent opacity-30 rounded-b-2xl -z-10"
          style={{ filter: "blur(6px)" }}
        />
      </div>
    </motion.nav>
  );
};
