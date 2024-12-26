import { render, screen } from '@testing-library/react'
import MainWorkout from './MainWorkout'
import userEvent from '@testing-library/user-event'

test('renders workouts', async () => {
    const groupedWorkouts = {
        "January 2024": [
            {
                workouts: 'front lever',
                date: '15-12-2024',
                detail: '2 x 11 scapular pull-ups, 60s deadhang 60s, 6 minutes rest',
                likes: 0,
                user: {
                    username: 'root',
                    name: 'Superuser',
                    id: '6734a7c7be415b97d507c03a'
                }
            }
        ]
    }

    const toggleVisibility = vi.fn();
    const visible = vi.fn();
    const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    
    const buttonLabel = 'show details'
  
    const { container } = render(
      <MainWorkout 
        groupedWorkouts={groupedWorkouts}
        toggleVisibility={toggleVisibility}
        visible={visible}
        workoutContainer={workoutContainer}
        showWhenVisible={showWhenVisible}
        buttonLabel={buttonLabel}
      />)
  
    const div = container.querySelector('.title')
    expect(div).toHaveTextContent('front lever')
})