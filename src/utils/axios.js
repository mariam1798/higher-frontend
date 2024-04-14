import axios from "axios";

const getProfile = (token) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getJobs = (data) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: `${data.job_title}, ${data.experience_years} ${data.location}`,
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": "76116684a3msh0e5d0d6bca727d7p116071jsn89a88dd748ae",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  return axios.request(options);
};
const getSearchedJobs = async (searchQuery) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: searchQuery,
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": "76116684a3msh0e5d0d6bca727d7p116071jsn89a88dd748ae",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  return axios.request(options);
};

const fetchVideos = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/videos`);
};
const getVideos = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/videos`);
};
const editLikes = (videoId) => {
  return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/videos/${videoId}`);
};
const handleRegister = (uploadData) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/users/register`,
    uploadData
  );
};
const postLogin = (formData) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
    email: formData.email,
    password: formData.password,
  });
};
const postVideos = (uploadData, authToken) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/videos`,
    uploadData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};
const getUser = (userId) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`);
};
const getUsers = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
};

export {
  editLikes,
  fetchVideos,
  getProfile,
  getJobs,
  getVideos,
  handleRegister,
  postLogin,
  postVideos,
  getSearchedJobs,
  getUser,
  getUsers,
};
