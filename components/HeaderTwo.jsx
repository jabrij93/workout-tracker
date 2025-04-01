import { useState, useEffect } from 'react';
import GridCalendar from '../components/GridCalendar.jsx';
import Notification  from '../components/Notification.jsx';
import WorkoutForm from "./WorkoutForm";

const HeaderTwo = ({ createWorkout, setNotification, setNotificationType, notification, notificationType, totalWorkouts, calendarData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* Modal */
  const openModal = () => {
    console.log('NEW + clicked! ')
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
      <div className="header-two">
        <div style={{ marginLeft: "15px", marginTop: "-20px", paddingBottom: "20px" }}>
          {notification && <Notification notification={notification} type={notificationType} />}
          
          <div className="header">
            <p>{totalWorkouts} Workouts/Activities in the last year</p>
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
  
          <GridCalendar calendarData={calendarData} />
          <br /> 
        </div>
      </div>
    );
  };
  
export default HeaderTwo;