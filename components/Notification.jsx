export const Notification = ({ notification, type }) => {
    const borderColor = type === 'error' ? 'red' : 'green'
    const textColor = type === 'error' ? 'red' : 'green'
    

    return (
        <div className="notification" style={{ border:`2px solid ${borderColor}`, borderRadius:'6px' }}>
            <p style={{ color: textColor}}> { notification } </p>
        </div>
    )
}