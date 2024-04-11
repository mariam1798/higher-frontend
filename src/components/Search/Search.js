import "./Search.scss";
import { useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchVideos } from "../../utils/axios";
export default function Search({ id, setVideos, avatar }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");

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
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/videos`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        <div className="search__top">
          <div className="search__wrap">
            <input
              className="search__bar"
              placeholder="SEARCH"
              name="search"
            ></input>
          </div>
        </div>
        <div className="search__wrap">
          <button onClick={handleOpenModal} className="search__button">
            UPLOAD
          </button>
        </div>
        <Link to="/user">
          <img
            src={avatar}
            alt="user image"
            className="search__avatar search__avatar--tablet"
          />
        </Link>
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
