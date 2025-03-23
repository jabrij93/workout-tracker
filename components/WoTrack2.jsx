import { useState, useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar.jsx';
import Notification from '../components/Notification.jsx';
import TopLeftHeader from '../components/TopLeftHeader.jsx';
import SearchBar from '../components/SearchBar.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import DashboardOne from '../components/DashboardOne.jsx';
import DashboardTwo from '../components/DashboardTwo.jsx';
import HeaderOne from '../components/HeaderOne.jsx';
import HeaderTwo from '../components/HeaderTwo.jsx';
import Announcement from '../components/Announcement.jsx';
import Trending from '../components/Trending.jsx';

const WoTrack2 = ({ user, workouts, addWorkout, handleLogout, setGroupedWorkouts }) => {
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sort workouts by date (descending order)
  const sortedWorkouts = workouts
    .filter(workout => workout.user?.username === user.username)
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateB - dateA;
    });

  // Function to get month name
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1];
  };

  // Function to group workouts by month and year
  const groupByMonth = (workouts) => {
    return workouts.reduce((groups, workout) => {
      const [day, month, year] = workout.date.split('-');
      const key = `${getMonthName(month)} ${year}`;

      if (!groups[key]) groups[key] = [];
      groups[key].push(workout);
      return groups;
    }, {});
  };

  useEffect(() => {
    setGroupedWorkouts(groupByMonth(sortedWorkouts));

    // Prepare calendar data
    const workoutByDate = {};
    workouts.forEach((item) => {
      const date = item.date;
      if (date) {
        workoutByDate[date] = (workoutByDate[date] || 0) + 1;
      }
    });
    setCalendarData(workoutByDate);
  }, [workouts, setGroupedWorkouts]);

  return (
    <div className="App">
      {notification && <Notification notification={notification} type={notificationType} />}

      <div className="wotrack-logo">
        <TopLeftHeader handleHamburgerClick={() => setIsSidebarOpen(true)} />
        <SearchBar />
      </div>

      <LeftSidebar
        createWorkout={addWorkout}
        setNotification={setNotification}
        setNotificationType={setNotificationType}
        sortedWorkouts={sortedWorkouts}
      />

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <DashboardHeader handleCloseClick={() => setIsSidebarOpen(false)} />
        <DashboardOne />
        <DashboardTwo handleLogout={handleLogout} />
      </div>

      <HeaderOne isLoggedIn={true} user={user} />
      <HeaderTwo notification={notification} notificationType={notificationType} calendarData={calendarData} />

      <div className="right-container">
        <Announcement />
        <Trending />
      </div>
    </div>
  );
};

export default WoTrack2;










// OLD ONE - WORKING
// OLD ONE - WORKING
// OLD ONE - WORKING


// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import GridCalendar from '../components/GridCalendar.jsx';
// import Notification from '../components/Notification.jsx';
// import Togglable from '../components/Togglable.jsx';
// import WorkoutForm from "../components/WorkoutForm.jsx";
// import Workout from "./Workout";
// import MainWorkout from "../components/MainWorkout.jsx"; 
// import Announcement from '../components/Announcement.jsx';
// import Trending from '../components/Trending.jsx';
// import TopLeftHeader from '../components/TopLeftHeader.jsx';
// import LeftSidebar from '../components/LeftSidebar.jsx';
// import DashboardHeader from '../components/DashboardHeader.jsx';
// import DashboardOne from '../components/DashboardOne.jsx';
// import DashboardTwo from '../components/DashboardTwo.jsx';
// import SearchBar from '../components/SearchBar.jsx';
// import HeaderOne from '../components/HeaderOne.jsx';
// import HeaderTwo from '../components/HeaderTwo.jsx';
// import workoutService from '../src/services/workouts.js'


// const WoTrack2 = ({ user, isLoggedIn, addWorkout, workouts, handleLogout }) => {
//   const [count, setCount] = useState(0);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [calendarData, setCalendarData] = useState({});
//   const [notification, setNotification] = useState('');
//   const [notificationType, setNotificationType] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [visible, setVisible] = useState({});
  
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   console.log("workouts-have data?", workouts)

//   const toggleVisibility = (key) => {
//     setVisible((prevVisible) => ({
//       ...prevVisible,
//       [key]: !prevVisible[key],
//     }));
//   };

//   const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };

//   // Show details button finish

//   // Hover over to X and Logout Button
//   const [isHovered, setIsHovered] = useState(false);
//   const [isHoveredX, setIsHoveredX] = useState(false);
//   const handleMouseEnter = () => setIsHovered(true);
//   const handleMouseLeave = () => setIsHovered(false);
//   const handleMouseEnterX = () => setIsHoveredX(true);
//   const handleMouseLeaveX = () => setIsHoveredX(false);

//   const sortedWorkouts = workouts.filter((workout) => workout.user?.username === user.username)
//                 .slice()
//                 .sort((a, b) => {
//                   const dateA = new Date(a.date.split('-').reverse().join('-'));
//                   const dateB = new Date(b.date.split('-').reverse().join('-'));
//                   return dateB - dateA; // Sort descending
//   });

//   // Function to convert month numbers to month names
//   const getMonthName = (monthNumber) => {
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     return monthNames[monthNumber - 1]; // Month is 0-indexed
//   };

//   // Function to group workouts by month and year
//   const groupByMonth = (workouts) => {
//     return workouts.reduce((groups, workout) => {
//       const [day, month, year] = workout.date.split('-'); // Extract day, month, year
//       const key = `${getMonthName(month)} ${year}`; // Format as 'Month Year'
      
//       if (!groups[key]) groups[key] = []; // Initialize group
//       groups[key].push(workout);
//       return groups;
//     }, {});
//   };
  
//   const groupedWorkouts = groupByMonth(sortedWorkouts);
  
//   const totalWorkouts = sortedWorkouts.length;

//   const handleHamburgerClick = () => {
//     setIsSidebarOpen(true); // Open the sidebar
//   };
                
//   const handleCloseClick = () => {
//     setIsSidebarOpen(false); // Close the sidebar
//   };
  
//   useEffect(() => {
//     const workoutByDate = {};
  
//     workouts.forEach((item) => {
//       const date = item.date; // Assuming each item has a 'date' field
//       if (date) {
//         workoutByDate[date] = (workoutByDate[date] || 0) + 1; // Count workouts for each date
//       } else {
//         console.warn('Workout missing date:', item);
//       }
//     });
  
//     setCalendarData(workoutByDate);
//   }, [workouts]); // Re-run this effect when `workouts` changes
  
//   return (
//     <div className="App">
//       {notification && (
//         <Notification notification={notification} type={notificationType} />
//       )}
//       {isLoading && <p>Loading...</p>}
  
//       {/* Hamburger Button */}
//       <div className="wotrack-logo">
//           <TopLeftHeader handleHamburgerClick={handleHamburgerClick} />
//           <SearchBar />
//       </div>

//       <LeftSidebar
//         isModalOpen={isModalOpen}
//         createWorkout={addWorkout}
//         setNotification={setNotification}
//         setNotificationType={setNotificationType}
//         sortedWorkouts={sortedWorkouts}
//       />
  
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
//             <DashboardHeader
//               handleCloseClick={handleCloseClick}
//               isHoveredX={isHoveredX}
//               handleMouseEnterX={handleMouseEnterX}
//               handleMouseLeaveX={handleMouseLeaveX}
//             />
//             <DashboardOne />
//             <DashboardTwo 
//               isHovered={isHovered} 
//               handleMouseEnter={handleMouseEnter} 
//               handleMouseLeave={handleMouseLeave} 
//               handleLogout={handleLogout} 
//             />
//       </div>
  
//       {/* Header */}
//       <HeaderOne 
//         isLoggedIn={isLoggedIn} 
//         user={user} 
//       />

//       <HeaderTwo
//         notification={notification}
//         notificationType={notificationType}
//         totalWorkouts={totalWorkouts}
//         calendarData={calendarData}
//       />
  
//       {/* Main Content */}
//       <div className="main-content">
//         <div className="article">
//             <h3 className="project-header">Your Activities/Workouts</h3>
//             {Object.keys(groupedWorkouts).map((monthYear) => (
//               <div className="card-container" key={monthYear}>
//                 <div>
//                   <h2>{monthYear}</h2>
//                   <Workout
//                     groupedWorkouts={groupedWorkouts[monthYear]}
//                     toggleVisibility={toggleVisibility}
//                     visible={visible}
//                     workoutContainer={workoutContainer}
//                     buttonLabel="See more"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
  
//         <div className="right-container">
//           <Announcement />
//           <Trending />        
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WoTrack2;