import { v4 as uuidv4 } from "uuid";
import VideoCard from "../../components/VideoCard/VideoCard";

export default function VideosList({ fetchAllVideos, setVideos, videos }) {
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
            likes={video.likes}
            setVideos={setVideos}
            fetchAllVideos={fetchAllVideos}
            userId={video.user_id}
          />
        ))}
    </section>
  );
}
