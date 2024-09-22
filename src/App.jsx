import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [workout, setWorkout] = useState([{ workouts: 'pull-ups', likes: '0' }])
  
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
      <p>WORKOUT : {workout.map(workout => workout.workouts)} </p>
      <p>LIKES : {workout.map(workout => workout.likes)}</p>

      <p>COUNT : {count} </p>
    </div>
  );
}

export default App;