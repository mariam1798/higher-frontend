import React from "react";
import { ToastContainer } from "react-toastify";
import "./UploadButton.scss";

export default function UploadButton({ handleChange, notify }) {
  return (
    <div className="submit">
      <input
        type="file"
        onChange={handleChange}
        name="file"
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="submit__upload">
        Upload
      </label>
      <button onClick={notify} className="submit__button">
        Submit
      </button>
      <ToastContainer />
    </div>
  );
}
