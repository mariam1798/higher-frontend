import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import { editLikes } from "../../utils/axios";
import Video from "../Video/Video";
import { useAuth } from "../../Context/UseAuth";
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
  description,
  timestamp,
  avatar,
}) {
  const date = new Date(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
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
      <section className="video">
        <Video url={url} />
        <div className="video__text">
          <div className="video__top">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="video__profile"
            >
              <img
                src={avatar}
                alt="profile picture"
                className="video__avatar"
              />
              <h2 onClick={handleChannelClick} className="video__name">
                {channel}
              </h2>
            </motion.div>
            <div className="video__increment">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={() => updateVideo(videoId)}
                src={likeIcon}
                alt=""
                className={`video__like ${
                  isLoggedInUser ? "video__like--disabled" : ""
                }`}
              />
              <h3 className="video__number">{likes}</h3>
            </div>
          </div>
          <div className="video__info">
            <h2 className="video__title">{title}</h2>
            <h3 className="video__description">{description}</h3>
          </div>
          <div className="video__timestamp">
            <h3 className="video__date">{date}</h3>
          </div>
        </div>
      </section>
    </>
  );
}
