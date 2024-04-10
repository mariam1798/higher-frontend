import React, { useRef, useState } from "react";

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
    <video className="video__play" loop onClick={onVideoPress} ref={videoRef}>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
