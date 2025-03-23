import { useState, useEffect, useRef } from 'react';
import Login from '../components/Login.jsx';
import WoTrack2 from '../components/WoTrack2.jsx';
import Notification from '../components/Notification.jsx';
import loginService from './services/login.js';
import workoutService from '../src/services/workouts.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [groupedWorkouts, setGroupedWorkouts] = useState({});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setIsLoggedIn(true);
      fetchWorkouts();
    }
  }, []);

  // Fetch workouts data by MonthYear

  const fetchWorkouts = async () => {
    try {
      const workouts = await workoutService.getAll();
      setWorkouts(workouts.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const groupWorkouts = workouts.reduce((acc, workout) => {
    if (workout.date) {
      const [day, month, year] = workout.date.split('-'); // Extract day, month, year
      const monthYear = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(workout);
    }
    return acc;
  }, {});

  const sortedMonths = Object.keys(groupWorkouts).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
  
    return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`);
  });
  
  // Fetch workouts data by MonthYear
  

  const addWorkout = (workoutObject) => {
    workoutService
      .create(workoutObject)
      .then(returnedWorkout => {
        setWorkouts(workouts.concat(returnedWorkout))
      })
  }

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Workout Tracker</h1>
      <Notification message={errorMessage} />
      {!isLoggedIn || !user ? (  // Ensure both conditions are checked
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        fetchWorkouts={fetchWorkouts}
      />
      ) : (
        <>
          <WoTrack2
            user={user}
            workouts={workouts}
            addWorkout={(newWorkout) => setWorkouts([...workouts, newWorkout])}
            handleLogout={() => {
              setIsLoggedIn(false);
              setUser(null);
            }}
            setGroupedWorkouts={setGroupedWorkouts}
          />

          {/* Iterate over grouped workouts here */}
          <div>
            {sortedMonths.map(monthYear => (
              <div key={monthYear}>
                <h3>{monthYear}</h3>
                <ul>
                  {groupWorkouts[monthYear].map(workout => (
                    <li key={workout.id}>
                      {workout.date} - {workout.workouts}: {workout.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
