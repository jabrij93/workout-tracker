const Notification = ({ notification, type }) => {
    if (!notification) return null;

    const borderColor = notification.type === 'error' ? 'red' : 'green'
    const textColor = notification.type === 'error' ? 'red' : 'green'
    
    return (
        <div className="notification" style={{ border:`1px solid ${borderColor}`, borderRadius:'6px', marginTop:'10px' }}>
            <p style={{ color: textColor}}> { notification.message } </p>
        </div>
    )
}

export default Notification;