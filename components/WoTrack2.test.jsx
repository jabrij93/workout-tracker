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

  // Mock the axios get request
  axios.get.mockResolvedValue({ data: [] })

  render(<WoTrack2 createWorkout={workout} user={{ username: 'root', password: 'salainen' }} isLoggedIn={true} setIsLoggedIn={() => {}} buttonLabel="show details" />)

  const element = screen.getByText('pull up')
  expect(element).toBeDefined()
})