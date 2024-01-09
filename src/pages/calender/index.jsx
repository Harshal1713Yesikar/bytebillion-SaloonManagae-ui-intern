import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Container } from '@mui/material'

const Index = () => {
  return (
    <>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label='Basic time picker' />
          </DemoContainer>
        </LocalizationProvider>
      </Container>
    </>
  )
}
export default Index
