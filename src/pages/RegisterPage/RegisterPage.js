import React, { useEffect, useMemo, useState } from "react";
import "./RegisterPage.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import url from "../../assets/video/higher.mp4";
import Video from "../../components/Video/Video";
import { handleRegister } from "../../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Motion/Button/Button";
import RegisterCard from "../../components/RegisterCard/RegisterCard";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        label: country.label,
        value: country.label,
      }));
  }, []);

  const texts = [
    "Higher",
    "más alto",
    "plus haut",
    "höher",
    "più alto",
    "mais alto",
    "выше",
    "更高",
    "より高い",
    "더 높은",
    "أعلى",
    "ऊंचा",
    "hoger",
    "högre",
    "wyższy",
    "daha yüksek",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    professional_status: "",
    experience_years: "",
    job_title: "",
  });

  const professionalStatusOptions = [
    { value: "Unemployed", label: "Unemployed" },
    { value: "student", label: "Student" },
    { value: "entry level", label: "Entry Level" },
    { value: "experienced", label: "Experienced" },
    { value: "manager", label: "Manager" },
    { value: "executive", label: "Executive" },
  ];

  const jobOptions = [
    { value: "software development", label: "Software Development" },
    { value: "nursing", label: "Nursing" },
    { value: "marketing", label: "Marketing" },
    { value: "sales representation", label: "Sales Representation" },
    { value: "customer assistance", label: "Customer Assistance" },
    { value: "data analysis", label: "Data Analysis" },
    { value: "it support", label: "IT Support" },
    { value: "hr management", label: "HR Management" },
    { value: "account management", label: "Account Management" },
    { value: "project management", label: "Project Management" },
    { value: "teaching", label: "Teaching" },
    { value: "mechanical engineering", label: "Mechanical Engineering" },
    { value: "administrative assistance", label: "Administrative Assistance" },
    { value: "construction work", label: "Construction Work" },
    { value: "graphic design", label: "Graphic Design" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "civil engineering", label: "Civil Engineering" },
    { value: "electrical engineering", label: "Electrical Engineering" },
    { value: "social media managing", label: "Social Media Managing" },
    { value: "physical therapy", label: "Physical Therapy" },
    { value: "occupational therapy", label: "Occupational Therapy" },
    { value: "dentistry", label: "Dentistry" },
    { value: "psychology", label: "Psychology" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "logistics coordination", label: "Logistics Coordination" },
    { value: "environmental study", label: "Environmental Study" },
    { value: "chef", label: "Chef" },
    { value: "real estate selling", label: "Real Estate Selling" },
    { value: "medical doctor", label: "Medical Doctor" },
    { value: "law", label: "Law" },
  ];

  const stepsConfig = [
    { label: "What's your name?", inputType: "input", name: "name" },
    {
      label: "Where are you currently based?",
      inputType: "select",
      name: "location",
      options: options,
    },
    {
      label: "What is your professional status?",
      inputType: "select",
      name: "professional_status",
      options: professionalStatusOptions,
    },
    {
      label: "What is your current job title?",
      inputType: "select",
      name: "job_title",
      options: jobOptions,
    },
    {
      label: "How many years of experience do you have in your current role?",
      inputType: "input",
      name: "experience_years",
    },
    {
      label: "Would you like to upload an avatar?",
      inputType: "file",
      name: "avatar",
    },
    {
      label: "Share your email with us:",
      inputType: "input",
      name: "email",
      type: "email",
    },
    {
      label: "Password:",
      inputType: "input",
      name: "password",
      type: "password",
    },
  ];

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    if (name === "email" && !value.includes("@")) {
      errors[name] = "Invalid email address.";
    } else if (!value.trim()) {
      errors[name] = "Please fill in this field.";
    } else {
      delete errors[name];
    }

    setFormErrors(errors);
  };

  const handleStep = (e) => {
    if (currentStep > 1 && !e.target.dataset.name === "avatar") {
      if (!formData[e.target.dataset.name]) {
        validateField(e.target.dataset.name, formData[e.target.dataset.name]);
        return;
      }
    }

    setCurrentStep((prevStep) => prevStep + 1);
    setErrorMessage("");
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "file") {
      setSelectedFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleSelect = (selectedOption, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors || Object.values(formData).some((value) => !value.trim())) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("name", formData.name);
    uploadData.append("email", formData.email);
    uploadData.append("password", formData.password);
    uploadData.append("location", formData.location);
    uploadData.append("professional_status", formData.professional_status);
    uploadData.append("experience_years", formData.experience_years);
    uploadData.append("job_title", formData.job_title);

    try {
      await handleRegister(uploadData);
      navigate("/login");
      setErrorMessage("");
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      setErrorMessage(message);
    }
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <main className="register">
        <div className="register__wrapper">
          {currentStep === 0 && (
            <>
              <h2 className="register__title">
                Welcome to
                <AnimatePresence>
                  <motion.span
                    className="register__title--span"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                  >
                    {texts[index]}
                  </motion.span>
                </AnimatePresence>
              </h2>
              <h3 className="register__text">Where Talent Meets Opportunity</h3>
              <Button text="Higher Me" handle={handleStep} />
            </>
          )}
          {currentStep === 1 && (
            <div className="registeration">
              <Link to="/login">
                <Button text="Log In" />
              </Link>
              <button className="registeration__button" onClick={handleStep}>
                Register
              </button>
            </div>
          )}
          <form className="register__form" onSubmit={handleSubmit}>
            {stepsConfig.map(
              (step, index) =>
                currentStep === index + 2 && (
                  <RegisterCard
                    key={index}
                    step={step}
                    formData={formData}
                    handleChange={handleChange}
                    handleSelect={handleSelect}
                    handleStep={handleStep}
                    handleBack={handleBack}
                    options={step.options || []}
                    errorMessage={errorMessage}
                    formErrors={formErrors}
                  />
                )
            )}
          </form>
        </div>
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="register__description"
        >
          <h3 className="register__text">
            At Higher, our journey began with a fundamental insight: while
            character plays a crucial role within a company's team, traditional
            hiring processes tend to highlight candidates merely as they appear
            on paper, often overlooking the essence of who they truly are. Our
            mission is to bridge this gap, ensuring a seamless alignment between
            an individual's unique qualities and the ethos of a prospective
            employer. Higher is more than a recruitment platform; it's a conduit
            for forging meaningful human connections between employees and
            employers. Our aim is to uncover the perfect match — whether it's
            the company that complements an individual's aspirations and
            personality, or the employee who emerges as the missing piece of a
            team's puzzle.
          </h3>
        </motion.section>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, y: -100, scale: 1.1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="register__video"
        >
          <Video url={url} />
        </motion.div>
      </main>
    </>
  );
}
