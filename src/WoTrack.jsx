import logo from './logo.svg';
import { useState,useEffect } from 'react';
import axios from 'axios';
import workoutService from './services/workouts'
import GridCalendar from '../components/GridCalendar.jsx';
import { Notification } from '../components/Notification';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import dayjs from 'dayjs';

const WoTrack = ({ user, isLoggedIn, setIsLoggedIn }) => {
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [newWorkoutDate, setNewWorkoutDate] = useState(''); // Default to today's date
  const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate id for every new data workout 
  const generateId = () => {
    // Generate two random lowercase letters (a-z)
    const letter1 = String.fromCharCode(
      Math.floor(Math.random() * 26) + 97 // First random letter
    );
  
    const letter2 = String.fromCharCode(
      Math.floor(Math.random() * 26) + 97 // First random letter
    );
  
    // Generate two random digits (0-9)
    const number1 = Math.floor(Math.random() * 9).toString()
    const number2 = Math.floor(Math.random() * 9).toString()
  
    // Combine the two letters and two digits
    return letter1 + number1 + letter2 + number2
  };


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
  
    const formattedDate = dayjs(newWorkoutDate).format('DD-MM-YYYY'); // Matches GridCalendar
  
    const newWorkoutData = {
      id: generateId(),
      workouts: newWorkout,
      date: formattedDate,
      detail: newWorkoutDetail,
      likes: 0,
    }
  
    // Optimistic UI update: Immediately update the workout state with the new data
    setWorkout(prevWorkouts => [...prevWorkouts, newWorkoutData]);
  
    // Start loading state
    setIsLoading(true);
  
    workoutService
      .create(newWorkoutData)
      .then(response => {
        // After the successful creation of a workout, replace the local workout state with the real data
        setWorkout(prevWorkouts =>
          prevWorkouts.map(item => item.id === newWorkoutData.id ? response.data : item)
        );
        setNotification(`added ${newWorkout} !`)
        setNotificationType('success');
      })
      .catch(error => {
        setNotification(`Error: ${error.response.data.error}`);
        setNotificationType('error');
        console.log("Error creating workout:", error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
        setNewWorkout('');
        setNewWorkoutDate('');
        setNewWorkoutDetail('');
      });
  
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
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
      

      <div className="wo-track-main">
        <h1> Workout Tracker !</h1>
        
        {/* <CalendarGrid calendarData={calendarData} /> */}
        <GridCalendar calendarData={calendarData} />
        <br/>

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

      {workout.map((workoutItem, index) => {

      return (  
        <div key={index} >
          <p>WORKOUT : {workoutItem?.workouts } </p>
          <p>LIKES : {workoutItem?.likes} </p> 
            <span> 
              <button onClick={()=>handleLike(workoutItem.id)}> 
                LIKE 
              </button> 
            </span>
        </div>
      )})}
    </div>
  )
}

export default WoTrack;