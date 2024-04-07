import React from "react";

export default function VideoCard({ url, channel, title }) {
  return (
    <>
     <h2>{title}</h2>
      <h2>{channel}</h2>
      <video width="320" height="240" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
