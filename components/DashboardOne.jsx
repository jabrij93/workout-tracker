import React from "react";

const DashboardOne = () => {
  const menuItems = [
    { imgSrc: "images/homelogo.svg", label: "Home" },
    { imgSrc: "images/profilelogo.svg", label: "Profile" },
    { imgSrc: "images/messagelogo.svg", label: "Messages" },
    { imgSrc: "images/historylogo.svg", label: "History" },
    { imgSrc: "images/tasklogo.svg", label: "Task" },
    { imgSrc: "images/communitylogo.svg", label: "Communities" },
  ];

  return (
    <div className="feature-one">
      <ul className="feature-one-gap">
        {menuItems.map((item, index) => (
          <MenuItem key={index} imgSrc={item.imgSrc} label={item.label} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ imgSrc, label }) => (
  <div className="feature-one-logo">
    <img src={imgSrc} alt="" style={{ width: "20px" }} />
    <div className="feature-one-separate">
      <li>{label}</li>
    </div>
  </div>
);

export default DashboardOne;
