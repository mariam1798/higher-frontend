import React from "react";
import { ToastContainer } from "react-toastify";

export default function UploadButton({ handleChange, notify, type }) {
  return (
    <div className={type}>
      <input
        type="file"
        onChange={handleChange}
        name="file"
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="modal__upload">
        Upload
      </label>
      <button onClick={notify} className="modal__button">
        Submit
      </button>
      <ToastContainer />
    </div>
  );
}
