import logo from './logo.svg';
import { useState,useEffect } from 'react';
import axios from 'axios';
import workoutService from './services/workouts'
import GridCalendar from '../components/GridCalendar.jsx';
import { Notification } from '../components/Notification';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import dayjs from 'dayjs';

const WoTrack = ({ createWorkout, user, isLoggedIn, setIsLoggedIn }) => {
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([]);
  console.log('workout', workout)
  const [newWorkout, setNewWorkout] = useState('');
  const [newWorkoutDate, setNewWorkoutDate] = useState(''); 
  const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    workoutService
      .getAll()
      .then(response=> {
      console.log("backend response", response.data)
      setWorkout(response.data);

      const workoutByDate = {};
      response.data.forEach((item) => {
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

    setNotification(`successfully added ${newWorkout} !`)
    setNotificationType('success');

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification('');
    }, 5000); 
  }

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
      {notification && <Notification notification={notification} type={notificationType}/> }

      {isLoading && <p>Loading...</p>}

      <div className="wo-track-container">
        { isLoggedIn && <div className="user-loggedIn"> {user.name} is logged-in </div> }
        <div className='user-logout'>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
      
      <div className="wo-track-main">
        <h1> Workout Tracker !</h1>
        
        {/* <CalendarGrid calendarData={calendarData} /> */}
        <GridCalendar calendarData={calendarData} />
        <br/>

        <div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={newWorkout} 
              onChange={(e)=>setNewWorkout(e.target.value)}   
              placeholder='Insert your workout'
            />
            <ReactDatePicker 
              selected={newWorkoutDate} 
              onChange={(date) => setNewWorkoutDate(date)} 
              dateFormat="dd-MM-yyyy" // Ensure consistent date format
              placeholderText="Select a date" 
            />
            <input 
              type="text" 
              value={newWorkoutDetail} 
              onChange={(e)=>setNewWorkoutDetail(e.target.value)} 
              placeholder='Details(optional)'
            />
            <button type="submit"> Add Workout </button>
          </form>
        </div>
      </div>

        <div className="main-content" >
            <div className="article">
              <div className="card-container">
                {workout.map((workoutItem, index) => {
                  console.log(`Rendering workout ${index + 1}:`, workoutItem);
                    return (
                      <div className="card" key={workoutItem.id || index}>
                        <p className="title">WORKOUT: {workoutItem?.workouts}</p>
                        <p>LIKES: {workoutItem?.likes}</p>
                        <span>
                          <button onClick={() => handleLike(workoutItem.id)}>LIKE</button>
                        </span>
                      </div>
                    );
                })}
              </div>
            </div>   
        </div>
    </div>
  )
}

export default WoTrack;