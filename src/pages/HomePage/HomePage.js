import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../Context/UseAuth";
import Loader from "../../Motion/Loader/Loader";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [jobs, setJobs] = useState(undefined);
  const [homeVideos, setHomeVideos] = useState(null);
  const { authToken, setFailedAuth, failedAuth } = useAuth();

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
    return (
      <Link className="home__error" to={"/"}>
        <p>Please Log in or Register</p>
      </Link>
    );
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
