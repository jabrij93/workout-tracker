import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let workoutData =[
  {
    workouts: 'pull-ups',
    likes: '5',
  },
  {
    workouts: 'dips',
    likes: '3',
  },
  {
    workouts: 'push-up',
    likes: '2'
  }
]

  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState(workoutData)
  
  const [newWorkout, setNewWorkout] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkout([...workout, {workouts: newWorkout , likes: 0}])
    setNewWorkout('')
  }
  
  return (
    
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='Insert your type of workout' 
          value={newWorkout} 
          onChange={(e)=>setNewWorkout(e.target.value)}
        />
        <button type="submit">Add workout</button>
      </form>
      
      {/* <button onClick={(event)=> {
          setWorkout({workout: event})
        }}
          > 
          ADD 
        </button> */}
      
      <h1> Workout Tracker !</h1>
        <button onClick={()=> {
          setCount(0)
        }}
          > 
          Reset
        </button>
      <br/>
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