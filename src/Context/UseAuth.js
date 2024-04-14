import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../utils/axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState();
  const [videos, setVideos] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
    } else {
      const loadData = async () => {
        try {
          const profileData = await getProfile(authToken);
          setUser(profileData.data);
          setFailedAuth(false);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setFailedAuth(true);
        }
      };
      loadData();
    }
  }, [authToken]);

  const handleLogin = async (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    console.log(token);
    const { data } = await getProfile(token);
    setUser(data.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("jobsData");
    setUser(null);
    setAuthToken(null);
    setFailedAuth(true);
    setVideos([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        videos,
        setVideos,
        authToken,
        handleLogin,
        handleLogout,
        failedAuth,
        setFailedAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
