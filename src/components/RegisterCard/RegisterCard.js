import React from "react";
import Button from "../../Motion/Button/Button";
import Select from "react-select";
import { motion } from "framer-motion";
import "./RegisterCard.scss";

export default function RegisterCard({
  step,
  formData,
  handleChange,
  handleSelect,
  handleStep,
  handleBack,
  errorMessage,
  formErrors,
}) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.section
      className="registeration__content"
      key="step1"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 2.5 }}
    >
      <label className="registeration__label">{step.label}</label>
      {step.inputType === "input" && (
        <>
          <input
            className="registeration__input"
            name={step.name}
            type={step.type || "text"}
            value={formData[step.name]}
            onChange={handleChange}
          />
          {formErrors[step.name] && (
            <p className="registeration__error">{formErrors[step.name]}</p>
          )}
        </>
      )}
      {step.inputType === "select" && (
        <>
          <Select
            className="registeration__select"
            options={step.options}
            value={step.options.find(
              (option) => option.value === formData[step.name]
            )}
            onChange={(selectedOption) =>
              handleSelect(selectedOption, step.name)
            }
            required
          />
          {formErrors[step.name] && (
            <p className="registeration__error">{formErrors[step.name]}</p>
          )}
        </>
      )}

      {step.inputType === "file" && (
        <>
          <input
            type="file"
            onChange={handleChange}
            name="file"
            style={{ display: "none" }}
            id="fileInput"
            required
          />
          <div className="registeration__upload">
            <label htmlFor="fileInput" className="modal__upload">
              Upload
            </label>
          </div>
          {formErrors[step.name] && (
            <p className="registeration__error">{formErrors[step.name]}</p>
          )}
        </>
      )}

      <div className="registeration__buttons">
        <Button text="Back" handle={handleBack} />
        {step.name === "password" ? (
          <Button text="Submit" />
        ) : (
          <Button text="Next" handle={handleStep} name={step.name} />
        )}
      </div>
      {errorMessage && <p className="registeration__error">{errorMessage}</p>}
    </motion.section>
  );
}
