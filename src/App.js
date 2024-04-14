import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import JobsPage from "./pages/JobsPage/JobsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { AuthProvider } from "./Context/UseAuth";

import "./App.scss";

import Nav from "./components/Nav/Nav";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <div className="container">
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="user/:userId" element={<UsersPage />} />
              <Route path="/jobs" element={<JobsPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
