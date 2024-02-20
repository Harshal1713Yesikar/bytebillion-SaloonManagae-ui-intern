// ** MUI Imports

import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography,
  CardHeader
} from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import CustomInput from './PickersCustomInput/PickersCustomInput'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { customDateFormat, customTimeFormat, convertToISODate } from 'src/@core/utils/format'
import Dashboard from 'src/pages/dashboard'
import {
  updateServicesApi,
  listAllEmployeeApi,
  getSingleServiceApi,
  createNewCategory,
  getAllCategoryList
} from 'src/store/APIs/Api'
// import serviceId from 'src/pages/service/serviceDetails/[serviceId]';
import { useRouter } from 'next/router'
import { styled, useTheme } from '@mui/material/styles'
import { set } from 'nprogress'

const UpdateService = (props: any) => {
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [maintainState, setMaintainState] = useState<any>()
  const [openAlert, setOpenAlert] = useState<any>({ open: false, mssg: '' })
  const [snackbarColor, setSnackbarColor] = useState<any>(true)
  const [openEdit, setOpenEdit] = useState<any>(false)
  const [inData, setInData] = useState<any>()
  const router = useRouter()

  const serviceId = router.query.serviceId
  const [categoryData, setCategoryData] = useState<any>('')
  const [open, setOpen] = useState<boolean>(false)
  const [listServiceCategoryData, setServiceExpenseCategoryData] = useState<any>([])
  const handleClickOpen = () => setOpen(true)
  const [categoryList, setCategoryList] = useState([])
  const [serviceTime, setServiceTime] = useState<any>(null)
  const [updateServiceTime, setUpdateServiceTime] = useState<any>(null)
  const [getServiceAmountId, setGetServiceAmountId] = useState('')
  const [getServiceAmount, setGetServiceAmount] = useState('')
  const handleClose = () => setOpen(false)
  const handleUpdate = () => {
    router.push('/service/service/')
  }
  const [singleServiceData, setSingleServiceData] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'jkmli',
    serviceId: serviceId,
    serviceAmountId: '',
    serviceCategoryId: '',
    serviceName: '',
    serviceTime: '',
    serviceDescription: '',
    selectStaff: [
      {
        employeeId: ''
      }
    ],
    amountHistory: [
      {
        serviceAmountId: "",
        serviceAmount: "",
        serviceAmountStatus: ""
      }
    ]
  })
  const theme = useTheme()

  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      order: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  }))

  const Img = styled('img')(({ theme: any }) => ({
    left: 58,
    bottom: 0,
    height: 173,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      position: 'static'
    }
  }))

  const [serviceCategoryData, setServiceCategoryData] = useState({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'jkmli',
    serviceCategoryId: '',
    serviceCategoryName: '',
    serviceCategoryStatus: ''
  })
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const [defaultServiceValues, setDefaultServiceValues] = useState<any>({
    customerId: '099f9bf2-8ac2-4f84-8286-83bb46595fde',
    salonId: 'jkmli',
    serviceId: serviceId,
    serviceAmountId: '',
    serviceCategoryId: '',
    serviceName: '',
    serviceTime: '',
    serviceDescription: '',
    selectStaff: [
      {
        employeeId: ''
      }
    ],
    amountHistory: [
      {
        serviceAmountId: '',
        serviceAmount: '',
        serviceAmountStatus:""
      }
    ]
  })
  useEffect(()=>{
    setDefaultServiceValues({...defaultServiceValues,serviceAmountId:getServiceAmountId})
  },[getServiceAmountId])

  // const addServiceCategory = () => {
  //   try {
  //     createNewCategory(serviceCategoryData)
  //   } catch (error) {
  //     return error
  //   }
  // }
  // useEffect(() => {

  //   if (serviceTime) {
  //     defaultServiceValues.serviceTime = customTimeFormat(serviceTime);
  //     setDefaultServiceValues(defaultServiceValues)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (updateServiceTime) {
  //     defaultServiceValues.serviceTime = customTimeFormat(updateServiceTime);
  //     setDefaultServiceValues(defaultServiceValues)
  //   }
  // }, [])

  useEffect(() => {
    const data = async () => {
      try {
        const response: any = await getAllCategoryList('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli')
        setCategoryList(response?.data.data)
        console.log('formData', response?.data?.data)
      } catch (err) {
        console.log('ABC', err)
      }
    }
    data()
  }, [])

  const singleServiceApiData = async () => {
    if (serviceId) {
      const response: any = await getSingleServiceApi('099f9bf2-8ac2-4f84-8286-83bb46595fde', 'jkmli', serviceId)
      setDefaultServiceValues(response?.data.data)
      setSingleServiceData(response?.data.data)
        const amount = response.data.data.amountHistory.filter((value :any)=>{
          return value.serviceAmountStatus=="active"
        })
        console.log(amount,"amount")
        setGetServiceAmountId(amount[0].serviceAmountId)
        setGetServiceAmount(amount[0].serviceAmount)
    }
  }

  useEffect(() => {
    singleServiceApiData()
  }, [serviceId])

  const handleServiceAmountChange = (amount : any) =>{
    setDefaultServiceValues((prevState :any)=>({
      ...prevState,
      amountHistory : [{serviceAmount :amount}]
    }))
  }


  const handleChange = (e: any) => {
    setDefaultServiceValues({
      ...defaultServiceValues,
      [e.target.name]: e.target.value
    })
  }

  let CategoryName
  const categoryChange = (e: any) => {
    setFormUpdateButton(true)
    setDefaultServiceValues({
      ...defaultServiceValues,
      serviceCategories: [{ serviceCategoryId: e.serviceCategoryId }],
      CategoryName: [{ serviceCategoryName: e.serviceCategoryName }]
    })
  }
  // const handleServiceAmount = (e:any)=>{
  //   setDefaultServiceValues({
  //     getServiceAmountId : [{serviceAmountId :e.serviceAmountId}]
  //   })
  // }
  useEffect(() => {
    if (listServiceCategoryData) {
      const data = listServiceCategoryData?.find((e: any) => {
        return (
          defaultServiceValues?.serviceCategories &&
          defaultServiceValues?.serviceCategories?.some((id: any) => {
            return e?.serviceCategoryId === id?.serviceCategoryId
          })
        )
      })
      setCategoryData(data)
    }
  }, [defaultServiceValues, listServiceCategoryData])

  let serviceCategoryName
  let serviceCategoryStatus
  if (defaultServiceValues?.serviceCategoryId) {
    const firstElement = defaultServiceValues.serviceCategoryId[0]
    try {
      const categoryInfo = JSON.parse(firstElement)
      serviceCategoryName = categoryInfo.serviceCategoryName
      serviceCategoryStatus = categoryInfo.serviceCategoryStatus
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }

  useEffect(() => {
    if (inData) {
      console.log(inData, '121')
      const jsonString = JSON.stringify(inData)
      const resultArrayString = `${JSON.stringify(jsonString)}`
      setDefaultServiceValues({
        ...defaultServiceValues,
        serviceCategory: inData
      })
    }
  }, [inData])

  const handleUpdateTimeChange = (date: any) => {
    setUpdateServiceTime(date)
  }

  const updateServiceApiFunc = async () => {
    try {
      console.log({...defaultServiceValues,serviceAmountId:getServiceAmountId}, "fsg");

      await updateServicesApi({...defaultServiceValues,serviceAmountId:getServiceAmountId})
      // setDefaultServiceValues(res?.data.data)
    } catch (error: any) {}
  }

  return (
    <>
      <Grid sx={{ display: 'flex', width: '100%' }}>
        <Grid sx={{ width: '25%', mr: 3 }}>
          <Dashboard />
        </Grid>
        <Grid></Grid>
        <Card>
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Service
          </DialogTitle>
          <DialogContent>
            <form style={{ padding: '15px 0' }}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Service Name'
                    name='serviceName'
                    onChange={event => {
                      handleChange(event)
                      setFormUpdateButton(true)
                    }}
                    value={defaultServiceValues ? defaultServiceValues.serviceName : singleServiceData.serviceName}
                  />
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center', gap: '10px' }} xs={12} sm={6}>
                  <Grid item xs={12} sm={100}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-status-label'>Category</InputLabel>
                      <Select
                        label='Category'
                        // defaultValue={data.status}
                        id='user-view-status'
                        labelId='user-view-status-label'
                        value={inData ? inData.serviceCategoryName : categoryData && categoryData.serviceCategoryName}
                        name='categoryName'
                      >
                        {categoryList && categoryList.length > 0 ? (
                          categoryList.map((e: any, index: any) => (
                            <MenuItem
                              key={index}
                              value={e.serviceCategoryName}
                              onClick={() => {
                                categoryChange(e)
                              }}
                            >
                              {e.serviceCategoryName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No data found</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <AddCircleIcon style={{ cursor: 'pointer' }} onClick={handleClickOpen} />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Service Amount'
                    name='serviceAmount'
                    onChange={event => {
                      handleServiceAmountChange(event.target.value)
                      setFormUpdateButton(true)
                    }}
                    value={defaultServiceValues ? defaultServiceValues?.amountHistory[0].serviceAmount : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Description'
                    name='serviceDescription'
                    value={defaultServiceValues ? defaultServiceValues.serviceDescription : ''}
                    onChange={event => {
                      handleChange(event)
                      setFormUpdateButton(true)
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Service Amount'
                    type='number'
                    name='serviceAmount'
                    onChange={event => {
                      handleChange(event)
                      setFormUpdateButton(true)
                    }}
                    value={defaultServiceValues ? defaultServiceValues.serviceAmount : ""}
                  />
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
                  <DatePickerWrapper>

                    <DatePicker
                      showTimeSelect
                      selected={updateServiceTime}
                      timeIntervals={30}
                      showTimeSelectOnly
                      required={defaultServiceValues?.serviceTime ? true : false}
                      popperPlacement={popperPlacement}
                      value={defaultServiceValues ? defaultServiceValues?.serviceTime : ''}
                      name='serviceTime'
                      placeholderText='4:00 PM'
                      dateFormat='h:mm aa'
                      id='time-only-picker'
                      onChange={(date: Date) => {
                        handleUpdateTimeChange(date);
                        // setFormUpdatedButton(true);
                      }}

                      customInput={<CustomInput label='Service Time' />}
                    />
                  </DatePickerWrapper>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Service Time'
                    name='serviceTime'
                    value={defaultServiceValues ? defaultServiceValues.serviceTime : ''}
                    onChange={event => {
                      handleChange(event)
                      setFormUpdateButton(true)
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'right', width: '100%', display: 'flex', justifyItems: 'center' }}>
            <Button variant='outlined' color='secondary' onClick={() => router.push('/service/service/')}>
              Back
            </Button>
            <Button
              variant='contained'
              sx={{ mr: 2 }}
              onClick={() => {
                updateServiceApiFunc()
                handleUpdate()
                setFormUpdateButton(false)
              }}
              disabled={!formUpdateButton}
            >
              Update
            </Button>
          </DialogActions>

          {/* </Dialog> */}
        </Card>
      </Grid>
    </>
  )
}
export default UpdateService
