import "./Upload.scss";
import { useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchVideos, postVideos } from "../../utils/axios";
import { useAuth } from "../UseContext/UseContext";

export default function Search({ user, id, setVideos }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { authToken } = useAuth();
  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setSelectedFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.description || !selectedFile) {
      alert("You must fill in all the form fields");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);

    try {
      const response = await postVideos(uploadData, authToken);

      if (response.status === 200) {
        setMessage("Highered successfully!");
        const { data } = await fetchVideos(id);
        setVideos(data);
      } else {
        setMessage("Upload failed!");
      }

      setTimeout(() => {
        handleCloseModal();
        navigate("/user");
      }, 5000);
      event.target.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Upload error!");
    }
  };

  return (
    <section className="search">
      <div className="search__container">
        <div className="search__wrap">
          <button onClick={handleOpenModal} className="search__button">
            UPLOAD
          </button>
        </div>
        <Link to="/user"></Link>
        <h3 className="search__name">
          Welcome back, <span className="search__span"> {user.name}! </span>
        </h3>
      </div>
      <UploadModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleOpenModal={handleOpenModal}
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        message={message}
      />
    </section>
  );
}
