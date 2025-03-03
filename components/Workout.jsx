
const Workout = ({ groupedWorkouts, toggleVisibility, visible, workoutContainer, buttonLabel }) => {
    console.log('groupedWorkouts', groupedWorkouts);
    return (
        <>
            {Object.keys(groupedWorkouts).map((monthYear) => (
                <div className="card-container" key={monthYear}>
                    <div>
                        <h2>{monthYear}</h2>
                        {groupedWorkouts[monthYear].map((item, index) => { 
                        const isVisible = visible[`${monthYear}-${index}`];
                        const style = isVisible ? workoutContainer : { display: 'none' };
                        console.log('item.id', item.id);
                        return (
                            <div className="card" key={index} >
                            <div className="title" data-testid={`workout-card-${item.workouts}`} >
                                <p>{item.workouts}</p>
                                <button onClick={() => toggleVisibility(`${monthYear}-${index}`)}>
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
                    </div>
                </div>
            ))}
        </>
    )
}

export default Workout;