import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import UploadPage from "./pages/UploadPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Nav from "./components/Nav/Nav";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="content-wrap">
          <Nav />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
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
