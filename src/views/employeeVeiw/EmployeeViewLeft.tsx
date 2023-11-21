// ** React Imports
import { useState, forwardRef, ChangeEvent, useEffect } from 'react'

// import { useEffect, useState } from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
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
import DialogContentText from '@mui/material/DialogContentText'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import EventNoteIcon from '@mui/icons-material/EventNote';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from './UserSuspendDialog'
import UserSubscriptionDialog from './UserSubscriptionDialog'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomInput from './PickersCustomInput/PickersCustomInput'
import { ReactDatePickerProps } from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePicker from 'react-datepicker'
import InputAdornment from '@mui/material/InputAdornment';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// Api imports
import { getEmployeeDetails, inactiveEmployee } from 'src/store/APIs/Api'
import { updateEmployee } from 'src/store/APIs/Api'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'


interface ColorsType {
  [key: string]: ThemeColor
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



const EmployeeViewLeft = () => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 15);
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date(currentDate);
  maxDate.setMonth(11, 31);

  const theme = useTheme()
  const { direction } = theme
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [submitted, setSubmitted] = useState<boolean>(false)

  // ** States
  const [user, setUser] = useState<any>()
  const [deletePopUp, setDeletePopUp] = useState<any>()
  const [openPopUp, setOpenPopUp] = useState<any>(false)
  const [singleEmployeeData, setSingleEmployeeData] = useState<any>()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [updateEmployeeStatus, setUpdateEmployeeStatus] = useState<any>()
  const [activeState, setActiveState] = useState<boolean>(false)
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)

  //snackBarUseState
  const [open, setOpen] = useState<any>({ open: false, mssg: "" })
  const handleClose = () => {

    if (open.open == true) {
      setOpen({ open: false, mssg: "" })
    }

  }

  // function for inactive pop up
  const handleConfirmation = (value: string) => {
    handleDeleteClose()

  }

  const handleDeleteClose = () => {
    setOpenPopUp(false)
  }

  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [popUpButtonValue, setPopUpButtonValue] = useState<any>()
  const [date, setDate] = useState<any>(new Date())
  const router = useRouter()
  const [snackbarColor, setSnackbarColor] = useState<boolean>(false)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [employeeDateOfBirth, setEmployeeDateOfBirth] = useState<any>()
  const { employeeId } = router.query

  const [employeeData, setEmployeeData] = useState<any>(
    {
      customerId: user ? user.customerId : "",
      organizationId: user ? user.organizationId : "",
      employeeId: employeeId,
      employeeFirstname: "",
      employeeLastname: "",
      employeeEmail: "",
      employeePhoneNumber: "",
      employeeDateOfBirth: "",
      employeeDepartment: "",
      employeeDesignation: "",
      employeeAddress: "",
      employeeEducationDetails: "",

      employeeGurdianName: "",
      employeeGurdianContactNumber: "",

      employeeHighSchoolName: "",
      employeeHighSchoolAddress: "",
      employeeHighSchoolBoard: "",
      employeeHighSchoolPercentage: "",

      employeeHigherSecondarySchoolAddress: "",
      employeeHigherSecondarySchoolBoard: " ",
      employeeHigherSecondarySchoolName: "",
      employeeHigherSecondarySchoolPercentage: "",

      employeeUnderGraduationCollegeAddress: " ",
      employeeUnderGraduationCollegeCourseName: "",
      employeeUnderGraduationCollegeName: "",
      employeeUnderGraduationCollegePercentage: " ",

      employeePostGraduationCollegeAddress: "",
      employeePostGraduationCollegeCourseName: "",
      employeePostGraduationCollegeName: "",
      employeePostGraduationCollegePercentage: "",

      employeeBankName: "",
      employeeIfsceCode: "",
      employeeAccountNo: "",
    }
  )

  const data: UsersType = {
    id: 1,
    role: 'admin',
    status: singleEmployeeData ? singleEmployeeData.employeeStatus : "",
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

  const [employeeStatus, setEmployeeStatus] = useState('active')

  useEffect(() => {

    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""

    if (customerId && organizationId && employeeId) {
      getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {

        setSingleEmployeeData(res.data)
        setIsLoading(false)
      })
    }

  }, [employeeId, user, updateEmployeeStatus])


  const handleUpdateApi = () => {

    const [day, month, year] = date.split('/');
    const convertedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const newDate = convertedDate.toISOString();

    if (!isNaN(employeeData.employeePhoneNumber) && employeeData.employeePhoneNumber.length >= 10 &&
      employeeData.employeePhoneNumber.length <= 13 && !isNaN(employeeData.employeeGurdianContactNumber) &&
      employeeData.employeeGurdianContactNumber.length >= 10 && employeeData.employeeGurdianContactNumber.length <= 13 && employeeData.employeeStatus && employeeData.employeeFirstname && employeeData.employeeLastname && employeeData.employeeEmail && employeeData.employeeSkills && employeeData.employeeGurdianName && employeeData.employeeAddress && employeeData.employeeDepartment && employeeData.employeeDesignation) {
      handleEditClose()
      updateEmployee({ ...employeeData, employeeDateOfBirth: newDate }).then((res: any) => {
        if (res.statuscode == 200) {

          setSingleEmployeeData(res.data)
          setUpdateEmployeeStatus(true)
          setSnackbarColor(true)
          setSnackbaropen(true)
          setResponseMessage("Employee details updated successfully ")
          setSubmitted(false)
        }
        else {
          setOpen({ open: true, mssg: res.message })
        }
      })
    }
    else if ((employeeData.employeePhoneNumber.length < 10 && employeeData.employeePhoneNumber.length > 13) || (employeeData.employeeGurdianContactNumber.length < 10 && employeeData.employeeGurdianContactNumber.length > 13)) {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill the details correctlly")
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill the required information")
    }

  }
  const changeHandler = (e: any) => {

    setEmployeeData((pervState: any) => ({

      ...pervState,
      [e.target.name]: e.target.value
    }))
    setSingleEmployeeData(employeeData)
  }

  const [apiDataCall, setApiDataCall] = useState<any>()

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  useEffect(() => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      setDate(formattedDate);
    }


  }, [date]);


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])







  const handleEditClickOpen = () => {
    const customerId = user ? user.customerId : ""
    const organizationId = user ? user.organizationId : ""
    setOpenEdit(true)
    getEmployeeDetails(customerId, employeeId, organizationId)
      .then((res) => {
        const timestamp = res.data.employeeDateOfBirth;
        const dateObject = new Date(timestamp);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
        const year = dateObject.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        res.data.employeeDateOfBirth = formattedDate;
        setEmployeeData(res.data)


        setDate(res.data.employeeDateOfBirth)

        setApiDataCall(true)
      })
  }
  const handleEditClose = () => setOpenEdit(false)


  const styles = {

    subHeading: {
      // fontWeight: "bold",
      marginTop: "2vh",
      color: "#899499"

    }
  }

  const handleInactiveApi = () => {
    const customerId = user ? user.customerId : ""

    const employeeData = {
      customerId: customerId,
      employeeId: employeeId,
      employeeStatus: employeeStatus
    }
    inactiveEmployee(employeeData).then((res: any) => {
      if (res.statusCode == 206) {

        const customerId = user ? user.customerId : ""
        const organizationId = user ? user.organizationId : ""

        if (customerId && organizationId && employeeId) {
          getEmployeeDetails(customerId, employeeId, organizationId).then((res) => {
            setSingleEmployeeData(res.data)
            setIsLoading(false)
          })
        }

        // router.push('/employee/employeeList')
      }
    })
  }
  const formatDate = (isoDateString: any) => {
    const dateObject = new Date(isoDateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (data) {
    return (
      <>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) :
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ mt: 3, mb: 3, display: 'flex', alignItems: 'left' }}>

                <Button sx={{ mr: 2 }} onClick={() => { router.push('/employee/employeeList') }} variant='outlined' >
                  &#8592; employeeList
                </Button>
              </Box>
              <Card>
                <CardContent sx={{ pt: 12, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  {data.avatar.length ? (
                    <CustomAvatar
                      src={data.avatar}
                      variant='rounded'
                      alt={singleEmployeeData ? `${singleEmployeeData.employeeFirstname.charAt(0).toUpperCase() + singleEmployeeData.employeeFirstname.slice(1)}` : ""}
                      sx={{ width: 110, height: 110, mb: 6 }}
                    />
                  ) : (
                    <CustomAvatar
                      skin='light'
                      variant='rounded'
                      color={data.avatarColor as ThemeColor}
                      sx={{ width: 110, height: 110, fontWeight: 600, mb: 6, fontSize: '3rem' }}
                    >
                      {/* {getInitials(data.fullName)} */}

                    </CustomAvatar>
                  )}
                  <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.375rem !important' }}>
                    {singleEmployeeData ? `${singleEmployeeData.employeeFirstname.charAt(0).toUpperCase() + singleEmployeeData.employeeFirstname.slice(1)} ${singleEmployeeData.employeeLastname.charAt(0).toUpperCase() + singleEmployeeData.employeeLastname.slice(1)}` : ""}
                  </Typography>
                  {/* <CustomChip
                rounded
                skin='light'
                size='small'
                label={data.role}
                sx={{ fontWeight: 500 }}
                color={roleColors[data.role]}
              /> */}
                </CardContent>

                <CardContent sx={{ mt: 6, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'center', flexDirection: 'column' }}>
                    <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                        <Icon icon='fluent-emoji-high-contrast:department-store' />
                      </CustomAvatar>
                      <div>
                        <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
                          Department

                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{singleEmployeeData ? singleEmployeeData.employeeDepartment : ""}</Typography>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                        <Icon icon='fluent-emoji-high-contrast:department-store' />
                      </CustomAvatar>
                      <div>
                        <Typography variant='h6' sx={{ fontSize: '1.125rem !important' }}>
                          Designation

                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}> {singleEmployeeData ? singleEmployeeData.employeeDesignation : ""}</Typography>
                      </div>
                    </Box>
                  </Box>
                </CardContent>

                <CardContent>

                  <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>Details</Typography>

                    <Grid>

                      {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) &&
                        <Button className='edit' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={handleEditClickOpen}>
                          <Icon
                            cursor="pointer"
                            icon='bx:pencil' />
                        </Button>}

                      {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("delete")) &&
                        <Button className='delete' sx={{ padding: '0px !important', minWidth: '40px !important' }} onClick={() => {
                          setSuspendDialogOpen(true)
                        }}>
                          <Icon cursor="pointer" icon='ic:baseline-delete' />
                        </Button>}

                    </Grid>
                  </Grid>

                  <Divider sx={{ mt: theme => `${theme.spacing(1)} !important` }} />
                  <Box sx={{ pt: 4, pb: 2 }}>

                    <Box sx={{ display: 'flex', mb: 4, gap: "30px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> Full name:</Typography>

                      <Typography sx={{ color: 'text.secondary' }}> {singleEmployeeData ? `${singleEmployeeData.employeeFirstname.charAt(0).toUpperCase() + singleEmployeeData.employeeFirstname.slice(1)} ${singleEmployeeData.employeeLastname.charAt(0).toUpperCase() + singleEmployeeData.employeeLastname.slice(1)}` : ""}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "30px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}> E-mail:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singleEmployeeData ? singleEmployeeData.employeeEmail : ""}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "100px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Status:</Typography>
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={singleEmployeeData ? singleEmployeeData.employeeStatus : ""}
                        sx={{ fontWeight: 500 }}
                        color={singleEmployeeData?.employeeStatus === 'active' ? 'success' : 'warning'}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "50px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Date of birth:</Typography>
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{singleEmployeeData ? formatDate(singleEmployeeData.employeeDateOfBirth) : ""}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "50px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Code:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singleEmployeeData ? singleEmployeeData.employeeCode : ""}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "50px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Skills:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{singleEmployeeData ? singleEmployeeData.employeeSkills : ""}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 4, gap: "70px" }}>
                      <Typography sx={{ mr: 2, fontWeight: 700, color: 'text.secondary' }}>Contact:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>+91 {singleEmployeeData ? singleEmployeeData.employeePhoneNumber : ""}</Typography>
                    </Box>

                  </Box>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

                </CardActions>
                {isLoading ? (
                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) :
                  <Dialog
                    scroll='body'
                    open={openEdit}
                    aria-labelledby='user-view-edit'

                    aria-describedby='user-view-edit-description'
                  >
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                      <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                        Edit Employee Information
                      </DialogTitle>
                      <Icon
                        className="iconContainer"

                        onClick={() => {
                          handleEditClose()
                          setFormUpdateButton(false)
                          setSubmitted(false)
                        }}
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

                      {apiDataCall == true ? <>
                        <form>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth label='First name'
                                inputProps={{
                                  maxLength: 50,
                                }}
                                style={{
                                  width: "100%"
                                }}
                                required name='employeeFirstname' onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeeFirstname ? false : true : false}
                                helperText={submitted && !employeeData.employeeFirstname ? 'Required,max 50 chars' : ''}
                                value={employeeData ? employeeData.employeeFirstname : ""} defaultValue={data.fullName.split(' ')[0]} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth label='Last name'
                                inputProps={{
                                  maxLength: 50,
                                }}
                                required name="employeeLastname" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeeLastname ? false : true : false}
                                helperText={submitted && !employeeData.employeeLastname ? 'Required,max 50 chars' : ''}
                                value={employeeData ? employeeData.employeeLastname : ""} defaultValue={data.fullName.split(' ')[1]} />

                            </Grid>

                            <Grid item xs={12} sm={6}>

                              <DatePickerWrapper>

                                <DatePicker
                                  dateFormat="dd/MM/yyyy"

                                  id='basic-input'
                                  name="employeeDateOfBirth"
                                  value={date ? date : employeeData ? employeeData.employeeDateOfBirth.slice(0, 10) : ""}

                                  popperPlacement={popperPlacement}
                                  required
                                  minDate={minDate}
                                  maxDate={maxDate}
                                  showYearDropdown
                                  showMonthDropdown
                                  yearDropdownItemNumber={50}
                                  onChange={
                                    (date: Date,) => {
                                      setDate(date); setFormUpdateButton(true)
                                    }
                                  }
                                  placeholderText='Select a date'
                                  customInput={<CustomInput
                                    InputProps={{
                                      endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                    }}
                                    label='Date of birth'
                                    error={submitted ? date ? false : true : false}
                                    helperText={submitted && !date ? 'Date of birth is required' : ''} />}
                                />
                              </DatePickerWrapper>

                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth
                                inputProps={{
                                  maxLength: 50,
                                }}
                                type='email' name="employeeEmail" required onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeeEmail ? false : true : false}
                                helperText={submitted && !employeeData.employeeEmail ? 'Required,max 50 chars' : ''}
                                value={employeeData ? employeeData.employeeEmail : ""} label='Email' defaultValue={data.email} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth label='Skills'
                                inputProps={{
                                  maxLength: 100,
                                }}
                                style={{
                                  width: "100%"
                                }}
                                required name='employeeSkills' onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeeSkills ? false : true : false}
                                helperText={submitted && !employeeData.employeeSkills ? 'Required,max 100 chars' : ''}
                                value={employeeData ? employeeData.employeeSkills : ""} />

                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth label="Father's name"
                                inputProps={{
                                  maxLength: 50,
                                }}
                                required name="employeeGurdianName" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }} error={submitted ? employeeData.employeeGurdianName ? false : true : false}
                                helperText={submitted && !employeeData.employeeGurdianName ? 'Required,max 50 chars' : ''}
                                value={employeeData ? employeeData.employeeGurdianName : ""} defaultValue='Father Name' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth
                                sx={{
                                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none'
                                  },
                                  '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                  }
                                }}
                                required
                                type='number'
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  max: 13,
                                }}


                                label='Phone number' name="employeePhoneNumber" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeePhoneNumber ? false : true : false}
                                helperText={submitted && !employeeData.employeePhoneNumber ? 'Phone number is required' : ''}
                                value={employeeData ? employeeData.employeePhoneNumber : ""} defaultValue={`+1 ${data.contact}`} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                sx={{
                                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none'
                                  },
                                  '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                  }
                                }}
                                type='number'
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  max: 13,
                                }}



                                fullWidth label="Father's phone number" required name="employeeGurdianContactNumber" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? employeeData.employeeGurdianContactNumber ? false : true : false}
                                helperText={submitted && !employeeData.employeeGurdianContactNumber ? 'Phone number is required' : ''}
                                value={employeeData ? employeeData.employeeGurdianContactNumber : ""} defaultValue={`+1 ${data.contact}`} />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                              <TextField fullWidth
                                inputProps={{
                                  maxLength: 100,
                                }}
                                label='Address' required name="employeeAddress" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }} value={employeeData ? employeeData.employeeAddress : ""} defaultValue="Address"
                                error={submitted ? employeeData.employeeAddress ? false : true : false}
                                helperText={submitted && !employeeData.employeeAddress ? 'Required,max 100 chars' : ''} />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth
                                inputProps={{
                                  maxLength: 50,
                                }}
                                label='Department' required name="employeeDepartment" onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }} value={employeeData ? employeeData.employeeDepartment : ""} defaultValue="Department"
                                error={submitted ? employeeData.employeeDepartment ? false : true : false}
                                helperText={submitted && !employeeData.employeeDepartment ? 'Required,max 500 chars' : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                              <TextField fullWidth
                                inputProps={{
                                  maxLength: 50,
                                }}
                                label='Designation' required name="employeeDesignation"
                                onChange={(event) => {
                                  changeHandler(event);
                                  setFormUpdateButton(true);
                                }} value={employeeData ? employeeData.employeeDesignation : ""} defaultValue="Designation"
                                error={submitted ? employeeData.employeeDesignation ? false : true : false}
                                helperText={submitted && !employeeData.employeeDesignation ? 'Required,max 50 chars' : ''} />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', pr: 12 }}>
                              <Typography sx={{ mt: 2, ml: 12, color: 'text.secondary' }} >
                                Current status  {employeeData?.employeeStatus == 'active' ?
                                  <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={employeeData?.employeeStatus} />
                                  :
                                  <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={employeeData?.employeeStatus} />
                                }
                              </Typography>
                              <Grid>
                                <Typography sx={{ mt: 2, color: 'text.secondary' }} >
                                  Change status
                                  {permission?.some((obj: any) => obj?.title === "Employee" && obj?.action?.includes("update")) ?
                                    singleEmployeeData.employeeStatus == "active" ?
                                      <Button sx={{ margin: "5px", }} variant='contained' onClick={() => { setOpenPopUp(true), setDeletePopUp(true), setEmployeeStatus('inactive') }}>
                                        Inactive
                                      </Button> : <Button sx={{ margin: "5px", }} variant='contained' onClick={() => { setOpenPopUp(true), setEmployeeStatus('active'), handleInactiveApi() }}>
                                        active
                                      </Button> : ''}
                                </Typography>
                              </Grid>

                            </Grid>
                          </Grid>
                        </form></> : ""}


                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'end', mt: 4 }}>
                      <Button variant='outlined' color='secondary' onClick={() => {
                        handleEditClose()
                        setFormUpdateButton(false)
                        setSubmitted(false)
                      }}>
                        Cancel
                      </Button>
                      <Button variant='contained' sx={{ mr: 2 }} onClick={() => {
                        handleUpdateApi(); setFormUpdateButton(false); setSubmitted(true)
                      }} disabled={!formUpdateButton}>
                        Update
                      </Button>

                    </DialogActions>
                  </Dialog>
                }

                <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} user={user} employeeId={employeeId} />
                <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
              </Card>
            </Grid>
          </Grid>}
        {/* inactive dialog */}
        {deletePopUp ? <Dialog fullWidth open={openPopUp} onClose={handleDeleteClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
          <Grid container justifyContent="flex-end">
            <Icon
              className="iconContainer"
              onClick={() => { handleConfirmation('cancel'), setEmployeeStatus("active") }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </Grid >
          <DialogContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                  Are you sure?
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert Employee !</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', mt: 5 }}>
            <Button variant='outlined' color='secondary' onClick={() => { handleConfirmation('cancel'), setEmployeeStatus("active") }}>
              Cancel
            </Button>
            <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
              handleConfirmation('yes')
              handleInactiveApi()

            }}>
              Yes, Inactive Employee!
            </Button>

          </DialogActions>
        </Dialog> : ""
        }
        {/* for active state */}
        {deletePopUp ? <Dialog fullWidth open={openPopUp} onClose={handleDeleteClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
          <Grid container justifyContent="flex-end">
            <Icon
              className="iconContainer"
              onClick={() => { handleConfirmation('cancel'), setEmployeeStatus("active") }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
          </Grid >
          <DialogContent sx={{ pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                <Typography variant='h4' sx={{ color: 'text.secondary', mt: '7px' }}>
                  Are you sure?
                </Typography>
              </Box>
              {/* <Typography sx={{ fontSize: '1.125rem' }}>You won't be able to revert Employee !</Typography> */}
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right' }}>
            <Button variant='outlined' color='secondary' onClick={() => { handleConfirmation('cancel'), setEmployeeStatus("active") }}>
              Cancel
            </Button>
            <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
              handleConfirmation('yes')
              handleInactiveApi()
              handleEditClose()
            }}>
              Change the status to {employeeStatus} !
            </Button>

          </DialogActions>
        </Dialog> : ""
        }

        {/* snack bar  */}
        <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
          <Alert
            variant="filled"
            elevation={3}
            onClose={() => setSnackbaropen(false)}
            severity={snackbarColor === true ? 'success' : 'error'}
          >
            {responseMessage}
          </Alert>
        </Snackbar>
      </>
    )
  } else {
    return null
  }
}

export default EmployeeViewLeft
