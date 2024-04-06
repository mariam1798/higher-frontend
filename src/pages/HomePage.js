import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("authToken");
      console.log(token);

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        // Get the data from the API
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="Profile">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Profile</h1>

      <p>
        Welcome back, {user.first_name} {user.last_name}
      </p>

      <h2>My Profile</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>You are a {user.role} </p>
      <button className="profile__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}
