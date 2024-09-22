import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <h1> Workout Tracker !</h1>
      <button onClick={()=> console.log('clicked')}> CLICK </button>
    </div>
  );
}

export default App;