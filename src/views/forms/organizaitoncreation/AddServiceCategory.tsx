import React, { useState, useEffect } from 'react';


import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Dashboard from 'src/pages/dashboard';
import { useSettings } from 'src/@core/hooks/useSettings';
import AddCategory from './AddCategory';
import { AddService } from './AddService';



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
const AddServiceCategory = () => {

  const [value, setValue] = useState(0);
  const { settings } = useSettings()
  const { skin, direction } = settings
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };
  const [updateCollegeState, setUpdateCollegeState] = React.useState<any>(false);
  return (
    <>
      <Grid container spacing={1}>

        <Grid item xs={12} md={9} lg={9} sx={{ paddingRight: 1 }}  >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              variant="scrollable"

              onChange={handleChange}
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Add Category" {...a11yProps(0)} />
              <Tab label="Add Service" {...a11yProps(1)} />

            </Tabs>
          </Box>
          <TabPanel value={value} index={0}><AddCategory /></TabPanel>
          <TabPanel value={value} index={1}><AddService /></TabPanel>


        </Grid>
      </Grid>
    </>
  )
}

export default AddServiceCategory
