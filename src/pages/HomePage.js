import { getProfile, getJobs } from "../utils/axios";
import JobsList from "../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [_user, setUser] = useState(null);
  const [jobs, setJobs] = useState(undefined);
  const [failedAuth, setFailedAuth] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      setJobs([]); // Assume no jobs if there's no token to avoid undefined state
      return;
    }

    const loadData = async () => {
      setJobs(undefined); // Indicate loading state

      try {
        const storedJobs = localStorage.getItem("jobsData");
        let jobData;

        if (storedJobs) {
          jobData = JSON.parse(storedJobs);
          setJobs(jobData); // Use cached job data
        } else {
          const profileData = await getProfile(token);
          setUser(profileData.data);
          jobData = await getJobs(profileData.data);
          localStorage.setItem("jobsData", JSON.stringify(jobData.data.data));
          setJobs(jobData.data.data); // Use freshly loaded job data
        }
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
        setJobs([]); // Handle error by setting jobs to an empty array or a relevant error state
      }
    };

    loadData();
  }, [token]);

  if (failedAuth) {
    return <p>Failed to authenticate. Please log in again.</p>;
  }

  if (jobs === undefined) {
    // Data is still loading or hasn't started loading yet
    return <p>Loading...</p>;
  }

  if (!jobs.length) {
    // Assuming `jobs` is an array and checking if it's empty
    return <p>No jobs found.</p>;
  }
  return (
    <>
      <main className="home">
        <JobsList jobs={jobs} />
      </main>
    </>
  );
}
