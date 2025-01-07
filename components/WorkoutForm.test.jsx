import { render, screen } from '@testing-library/react'
import WorkoutForm from './WorkoutForm'
import userEvent from '@testing-library/user-event'

// test('<WorkoutForm /> updates parent state and calls onSubmit', async () => {
//   const createWorkout = vi.fn();
//   const closeModal = vi.fn();
//   const setNotification = vi.fn();
//   const setNotificationType = vi.fn();
//   const user = userEvent.setup();

//   render(
//     <WorkoutForm 
//       createWorkout={createWorkout} 
//       closeModal={closeModal}
//       setNotification={setNotification}
//       setNotificationType={setNotificationType}
//     />)

//   const input = screen.getByPlaceholderText('Insert your workout')
//   const sendButton = screen.getByText('Add Workout')

//   await user.type(input, 'weighted pull-ups')
//   await user.click(sendButton)

//   expect(createWorkout.mock.calls).toHaveLength(1)
//   expect(createWorkout.mock.calls[0][0].workouts).toBe('weighted pull-ups')
//   expect(setNotification).toHaveBeenCalledWith('Successfully added weighted pull-ups !');
//   expect(setNotificationType).toHaveBeenCalledWith('success');
//   expect(closeModal).toHaveBeenCalled()
// })