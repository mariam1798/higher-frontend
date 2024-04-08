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
      "X-RapidAPI-Key": "d6b6d74543mshe87ae6fb9fdd64cp1259a3jsn1af57f23fa1f",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  return axios.request(options);
};
export { getProfile, getJobs };
