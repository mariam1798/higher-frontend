import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProfile } from "./utils/axios";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import UploadPage from "./pages/UploadPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import "./App.scss";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "./components/Nav/Nav";

function App() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("jobsData");
    setUser(null);
    setFailedAuth(true);
  };
  return (
    <BrowserRouter>
      <Nav failedAuth={failedAuth} handleLogout={handleLogout} />
      <div className="container">
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="user/upload" element={<UploadPage />} />
            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
