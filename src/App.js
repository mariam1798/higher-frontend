import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import UploadPage from "./pages/UploadPage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="user/upload" element={<UploadPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
