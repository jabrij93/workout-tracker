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
        setLikes(groupedWorkouts.likes);
    }, [groupedWorkouts.likes]);
    
    const addLike = () => {
        updatedLike(groupedWorkouts.id, { ...groupedWorkouts, likes: groupedWorkouts.likes + 1 });
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
                return (
                    <div className="card" key={index}>
                        <div className="title" data-testid={`workout-card-${item.workouts}`}>
                                <p>{item.workouts}, {item.date}</p>
                                {!visible ? (
                                <button onClick={toggleVisibility} >{buttonLabel}</button>
                                ) : null}
                            <div style={visible ? workoutFullDetail : showWhenVisible} className='togglableContent'>
                                <div className="detail2">
                                    <p> Detail : {item.detail} </p>
                                </div>
                                <div className="likes">
                                    <p> Likes : {item.likes} <button onClick={addLike}>like</button> </p>
                                </div>
                                <div>
                                <button onClick={toggleVisibility}>hide</button>
                                </div>
                                <CardFeatures />
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default Workout;
