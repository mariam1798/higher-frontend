import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../components/UseContext/UseContext";

export default function HomePage() {
  const [jobs, setJobs] = useState(undefined);
  const [homeVideos, setHomeVideos] = useState(null);
  const { authToken, setFailedAuth, failedAuth, setUser } = useAuth();

  const fetchAllVideos = async () => {
    try {
      const { data } = await getVideos();
      setHomeVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHomeVideos([]);
    }
  };

  // Fetch jobs data
  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
      setJobs([]);
      return;
    }

    const loadData = async () => {
      try {
        const storedJobs = localStorage.getItem("jobsData");
        if (storedJobs) {
          setJobs(JSON.parse(storedJobs));
        } else {
          const profileData = await getProfile(authToken);
          const jobData = await getJobs(profileData.data);
          localStorage.setItem("jobsData", JSON.stringify(jobData.data.data));
          setJobs(jobData.data.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setFailedAuth(true);
        setJobs([]);
      }
    };

    loadData();
  }, [authToken]);

  // Fetch videos data
  useEffect(() => {
    fetchAllVideos();
  }, []);

  if (failedAuth) {
    return <p>Failed to authenticate. Please log in again.</p>;
  }

  return (
    <>
      <main className="home">
        {jobs === undefined ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          ""
        ) : (
          <JobsList jobs={jobs} />
        )}
        {homeVideos === null ? (
          <p>Loading videos...</p>
        ) : homeVideos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          <VideosList fetchAllVideos={fetchAllVideos} videos={homeVideos} />
        )}
      </main>
    </>
  );
}
