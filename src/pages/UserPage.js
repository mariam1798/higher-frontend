import React, { useState } from "react";
import axios from "axios";

export default function UserPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setSelectedFile(e.target.files[0]); // Directly use the file object
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
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Upload error!");
    }
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} name="file" />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Title"
          name="title"
        />

        <input
          name="description"
          onChange={handleChange}
          placeholder="Description"
        />
        <button className="button">Submit</button>
      </form>
    </>
  );
}
