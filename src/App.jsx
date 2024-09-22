import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let workoutData = [
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
    likes: '2',
  },
]

  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState(workoutData)
  
  return (
    
    <div className="App">
      
      <input type='text' placeholder='Insert your type of workout' onChange={()=>setWorkout({workouts: 'dips'})}/>

      {/* <button onClick={(event)=> {
          setWorkout({workout: event})
        }}
          > 
          ADD 
        </button> */}
      
      <h1> Workout Tracker !</h1>
        <button onClick={()=> {
          setWorkout(
            workout.map((workout, index) => index === 0 ? {...workout, likes : Number(workout.likes + 1) } : workout ))
        }}
          > 
          WORKOUT VOTE 
        </button>
        <button onClick={()=> {
          setCount(count + 1)
        }}
          > 
          LIKE 
        </button>
        <button onClick={()=> {
          setCount(0)
        }}
          > 
          Reset
        </button>
      <br/>
      {workout.map((workout, index) => (
        <div key={index} >
          <p>WORKOUT : {workout.workouts} </p>
          <p>LIKES : {workout.likes} </p>
        </div>
      ))}
      <p>COUNT : {count} </p>
    </div>
  );
}

export default App;