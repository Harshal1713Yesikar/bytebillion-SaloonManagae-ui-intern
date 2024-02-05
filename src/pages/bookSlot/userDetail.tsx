// ** MUI Imports
// import { useState } from 'react';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// import Rating from '@mui/material/Rating'
import { Icon } from '@iconify/react';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'

// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

import InputAdornment from '@mui/material/InputAdornment'


import { useRouter } from 'next/router'

// import { TimePicker } from '@mui/x-date-pickers';


// Styled Grid component
const StyledGrid1 = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

// Styled Grid component
// const StyledGrid2 = styled(Grid)<GridProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   [theme.breakpoints.up('md')]: {
//     paddingLeft: '0 !important'
//   },
//   [theme.breakpoints.down('md')]: {
//     order: -1
//   }
// }))

// Styled component for the image
// const Img = styled('img')(({ theme }) => ({
//   height: '11rem',
//   borderRadius: theme.shape.borderRadius
// }))

const CardHorizontalRatings = () => {



  const router = useRouter()
  const handleClick = () => {
    // Perform any necessary actions before redirection
    // console.log('Card clicked');
    router.push('/bookSlot/meetingData');
  }




  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid1 item xs={12} md={6} lg={6} sx={{width:"30px"}}>
          <CardContent>
          <Typography variant='h3' sx={{ mb: 2 }}>
          <Icon icon="bi:scissors" />
            </Typography>
            <Typography variant='h6' sx={{ mb: 2 }}>
             Salonist Support
            </Typography>
            <Typography variant='h4' sx={{ mb: 2 }}>
              30 Minute Meeting
            </Typography>
            <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* <Rating readOnly value={5} name='read-only' sx={{ mr: 2 }} /> */}
              <Icon icon="tabler:clock"  />
              <Typography variant='body2'>30 min</Typography>
            </Box>
            <Typography variant='body2'>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.
            </Typography>
            <Typography variant='body2'>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.
            </Typography>
          </CardContent>
          <CardActions className='card-action-dense' sx={{ width: '100%' }}>
            <Button>Cookie Setting</Button>
            <Button>Report abuse</Button>
          </CardActions>
        </StyledGrid1>
        <StyledGrid1 item xs={12} md={6} lg={6} sx={{width:"30px"}}>


        <Card>
      <CardHeader title='Basic with Icons' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Full Name'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='bx:user' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='bx:envelope' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='bx:phone' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Message'
                placeholder='Please share anything that will help prepare for our meeting.'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='bx:message' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large' onClick={handleClick}>
                Schedule Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
        </StyledGrid1>

      </Grid>
      <Grid style={{width:"100%",display:"flex",justifyContent:"end"}}>
    <Button variant='contained'  style={{margin:"20px"}}>NEXT</Button>
    </Grid>
    </Card>
  )
}

export default CardHorizontalRatings
