import { Link } from "react-router-dom";
import VideosList from "../../components/VideosList/VideosList";
import "./UserPage.scss";
import UserProfile from "../../components/UserProfile/UserProfile";
import Upload from "../../components/Upload/Upload";
import { useAuth } from "../../Context/UseAuth";
import { useCallback, useEffect } from "react";
import { fetchVideos } from "../../utils/axios";
import Video from "../../components/Video/Video";
import url from "../../assets/video/why.mp4";
import { motion } from "framer-motion";
import Button from "../../Motion/Button/Button";

export default function UserPage() {
  const { user, videos, failedAuth, setVideos } = useAuth();

  const fetchVideosForUser = useCallback(async () => {
    if (user && user.id) {
      try {
        const videosData = await fetchVideos(user.id);
        setVideos(videosData.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }
  }, [user, setVideos]);

  useEffect(() => {
    fetchVideosForUser();
  }, [fetchVideosForUser]);

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
              <Video
                title="AI actors speaking about theit eperience with higher"
                url={url}
              />
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
        {videos.length === 0 ? (
          <>
            <p className="user__message">
              No videos to be seen, upload your first video by clicking on
              Upload Video.
            </p>
          </>
        ) : (
          <VideosList
            fetchAllVideos={fetchVideosForUser}
            setVideos={setVideos}
            videos={videos}
          />
        )}
      </main>
    </>
  );
}
