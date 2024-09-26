import React from 'react';

const CalendarGrid = ({ calendarData }) => {
  const today = new Date();
  const startOfLastYear = new Date(today);
  startOfLastYear.setDate(today.getDate() - 364); // Go back 360 days from today
  console.log("startOfLastYear",startOfLastYear)
  const days = [];

  // Generate 360 days
  for (let i = 0; i < 364; i++) {
    const currentDate = new Date(startOfLastYear);
    currentDate.setDate(startOfLastYear.getDate() + i);
    console.log("currentDate", currentDate);
    const dateString = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    console.log("dateString", dateString);

    const progressLevel = calendarData[dateString] || 0; // Check if there’s progress for this date

    days.push(
      <div
        key={dateString}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: progressLevel > 0 ? 'green' : '#ddd', // Green if progress, gray otherwise
          margin: '2px',
          display: 'inline-block',
        }}
        title={dateString}
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(52, 20px)', // 52 weeks horizontally, each having 7 days
        gridGap: '2px',
        justifyContent: 'start', // Align the grid to the left
        margin: '20px 0',
        border: '2px solid black',
        borderRadius: '5px', // Rounded corners
      }}
    >
      {days}
    </div>
  );
};

export default CalendarGrid;
