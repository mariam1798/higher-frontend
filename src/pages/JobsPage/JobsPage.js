import React, { useState } from "react";
import { getSearchedJobs } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import Search from "../../components/Search/Search";
import "./JobsPage.scss";

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
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  return (
    <section className="job">
      <Search
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        searchContent={searchContent}
      />
      <div className="job__container">
        <JobsList jobs={jobs} />
      </div>
    </section>
  );
}
