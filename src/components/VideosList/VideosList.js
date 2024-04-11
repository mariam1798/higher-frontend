import { v4 as uuidv4 } from "uuid";
import VideoCard from "../../components/VideoCard/VideoCard";
import { editLikes } from "../../utils/axios";

export default function VideosList({ setVideos, videos }) {
  const updateVideo = async (id) => {
    try {
      const response = await editLikes(id);
      console.log(response);
      const { data } = response;
      setVideos(data);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };
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
            updateVideo={updateVideo}
          />
        ))}
    </section>
  );
}
