import { render, screen } from '@testing-library/react'
import WoTrack2 from './WoTrack2'
import axios from 'axios'
import { vi } from 'vitest'

// Mock axios
vi.mock('axios')

test('renders content', async () => {
  const workout = {
    workouts: 'pull up'
  }

  // The event handler is a mock function defined with Vitest:
  const createWorkout = vi.fn();
  const isLoggedIn = vi.fn(); 
  const setIsLoggedIn = vi.fn(); 

  // A session is started to interact with the rendered component:
  const user = userEvent.setup();

  // Select input fields using the labels
  const workoutInput = screen.getByPlaceholderText('workout');
  const calendarInput = screen.getByPlaceholderText('calendar');
  const detailsInput = screen.getByPlaceholderText('details');

  // Simulate user typing into input fields
  await user.type(workoutInput, 'front lever');
  await user.type(calendarInput, 'Testing Author');
  await user.type(detailsInput, 'http://consistency_leads_to_conviction.com');

  render(<WoTrack2 createWorkout={createWorkout} user={{ username: 'root', password: 'salainen' }} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} buttonLabel="show details" />)

  const element = screen.getByText('pull up')
  expect(element).toBeDefined()
})