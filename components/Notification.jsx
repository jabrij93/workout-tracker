export const Notification = ({ notification }) => {
    return (
        <div className="notification" style={{ border:'2px solid black', borderRadius:'6px' }}>
            <p> { notification } </p>
        </div>
    )
}