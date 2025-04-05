import { useState, useEffect, useRef } from 'react';
import Login from '../components/Login.jsx';
import WoTrack2 from '../components/WoTrack2.jsx';
import Notification from '../components/Notification.jsx';
import loginService from './services/login.js';
import workoutService from '../src/services/workouts.js';
import TopLeftHeader from '../components/TopLeftHeader.jsx';
import LeftSidebar from '../components/LeftSidebar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import SearchBar from '../components/SearchBar.jsx';
import DashboardOne from '../components/DashboardOne.jsx';
import DashboardTwo from '../components/DashboardTwo.jsx';
import HeaderOne from '../components/HeaderOne.jsx';
import HeaderTwo from '../components/HeaderTwo.jsx';
import Announcement from '../components/Announcement.jsx';
import Trending from '../components/Trending.jsx';
import Workout from '../components/Workout.jsx';
import WorkoutForm from "../components/WorkoutForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [calendarData, setCalendarData] = useState({});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [sortedWorkoutLeftSidebar, setSortedWorkoutLeftSidebar] = useState([]);
  const [groupedWorkouts, setGroupedWorkouts] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setIsLoggedIn(true);
      fetchWorkouts();
    }
  }, []);

  console.log('workouts-data', workouts);

  const toggleVisibility = (key) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [key]: !prevVisible[key],
    }));
  };

  const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };

  // Fetch workouts data by MonthYear

  const fetchWorkouts = async () => {
    try {
      const workouts = await workoutService.getAll();
      setWorkouts(workouts.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  // handle Like

  
  
  // handle Like

  // Hover over to X and Logout Button
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredX, setIsHoveredX] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseEnterX = () => setIsHoveredX(true);
  const handleMouseLeaveX = () => setIsHoveredX(false);

  const sortedWorkoutsLeftSidebar = workouts.filter((workout) => workout.user?.username === user.username)
                .slice()
                .sort((a, b) => {
                  const dateA = new Date(a.date.split('-').reverse().join('-'));
                  const dateB = new Date(b.date.split('-').reverse().join('-'));
                  return dateB - dateA; // Sort descending
  });

  const groupWorkouts = workouts.reduce((acc, workout) => {
    if (workout.date) {
      const [day, month, year] = workout.date.split('-'); // Extract day, month, year
      const monthYear = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(workout);
    }
    return acc;
  }, {});

  const sortGroupedWorkouts = (groupWorkouts) => {
    return Object.keys(groupWorkouts)
      .sort((a, b) => new Date(b) - new Date(a)) // Sort months in descending order
      .reduce((sortedObj, month) => {
        sortedObj[month] = groupWorkouts[month].sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("-").map(Number);
          const [dayB, monthB, yearB] = b.date.split("-").map(Number);
          return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });
        return sortedObj;
      }, {});
  };
  
  // Example usage
  const sortedWorkouts = sortGroupedWorkouts(groupWorkouts);
  console.log("sortedWorkouts", sortedWorkouts);
  
  // Fetch workouts data by MonthYear

  const totalWorkouts = sortedWorkouts.length;

  const addWorkout = (workoutObject) => {
    workoutService
      .create(workoutObject)
      .then(returnedWorkout => {
        console.log('Workout added:', returnedWorkout); // Debugging line ✅
        setWorkouts((prevWorkouts) => [...prevWorkouts, returnedWorkout]);
      })
  }

  // Update like 
  const addLike = async (id, workoutObject) => {
    console.log('Before setWorkouts:', workouts);

    try {
      const returnedWorkout = await workoutService.update(id, workoutObject);
      setLikes(returnedWorkout.likes);
      console.log('Updated workout:', returnedWorkout);
      // setBlogs(prevBlogs => prevBlogs.map(blog => (blog.id === id ? returnedBlog : blog)));
      setWorkouts(workouts.map(workout => (workout.id === id ? returnedWorkout : workout))); // Update the state with the new blog data
      console.log('After setWorkouts:', workouts);
      setNotification({ message: `sucessfully Liked !`, type: 'success' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      const errorMessage =
      error.response?.data?.error || error.message || 'Something went wrong';
      setNotification({ message: errorMessage, type: 'error' });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  // Update like

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleHamburgerClick = () => {
    setIsSidebarOpen(true); // Open the sidebar
  };
                
  const handleCloseClick = () => {
    setIsSidebarOpen(false); // Close the sidebar
  };

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
    <div>
      <h1>Workout Tracker</h1>
      {notification && <Notification notification={notification} type={notificationType} />}
      {!isLoggedIn || !user ? (  // Ensure both conditions are checked
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        fetchWorkouts={fetchWorkouts}
      />
      ) : (
        <div className="App">
  
      {/* Hamburger Button */}
      <div className="wotrack-logo">
          <TopLeftHeader handleHamburgerClick={handleHamburgerClick} />
          <SearchBar />
      </div>

      <div className="leftbar">
      <div className="first-header">
        <h2>Workouts</h2>
        <button className="new" onClick={openModal}>NEW +</button>

        {isModalOpen && (
          <WorkoutForm 
            closeModal={closeModal} 
            createWorkout={addWorkout} 
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
          {Object.values(sortedWorkouts).flat().map((item, index) => (
            <li key={index}>{item.workouts}</li>
          ))}
        </ul>
        <p>Show more...</p>
      </div>
    </div>
  
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
        setNotification={setNotification} 
        setNotificationType={setNotificationType} 
        totalWorkouts={totalWorkouts}
        calendarData={calendarData}
        createWorkout={addWorkout}
      />
  
      {/* Main Content */}
      <div className="main-content">
        <div className="article">
            <h3 className="project-header">Your Activities/Workouts</h3>
            {Object.keys(sortedWorkouts).map((monthYear) => (
              <div className="card-container" key={monthYear}>
                <div>
                  <h2>{monthYear}</h2>
                  <Workout
                    groupedWorkouts={sortedWorkouts[monthYear]}
                    toggleVisibility={toggleVisibility}
                    visible={visible}
                    workoutContainer={workoutContainer}
                    buttonLabel="See more"
                    updatedLike={addLike} 
                  />
                </div>
              </div>
            ))}
          </div>
  
        <div className="right-container">
          <Announcement />
          <Trending />        
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default App;
