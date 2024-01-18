import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Link from 'next/link'

import React from 'react'
import { Borderless } from 'src/@core/styles/libs/react-draft-wysiwyg'
import Avatar from 'src/@core/components/mui/avatar'
import { ChangeEvent, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import { Controller, useForm } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import PickersSourceCode from 'src/views/form/form-elements/pickers/PickersSourceCode'
import CardSnippet from 'src/@core/components/card-snippet'
import PickersTime from 'src/views/form/form-elements/pickers/PickersTime'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import * as source from 'src/views/form/form-elements/pickers/PickersSourceCode'
import { useTheme } from '@mui/material/styles'
import { TimePickerToolbar } from '@mui/x-date-pickers'
import Dashboard from 'src/pages/dashboard'
import { number } from 'yup'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// import { CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, FormControl, MenuItem, Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import CustomInput from './PickersCustomInput'

import DatePicker from 'react-datepicker'

import MobileTimePicker from '@mui/lab/MobileTimePicker'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number
  // protein: number,
) {
  return { name, calories, fat, carbs }
}

interface BusinessInputs {
  billingEmail: string
  reportingEmail: string
  companyName: string
  fathersName: string
  enrollmentNumber: string
  mobileNo: string
  address: string
  postelCode: string
  cityDistrict: string
  appointment: string
  country: string
}
interface RigionalInputs {
  countryRs: string
  timeZone: string
  maxDiscount: string
  voucherAmount: string
  clientStatus: string
}

const BusinessSchema = yup.object().shape({
  companyName: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  billingEmail: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
    .email()
    .required(),
  reportingEmail: yup
    .string()
    .matches(/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)
    .email()
    .required(),
  appointment: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required(),
  enrollmentNumber: yup.string().max(10).required(),
  mobileNo: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be  a valid number with exactly 10 digits')
    .required('Phone number is required'),
  cityDistrict: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(50)
    .required(),
  postelCode: yup.string().min(6).max(6).required(),
  address: yup.string().required().max(100),
  country: yup.string().required()
})
const RegionalSchema = yup.object().shape({
  countryRs: yup.string().required(' This field is required'),
  timeZone: yup.string().required(' This field is required'),

  maxDiscount: yup
    .string()
    .matches(/^\d{1,3}$/, 'Discount must be up to 3 digits')
    .required('Discount is required'),

  voucherAmount: yup
    .string()
    .matches(/^\d{1,3}$/, 'Discount must be up to 3 digits')
    .required('Discount is required'),

  clientStatus: yup
    .string()
    .matches(/^[A-Z a-z]+$/)
    .max(25)
    .required()
})

interface State {
  password: string
  showPassword: boolean
}

const SettingsViewPage = () => {
  const [rows, setRows] = React.useState([
    { name: 'Monday', startingTime: null, endingTime: null, status: '' },
    { name: 'Tuseday', startingTime: null, endingTime: null, status: '' },
    { name: 'Wednesday', startingTime: null, endingTime: null, status: '' },
    { name: 'Thursday', startingTime: null, endingTime: null, status: '' },
    { name: 'FriDay', startingTime: null, endingTime: null, status: '' },
    { name: 'Seturday', startingTime: null, endingTime: null, status: '' },
    { name: 'Sunday', startingTime: null, endingTime: null, status: '' }

    // Add other days as needed
  ])

  const handleTimeChange = (day: any, type: any, newValue: any) => {
    setRows(prevRows =>
      prevRows.map(row => {
        if (row.name === day) {
          return { ...row, [type]: newValue }
        }
        return row
      })
    )
  }
  const handleStatusChange = (day: any, newValue: any) => {
    setRows(prevRows =>
      prevRows.map(row => {
        if (row.name === day) {
          return { ...row, status: newValue }
        }
        return row
      })
    )
  }

  const [defaultStudentValues, setDefaultStudentValues] = useState({
    companyName: '',
    billingEmail: '',
    reportingEmail: '',
    appointment: '',
    enrollmentNumber: '',
    mobileNo: '',
    cityDistrict: '',
    postelCode: '',
    address: '',
    country: ''
  })

  const [defaultRegionalValues, setDefaultRegionalValues] = useState({
    countryRs: '',
    timeZone: '',
    maxDiscount: '',
    voucherAmount: '',
    clientStatus: ''
  })

  const onSubmit = () => {
    return
  }

  const Container = {
    color: 'black',
    fontSize: 21,
    fontWeight: 700,
    borderBottom: ' 1px solid'
  }
  const container = {
    color: 'black',
    fontSize: 21,
    fontWeight: 700,
    margin: 3
  }

  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [confirmPassValues, setConfirmPassValues] = useState<State>({
    password: '',
    showPassword: false
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }
  const {
    reset: studentReset,
    control,
    getValues: studentValues,
    handleSubmit: handleStudentSubmit,
    setValue,
    formState: { errors: BusinessErrors }
  } = useForm<BusinessInputs>({
    defaultValues: defaultStudentValues,
    resolver: yupResolver(BusinessSchema)
  })

  const {
    reset: RigionalReset,
    control: RigiControl,
    getValues: Rigi,
    handleSubmit: handleRigionalSubmit,
    formState: { errors: RigionalErrors }
  } = useForm<RigionalInputs>({
    defaultValues: defaultRegionalValues,
    resolver: yupResolver(RegionalSchema)
  })
  const [time, setTime] = useState<DateType>(new Date())


  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} lg={3}>
          <Dashboard />
        </Grid>
        <Grid item xs={12} md={9} lg={9} sx={{ paddingRight: 1 }}>
          <Card>
            <CardContent>
              <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Business Logo</Typography>
              <Typography sx={{ color: 'black' }}>
                Upload a logo to appear on your emails,invoices and mini-wedsite.
              </Typography>
            </CardContent>
            <Grid>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='\images\Logo\ScissorsTrackLogo.png' alt='logo' height='200px' width='200px' />
              </div>
            </Grid>
            <CardContent>
              <Typography style={Container}>Business Details</Typography>
            </CardContent>
            <CardContent>
              <Typography style={container}>Business Info</Typography>
              <Typography sx={{ color: 'black' }}>
                The name of your Business is prominently showcased
                <br />
                in varius areas,encompassing your online booking profile,
                <br />
                sale receipts and messages sent to cilents.
              </Typography>
            </CardContent>

            <Card>
              <CardHeader title='Business Information' />
              <CardContent>
                <form onSubmit={handleStudentSubmit(onSubmit)}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='companyName'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label='Business Name'
                              onChange={onChange}
                              placeholder='Calypso Salon'
                              error={Boolean(BusinessErrors.companyName)}
                              inputProps={{
                                maxLength: 50
                              }}
                            />
                          )}
                        />
                        {BusinessErrors.companyName && (
                          <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                            Required, max 25 chars
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='billingEmail'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='Admin Email ID'
                              value={value}
                              onChange={onChange}
                              label='Admin Email ID'
                              placeholder='john.doecxvvbdffdd@example.co  '
                              error={Boolean(BusinessErrors.billingEmail)}
                            />
                          )}
                        />
                        {BusinessErrors.billingEmail && (
                          <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name='reportingEmail'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='Admin Email ID'
                              value={value}
                              onChange={onChange}
                              label='Reporting Email ID'
                              placeholder='Reporting Emails'
                              error={Boolean(BusinessErrors.reportingEmail)}
                            />
                          )}
                        />
                        {BusinessErrors.reportingEmail && (
                          <FormHelperText sx={{ color: 'error.main' }}>Required, a vaild email address</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          control={control}
                          name='appointment'
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='appointment'
                              value={value}
                              onChange={onChange}
                              label='Appointment'
                              placeholder='Appointment'
                              error={Boolean(BusinessErrors.appointment)}
                            />
                          )}
                        />
                        {BusinessErrors.appointment && (
                          <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                        )}
                      </FormControl>
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
                              placeholder='MobileNumber'
                              error={Boolean(BusinessErrors.mobileNo)}
                            />
                          )}
                        />
                        {BusinessErrors.mobileNo && (
                          <FormHelperText sx={{ color: 'error.main' }}>required,10-digit phone number</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='validation-basic-select'
                          error={Boolean(BusinessErrors.country)}
                          htmlFor='validation-basic-select'
                        >
                          Country*
                        </InputLabel>
                        <Controller
                          name='country'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              label='Country'
                              onChange={onChange}
                              error={Boolean(BusinessErrors.country)}
                              labelId='validation-basic-select'
                              aria-describedby='validation-basic-select'
                            >
                              {/* <MenuItem value=''>Select</MenuItem> */}
                              <MenuItem value='India'>India</MenuItem>
                              <MenuItem value='Canada'>Canada</MenuItem>
                              <MenuItem value='France'>France</MenuItem>
                              <MenuItem value='United-Kingdom'>United Kingdom</MenuItem>
                              <MenuItem value='United-States'>United States</MenuItem>
                              <MenuItem value='Australia'>Australia</MenuItem>
                            </Select>
                          )}
                        />
                        {BusinessErrors.country && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {BusinessErrors.country.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          control={control}
                          name='cityDistrict'
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='appointment'
                              value={value}
                              onChange={onChange}
                              label='City/District'
                              placeholder='City/District'
                              error={Boolean(BusinessErrors.cityDistrict)}
                            />
                          )}
                        />
                        {BusinessErrors.cityDistrict && (
                          <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          control={control}
                          name='postelCode'
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='postelCode'
                              value={value}
                              onChange={onChange}
                              inputProps={{ maxLength: 6 }}
                              label='postelCode'
                              placeholder='postelCode'
                              error={Boolean(BusinessErrors.postelCode)}
                            />
                          )}
                        />
                        {BusinessErrors.postelCode && (
                          <FormHelperText sx={{ color: 'error.main' }}>Required,6-Digit Postel Code </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          control={control}
                          name='address'
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              type='address'
                              value={value}
                              onChange={onChange}
                              label='Address'
                              placeholder='Address'
                              error={Boolean(BusinessErrors.address)}
                            />
                          )}
                        />
                        {BusinessErrors.address && (
                          <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
            <CardContent>
              <Typography style={{ borderBottom: ' 1px solid' }}></Typography>
            </CardContent>
            <CardContent>
              <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Reset Password</Typography>
              <Typography sx={{ color: 'black' }}>
                You have the option to reset your password using
                <br />
                this feature.
              </Typography>
              <Card>
                <CardContent>
                  <form onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='form-layouts-basic-password'>Old Password</InputLabel>
                          <OutlinedInput
                            label='Password'
                            value={values.password}
                            id='form-layouts-basic-password'
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            aria-describedby='form-layouts-basic-password-helper'
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  {/* <Icon icon={values.showPassword ? 'bx:show' : 'bx:hide'} /> */}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                          <OutlinedInput
                            label='Password'
                            value={values.password}
                            id='form-layouts-basic-password'
                            onChange={handleChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            aria-describedby='form-layouts-basic-password-helper'
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                >
                                  {/* <Icon icon={values.showPassword ? 'bx:show' : 'bx:hide'} /> */}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                          <OutlinedInput
                            label='Confirm Password'
                            value={confirmPassValues.password}
                            id='form-layouts-confirm-password'
                            onChange={handleConfirmPassChange('password')}
                            aria-describedby='form-layouts-confirm-password-helper'
                            type={confirmPassValues.showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickConfirmPassShow}
                                  onMouseDown={e => e.preventDefault()}
                                  aria-label='toggle password visibility'
                                ></IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            gap: 5,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Button type='submit' variant='contained' size='large'>
                            Get Started!
                          </Button>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              '& a': { color: 'primary.main', textDecoration: 'none' }
                            }}
                          ></Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                  <CardContent>
                    <Typography style={{ borderBottom: ' 1px solid' }}></Typography>
                  </CardContent>
                </CardContent>
              </Card>
            </CardContent>
            <Card>
              <CardContent>
                <Grid item xs={12}></Grid>
              </CardContent>

              <CardContent>
                <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Regional Setting </Typography>
                <Typography sx={{ color: 'black' }}>Specify region Specific setting for your Bussiness.</Typography>
                <Card>
                  <CardContent>
                    <form onSubmit={handleRigionalSubmit(onSubmit)}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel
                              id='validation-basic-select'
                              error={Boolean(RigionalErrors.countryRs)}
                              htmlFor='validation-basic-select'
                            >
                              Country*
                            </InputLabel>
                            <Controller
                              name='countryRs'
                              control={RigiControl}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <Select
                                  value={value}
                                  label='Currency'
                                  onChange={onChange}
                                  error={Boolean(RigionalErrors.countryRs)}
                                  labelId='validation-basic-select'
                                  aria-describedby='validation-basic-select'
                                >
                                  {/* <MenuItem value=''>Select</MenuItem> */}
                                  <MenuItem value='India'>India</MenuItem>
                                  <MenuItem value='canada'>Canada</MenuItem>
                                  <MenuItem value='france'>France</MenuItem>
                                  <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                                  <MenuItem value='united-states'>United States</MenuItem>
                                  <MenuItem value='united-states'>Australia</MenuItem>
                                </Select>
                              )}
                            />
                            {RigionalErrors.countryRs && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                {RigionalErrors.countryRs.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel
                              id='validation-basic-select'
                              error={Boolean(RigionalErrors.countryRs)}
                              htmlFor='validation-basic-select'
                            >
                              TimeZone*
                            </InputLabel>
                            <Controller
                              name='timeZone'
                              control={RigiControl}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <Select
                                  value={value}
                                  label='TimeZone'
                                  onChange={onChange}
                                  error={Boolean(RigionalErrors.timeZone)}
                                  labelId='validation-basic-select'
                                  aria-describedby='validation-basic-select'
                                >
                                  {/* <MenuItem value=''>Select</MenuItem> */}
                                  <MenuItem value='India'>(GMT+05:30)Kolkata</MenuItem>
                                  <MenuItem value='canada'>Canada</MenuItem>
                                  <MenuItem value='france'>France</MenuItem>
                                  <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                                  <MenuItem value='united-states'>United States</MenuItem>
                                  <MenuItem value='united-states'>Australia</MenuItem>
                                </Select>
                              )}
                            />
                            {RigionalErrors.timeZone && (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                {RigionalErrors.timeZone.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Controller
                              control={RigiControl}
                              name='maxDiscount'
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  type='text' // or 'number' if you want to allow only numeric input
                                  value={value}
                                  onChange={onChange}
                                  inputProps={{ maxLength: 3 }}
                                  label='Max Discount Percentage'
                                  placeholder='Max Discount Percentage'
                                  error={Boolean(RigionalErrors.maxDiscount)}
                                />
                              )}
                            />
                            {RigionalErrors.maxDiscount && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {RigionalErrors.maxDiscount.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Controller
                              control={RigiControl}
                              name='voucherAmount'
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  type='number'
                                  inputProps={{ maxLength: 3 }}
                                  value={value}
                                  onChange={e => {
                                    // Limit input to 3 digits
                                    const inputValue = e.target.value.slice(0, 3)
                                    onChange(inputValue)
                                  }}
                                  label='Voucher Amount'
                                  placeholder='Voucher Amount'
                                  error={Boolean(RigionalErrors.voucherAmount)}
                                />
                              )}
                            />
                            {RigionalErrors.voucherAmount && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {RigionalErrors.voucherAmount.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='clientStatus'
                              control={RigiControl}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Client Active/Inactive Time Period'
                                  onChange={onChange}
                                  placeholder='Client Active/Inactive Time Period'
                                  error={Boolean(RigionalErrors.clientStatus)}
                                  inputProps={{
                                    maxLength: 20
                                  }}
                                />
                              )}
                            />
                            {RigionalErrors.clientStatus && (
                              <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-firstName'>
                                Required, max 20 chars
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Button type='submit' variant='contained' sx={{ mr: 3 }}>
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                    <CardContent>
                      <Typography style={{ borderBottom: ' 1px solid' }}></Typography>
                    </CardContent>
                  </CardContent>
                </Card>
              </CardContent>

              {/* <CardContent>
                <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Business Hours</Typography>
                <Typography sx={{ color: 'black' }}>Specify your opening closing time for your Businesss. </Typography>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Day</TableCell>
                          <TableCell align='right'>Starting Time</TableCell>
                          <TableCell align='right'>Ending Time&nbsp;(g)</TableCell>
                          <TableCell align='right'>Status&nbsp;(g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                              {row.name}
                            </TableCell>
                            
                            <TableCell align='right'>{row.calories}</TableCell>
                            <TableCell align='right'>{row.fat}</TableCell>
                            <TableCell align='right'>{row.carbs}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </CardContent> */}
              <Card>
                <CardContent>
                  <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Business Hours</Typography>
                  <Typography sx={{ color: 'black' }}>
                    Specify your opening and closing time for your business.
                  </Typography>
                  <CardContent>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell align='right'>Starting Time</TableCell>
                            <TableCell align='right'>Ending Time</TableCell>
                            <TableCell align='right'>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component='th' scope='row'>
                                {row.name}
                              </TableCell>
                              <TableCell align='right'>
                            
                              <div>
        <DatePicker
          showTimeSelect
          selected={time}
          timeIntervals={15}
          showTimeSelectOnly
          dateFormat='h:mm aa'
          id='time-only-picker'
          popperPlacement='bottom'
          onChange={(date: Date) => setTime(date)}
          customInput={<CustomInput label='Time Only' />}
        />
      </div>
                                
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <MobileTimePicker
                                    value={row.startingTime}
                                    onChange={(newValue: any) => handleTimeChange(row.name, 'startingTime', newValue)}
                                    renderInput={(params: any) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell align='right'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <MobileTimePicker
                                    value={row.endingTime}
                                    onChange={(newValue: any) => handleTimeChange(row.name, 'endingTime', newValue)}
                                    renderInput={(params: any) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell align='left'>
                                <FormControl>
                                  <Select
                                    value={row.status}
                                    onChange={e => handleStatusChange(row.name, e.target.value)}
                                  >
                                    <MenuItem value='Open'>Open</MenuItem>
                                    <MenuItem value='Closed'>Closed</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </CardContent>
              </Card>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
export default SettingsViewPage
