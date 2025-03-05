import { useState,useEffect } from 'react';
import axios from 'axios';
import workoutService from './services/workouts.js'
import GridCalendar from '../components/GridCalendar.jsx';
import { Notification } from '../components/Notification.jsx';
import Togglable from '../components/Togglable.jsx';
import WorkoutForm from "../components/WorkoutForm.jsx";
import MainWorkout from "../components/MainWorkout.jsx"; 
import Announcement from '../components/Announcement.jsx';
import Trending from '../components/Trending.jsx';
import TopLeftHeader from '../components/TopLeftHeader.jsx';
import LeftSidebar from '../components/LeftSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import DashboardOne from '../components/DashboardOne.jsx';
import DashboardTwo from '../components/DashboardTwo.jsx';
import SearchBar from '../components/SearchBar.jsx';
import HeaderOne from '../components/HeaderOne.jsx';
import HeaderTwo from '../components/HeaderTwo.jsx';

const WoTrack2 = ({ createWorkout, user, isLoggedIn, setIsLoggedIn, buttonLabel }) => {
  const [count, setCount] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState({});

  // Show details button
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: 'none' };

  useEffect(() => {
    workoutService
      .getAll()
      .then((response) => {
        console.log('Fetched workouts:', response.data);
        setWorkouts(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error);
      });
  }, []);

  const toggleVisibility = (key) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [key]: !prevVisible[key],
    }));
  };

  const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };

  // Show details button finish

  // Hover over to X and Logout Button
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredX, setIsHoveredX] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseEnterX = () => setIsHoveredX(true);
  const handleMouseLeaveX = () => setIsHoveredX(false);

  console.log('workoutsss', workouts)

  const sortedWorkouts = workouts.filter((workout) => workout.user?.username === user.username)
                .slice()
                .sort((a, b) => {
                  const dateA = new Date(a.date.split('-').reverse().join('-'));
                  const dateB = new Date(b.date.split('-').reverse().join('-'));
                  return dateB - dateA; // Sort descending
                });

  console.log('sorted Workouts', sortedWorkouts)

  // Function to convert month numbers to month names
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1]; // Month is 0-indexed
  };

  // Function to group workouts by month and year
  const groupByMonth = (workouts) => {
    return workouts.reduce((groups, workout) => {
      const [day, month, year] = workout.date.split('-'); // Extract day, month, year
      const key = `${getMonthName(month)} ${year}`; // Format as 'Month Year'
      
      if (!groups[key]) groups[key] = []; // Initialize group
      groups[key].push(workout);
      return groups;
    }, {});
  };
  
  const groupedWorkouts = groupByMonth(sortedWorkouts);
  console.log('groupedWorkouts:', groupedWorkouts); 
  
  const totalWorkouts = sortedWorkouts.length;

  const handleHamburgerClick = () => {
    setIsSidebarOpen(true); // Open the sidebar
  };
                
  const handleCloseClick = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };
  
  useEffect(() => {
    const workoutByDate = {};
  
    workouts.forEach((item) => {
      const date = item.date; // Assuming each item has a 'date' field
      if (date) {
        workoutByDate[date] = (workoutByDate[date] || 0) + 1; // Count workouts for each date
      } else {
        console.warn('Workout missing date:', item);
      }
    });
  
    setCalendarData(workoutByDate);
  }, [workouts]); // Re-run this effect when `workouts` changes
           
  // useEffect(() => {
  //   workoutService
  //     .getAll()
  //     .then(response=> {
  //     const userWorkouts = response.data.filter((item) => item.user?.username === user.username);
  //     setWorkout(userWorkouts);
  //     console.log('userWorkouts', userWorkouts)

  //     const workoutByDate = {};
  
  //     userWorkouts.forEach((item) => {
  //       const date = item.date; // Assuming each item has a 'date' field
  //       if (date) {
  //         workoutByDate[date] = (workoutByDate[date] || 0) + 1; // Count workouts for each date
  //       } else {
  //         console.warn('Workout missing date:' , item)
  //       }
  //     });
  //     setCalendarData(workoutByDate);
  // })}, []);

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

  const handleLike = (id) => {
    // Find and update the specific item directly
    const updatedItem = workout.find((item) => item.id === id);
      if (updatedItem) {
        const updatedItemWithLike = {...updatedItem, likes:Number(updatedItem.likes + 1)};

      axios.put(`http://localhost:3001/workoutData/${id}`, updatedItemWithLike)
        .then(response => {
          // Update the workout array by replacing the liked item
          const updatedWorkout = workout.map((item) => 
            item.id === id ? updatedItemWithLike : item
          );
          setWorkout(updatedWorkout);
      })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    console.log('logged-out')
    window.localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false)
  }

  
  return (
    <div className="App">
      {notification && (
        <Notification notification={notification} type={notificationType} />
      )}
      {isLoading && <p>Loading...</p>}
  
      {/* Hamburger Button */}
      <div className="wotrack-logo">
          <TopLeftHeader handleHamburgerClick={handleHamburgerClick} />
          <SearchBar />
      </div>

      <LeftSidebar 
        openModal={openModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        createWorkout={createWorkout}
        setNotification={setNotification}
        setNotificationType={setNotificationType}
        sortedWorkouts={sortedWorkouts}
      />
  
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
            <DashboardHeader
              handleCloseClick={handleCloseClick}
              isHoveredX={isHoveredX}
              handleMouseEnterX={handleMouseEnterX}
              handleMouseLeaveX={handleMouseLeaveX}
            />
            <DashboardOne />
            <DashboardTwo 
              isHovered={isHovered} 
              handleMouseEnter={handleMouseEnter} 
              handleMouseLeave={handleMouseLeave} 
              handleLogout={handleLogout} 
            />
      </div>
  
      {/* Header */}
      <HeaderOne 
        isLoggedIn={isLoggedIn} 
        user={user} 
      />

      <HeaderTwo
        notification={notification}
        notificationType={notificationType}
        totalWorkouts={totalWorkouts}
        openModal={openModal}
        calendarData={calendarData}
      />

    
      {/* Main Content */}
      <div className="main-content">
        <MainWorkout
          groupedWorkouts={groupedWorkouts}
          toggleVisibility={toggleVisibility}
          visible={visible}
          workoutContainer={workoutContainer}
          showWhenVisible={showWhenVisible}
          buttonLabel={buttonLabel}
        />
  
        <div className="right-container">
          <Announcement />
          <Trending />        
        </div>
      </div>
    </div>
  );
}

export default WoTrack2;