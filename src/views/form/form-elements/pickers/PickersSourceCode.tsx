import React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import TimePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import { useState } from 'react'

const PickersTime = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [time, setTime] = useState<DateType>(new Date())
  const [dateTime, setDateTime] = useState<DateType>(new Date())

      

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <TimePicker
          showTimeSelect
          selected={time}
          timeIntervals={15}
          showTimeSelectOnly
          dateFormat='h:mm aa'
          id='time-only-picker'
          popperPlacement={popperPlacement}
          onChange={(date: Date) => setTime(date)}
          customInput={<CustomInput label='Opning Time' />}
        />
      </div>
      <div>
        <TimePicker
          showTimeSelect
          timeIntervals={15}
          showTimeSelectOnly
          dateFormat='h:mm aa'
          id='time-only-picker'
          popperPlacement={popperPlacement}
          onChange={(date: Date) => setTime(date)}  
          customInput={<CustomInput label='Closing Time' />}
        />
      </div>
      </Box>
  )
}

export default PickersTime
