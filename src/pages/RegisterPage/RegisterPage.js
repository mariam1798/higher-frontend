import React, { useMemo, useState } from "react";
import "./RegisterPage.scss";
import Select from "react-select";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
    { value: "entry_level", label: "Entry Level" },
    { value: "experienced", label: "Experienced" },
    { value: "manager", label: "Manager" },
    { value: "executive", label: "Executive" },
  ];

  const jobOptions = [
    { value: "software_development", label: "Software Development" },
    { value: "nursing", label: "Nursing" },
    { value: "marketing", label: "Marketing" },
    { value: "sales_representation", label: "Sales Representation" },
    { value: "customer_assistance", label: "Customer Assistance" },
    { value: "data_analysis", label: "Data Analysis" },
    { value: "it_support", label: "IT Support" },
    { value: "hr_management", label: "HR Management" },
    { value: "account_management", label: "Account Management" },
    { value: "project_management", label: "Project Management" },
    { value: "teaching", label: "Teaching" },
    { value: "mechanical_engineering", label: "Mechanical Engineering" },
    { value: "administrative_assistance", label: "Administrative Assistance" },
    { value: "construction_work", label: "Construction Work" },
    { value: "graphic_design", label: "Graphic Design" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "civil_engineering", label: "Civil Engineering" },
    { value: "electrical_engineering", label: "Electrical Engineering" },
    { value: "social_media_managing", label: "Social Media Managing" },
    { value: "physical_therapy", label: "Physical Therapy" },
    { value: "occupational_therapy", label: "Occupational Therapy" },
    { value: "dentistry", label: "Dentistry" },
    { value: "psychology", label: "Psychology" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "logistics_coordination", label: "Logistics Coordination" },
    { value: "environmental_study", label: "Environmental Study" },
    { value: "chef", label: "Chef" },
    { value: "real_estate_selling", label: "Real Estate Selling" },
    { value: "medical_doctor", label: "Medical Doctor" },
    { value: "law", label: "Law" },
  ];

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    setFormData({ ...formData, location: value.label });
  };

  const handleStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (selectedOption) => {
    setFormData({
      ...formData,
      professional_status: selectedOption.value,
      job_title: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        professional_status: formData.professional_status,
        experience_years: formData.experience_years,
        job_title: formData.job_title,
      });

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

  return (
    <main className="register">
      <div className="register__wrapper">
        <h2 className="register__title">
          Welcome to <span className="register__title--span"> Higher! </span>
        </h2>
        <h3 className="register__text">Where Talent Meets Opportunity</h3>
        <form className="regitser__form" onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <button className="register__button" onClick={handleStep}>
              Higher Me
            </button>
          )}
          {currentStep === 1 && (
            <div className="register__card">
              <Link to="/login">
                <button className="register__button" onClick={handleStep}>
                  Login
                </button>
              </Link>
              <button className="register__button" onClick={handleStep}>
                Register
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="register__Card">
              <label className="register__label">What's your name?</label>
              <input
                className="register__input"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 3 && (
            <div className="register__Card">
              <label className="register__label">
                Share your email with us:
              </label>
              <input
                className="register__input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 4 && (
            <div className="register__Card">
              <label className="register__label">
                Where are you currently based?{" "}
              </label>
              <Select
                className="register__select"
                options={options}
                value={value}
                onChange={changeHandler}
                onClick={handleStep}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 5 && (
            <div className="register__Card">
              <label className="register__label">
                What is your professional status?{" "}
              </label>
              <Select
                name="professional_status"
                className="register__select"
                options={professionalStatusOptions}
                value={professionalStatusOptions.find(
                  (option) => option.value === formData.professional_status
                )}
                onChange={handleSelect}
                onClick={handleStep}
              />

              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 6 && (
            <div className="register__Card">
              <label className="register__label">
                What is your current job title?
              </label>
              <Select
                className="register__select"
                options={jobOptions}
                onChange={handleSelect}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 7 && (
            <div className="register__Card">
              <label className="register__label">
                How many years of experience do you have in your current job
                title?
              </label>
              <input
                className="register__input"
                name="experience_years"
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
          {currentStep === 8 && (
            <div className="register__Card">
              <label className="register__label">password</label>
              <input
                className="register__input"
                name="password"
                onChange={handleChange}
              />
            </div>
          )}
          {currentStep === 8 && (
            <div className="register__card">
              <button className="register__button">Submit</button>
              {errorMessage && <p>{errorMessage}</p>}
              <Link>
                <button className="register__button" onClick={handleBack}>
                  Back
                </button>
              </Link>
            </div>
          )}
        </form>
      </div>
      <section className="register__description">
        <h3 className="register__text">
          At Higher, our journey began with a fundamental insight: while
          character plays a crucial role within a company's team, traditional
          hiring processes tend to highlight candidates merely as they appear on
          paper, often overlooking the essence of who they truly are. Our
          mission is to bridge this gap, ensuring a seamless alignment between
          an individual's unique qualities and the ethos of a prospective
          employer. Higher is more than a recruitment platform; it's a conduit
          for forging meaningful human connections between employees and
          employers. Our aim is to uncover the perfect match — whether it's the
          company that complements an individual's aspirations and personality,
          or the employee who emerges as the missing piece of a team's puzzle.
        </h3>
      </section>
    </main>
  );
}
