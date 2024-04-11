import "./VideoCard.scss";
import likeIcon from "../../assets/icons/like.svg";

import Video from "../Video/Video";

export default function VideoCard({ id, updateVideo, url, channel, title }) {
  return (
    <>
      <section className="video__card">
        <Video url={url} />
        <div className="video__text">
          <h2 className="video__title">{title}</h2>
          <h2 className="video__name">{channel}</h2>
          <div className="video__increment">
            <h3 onClick={() => updateVideo(id)} className="video__number">
              0
            </h3>
            <img src={likeIcon} alt="" className="video__like" />
          </div>
        </div>
      </section>
    </>
  );
}
