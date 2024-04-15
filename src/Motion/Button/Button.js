import React from "react";
import { motion } from "framer-motion";
import "./Button.scss";

export default function Button({ disabled, text, handle, name }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="button"
      onClick={handle}
      disabled={disabled}
      data-name={name}
    >
      {text}
    </motion.button>
  );
}
