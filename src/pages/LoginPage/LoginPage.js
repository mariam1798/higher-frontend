import React, { useState } from "react";
import higher from "../../assets/icons/logoblack.svg";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { useAuth } from "../../components/UseContext/UseContext";
import { postLogin } from "../../utils/axios";

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide an your Email and password");
      return;
    }

    try {
      const { data } = await postLogin(formData);

      handleLogin(data.token);
      console.log(data.token);
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
        <Link className="login__navigate" to="/">
          Register
        </Link>
        {errorMessage && <div className="login__message">{errorMessage}</div>}
      </form>
    </main>
  );
}
