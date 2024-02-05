// ** React Imports
import { ChangeEvent, Fragment, useState, useEffect, useCallback, forwardRef } from 'react'
import AddServiceCategory from './AddServiceCategory'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import MuiStep, { StepProps } from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import {
  karomanageWelcomeMail,
  organizationDetails,
  organizationEmailVerification,
  organizationRegistration,
  salonRegistration
} from 'src/store/APIs/Api'
import { AccordionDetails, Alert, CardHeader, FormHelperText, Snackbar } from '@mui/material'

import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { Router } from 'react-router-dom'

import * as yup from 'yup'
interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}
interface FormInputs {
  firstName: string
  lastName: string
  email: string
  password: string
  dob: DateType
  doJ: DateType
  mobileNo: string
  hourlyRate: string
  fixedSalary: string
  workingDay: string
  staffpermission: string
  designation: string
  gender: string
  shiftHours: string
  staffPermission: string
}

const AddStaffSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  // email: yup.string().email().required(),
  email: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
    .email()
    .required(),
  // password: yup.string().min(8).required(),
  password: yup.string().min(8, 'Requied ,Minimum 8 characters').required('Password is required'),
  dob: yup.date().required(),
  doJ: yup.date().required(),
  mobileNo: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required(),
  hourlyRate: yup
    .string()
    .max(20, 'Fixed salary must be at most 20 characters')
    .matches(/^\d+$/, 'Fixed salary must contain only numbers')
    .required('Fixed salary is required'),
  fixedSalary: yup
    .string()
    .max(20, 'Fixed salary must be at most 20 characters')
    .matches(/^\d+$/, 'Fixed salary must contain only numbers')
    .required('Fixed salary is required'),
  workingDay: yup
    .string()
    .max(2, 'Fixed Day must be at most 2 characters')
    .matches(/^\d+$/, 'This field is required')
    .required('Fixed salary is required'),
  staffpermission: yup.string(),
  designation: yup.string().required().max(100),
  gender: yup.string().required('Gender Permission is required'),
  shiftHours: yup
    .string()
    .max(20, 'Fixed salary must be at most 20 characters')
    .matches(/^\d+$/, 'Fixed salary must contain only numbers')
    .required('Fixed salary is required'),
  staffPermission: yup.string().required('Staff Permission is required')
})

const defaultValues = {
  // dob: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dob: '',
  doJ: '',
  mobileNo: '',
  hourlyRate: '',
  fixedSalary: '',
  workingDay: '',
  staffpermission: '',
  designation: '',
  gender: '',
  shiftHours: '',
  staffPermission: ''
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const steps = [
  {
    icon: 'bx:home',
    title: 'Salon Details',
    subtitle: 'Enter your Salon Details'
  },
  {
    icon: 'bx:home',
    title: 'Beauty Salon Employee',
    subtitle: 'Enter your Emloyee Details'
  },
  {
    icon: 'bx:home',
    title: 'Add Service Category',
    subtitle: 'Enter your Emloyee Details'
  }
]

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '&:not(.Mui-completed)': {
    '& .step-title': {
      color: theme.palette.text.secondary
    },
    '& + svg': {
      color: theme.palette.text.disabled
    }
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: theme.palette.text.disabled
    },
    '& + svg': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiStepLabel-label.Mui-active .step-title': {
    color: theme.palette.primary.main
  }
}))

const OrgCreationStepper = ({ customerDetails, refreshCall }: any) => {
  const [defaultStudentValues, setDefaultStudentValues] = useState({
    dob: null,
    email: '',
    radio: '',
    select: '',
    lastName: '',
    password: '',
    mobileNo: '',
    textarea: '',
    firstName: '',
    Gender: '',
    hourlyRate: '',
    fixedSalary: '',
    workingDay: '',
    Designation: '',
    gender: '',
    shiftHours: '',
    staffPermission: ''
  })

  // ** States

  const [activeStep, setActiveStep] = useState<number>(0)
  const [language, setLanguage] = useState<string[]>([])
  const [logo, setLogo] = useState<any>('')
  const [state, setState] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      formSubmit()
    }
  }

  const handleReset = () => {
    setCourseDetails({
      ...courseDetails,
      courseDescription: '',
      courseFee: 0,
      courseName: '',
      courseFeeDescription: '',
      maxPaymentInstallment: 0
    })
  }

  // Handle Language
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  // const dispatch = useDispatch();
  let mainId = ''
  const [categoryList, setCategoryList] = useState([])
  const [allValues, setAllValues] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: ``,
    salonName: '',
    PhoneNumber: '',
    email: '',
    salonAddress: '',
    colonyName: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    Logo: '',
    salonStatus: ''
  })
  const [emailValidator, setEmailValidator] = useState('')
  const [verification, setVerification] = useState(false)
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [image, setImage] = useState<any>()
  const [error, setError] = useState<any>(null)
  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    courseDescription: '',
    courseFee: 0,
    courseFeeDescription: '',
    maxPaymentInstallment: 0,
    courseDuration: 0
  })
  const [validateEmail, setValidateEmail] = useState(false)
  const [open, setOpen] = useState(false)
  const [userOtp, setUserOtp] = useState('')
  const [emailSend, setEmailSend] = useState<string>('OTP')
  const [next, setNext] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const [base64String, setBase64String] = useState<any>('')

  const handleClose: any = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const courseChangeHandler = (e: { target: { name: any; value: any } }) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value })
  }

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: any) => {
    console.log('file picker', e.target.files[0])
    setImage(e.target.files[0])

    setError(null)
    const selectedFile = e.target.files[0]

    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit')
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      console.log('dfjdksflksdjf', reader)

      reader.onloadend = () => {
        const base64String = reader.result as string
        setBase64String(base64String)
        setAllValues({ ...allValues, Logo: base64String })
      }
    }
  }

  if (allValues.salonName) {
    const id = allValues.salonName.split(' ')
    const idLength = id.length

    for (let i = 0; i < idLength; i++) {
      if (id[i][0] === undefined) {
        continue
      }
      mainId += id[i][0]
    }
  }

  useEffect(() => {
    setValidEmail(false)
    setUserOtp('')
    if (allValues.email.length == 0) {
      setValidateEmail(false)
    } else if (allValues.email.indexOf('@') == -1 || allValues.email.indexOf('.') == -1) {
      setValidateEmail(true)
    } else {
      setValidateEmail(false)
    }
  }, [allValues.email])

  const formSubmit = () => {
    const handleRegistration = async () => {
      console.log('allValues', allValues)
      try {
        // const res = await salonRegistration({ newOrganizationDetails: allValues, id: customerDetails.customerId});
        const res = await salonRegistration({ newOrganizationDetails: allValues })

        console.log('myRes', res)
        setOpen(true)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }

    // Call the function
    handleRegistration()
  }

  useEffect(() => {
    if (
      allValues.salonName &&
      allValues.salonId &&
      allValues.PhoneNumber &&
      allValues.email &&
      allValues.salonAddress &&
      allValues.colonyName &&
      allValues.landmark &&
      allValues.pincode &&
      allValues.city &&
      allValues.state &&
      allValues.salonStatus
    ) {
      setNext(true)
    } else {
      setNext(false)
    }
  }, [allValues])

  useEffect(() => {
    if (allValues.salonName) {
      if (mainId) {
        let uniqueId = ''
        const chars = '0123456789'
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length)
          uniqueId += chars[randomIndex]
        }

        setAllValues({ ...allValues, salonId: `${mainId.toUpperCase()}-${uniqueId}` })
      }
    } else {
      setAllValues({ ...allValues, salonId: `-` })
    }
  }, [mainId, allValues.salonName.split('-').length])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await organizationDetails(customerDetails.customerId)
        if (res && res.data) {
          setCategoryList(res.data.organizations.organizationCategory)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [customerDetails, customerDetails.customerId])

  const onSubmit = (data: any) => {
    console.log('Form Data', data)
    toast.success('Form Submitted')
  }

  const {
    reset: studentReset,
    control,
    getValues: studentValues,
    handleSubmit: handleStaffSubmit,
    setValue,
    formState: { errors: StaffErrors }
  } = useForm<FormInputs>({
    defaultValues: defaultStudentValues,
    resolver: yupResolver(AddStaffSchema)
  })

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    variant='outlined'
                    name='salonName'
                    onChange={changeHandler}
                    label='Name'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    value={allValues.salonName}
                    inputProps={{
                      maxLength: 50
                    }}
                  />
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
                    name='PhoneNumber'
                    label='Phone Number'
                    onChange={changeHandler}
                    value={allValues.PhoneNumber}
                    placeholder='Type Here'
                    required
                    error={allValues.PhoneNumber.length > 13 ? true : false}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      min: 0,
                      max: 10000
                    }}
                    variant='outlined'
                    style={{ marginBottom: '10px' }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                      type='email'
                      name='email'
                      label='E-mail'
                      required
                      placeholder='Type Here'
                      onChange={changeHandler}
                      value={allValues.email}
                      variant='outlined'
                      style={{ marginBottom: '10px' }}
                      error={validateEmail}
                      sx={{ width: '88%' }}
                      inputProps={{
                        maxLength: 50
                      }}
                    />
                  </div>
                </Grid>


                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField name='inventoryImage' type='file' onChange={handleImageChange} />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {/* {base64String && <img src={base64String} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />} */}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='salonAddress'
                    label='House No.,Building Name '
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.salonAddress}
                    variant='outlined'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                    helperText='max 150 words'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='colonyName'
                    label='Road Name,Area,Colony'
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.colonyName}
                    variant='outlined'
                    placeholder='Type here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                    helperText='max 150 words'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='landmark'
                    label='Landmark '
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.landmark}
                    variant='outlined'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                    helperText='max 150 words'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='pincode'
                    label='Pincode '
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.pincode}
                    variant='outlined'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='city'
                    label='City '
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.city}
                    variant='outlined'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-static'
                    name='state'
                    label='State '
                    onChange={changeHandler}
                    required
                    minRows={1}
                    inputProps={{
                      maxLength: 150
                    }}
                    value={allValues.state}
                    variant='outlined'
                    placeholder='Type Here'
                    style={{ marginBottom: '10px' }}
                    multiline
                    fullWidth
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Fragment>
        )
      case 1:
        return (
          <Grid>
            <Grid>
              <Card>
                <CardHeader title='Add Employee' />
                <CardContent>
                  <form onSubmit={handleStaffSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='firstName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Name'
                                onChange={onChange}
                                placeholder='Name'
                                error={Boolean(StaffErrors.firstName)}
                                aria-describedby='validation-basic-first-name'
                              />
                            )}
                          />
                          {StaffErrors.firstName && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type='Email'
                                value={value}
                                onChange={onChange}
                                label='Email '
                                placeholder='john.doecxvvbdffdd@example.co  '
                                error={Boolean(StaffErrors.email)}
                              />
                            )}
                          />
                          {StaffErrors.email && (
                            <FormHelperText sx={{ color: 'error.main' }}>
                              Required, a vaild email address
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='doJ'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <DatePickerWrapper>
                              <DatePicker
                                selected={value}
                                showYearDropdown
                                showMonthDropdown
                                onChange={e => onChange(e)}
                                placeholderText='MM/DD/YYYY'
                                customInput={
                                  <CustomInput
                                    value={value}
                                    onChange={onChange}
                                    label='Date of Joining'
                                    error={Boolean(StaffErrors.doJ)}
                                    aria-describedby='validation-basic-dob'
                                  />
                                }
                              />
                            </DatePickerWrapper>
                          )}
                        />
                        {StaffErrors.doJ && (
                          <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                            This field is required
                          </FormHelperText>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            control={control}
                            name='mobileNo'
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type='MobileNo'
                                value={value}
                                onChange={onChange}
                                label='MobileNumber'
                                placeholder='123-456-7890'
                                error={Boolean(StaffErrors.mobileNo)}
                              />
                            )}
                          />
                          {StaffErrors.mobileNo && (
                            <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='hourlyRate'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Hourly Rate'
                                onChange={onChange}
                                placeholder='Hourly Rate'
                                error={Boolean(StaffErrors.hourlyRate)}
                                helperText={StaffErrors.hourlyRate && StaffErrors.hourlyRate.message}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              />
                            )}
                          />

                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='fixedSalary'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Fixed Salary'
                                onChange={onChange}
                                placeholder='Fixed Salary'
                                error={Boolean(StaffErrors.fixedSalary)}
                                helperText={StaffErrors.fixedSalary && StaffErrors.fixedSalary.message}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='workingDay'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Working Hours/Day'
                                onChange={onChange}
                                placeholder='Type Here'
                                error={Boolean(StaffErrors.workingDay)}
                                helperText={StaffErrors.workingDay && StaffErrors.workingDay.message}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='shiftHours'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Shift Hours'
                                onChange={onChange}
                                placeholder='Type Here'
                                error={Boolean(StaffErrors.shiftHours)}
                                helperText={StaffErrors.shiftHours && StaffErrors.shiftHours.message}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='lastName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Address'
                                onChange={onChange}
                                placeholder='Address'
                                error={Boolean(StaffErrors.lastName)}
                                aria-describedby='validation-basic-last-name'
                              />
                            )}
                          />
                          {StaffErrors.lastName && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={10}>
                        <FormControl fullWidth>
                          <Controller
                            name='designation'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                rows={4}
                                multiline
                                {...field}
                                label='Designation'
                                error={Boolean(StaffErrors.designation)}
                                aria-describedby='validation-basic-textarea'
                              />
                            )}
                          />
                          {StaffErrors.designation && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <>
            <AddServiceCategory />
          </>
        )
      default:
        return 'Unknown Step'
    }
  }
  const renderContent = () => {
    if (activeStep === steps.length) {
      return <>Form is Submitted</>
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', mt: -7, justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <div>
                {
                  <Button sx={{ marginRight: 6 }} size='large' variant='contained' onClick={handleNext}>
                    Next
                  </Button>
                }
              </div>
              {/* <div>
                {
                  <Button sx={{ marginRight: 6 }} size='large' variant='contained' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Submit & Continue' : 'Next'}
                  </Button>
                }
              </div> */}
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <>
      <Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                >
                  {steps.map((step, index) => {
                    return (
                      <Step key={index}>
                        <StepLabel StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
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
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
            </StepperHeaderContainer>
            <Divider sx={{ m: '0 !important' }} />

            <CardContent sx={{ width: '100%' }}>{renderContent()}</CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  orientation='vertical'
                  connector={<></>}
                  sx={{ height: '100%', minWidth: '15rem' }}
                ></Stepper>
              </StepperWrapper>
            </StepperHeaderContainer>
          </Card>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={emailValidator?.includes('invalid') ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {emailValidator}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  )
}

export default OrgCreationStepper
