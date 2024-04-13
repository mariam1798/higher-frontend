import React from "react";
import Button from "../Button/Button";
import Select from "react-select";
import { motion } from "framer-motion";

export default function RegisterCard({
  step,
  formData,
  handleChange,
  handleSelect,
  handleSubmit,
  handleStep,
  handleBack,
  options,
  validate,
  errorMessage,
}) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      key="step1"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 2.5 }}
    >
      <label className="register__label">{step.label}</label>
      {step.inputType === "input" && (
        <input
          className={`register__input ${
            validate && !validate() ? "register__input--invalid" : ""
          }`}
          name={step.name}
          type={step.type || "text"}
          value={formData[step.name]}
          onChange={handleChange}
        />
      )}
      {step.inputType === "select" && (
        <Select
          className="register__select"
          options={step.options}
          value={step.options.find(
            (option) => option.value === formData[step.name]
          )}
          onChange={(selectedOption) => handleSelect(selectedOption, step.name)}
        />
      )}

      {step.inputType === "file" && (
        <>
          <input
            type="file"
            onChange={handleChange}
            name="file"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="modal__upload">
            Upload
          </label>
        </>
      )}

      <div className="register__buttons">
        <Button text="Back" handle={handleBack} />

        {step.type === "password" ? (
          <Button text="Submit" handle={handleSubmit} />
        ) : (
          <Button text="Next" handle={handleStep} />
        )}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </motion.div>
  );
}
