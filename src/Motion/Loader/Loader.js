import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Loader.scss";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

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
    <div className="loader">
      {[1, 2, 3].map((index) => (
        <motion.span
          className="loader__span"
          key={index}
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
