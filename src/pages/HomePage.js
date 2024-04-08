import { getProfile, getJobs } from "../utils/axios";
import JobsList from "../components/JobsList/JobsList";
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
  }, []);
  if (!jobs) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <main className="home">
        <JobsList jobs={jobs} />
      </main>
    </>
  );
}
