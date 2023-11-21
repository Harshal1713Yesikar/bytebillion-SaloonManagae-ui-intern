// ** MUI Imports
import Grid from '@mui/material/Grid'
import UserViewLeft from 'src/@core/components/user/UserViewLeft'
import UserViewRight from 'src/@core/components/user/UserViewRight'
import * as React from 'react';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import UserViewConnection from 'src/@core/components/user/UserViewConnection';
import InvoiceAndReceiptDesign from 'src/@core/components/user/UserViewSecurity';
import { useTheme } from '@emotion/react';
import OrgCreation from 'src/views/forms/organizaitoncreation/orgCreation';
import UserTable from './UserTable';
import MailSender from './MailSender';
import JoinUsingLink from 'src/views/forms/organizaitoncreation/OrganizationLink';
import { Card, CardContent, CardHeader } from '@mui/material';

// ** Demo Components Imports

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

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

const UserView = () => {

  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [isFormComplete, setIsFormComplete] = React.useState<boolean>(true)
  const [recall, setRecall] = React.useState<any>(true)
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (!isFormComplete && value == 2) {
      if (confirm("you have same unsaved changes")) {
        setValue(newValue);
        setIsFormComplete(true)
      }
    }
    else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = (url: string, newValue: number) => {
      if (!isFormComplete) {
        if (!isFormComplete && value == 2) {
          if (confirm("you have same unsaved changes")) {
            setValue(newValue);
            setIsFormComplete(true)
            router.push(url);
          }
          else {
            // Prevent navigation
            router.events.emit('routeChangeError');
            throw 'routeChange aborted';
          }
        }
        else {
          setValue(newValue);
          router.push(url);

        }

      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [isFormComplete, router]);

  useEffect(() => {
    setValue(0);
  }, [recall])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}>
        <UserViewLeft />
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
            <Tab label="Organizations" {...a11yProps(0)} />
            <Tab label="Invoice and Receipt template" {...a11yProps(1)} />
            <Tab label="Email Notifications" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserViewConnection />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <InvoiceAndReceiptDesign />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MailSender value={value} setIsFormComplete={setIsFormComplete} />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default UserView
