import { Link } from "react-router-dom";
import VideosList from "../../components/VideosList/VideosList";
import "./UserPage.scss";
import UserProfile from "../../components/UserProfile/UserProfile";
import Upload from "../../components/Upload/Upload";
import { useAuth } from "../../Context/UseAuth";
import { useEffect } from "react";
import { fetchVideos } from "../../utils/axios";

export default function UserPage() {
  const { user, videos, failedAuth, setVideos } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      const fetchVideosForUser = async () => {
        try {
          const videosData = await fetchVideos(user.id);
          setVideos(videosData.data);
        } catch (error) {
          console.error("Failed to fetch videos:", error);
        }
      };
      fetchVideosForUser();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (failedAuth) {
    return (
      <main className="Profile">
        <Link className="home__error" to={"/"}>
          <p>Please Log in or Register</p>
        </Link>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="user">
        <p>Loading...</p>
      </main>
    );
  }
  if (!videos) {
    return <p>LOading..</p>;
  }

  return (
    <>
      <main className="user">
        <div className="user__container">
          <Upload
            avatar={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`}
            id={user.id}
            setVideos={setVideos}
            user={user}
          />
          <UserProfile
            avatar={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`}
            user={user}
          />
        </div>
        <VideosList setVideos={setVideos} videos={videos} />
      </main>
    </>
  );
}
