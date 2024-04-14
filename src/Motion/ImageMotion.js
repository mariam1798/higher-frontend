import React from "react";
import { motion } from "framer-motion";
export default function ImageMotion({ handleClick, className, src }) {
  return (
    <motion.img
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      src={src}
      alt={src.path}
      className={className}
      onClick={handleClick}
    />
  );
}
