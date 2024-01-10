// ** React Imports
import { Fragment,useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Card, Grid } from '@mui/material';
import {TextField,Box} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import { Icon } from '@iconify/react';

const ListSimple = () => {

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Fragment>
      <Card>
      <Grid container spacing={2} sx={{display:"flex",gap:"10px",padding:5}}>
        <Card style={{width:"30%"}}>
      <Grid item xs={12} md={3} style={{width:"100%",padding:5}}>
        <h4> My Space</h4>
      <List component='nav' aria-label='main mailbox' sx={{width:"500px"}}>
        <ListItem disablePadding>
          <ListItemButton >
            <ListItemIcon>
            <Icon icon="mdi:pin" fontSize={20} color='red'/>
              {/* <Icon icon='bx:envelope' fontSize={20} /> */}
            </ListItemIcon>
            <ListItemText primary='Pinned Reports' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <Icon icon="carbon:report" fontSize={20} color='blue'/>
              {/* <Icon icon='bx:copy' fontSize={20} /> */}
            </ListItemIcon>
            <ListItemText primary='All reports' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ m: '0 !important' }} />
      <h3> Tags</h3>
      <List component='nav' aria-label='secondary mailbox' sx={{width:"500px"}}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>

              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Sales' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Customer' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Staff' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Appointment' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Inventory' />
          </ListItemButton>
        </ListItem>
      </List>
      </Grid>
      </Card>

      <Box noValidate component='form' autoComplete='off' sx={{width:"60%",height:"30px" }}>

      <TextField fullWidth label='Search Report' id='outlined-full-width' sx={{ mb: 4 }} />

      <h2><Icon icon="mdi:pin" fontSize={20} color='red'/>Pinned Reports</h2>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120,width:"100%" }}>
        <InputLabel id="demo-simple-select-filled-label" sx={{color:"black"}}>All Pinned Reports</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

    </Box>
    </Grid>
    </Card>
    </Fragment>
  )
}

export default ListSimple
