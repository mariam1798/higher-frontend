import React, { useRef, useState } from "react";
import playIcon from "../../assets/icons/play.svg";
import ImageMotion from "../../Motion/ImageMotion";
import "./Video.scss";

export default function Video({ url }) {
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
    <section onClick={onVideoPress} className="player">
      <video className="player__play" loop ref={videoRef}>
        <source src={url} type="video/mp4" />
        <source src={url} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
      {!play && <ImageMotion src={playIcon} className="player__icon" />}
    </section>
  );
}
