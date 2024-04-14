import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (!isVisible) return null; // Don't render the loader if not visible

  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height
        width: "100vw", // Full screen width
        backgroundColor: "#141218", // Background color
        position: "absolute", // Make it cover the whole screen
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      {[1, 2, 3].map((index) => (
        <motion.span
          key={index}
          style={{
            display: "block",
            width: 20, // Increased width
            height: 20, // Increased height
            borderRadius: "50%",
            backgroundColor: "#896dd5",
            margin: "0 8px", // Increase spacing between dots for wider effect
          }}
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{ ...dotTransition, delay: index * 0.2 }}
        />
      ))}
    </div>
  );
};

export default Loader;
