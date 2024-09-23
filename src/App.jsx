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