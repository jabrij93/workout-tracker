import React from "react";

const DashboardTwo = ({ isHovered, handleMouseEnter, handleMouseLeave, handleLogout }) => {
  return (
    <div className="feature-two" style={{ marginTop: "45px" }}>
      <ul>
        <MenuItem imgSrc="images/settingslogo.svg" label="Settings" />
        <MenuItem imgSrc="images/supportlogo.svg" label="Support" />
        <div
          className="feature-two-logo"
          style={{
            width: "20px",
            marginTop: "90px",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src="images/logout.svg" alt="" style={{ width: "20px" }} />
          <div className="feature-two-separate">
            <li onClick={handleLogout}>Logout</li>
          </div>
        </div>
      </ul>
    </div>
  );
};

const MenuItem = ({ imgSrc, label }) => (
  <div className="feature-two-logo">
    <img src={imgSrc} alt="" style={{ width: "20px" }} />
    <div className="feature-two-separate">
      <li>{label}</li>
    </div>
  </div>
);

export default DashboardTwo;