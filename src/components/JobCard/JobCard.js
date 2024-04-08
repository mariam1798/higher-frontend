import React from "react";

export default function JobCard({
  employer,
  logo,
  website,
  job_title,
  description,
}) {
  return (
    <section className="videos__card">
      <div className="videos__left">
        <img src={logo} alt={employer} className="videos__image" />
      </div>
      <div className="videos__right">
        <h4 className="videos__name">{job_title}</h4>
        <h4 className="videos__name">{website}</h4>
        <h4 className="videos__channel">{description}</h4>
      </div>
    </section>
  );
}
