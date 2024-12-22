import { useState,useEffect } from 'react';
import axios from 'axios';
import workoutService from '../src/services/workouts.js'
import GridCalendar from './GridCalendar.jsx';
import { Notification } from './Notification.jsx';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import dayjs from 'dayjs';
import Togglable from './Togglable.jsx'

const WoTrack2 = ({ createWorkout, user, isLoggedIn, setIsLoggedIn, buttonLabel }) => {
  const [count, setCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workout, setWorkout] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [newWorkoutDate, setNewWorkoutDate] = useState(''); 
  const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState({});

  // Show details button
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

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

  const sortedWorkouts = workout.filter((workout) => workout.user.username === user.username)
                .slice()
                .sort((a, b) => {
                  const dateA = new Date(a.date.split('-').reverse().join('-'));
                  const dateB = new Date(b.date.split('-').reverse().join('-'));
                  return dateB - dateA; // Sort descending
                });

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
    workoutService
      .getAll()
      .then(response=> {
      const userWorkouts = response.data.filter((item) => item.user?.username === user.username);
      setWorkout(userWorkouts);
      
      const workoutByDate = {};
  
      userWorkouts.forEach((item) => {
        const date = item.date; // Assuming each item has a 'date' field
        if (date) {
          workoutByDate[date] = (workoutByDate[date] || 0) + 1; // Count workouts for each date
        } else {
          console.warn('Workout missing date:' , item)
        }
      });
      setCalendarData(workoutByDate);
  })}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (newWorkout.trim() === '') return;
  
    // Default to today's date if no date is selected
    const selectedDate = newWorkoutDate || new Date(); 

    const formattedDate = dayjs(selectedDate).format('DD-MM-YYYY'); // Matches GridCalendar
  
    createWorkout({
      workouts: newWorkout,
      date: formattedDate,
      detail: newWorkoutDetail,
      likes: 0,
    })
  
    setNewWorkout('');
    setNewWorkoutDate('');
    setNewWorkoutDetail('');
    closeModal();

    setNotification(`Successfully added ${newWorkout} !`)
    setNotificationType('success');

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification('');
    }, 5000); 
  }

  /* Add Workout Modal */
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
        <button className="hamburger" id="hamburgerButton" onClick={handleHamburgerClick} > ☰ </button>
        <img
          src="images/wotrack-logo.jpeg"
          alt="Wotrack Logo"
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
        />
        <h4>Dashboard</h4>
        
        <div className="search-bar">
          <img
            src="images/searchlogo.svg"
            alt="Search Icon"
            className="searchlogo"
            style={{ width: "25px", height: "25px" }}
          />
          <div className="search-container">
            <input type="search" className="search" />
          </div>
        </div>
      </div>
  
      <div className="leftbar">
        <div className="first-header">
          <h2>Workouts</h2>
          <button className="new" onClick={openModal}>NEW +</button>

          {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={closeModal}>&times;</span>
                          <div className="add-workout">
                              <form onSubmit={handleSubmit}>
                                  <input 
                                      type="text" 
                                      value={newWorkout} 
                                      onChange={(e) => setNewWorkout(e.target.value)}   
                                      placeholder='Insert your workout'
                                  />
                                  <ReactDatePicker 
                                      selected={newWorkoutDate} 
                                      onChange={(date) => setNewWorkoutDate(date)} 
                                      dateFormat="dd-MM-yyyy" 
                                      placeholderText="Select a date" 
                                  />
                                  <input 
                                      type="text" 
                                      value={newWorkoutDetail} 
                                      onChange={(e) => setNewWorkoutDetail(e.target.value)} 
                                      placeholder='Details(optional)'
                                  />
                                  <button className="submit" type="submit"> Add Workout </button>
                              </form>
                          </div>
                    </div>
                </div>
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
  
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <button className="close" onClick={handleCloseClick} style={{
                        transform: isHoveredX ? "scale(1.2)" : "scale(1)",
                        transition: "transform 0.3s ease"
                    }} onMouseEnter={handleMouseEnterX}
                    onMouseLeave={handleMouseLeaveX} > ✖ </button>
        {/* Sidebar content */}
        <div className="dashboard">
                <img src="images/dashboardlogo.svg" alt="" style={{ width: "48px" }} />
                <div className="dashboard-separate">
                    <p>Dashboard</p>
                </div>
            </div>

            <div className="feature-one">
                <ul className="feature-one-gap">
                    <div className="feature-one-logo">
                        <img src="images/homelogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-one-separate">
                            <li>Home</li>
                        </div>
                    </div>

                    <div className="feature-one-logo">
                        <img src="images/profilelogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-one-separate">
                            <li>Profile</li>
                        </div>
                    </div>

                    <div className="feature-one-logo">
                        <img src="images/messagelogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-one-separate">
                            <li>Messages</li>
                        </div>
                    </div>

                    <div className="feature-one-logo">
                        <img src="images/historylogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-one-separate">
                            <li>History</li>
                        </div>
                    </div>

                    <div className="feature-one-logo">
                        <img src="images/tasklogo.svg" alt="" style={{ width: "20px" }}/>
                        <div className="feature-one-separate">
                            <li>Task</li>
                        </div>
                    </div>

                    <div className="feature-one-logo">
                        <img src="images/communitylogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-one-separate">
                            <li>Communities</li>
                        </div>
                    </div>

                    
                </ul>
            </div>

            <div className="feature-two" style={{ marginTop:"45px" }}>
                <ul>
                    <div className="feature-two-logo">
                        <img src="images/settingslogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-two-separate">
                            <li>Settings</li>
                        </div>
                    </div>

                    <div className="feature-two-logo">
                        <img src="images/supportlogo.svg" alt="" style={{ width: "20px" }} />
                        <div className="feature-two-separate">
                            <li>Support</li>
                        </div>
                    </div>

                    <div className="feature-two-logo" style={{
                        width: "20px",
                        marginTop: "90px",
                        transform: isHovered ? "scale(1.2)" : "scale(1)",
                        transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} >
                        <img src="images/logout.svg" alt="" style={{ width: "20px" }}  />
                        <div className="feature-two-separate">
                            <li onClick={handleLogout}>Logout</li>
                        </div>
                    </div>
                </ul>
            </div>
      </div>
  
      {/* Header */}
      <div className="header-one">
        <div className="user">
          <div className="notification">
            <img
              src="images/notificationlogo.svg"
              alt="Notification Icon"
              style={{ width: "20px", marginTop:"15px" }}
            />
          </div>
          <div className="profilephoto">
            <img
              src="images/profilephoto1.jpg"
              alt="Profile"
              style={{ width: "40px", borderRadius: "50%" }}
            />
          </div>
          <div className="username" style={{ marginTop:"-10px" }} >
            <p style={{ fontSize: "14px", lineHeight:"0" }}>Welcome back,</p>
            { isLoggedIn && <p>{user.name}</p> }
          </div>
        </div>
      </div>

      <div className="header-two">
        <div style={{ marginLeft:"15px", marginTop:"-20px", paddingBottom:"20px" }}>
            {notification && (
                <Notification notification={notification} type={notificationType} />
            )}
            <div className="header">
              <p> {totalWorkouts} Workouts/Activities in the last year </p>
              <button className="new" onClick={openModal}>NEW +</button>  
            </div>
             
            <GridCalendar calendarData={calendarData} />
            <br/> 
        </div>
      </div>

    
      {/* Main Content */}
      <div className="main-content">
        <div className="article">
          <h3 className="project-header">Your Activities/Workouts</h3>
          {Object.keys(groupedWorkouts).map((monthYear) => (
            <div className="card-container" key={monthYear}>
              <div>
                <h2>{monthYear}</h2>
                {groupedWorkouts[monthYear].map((item, index) => (
                  <div className="card" key={index}>
                    <div className="title">
                      <p>{item.workouts}</p>
                      <button onClick={() => toggleVisibility(`${monthYear}-${index}`)}>{buttonLabel}</button>
                    </div>
                    <div style={visible[`${monthYear}-${index}`] ? workoutContainer : showWhenVisible } className={`togglableContent ${
                      visible[`${monthYear}-${index}`] ? "visible" : "hidden"}`}>
                      <p className="detail">{item.detail}</p> 
                        <div className="card-features">
                          <div className="favourite">
                            <img
                              src="images/favouritelogo.svg"
                              alt="Favourite"
                              style={{ width: "18px", height: "18px" }}
                            />
                          </div>
                          <div className="view">
                            <img
                              src="images/viewlogo.svg"
                              alt="View"
                              style={{ width: "18px", height: "18px" }}
                            />
                          </div>
                          <div className="share">
                            <img
                              src="images/sharelogo.svg"
                              alt="Share"
                              style={{ width: "18px", height: "18px" }}
                            />
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="right-container">
          <div className="announcements">
            <h3 className="announcement-header">Announcement</h3>
            <div className="announcement" >
              {[
                {
                  title: "Site Maintenance",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
                },
                {
                  title: "Community Share Day",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
                },
              ].map((announcement, index) => (
                <div key={index}>
                  <h4 className="announcement-title" style={{ marginTop:"2px" }}>{announcement.title}</h4>
                  <p>{announcement.description}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
  
          <div className="trending-container">
            <h3 className="trending-header">Trending</h3>
            <div className="trending">
              {[
                {
                  username: "@regan",
                  description: "World Peace Builder",
                  img: "images/profilephoto1.jpg",
                },
                {
                  username: "@morgan",
                  description: "Super Cool Project",
                  img: "images/profilephoto3.jpg",
                },
              ].map((user, index) => (
                <div className="trending-title" key={index}>
                  <div className="profilephoto">
                    <img
                      src={user.img}
                      alt={user.username}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="users">
                    <p className="bold">
                      <strong>{user.username}</strong>
                    </p>
                    <p>{user.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WoTrack2;