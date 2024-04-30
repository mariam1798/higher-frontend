import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, fetchVideos } from "../../utils/axios";
import VideosList from "../../components/VideosList/VideosList";
import { useAuth } from "../../Context/UseAuth";
import UserProfile from "../../components/UserProfile/UserProfile";
import "./UsersPage.scss";

export default function UsersPage() {
  const [profileUser, setProfileUser] = useState([]);
  const { setVideos, videos } = useAuth();

  const { userId } = useParams();

  const fetchUser = async (userId) => {
    try {
      const { data } = await getUser(userId);
      setProfileUser(data);
    } catch (error) {
      console.error("error displaying user", error);
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
  }, [profileUser, setVideos]);

  return (
    <main className="users">
      <div className="users__container">
        <div className="users__wrapper">
          <h2 className="users__name">{profileUser.name}'s Profile</h2>
        </div>
        <UserProfile avatar={profileUser.avatar} user={profileUser} />
        <h2 className="users__name users__name--tablet">
          {profileUser.name}'s Profile
        </h2>
      </div>
      <VideosList setVideos={setVideos} videos={videos} />
    </main>
  );
}
