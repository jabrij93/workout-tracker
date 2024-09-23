import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {
  

  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState(workoutData)
  const [newWorkout, setNewWorkout] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkout([...workout, {workouts: newWorkout, likes: 0}])
    setNewWorkout('')
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


      {workout.map((workoutItem, index) => (
        <div key={index} >
          <p>WORKOUT : {workoutItem.workouts} </p>
          <p>LIKES : {workoutItem.likes} </p> <span> <button onClick={() => { 
            const updatedWorkout = workout.map((item, i) => 
                i === index ? 
              {...item, likes:Number(item.likes) + 1 } 
              : item);
            setWorkout(updatedWorkout)
          }}
            > 
            LIKE 
          </button> </span>
        </div>
      ))}
    </div>
  );
}

export default App;