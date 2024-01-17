// ** MUI Imports
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'


// import Rating from '@mui/material/Rating'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRouter } from 'next/router'

// import dayjs from 'dayjs';

// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


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
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  const router = useRouter()
  const handleClick = () => {
    // Perform any necessary actions before redirection
    // console.log('Card clicked');
    router.push('/bookSlot/userDetail')
  }

  return (


    <Card>

      <Grid container spacing={6}>

        <StyledGrid1 item xs={12} md={6} lg={6} sx={{ width: '30px' }}>
          <CardContent>
            <Typography variant='h3' sx={{ mb: 2 }}>
              <Icon icon='bi:scissors' />
            </Typography>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Salonist Support
            </Typography>
            <Typography variant='h4' sx={{ mb: 2 }}>
              30 Minute Meeting
            </Typography>
            <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* <Rating readOnly value={5} name='read-only' sx={{ mr: 2 }} /> */}
              <Icon icon='tabler:clock' />
              <Typography variant='body2'>30 min</Typography>
            </Box>
            <Typography variant='body2'>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.
            </Typography>
            <Typography variant='body2'>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.Before there was a United States of America, there were coffee houses, because how are you supposed
              to build.Before there was a United States of America, there were coffee houses, because how are you
              supposed to build.Before there was a United States of America, there were coffee houses, because how are
              you supposed to build.
            </Typography>
          </CardContent>
          <CardActions className='card-action-dense' sx={{ width: '100%' }}>
            <Button>Cookie Setting</Button>
            <Button>Report abuse</Button>
          </CardActions>
        </StyledGrid1>
        <StyledGrid1 item xs={12} md={6} lg={3} sx={{ width: '30px' }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Select a Date
            </Typography>
            {/* <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' /> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['MobileDatePicker']}>
                <MobileDatePicker label='Basic date picker' />
              </DemoContainer>
            </LocalizationProvider>
{/*
<LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer
        components={[

          'MobileDatePicker',

        ]}

      >

        <DemoItem label="Mobile variant">
          <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem>


      </DemoContainer>
    </LocalizationProvider> */}
          </CardContent>



        </StyledGrid1>

        <StyledGrid1 item xs={12} md={6} lg={3} sx={{ width: '30px' }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Select a Time
            </Typography>
            {/* <Img alt='Stumptown Roasters' src='/images/cards/analog-clock.jpg' /> */}

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ padding: '3px' }}>
                <InputLabel id='demo-simple-select-label'>Time</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={age}
                  label='Time'
                  onChange={handleChange}
                >
                  <MenuItem value={'07:30'}>07:30 AM</MenuItem>
                  <MenuItem value={'08:00'}>08:00 AM</MenuItem>
                  <MenuItem value={'08:30'}>08:30 AM</MenuItem>
                  <MenuItem value={'09:00'}>07:30 AM</MenuItem>
                  <MenuItem value={'09:30'}>08:00 AM</MenuItem>
                  <MenuItem value={'10:00'}>08:30 AM</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </StyledGrid1>
      </Grid>
      <Grid style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button variant='contained' onClick={handleClick} style={{ margin: '20px' }}>
          NEXT
        </Button>
      </Grid>
    </Card>

  )
}

export default CardHorizontalRatings
