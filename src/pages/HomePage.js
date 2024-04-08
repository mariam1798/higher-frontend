import { getProfile, getJobs } from "../utils/axios";
import JobCard from "../components/JobCard/JobCard";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      return setFailedAuth(true);
    }
    const loadData = async () => {
      try {
        const data = await getProfile(token);

        setUser(data.data);
        const jobData = await getJobs(data);
        setJobs(jobData.data.data);
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
      }
    };

    loadData();
  }, []);
  if (!jobs) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <section className="job">
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
        {visibleJobs < jobs.length && (
          <button onClick={() => setVisibleJobs(visibleJobs + 3)}>
            Load More
          </button>
        )}
      </section>
    </>
  );
}
