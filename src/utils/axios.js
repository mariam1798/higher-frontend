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
      query: `${data.job_title}, ${data.location}`,
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
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
      "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
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

const postComments = (authToken, videoId, newComment) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/comments/${videoId}`,
    newComment,

    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};

const fetchComments = (videoId) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/comments/${videoId}`);
};

const deleteComments = (authToken, commentId) => {
  return axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};
const deleteVideos = (videoId) => {
  return axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/videos/${videoId}`
  );
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
  postComments,
  fetchComments,
  deleteComments,
  deleteVideos,
};
