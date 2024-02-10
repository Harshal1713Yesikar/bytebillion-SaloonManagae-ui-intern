// ** React Imports
import {SyntheticEvent,Fragment,useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Card, Grid } from '@mui/material';
import {TextField,Box} from '@mui/material'

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useRouter } from 'next/router'

import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'



// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import { Icon } from '@iconify/react';

const ListSimple = () => {

  // const [age, setAge] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false)
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [newactiveTable, setnewActiveTable] = useState<string | null>(null);
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const showTable = (tableId: string) => {
    setActiveTable(tableId);
  };

  const newshowTable = (tableId: string) => {
    setnewActiveTable(tableId);
  };


  // const router = useRouter()
  // const handleClick = () => {
  //   // Perform any necessary actions before redirection
  //   // console.log('Card clicked');
  //   router.push('./reportAllComponents/pinnedReports')
  // }
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };

  return (
    <Fragment>
      <Card>
      <Grid container spacing={2} sx={{display:"flex",gap:"10px",padding:5}}>
        <Card style={{width:"30%"}}>
      <Grid item xs={12} md={3} style={{width:"100%",padding:5}}>
        <h4> My Space</h4>
      <List component='nav' aria-label='main mailbox' sx={{width:"500px"}}>
        <ListItem disablePadding onClick={() => showTable('table1')}>
          <ListItemButton >
            <ListItemIcon>
            <Icon icon="mdi:pin" fontSize={20} color='red'/>
              {/* <Icon icon='bx:envelope' fontSize={20} /> */}
            </ListItemIcon>
            <ListItemText primary='Pinned Reports' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => showTable('table2')}>
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
            <ListItemText primary='Sales' onClick={() => newshowTable('newtable3')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Customer' onClick={() => newshowTable('newtable4')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Staff'  onClick={() => newshowTable('newtable5')}/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Appointment' onClick={() => newshowTable('newtable6')}/>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon="la:tags" fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Inventory' onClick={() => newshowTable('newtable7')} />
          </ListItemButton>
        </ListItem>
      </List>
      </Grid>
      </Card>

      <Box noValidate component='form' autoComplete='off' sx={{width:"60%",height:"30px" }}>

      <TextField fullWidth label='Search Report' id='outlined-full-width' sx={{ mb: 4 }} />

    {/* Right Side bar Data strted from here */}

    {/* Pinned Report data */}
      <div style={{display: activeTable === 'table1' ? 'block' : 'none' }}>
      <h2><Icon icon="mdi:pin" fontSize={20} color='red'/>Pinned Reports</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
           1.  Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

{/* All reports data */}
    <div style={{display: activeTable === 'table2' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />All Reports</h2>


    {/* Only Sales Data */}
    <div style={{display: newactiveTable === 'newtable3' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />Sales</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
            3. Sales Data sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>


      {/* Only customer Data */}
      <div style={{display: newactiveTable === 'newtable4' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />Customer</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>Customer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
            3. Sales Data sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
       {/* Only Staff Data */}
       <div style={{display: newactiveTable === 'newtable5' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />Staff</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>Staff</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
            3. Sales Data sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>


        {/* Only Appointment Data */}
        <div style={{display: newactiveTable === 'newtable6' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />Appointment</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>Appointment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
            3. Sales Data sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>


         {/* Only inventory Data */}
        <div style={{display: newactiveTable === 'newtable7' ? 'block' : 'none'}}>
      <h2> <Icon icon="la:tags" fontSize={20} />inventory</h2>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='panel-header-1'
          aria-controls='panel-content-1'
          expandIcon={<Icon icon='bx:chevron-down' />}
        >
          <Icon icon='bx:bar-chart' fontSize={20} />
          <Typography sx={{ ml: 2 }}>inventory</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2'>
            3. Sales Data sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
            Topping soufflé tart sweet croissant.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>


    </div>





      {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120,width:"100%" }}>
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
      </FormControl> */}

    </Box>
    </Grid>
    </Card>
    </Fragment>
  )
}

export default ListSimple
