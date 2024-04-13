import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, getUsers, fetchVideos } from "../../utils/axios";
import VideosList from "../../components/VideosList/VideosList";
import { useAuth } from "../../components/UseContext/UseContext";
import UserProfile from "../../components/UserProfile/UserProfile";

export default function UsersPage() {
  const [users, setUsers] = useState(null);
  const [profileUser, setProfileUser] = useState([]);
  const { setVideos, videos } = useAuth();

  const { userId } = useParams();

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUser = async (userId) => {
    try {
      const { data } = await getUser(userId);
      setProfileUser(data);
    } catch (error) {
      console.log("error displaying user", error);
      setProfileUser([]);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (profileUser && profileUser.id) {
      const fetchVideosForUser = async () => {
        try {
          const videosData = await fetchVideos(profileUser.id);
          setVideos(videosData.data);
        } catch (error) {
          console.error("Failed to fetch videos:", error);
        }
      };
      fetchVideosForUser();
    }
  }, [profileUser]);

  if (!profileUser) {
    return <p>Loading...</p>;
  }

  if (!videos) {
    return <p>LOading..</p>;
  }

  return (
    <main className="users">
      <div className="users__container">
        <UserProfile
          avatar={`${process.env.REACT_APP_API_BASE_URL}/${profileUser.avatar}`}
          user={profileUser}
        />
      </div>
      <VideosList setVideos={setVideos} videos={videos} />
    </main>
  );
}
