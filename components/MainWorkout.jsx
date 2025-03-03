import React from "react";
import Workout from "./Workout";

const MainWorkout = ({ groupedWorkouts, toggleVisibility, visible, workoutContainer, buttonLabel }) => {
  return (
    <div className="article">
      <h3 className="project-header">Your Activities/Workouts</h3>
      {Object.keys(groupedWorkouts).map((monthYear) => (
        <div className="card-container" key={monthYear}>
          <div>
            <h2>{monthYear}</h2>
            <Workout
              groupedWorkouts={groupedWorkouts[monthYear]}  // Pass only the workouts for the current monthYear
              toggleVisibility={toggleVisibility}
              visible={visible}
              workoutContainer={workoutContainer}
              buttonLabel={buttonLabel}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainWorkout;