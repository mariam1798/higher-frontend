import React, { useState } from "react";
import { getSearchedJobs } from "../utils/axios";
import JobsList from "../components/JobsList/JobsList";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchContent, setSearchContent] = useState("");

  const handleInputChange = (event) => {
    setSearchContent(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await getSearchedJobs(searchContent);
      console.log(data.data);
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  return (
    <section className="search">
      <div className="search__container">
        <div className="search__top">
          <form onSubmit={handleFormSubmit} className="search__wrap">
            <input
              className="search__bar"
              placeholder="SEARCH"
              name="search"
              onChange={handleInputChange}
              value={searchContent}
            ></input>
            <button className="search__submit">Submit</button>
          </form>
        </div>
      </div>
      <JobsList jobs={jobs} />
    </section>
  );
}
