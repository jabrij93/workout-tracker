import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import dayjs from 'dayjs';

const WorkoutForm = ( { createWorkout, user, closeModal, setNotification, setNotificationType }) => {
    const [newWorkout, setNewWorkout] = useState('');
    const [newWorkoutDate, setNewWorkoutDate] = useState(''); 
    const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (newWorkout.trim() === '') return;
      
        // Default to today's date if no date is selected
        const selectedDate = newWorkoutDate || new Date(); 
    
        const formattedDate = dayjs(selectedDate).format('DD-MM-YYYY'); // Matches GridCalendar
      
        createWorkout({
          workouts: newWorkout,
          date: formattedDate,
          detail: newWorkoutDetail,
          likes: 0,
        })
      
        setNewWorkout('');
        setNewWorkoutDate('');
        setNewWorkoutDetail('');
        closeModal();
    
        setNotification(`Successfully added ${newWorkout} !`)
        setNotificationType('success');
    
        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification('');
        }, 5000); 
      }
  
    return (
        <div className="modal">
                         <div className="modal-content">
                           <span className="close" onClick={closeModal}>&times;</span>
                               <div className="add-workout">
                                   <form onSubmit={handleSubmit}>
                                       <input 
                                           type="text" 
                                           value={newWorkout}
                                           data-testid="workout" 
                                           onChange={(e) => setNewWorkout(e.target.value)}   
                                           placeholder='Insert your workout'
                                       />
                                       <ReactDatePicker 
                                           selected={newWorkoutDate} 
                                           onChange={(date) => setNewWorkoutDate(date)} 
                                           dateFormat="dd-MM-yyyy"
                                           data-testid="" 
                                           placeholderText="Select a date" 
                                       />
                                       <input 
                                           type="text" 
                                           value={newWorkoutDetail} 
                                           onChange={(e) => setNewWorkoutDetail(e.target.value)} 
                                           placeholder='Details(optional)'
                                       />
                                       <button className="submit" type="submit"> Add Workout </button>
                                   </form>
                               </div>
                         </div>
                     </div>
    );
  };
  
  export default WorkoutForm;