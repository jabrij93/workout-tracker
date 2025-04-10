import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CardFeatures from './CardFeatures';
import workouts from '../src/services/workouts';

const Workout = forwardRef(({ groupedWorkouts, updatedLike, buttonLabel, onDelete }, refs) => {
    const [visibleIndex, setVisibleIndex] = useState(null);
    const [likes, setLikes] = useState(groupedWorkouts.likes);

    useEffect(() => {
        setLikes(groupedWorkouts.likes);
    }, [groupedWorkouts.likes]);

    const toggleVisibility = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    useImperativeHandle(refs, () => ({
        toggleVisibility
    }));

    return (
        <>
            {groupedWorkouts.map((item, index) => { 

            const addLike = () => {
                updatedLike(item.id, { ...item, likes: item.likes + 1 });
            };

                return (
                    <div className="card" key={ item.id || item.date }>
                        <div className="title" data-testid={`workout-card-${item.workouts}`}>
                                <p className="main-workout">{item.workouts}, {item.date}</p>
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
                                        <button onClick={addLike}>like</button> 
                                    </p>
                                </div>
                                <div>
                                    <button onClick={() => toggleVisibility(index)}>hide</button>
                                    <button onClick={() => onDelete(item.id)}>Delete</button>
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