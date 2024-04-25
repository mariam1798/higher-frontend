import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import Video from "../Video/Video";
import { useAuth } from "../../Context/UseAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Comments from "../Comments/Comments";
import { useState } from "react";
import { deleteVideos } from "../../utils/axios";
import deleteIcon from "../../assets/icons/delete.svg";

export default function VideoCard({
  videoId,
  url,
  channel,
  title,
  userId,
  description,
  timestamp,
  avatar,
  fetchAllVideos,
}) {
  const [videoLikes, setVideoLikes] = useState(0);

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

  const getLikes = () => {
    if (isLoggedInUser) {
      return;
    }
    setVideoLikes((prevVideoLikes) => prevVideoLikes + 1);
  };

  const deleteVid = async () => {
    try {
      await deleteVideos(videoId);
      fetchAllVideos();
    } catch (error) {
      console.log("Error while trying to remove the video", error);
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
              <img src={avatar} alt={channel} className="video__avatar" />
              <h2 onClick={handleChannelClick} className="video__name">
                {channel}
              </h2>
            </motion.div>
            <div className="video__increment">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={getLikes}
                src={likeIcon}
                alt=""
                className={`video__like ${
                  isLoggedInUser ? "video__like--disabled" : ""
                }`}
              />
              <h3 className="video__number">{videoLikes}</h3>
            </div>
          </div>
          <div className="video__info">
            <h2 className="video__title">{title}</h2>
            <h3 className="video__description">{description}</h3>
          </div>
          <Comments videoId={videoId} />
          <div className="video__timestamp">
            <h3 className="video__date">{date}</h3>
            {isLoggedInUser && (
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={deleteVid}
                src={deleteIcon}
                alt="delete "
                className="video__delete"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
