// components/Calendar.js
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import '@fullcalendar/daygrid/main.css'
import { Card, Grid } from '@mui/material'

const Calendar = () => {
  const calendarComponentRef = useRef()
  const [events, setEvents] = useState([
    { id: 1, title: 'event 1', date: '2019-12-01' }
    // ... your other events
  ])

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr)
  }

  const handleSelectedDates = (info: any) => {
    alert('selected ' + info.startStr + ' to ' + info.endStr)
    const title = prompt("What's the name of the title")

    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr
      }
      // setEvents([...events, newEvent]);
    } else {
      console.log('nothing')
    }
  }

  return (
    <Grid>
      <Card>
        <div>
          <FullCalendar
            displayEventTime={true}
            selectable={true}
          />
        </div>
      </Card>
    </Grid>
  )
}

export default Calendar
