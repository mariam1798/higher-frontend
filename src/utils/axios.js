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
      "X-RapidAPI-Key": "d408c1a267msh1753d6712635f0bp1f5161jsn94d87a53c5c3",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  return axios.request(options);
};

export { getProfile, getJobs };
