// ** MUI Imports
import Grid from '@mui/material/Grid'
import InventoryViewLeft from './InventoryViewLeft';
import UserViewRight from 'src/@core/components/user/UserViewRight'
import * as React from 'react';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import InventoryViewAccount from './InventoryViewAccount';
import InventoryViewConnection from './InventoryViewConnection';
import InventoryViewSecurity from './InventoryViewSecurity';
import InventoryViewBilling from './InventoryViewBilling';


import { useTheme } from '@emotion/react';

// ** Demo Components Imports

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const InventoryViewPage = () => {

  const [value, setValue] = React.useState(0);
  const [userInfo, setUserDetails] = React.useState<any>('');
  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
    }
  }, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}>
        <InventoryViewLeft />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Receipt" {...a11yProps(0)} />
            {/* <Tab label="Salary Record" {...a11yProps(1)} /> */}
            {/* <Tab label="Pay Slip" {...a11yProps(2)} /> */}
            {/* <Tab label="Connection" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <InventoryViewAccount />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InventoryViewBilling />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <InventoryViewSecurity />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <InventoryViewConnection />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default InventoryViewPage
