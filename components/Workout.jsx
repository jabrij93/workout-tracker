import { useState, useEffect } from 'react';

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
                            <div className="card-features">
                                <div className="favourite">
                                    <img
                                        src="images/favouritelogo.svg"
                                        alt="Favourite"
                                        style={{ width: "18px", height: "18px" }}
                                    />
                                </div>
                                <div className="view">
                                    <img
                                        src="images/viewlogo.svg"
                                        alt="View"
                                        style={{ width: "18px", height: "18px" }}
                                    />
                                </div>
                                <div className="share">
                                    <img
                                        src="images/sharelogo.svg"
                                        alt="Share"
                                        style={{ width: "18px", height: "18px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Workout;
