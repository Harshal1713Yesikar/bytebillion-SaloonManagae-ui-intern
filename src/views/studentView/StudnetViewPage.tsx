// ** MUI Imports
import Grid from '@mui/material/Grid'
import StudentViewLeft from './StudentViewLeft'
import * as React from 'react';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import StudentViewAccount from './StudentViewAccount';
import StudentViewConnection from './StudentViewConnection';
import StudentViewSecurity from './StudentViewSecurity';
import UpdateStudentPaymentDetails from './UpdateStudentPaymentDetails';
import { useTheme } from '@emotion/react';
import StudentGenerateFeeReceipt from './StudentGenerateFeeReceipt';

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

const StudentUserView = () => {
  const [value, setValue] = React.useState(2);
  const [userInfo, setUserDetails] = React.useState<any>('');
  const [updateCollegeState, setUpdateCollegeState] = React.useState<any>(false);
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
        <StudentViewLeft setUpdateCollegeState={setUpdateCollegeState} updateCollegeState={updateCollegeState} />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="College & Batch Details" {...a11yProps(0)} />
            <Tab label="Course Details" {...a11yProps(1)} />
            <Tab label="Payment Details" {...a11yProps(2)} />
            {/* <Tab label="Generate Fee Receipt" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <StudentViewAccount setUpdateCollegeState={setUpdateCollegeState} updateCollegeState={updateCollegeState} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StudentViewSecurity />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StudentViewConnection />
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          <StudentGenerateFeeReceipt />
        </TabPanel> */}
      </Grid>
    </Grid>
  )
}

export default StudentUserView
