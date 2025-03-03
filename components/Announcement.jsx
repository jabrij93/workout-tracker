const Announcement = () => {
    return (
        <div className="announcements">
             <h3 className="announcement-header">Announcement</h3>
                <div className="announcement" >
                {[
                    {
                        title: "Site Maintenance",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
                    },
                    {
                        title: "Community Share Day",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
                    },
                    ].map((announcement, index) => (
                        <div key={index}>
                        <h4 className="announcement-title" style={{ marginTop:"2px" }}>{announcement.title}</h4>
                        <p>{announcement.description}</p>
                        <hr />
                        </div>
                ))}
                </div>
        </div>
    )
}

export default Announcement