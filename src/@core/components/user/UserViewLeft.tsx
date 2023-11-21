// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
// import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import UserSuspendDialog from './UserSuspendDialog'

import UserSubscriptionDialog from './UserSubscriptionDialog';

// api Imports
import { getEmployeeDetails } from 'src/store/APIs/Api'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  billing: 'Enterprise',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/10.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.25rem',
  left: '-1rem',
  fontSize: '1.125rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  marginTop: '0.5rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>('')
  const [organization, setOrganization] = useState<any>({})
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {

      setUserInfo(JSON.parse(userDetails));

    }
    const orgData = localStorage.getItem('organization')
    if (orgData) {
      setOrganization(JSON.parse(orgData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar.length ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={userInfo ? userInfo.payload.customerName.charAt(0).toUpperCase() + userInfo.payload.customerName.slice(1) : ''}
                  sx={{ width: 110, height: 110, mb: 6 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                >
                  {getInitials(data.fullName)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                {userInfo ? userInfo.payload.customerName.charAt(0).toUpperCase() + userInfo.payload.customerName.slice(1) : ''}

              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={organization.role ? organization.role.roleName : ''}
                sx={{ fontWeight: 500 }}
                color={roleColors[data.role]}
              />
            </CardContent>
            <CardContent>
              {/* <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} /> */}
              <Box sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>User name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userInfo ? userInfo.payload.customerName.charAt(0).toUpperCase() + userInfo.payload.customerName.slice(1) : ''}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userInfo ? userInfo.payload.customerEmail : ''}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Customer-Id:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userInfo ? userInfo.payload.customerId : ''}</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={organization.role ? organization.role.roleStatus : ''}
                    sx={{ fontWeight: 500 }}
                    color={statusColors[data.status]}
                  />
                </Box>
               
                {/* <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Tax ID:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', mb: 4 }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>City:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userInfo ? userInfo.payload.city : ''}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box> */}
              </Box>
            </CardContent>

            {/* <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions> */}

            <Dialog
              scroll='body'
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{
                '& .MuiPaper-root': { width: '100%', maxWidth: 650 },
                '& .MuiDialogTitle-root + .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
              }}
              aria-describedby='user-view-edit-description'
            >
              <Grid container justifyContent="flex-end" sx={{ mt: '-15px' }}>
                <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  Edit User Information
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => { handleEditClose() }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid >

              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={5} sx={{ padding: 5 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth
                        label='First Name'
                        defaultValue={data.fullName.split(' ')[0]}
                        inputProps={{
                          maxLength: 50,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth
                        label='Last Name'
                        defaultValue={data.fullName.split(' ')[1]}
                        inputProps={{
                          maxLength: 50,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}

                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email}
                        inputProps={{
                          maxLength: 50,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894'
                        inputProps={{
                          maxLength: 20,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone Number' defaultValue={`+1 ${data.contact}`}
                        inputProps={{
                          maxLength: 13,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'right' }}>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>

              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          {/* <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
            <CardContent
              sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
            >
              <CustomChip rounded skin='light' size='small' color='primary' label='Standard' />
              <Box sx={{ display: 'flex', position: 'relative' }}>
                <Sup>$</Sup>
                <Typography
                  variant='h3'
                  sx={{
                    mb: -1.2,
                    lineHeight: 1,
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '2rem !important'
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 7, mb: 6 }}>
                <Box sx={{ display: 'flex', mb: 2, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
                  <Icon icon='bxs:circle' fontSize='0.35rem' />
                  <Typography component='span' sx={{ ml: 1, color: 'text.secondary' }}>
                    10 Users
                  </Typography>
                </Box>
                <Box
                  sx={{
                    my: 2,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' }
                  }}
                >
                  <Icon icon='bxs:circle' fontSize='0.35rem' />
                  <Typography component='span' sx={{ ml: 1, color: 'text.secondary' }}>
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box
                  sx={{
                    my: 2,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 2, color: 'text.secondary' }
                  }}
                >
                  <Icon icon='bxs:circle' fontSize='0.35rem' />
                  <Typography component='span' sx={{ ml: 1, color: 'text.secondary' }}>
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 1, justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
                <Typography sx={{ color: 'text.secondary' }}>26 of 30 Days</Typography>
              </Box>
              <LinearProgress value={36.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
              <Typography sx={{ mb: 9, mt: 1.5, color: 'text.secondary' }}>4 days remaining</Typography>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
                Upgrade Plan
              </Button>
            </CardContent>

            <Dialog
              scroll='body'
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby='user-view-plans'
              aria-describedby='user-view-plans-description'
              sx={{
                '& .MuiPaper-root': { width: '100%', maxWidth: 560, pt: 8, pb: 8 },
                '& .MuiDialogTitle-root ~ .MuiDialogContent-root': { pt: theme => `${theme.spacing(2)} !important` }
              }}
            >
              <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Upgrade Plan
              </DialogTitle>

              <DialogContent>
                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  pb: 8,
                  gap: 4,
                  pl: [6, 15],
                  pr: [6, 15],
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap']
                }}
              >
                <FormControl fullWidth size='small'>
                  <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                  <Select
                    label='Choose Plan'
                    defaultValue='Standard'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                  >
                    <MenuItem value='Basic'>Basic - $0/month</MenuItem>
                    <MenuItem value='Standard'>Standard - $99/month</MenuItem>
                    <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
                    <MenuItem value='Company'>Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider
                sx={{
                  mt: theme => `${theme.spacing(0.5)} !important`,
                  mb: theme => `${theme.spacing(7.5)} !important`
                }}
              />

              <DialogContent sx={{ pl: [6, 15], pr: [6, 15] }}>
                <Typography sx={{ fontWeight: 500, mb: 3.5 }}>User current plan is standard plan</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: ['wrap', 'nowrap'],
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                    <Sup>$</Sup>
                    <Typography
                      variant='h3'
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: 'primary.main',
                        fontSize: '3rem !important'
                      }}
                    >
                      99
                    </Typography>
                    <Sub sx={{ fontSize: '1.125rem', color: 'text.primary' }}>/ month</Sub>
                  </Box>
                  <Button
                    color='error'
                    sx={{ mt: 2 }}
                    variant='outlined'
                    onClick={() => setSubscriptionDialogOpen(true)}
                  >
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card> */}
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
