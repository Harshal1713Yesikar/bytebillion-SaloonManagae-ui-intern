import React, { useState, useEffect, forwardRef } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { useForm, Controller } from 'react-hook-form'
import { createCoupon } from 'src/store/APIs/Api'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useTheme } from '@mui/material/styles'
import CustomInput from './../../../views/form-elements/picker/PickersCustomInput'
import Radio from '@mui/material/Radio'

import { FaGift } from 'react-icons/fa';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import { customDateFormat } from 'src/@core/utils/format'
import { useRouter } from 'next/router'
import InputAdornment from '@mui/material/InputAdornment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Router from 'next/router'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Icon from 'src/@core/components/icon'
import { Dialog } from '@mui/material'

const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Coupons" && (obj?.action?.includes("create")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}

interface FormInputs {
  couponDescription: string
  couponType: string
  couponValue: string
  couponExpiryDate: any
  couponName: string
  couponCount: string
}


const defaultValues = {
  email: '',
  radio: '',
  select: '',
  couponDescription: '',
  couponType: '',
  couponValue: '',
  couponExpiryDate: '',
  couponName: '',
  couponCount: ''
}

const CreateCoupons = ({ reload, setReload }: any) => {

  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const [openAlert, setOpenAlert] = useState<any>({ open: "", msg: "" })
  const [couponType, setCouponType] = useState<any>()
  const [couponDate, setCouponDate] = useState<any>("None")
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [snackbaropen, setSnackbaropen] = useState<any>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [couponAdd, setCouponAdd] = useState<boolean>(false)
  const router = useRouter()

  const [data, setData] = useState({
    customerId: user ? user.customerId : "",
    organizationId: user ? user.organizationId : "",
    coupons: [{
      couponName: "",
      couponValue: "",
      couponCount: "",
      couponType: "",
      useCouponCount: 0,
      couponLimit: "",
      couponDescription: "",
      couponExpiryDate: "",
    }]
  });

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })


  useEffect(() => {
    if (couponType) {
      setData({ ...data, coupons: [{ ...data.coupons[0], couponType: couponType }] })
    }
  }, [couponType])




  const handleRadioChange = (event: any) => {
    setCouponType(event.target.value);

  };


  const {
    control,
    handleSubmit,
    getValues: couponDetails,
    formState: { errors },
    reset
  } = useForm<FormInputs>({ defaultValues })


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      setData({ ...data, customerId: user?.customerId, organizationId: user?.organizationId })
    }
  }, [user])

  const [couponDescription, setcouponDescription] = useState<any>({
    couponDescription: "",
    couponExpiryDate: ""
  })

  const handleChange = (e: any) => {
    setCouponDate({
      ...couponDescription, [e.target.name]: e.target.value
    })

  }

  useEffect(() => {
    if (couponDate == "Date") {
      setData({ ...data, coupons: [{ ...data.coupons[0], couponLimit: couponDate, couponCount: "" }] })

    } else if (couponDate == "couponCount") {
      setData({ ...data, coupons: [{ ...data.coupons[0], couponLimit: couponDate, couponExpiryDate: "" }] })

    } else if (couponDate == "None") {
      setData({ ...data, coupons: [{ ...data.coupons[0], couponLimit: couponDate, couponCount: "", couponExpiryDate: "" }] })

    } else {
      setData({ ...data, coupons: [{ ...data.coupons[0], couponLimit: "Both" }] })
    }

  }, [couponDate])


  const createCouponApi = () => {
    const couponVal: any = parseInt(data.coupons[0].couponValue)
    data.coupons[0].couponValue = couponVal;
   
    console.log(data.coupons[0].couponName, data.coupons[0].couponType, data.coupons[0].couponValue, data.coupons[0].couponDescription, "hello", data.coupons[0].couponLimit)
    const isCouponValid =
      data.coupons[0].couponName !== "" &&
      data.coupons[0].couponType !== "" &&
      data.coupons[0].couponValue !== "" &&
      data.coupons[0].couponDescription !== "" &&
      data.coupons[0].couponLimit !== "";
    if (isCouponValid && data.coupons[0].couponLimit == "Date" && parseFloat(data.coupons[0].couponValue) > 0) {
      createCoupon(data).then((res: any) => {
        if (res.data.statusCode == 200) {
          setData({
            customerId: user ? user.customerId : "",
            organizationId: user ? user.organizationId : "",
            coupons: [{
              couponName: "",
              couponValue: "",
              couponCount: "",
              couponType: "",
              useCouponCount: 0,
              couponLimit: "None",
              couponDescription: "",
              couponExpiryDate: "",
            }]
          })

          setCouponType(null)

          setSnackbarColor(true)
          setSnackbaropen(true)
          setResponseMessage("Coupon created successfully")
          setCouponDate("None")
          setCouponAdd(false)
          setSubmitted(false)
          setData({
            customerId: user ? user.customerId : "",
            organizationId: user ? user.organizationId : "",
            coupons: [{
              couponName: "",
              couponValue: "",
              couponCount: "",
              couponType: "",
              useCouponCount: 0,
              couponLimit: "None",
              couponDescription: "",
              couponExpiryDate: "",
            }]
          })
          setCouponType(null)
          setReload(!reload)
          setResponseMessage("Coupon created successfully")
          setCouponAdd(false)
          setSubmitted(false)
        }
        setOpenAlert({ open: true, mssg: res.data.message })
      })
    }
    else if (isCouponValid && data.coupons[0].couponLimit == "couponCount" && parseFloat(data.coupons[0].couponValue) > 0 && parseFloat(data.coupons[0].couponCount) > 0) {
      createCoupon(data).then((res: any) => {
        if (res.data.statusCode == 200) {
          setData({
            customerId: user ? user.customerId : "",
            organizationId: user ? user.organizationId : "",
            coupons: [{
              couponName: "",
              couponValue: "",
              couponCount: "",
              couponType: "",
              useCouponCount: 0,
              couponLimit: "None",
              couponDescription: "",
              couponExpiryDate: "",
            }]
          })
          setCouponType(null)

          setSnackbarColor(true)
          setSnackbaropen(true)
          setReload(!reload)
          setResponseMessage("Coupon created successfully")
          setCouponDate("None")
          setCouponAdd(false)
          setSubmitted(false)
        }
        setOpenAlert({ open: true, mssg: res.data.message })


      })
    }
    else if (isCouponValid && data.coupons[0].couponLimit == "Both" && parseFloat(data.coupons[0].couponValue) > 0 && parseFloat(data.coupons[0].couponCount) > 0 && data.coupons[0].couponExpiryDate) {
      createCoupon(data).then((res: any) => {
        if (res.data.statusCode == 200) {
          setData({
            customerId: user ? user.customerId : "",
            organizationId: user ? user.organizationId : "",
            coupons: [{
              couponName: "",
              couponValue: "",
              couponCount: "",
              couponType: "",
              useCouponCount: 0,
              couponLimit: "None",
              couponDescription: "",
              couponExpiryDate: "",
            }]
          })
          setCouponType(null)

          setSnackbarColor(true)
          setSnackbaropen(true)
          setReload(!reload)
          setResponseMessage("Coupon created successfully")
          setCouponDate("None")
          setCouponAdd(false)
          setSubmitted(false)
        }
        setOpenAlert({ open: true, mssg: res.data.message })

      })
    }
    else if (isCouponValid && data.coupons[0].couponLimit == "None" && parseFloat(data.coupons[0].couponValue) > 0) {
      createCoupon(data).then((res: any) => {
        if (res.data.statusCode == 200) {
          setData({
            customerId: user ? user.customerId : "",
            organizationId: user ? user.organizationId : "",
            coupons: [{
              couponName: "",
              couponValue: "",
              couponCount: "",
              couponType: "",
              useCouponCount: 0,
              couponLimit: "None",
              couponDescription: "",
              couponExpiryDate: "",
            }]
          })
          setCouponType(null)

          setSnackbarColor(true)
          setReload(!reload)
          setSnackbaropen(true)
          setResponseMessage("Coupon created successfully")
          setCouponDate("None")
          setCouponAdd(false)
          setSubmitted(false)
        }
        setOpenAlert({ open: true, mssg: res.data.message })
      })
      setOpenEdit(false)
    }
    else {
      setSnackbarColor(false)
      setSnackbaropen(true)
      setResponseMessage("Fill all the required fields")
    }
  }

  const handleEditClickOpen = () => {
    setOpenEdit(true)
  }

  const theme = useTheme()

  const onSubmit = () => 'Form Submitted'
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleCloseAlert = () => {
    if (openAlert.open == true) {
      setOpenAlert({ open: false, mssg: "" })
    }
  }


  const [permission, setPermission] = useState<any>()

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
    }
  }, [user])



  return (

    <>
      <Grid item xs={12} sx={{ display: 'flex' }} >
        <Card
          sx={{ width: '100%' }}
        >
          <Grid sx={{ height: '100%', paddingY: '15px', display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Grid sx={{ paddingRight: '30px' }}>
              {permission?.some((obj: any) => obj?.title === "Coupons" && obj?.action?.includes("create")) &&

                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={() => {
                      setCouponAdd(true)
                      setSubmitted(false)
                    }}
                  >
                    Add coupon <FaGift style={{ marginLeft: '7px', width: '17px', height: '17px', marginTop: '-2px' }} />
                  </Button>

                </Box>
              }
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Error404Component permission={permission} />
      {permission?.some((obj: any) => obj?.title === "Coupons" && (obj?.action?.includes("create"))) && couponAdd == true &&

        <Dialog open={couponAdd} fullWidth maxWidth='md' sx={{ '& .MuiPaper-root': { minHeight: '500px' } }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              <Typography variant='h5' component='span'>
                {`Create coupon `}
              </Typography>
            </DialogTitle>

            <Icon
              className="iconContainer"
              onClick={() => {
                setSubmitted(false)
                setCouponAdd(false)
                setData({
                  customerId: user ? user.customerId : "",
                  organizationId: user ? user.organizationId : "",
                  coupons: [{
                    couponName: "",
                    couponValue: "",
                    couponCount: "",
                    couponType: "",
                    useCouponCount: 0,
                    couponLimit: "None",
                    couponDescription: "",
                    couponExpiryDate: "",
                  }]
                })
                setCouponType(null)
              }}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                margin: "8px",
                transition: "background-color 0.3s",
              }}
              icon='bx:x'
            />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={10}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='couponName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={data.coupons[0].couponName}
                            name='couponName'
                            label='Coupon name'
                            onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                            placeholder='Coupon name '
                            autoComplete='OFF'
                            error={submitted ? data.coupons[0].couponName ? false : true : false}
                            helperText={submitted && !data.coupons[0].couponName ? 'Required,max 50 chars' : ''}
                            inputProps={{
                              maxLength: 50,
                            }}
                          />
                        )}
                      />

                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='couponDescription'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={data.coupons[0].couponDescription}
                            name='couponDescription'
                            required
                            label='Coupon description '
                            onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                            placeholder='Coupon description '
                            error={submitted ? data.coupons[0].couponDescription ? false : true : false}
                            helperText={submitted && !data.coupons[0].couponDescription ? 'Required,max 500 chars' : ''}
                            autoComplete='OFF'
                            inputProps={{
                              maxLength: 500,
                            }}
                          />
                        )}
                      />

                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl error={submitted ? data.coupons[0].couponType ? false : true : false}
                    >
                      <FormLabel>Coupon type</FormLabel>
                      <RadioGroup

                        row
                        defaultValue='home'
                        aria-label='address type'
                        name='form-layouts-collapsible-address-radio'

                      >
                        <FormControlLabel value='Flat' onChange={handleRadioChange} control={<Radio />} label='Flat' />
                        <FormControlLabel value='Percentage' onChange={handleRadioChange} control={<Radio />} label='Percentage' />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {
                    couponType == 'Flat' ?
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name='couponValue'
                            control={control}
                            rules={{
                              required: true,
                              pattern: {
                                value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/, // Use a regular expression pattern to check for numeric input
                                message: 'Please enter only numbers',
                              },
                            }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                sx={{
                                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none'
                                  },
                                  '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                  }
                                }}
                                name='couponValue'
                                value={data?.coupons[0]?.couponValue}
                                type="number"
                                required
                                label='Coupon value '
                                autoComplete='OFF'
                                onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                                placeholder='Coupon value '
                                error={submitted ? data.coupons[0].couponValue ? false : true : false}
                                helperText={submitted && !data.coupons[0].couponValue ? 'Required,value must be positive' : ''}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  min: 0,
                                }}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">/-</InputAdornment>,
                                }}
                              />
                            )}
                          />
                        </FormControl>
                      </Grid> : ""
                  }
                  {
                    couponType == 'Percentage' ?
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='couponValue'
                              control={control}
                              rules={{
                                required: true,
                                pattern: {
                                  value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/, // Use a regular expression pattern to check for numeric input
                                  message: 'Please enter only numbers',
                                },
                              }
                              }
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  sx={{
                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                      display: 'none'
                                    },
                                    '& input[type=number]': {
                                      MozAppearance: 'textfield'
                                    }
                                  }}
                                  value={data?.coupons[0]?.couponValue}
                                  type="number"
                                  required
                                  name='couponValue'
                                  autoComplete='OFF'
                                  label='Coupon value'
                                  onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                                  placeholder='Percentage'
                                  error={submitted ? data.coupons[0].couponValue ? false : true : false}
                                  helperText={submitted && !data.coupons[0].couponValue ? 'Required,value must be between 0-99' : ''}
                                  aria-describedby='validation-basic-first-name'
                                  inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    min: 0,

                                  }}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                  }}
                                  style={{
                                    width: '100%'
                                  }}
                                />
                              )}
                            />
                          </FormControl>

                        </Grid>

                        {/* <Grid item xs={12} sm={6}>

                        <Typography variant='body2'>(for Example : 10 % of 1000  = 900)</Typography>
                      </Grid> */}


                      </> : ""

                  }

                  <Grid item xs={12}>
                    <FormControl error={submitted ? data.coupons[0].couponLimit ? false : true : false}>
                      <FormLabel>Coupon limit</FormLabel>
                      <RadioGroup
                        row
                        defaultValue='None'
                        aria-label='address type'
                        name='form-layouts-collapsible-address-radio'
                      >
                        <FormControlLabel value='Date' name="Date" onChange={() => { setCouponDate("Date") }} control={<Radio />} label='Date' />
                        <FormControlLabel value='couponCount' name="couponCount" onChange={() => { setCouponDate("couponCount") }} control={<Radio />} label='Coupon count' />
                        <FormControlLabel value='Both' name="Both" onChange={() => { setCouponDate("Both") }} control={<Radio />} label='Both' />
                        <FormControlLabel onChange={() => { setCouponDate("None") }} value="None" name="None" control={<Radio />} label='None' />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {


                    couponDate == "Date" ?
                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            id='basic-input'
                            required
                            popperPlacement={popperPlacement}
                            autoComplete='OFF'
                            value={data?.coupons[0]?.couponExpiryDate}
                            onChange={(date: Date) => setData({ ...data, coupons: [{ ...data.coupons[0], couponExpiryDate: customDateFormat(date) }] })}
                            placeholderText='Coupon Expiry Date'
                            customInput={
                              <CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                error={submitted ? data.coupons[0].couponExpiryDate ? false : true : false}
                                helperText={submitted && !data?.coupons[0]?.couponExpiryDate ? 'Coupon expiry date is required' : ''}
                                label='Coupon expiry date ' />}
                          />
                        </DatePickerWrapper>
                      </Grid> : ""
                  }

                  {
                    couponDate == "couponCount" ?
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Controller
                            name="couponCount"
                            control={control}
                            rules={{
                              required: true,
                              pattern: {
                                value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/, // Use a regular expression pattern to check for numeric input
                                message: 'Please enter only numbers',
                              },
                            }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={data.coupons[0].couponCount}
                                name="couponCount"
                                type="number"
                                required
                                label='Coupon count '
                                autoComplete='OFF'
                                onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                                placeholder='Coupon count '
                                aria-describedby='validation-basic-first-name'
                                error={submitted ? data.coupons[0].couponCount ? false : true : false}
                                helperText={submitted && !data?.coupons[0]?.couponCount ? 'Coupon count is required' : ''}
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  min: 0,
                                  max: 10000,
                                }}
                              />
                            )}
                          />

                        </FormControl>
                      </Grid>
                      : ""
                  }

                  {
                    couponDate == "Both" ?
                      <>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <Controller
                              name='couponCount'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={data.coupons[0].couponCount}
                                  type="number"
                                  name="couponCount"
                                  required
                                  autoComplete='OFF'
                                  label='Coupon count '
                                  onChange={(e) => { setData({ ...data, coupons: [{ ...data.coupons[0], [e.target.name]: e.target.value }] }) }}
                                  placeholder='Coupon count '
                                  error={submitted ? data.coupons[0].couponCount ? false : true : false}
                                  helperText={submitted && !data?.coupons[0]?.couponCount ? 'Coupon count is required' : ''}
                                  aria-describedby='validation-basic-first-name'
                                  inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    min: 0,
                                    max: 10000,
                                  }}
                                />
                              )}
                            />

                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              id='basic-input'
                              popperPlacement={popperPlacement}
                              autoComplete='OFF'
                              required
                              value={data?.coupons[0]?.couponExpiryDate}
                              onChange={(date: Date) => setData({ ...data, coupons: [{ ...data.coupons[0], couponExpiryDate: customDateFormat(date) }] })}
                              placeholderText='Coupon Expiry Date'

                              customInput={<CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                error={submitted ? data.coupons[0].couponExpiryDate ? false : true : false}
                                helperText={submitted && !data?.coupons[0]?.couponExpiryDate ? 'Coupon expiry date is required' : ''}
                                label='Coupon expiry date ' />}
                            />
                          </DatePickerWrapper>
                        </Grid>
                      </>
                      : ""
                  }

                  <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'right', width: '100%', marginTop: '50px' }}>
                    <Box className='demo-space-x'>
                      <Button size='large' type='submit' variant='outlined' onClick={() => {
                        setSubmitted(false)
                        setCouponAdd(false)
                        setData({
                          customerId: user ? user.customerId : "",
                          organizationId: user ? user.organizationId : "",
                          coupons: [{
                            couponName: "",
                            couponValue: "",
                            couponCount: "",
                            couponType: "",
                            useCouponCount: 0,
                            couponLimit: "None",
                            couponDescription: "",
                            couponExpiryDate: "",
                          }]
                        })
                        setCouponType(null)
                      }}>
                        Cancel
                      </Button>
                      <Button size='large' type='submit' variant='contained' onClick={() => {

                        createCouponApi()
                        setSubmitted(true)
                      }}>
                        Create
                      </Button>
                    </Box>
                  </DialogActions>
                </Grid>
                {
                  openAlert.open == true &&
                  <Snackbar open={openAlert.open} onClose={handleCloseAlert} autoHideDuration={3000}>
                    <Alert variant='filled' elevation={3} onClose={handleCloseAlert} severity='success'>
                      {openAlert.mssg}
                    </Alert>
                  </Snackbar>
                }
              </form>
            </CardContent>


          </Grid>
        </Dialog>

      }

      <Snackbar open={snackbaropen} onClose={() => setSnackbaropen(false)} autoHideDuration={3000}>
        <Alert
          variant="filled"
          elevation={3}
          onClose={() => setSnackbaropen(false)}
          severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
        >
          {responseMessage}
        </Alert>
      </Snackbar>

    </>
  )
}

export default CreateCoupons
