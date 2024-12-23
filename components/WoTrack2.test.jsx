import { render, screen } from '@testing-library/react'
import WoTrack2 from './WoTrack2'
import axios from 'axios'
import { vi } from 'vitest'

// Mock axios
vi.mock('axios')

test('renders content', () => {
  const workout = {
    workouts: 'pull up'
  }

  // The event handler is a mock function defined with Vitest:
  const createWorkout = vi.fn();

  // A session is started to interact with the rendered component:
  const user = userEvent.setup();

  render(<WoTrack2 createWorkout={workout} user={{ username: 'root', password: 'salainen' }} isLoggedIn={true} setIsLoggedIn={() => {}} buttonLabel="show details" />)

  const element = screen.getByText('pull up')
  expect(element).toBeDefined()
})