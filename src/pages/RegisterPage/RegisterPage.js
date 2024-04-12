import React, { useMemo, useState } from "react";
import "./RegisterPage.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import url from "../../assets/video/higher.mp4";
import Video from "../../components/Video/Video";
import { handleRegister } from "../../utils/axios";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
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
    if (e.target.name === "file") {
      setSelectedFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSelect = (selectedOption) => {
    setFormData({
      ...formData,
      professional_status: selectedOption.value,
    });
  };
  const handleJob = (selectedOption) => {
    setFormData({
      ...formData,
      job_title: selectedOption.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("You must fill in all the form fields");
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

  return (
    <>
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
              <div className="register__card register__card--buttons">
                <button className="register__button" onClick={handleStep}>
                  Register
                </button>
                <Link to="/login">
                  <button className="register__button" onClick={handleStep}>
                    Login
                  </button>
                </Link>
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
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="register__Card">
                <label className="register__label">
                  Where are you currently based?
                </label>
                <Select
                  className="register__select"
                  options={options}
                  value={value}
                  onChange={changeHandler}
                  onClick={handleStep}
                />
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 4 && (
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

                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="register__Card">
                <label className="register__label">
                  What is your current job title?
                </label>
                <Select
                  className="register__select"
                  options={jobOptions}
                  onChange={handleJob}
                />
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 6 && (
              <div className="register__Card">
                <label className="register__label">
                  How many years of experience do you have in your current role?
                </label>
                <input
                  className="register__input"
                  name="experience_years"
                  onChange={handleChange}
                />
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 7 && (
              <div className="register__Card">
                <label className="register__label">
                  Would you like to upload an avatar?
                </label>
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
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 8 && (
              <div className="register__Card">
                <label className="register__label">
                  Share your email with us:
                </label>
                <input
                  className="register__input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                <div className="register__buttons">
                  <Link>
                    <button className="register__button" onClick={handleBack}>
                      Back
                    </button>
                  </Link>
                  <button className="register__button" onClick={handleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {currentStep === 9 && (
              <>
                <div className="register__Card">
                  <label className="register__label">password</label>
                  <input
                    className="register__input"
                    name="password"
                    onChange={handleChange}
                    type="password"
                  />
                </div>
                <div className="register__card">
                  <div className="register__buttons">
                    <Link>
                      <button className="register__button" onClick={handleBack}>
                        Back
                      </button>
                    </Link>
                    <button className="register__button">Submit</button>
                    {errorMessage && <p>{errorMessage}</p>}
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <section className="register__description">
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
        </section>
        <Video url={url} />
      </main>
    </>
  );
}
