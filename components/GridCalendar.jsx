import React from 'react';

const GridCalendar = ({calendarData}) => {
    const today = new Date()
    const startFromLastYear = new Date(today)
    startFromLastYear.setDate(today.getDate() - 364)
    console.log("CalendarGrid2", startFromLastYear)
    let days = []

    for (let i=0; i<364; i++) {
        const formatDate = new Date(startFromLastYear);
        formatDate.setDate(startFromLastYear.getDate()+i);
        const toISOString = formatDate.toISOString().split('T')[0]
        console.log("format Date", toISOString)

        const progressLevel = calendarData[toISOString]

        days.push(
            <div 
                key={toISOString}
                style={{
                    height:'20px',
                    width:'20px',
                    border: 'solid grey 2px',
                    color: progressLevel>0 ? 'green' : '#ddd',
                    display:'inline-block',
                }}
                title={toISOString}
            >
            </div>
        )
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(52, 20px)',
            justifyContent: 'start',
            gridGap: '2px',
            border: 'solid black 2px',
            borderRadius: '5px',
            padding: '3px 3px',
        }}> {days} </div>
    )
}

export default GridCalendar;