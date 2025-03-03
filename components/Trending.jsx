const Trending = () => {
    return (
        <div className="trending-container">
            <h3 className="trending-header">Trending</h3>
                <div className="trending">
                    {[
                        {
                        username: "@regan",
                        description: "World Peace Builder",
                        img: "images/profilephoto1.jpg",
                        },
                        {
                        username: "@morgan",
                        description: "Super Cool Project",
                        img: "images/profilephoto3.jpg",
                        },
                    ].map((user, index) => (
                        <div className="trending-title" key={index}>
                            <div className="profilephoto">
                                <img
                                src={user.img}
                                alt={user.username}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                }}
                                />
                            </div>
                            <div className="users">
                                <p className="bold">
                                <strong>{user.username}</strong>
                                </p>
                                <p>{user.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Trending