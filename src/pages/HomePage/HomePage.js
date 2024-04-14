import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../components/UseContext/UseContext";
import Loader from "../../Motion/Loader/Loader";

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
          <Loader />
        ) : jobs.length === 0 ? (
          ""
        ) : (
          <JobsList jobs={jobs} />
        )}
        {homeVideos === null ? (
          <Loader />
        ) : homeVideos.length === 0 ? (
          <Loader />
        ) : (
          <VideosList fetchAllVideos={fetchAllVideos} videos={homeVideos} />
        )}
      </main>
    </>
  );
}
