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
import { staffRegistrationApi } from 'src/store/APIs/api'
interface State {
  password: string
  showPassword: boolean
}

interface FormInputs {
  userCustomerId: '',
  customerId: '',
  salonId: '',
  employeeName: '',
  // "employeeId": "",
  employeeEmail: '',
  employeeGender: '',
  employeePhone: '',
  employeeAddress: '',
  employeeDOB: null,
  employeeDesignation: '',
  employeeJoiningDate: null,
  employeeworkingHours: '',
  employeeStatus: '',
  employeeBankName: '',
  employeeAccountNo: '',
  employeeIfsceCode: ''
}


const AddStaffSchema = yup.object().shape({
  employeeName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  // lastName: yup
  //   .string()
  //   .matches(/^[A-Z a-z]+$/)
  //   .max(25)
  //   .required(),
  // email: yup.string().email().required(),
  employeeEmail: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
    .email()
    .required(),
  // password: yup.string().min(8).required(),
  // password: yup.string().min(8, 'Requied ,Minimum 8 characters').required('Password is required'),
  // dob: yup.date().required(),
  // doJ: yup.date().required(),
  employeePhone: yup
    .string()
    .min(10)
    .matches(/^[0-9]+$/)
    .max(10)
    .required(),
  // hourlyRate: yup
  //   .string()
  //   .max(20, 'Fixed salary must be at most 20 characters')
  //   .matches(/^\d+$/, 'Fixed salary must contain only numbers')
  //   .required('Fixed salary is required'),
  // fixedSalary: yup
  //   .string()
  //   .max(20, 'Fixed salary must be at most 20 characters')
  //   .matches(/^\d+$/, 'Fixed salary must contain only numbers')
  //   .required('Fixed salary is required'),
  employeeworkingHours: yup
    .string()
    .max(2, 'Fixed Day must be at most 2 characters')
    .matches(/^\d+$/, 'This field is required')
    .required('Fixed salary is required'),
  // staffpermission: yup.string(),
  // designation: yup.string().required().max(100),
  // gender: yup.string().required('Gender Permission is required'),
  // staffPermission: yup.string().required('Staff Permission is required')
})


interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  customerId: "",
  salonId: "",
  employeeName: '',
  employeeEmail: '',
  employeeGender: '',
  employeePhone: '',
  employeeAddress: '',
  employeeDOB: null,
  employeeDesignation: '',
  employeeJoiningDate: null,
  employeeworkingHours: '',
  employeeStatus: '',
  employeeBankName: '',
  employeeAccountNo: '',
  employeeIfsceCode: ''
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
  const [defaultStudentValues, setDefaultStudentValues] = useState<any>({
    customerId: '99f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'E7uqn',
    employeeName: '',
    employeeEmail: '',
    employeeGender: '',
    employeePhone: '',
    employeeAddress: '',
    employeeDOB: null,
    employeeDesignation: '',
    employeeJoiningDate: null,
    employeeworkingHours: '',
    employeeStatus: '',
    employeeBankName: '',
    employeeAccountNo: '',
    employeeIfsceCode: ''
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
  const onSubmit = (data: any) => {
    console.log('Form Data', data);
    toast.success('Form Submitted');
    staffRegistrationApi(data)
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
  // const handleStaffSubmit = () => {
  //   console.log("sdfsdjkf")
  // }
  return (
    <Grid>
      <Grid>
        <Card>
          <CardHeader title='Add Staff' />
          <Router>
            <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
          </Router>
          <CardContent>
            <form onSubmit={handleStaffSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='employeeName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='First Name'
                          onChange={onChange}
                          placeholder='First Name'
                          error={Boolean(StaffErrors.employeeName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {StaffErrors.employeeName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='lastName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Last Name'
                          onChange={onChange}
                          placeholder='Last Name'
                          error={Boolean(StaffErrors.employeeName)}
                          aria-describedby='validation-basic-last-name'
                        />
                      )}
                    />
                    {StaffErrors.employeeName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='employeeEmail'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='Email'
                          value={value}
                          onChange={onChange}
                          label='Email '
                          placeholder='john.doecxvvbdffdd@example.co  '
                          error={Boolean(StaffErrors.employeeEmail)}
                        />
                      )}
                    />
                    {StaffErrors.employeeEmail && (
                      <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='validation-basic-password' error={Boolean(StaffErrors.password)}>
                      Password
                    </InputLabel>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          value={value}
                          label='Password'
                          onChange={onChange}
                          id='validation-basic-password'
                          error={Boolean(StaffErrors.password)}
                          type={state.showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                                aria-label='toggle password visibility'
                              >
                                <Icon icon={state.showPassword ? 'bx:show' : 'bx:hide'} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {StaffErrors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                        {StaffErrors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='employeeDOB'
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
                              label='Date of Birth'
                              error={Boolean(StaffErrors.employeeDOB)}
                              aria-describedby='validation-basic-dob'
                            />
                          }
                        />
                      </DatePickerWrapper>
                    )}
                  />
                  {StaffErrors.employeeDOB && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                      This field is required
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='employeeJoiningDate'
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
                              error={Boolean(StaffErrors.employeeJoiningDate)}
                              aria-describedby='validation-basic-dob'
                            />
                          }
                        />
                      </DatePickerWrapper>
                    )}
                  />
                  {StaffErrors.employeeJoiningDate && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                      This field is required
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      htmlFor='validation-basic-select'
                    >
                      Gender*
                    </InputLabel>
                    <Controller
                      name='employeeGender'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='gender'
                          onChange={onChange}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          <MenuItem value='Male'>Male</MenuItem>
                          <MenuItem value='Female'>Female</MenuItem>
                          <MenuItem value='Staff'>Other</MenuItem>
                        </Select>
                      )}
                    />
                    {StaffErrors.employeeGender && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {StaffErrors.employeeGender.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name='employeePhone'
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='MobileNo'
                          value={value}
                          onChange={onChange}
                          label='MobileNumber'
                          placeholder='123-456-7890'
                          error={Boolean(StaffErrors.employeePhone)}
                        />
                      )}
                    />
                    {StaffErrors.employeePhone && (
                      <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
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
                    {/* {StaffErrors.hourlyRate && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )} */}
                {/* </FormControl>
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
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
                    {/* {StaffErrors.fixedSalary && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )} */}
                {/* </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='employeeworkingHours'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Working Day'
                          onChange={onChange}
                          placeholder='Working Day'
                          error={Boolean(StaffErrors.employeeworkingHours)}
                          helperText={StaffErrors.employeeworkingHours && StaffErrors.employeeworkingHours.message}
                          aria-describedby='validation-basic-first-name'
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    {/* <InputLabel
                      id='validation-basic-select'
                      error={Boolean(StaffErrors.staffPermission)}
                      htmlFor='validation-basic-select'
                    >
                      Staff Permission*
                    </InputLabel> */}
                {/* <Controller
                      name='staffPermission'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Staff Permission'
                          onChange={onChange}
                          error={Boolean(StaffErrors.staffPermission)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          <MenuItem value=''>Select</MenuItem>
                          <MenuItem value='Manager'>Manager</MenuItem>
                          <MenuItem value='Subadmin'>Subadmin</MenuItem>
                          <MenuItem value='Staff'>Staff</MenuItem>
                        </Select>
                      )}
                    />
                    {StaffErrors.staffPermission && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {StaffErrors.staffPermission.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name='employeeDesignation'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label='Designation'
                          error={Boolean(StaffErrors.employeeDesignation)}
                          aria-describedby='validation-basic-textarea'
                        />
                      )}
                    />
                    {StaffErrors.employeeDesignation && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Box sx={{ display: 'flex' }}>
                  <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
                    <FormLabel component='legend'>Payoll Calculating Setting </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name='gilad' />}
                        label='Fixed'
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl required error={error} component='fieldset' sx={{ m: 3 }} variant='standard'>
                    <FormLabel></FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name='gilad' />}
                        label='Hourly'
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl required error={error} component='fieldset' sx={{ m: 3 }} variant='standard'>
                    <FormLabel></FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name='gilad' />}
                        label='Commission'
                      />
                    </FormGroup>
                  </FormControl>
                </Box> */}
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
