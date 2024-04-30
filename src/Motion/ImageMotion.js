import React from "react";
import { motion } from "framer-motion";
export default function ImageMotion({ handleClick, className, src, alt }) {
  return (
    <motion.img
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      src={src}
      alt={alt}
      className={className}
      onClick={handleClick}
    />
  );
}
