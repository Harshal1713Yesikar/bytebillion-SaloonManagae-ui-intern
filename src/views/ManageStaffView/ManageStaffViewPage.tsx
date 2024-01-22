import React, { useState, useEffect } from 'react';
import CreateStaff from './AddStaff'
import StaffList from './StaffList'

import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Dashboard from 'src/pages/dashboard';
import { useSettings } from 'src/@core/hooks/useSettings';
import StaffSchedule from './StaffSchedule';
import UploadAttendace from './UploadAttandace';
import InactiveStaff from './InactiveStaff';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const ManageStaffViewPage = () => {

    const [value, setValue] = useState(0);
    const {settings} = useSettings()
    const { skin, direction } = settings  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {setValue(newValue);};
    const [updateCollegeState, setUpdateCollegeState] = React.useState<any>(false);
  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} lg={3}>
        <Dashboard/>
      </Grid>
        <Grid item xs={12} md={9} lg={9} sx={{paddingRight:1}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            variant="scrollable"

            onChange={handleChange}
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
          >
            <Tab label="staff List" {...a11yProps(0)} />
            <Tab label="Add Staff" {...a11yProps(1)} /> 
            <Tab label="Staff Schedule" {...a11yProps(2)} />
            <Tab label="Upload Attendance" {...a11yProps(3)} />
            <Tab label="Inactive Staff" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}><StaffList setUpdateCollegeState={setUpdateCollegeState} updateCollegeState={updateCollegeState}/></TabPanel>
          <TabPanel value={value} index={1}><CreateStaff/></TabPanel>
          <TabPanel value={value} index={2}><StaffSchedule/></TabPanel>
          <TabPanel value={value} index={3}><UploadAttendace/></TabPanel>
          <TabPanel value={value} index={4}><InactiveStaff/></TabPanel>
         
          </Grid>
        </Grid>
    </>
  )
}

export default ManageStaffViewPage
