import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import { editLikes } from "../../utils/axios";
import Video from "../Video/Video";
import { useAuth } from "../UseContext/UseContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function VideoCard({
  fetchAllVideos,
  likes,
  videoId,
  url,
  channel,
  title,
  userId,
  index,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleChannelClick = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  const isLoggedInUser = userId === user?.id;
  const updateVideo = async (videoId) => {
    console.log("Updating likes for video ID:", videoId);
    if (isLoggedInUser) {
      return;
    }

    try {
      await editLikes(videoId);
      await fetchAllVideos();
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? 50 : -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: true }}
        className="video__card"
      >
        <Video url={url} />
        <div className="video__text">
          <h2 className="video__title">{title}</h2>
          <h2 onClick={handleChannelClick} className="video__name">
            {channel}
          </h2>
          <div className="video__increment">
            <h3 className="video__number">{likes}</h3>
            <img
              onClick={() => updateVideo(videoId)}
              src={likeIcon}
              alt=""
              className={`video__like ${
                isLoggedInUser ? "video__like--disabled" : ""
              }`}
            />
          </div>
        </div>
      </motion.section>
    </>
  );
}
