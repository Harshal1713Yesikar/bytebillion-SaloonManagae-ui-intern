// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Card, Grid } from '@mui/material'
import { TextField, Box } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import { Icon } from '@iconify/react'

const ListSimple = () => {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <Fragment>
        <Grid container spacing={1}>
          <Card style={{ width: '20%',borderRadius:"15px"}}>
              <h3 style={{borderBottom:"1px solid gray", margin:"20px" }}>Your Bussiness</h3>
              <List component='nav' aria-label='main mailbox' sx={{ width:'500px',marginTop:"-20px"}}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Bussiness Details' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Services' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Packages' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Membership' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Calender Settings' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Calender Fields' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Constent Forms' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Booking Settings' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Multiple location' />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}}>Staff Setting </h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Sales' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Customer' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='Staff' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
              
                    <ListItemText primary='Appointment' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                 
                    <ListItemText primary='Inventory' />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}}>Stock </h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Products' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Supplier' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='Inventory Setting ' />
                  </ListItemButton>
                </ListItem>

              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}}>Notification</h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Sent Messages' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Customer Messages' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='WhatsApp Templates ' />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary=' Customer Emails' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='Notifications' />
                  </ListItemButton>
                </ListItem>

              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}}>Pramote</h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Sent Messages' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Customer Messages' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='WhatsApp Templates ' />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary=' Customer Emails' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary='Notifications' />
                  </ListItemButton>
                </ListItem>

              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}}>Point Of Sale</h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Payments Methods' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Tax Setting' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Other Setting ' />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                
                    <ListItemText primary=' Bill Settings' />
                  </ListItemButton>
                </ListItem>
                

              </List>
              <Divider sx={{ marginTop:-5 }} />
              <h3 style={{borderBottom:"1px solid gray",margin:"20px"}} >Security</h3>
              <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px',marginBottom:"15px",marginTop:"-20px" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Google Authentication' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Log Activity' />
                  </ListItemButton>
                </ListItem>
              </List>
           
          </Card>
        </Grid>
    </Fragment>
  )
}
export default ListSimple
