import { useState } from 'react';

const WorkoutForm = ( { createForm, user }) => {
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
      <div>
        <form onSubmit={addBlog}>
          <div>
                  title: <input
              data-testid="title"
              onChange={event => setNewTitles(event.target.value)}
              value={newTitle}
            />
          </div>
          <div>
                  author: <input
              data-testid="author"
              onChange={event => setNewAuthors(event.target.value)}
              value={newAuthor}
            />
          </div>
          <div>
                  url: <input
              data-testid="url"
              onChange={event => setNewUrls(event.target.value)}
              value={newUrl}
            />
          </div>
          <div>
                  likes: <input
              data-testid="likes"
              onChange={event => setNewLikes(event.target.value)}
              value={newLike}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default BlogForm;