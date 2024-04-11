import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";
import { editLikes, fetchVideos } from "../../utils/axios";
import Video from "../Video/Video";

export default function VideoCard({
  likes,
  id,
  url,
  channel,
  title,
  setVideos,
  setLikes,
}) {
  const updateVideo = async (id) => {
    try {
      await editLikes(id);
      setLikes(true);
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
              onClick={() => updateVideo(id)}
              src={likeIcon}
              alt=""
              className="video__like"
            />
          </div>
        </div>
      </section>
    </>
  );
}
