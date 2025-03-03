import React from "react";
import Workout from "./Workout";

const MainWorkout = ({ groupedWorkouts, toggleVisibility, visible, workoutContainer, buttonLabel }) => {
  return (
    <div className="article">
      <h3 className="project-header">Your Activities/Workouts</h3>
      <Workout
        groupedWorkouts={groupedWorkouts}
        toggleVisibility={toggleVisibility}
        visible={visible}
        workoutContainer={workoutContainer}
        buttonLabel={buttonLabel}
      />
    </div>
  );
};

export default MainWorkout;