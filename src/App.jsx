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



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [calendarData, setCalendarData] = useState({});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [workouts, setWorkouts] = useState([]);
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

  // Hover over to X and Logout Button
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredX, setIsHoveredX] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseEnterX = () => setIsHoveredX(true);
  const handleMouseLeaveX = () => setIsHoveredX(false);

  const sortedWorkouts = workouts.filter((workout) => workout.user?.username === user.username)
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

  console.log('groupedWorkouts', groupWorkouts);

  const sortedMonths = Object.keys(groupWorkouts).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
  
    return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`);
  });
  
  // Fetch workouts data by MonthYear

  const totalWorkouts = sortedWorkouts.length;

  

  const addWorkout = (workoutObject) => {
    workoutService
      .create(workoutObject)
      .then(returnedWorkout => {
        setWorkouts(workouts.concat(returnedWorkout))
      })
  }

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

  return (
    <div>
      <h1>Workout Tracker</h1>
      <Notification message={errorMessage} />
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
      {notification && (
        <Notification notification={notification} type={notificationType} />
      )}
  
      {/* Hamburger Button */}
      <div className="wotrack-logo">
          <TopLeftHeader handleHamburgerClick={handleHamburgerClick} />
          <SearchBar />
      </div>

      <LeftSidebar
        isModalOpen={isModalOpen}
        createWorkout={addWorkout}
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
        calendarData={calendarData}
      />
  
      {/* Main Content */}
      <div className="main-content">
        <div className="article">
            <h3 className="project-header">Your Activities/Workouts</h3>
            {Object.keys(groupWorkouts).map((monthYear) => (
              <div className="card-container" key={monthYear}>
                <div>
                  <h2>{monthYear}</h2>
                  <Workout
                    groupedWorkouts={groupWorkouts[monthYear]}
                    toggleVisibility={toggleVisibility}
                    visible={visible}
                    workoutContainer={workoutContainer}
                    buttonLabel="See more"
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
