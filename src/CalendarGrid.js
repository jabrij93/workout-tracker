// Helper to generate the calendar grid
const renderCalendar = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const days = [];
    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startOfYear);
      currentDate.setDate(startOfYear.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

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
    return days;
  };