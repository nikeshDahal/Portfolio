import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export const HeroSection = ({
  scrollToAbout,
}: {
  scrollToAbout: () => void;
}) => {
  const name = "Nikesh Dahal";
  const tagline =
    "Engineering seamless digital experiences for web, mobile, and everything in between.";
  const description =
    "I create robust backend systems, elegant frontends, and mobile-ready APIs enabling businesses to launch fast, grow reliably, and scale globally.";

  // Social media data
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/yourusername",
    },
    {
      name: "Dribbble",
      icon: <FaDribbble />,
      url: "https://dribbble.com/yourusername",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://facebook.com/yourusername",
    },
    { name: "Email", icon: <HiMail />, url: "mailto:hello@nikeshdahal.com" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  };

  // const socialContainerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 2,
  //     },
  //   },
  // };

  // const socialItemVariants = {
  //   hidden: { scale: 0, opacity: 0 },
  //   visible: {
  //     scale: 1,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 200,
  //       damping: 15,
  //     },
  //   },
  //   hover: {
  //     scale: 1.2,
  //     y: -5,
  //     transition: {
  //       type: "spring",
  //       stiffness: 400,
  //       damping: 10,
  //     },
  //   },
  // };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-white overflow-hidden">
      {/* Background particles */}
      <ParticleCanvas />

      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
        <motion.div
          className="mb-12 relative group"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="sr-only">{name}</h1>

          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="sr-only">{name}</h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {name.split(" ").map((word, wordIndex) => (
                <motion.div
                  key={wordIndex}
                  className="flex"
                  variants={containerVariants}
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className="text-7xl md:text-8xl lg:text-9xl font-bold text-white"
                      style={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        display: "inline-block",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tagline & Description */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 text-cyan-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {tagline}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#7DD3FC" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-200 to-cyan-300 rounded-lg font-medium text-gray-900 shadow-lg hover:shadow-cyan-300/40 transition-all"
            onClick={scrollToAbout}
          >
            View My Work
          </motion.button>
          <motion.a
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              borderColor: "#22d3ee",
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-8 py-3 border border-cyan-400/50 text-cyan-100 rounded-lg font-medium transition-all backdrop-blur-sm"
            style={{
              background: "rgba(8, 47, 73, 0.3)",
              boxShadow: "0 4px 15px rgba(34, 211, 238, 0.15)",
            }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <p className="text-sm font-light mb-2 ">Explore more</p>
          <div className="w-6 h-10 border-2 border-cyan-300 rounded-full flex justify-center mb-10">
            <motion.div
              className="w-1 h-3 bg-cyan-300 rounded-full mt-2"
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute left-6 bottom-1/2 transform translate-y-1/2 hidden md:flex flex-col items-start space-y-4 z-20">
        {socialLinks.map((social) => (
          <motion.div
            key={social.name}
            className="relative group"
            initial={{ width: 48 }}
            whileHover={{ width: 150 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center h-12 bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-600 hover:bg-gray-700/80 overflow-hidden"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 text-gray-300 text-xl">
                {social.icon}
              </div>

              {/* Text that only appears on hover */}
              <div className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="whitespace-nowrap text-gray-200 pr-4 pl-2 text-sm font-medium">
                  {social.name}
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
