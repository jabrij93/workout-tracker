import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <h1> Workout Tracker !</h1>
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
      <p>LIKES : {count} </p>
    </div>
  );
}

export default App;