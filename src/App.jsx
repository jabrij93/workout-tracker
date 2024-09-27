import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import GridCalendar from './GridCalendar.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [calendarData, setCalendarData] = useState({});


  useEffect( () => {
    axios.get(`http://localhost:3001/workoutData`).then(response=> {
      setWorkout(response.data);
      // Build calendar data from the workout dates
      const workoutByDate = {};
      response.data.forEach(item => {
        const date = item.date; // Assuming each item has a 'date' field
        workoutByDate[date] = (workoutByDate[date] || 0) + 1; // Count how many workouts were logged for each date
      });
      setCalendarData(workoutByDate);
  })}, []);

  const handleSubmit = (e) => {
      e.preventDefault();

      if (newWorkout.trim() === '') return;

      const newWorkoutData = {
        workouts: newWorkout,
        likes: 0,
      }

      axios.post(`http://localhost:3001/workoutData`, newWorkoutData)
        .then(response => {
          setWorkout([...workout, response.data])
        })
      setNewWorkout('')
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
      <h1> Workout Tracker !</h1>
        {/* Render the calendar and pass the calendarData as a prop */}
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
        <button type="submit"> Add Workout </button>
      </form>


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

export default App