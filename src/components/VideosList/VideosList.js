import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import VideoCard from "../../components/VideoCard/VideoCard";

export default function VideosList({ videos }) {
  return (
    <section className="video">
      {videos &&
        videos.map((video) => (
          <VideoCard
            key={uuidv4()}
            title={video.title}
            channel={video.channel}
            url={`${process.env.REACT_APP_API_BASE_URL}/${video.url}`}
            id={video.id}
          />
        ))}
    </section>
  );
}
