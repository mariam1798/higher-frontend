import "./Upload.scss";
import { useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchVideos, postVideos } from "../../utils/axios";
import { useAuth } from "../../Context/UseAuth";
import { toast } from "react-toastify";

export default function Search({ user, id, setVideos }) {
  const notify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      const file = e.target.files[0];
      setSelectedFile(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploading) {
      return;
    }
    setUploading(true);

    const maxFileSize = 20 * 1024 * 1024;
    if (selectedFile.size > maxFileSize) {
      notify("File size exceeds the limit of 20MB.");
      setUploading(false);
      return;
    }

    if (!formData.title || !formData.description || !selectedFile) {
      notify("You must fill in all the form fields ⛔️");
      setUploading(false);
      return;
    }
    const allowedFileTypes = ["mov", "mp4"];
    const fileType = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedFileTypes.includes(fileType)) {
      notify(
        "Unsupported file type. Only 'mov' and 'mp4' formats are allowed."
      );
      setUploading(false);
      return;
    }

    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);

    try {
      const response = await postVideos(uploadData, authToken);
      if (response.status === 200) {
        notify("Highered successfully! ⬆️💜");
        const { data } = await fetchVideos(id);
        setVideos(data);
      }

      setTimeout(() => {
        handleCloseModal();
        navigate("/user");
      }, 3000);
      event.target.reset();
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;

        notify(errorMessage);
      } else {
        notify("Upload error!");
      }
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  return (
    <section className="upload">
      <div className="upload__container">
        <div className="upload__wrap">
          <button onClick={handleOpenModal} className="upload__button">
            UPLOAD VIDEO
          </button>
        </div>
        <Link to="/user"></Link>
        <h3 className="upload__name">
          Welcome back, <span className="upload__span"> {user.name}! </span>
        </h3>
      </div>
      <UploadModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleOpenModal={handleOpenModal}
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        notify={notify}
        loading={loading}
      />
    </section>
  );
}
