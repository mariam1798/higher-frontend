import React from "react";
import { motion } from "framer-motion";

export default function Button({ text, handle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="register__button"
      onClick={handle}
    >
      {text}
    </motion.button>
  );
}
