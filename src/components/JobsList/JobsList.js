import { useState } from "react";
import JobCard from "../JobCard/JobCard";
import JobDetailsModal from "../JobDetailsModal/JobDetailsModal";

export default function JobsList({ jobs }) {
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75, // Starts slightly smaller
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };

  return (
    <section className="job">
      <h3 className="job__title">Job Suggestions</h3>
      <div className="job__wrapper">
        <div className="job__list">
          {jobs &&
            jobs
              .slice(0, visibleJobs)
              .map((job) => (
                <JobCard
                  handleOpenModal={handleOpenModal}
                  key={job.job_id}
                  employer={job.employer_name}
                  logo={job.employer_logo}
                  job_title={job.job_title}
                />
              ))}
        </div>
        <div className="job__display">
          {jobs && visibleJobs < jobs.length && (
            <button
              className="job__button"
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
              modalIsOpen={modalIsOpen}
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
