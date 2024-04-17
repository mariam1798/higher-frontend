import { v4 as uuidv4 } from "uuid";
import VideoCard from "../../components/VideoCard/VideoCard";
import "./VideoList.scss";
import { PropagateLoader } from "react-spinners";

export default function VideosList({ fetchAllVideos, setVideos, videos }) {
  if (!videos) {
    return <PropagateLoader />;
  }
  return (
    <section className="videos">
      {videos &&
        videos
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((video) => (
            <VideoCard
              key={uuidv4()}
              title={video.title}
              channel={video.channel}
              description={video.description}
              timestamp={video.timestamp}
              url={`${process.env.REACT_APP_API_BASE_URL}/${video.url}`}
              videoId={video.id}
              likes={video.likes}
              setVideos={setVideos}
              fetchAllVideos={fetchAllVideos}
              userId={video.user_id}
              index={video.id}
              avatar={`${process.env.REACT_APP_API_BASE_URL}/${video.avatar}`}
            />
          ))}
    </section>
  );
}
