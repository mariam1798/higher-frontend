import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VideosList from "../../components/VideosList/VideosList";
import "./UserPage.scss";

export default function UserPage() {
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
      <main className="user">
        <p>Loading...</p>
      </main>
    );
  }
  return (
    <main className="user">
      <div className="user__wrapper">
        <h3 className="user__name">Welcome back, {user.name}!</h3>
        <button className="user__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <VideosList id={user.id} />
    </main>
  );
}
