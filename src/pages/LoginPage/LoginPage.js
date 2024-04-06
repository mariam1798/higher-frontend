import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // When any input changes, update the correct field in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("authToken", data.token);
      navigate("/home");
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      setErrorMessage(message);
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={handleChange} />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button className="login__button">Log in</button>
        {errorMessage && <div className="login__message">{errorMessage}</div>}
      </form>
      <p>
        Need an account? <Link to="/">Sign up</Link>
      </p>
    </main>
  );
}
