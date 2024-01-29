// ** React Imports
import React, { forwardRef, useState, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { MemoryRouter, Route, Routes, Link, matchPath, useLocation } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Box, Typography } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  firstName: string
  lastName: string
  email: string
  doJ: DateType
  mobileNo: string
  hourlyRate: string
  fixedSalary: string
  workingDay: string
  staffpermission: string
  designation: string
  address:string
  shiftHours:string
 
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
  staffPermission: yup.string().required('Staff Permission is required'),
  address: yup.string().required().max(100),
  shiftHours: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required(),
})


interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  // dob: null,
  firstName: '',
  lastName: '',
  email: '',
  doJ: '',
  mobileNo: '',
  hourlyRate: '',
  fixedSalary: '',
  workingDay: '',
  designation: '',
  address:'',  
  shiftHours:''
  
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

function Router(props: { children?: React.ReactNode }) {
  const { children } = props
  if (typeof window === 'undefined') {
    return <StaticRouter location='/drafts'>{children}</StaticRouter>
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  )
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

function MyTabs() {
  const routeMatch = useRouteMatch(['/staffList', '/addStaff', '/staffSchedule', '/updateAttendanes', '/inactiveStaff'])
  const currentTab = routeMatch?.pattern?.path
}

const CreateStaff = () => {
  const [defaultStudentValues, setDefaultStudentValues] = useState({
    dob: null,
    email: '',
    mobileNo: '',
    firstName: '',
    hourlyRate: '',
    fixedSalary: '',
    workingDay: '',
    Designation: '',
    staffPermission: '',
    shiftHours:''
  })

  const [checkbox, setCheckbox] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { gilad, jason, antoine } = checkbox
  const error = [gilad, jason, antoine].filter(v => v).length !== 2

  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })


  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // const onSubmit = () => toast.success('Form Submitted')
  const onSubmit = (data:any) => {
    console.log('Form Data', data);
    toast.success('Form Submitted');
  }

  const [checked, setChecked] = useState(true)

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
  return (
    <Grid>
      <Grid>
        <Card>
          <CardHeader title='Add Employee' />
          <Router>
            <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
          </Router>
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
                          label='First Name'
                          onChange={onChange}
                          placeholder='Type Here'
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
                          placeholder='Type Here'
                          error={Boolean(StaffErrors.email)}
                        />
                      )}
                    />
                    {StaffErrors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='address'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Address'
                          onChange={onChange}
                          placeholder='Text Here'
                          error={Boolean(StaffErrors.address)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {StaffErrors.address&& (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
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
                          type='Contact'
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
                          placeholder='Type Here'
                          error={Boolean(StaffErrors.hourlyRate)}
                          helperText={StaffErrors.hourlyRate && StaffErrors.hourlyRate.message}
                          aria-describedby='validation-basic-first-name'
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                      )}
                    />
                    {/* {StaffErrors.hourlyRate && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )} */}
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
                          placeholder='Type Here'
                          error={Boolean(StaffErrors.fixedSalary)}
                          helperText={StaffErrors.fixedSalary && StaffErrors.fixedSalary.message}
                          aria-describedby='validation-basic-first-name'
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                      )}
                    />
                    {/* {StaffErrors.fixedSalary && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )} */}
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
                          label='Working/Hours Day'
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
                          error={Boolean(StaffErrors.workingDay)}
                          helperText={StaffErrors.workingDay && StaffErrors.workingDay.message}
                          aria-describedby='validation-basic-first-name'
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                      )}
                    />
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
                          placeholder='Type Here'
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
                <Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained' onSubmit={onSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
export default CreateStaff
