import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const InteractiveLoader = () => {
  const centerDot = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const centerControls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { repeat: Infinity, ease: "linear", duration: 1 }, // Changed from 2s to 1s (faster)
    });
    centerControls.start({
      rotate: -360,
      transition: { repeat: Infinity, ease: "linear", duration: 2 }, // Changed from 4s to 2s (faster)
    });
  }, [controls, centerControls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    if (centerDot.current) {
      centerDot.current.style.transform = `translate(${dx * 0.02}px, ${
        dy * 0.02
      }px)`;
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: "transparent" }}
    >
      <motion.div
        animate={controls}
        className="relative w-32 h-32"
        style={{ originX: "50%", originY: "50%" }}
      >
        {[...Array(3)].map((_, i) => {
          const angle = (i / 3) * 2 * Math.PI;
          const radius = 50;
          return (
            <div
              key={i}
              className="absolute w-8 h-8 rounded-full border-4 border-white flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${
                  radius * Math.cos(angle)
                }px, ${radius * Math.sin(angle)}px)`,
                backgroundColor: ["#0A2239", "#151B38", "#0F332E"][i],
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          );
        })}

        <motion.div
          ref={centerDot}
          animate={centerControls}
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border-4 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-[#1E3A4B]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveLoader;
