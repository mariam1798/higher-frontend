import { useState } from "react";
import JobCard from "../JobCard/JobCard";
import JobDetailsModal from "../JobDetailsModal/JobDetailsModal";

export default function JobsList({ jobs }) {
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);
  return (
    <section className="job">
      <div className="job__list">
        <h3 className="job__title">Job Suggestions</h3>
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
        {jobs && visibleJobs < jobs.length && (
          <button
            className="job__button"
            onClick={() => setVisibleJobs(visibleJobs + 3)}
          >
            Load More
          </button>
        )}
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
