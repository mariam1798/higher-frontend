import React, { useState } from "react";
import "./JobCard.scss";
import upload from "../../assets/icons/upload.svg";
import plus from "../../assets/icons/plus.svg";
import ImageMotion from "../../Motion/ImageMotion";

export default function JobCard({
  employer,
  logo,
  job_title,
  handleOpenModal,
}) {
  const [imageSrc, setImageSrc] = useState(logo || upload);

  const handleError = () => {
    setImageSrc(upload);
  };

  return (
    <section onClick={handleOpenModal} className="card">
      <div className="card__left">
        <img
          src={imageSrc}
          onError={handleError}
          alt="company logo"
          className="card__image"
        />
      </div>
      <div className="card__right">
        <h4 className="card__employ">{job_title}</h4>
        <h4 className="card__name">{employer}</h4>
      </div>
      <ImageMotion
        handleClick={handleOpenModal}
        alt="open modal"
        src={plus}
        className="card__open"
      />
    </section>
  );
}
