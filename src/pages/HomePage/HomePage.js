import { getProfile, getJobs, getVideos } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import React, { useEffect, useState } from "react";
import VideosList from "../../components/VideosList/VideosList";
import "./HomePage.scss";
import { useAuth } from "../../Context/UseAuth";
import Loader from "../../Motion/Loader/Loader";
import { Link } from "react-router-dom";
import Video from "../../components/Video/Video";
import url from "../../assets/video/why.mp4";
import { motion } from "framer-motion";

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
      <>
        <main>
          <section className="home__login">
            <Link className="home__message" to={"/"}>
              <p className="home__error">💜Please Register or login💜</p>
            </Link>
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
