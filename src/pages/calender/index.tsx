// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Types
import { RootState, AppDispatch } from 'src/store'
import { CalendarColors, CalendarFiltersType } from 'src/types/apps/calendarTypes'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'
import DatePicker from 'react-datepicker'

import { Card, Grid } from '@mui/material'

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const { settings } = useSettings()
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.calendar)

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (
    <Grid xs={12}>
      <Card sx={{ display: 'flex' }}>
     
        <Box sx={{ px: 4, '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' } }}>
        <Box sx={{ p: theme => theme.spacing(5.625, 6) }}>
          <Button
            fullWidth
            variant='contained'
            startIcon={<Icon icon='bx:plus'/>}
            sx={{ '& svg': { fontSize: '1.125rem !important' } }}
          >
            Add Event
          </Button>
        </Box>
          <DatePickerWrapper>
            <DatePicker
              inline
              onChange={date => {
                calendarApi.gotoDate(date)
              }}
            />
          </DatePickerWrapper>
        </Box>
        <Grid xs={8} sx={{ width: '-webkit-fill-available' }}>
          <Calendar />
        </Grid>
      </Card>
    </Grid>
  )
}

export default AppCalendar
