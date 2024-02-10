import { flexibleCompare } from '@fullcalendar/common'
import { Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'

const index = () => {
  return (
    <>
      <Card>
        <Grid sx={{ padding: '40px' }}>

          <Typography sx={{ fontSize: '25px' }}>Set up your profile for clients to book online</Typography>
          <Typography>Free up time and get your clients self-booking online 24/7.
          </Typography>
          <Button sx={{ mt: 5 }} variant="contained" size='medium'>Start Now</Button>

        </Grid>
      </Card>
      <Card sx={{ mt: 5 }}>
        <Grid sx={{ display: 'flex' }}>
          <Button sx={{ m: 2 }} variant="contained">Quick Sales</Button>
          <Button sx={{ m: 2 }} variant="outlined">Appointments</Button>
        </Grid>
      </Card>

    </>
  )
}

export default index
