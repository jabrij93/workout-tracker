import React from "react";
import PropTypes from "prop-types";

const HeaderOne = ({ isLoggedIn, user }) => {
  return (
    <div className="header-one">
      <div className="user">
        <div className="notification">
          <img
            src="images/notificationlogo.svg"
            alt="Notification Icon"
            className="notification-icon"
            style={{ width: "20px", marginTop: "15px" }}
          />
        </div>
        <div className="profilephoto">
          <img
            src="images/profilephoto1.jpg"
            alt="Profile"
            className="profile-photo"
            style={{ width: "40px", borderRadius: "50%" }}
          />
        </div>
        <div className="username">
            <p style={{ fontSize: "14px", lineHeight: "0" }}>Welcome back,</p>
            {isLoggedIn && <p className="user-name">{user.name}</p>}
        </div>
      </div>
    </div>
  );
};

HeaderOne.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default HeaderOne;