import { useState, useEffect } from 'react';
import CardFeatures from './CardFeatures';

const Workout = ({ groupedWorkouts, toggleVisibility, workoutContainer, buttonLabel }) => {
    const [visible, setVisible] = useState({});

    return (
        <>
            {groupedWorkouts.map((item, index) => { 
                const isVisible = visible[`${item.date}-${index}`];  // Adjusted the key for visibility
                const style = isVisible ? workoutContainer : { display: 'none' };
                return (
                    <div className="card" key={index}>
                        <div className="title" data-testid={`workout-card-${item.workouts}`}>
                            <p>{item.workouts}</p>
                            <button onClick={() => toggleVisibility(`${item.date}-${index}`)}>
                                {buttonLabel}
                            </button>
                        </div>
                        <div
                            style={style}
                            className={`togglableContent ${isVisible ? "visible" : "hidden"}`}
                        >
                            <p className="detail">
                                {item.date} - {item.detail}
                            </p>
                            <CardFeatures />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Workout;
