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
import Button from "../../Motion/Button/Button";

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
  }, [user, setVideos]);

  if (!user || failedAuth) {
    return (
      <>
        <main>
          <section className="home__login">
            <div className="home__navigate">
              <Link className="home__message" to={"/"}>
                <Button text="Higher Me" />
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
      <main className="user">
        <div className="user__container">
          <Upload
            avatar={`${user.avatar}`}
            id={user.id}
            setVideos={setVideos}
            user={user}
          />
          <UserProfile avatar={`${user.avatar}`} user={user} />
        </div>
        <VideosList setVideos={setVideos} videos={videos} />
      </main>
    </>
  );
}
