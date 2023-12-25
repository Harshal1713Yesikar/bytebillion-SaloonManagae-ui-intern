// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Box, Button, StyledEngineProvider, colors } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
// import "../../../styles/global.css"
console.log("asuadhgfjhgh")

const Home = () => {
  const container = {
    fontSize: '20px',
    fontWeight: '900'
  }
  const button = {
    height: 35,
    width: 120,
    borderRadius: 8,
    backgroundColor: 'black',
    color: 'white',
    marginBottom: 20,
    marginRight: '50%'
  }
  const box = {
    height: '197px',
    width: '168px'
  }
  const button1 = {
      height: 35,
      width: 120,
      borderRadius: 9,
      backgroundColor: 'black',
      color: 'white'

    
    
  }
  const button2 ={
      height: 35,
      width: 120,
      borderRadius: 9,
     
      
  }
  return (
    <>
      <Grid>
        <Grid sx={{ mb: 5, borderRadius: '100' }}>
          <Card>
            <CardContent>
              {/* <Typography sx={{ color: 'black', fontSize: 23, fontWeight: '600' }}>Learn How To</Typography> */}
              <Typography style={container}>Learn How To</Typography>
              <Typography sx={{ color: 'black', fontSize: 40, fontWeight: '900' }}>Get Started On Salonist</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
          <div>
            <button style={button}>+ Add Deshlets</button>
          </div>
        </Grid>
        <Grid container item gap={10} xs={40} mb={8}>
          <Card style={box}>
            <CardHeader title={<Icon icon='mdi:cart-sale' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Recent Sales</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>Today</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='tabler:shopping-bag-check' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Recent Appointments</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>Today</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='mdi:people-group-outline' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Total Clients</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>LifeTime</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='ri:map-pin-user-line' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Total Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='fluent:people-queue-20-regular' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>Old Client Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
          <Card style={box}>
            <CardHeader title={<Icon icon='fluent:people-team-add-20-regular' />}></CardHeader>
            <CardContent>
              <Typography variant='h6'>0</Typography>
              <Typography sx={{ mb: 2, color: 'black', fontWeight: '500' }}>New Client Visits</Typography>
              <Typography sx={{ mb: 2, color: 'gray' }}>This Month</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{}}>
          <Card>
            <div style={{margin:"30px"}}>
              <button style={button1}>Quick Sale</button>
              <button style={button2}>Appointments</button>
              <button style={button2}>check</button>
            </div>  
    
            <Box sx={{ height: 300, margin: 50 }}></Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
