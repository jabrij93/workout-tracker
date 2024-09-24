import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  

  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([])
  const [newWorkout, setNewWorkout] = useState('')

  

  useEffect( () => {
    axios.get(`http://localhost:3001/workoutData`)
    .then(response=>
      setWorkout(response.data));
    }, [])

  const handleSubmit = (e) => {
      e.preventDefault();

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
    const updatedWorkout = workout.map((item)=> 
      item.id === id ? {...item, likes: Number(item.likes+1)} : item
    )

    const updatedItem = updatedWorkout.find((item)=> item.id === id)

    axios.put(`http://localhost:3001/workoutData/${id}`, updatedItem)
      .then(response => {
        setWorkout(updatedWorkout)
      })
  }
  
  return (

    <div className="App">
      <h1> Workout Tracker !</h1>
        <button onClick={()=> {
          setCount(0)
        }}
          > 
          Reset
        </button>
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
  );
}

export default App;