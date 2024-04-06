import React, { useState } from "react";
import "./RegisterPage.scss";
import axios from "axios";
import { Navigate } from "react-router-dom";

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
  const handleStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    console.log(process.env.REACT_APP_API_BASE_URL);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }
    try {
      await axios.post("http://localhost:5000/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        professional_status: formData.professional_status,
        experience_years: formData.experience_years,
        job_title: formData.job_title,
      });
      Navigate("/login");
      setErrorMessage("");
    } catch (error) {
      e.target.reset();
      setErrorMessage(error);
    }
  };
  return (
    <main className="register">
      <div className="register__wrapper">
        <h2 className="register__title">Welcome to Higher!</h2>
        <h3 className="register__text">Where Talent Meets Opportunity</h3>

        <button className="register__button">Login</button>
        <form className="regitser__form" onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <button className="register__button" onClick={handleStep}>
              Higher Me
            </button>
          )}

          {currentStep === 1 && (
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
            </div>
          )}
          {currentStep === 2 && (
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
            </div>
          )}
          {currentStep === 3 && (
            <div className="register__Card">
              <label className="register__label">
                Where are you currently based?{" "}
              </label>
              <input
                className="register__input"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
            </div>
          )}
          {currentStep === 4 && (
            <div className="register__Card">
              <label className="register__label">
                What is your professional status?{" "}
              </label>
              <input
                className="register__input"
                name="professional_status"
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
            </div>
          )}
          {currentStep === 5 && (
            <div className="register__Card">
              <label className="register__label">
                What is your current job title?{" "}
              </label>
              <input
                className="register__input"
                name="job_title"
                onChange={handleChange}
              />
              <button className="register__button" onClick={handleStep}>
                Next
              </button>
            </div>
          )}
          {currentStep === 6 && (
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
            </div>
          )}
          {currentStep === 7 && (
            <div className="register__Card">
              <label className="register__label">password</label>
              <input
                className="register__input"
                name="password"
                onChange={handleChange}
              />
            </div>
          )}
          <button className="register__button">Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
