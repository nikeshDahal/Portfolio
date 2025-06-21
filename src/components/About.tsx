import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import CountUp from "react-countup";

interface AboutSectionProps {}

const AboutSection = forwardRef<HTMLElement | null, AboutSectionProps>(
  (props, ref) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    useImperativeHandle(ref, () => {
      if (sectionRef.current === null) {
        throw new Error("Ref not yet assigned");
      }
      return sectionRef.current;
    });

    const textVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
      },
    };

    const imageVariants = {
      hidden: { opacity: 0, rotate: -15, scale: 0.8 },
      visible: {
        opacity: 1,
        rotate: -10,
        scale: 1.1,
        transition: { duration: 1, ease: "easeOut" },
      },
    };

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-150, 150], [20, -20]);
    const rotateY = useTransform(x, [-150, 150], [-20, 20]);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      const bounds = cardRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const xPos = e.clientX - bounds.left - bounds.width / 2;
      const yPos = e.clientY - bounds.top - bounds.height / 2;
      x.set(xPos);
      y.set(yPos);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const dotPattern =
      'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l1dHk9IjAuMzUuciIvPjwvc3ZnPg==")';

    return (
      <section
        ref={sectionRef}
        className="relative min-h-screen px-4 md:px-8 flex items-center overflow-hidden"
      >
        {/* About Me Badge - Positioned to align with text content */}
        <motion.div
          initial={{ x: -150, y: 0, opacity: 0 }}
          animate={isInView ? { x: 0, y: 0, opacity: 0.8 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="absolute top-[5%] lg:top-[5%] -left-11 z-30"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="backdrop-blur-md bg-white/10 border border-white/30 text-white text-4xl font-bold rounded-r-full px-30 py-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            animate={{
              scale: [1, 1.02, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            About me
          </motion.div>
        </motion.div>

        {/* Background elements remain the same */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: dotPattern,
            backgroundRepeat: "repeat",
            backgroundSize: "10px 10px",
            opacity: 0.1,
          }}
        ></div>
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0f021e] via-transparent to-transparent opacity-70 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0f021e] via-transparent to-transparent opacity-70 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-12">
            {/* Text Content Left - Adjusted for alignment with About me badge */}
            <motion.div
              // className="lg:w-2/3 text-gray-300 pt-8 lg:pt-12"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Headline with adjusted spacing */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-4xl font-bold mb-3 tracking-wide">
                  <span className="whitespace-nowrap">I AM AVAILABLE FOR</span>{" "}
                  <span className="text-green-400 tracking-widest">
                    WEB DEVELOPMENT
                  </span>{" "}
                  <span className="whitespace-nowrap">PROJECTS</span>
                </h2>
              </motion.div>

              {/* Body text */}
              <div className="text-lg leading-relaxed space-y-6">
                <p className="opacity-80">
                  Hi! I'm{" "}
                  <span className="font-bold text-green-400">Nikesh Dahal</span>
                  , a passionate software developer with over 3 years of
                  professional experience specializing in backend web
                  development. I hold a Bachelor's degree in Computer
                  Engineering from Kantipur Engineering College (Tribhuvan
                  University), where I built a strong foundation in programming,
                  system design, and problem-solving.
                </p>
                <p className="opacity-70">
                  I specialize in Node.js, NestJS, GraphQL, MongoDB, and
                  Elasticsearch, with a strong foundation in microservice
                  architecture.
                </p>
                <p className="opacity-60">
                  Currently diving deeper into data science, I love turning
                  complex problems into clean, efficient systems. Let's build
                  something impactful together.
                </p>
              </div>

              <motion.div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-0.5xl">
                {/* Experience Card */}
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-green-400/20 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <CountUp
                      start={0}
                      end={3}
                      duration={2.5}
                      suffix="+"
                      className="text-3xl font-bold text-green-400 mb-1"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Years Experience
                    </span>
                  </div>
                </div>

                {/* Projects Card */}
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-green-400/20 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <CountUp
                      start={0}
                      end={15}
                      duration={3}
                      suffix="+"
                      className="text-3xl font-bold text-green-400 mb-1"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Projects Completed
                    </span>
                  </div>
                </div>

                {/* Technologies Card */}
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-green-400/20 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center">
                    <CountUp
                      start={0}
                      end={10}
                      duration={2.8}
                      suffix="+"
                      className="text-3xl font-bold text-green-400 mb-1"
                    />
                    <span className="text-gray-300 text-sm font-medium">
                      Technologies Mastered
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 3D Profile Card Right - Unchanged position */}
            <motion.div
              ref={cardRef}
              className="relative w-full lg:w-1/3 flex-shrink-0 cursor-pointer mt-8 lg:mt-16"
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease",
              }}
            >
              <div
                className="absolute inset-0 bg-green-400 rounded-3xl opacity-20 filter blur-xl"
                style={{ transform: "rotate(-5deg) scale(1.05)", zIndex: 1 }}
              ></div>

              <img
                src="https://i.postimg.cc/SR5r4cWw/profile-pic-1.png"
                alt="Nikesh Dahal"
                className="relative w-full h-auto object-cover rounded-3xl shadow-2xl z-10"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/400x400/64748B/F8FAFC?text=Image+Error";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

export default AboutSection;
