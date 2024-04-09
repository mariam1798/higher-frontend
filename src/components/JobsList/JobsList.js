import { useState } from "react";
import JobCard from "../JobCard/JobCard";

export default function JobsList({ jobs }) {
  const [visibleJobs, setVisibleJobs] = useState(3);
  return (
    <section className="job">
      <div className="job__list">
        <h3 className="job__title">Job Suggestions</h3>
        {jobs &&
          jobs
            .slice(0, visibleJobs)
            .map((job) => (
              <JobCard
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
    </section>
  );
}
