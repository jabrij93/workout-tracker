import logo from './logo.svg';
import { useState,useEffect } from 'react';
import axios from 'axios';
import workoutService from './services/workouts'
import GridCalendar from '../components/GridCalendar.jsx';
import { Notification } from '../components/Notification';

const WoTrack = ({ user, isLoggedIn }) => {
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([]);
  console.log("workout", workout); 
  const [newWorkout, setNewWorkout] = useState('');
  const [newWorkoutDate, setNewWorkoutDate] = useState('');
  const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  const [calendarData, setCalendarData] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');

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

      const newWorkoutData = {
        id: generateId(),
        workouts: newWorkout,
        date: newWorkoutDate,
        detail: newWorkoutDetail,
        likes: 0,
      }

      workoutService
        .create(newWorkoutData)
        .then(response => {
          setWorkout([...workout, response.data])
          setNotification(`added ${newWorkout} !`)
          setNotificationType('success')
        })
        .catch(error => {
          // Set error notification
          setNotification(`Error: ${error.response.data.error}`);
          setNotificationType('error')
          
          // Optional: Log the error for debugging purposes
          console.log("Error creating workout:", error.response.data.error);

          // Clear error notification after 5 seconds
          setTimeout(() => {
              setNotification('');
          }, 5000);
      });

      setNewWorkout('')
      setNewWorkoutDate('')
      setNewWorkoutDetail('')

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
  
  return (

    <div className="App">
      {notification && <Notification notification={notification} type={notificationType}/> }
      <div className="wo-track-container">
        { isLoggedIn && <div className="user-loggedIn"> {user.name} is logged-in </div> }
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
          <input 
            type="text" 
            value={newWorkoutDate} 
            onChange={(e)=>setNewWorkoutDate(e.target.value)} 
            placeholder='Date(optional. If empty, date will default by today)'
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
          <p>WORKOUT : {workoutItem.workouts} </p>
          <p>LIKES : {workoutItem.likes} </p> 
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