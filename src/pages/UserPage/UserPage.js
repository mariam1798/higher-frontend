import { Link } from "react-router-dom";
import VideosList from "../../components/VideosList/VideosList";
import "./UserPage.scss";
import UserProfile from "../../components/UserProfile/UserProfile";
import Upload from "../../components/Upload/Upload";
import { useAuth } from "../../Context/UseAuth";
import { useEffect } from "react";
import { fetchVideos } from "../../utils/axios";
import Video from "../../components/Video/Video";
import url from "../../assets/video/why.mp4";
import { motion } from "framer-motion";

export default function UserPage() {
  const { user, videos, failedAuth, setVideos } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      const fetchVideosForUser = async () => {
        try {
          const videosData = await fetchVideos(user.id);
          setVideos(videosData.data);
        } catch (error) {
          console.error("Failed to fetch videos:", error);
        }
      };
      fetchVideosForUser();
    }
  }, [user]);

  if (!user) {
    return (
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
    );
  }

  if (failedAuth) {
    return (
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
    );
  }

  if (!user) {
    return (
      <main className="user">
        <p>Loading...</p>
      </main>
    );
  }
  if (!videos) {
    return <p>LOading..</p>;
  }

  return (
    <>
      <main className="user">
        <div className="user__container">
          <Upload
            avatar={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`}
            id={user.id}
            setVideos={setVideos}
            user={user}
          />
          <UserProfile
            avatar={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`}
            user={user}
          />
        </div>
        <VideosList setVideos={setVideos} videos={videos} />
      </main>
    </>
  );
}
