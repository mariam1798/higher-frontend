import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import { editLikes } from "../../utils/axios";
import Video from "../Video/Video";
import { useAuth } from "../UseContext/UseContext";

export default function VideoCard({
  fetchAllVideos,
  likes,
  videoId,
  url,
  channel,
  title,
  userId,
}) {
  const { user } = useAuth();
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
      <section className="video__card">
        <Video url={url} />
        <div className="video__text">
          <h2 className="video__title">{title}</h2>
          <h2 className="video__name">{channel}</h2>
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
      </section>
    </>
  );
}
