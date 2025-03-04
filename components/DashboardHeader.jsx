// DashboardHeader.jsx
import React from "react";

const DashboardHeader = ({ handleCloseClick, isHoveredX, handleMouseEnterX, handleMouseLeaveX }) => {
  return (
    <div className="dashboard-header">
      <button
        className="close"
        onClick={handleCloseClick}
        style={{
          transform: isHoveredX ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={handleMouseEnterX}
        onMouseLeave={handleMouseLeaveX}
      >
        ✖
      </button>
      <div className="dashboard">
        <img src="images/dashboardlogo.svg" alt="" style={{ width: "48px" }} />
        <div className="dashboard-separate">
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
