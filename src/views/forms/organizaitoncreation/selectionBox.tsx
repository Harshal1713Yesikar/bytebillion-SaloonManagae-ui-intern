import React, { useEffect, useState } from 'react';
import { MenuItem, Typography, FormControl, Grid, CardContent, GridProps, InputLabel, Select, IconButton, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { organizationDetails, customerRegistration, getCustomerDetails, getSingleOrganization } from 'src/store/APIs/Api';
import { useMsal, useAccount } from '@azure/msal-react'
import { loginRequest } from '../../../config/authConfig'
import { useRouter } from 'next/router';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import OrgCreationStepper from './OrgCreationStepper';
import JoinUsingLink from './OrganizationLink';

const Card = styled(MuiCard)<CardProps>(() => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundColor: 'transparent',
  backgroundImage: 'url(/images/pages/header.png)'
}))


const Img = styled('img')(({ theme }) => ({
  right: 60,
  bottom: -1,
  height: 170,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    position: 'static'
  }
}))

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{

            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const SelectionBox = ({ setSelectedOrganization }: any) => {

  const theme = useTheme()
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [orgId, setOrgId] = useState('');
  const [loading, setLoading] = useState(true)
  const [recall, setRecall] = useState<any>(true);
  const [customerId, setCustomerId] = useState('')
  const [userDetails, setUserDetails] = useState('');
  const [allOrganizationsList, setAllOrganizationsList] = useState([]);
  const [organizationCategoryList, setOrganizationCategoryList] = useState();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose: any = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    router.push('/');
    instance.logoutRedirect()
    localStorage.clear();
  }





  const orgSelected = (organization: any) => {

    getSingleOrganization(customerId, organization.organizationId).then((res: any) => {
      localStorage.setItem("organizationLogo", JSON.stringify({ "logo": res.data.data.organizationLogo }))
    })

    localStorage.setItem('organization', JSON.stringify(organization))
    setOrgId(organization.organizationId)
    setSelectedOrganization(organization)
    handleClose()

  }
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  const request: any = {
    ...loginRequest,
    account
  };

  const bringOrganizationsDetails = (userid: any) => {
    dispatch(organizationDetails(userid)).then((response: any) => {
      if (response.payload.data) {
        setAllOrganizationsList(response?.payload?.data?.organizations?.organizationNames);

        setLoading(false)
      }
    })
  }

  useEffect(() => {
    instance?.acquireTokenSilent(request).then((response) => {
      dispatch(customerRegistration(response.idToken)).then((res: any) => {
        localStorage.setItem('userDetails', JSON.stringify(res));
        setCustomerId(res.payload.customerId)
        setUserDetails(res.payload)
        bringOrganizationsDetails(res.payload.customerId);
        getCustomerDetails({ customerId: res.payload.customerId })
      })
    })


  }, [])

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };

  const reload = () => {
    bringOrganizationsDetails(customerId)
  }

  useEffect(() => {
    const data = localStorage.getItem('userDetails')
    if (data) {

      bringOrganizationsDetails(JSON.parse(data).payload.customerId)
      getCustomerDetails({ customerId: JSON.parse(data).payload.customerId })

      setLoading(false)
    }
  }, [recall])


  const renderedOrganizations = allOrganizationsList.map((organization: any, index: number) => {
    return (
      <MenuItem onClick={() => orgSelected(organization)}
        key={index}
        value={organization.organizationName}
      >
        <Typography> {organization.organizationName}</Typography>
      </MenuItem>

    );
  })

  const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.paper
    },
    [theme.breakpoints.up('sm')]: {
      width: '55%'
    }
  }))

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'fixed', top: 5, height: '7vh', }}>
        <Card sx={{ width: '90%', paddingX: '20px', backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', height: '7vh', alignItems: 'center', justifyContent: 'space-between', }}>
            <div className='refresh'>
              <RefreshIcon className='refresh' onClick={() => { setRecall(!recall); setLoading(true) }} />
            </div>
            <div className='signOut' >
              <Icon className='signOut' icon='bx:power-off' onClick={() => handleLogout()} />
            </div>
          </Box>
        </Card>
      </div>
      <Grid container spacing={0} sx={{ margin: '0 auto', padding: '0' }}>
        <Grid xs={12}>
          <Card>
            <CardContent sx={{ pt: 17.5, textAlign: 'center', pb: theme => `${theme.spacing(17.5)} !important` }}>
              <Grid xs={12} sm={7} style={{ margin: '0 auto', paddingTop: '40px' }}>
                <JoinUsingLink recall={recall} setRecall={setRecall} />
              </Grid>
              {
                loading ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Skeleton>
                    <Typography variant='h5' sx={{ mb: 2, mt: 13 }}>
                      Select Organization
                    </Typography>
                    <Grid xs={12} sm={6} style={{ margin: '0 auto' }}>
                      <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Your Organizations</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={[]}
                          label="your organizations"
                          MenuProps={MenuProps}
                        >
                          {renderedOrganizations.length > 0 ? (
                            <Box display="flex" flexDirection="column">
                              {renderedOrganizations}
                            </Box>
                          ) : (
                            <MenuItem disabled>
                              No data found
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Typography sx={{ mt: 3, color: 'text.secondary' }}>
                      To create new organization fill the information below and click Submit
                    </Typography>
                  </Skeleton>
                </div> :
                  <>
                    <Typography variant='h5' sx={{ mb: 2, mt: 13 }}>
                      {renderedOrganizations.length != 0 ? 'Select Organization' : 'Create Organization!'}
                    </Typography>
                    {
                      renderedOrganizations.length !== 0 ? <>
                        <Grid xs={12} sm={6} style={{ margin: '0 auto' }}>
                          <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Your Organizations</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={[]}
                              label="your organizations"
                              MenuProps={MenuProps}
                            >
                              <Box display="flex" flexDirection="column">
                                {renderedOrganizations}
                              </Box>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Typography sx={{ mt: 2, mb: -13, color: 'text.secondary' }}>
                          To create new organization fill the information below and click Submit
                        </Typography>
                      </> :
                        ''}
                  </>
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid >
      <Grid xs={12} sm={6} style={{ margin: '0 auto' }}>
        <OrgCreationStepper categoryList={organizationCategoryList} customerDetails={userDetails} refreshCall={bringOrganizationsDetails} />
      </Grid>

    </>
  );
}
export default SelectionBox;




