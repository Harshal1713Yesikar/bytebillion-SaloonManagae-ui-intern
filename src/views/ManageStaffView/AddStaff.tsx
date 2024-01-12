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
  dob: DateType
  email: string
  radio: string
  select: string
  lastName: string
  password: string
  textarea: string
  checkbox: boolean
  Gender: string
  HourlyRate: string
  firstName: string
  WorkingDay: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  dob: null,
  email: '',
  radio: '',
  select: '',
  lastName: '',
  password: '',
  textarea: '',
  firstName: '',
  Gender: '',
  HourlyRate: '',
  WorkingDay: '',
  checkbox: false
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
  
  const [checkbox, setCheckbox] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = checkbox;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;


  // ** States
  const [state, setState] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const onSubmit = () => toast.success('Form Submitted')

  const [checked, setChecked] = useState(true)

  return (
    <Grid>
      <Grid>
        <Card>
          <CardHeader title='Add Staff' />
          <Router>
            <Box sx={{ width: '100%', borderBottom: '1px solid gray' }}></Box>
          </Router>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                          placeholder='First Name'
                          error={Boolean(errors.firstName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
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
                          label='Last Name'
                          onChange={onChange}
                          placeholder='Last Name'
                          error={Boolean(errors.lastName)}
                          aria-describedby='validation-basic-last-name'
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
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
                          type='email'
                          value={value}
                          label='Email'
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder='carterleonard@gmail.com'
                          aria-describedby='validation-basic-email'
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
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
                          error={Boolean(errors.password)}
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
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='dob'
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
                            error={Boolean(errors.dob)}
                            aria-describedby='validation-basic-dob'
                          />
                          
                        }
                      />
                      </DatePickerWrapper>
                    )}
                  />
                  {errors.dob && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                      This field is required
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='dob'
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
                            error={Boolean(errors.dob)}
                            aria-describedby='validation-basic-dob'
                          />
                        }

                      />
                      </DatePickerWrapper>
                    )}
                  />
                  {errors.dob && (
                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                      This field is required
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      error={Boolean(errors.select)}
                      htmlFor='validation-basic-select'
                    >
                      Gender*
                    </InputLabel>
                    <Controller
                      name='Gender'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Gender'
                          onChange={onChange}
                          error={Boolean(errors.select)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          <MenuItem value='USA'>Male</MenuItem>
                          <MenuItem value='Australia'>Female</MenuItem>
                          <MenuItem value='Germany'>Other</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.select && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='HourlyRate'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Hourly Rate'
                          onChange={onChange}
                          placeholder='Hourly Rate'
                          error={Boolean(errors.firstName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='firstName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Fixed Salary'
                          onChange={onChange}
                          placeholder='Fixed Salary'
                          error={Boolean(errors.firstName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='WorkingDay'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Working Hours/Day'
                          onChange={onChange}
                          placeholder='Working Hours/Day'
                          error={Boolean(errors.firstName)}
                          aria-describedby='validation-basic-first-name'
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      error={Boolean(errors.select)}
                      htmlFor='validation-basic-select'
                    >
                      Staff Permission*
                    </InputLabel>
                    <Controller
                      name='select'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Gender'
                          onChange={onChange}
                          error={Boolean(errors.select)}
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          <MenuItem value='Manager'>Manager</MenuItem>
                          <MenuItem value='Subadmin'>Subadmin</MenuItem>
                          <MenuItem value='Staff'>Staff</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.select && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <Controller
                      name='textarea'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label='Designation'
                          error={Boolean(errors.textarea)}
                          aria-describedby='validation-basic-textarea'
                        />
                      )}
                    />
                    {errors.textarea && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Box sx={{ display: 'flex' }}>
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
                </Box>
                <Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained'>
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
