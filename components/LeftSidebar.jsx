import { useState, useEffect } from 'react';
import WorkoutForm from "./WorkoutForm";

const LeftSidebar = ({ createWorkout, setNotification, setNotificationType, sortedWorkouts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* Modal */
  const openModal = () => {
   
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    if (isModalOpen) {
        window.addEventListener('keydown', handleKeyDown);
    } else {
        window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
      
  }, [isModalOpen]);
  /* Modal */

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
