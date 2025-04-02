import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CardFeatures from './CardFeatures';
import workouts from '../src/services/workouts';

const Workout = forwardRef(({ groupedWorkouts, updatedLike, buttonLabel }, refs) => {
    const [visibleIndex, setVisibleIndex] = useState(null);  // Track which card is visible
    const [likes, setLikes] = useState(workouts.likes);

    useEffect(() => {
        setLikes(groupedWorkouts.likes);
    }, [groupedWorkouts.likes]);

    const addLike = (id) => {
        const workout = groupedWorkouts.find(item => item.id === id);
        if (workout) {
            updatedLike(id, { ...workout, likes: workout.likes + 1 });
        }
    };

    const toggleVisibility = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    useImperativeHandle(refs, () => ({
        toggleVisibility
    }));

    return (
        <>
            {groupedWorkouts.map((item, index) => { 
                return (
                    <div className="card" key={ item.id || item.date }>
                        <div className="title" data-testid={`workout-card-${item.workouts}`}>
                                <p>{item.workouts}, {item.date}</p>
                                {visibleIndex !== index ? (
                                    <button onClick={() => toggleVisibility(index)}>{buttonLabel}</button>
                                ) : null}
                            <div 
                                style={{ display: visibleIndex === index ? 'flex' : 'none', flexDirection: 'column' }} 
                                className='togglableContent'
                            >
                                <div className="detail2">
                                    <p> Detail : {item.detail} </p>
                                </div>
                                <div className="likes">
                                    <p> Likes : {item.likes} 
                                        <button onClick={() => addLike(item.id)}>like</button> 
                                    </p>
                                </div>
                                <div>
                                    <button onClick={() => toggleVisibility(index)}>hide</button>
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