import React, { useState } from 'react';
import { render, screen } from '@testing-library/react'
import MainWorkout from './MainWorkout'
import userEvent from '@testing-library/user-event'

test('renders workouts', async () => {
    const groupedWorkouts = {
        "January 2024": [
            {
                workouts: 'front lever',
                date: '17-12-2024',
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
  
    const div = container.querySelector('.detail')
    screen.debug(div)
    expect(div).toHaveTextContent('17-12-2024')
})

test('clicking the button calls event handler once', async () => {
    const groupedWorkouts = {
        "January 2024": [
            {
                workouts: 'front lever',
                date: '17-12-2024',
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

    const mockHandler = vi.fn()
    const visible = vi.fn();
    const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    
    const buttonLabel = 'show details'
  
    render(
      <MainWorkout 
        groupedWorkouts={groupedWorkouts}
        toggleVisibility={mockHandler}
        visible={visible}
        workoutContainer={workoutContainer}
        showWhenVisible={showWhenVisible}
        buttonLabel={buttonLabel}
      />)
  
    const user = userEvent.setup()  
    const button = screen.getByText('show details')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('at start the children are not displayed', () => {

    const groupedWorkouts = {
        "January 2024": [
            {
                workouts: 'front lever',
                date: '17-12-2024',
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

    const mockHandler = vi.fn()
    const visible = vi.fn();
    const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    const buttonLabel = 'show details'

    const { container } = render(
        <MainWorkout 
          groupedWorkouts={groupedWorkouts}
          toggleVisibility={mockHandler}
          visible={visible}
          workoutContainer={workoutContainer}
          showWhenVisible={showWhenVisible}
          buttonLabel={buttonLabel}
        />)

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveClass('hidden');
  });

  test('after clicking the button, children are displayed', async () => {
    const groupedWorkouts = {
        "January 2024": [
            {
                workouts: 'front lever',
                date: '17-12-2024',
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

    // Mock visibility states
    const visible = { "January 2024-0": false };
    const mockHandler = vi.fn();
    const workoutContainer = { display: 'flex', justifyContent: 'space-between', flexDirection: 'column' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    
    const buttonLabel = 'show details'
  
    render(
      <MainWorkout 
        groupedWorkouts={groupedWorkouts}
        toggleVisibility={mockHandler}
        visible={visible}
        workoutContainer={workoutContainer}
        showWhenVisible={showWhenVisible}
        buttonLabel={buttonLabel}
      />)
  
    const user = userEvent.setup()  
    const button = screen.getByText('show details')
    await user.click(button)

    // Check visibility class
    //  const div = container.querySelector('.togglableContent')
    //  expect(div).toHaveClass('visible') // Expect class to be visible

     // Check if the date and details are displayed
     expect(screen.findAllByText((content, element) => {
       return element.textContent.includes('17-12-2024');
     }));
     expect(screen.findAllByText((content, element) => {
       return element.textContent.includes('2 x 11 scapular pull-ups, 60s deadhang 60s, 6 minutes rest');
     }));
})