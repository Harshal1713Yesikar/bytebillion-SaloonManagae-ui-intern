// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Card, CardContent, Grid } from '@mui/material'
import { TextField, Box } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Button } from '@mui/material'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const service = useRouter();
  const handleService = () => {
    service.push('../service/service');
  }

  const Bussiness = useRouter();
  const handleBussiness = () => {
    Bussiness.push('../settings');
  }


  return (
    <>
      <Card style={{ width: '100%', borderRadius: "10px" }}>
        <CardContent >
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Your Bussiness</h3>
          <List component='nav' aria-label='main mailbox' sx={{}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText onClick={handleBussiness} primary='Bussiness Details' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText onClick={handleService} primary='Services' />
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
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Staff Setting </h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary='Manage Staff' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component='a' href='#simple-list'>
                <ListItemText primary='Commission' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component='a' href='#simple-list'>

                <ListItemText primary='Role' />
              </ListItemButton>
            </ListItem>

          </List>
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Stock </h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
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
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Notification</h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
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
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Pramote</h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
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
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }}>Point Of Sale</h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
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
          <Divider sx={{ marginTop: -5 }} />
          <h3 style={{ borderBottom: "1px solid gray", margin: "20px" }} >Security</h3>
          <List component='nav' aria-label='secondary mailbox' sx={{ width: '500px', marginBottom: "15px", marginTop: "-20px" }}>
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

        </CardContent>
      </Card>

    </>
  )
}
export default Dashboard
