import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../components/UseContext/UseContext";

export default function HomePage() {
  const [jobs, setJobs] = useState(undefined);
  const [videos, setVideos] = useState(null);

  const token = localStorage.getItem("authToken");
  const { setFailedAuth, failedAuth, setUser } = useAuth();

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
      setJobs([]);
      return;
    }

    const loadData = async () => {
      setJobs(undefined);

      try {
        const storedJobs = localStorage.getItem("jobsData");
        let jobData;

        if (storedJobs) {
          jobData = JSON.parse(storedJobs);
          setJobs(jobData);
        } else {
          const profileData = await getProfile(token);
          setUser(profileData.data);
          jobData = await getJobs(profileData.data);
          localStorage.setItem("jobsData", JSON.stringify(jobData.data.data));
          setJobs(jobData.data.data);
        }
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
        setJobs([]);
      }
    };

    loadData();
  }, [token]);

  const fetchAllVideos = async () => {
    const { data } = await getVideos();
    setVideos(data);
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  if (failedAuth) {
    return <p>Failed to authenticate. Please log in again.</p>;
  }

  if (jobs === undefined) {
    return <p>Loading...</p>;
  }

  if (!jobs.length) {
    return <p>No jobs found.</p>;
  }
  if (!videos) {
    return <p>Loading......</p>;
  }
  return (
    <>
      <main className="home">
        <JobsList jobs={jobs} />
        <VideosList fetchAllVideos={fetchAllVideos} videos={videos} />
      </main>
    </>
  );
}