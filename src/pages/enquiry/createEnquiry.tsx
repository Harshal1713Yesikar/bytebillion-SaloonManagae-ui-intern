import {
  Card,
  CardContent,
  CardHeader,
  StepLabel,
  Stepper,
  Box,
  Step,
  StepContent,
  InputAdornment,
  Typography,
  Button,
  Paper,
  TextField,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material'
import { type } from 'os';
import QRCode from 'react-qr-code'
import ListEnquiry from './listEnquiry';
import { useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import Divider from '@mui/material/Divider'
import Icon from 'src/@core/components/icon';
import { styled } from '@mui/material/styles'
import Router, { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import React, { useState, useEffect, useId } from 'react'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CardContentProps } from '@mui/material/CardContent'
import StepperCustomDot from 'src/views/studentView/StepperCustomDot';
import html2canvas from 'html2canvas';
import { createEnquiry, enquirySubmissionMail, listOrganizationCourse } from 'src/store/APIs/Api'
import FormHelperText from '@mui/material/FormHelperText'
import GetAppIcon from '@mui/icons-material/GetApp';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { name } from '@azure/msal-common/dist/packageMetadata';

const steps: any = [
  {
    label: 'Student Details',
    icon: 'bx:user',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`
  },
  {
    label: 'Enquiry Details',
    icon: 'material-symbols:rate-review-outline-rounded',
    description: 'An ad group contains one or more ads which target a shared set of keywords.'
  },
  {
    label: 'Submit Enquiry',
    icon: 'bx:save',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
]

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === 'Enquiry' && obj?.action?.includes('create'))) {
        Router.push('/404')
      }
    }
  }, [permission])

  return <></>
}

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))
const enquirySchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().min(10).max(10).required(),
  enquiryCourse: yup.string().required(),
  courseDescription: yup.string().required(),
})

// const enquiryYesError = {
//   installmentReceivedDate: null,
//   installmentPaymentDescription: '',
//   installmentReceivedPayment: 0
// }
const CreateEnquiry = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    parentName: '',
    parentContact: '',
    college: '',
    collegeDepartment: '',
    semester: '',
    collegeCourse: '',
    enquiryCourse: '',
    courseDescription: ''
  })
  const theme = useTheme()
  const dispatch = useDispatch()
  const mode = theme.palette.mode
  const [showQr, setShowQr] = useState(false)
  const [customerId, setCustomerId] = useState()
  const [nextTrue, setNextTrue] = useState(false)
  const [customCourse, setCustomCourse] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [courseList, setCourseList] = useState<any>([])
  const router = useRouter()
  const [organizationId, setOrganizationId] = useState()
  const [responseMessage, setResponseMessage] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [emailValidation, setEmailValidation] = useState(false)
  const [downloadLink, setDownloadLink] = useState<any>("")
  const [isNext, setIsNext] = useState<boolean>(true)
  const [organizationLogo, setOrganizationLogo] = useState<any>("")
  useEffect(() => {
    const logo = localStorage.getItem("organizationLogo")
    if (logo) {
      setOrganizationLogo(JSON.parse(logo).logo)
    }
  }, [])

  let hasErrors = false;
  const changeHandler = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    if (activeStep == 0) {


      if (userData.name.length === 0 || userData.name.length >= 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          name: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          name: false,
        }));
        hasErrors = false;
      }

      if (userData.lastName.length === 0 || userData.lastName.length > 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          lastName: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          lastName: false,
        }));
        hasErrors = false;
      }

      if (userData.mobileNumber.length !== 10) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          mobileNumber: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          mobileNumber: false,
        }));
        hasErrors = false;
      }
      if (userData.email.length === 0) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          email: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          email: false,
        }));
        hasErrors = false;

        // setEmailValidation(true);
      }
    }
    else if (activeStep == 1) {
      if (userData.enquiryCourse.length === 0 || userData.enquiryCourse.length > 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          enquiryCourse: true,
        }));
        hasErrors = true;
      }
      else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          enquiryCourse: false,
        }));
        hasErrors = false;
      }
      if (userData.courseDescription.length === 0 || userData.courseDescription.length > 500) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          courseDescription: true,
        }));
        hasErrors = true;
      }
      else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          courseDescription: false,
        }));
        hasErrors = false;
      }
    }

  }


  const [activeStep, setActiveStep] = useState(0)

  const [enquiryFormErrors, setEnquiryFormErrors] = useState<any>({
    name: false,
    email: false,
    lastName: false,
    mobileNumber: false,
    enquiryCourse: false,
    courseDescription: false,
  })


  const [user, setUser] = useState<any>()

  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {

      setUser(JSON.parse(userDetails))
    }
  }, [])

  const isValidEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleNext = () => {

    if (activeStep === 0) {
      if (userData.name.length === 0 || userData.name.length >= 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          name: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          name: false,
        }));
        hasErrors = false;
      }

      if (userData.lastName.length === 0 || userData.lastName.length > 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          lastName: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          lastName: false,
        }));
        hasErrors = false;
      }

      if (userData.email.length === 0) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          email: true,
        }));
        hasErrors = true;
      } else {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          email: false,
        }));
        hasErrors = false;

      }
      if (userData.mobileNumber.length === 0) {
        setIsNext(false)
      }
      else {
        setIsNext(true)
      }



    }
    if (activeStep === 1) {
      if (userData.enquiryCourse === "") {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          enquiryCourse: true,
        }));
        hasErrors = true;
      }
      if (userData.courseDescription.length === 0 || userData.courseDescription.length > 50) {
        setEnquiryFormErrors((prevErrors: any) => ({
          ...prevErrors,
          courseDescription: true,
        }));
        hasErrors = true;
      }
    }
    if (!hasErrors) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleDownload = async () => {
    const qrCodeContainer = document.getElementById('canvas');
    if (qrCodeContainer) {
      const canvas = await html2canvas(qrCodeContainer);
      const imageUri = canvas.toDataURL('image/png');
      setDownloadLink(imageUri);
    }
  };


  useEffect(() => {
    const userData = localStorage.getItem('organization')
    if (userData) {
      setCustomerId(JSON.parse(userData).customerId)
      setOrganizationId(JSON.parse(userData).organizationId)
      setOrganizationName(JSON.parse(userData).organizationName)
    }
  }, [])

  useEffect(() => {
    if (userData.mobileNumber) {
      if (userData.mobileNumber.length < 10 || userData.mobileNumber.length > 13) {
        setIsNext(false);
        setActiveStep(0);
      }
      else {
        setIsNext(true)
      }
    }
    else {
      setActiveStep(0);
    }
  }, [userData.mobileNumber])



  const enquiryCreate = () => {

    if (
      userData.name &&
      customerId &&
      organizationId &&
      userData.enquiryCourse &&
      (userData.mobileNumber.length >= 10 && userData.mobileNumber.length < 14) &&
      userData.email) {

      const date = new Date();

      createEnquiry({
        customerId: customerId,
        organizationId: organizationId,
        studentName: `${userData.name} ${userData.lastName}`,
        "followUp": [
          {
            "followUpDate": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            "description": "Enquiry Submitted"
          }
        ],
        ...userData
      }).then(res => {
        if (res.data.msg) {
          setOpenAlert(true)
          setResponseMessage('Enquiry already exists')
          setActiveStep(0)
        } else {
          enquirySubmissionMail({
            organizationName: organizationName,
            studentEmail: userData.email,
            studentName: `${userData.name} ${userData.lastName}`,
            course: userData.enquiryCourse,
            courseDescription: userData.courseDescription,
            organizationLogo: organizationLogo,
            customerId: user.customerId,
            organizationId: user.organizationId
          })
          setOpenAlert(true)
          setResponseMessage('Enquiry is submitted successfully')
          router.push('/enquiry/listEnquiry/')
        }

        return res
      })
    }
    else if (!userData.mobileNumber || userData.mobileNumber.length < 10 || userData.mobileNumber.length > 13) {
      setActiveStep(0)
      setResponseMessage('Invalid phone number')
      setOpenAlert(true)
      setIsNext(false)
    }
    else if (userData.name && userData.email && userData.enquiryCourse && userData.courseDescription) {
      setResponseMessage('Please enter required information')
      setOpenAlert(true)
      setActiveStep(1)
    } else {
      setResponseMessage('Please enter required information')
      setOpenAlert(true)
      setActiveStep(0)
    }
  }

  const handleClose = () => {
    setShowQr(false)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const validateEmail = () => {
    if (userData.email.length > 4) {
      if (userData.email.includes('.') && userData.email.includes('@')) {
        setEmailValidation(false)
        setNextTrue(false)
      } else {
        setEmailValidation(true)
        setNextTrue(true)
      }
    } else {
      setEmailValidation(false)
      setNextTrue(false)
    }
  }


  const validateMobileNumber = () => {
    if (userData.mobileNumber && userData.mobileNumber.length >= 10 && userData.mobileNumber.length < 14) {
      setNextTrue(true)
    } else {
      setIsNext(false)
      setNextTrue(false)
    }
    if (userData.parentContact.length >= 10 && userData.parentContact.length < 14) {
      setNextTrue(true)
    } else {
      setNextTrue(false)
    }
  }

  useEffect(() => {
    courseListApiCall()
  }, [customerId, organizationId])


  useEffect(() => {
    // validateMobileNumber()
  }, [userData.mobileNumber, userData.parentContact])

  useEffect(() => {
    validateEmail()
  }, [userData.email, userData.parentName])

  const handleReset = () => {
    setActiveStep(0)
    setUserData({
      name: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      parentName: '',
      parentContact: '',
      college: '',
      collegeDepartment: '',
      semester: '',
      collegeCourse: '',
      enquiryCourse: '',
      courseDescription: ''
    })
  }

  const courseListApiCall = () => {
    if (customerId && organizationId) {
      dispatch(listOrganizationCourse({ organizationId, customerId })).then((res: any) => {
        setCourseList(res?.payload?.data?.data)
      })
    }
  }

  return (
    <>
      {permission?.some((obj: any) => obj?.title === 'Enquiry' && obj?.action?.includes('create')) && (
        <>
          <Card>
            <Box sx={{ margin: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h4'>Generate Enquiry</Typography>
              <Button variant='contained' sx={{ mr: 3, mt: 4 }} onClick={() => setShowQr(true)}>
                Show Qr <QrCode2Icon />
              </Button>
            </Box>
            <Divider />
            <CardContent>
              <Box>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                >
                  {steps.map((step: any, index: number) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={StepperCustomDot}>
                        <div className='step-label' style={{ display: 'flex', alignItems: 'center' }}>
                          <CustomAvatar
                            variant='rounded'
                            skin={activeStep === index ? 'filled' : 'light'}
                            color={activeStep >= index ? 'primary' : 'secondary'}
                            sx={{
                              mr: 2.5,
                              borderRadius: 1,
                              ...(activeStep === index && {
                                boxShadow: theme =>
                                  `0 0.1875rem 0.375rem 0 ${hexToRGBA(theme.palette.primary.main, 0.4)}`
                              })
                            }}
                          >
                            <Icon icon={step.icon} />
                          </CustomAvatar>
                          <div>
                            <Typography className='step-title'>{step.label}</Typography>
                          </div>
                        </div>
                      </StepLabel>
                      <StepContent>
                        {activeStep == 0 ? (
                          <Box>
                            <Grid container spacing={1}>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  required
                                  name='name'
                                  onChange={e => changeHandler(e)}
                                  value={userData.name}
                                  label='Name'
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                  error={Boolean(enquiryFormErrors.name)}
                                />
                                {enquiryFormErrors.name && (
                                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                    This field is required
                                  </FormHelperText>
                                )}
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  required
                                  name='lastName'
                                  onChange={e => changeHandler(e)}
                                  value={userData.lastName}
                                  label='Last name'
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                  error={Boolean(enquiryFormErrors.lastName)}
                                />
                                {enquiryFormErrors.lastName && (
                                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                    This field is required
                                  </FormHelperText>
                                )}
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  sx={{
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                      display: 'none'
                                    },
                                    '& input[type=number]': {
                                      MozAppearance: 'textfield'
                                    }
                                  }}
                                  fullWidth
                                  type='number'
                                  required
                                  label='Phone number'
                                  name='mobileNumber'
                                  placeholder='+918738238373'
                                  onChange={e => changeHandler(e)}
                                  value={userData.mobileNumber}
                                  autoComplete='OFF'
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <Icon icon='bx:phone' />
                                      </InputAdornment>
                                    )
                                  }}
                                  inputProps={{
                                    maxLength: 13,
                                    minLength: 10,

                                  }}
                                  error={!isNext}
                                />
                                {!isNext && (
                                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                    Please enter a valid phone number
                                  </FormHelperText>
                                )}
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  type='email'
                                  required
                                  label='Email'

                                  // error={emailValidation}
                                  name='email'
                                  onChange={e => changeHandler(e)}
                                  value={userData.email}
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                  error={Boolean(enquiryFormErrors.email)}
                                />
                                {enquiryFormErrors.email && (
                                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                    This field is required
                                  </FormHelperText>
                                )}
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  type='string'
                                  label="Parent/Guardian's name"
                                  name='parentName'
                                  onChange={e => changeHandler(e)}
                                  value={userData.parentName}
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                />
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  sx={{
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                      display: 'none'
                                    },
                                    '& input[type=number]': {
                                      MozAppearance: 'textfield'
                                    }
                                  }}
                                  type='number'
                                  label="Parent/Guardian's contact"
                                  name='parentContact'
                                  placeholder='+91-873-823-8373'
                                  error={userData.parentContact.length > 13}
                                  onChange={e => changeHandler(e)}
                                  value={userData.parentContact}
                                  autoComplete='OFF'
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <Icon icon='bx:phone' />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </Grid>
                              <Grid md={12} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                                College details
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  name='college'
                                  value={userData.college}
                                  onChange={e => changeHandler(e)}
                                  label='College name'
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 100,
                                  }}
                                />
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  label='College department'
                                  name='collegeDepartment'
                                  value={userData.collegeDepartment}
                                  onChange={e => changeHandler(e)}
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                />
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  sx={{
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                      display: 'none'
                                    },
                                    '& input[type=number]': {
                                      MozAppearance: 'textfield'
                                    }
                                  }}
                                  fullWidth
                                  type='number'
                                  label='Semester'
                                  name='semester'
                                  value={userData.semester}
                                  onChange={e => changeHandler(e)}
                                  autoComplete='OFF'
                                  inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    max: 50,
                                    min: 0
                                  }}
                                />
                              </Grid>
                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  label='College course'
                                  name='collegeCourse'
                                  value={userData.collegeCourse}
                                  onChange={e => changeHandler(e)}
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        ) : activeStep == 1 ? (
                          <Box>
                            <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'end' }}>
                              {
                                !customCourse ?

                                  <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>

                                    <InputLabel id="demo-multiple-name-label">Enquiry Course</InputLabel>
                                    <FormControl fullWidth>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        error={Boolean(enquiryFormErrors.enquiryCourse)}
                                        value={userData.enquiryCourse}
                                        placeholder='Enquiry course'
                                        onChange={e => setUserData({ ...userData, "enquiryCourse": e.target.value })}
                                      >
                                        {courseList && courseList.length > 0 ? (
                                          courseList.map((e: any, index: number) => (
                                            <MenuItem key={index} value={e.courseName}>
                                              {`${e.courseName.charAt(0).toUpperCase()}${e.courseName.slice(1)}`}
                                            </MenuItem>
                                          ))
                                        ) : (
                                          <MenuItem disabled>
                                            No data found
                                          </MenuItem>
                                        )}
                                        <MenuItem sx={{ background: 'secondary', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => setCustomCourse(true)} value={''}>Other<CreateIcon fontSize='small' /></MenuItem>
                                      </Select>
                                      {enquiryFormErrors.enquiryCourse && (
                                        <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                          This field is required
                                        </FormHelperText>
                                      )}
                                    </FormControl>

                                  </Grid>
                                  :
                                  <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                    <TextField
                                      fullWidth
                                      label='Enquiry course'
                                      error={Boolean(enquiryFormErrors.enquiryCourse)}
                                      value={userData.enquiryCourse}
                                      name='enquiryCourse'
                                      onChange={(e) => { setUserData({ ...userData, "enquiryCourse": e.target.value }) }}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position='end'>
                                            <Button variant='contained' onClick={() => { setCustomCourse(false) }}>Course List</Button>
                                          </InputAdornment>
                                        )
                                      }} />
                                    {enquiryFormErrors.enquiryCourse && (
                                      <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                        This field is required
                                      </FormHelperText>
                                    )}
                                  </Grid>

                              }

                              <Grid md={5} sm={3} sx={{ marginLeft: 5, marginBottom: 3, marginTop: 5 }}>
                                <TextField
                                  fullWidth
                                  minRows={3}
                                  required
                                  label='Enquiry course description'
                                  name='courseDescription'
                                  value={userData.courseDescription}
                                  onChange={e => changeHandler(e)}
                                  autoComplete='OFF'
                                  inputProps={{
                                    maxLength: 500,
                                  }}
                                  error={Boolean(enquiryFormErrors.courseDescription)}
                                />
                                {enquiryFormErrors.courseDescription && (
                                  <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-name'>
                                    This field is required
                                  </FormHelperText>
                                )}
                              </Grid>

                            </Grid>
                          </Box>
                        ) : null}

                        <Box sx={{ mb: 2, margin: 'auto', display: 'flex', justifyContent: 'right' }}>
                          <div>
                            <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                              Back
                            </Button>
                            {index === steps.length - 1 ? (
                              <Button
                                variant='contained'
                                onClick={() => {
                                  enquiryCreate()
                                }}
                                disabled={nextTrue}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Submit
                              </Button>
                            ) : (
                              <Button
                                variant='contained'
                                onClick={handleNext}
                                disabled={nextTrue}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Next
                              </Button>
                            )}
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </CardContent>
            <Dialog open={showQr} onClose={handleClose}>
              <Grid container justifyContent="space-between" alignItems="center" >
                <div>

                  <Icon
                    onClick={() => { handleDownload() }}
                    className="iconContainer"
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      margin: "8px",
                      transition: "background-color 0.3s",
                    }}
                    icon='bx:download'
                  />

                  {/* <Button onClick={() => { window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${organizationId}?userId=${customerId}&organizationName=${organizationName.replaceAll(" ", "%20")}`) }}> */}
                  <Icon
                    className="iconContainer"
                    onClick={() => { window.navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${organizationId}?userId=${customerId}&organizationName=${organizationName.replaceAll(" ", "%20")}`) }}
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      margin: "8px",
                      transition: "background-color 0.3s",
                    }}
                    icon='bx:copy'
                  />
                  {/* </Button> */}
                </div>
                <Icon
                  className="iconContainer"
                  onClick={() => { handleClose(); setDownloadLink(''); }}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid>
              {
                downloadLink && <div>
                  <a href={downloadLink} download="EnquiryQrCode.png">Click to download</a>
                </div>
              }

              <DialogContent>
                <div id='canvas'>
                  <QRCode
                    fgColor={mode == 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}
                    bgColor={mode == 'dark' ? theme.palette.background.paper : 'white'}
                    value={`${process.env.NEXT_PUBLIC_CREATE_ENQUIRY_REDIRECT_URL}${organizationId}?userId=${customerId}&organizationName=${organizationName.replaceAll(" ", "%20")}`}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </Card>
          <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
            {responseMessage && responseMessage == 'Enquiry is submitted successfully' ? (
              <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                {String(responseMessage)}
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                {String(responseMessage)}
              </Alert>
            )}
          </Snackbar>
        </>
      )
      }

      <Error404Component permission={permission} />
      {/* <div style={{}}>
        <ListEnquiry />
      </div> */}
    </>
  )
}


export default CreateEnquiry
