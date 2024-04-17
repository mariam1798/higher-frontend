import { useState } from "react";
import JobCard from "../JobCard/JobCard";
import JobDetailsModal from "../JobDetailsModal/JobDetailsModal";
import "./JobList.scss";
import { BeatLoader } from "react-spinners";

export default function JobsList({ jobs }) {
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [modalIsOpen, setModalIsOpen] = useState(null);

  const handleOpenModal = (jobId) => setModalIsOpen(jobId);
  const handleCloseModal = () => setModalIsOpen(false);

  if (!jobs) {
    return (
      <div className="jobs__loader">
        <BeatLoader
          color="#896dd5"
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className="jobs">
      <h3 className="jobs__title">Jobs Suggestions</h3>
      <div className="jobs__wrapper">
        <section className="jobs__list">
          {jobs &&
            jobs
              .slice(0, visibleJobs)
              .map((job) => (
                <JobCard
                  handleOpenModal={() => handleOpenModal(job.job_id)}
                  key={job.job_id}
                  employer={job.employer_name}
                  logo={job.employer_logo}
                  job_title={job.job_title}
                />
              ))}
        </section>
        <div className="jobs__display">
          {jobs && visibleJobs < jobs.length && (
            <button
              className="jobs__button"
              onClick={() => setVisibleJobs(visibleJobs + 3)}
            >
              Show More
            </button>
          )}
        </div>
      </div>
      {jobs &&
        jobs
          .slice(0, visibleJobs)
          .map((job) => (
            <JobDetailsModal
              handleOpenModal={handleOpenModal}
              modalIsOpen={modalIsOpen === job.job_id}
              handleCloseModal={handleCloseModal}
              key={job.job_id}
              employer={job.employer_name}
              logo={job.employer_logo}
              job_title={job.job_title}
              job_description={job.job_description}
              job_employment_type={job.job_employment_type}
              job_city={job.job_city}
              job_country={job.job_country}
              job_apply={job.job_apply_link}
            />
          ))}
    </section>
  );
}
