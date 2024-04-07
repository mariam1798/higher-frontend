import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard/VideoCard";
import { v4 as uuidv4 } from "uuid";

export default function UserPage() {
  const [videos, setVideos] = useState(null);
  const getvideos = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/videos`
      );
      setVideos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getvideos();
  }, []);
  if (!videos) {
    return <p>loading</p>;
  }
  console.log(videos.channel);
  return (
    <>
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
    </>
  );
}
