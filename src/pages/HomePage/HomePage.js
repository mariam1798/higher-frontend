import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState, useCallback } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../Context/UseAuth";
import Button from "../../Motion/Button/Button";
import { Link } from "react-router-dom";
import Video from "../../components/Video/Video";
import url from "../../assets/video/why.mp4";
import { motion } from "framer-motion";

export default function HomePage() {
  const [jobs, setJobs] = useState(undefined);
  const [homeVideos, setHomeVideos] = useState(null);
  const { user, authToken, setFailedAuth, failedAuth } = useAuth();

  const fetchAllVideos = async () => {
    try {
      const { data } = await getVideos();
      setHomeVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHomeVideos([]);
    }
  };

  const loadData = useCallback(async () => {
    try {
      const storedJobs = localStorage.getItem("jobsData");
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      } else {
        const jobData = await getJobs(user);
        localStorage.setItem("jobsData", JSON.stringify(jobData.data.data));
        setJobs(jobData.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setFailedAuth(true);
      setJobs([]);
    }
  }, [authToken, setFailedAuth]);

  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
      setJobs([]);
      return;
    }
    loadData();
  }, [authToken, loadData, setFailedAuth]);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  if (failedAuth) {
    return (
      <>
        <main>
          <section className="home__login">
            <div className="home__navigate">
              <Link className="home__message" to={"/"}>
                <Button text="Register / Login" />
              </Link>
            </div>
            <h2 className="home__title">Why Higher?</h2>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: -100, scale: 1.1 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="home__video"
            >
              <Video url={url} />
            </motion.div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="home">
        <JobsList jobs={jobs} />

        <VideosList fetchAllVideos={fetchAllVideos} videos={homeVideos} />
      </main>
    </>
  );
}
