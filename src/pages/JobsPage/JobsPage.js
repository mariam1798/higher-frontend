import React, { useState } from "react";
import { getSearchedJobs } from "../../utils/axios";
import JobsList from "../../components/JobsList/JobsList";
import Search from "../../components/Search/Search";
import "./JobsPage.scss";
import { BeatLoader } from "react-spinners";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  const handleInputChange = (event) => {
    setSearchContent(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await getSearchedJobs(searchContent);
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="job">
      <Search
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        searchContent={searchContent}
      />
      {loading && (
        <div className="job__loader">
          <BeatLoader
            color="#896dd5"
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="job__container">
        <JobsList jobs={jobs} />
      </div>
    </section>
  );
}
