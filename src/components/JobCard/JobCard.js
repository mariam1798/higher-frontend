import React from "react";
import "./JobCard.scss";
import upload from "../../assets/icons/upload.svg";
export default function JobCard({ employer, logo, website, job_title }) {
  return (
    <section className="job__card">
      <div className="job__left">
        <img src={logo || upload} className="job__image" />
      </div>
      <div className="job__right">
        <h4 className="job__name">{job_title}</h4>
        <h4 className="job__name">{employer}</h4>
      </div>
    </section>
  );
}
