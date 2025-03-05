import React from "react";
import WorkoutForm from "./WorkoutForm";

const LeftSidebar = ({ openModal, isModalOpen, closeModal, createWorkout, setNotification, setNotificationType, sortedWorkouts }) => {
  return (
    <div className="leftbar">
      <div className="first-header">
        <h2>Workouts</h2>
        <button className="new" onClick={openModal}>NEW +</button>

        {isModalOpen && (
          <WorkoutForm 
            closeModal={closeModal} 
            createWorkout={createWorkout} 
            setNotification={setNotification} 
            setNotificationType={setNotificationType} 
          />
        )}
      </div>

      <div className="search-workout-bar">
        <div className="search-workout-container">
          <input
            type="text"
            className="search-workout"
            placeholder="Search workouts..."
          />
        </div>
      </div>

      <h5 style={{ marginLeft: "20px" }}>Workouts / Activities</h5>
      <div className="list-workouts" style={{ marginLeft: "20px" }}>
        <ul>
          {sortedWorkouts.map((item, index) => (
            <li key={index}>{item.workouts}</li>
          ))}
        </ul>
        <p>Show more...</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
