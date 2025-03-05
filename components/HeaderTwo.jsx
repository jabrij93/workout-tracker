import GridCalendar from '../components/GridCalendar.jsx';
import { Notification } from './Notification.jsx';

const HeaderTwo = ({ notification, notificationType, totalWorkouts, openModal, calendarData }) => {
    return (
      <div className="header-two">
        <div style={{ marginLeft: "15px", marginTop: "-20px", paddingBottom: "20px" }}>
          {notification && <Notification notification={notification} type={notificationType} />}
          
          <div className="header">
            <p>{totalWorkouts} Workouts/Activities in the last year</p>
            <button className="new" onClick={openModal}>NEW +</button>  
          </div>
  
          <GridCalendar calendarData={calendarData} />
          <br /> 
        </div>
      </div>
    );
  };
  
export default HeaderTwo;