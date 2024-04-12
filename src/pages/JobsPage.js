import React, { useState } from "react";
import { getSearchedJobs } from "../utils/axios";
import JobsList from "../components/JobsList/JobsList";

export default function JobsPage() {
  const [results, setResults] = useState([]);
  const [searchContent, setSearchContent] = useState("");

  const handleInputChange = (event) => {
    setSearchContent(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await getSearchedJobs(searchContent);
  };

  return (
    <section className="search">
      <div className="search__container">
        <div className="search__top">
          <form className="search__wrap">
            <input
              className="search__bar"
              placeholder="SEARCH"
              name="search"
              onChange={handleInputChange}
              value={searchContent}
            ></input>
            <button onSubmit={handleFormSubmit} className="search__submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <JobsList />
    </section>
  );
}
