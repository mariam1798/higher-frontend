import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideosList from "../../components/VideosList/VideosList";
import "./UserPage.scss";
import Nav from "../../components/Nav/Nav";

import { getProfile, fetchVideos } from "../../utils/axios";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      return setFailedAuth(true);
    }
    const loadData = async () => {
      try {
        const { data } = await getProfile(token);

        setUser(data);
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
      }
    };

    loadData();
  }, [token]);

  useEffect(() => {
    if (user && user.id) {
      const fetchVideosForUser = async () => {
        try {
          const { data } = await fetchVideos(user.id);
          setVideos(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchVideosForUser();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("jobsData");
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
  if (!videos) {
    return <p>LOading..</p>;
  }
  return (
    <>
      <Nav setVideos={setVideos} id={user.id} />
      <main className="user">
        <div className="user__wrapper">
          <h3 className="user__name">Welcome back, {user.name}!</h3>
          <button className="user__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <VideosList videos={videos} />
      </main>
    </>
  );
}
