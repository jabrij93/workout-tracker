import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CardFeatures from './CardFeatures';
import workouts from '../src/services/workouts';

const Workout = forwardRef(({ groupedWorkouts, updatedLike, workoutContainer, buttonLabel }, refs) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(workouts.likes);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const workoutFullDetail = { display: 'flex', flexDirection: 'column' };

    useEffect(() => {
        setLikes(workouts.likes);
    }, [workouts.likes]);
    
    const addLike = () => {
        updatedLike(workouts.id, { ...workout, likes: likes + 1 });
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };
    
    useImperativeHandle(refs, () => ({
        toggleVisibility
    }));

    return (
        <>
            {groupedWorkouts.map((item, index) => { 
                const isVisible = visible[`${item.date}-${index}`];  // Adjusted the key for visibility

                return (
                    <div className="card" key={index}>
                        <div className="title" data-testid={`workout-card-${item.workouts}`}>
                                <p>{item.workouts}, {item.date}</p>
                                {!visible ? (
                                <button onClick={toggleVisibility} >{buttonLabel}</button>
                                ) : null}
                            <div style={visible ? workoutFullDetail : showWhenVisible} className='togglableContent'>
                                <div>
                                    <p className="detail"> Detail : {item.detail} </p>
                                </div>
                                <div>
                                    <p className="likes">  Likes : {item.likes} <button onClick={addLike}>like</button> </p>
                                    <CardFeatures />
                                </div>
                                <div>
                                <button onClick={toggleVisibility}>hide</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default Workout;
