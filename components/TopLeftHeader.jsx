import React from "react";

const TopLeftHeader = ({ handleHamburgerClick }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button className="hamburger" id="hamburgerButton" onClick={handleHamburgerClick}>
        ☰
      </button>
      <img
        src="images/wotrack-logo.jpeg"
        alt="Wotrack Logo"
        style={{ width: "48px", height: "48px", borderRadius: "50%" }}
      />
      <h4>Dashboard</h4>
    </div>
  );
};

export default TopLeftHeader;
