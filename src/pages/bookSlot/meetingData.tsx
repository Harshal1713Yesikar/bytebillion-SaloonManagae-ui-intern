// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box,Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const CardSupport = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
          <Icon icon='bx:help-circle' fontSize='2rem' />
        </CustomAvatar>
        <Typography variant='h6' sx={{ mb: 2.75 }}>
        You are scheduled
        </Typography>
        <Typography variant='body2' sx={{ mb: 6 }}>
        A calendar invitation has been sent to your email address.
        </Typography>
        <Button variant='outlined' sx={{ p: theme => theme.spacing(1.75, 5.5),color:"black",borderBlockColor:"black" }}>
          Open Invitation
        </Button>

      <Grid container spacing={2} justifyContent="center" sx={{margin:"10px"}}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{ border: 1,borderColor: 'gray',padding: 2,textAlign: 'center',height:"200px"}}>
          <p>Your content goes here!</p>
        </Box>
      </Grid>
    </Grid>
      </CardContent>
    </Card>
  )
}

export default CardSupport
