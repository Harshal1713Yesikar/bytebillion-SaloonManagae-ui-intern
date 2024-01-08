import { Box, Button, Card, CardContent, Grid, Icon, Typography } from '@mui/material'
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
// import IconButton from '@mui/material/IconButton'
// import Icon from 'src/@core/components/icon'
// import Link from 'src/@core/theme/overrides/link'
import CardSnippet from 'src/@core/components/card-snippet'
import PickersTime from 'src/views/form/form-elements/pickers/PickersTime'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import * as source from 'src/views/form/form-elements/pickers/PickersSourceCode'
import { useTheme } from '@mui/material/styles'

const defaultValues = {
  companyName: '',
  billingEmail: ''
}

interface State {
  password: string
  showPassword: boolean
}

const Settings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = () => {
    return
  }
  // const theme = useTheme()
  // const { direction } = theme
  // const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

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

  return (
    <>
      <Grid>
        <Card>
          <CardContent>
            <Typography style={Container}>Business Details</Typography>
          </CardContent>
          <CardContent>
            <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Business Logo</Typography>
            <Typography sx={{ color: 'black' }}>
              Upload a logo to appear on your emails,invoices and mini-wedsite.
            </Typography>
          </CardContent>
          <Box className='demo-space-x' sx={{ justifyContent: 'Center', borderBottom: '1px solid' }}>
            <Avatar src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' alt='Victor Anderson' />
            <Avatar src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />
            <Avatar src='/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />
          </Box>
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                            error={Boolean(errors.companyName)}
                          />
                        )}
                      />
                      {errors.companyName && (
                        <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name='billingEmail'
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            type='Admin Email ID'
                            value={value}
                            onChange={onChange}
                            label='Admin Email ID'
                            placeholder='john.doe@example.com'
                            error={Boolean(errors.billingEmail)}
                          />
                        )}
                      />
                      {errors.billingEmail && (
                        <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        control={control}
                        name='billingEmail'
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            type='Admin Email ID'
                            value={value}
                            onChange={onChange}
                            label='Reporting Email ID'
                            placeholder='Reporting Emails'
                            error={Boolean(errors.billingEmail)}
                          />
                        )}
                      />
                      {errors.billingEmail && (
                        <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='Repoting Emails'
                      label='Appointments Number'
                      placeholder='202 555 0111'
                      // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='Repoting Emails'
                      label='Mobile Number'
                      placeholder='202 555 0111'
                      // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='Repoting Emails'
                      label='TelePhone Number'
                      placeholder='202 555 0111'
                      // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select label='Country' defaultValue='australia'>
                        <MenuItem value='India'>India</MenuItem>
                        <MenuItem value='canada'>Canada</MenuItem>
                        <MenuItem value='france'>France</MenuItem>
                        <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                        <MenuItem value='united-states'>United States</MenuItem>
                        <MenuItem value='united-states'>Australia</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='State' placeholder='California' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='Repoting Emails'
                      label='Postel Code'
                      placeholder='202 555 0111'
                      // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Address' placeholder='Address' />
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
            <Typography style={{ borderBottom: ' 1px solid'}}></Typography>
          </CardContent>

          <CardContent>
            <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Reset Password</Typography>
            <Typography sx={{ color: 'black' }}>
              You have the option to reset your password using this feature.
            </Typography>
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='form-layouts-basic-password'> Old Password</InputLabel>
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
                            >
                              {/* <Icon icon={values.showPassword ? 'bx:show' : 'bx:hide'} /> */}
                              {/* <Icon icon = {confirmPassValues.showPassword ? 'bx:show':'bx:hide'}/> */}
                            </IconButton>
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
                      >
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
              <CardContent>
            <Typography style={{ borderBottom: ' 1px solid'}}></Typography>
          </CardContent>
     
            </CardContent>
          </CardContent>

          <Card>
           
            <CardContent>
            <Grid item xs={12}>
          
        </Grid>
     
            </CardContent>
              
          <CardContent>
            <Typography sx={{ color: 'black', fontSize: 21, fontWeight: 700 }}>Regional Setting </Typography>
            <Typography sx={{ color: 'black' }}>
              Specify region Specific setting  for your Bussiness
            </Typography>
            <CardContent>
          <PickersSourceCode popperPlacement={undefined}/>
              <CardContent>
            <Typography style={{ borderBottom: ' 1px solid'}}></Typography>
          </CardContent>
          
     
            </CardContent>
          </CardContent>
          </Card>
        </Card>
      </Grid>
    </>
  )
}
export default Settings
