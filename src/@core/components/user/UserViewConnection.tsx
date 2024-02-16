// ** Next Import
import Link from 'next/link'
import * as React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import { TextField } from '@material-ui/core'
// import CardHeader from '@mui/material/CardHeader';.
import Dialog from '@mui/material/Dialog'
// import CardContent from '@mui/material/CardContent';
import { CardContent, CardHeader } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Skeleton } from '@mui/material'
import { Link as MUILink } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { AES, enc } from 'crypto-js'
import UserViewLeft from 'src/@core/components/user/UserViewLeft'

// import UserViewConnection from 'src/@core/components/user/UserViewConnection';
import JoinUsingLink from 'src/views/forms/organizaitoncreation/OrganizationLink'
import OrgCreation from 'src/views/forms/organizaitoncreation/orgCreation'
import InvoiceAndReceiptDesign from 'src/@core/components/user/UserViewSecurity'
import { useTheme } from '@emotion/react'

// import MailSender from './MailSender';
// ** Icon Imports
import Checkbox from '@mui/material/Checkbox'
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  // organizationDetails,
  getSingleOrganization,
  updateOrganization,
  organizationEmailVerification
} from 'src/store/APIs/Api'
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import ReactTooltip from 'react-tooltip';

import {
  Typography,
  Button,
  Card,
  Grid,
  Select,
  FormControl,
  Paper,
  InputLabel,
  MenuItem,
  InputAdornment,
  Input,
  DialogContent,
  OutlinedInput,
  ButtonBase,
  Accordion,
  AccordionSummary,
  Divider,
  AccordionDetails,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert
} from '@mui/material'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
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
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
interface ConnectedAccountsType {
  title: string
  logo: string
  checked: boolean
  subtitle: string
}

const connectedAccountsArr: ConnectedAccountsType[] = [
  {
    checked: true,
    title: 'Google',
    logo: '/images/logos/google.png',
    subtitle: 'Calendar and Contacts'
  },
  {
    checked: false,
    title: 'Slack',
    logo: '/images/logos/slack.png',
    subtitle: 'Communications'
  },
  {
    checked: true,
    title: 'Github',
    logo: '/images/logos/github.png',
    subtitle: 'Manage your Git repositories'
  },
  {
    checked: true,
    title: 'Mailchimp',
    subtitle: 'Email marketing service',
    logo: '/images/logos/mail-chimp.png'
  },
  {
    title: 'Asana',
    checked: false,
    subtitle: 'Communication',
    logo: '/images/logos/asana.png'
  }
]

const UserViewConnection = () => {

  const mainId = ''
  let userDetails: any
  const dispatch = useDispatch()

  const [organizationsList, setOrganizationsList] = useState<any>([])
  const [organization, setOrganization] = useState<any>({})
  const [organizationLogo, setOrganizationLogo] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [base64String, setBase64String] = useState<any>('')
  const [image, setImage] = useState<any>()
  const [error, setError] = useState<any>(null)
  const [emailSend, setEmailSend] = useState<string>('OTP')
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [userInfo, setUserDetails] = React.useState<any>('')
  const [open, setOpen] = useState<any>({ open: false, mssg: '' })
  const [snackbarColor, setSnackbarColor] = useState<boolean>()
  const [value, setValue] = useState(0)
  const [next, setNext] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false);
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [recall, setRecall] = React.useState<any>(true)
  const [categoryList, setCategoryList] = useState([])
  const [allOrganization, setAllOrganization] = useState<any>([])
  const [createOrg, setCreateOrg] = useState<any>(false)
  const [validateEmail, setValidateEmail] = useState(false)
  const [verification, setVerification] = useState(false)
  const [allValues, setAllValues] = useState({
    organizationId: ``,
    organizationName: '',
    organizationDetails: '',
    organizationCategoryId: '',
    organizationCategoryName: '',
    temporaryId: '',
    organizationPhoneNumber: '',
    organizationEmail: '',
    organizationAddress: '',
    organizationLogo: ''
  })
  const [updateOrgValues, setUpdateOrgValues] = useState({
    organizationId: ``,
    organizationName: '',
    organizationDetails: '',
    organizationCategoryId: '',
    organizationCategoryName: '',
    temporaryId: '',
    organizationPhoneNumber: '',
    organizationEmail: '',
    organizationAddress: '',
    organizationLogo: ''
  })
  const [userOtp, setUserOtp] = useState('')
  const orgDetails: any = localStorage.getItem('organization')
  const organizationValues = JSON.parse(orgDetails)

  const theme = useTheme()
  if (typeof window !== 'undefined') {
    userDetails = localStorage.getItem('userDetails')
  }

  const handleOptionChange = (event: any, newValue: any) => {
    setValue(newValue)
  }
  useEffect(() => {
    setValue(0)
  }, [recall])
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails')
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails))
    }
  }, [])
  const handleClose: any = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }



  // useEffect(() => {
  //   if (userDetails) {
  //     dispatch(organizationDetails(JSON.parse(userDetails).payload.customerId)).then((res: any) => {
  //       if (res?.payload?.data) {
  //         setOrganizationsList(res.payload.data.organizations.organizationNames)
  //         setAllOrganization(res.payload.data.organizations.organizationNames)

  //         setLoading(false)
  //       }
  //     })
  //   }
  // }, [])

  const handleVerification = () => {
    const decrypted: any = localStorage.getItem('sneat-icon')
    if (decrypted) {
      const bytes = AES.decrypt(decrypted.toString(), `test key`).toString(enc.Utf8)
      if (bytes == userOtp) {
        setValidEmail(true)
        setSnackbarColor(true)
        setOpen({ open: true, mssg: `Otp is valid` })
      } else if (bytes != userOtp) {
        setSnackbarColor(false)
        setOpen({ open: true, mssg: `Otp is invalid` })
      }
    } else {
      setSnackbarColor(false)
      setOpen({ open: true, mssg: `Otp is invalid and expired` })
    }
  }
  useEffect(() => {
    setValidEmail(false)
    setUserOtp('')
    if (allValues.organizationEmail?.length == 0) {
      setValidateEmail(false)
    } else if (
      allValues.organizationEmail?.indexOf('@') === -1 ||
      allValues.organizationEmail?.indexOf('.com') === -1
    ) {
      setValidateEmail(true)
    } else {
      setValidateEmail(false)
    }
  }, [allValues.organizationEmail])
  const orgCategoryHandler = (e: any) => {
    const ctgId = e.target.value.split('%')[0]
    const ctgName = e.target.value.split('%')[1]
    setAllValues({
      ...allValues,
      organizationCategoryId: ctgId,
      organizationCategoryName: ctgName
    })
  }
  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
    setError(null)
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit')
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)

      reader.onloadend = () => {
        const base64String = reader.result as string
        setBase64String(base64String)
        setAllValues({ ...allValues, organizationLogo: base64String })
      }
    }
  }
  const emailVerification = () => {
    const chars = '0123456789'
    let uniqueID = ''

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      uniqueID += chars[randomIndex]
    }

    const cipherText = AES.encrypt(`${uniqueID}`, `test key`).toString()
    localStorage.setItem('sneat-icon', cipherText)
    setTimeout(() => {
      localStorage.removeItem('sneat-icon')
    }, 600000)

    organizationEmailVerification({
      organizationName: allValues.organizationName,
      validationCode: uniqueID,
      organizationEmail: allValues.organizationEmail
    })
  }
  const getSingleOrganizations = () => {
    getSingleOrganization(organizationValues.customerId, organizationValues.organizationId).then((res: any) => {

      setAllValues(res?.data?.data)
      localStorage.setItem("organizationLogo", JSON.stringify({ "logo": res.data.data.organizationLogo }))
      setOrganizationLogo(res?.data?.data?.organizationLogo)
      setOrganization(res.data.data)
    })
  }

  useEffect(() => {
    if (orgDetails) {
      getSingleOrganizations()
    }

  }, [])

  const updateOrgDetails = () => {
    if (organizationLogo) {
      setAllValues({ ...allValues, organizationLogo: organizationLogo })

      updateOrganization(allValues).then((res: any) => {
        if (res.status == 200) {
          localStorage.setItem(
            'organization',
            JSON.stringify({ ...allValues, organizationLogo: organizationLogo, role: organizationValues.role })
          )
          setOrganization(allValues)
          setSnackbarColor(true)
          setOpen({ open: true, mssg: `Organization details updated successfully` })
          getSingleOrganizations()
        }
        setEditOpen(false)
      })
    }
  }

  // useEffect(() => {
  //   if (userDetails) {
  //     dispatch(organizationDetails(JSON.parse(userDetails).payload.customerId)).then((res: any) => {
  //       if (res?.payload?.data) {
  //         setCategoryList(res.payload.data.organizations.organizationCategory)
  //         setOrganizationsList(res.payload.data.organizations.organizationNames)
  //         setAllOrganization(res.payload.data.organizations.organizationNames)
  //         setLoading(false)
  //       }
  //     })
  //   }
  // }, [createOrg])

  const switchOrganization: any = (org: any) => {
    localStorage.removeItem('organization')
    localStorage.removeItem('organizationLogo')
    localStorage.setItem('organization', JSON.stringify(org))
    setOrganizationsList(organizationsList)
    setOrganization(org)
  }

  const renderedList = organizationsList.map((org: any, index: any) => {

    const isSelected = org.organizationId === organization.organizationId

    return (

      <TableRow

        key={index}
        style={{ display: 'flex', gap: '40px', cursor: 'pointer', paddingLeft: '12px' }}
        onClick={() => {
          window.location.reload()
          switchOrganization(org)
        }}
      >
        <Checkbox
          size='small'
          checked={isSelected}
          sx={{ mb: -2, mt: -1.75, ml: -1.75 }}
        />
        <TableCell className='organizationTable' >
          {org.organizationId}
        </TableCell>
        <TableCell className='organizationTable' style={{ width: '130px' }}>
          {org.organizationName}
        </TableCell>
        <TableCell className='organizationTable'>
          {org.organizationEmail}
        </TableCell>
      </TableRow>
    )

    return null
  })

  const tableHead = (
    <TableHead>
      <TableRow>
        <TableCell>Organization ID</TableCell>
        <TableCell>Organization Name</TableCell>
        <TableCell>Organization Email</TableCell>
      </TableRow>
    </TableHead>
  )
    ; <Table>
      {tableHead}
      <TableBody>{renderedList}</TableBody>
    </Table>

  return (
    <Grid container spacing={6}>

      <Grid item>
        <Card style={{ minHeight: '200px', maxWidth: '100%' }}>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between', gap: '310px', paddingLeft: '20px', paddingTop: '10px' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '270px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginRight: '20px'
                  }}
                >
                  <Grid container direction='column' spacing={1}>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '17px' }} style={{ marginBottom: '5px' }}>
                        {' '}
                        Organization details :-
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> Name :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px' }}>
                        {organization ? organization.organizationName : ''}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> category name :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px' }}>
                        {organization ? organization.organizationCategoryName : ''}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> phone number :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px' }}>
                        {organization ? organization.organizationPhoneNumber : ''}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> email :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px' }}>
                        {organization ? organization.organizationEmail : ''}
                      </Typography>
                    </Grid>

                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> address :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px' }}>
                        {organization ? organization.organizationAddress : ''}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography sx={{ fontSize: '15px', width: '150px' }}> description :</Typography>
                      <Typography sx={{ fontSize: '15px', ml: '10px', display: 'flex', flexWrap: "nowrap" }}>
                        {organization ? organization.organizationDetails : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </CardContent>
            <Grid style={{ marginTop: '5px', display: 'flex', paddingTop: '10px' }}>
              <div >
                <img
                  src={base64String ? base64String : `${organizationLogo}?timestamp=${new Date().getTime()}`}
                  alt='image'
                  width='80px'
                  loading='lazy'
                  height='80px'
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div style={{ margin: '10px', height: '60px', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Button
                  sx={{ padding: '0px !important', minWidth: '40px !important', height: 'fit-content' }}
                  onClick={() => {
                    setEditOpen(true)
                  }}
                  className='edit'
                >
                  <Icon icon='bx:pencil' />
                </Button>
              </div>

            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ ml: '-30px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleOptionChange}
                variant='scrollable'
                scrollButtons
                allowScrollButtonsMobile
                aria-label='scrollable auto tabs example'
              >
                <Tab label='Switch organizations' sx={{ mr: '50px' }} />
                <Tab label='Create new organization' />
              </Tabs>
              {value === 0 && (
                <div style={{ maxHeight: '250px', overflowY: 'auto', marginLeft: '20px' }}>
                  <CardContent>
                    {loading
                      ? connectedAccountsArr.map((val: any, index: number) => {
                        return (
                          <Box key={index}>
                            <Skeleton>
                              <Typography>{val.logo}</Typography>
                            </Skeleton>
                          </Box>
                        )
                      })
                      : renderedList}
                  </CardContent>
                </div>
              )}
              {value === 1 && (
                <TabPanel value={value} index={1}>
                  <Box>
                    <Card>
                      <CardContent>
                        <JoinUsingLink recall={recall} setRecall={setRecall} />
                      </CardContent>
                      <Box>
                        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>OR</Typography>
                      </Box>
                    </Card>
                  </Box>
                  <OrgCreation
                    setValue={0}
                    customerDetails={userInfo.payload}
                    theme={theme}
                    setCreateOrg={setCreateOrg}
                  />
                </TabPanel>
              )}
            </Box>
          </Grid>
        </Card>
      </Grid >
      {editOpen == true ? (
        <Dialog
          fullWidth
          open={editOpen}
          onClose={() => setEditOpen(false)}
          sx={{
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '800px',
              padding: '20px',
              borderRadius: '10px'
            }
          }}
        >

          <Grid container justifyContent='space-between'>
            <Grid sx={{ fontSize: "22px", }}>Edit Organization</Grid>
            <Icon
              className='iconContainer'
              onClick={() => {
                setEditOpen(false)
                getSingleOrganizations()
              }}
              style={{
                cursor: 'pointer',
                fontSize: '30px',
                marginTop: '-8px',
                marginBottom: '4px',
                transition: 'background-color 0.3s'
              }}
              icon='bx:x'
            />
          </Grid>

          <Grid container spacing={5} sx={{ paddingTop: '30px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Organization category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='organizationCategoryId'
                  style={{ marginBottom: '10px' }}
                  required
                  value={`${allValues.organizationCategoryId}%${allValues.organizationCategoryName}`}

                  // value={'category'}
                  label='Organization category'
                  onChange={orgCategoryHandler}
                >
                  {allValues && allValues.organizationCategoryId?.length > 0 ? (
                    categoryList.map((organization: any, index: any) => (
                      <MenuItem
                        key={index}
                        value={`${organization.organizationCategoryId}%${organization.organizationCategoryName}`}
                      >
                        {allValues.organizationCategoryName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No data found</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant='outlined'
                name='organizationName'
                onChange={changeHandler}
                label='Organization name'
                style={{ marginBottom: '10px' }}
                value={updateOrgValues.organizationName ? updateOrgValues.organizationName : allValues.organizationName}
                inputProps={{
                  maxLength: 50
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                name='organizationPhoneNumber'
                label='Organization phone number'
                onChange={changeHandler}
                required
                value={
                  updateOrgValues.organizationPhoneNumber
                    ? updateOrgValues.organizationPhoneNumber
                    : allValues.organizationPhoneNumber
                }
                placeholder='+911234568790'
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  min: 0,
                  max: 10000
                }}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='standard-adornment-amount'>Organization Id</InputLabel>
                <OutlinedInput
                  name='temporaryId'
                  placeholder='Organization Id'
                  label='Organization Id'
                  required
                  onChange={changeHandler}
                  value={allValues.organizationId.split('-')[1]}
                  style={{ marginBottom: '10px' }}
                  fullWidth
                  disabled
                  inputProps={{
                    maxLength: 50
                  }}
                  startAdornment={
                    <InputAdornment position='start'>{mainId ? mainId.toUpperCase() + ' - ' : ''}</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name='inventoryImage'
                  type='file'
                  onChange={handleImageChange}
                  label='Organization logo'
                  variant='outlined'
                  style={{ marginBottom: '10px' }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    style: { borderColor: 'your-border-color', borderWidth: 'your-border-width' }
                  }}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                  type='email'
                  name='organizationEmail'
                  label='Organization E-mail'
                  onChange={changeHandler}
                  value={
                    updateOrgValues.organizationEmail ? updateOrgValues.organizationEmail : allValues.organizationEmail
                  }
                  variant='outlined'
                  inputProps={{
                    maxLength: 50
                  }}
                  style={{ marginBottom: '10px', width: '85%' }}
                  error={validateEmail}
                  required
                  fullWidth
                />
                {allValues.organizationEmail && !validEmail ? (
                  <Button
                    sx={{ marginLeft: 10 }}
                    disabled={validateEmail ? true : false}
                    variant='contained'
                    onClick={() => {
                      emailVerification(), setVerification(true)
                      setEmailSend('Resend')
                    }}
                  >
                    {emailSend}
                  </Button>
                ) : null}
              </div>
            </Grid>
            {verification && !validEmail && (
              <Grid item xs={12} sx={{ display: 'flex' }}>
                <TextField
                  style={{ width: '85%' }}
                  value={userOtp}
                  variant='outlined'
                  onChange={e => setUserOtp(e.target.value)}
                />
                <Button
                  sx={{ marginLeft: 10 }}
                  variant='outlined'
                  color={validEmail ? 'success' : 'primary'}
                  onClick={() => handleVerification()}
                >
                  Verify
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-multiline-static'
                name='organizationAddress'
                label='Organization address '
                required
                onChange={changeHandler}
                minRows={3}
                inputProps={{
                  maxLength: 100
                }}
                value={
                  updateOrgValues.organizationAddress
                    ? updateOrgValues.organizationAddress
                    : allValues.organizationAddress
                }
                variant='outlined'
                placeholder='1456, Liberty Street'
                style={{ marginBottom: '10px' }}
                multiline
                fullWidth
                helperText='word limit 100'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-multiline-static'
                name='organizationDetails'
                label='Organization description '
                required
                onChange={changeHandler}
                minRows={3}
                value={
                  updateOrgValues.organizationDetails
                    ? updateOrgValues.organizationDetails
                    : allValues.organizationDetails
                }
                variant='outlined'
                multiline
                fullWidth
                inputProps={{
                  maxLength: 500
                }}
                helperText='word limit 500'
              />
            </Grid>
          </Grid>
          <hr />
          <Grid sx={{ textAlign: 'right' }}>
            <Button
              size='large'
              type='submit'
              variant='outlined'
              sx={{ mr: 4 }}
              onClick={() => {
                setEditOpen(false)
                getSingleOrganizations()
                setBase64String("")
              }}
            >
              Cancel
            </Button>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }} onClick={updateOrgDetails}>
              Update
            </Button>
            {/* {logo && <img src={logo} alt="Organization Logo" style={{ maxWidth: '100px', marginTop: '10px' }} />} */}
          </Grid>
        </Dialog>
      ) : (
        ''
      )}
      {
        open.open && (
          <Snackbar open={open.open} onClose={handleClose} autoHideDuration={3000}>
            <Alert
              variant='filled'
              elevation={3}
              onClose={handleClose}
              severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
            >
              {open.mssg}
            </Alert>
          </Snackbar>
        )
      }
    </Grid >
  )
}

export default UserViewConnection
