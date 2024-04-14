import React from "react";
import "./Search.scss";
import Button from "../../Motion/Button/Button";

export default function Search({
  handleInputChange,
  handleFormSubmit,
  searchContent,
}) {
  return (
    <section className="search">
      <form onSubmit={handleFormSubmit} className="search__form">
        <div className="search__top">
          <input
            className="search__bar"
            placeholder="SEARCH"
            name="search"
            onChange={handleInputChange}
            value={searchContent}
          ></input>
        </div>
        <div className="search__bottom">
          <Button text="Search" />
        </div>
      </form>
    </section>
  );
}
