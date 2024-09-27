import React from 'react';

const CalendarGrid2 = ({calendarData}) => {
    const today = new Date()
    const startFromLastYear = new Date(today)
    startFromLastYear.setDate(today.getDate() - 364)
    console.log("CalendarGrid2", startFromLastYear)

    for (let i=0; i<364; i++) {
        const formatDate = new Date(startFromLastYear);
        formatDate.setDate(startFromLastYear.getDate()+i);
        const toISOString = formatDate.toISOString().split('T')[0]
        console.log("format Date", toISOString)
    }
}

export default CalendarGrid2;