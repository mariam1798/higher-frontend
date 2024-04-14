import React, { useState } from "react";
import { getSearchedJobs } from "../utils/axios";
import JobsList from "../components/JobsList/JobsList";
import Search from "../components/Search/Search";

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
    <section className="jobs">
      <Search
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        searchContent={searchContent}
      />
      <div className="jobs__container">
        <JobsList jobs={jobs} />
      </div>
    </section>
  );
}
