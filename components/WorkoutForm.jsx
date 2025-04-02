import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import dayjs from 'dayjs';

const WorkoutForm = ({ createWorkout, user, closeModal, setNotification, setNotificationType }) => {
    const [newWorkout, setNewWorkout] = useState('');
    const [newWorkoutDate, setNewWorkoutDate] = useState(''); 
    const [newWorkoutLike, setNewWorkoutLike] = useState('');
    const [newWorkoutDetail, setNewWorkoutDetail] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (newWorkout.trim() === '') return;
      
        // Default to today's date if no date is selected
        const selectedDate = newWorkoutDate || new Date(); 
    
        const formattedDate = dayjs(selectedDate).format('DD-MM-YYYY'); // Matches GridCalendar
      
        createWorkout({
          workouts: newWorkout,
          date: formattedDate,
          detail: newWorkoutDetail,
          likes: newWorkoutLike === undefined ? 0 : Number(newWorkoutLike),
        })

        // createWorkout(newWorkoutData); // Wait for the update before clearing state
      
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
                                  placeholderText="Select a date" 
                                  customInput={<input data-testid="date" />} // Apply data-testid to the input
                            />
                            <input 
                                type="text"
                                value={newWorkoutDetail} 
                                data-testid="detail" 
                                onChange={(e) => setNewWorkoutDetail(e.target.value)} 
                                placeholder='Details(optional)'
                            />
                            <input 
                                type="number"
                                value={newWorkoutLike} 
                                data-testid="like" 
                                onChange={(e) => setNewWorkoutLike(e.target.value)} 
                                placeholder='Likes(optional)'
                            />
                            <button type="submit"> Add Workout </button>
                        </form>
                     </div>
              </div>
          </div>
    );
  };
  
  export default WorkoutForm;