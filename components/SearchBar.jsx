import React from "react";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <img
        src="images/searchlogo.svg"
        alt="Search Icon"
        className="searchlogo"
        style={{ width: "25px", height: "25px" }}
      />
      <div className="search-container">
        <input type="search" className="search"/>
      </div>
    </div>
  );
};

export default SearchBar;
