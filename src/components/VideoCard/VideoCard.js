import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import Video from "../Video/Video";
import { useAuth } from "../../Context/UseAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Comments from "../Comments/Comments";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { deleteVideos, editLikes, getVideo } from "../../utils/axios";
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
  fetchVideosForUser,
}) {
  const [videoLikes, setVideoLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const checkIsLiked = () => {
    const likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
    return likedVideos.includes(videoId);
  };

  useEffect(() => {
    setIsLiked(checkIsLiked());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const fetchLikes = useCallback(async () => {
    try {
      const { data } = await getVideo(videoId);
      setVideoLikes(data.likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  }, [videoId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await getVideo(videoId);
        setVideoLikes(data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [videoId]);

  const handleLike = async () => {
    if (isLoggedInUser || isLiked) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    try {
      await editLikes(videoId);
      setVideoLikes((prevLikes) => prevLikes + 1);
      setIsLiked(true);

      const likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
      localStorage.setItem(
        "likedVideos",
        JSON.stringify([...likedVideos, videoId])
      );
    } catch (error) {
      console.error("Can't update likes:", error);
    }
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
        <Video title={title} url={url} />
        {showAlert && (
          <div className="video__alert">You have already liked this video</div>
        )}
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
                onClick={handleLike}
                src={likeIcon}
                alt="like icon"
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
              <div className="video__remove">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={deleteVid}
                  src={deleteIcon}
                  alt="delete "
                  className="video__delete"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
