import React, { useRef, useState } from "react";
import "./VideoCard.scss";
import higher from "../../assets/icons/logoteal.svg";

export default function VideoCard({ url, channel, title }) {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  const onVideoPress = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };
  return (
    <>
      <section className="video__card">
        <video
          className="video__play"
          loop
          onClick={onVideoPress}
          ref={videoRef}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video__text">
          <h2 className="video__title">{title}</h2>
          <h2 className="video__name">{channel}</h2>
        </div>
      </section>
      <section className="video__aside">
        <img src="" alt="" className="video__icon" />
        <img src="" alt="" className="video__icon" />
        <img src="" alt="" className="video__icon" />
        <img src="" alt="" className="video__icon" />
      </section>
    </>
  );
}
