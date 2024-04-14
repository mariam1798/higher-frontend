import React from "react";
import "./JobCard.scss";
import upload from "../../assets/icons/upload.svg";
import plus from "../../assets/icons/plus.svg";
export default function JobCard({
  employer,
  logo,
  job_title,
  handleOpenModal,
}) {
  return (
    <section onClick={handleOpenModal} className="job__card">
      <div className="job__left">
        <img src={logo || upload} className="job__image" />
      </div>
      <div className="job__right">
        <h4 className="job__employ">{job_title}</h4>
        <h4 className="job__name">{employer}</h4>
      </div>
      <img
        onClick={handleOpenModal}
        src={plus}
        alt="plus"
        className="job__open"
      />
    </section>
  );
}
