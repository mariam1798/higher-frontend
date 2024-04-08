import React, { useState } from "react";
import higher from "../../assets/icons/logoblack.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

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
      navigate("/user");
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      setErrorMessage(message);
    }
  };

  return (
    <main className="login">
      <form className="login__container" onSubmit={handleSubmit}>
        <img className="login__logo" src={higher} alt="higher" />
        <h2 className="login__title">Welcome to our App</h2>
        <div className="login__group">
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="login__group">
          <label className="login__label" htmlFor="password">
            Password
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button className="login__button">Log In</button>
        <Link className="login__navigate" to="/register">
          Register
        </Link>
        {errorMessage && <div className="login__message">{errorMessage}</div>}
      </form>
    </main>
  );
}
