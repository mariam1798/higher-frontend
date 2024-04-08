import { getProfile, getJobs } from "../utils/axios";
import JobCard from "../components/JobCard/JobCard";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

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
  }, [token]);

  return (
    <>
      {jobs &&
        jobs.map((job) => (
          <JobCard
            key={job.job_id}
            employer={job.employer_name}
            logo={job.employer_logo}
            website={job.employer_website}
            job_title={job.job_title}
            description={job.job_description}
          />
        ))}
    </>
  );
}
