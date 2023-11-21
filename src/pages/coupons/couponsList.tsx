// ** MUI Imports
import React, { useState, useEffect, forwardRef } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import { getCouponList, getAllCouponList } from 'src/store/APIs/Api'
import { Button, Skeleton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DialogActions from '@mui/material/DialogActions'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { singleCouponDetails, updateCouponDetails, deleteCoupon } from 'src/store/APIs/Api'
import { customDateFormat } from 'src/@core/utils/format'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';


// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from '../../views/form-elements/picker/PickersCustomInput'
import { styled, useTheme } from '@mui/material/styles'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import EventNoteIcon from '@mui/icons-material/EventNote';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'
import RefreshIcon from '@mui/icons-material/Refresh';
import Router from 'next/router'
import CreateCoupons from 'src/views/forms/coupons/createCoupons'


const Error404Component = ({ permission }: any) => {
  useEffect(() => {
    if (permission) {
      if (!permission?.some((obj: any) => obj?.title === "Coupons" && (obj?.action?.includes("create") || obj?.action?.includes("read")))) {
        Router.push("/404")
      }
    }
  }, [permission])

  return (<></>)
}



// import { useEffect, useState } from 'react'

interface DataType {
  src?: string
  name: string
  post: string
  value: number
  tasks: string
  project: string
  color: ThemeColor
}


const data: DataType[] = [
  {
    value: 58,
    tasks: '87/135',
    color: 'primary',
    project: 'Zipcar',
    name: 'Nathan Wagner',
    post: 'iOS Developer',
    src: '/images/avatars/17.png'
  },
  {
    value: 80,
    color: 'error',
    tasks: '340/420',
    project: 'Bitbank',
    name: 'Emma Bowen',
    post: 'UI/UX Designer',
    src: '/images/avatars/8.png'
  },
  {
    value: 60,
    tasks: '50/82',
    color: 'warning',
    project: 'Payers',
    name: 'Adrian McGuire',
    post: 'React developer'
  },
  {
    value: 55,
    color: 'info',
    tasks: '98/260',
    project: 'Brandi',
    name: 'Alma Gonzalez',
    post: 'Product Manager',
    src: '/images/avatars/2.png'
  },
  {
    value: 52,
    tasks: '12/25',
    project: 'Aviato',
    color: 'secondary',
    name: 'Travis Collins',
    post: 'VueJs developer',
    src: '/images/avatars/3.png'
  }
]

const CouponCard = () => {

  const theme = useTheme()
  const router = useRouter()
  const { direction } = theme
  const [user, setUser] = useState<any>()
  const [error, setError] = useState<any>()
  const [alert, setAlert] = useState<any>(false)
  const [couponId, setCouponId] = useState<any>()
  const [couponList, setCouponList] = useState([]);
  const [couponDate, setCouponDate] = useState<any>()
  const [couponType, setCouponType] = useState<any>()
  const [deletePopUp, setDeletePopUp] = useState<any>()
  const [openPopUp, setOpenPopUp] = useState<any>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [snackbarColor, setSnackbarColor] = useState(true)
  const [couponStatus, setCouponStatus] = useState<any>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [alertMessage, setAlertMessage] = useState<any>('');
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<any>('success');
  const [snackbarOpen, setSnackbarOpen] = useState<any>(false)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [singleCouponData, setSingleCouponData] = useState<any>({})
  const [responseMessage, setResponseMessage] = useState<string>("")
  const [formUpdateButton, setFormUpdateButton] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [disc, setDisc] = useState<any>()
  const [couponListReload, setCouponListReload] = useState<boolean>(false)
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
  })
  const deleteCouponApi = () => {
    setIsLoading(true)
    if (user) {
      const couponData = {
        customerId: user.customerId,
        organizationId: user.organizationId,
        couponId,
        couponStatus: "delete"
      }

      deleteCoupon(couponData).then((res: any) => {
        if (res.statusCode == 200) {
          setAlert(true)
          setSnackbarColor(true)
          setSnackbarOpen(true)
          setResponseMessage("Coupon is deleted successfully")
          getAllCouponList(user?.customerId, user?.organizationId).then((res) => {
            setCouponList(res?.data)
            setIsLoading(false)
          })

        }
      })
    }
  }

  const tooltip = (
    <Tooltip title="Tooltip Title">
      {disc}
    </Tooltip>
  );



  useEffect(() => {
    if (singleCouponData) {
      setSingleCouponData(singleCouponData?.couponStatus)
    }
  }, [])


  useEffect(() => {
    if (couponStatus) {
      setSingleCouponData({ ...singleCouponData, couponStatus: couponStatus })
    }
  }, [couponStatus])

  const handleConfirmation = (value: string) => {
    handleDeleteClose()

  }

  const handleDeleteClose = () => {
    setOpenPopUp(false)
  }

  const handleRadioChange = (event: any) => {
    setCouponType(event.target.value);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  useEffect(() => {
    if (singleCouponData) {

      if (couponType) {
        singleCouponData.couponType = couponType
        setSingleCouponData(singleCouponData)
      }

      if (startDate) {

        singleCouponData.couponExpiryDate = customDateFormat(startDate)
        setSingleCouponData(singleCouponData)
      }
      if (couponDate) {
        singleCouponData.couponLimit = couponDate

        setSingleCouponData(singleCouponData)
      }

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponType, startDate, couponDate])

  const handleChange = (e: any) => {
    setSingleCouponData({
      ...singleCouponData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (event: any) => {
    setCouponDate(event.target.value);
  };
  useEffect(() => {
    if (couponId) {

      const singleCouponData = {
        customerId: user.customerId,
        organizationId: user.organizationId,
        couponId
      }

      singleCouponDetails(singleCouponData)
        .then((res: any) => {
          console.log(res.data.data, 'this is data of data')
          setSingleCouponData(res.data.data)
          setCouponType(res.data.data.couponType)
        })
    }

  }, [couponId])

  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])


  useEffect(() => {
    const userDetails = localStorage.getItem('organization')
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [])

  const [permission, setPermission] = useState<any>()

  const listAllCouponFunc = (user: any) => {
    getAllCouponList(user.customerId, user.organizationId).then((res) => {
      setCouponList(res?.data)
      setIsLoading(false)
    })

  }

  useEffect(() => {
    if (user) {
      setPermission(user.role.permissions)
      listAllCouponFunc(user)
      console.log(user, 'this is the user')
    }
  }, [user])

  const handleEditClose = () => {

    setOpenEdit(false)
  }
  const handleEditClickOpen = () => {
    setOpenEdit(true)


  }

  const updateCouponApiCall = () => {
    setFormUpdateButton(false)
    singleCouponData.couponValue = parseInt(singleCouponData.couponValue)
    if (user) {
      const isCouponValid =
        singleCouponData.couponName !== "" &&
        singleCouponData.couponType !== "" &&
        singleCouponData.couponValue !== "" &&
        singleCouponData.couponDescription !== "" &&
        singleCouponData.couponLimit !== "";
      const customerId = user.customerId
      const organizationId = user.organizationId

      if (isCouponValid && singleCouponData.couponLimit == "Date" && parseFloat(singleCouponData.couponValue) > 0) {
        updateCouponDetails(customerId, organizationId, couponId, singleCouponData)
          .then((res: any) => {
            if (res.data.statusCode == 200) {
              getAllCouponList(user.customerId, user.organizationId).then((res) => { setCouponList(res.data) })
              setSnackbarColor(true)
              setSnackbarOpen(true)
              setResponseMessage("Coupon is updated successfully")
              setAlert(false)
              setOpenEdit(false);
              setCouponStatus("")
            }
          })
      }
      else if (isCouponValid && singleCouponData.couponLimit == "couponCount" && parseFloat(singleCouponData.couponValue) > 0 && parseFloat(singleCouponData.couponCount) > 0) {
        updateCouponDetails(customerId, organizationId, couponId, singleCouponData)
          .then((res: any) => {
            if (res.data.statusCode == 200) {
              getAllCouponList(user.customerId, user.organizationId).then((res) => { setCouponList(res.data) })
              setSnackbarColor(true)
              setSnackbarOpen(true)
              setResponseMessage("Coupon is updated successfully")
              setAlert(false)
              setOpenEdit(false);
              setCouponStatus("")
            }
          })
      }
      else if (isCouponValid && singleCouponData.couponLimit == "Both" && parseFloat(singleCouponData.couponValue) > 0 && parseFloat(singleCouponData.couponCount) > 0 && singleCouponData.couponExpiryDate) {
        updateCouponDetails(customerId, organizationId, couponId, singleCouponData)
          .then((res: any) => {
            if (res.data.statusCode == 200) {
              getAllCouponList(user.customerId, user.organizationId).then((res) => { setCouponList(res.data) })
              setSnackbarColor(true)
              setSnackbarOpen(true)
              setResponseMessage("Coupon is updated successfully")
              setAlert(false)
              setOpenEdit(false);
              setCouponStatus("")
            }
          })
      }
      else if (isCouponValid && singleCouponData.couponLimit == "None" && parseFloat(singleCouponData.couponValue) > 0) {
        updateCouponDetails(customerId, organizationId, couponId, singleCouponData)
          .then((res: any) => {
            if (res.data.statusCode == 200) {
              getAllCouponList(user?.customerId, user?.organizationId).then((res) => { setCouponList(res?.data) })
              setSnackbarColor(true)
              setSnackbarOpen(true)
              setResponseMessage("Coupon is updated successfully")
              setAlert(false)
              setOpenEdit(false);
              setCouponStatus("")
            }
          })
      }

      else {
        setSnackbarColor(false)
        setSnackbarOpen(true)
        setResponseMessage("Fill the correct information")
        setAlert(false);
        setCouponStatus("");
      }
    }
  }

  useEffect(() => {
    getAllCouponList(user?.customerId, user?.organizationId).then((res) => { setCouponList(res?.data) })
  }, [couponListReload])

  return (
    <>
      <Error404Component permission={permission} />


      {permission?.some((obj: any) => obj?.title === "Coupons" && (obj?.action?.includes("create"))) &&
        <> <CreateCoupons reload={couponListReload} setReload={setCouponListReload} /> </>
      }

      {permission?.some((obj: any) => obj?.title === "Coupons" && (obj?.action?.includes("read"))) &&
        <>

          <Card sx={{ mt: 7 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CardHeader
                title='Coupon Details'
              />
              <Button className='refreshs' variant='outlined' size='small' sx={{ mt: 5, mb: 5 }} onClick={() => {
                listAllCouponFunc(user);
                setIsLoading(true)
              }}><RefreshIcon className='refreshs' />
              </Button>
            </div>
            <TableContainer sx={{ pb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-root': { py: 4, border: 0 } }}>
                    <TableCell >Coupon Name</TableCell>
                    <TableCell>Coupon Value</TableCell>
                    <TableCell>Coupon Type</TableCell>
                    <TableCell>Coupon Status </TableCell>
                    <TableCell>Coupon Expiry Date</TableCell>
                    <TableCell>Coupon Date Created</TableCell>
                    <TableCell>Coupon Limit</TableCell>
                    <TableCell>Coupon Count</TableCell>
                    <TableCell>{permission?.some((obj: any) => obj?.title === "Coupons" && (obj.action.includes("update") || obj?.action?.includes("delete"))) && 'Actions'}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    isLoading ? (
                      data.map((val: any, index: number) => (
                        <TableRow
                          key={val?.couponName}
                          sx={{
                            '& .MuiTableCell-root': { border: 0, py: (theme) => `${theme.spacing(2)} !important` },
                            width: '200vw',
                          }}
                        >
                          <TableCell>
                            <OverlayTrigger placement="top" overlay={tooltip} >

                              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Skeleton>
                                    <Typography noWrap sx={{ fontWeight: 500 }}>
                                      Lorem, ipsum.
                                    </Typography>
                                  </Skeleton>
                                </Box>
                              </Box>
                            </OverlayTrigger>

                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Skeleton>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                Lorem, ipsum.
                              </Typography>
                            </Skeleton>
                          </TableCell>
                          <TableCell sx={{ textAlign: ' center' }}>
                            <Skeleton>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                Lorem, ipsum.
                              </Typography>
                            </Skeleton>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Skeleton>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  Lorem, ipsum.
                                </Typography>
                              </Skeleton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : couponList?.length == 0 ? (
                      <TableRow
                        sx={{
                          '& .MuiTableCell-root': { border: 0, py: (theme) => `${theme.spacing(2)} !important` },
                        }}
                      >
                        <TableCell align="center" colSpan={9} rowSpan={10}>
                          "No coupon found"
                        </TableCell>
                      </TableRow>
                    ) : (
                      couponList.map((row: any, index: number) => (
                        <TableRow
                          key={row.couponName}
                          sx={{
                            '& .MuiTableCell-root': { border: 0, py: (theme) => `${theme.spacing(2)} !important` },
                            width: '200vw',
                            cursor: 'pointer',
                          }}
                        >
                          <TableCell>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {row.src ? (
                                <CustomAvatar src={row.src} alt={row.couponName} sx={{ width: 38, height: 38, mr: 3 }} />
                              ) : (
                                <CustomAvatar
                                  skin='light'
                                  color='warning'
                                  sx={{ mr: 3, width: 38, height: 38, fontWeight: 600, fontSize: '1rem' }}
                                >
                                  {getInitials(row.couponName)}
                                </CustomAvatar>
                              )}
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Tooltip title={row.couponName} componentsProps={{
                                  tooltip: {
                                    sx: {
                                      bgcolor: "black",
                                      textTransform: "capitalize",
                                      "& .MuiTooltip-arrow": {
                                        color: "black"
                                      }
                                    }
                                  }
                                }}>
                                  <Typography sx={{ fontWeight: 500 }} >
                                    {row.couponName.charAt(0).toUpperCase() + row.couponName.slice(1)}
                                  </Typography>
                                </Tooltip>
                              </Box>
                            </Box>

                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title={row.couponValue} componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: "black",
                                    textTransform: "capitalize",
                                    "& .MuiTooltip-arrow": {
                                      color: "black"
                                    }
                                  }
                                }
                              }}>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  {row.couponValue}
                                </Typography>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title={row.couponType} componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: "black",
                                    textTransform: "capitalize",
                                    "& .MuiTooltip-arrow": {
                                      color: "black"
                                    }
                                  }
                                }
                              }}>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  {row.couponType}
                                </Typography>
                              </Tooltip>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <CustomChip rounded size='small' skin='light' color={row.couponStatus == 'active' ? "success" : "warning"} label={row.couponStatus} />
                          </TableCell>

                          <TableCell sx={{ display: 'flex', }} >
                            <Tooltip title={row.couponExpiryDate ? row.couponExpiryDate : 'no coupon expiry date'} componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: "black",
                                  textTransform: "capitalize",
                                  "& .MuiTooltip-arrow": {
                                    color: "black"
                                  }
                                }
                              }
                            }}>
                              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                <CustomChip sx={{ marginTop: '8px' }} rounded size='small' skin='light' color={row.color} label={row.couponExpiryDate ? row.couponExpiryDate : '-'} />
                              </Typography>
                            </Tooltip>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title={new Date(row.dateCreated).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: "black",
                                    textTransform: "capitalize",
                                    "& .MuiTooltip-arrow": {
                                      color: "black"
                                    }
                                  }
                                }
                              }}>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  {new Date(row.dateCreated).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                </Typography>
                              </Tooltip>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title={row.couponLimit} componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: "black",
                                    textTransform: "capitalize",
                                    "& .MuiTooltip-arrow": {
                                      color: "black"
                                    }
                                  }
                                }
                              }}>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  {row.couponLimit}
                                </Typography>
                              </Tooltip>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex' }}>
                              <Tooltip title={row.couponCount ? row.couponCount : 'no coupon count'} componentsProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: "black",
                                    textTransform: "capitalize",
                                    "& .MuiTooltip-arrow": {
                                      color: "black"
                                    }
                                  }
                                }
                              }}>
                                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                                  <CustomChip rounded size='small' skin='light' color={row.color} label={row.couponCount ? row.couponCount : '-'} />
                                </Typography>
                              </Tooltip>
                            </Box>
                          </TableCell>

                          <TableCell align='center'>
                            <Grid container spacing={5}>
                              {permission?.some((obj: any) => obj?.title === "Coupons" && obj?.action?.includes("update")) &&
                                <Grid item xs={12} sm={6}>

                                  <Button onClick={() => {
                                    setCouponId(row.couponId)
                                    handleEditClickOpen()

                                  }} >
                                    <Icon style={{ cursor: "pointer" }} icon='bx:pencil'  >
                                    </Icon>
                                  </Button>
                                </Grid>}
                              {permission?.some((obj: any) => obj?.title === "Coupons" && obj?.action?.includes("delete")) &&

                                <Grid item xs={12} sm={6}>
                                  <Button onClick={() => { setCouponId(row.couponId), setOpenPopUp(true), setDeletePopUp(true) }}>
                                    <Icon style={{ cursor: "pointer" }} icon='ic:round-delete' >

                                    </Icon>
                                  </Button>
                                </Grid>}
                            </Grid>


                          </TableCell>

                        </TableRow>
                      ))
                    )
                  }
                </TableBody>

              </Table>
            </TableContainer>

            <Dialog
              scroll='body'
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
            >
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: '-15px' }}>
                <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                  Edit Coupon Details
                </DialogTitle>
                <Icon
                  className="iconContainer"
                  onClick={() => {
                    setCouponType("")
                    handleEditClose()
                    setFormUpdateButton(false)
                    setSubmitted(false)
                    setCouponDate("")
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
                <form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField InputLabelProps={{
                        shrink: true,
                      }} fullWidth
                        label='Coupon name'
                        required
                        name="couponName"
                        value={singleCouponData ? singleCouponData.couponName : ""}
                        onChange={(event) => {
                          handleChange(event);
                          setFormUpdateButton(true);
                        }}
                        inputProps={{
                          maxLength: 50,
                        }}
                        error={submitted ? singleCouponData.couponName ? false : true : false}
                        helperText={submitted && !singleCouponData.couponName ? 'Required,max 50 chars' : ''} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField InputLabelProps={{
                        shrink: true,
                      }} fullWidth
                        label='Coupon description'
                        required
                        name="couponDescription"
                        value={singleCouponData ? singleCouponData.couponDescription : ""}
                        onChange={(event) => {
                          handleChange(event);
                          setFormUpdateButton(true);
                        }}
                        inputProps={{
                          maxLength: 500,
                        }}
                        error={submitted ? singleCouponData.couponDescription ? false : true : false}
                        helperText={submitted && !singleCouponData.couponDescription ? 'Required,max 500 chars' : ''} />
                    </Grid>
                    <Grid sx={{ display: 'flex', marginTop: '40px', gap: '100px', ml: '20px' }}>
                      <Grid >
                        <Grid item xs={12}>
                          <FormControl>
                            <FormLabel>Coupon type

                            </FormLabel>
                            <RadioGroup
                              row
                              value={singleCouponData?.couponType ? couponType : ""}

                              aria-label='address type'
                              name='form-layouts-collapsible-address-radio'

                            >
                              <FormControlLabel value="Flat" name='couponType' onClick={() => {
                                setCouponType("Flat"); setFormUpdateButton(true)
                              }} control={<Radio />} label='Flat' />
                              <FormControlLabel value="Percentage" name='couponType' onClick={() => {
                                setCouponType("Percentage"); setFormUpdateButton(true)
                              }} control={<Radio />} label='Percentage' />
                            </RadioGroup>
                          </FormControl>
                        </Grid>

                        {
                          couponType == 'Flat' ?
                            <Grid item xs={12} sm={6}>
                              <TextField
                                value={singleCouponData ? singleCouponData.couponValue : ""}
                                label='Coupon value'
                                type='number'
                                required
                                onChange={(event) => {
                                  handleChange(event);
                                  setFormUpdateButton(true);
                                }}
                                error={submitted ? singleCouponData.couponValue ? false : true : false}
                                helperText={submitted && !singleCouponData.couponValue ? 'Required,value must be a positive number' : ''}
                                placeholder='Coupon value'
                                name='couponValue'
                                aria-describedby='validation-basic-first-name'
                                sx={{
                                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none'
                                  },
                                  '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                  }
                                }}
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  min: 0,

                                }}
                                style={{
                                  width: "100%"
                                }}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">/-</InputAdornment>,
                                }}

                              />
                            </Grid>
                            : ""

                        }
                        {
                          couponType == 'Percentage' ?
                            <Grid item xs={12} sm={6}>
                              <TextField
                                value={singleCouponData ? singleCouponData.couponValue : ""}
                                label='Percentage'
                                onChange={(event) => {
                                  handleChange(event);
                                  setFormUpdateButton(true);
                                }}
                                placeholder='Percentage'
                                name='couponValue'
                                type='number'
                                required
                                fullWidth
                                sx={{
                                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    display: 'none'
                                  },
                                  '& input[type=number]': {
                                    MozAppearance: 'textfield'
                                  }
                                }}
                                error={submitted ? singleCouponData.couponValue ? singleCouponData.couponValue > 100 ? true : false : true : false}
                                helperText={submitted && !singleCouponData.couponValue ? 'Required,value must be a positive number' : ''}
                                aria-describedby='validation-basic-first-name'
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*',
                                  min: 0,
                                  max: 99
                                }}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                style={{
                                  width: "100%"
                                }}

                              />
                            </Grid>
                            : ""

                        }
                      </Grid>
                      {/* <Grid item xs={12} sm={6}>


                      <Grid item xs={12} sm={9}>
                        <Typography sx={{ mb: 3.5, color: 'text.secondary' }}>
                          Change Status
                          {singleCouponData?.couponStatus == 'active' ?
                            <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={"active"} />
                            :
                            <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={"inActive"} />
                          }
                        </Typography>
                        <div style={{ display: 'flex' }}>
                          <div onClick={() => {
                            setCouponStatus('active')
                          }} >
                            <CustomChip
                              style={{ height: "30px", margin: "5px", cursor: "pointer" }}
                              rounded size='small'
                              skin='light'
                              color='success'
                              label='active'
                            />
                          </div>

                          <div onClick={() => {
                            setCouponStatus('inActive');
                          }}><CustomChip
                              style={{ height: "30px", margin: "5px", cursor: "pointer" }}
                              rounded size='small'
                              skin='light'
                              color='warning'

                              label='inActive'
                            /></div>
                        </div>
                      </Grid>
                    </Grid> */}

                      <Grid sx={{ mt: '-20px' }}>
                        <Typography sx={{ fontSize: '1 rem', mt: 3, textAlign: 'center' }}>
                          Current status :
                          {singleCouponData?.couponStatus == 'active' ?
                            <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='success' label={"active"} />
                            :
                            <CustomChip style={{ height: "30px", margin: "5px", cursor: "pointer" }} rounded size='small' skin='light' color='warning' label={"inActive"} />
                          }
                        </Typography>
                        <Grid item xs={100} sm={6} mt={8} ml={15}>
                          <FormControl sx={{ width: '100%', textAlign: 'center' }}>
                            <InputLabel

                              id='validation-basic-select'
                              htmlFor='validation-basic-select'
                            >
                              Status
                            </InputLabel>

                            <Select
                              sx={{ textAlign: 'left', width: '150px' }}
                              value={singleCouponData?.couponStatus}
                              label='status'
                              labelId='validation-basic-select'
                              aria-describedby='validation-basic-select'
                            >

                              <MenuItem value="inActive"
                                disabled={singleCouponData?.couponStatus == 'inActive' ? true : false}
                                onClick={() => { setCouponStatus('inActive'); setFormUpdateButton(true) }}>InActive</MenuItem>

                              <MenuItem value="active"
                                disabled={singleCouponData?.couponStatus == 'active' ? true : false}

                                onClick={() => { setCouponStatus('active'); setFormUpdateButton(true) }}>Active</MenuItem>

                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel>Coupon limit</FormLabel>
                        <RadioGroup
                          row
                          value={singleCouponData ? singleCouponData.couponLimit : ""}
                          aria-label='address type'
                          name='form-layouts-collapsible-address-radio'
                        >
                          <FormControlLabel value='Date' name="couponLimit" onChange={(event) => {
                            handleChange(event);
                            setFormUpdateButton(true);
                            setCouponDate('Date');
                          }} control={<Radio />} label='Date' />
                          <FormControlLabel value='couponCount' name="couponLimit" onChange={(event) => {
                            handleChange(event);
                            setFormUpdateButton(true);
                            setCouponDate('couponCount');
                          }} control={<Radio />} label='Coupon count' />
                          <FormControlLabel value='Both' name="couponLimit" onChange={(event) => {
                            handleChange(event);
                            setFormUpdateButton(true);
                            setCouponDate('Both');
                          }} control={<Radio />} label='Both' />
                          <FormControlLabel value='None' name="couponLimit" onChange={(event) => {
                            handleChange(event);
                            setFormUpdateButton(true);
                          }} control={<Radio />} label='None' />

                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {
                      couponDate === "Date" && (
                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              dateFormat="dd/MM/yyyy"
                              selected={startDate}
                              id='basic-input'
                              required
                              value={singleCouponData ? singleCouponData.couponExpiryDate : ""}
                              popperPlacement={popperPlacement}
                              onChange={(date: Date) => { setStartDate(date); setFormUpdateButton(true) }}
                              placeholderText='Coupon Expiry Date'
                              customInput={<CustomInput
                                InputProps={{
                                  endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                }}
                                label='Coupon expiry date'
                                error={submitted ? startDate ? false : true : false}
                                helperText={submitted && !startDate ? 'Coupon expiry date is required' : ''} />}
                            />
                          </DatePickerWrapper>
                        </Grid>
                      )
                    }
                    {
                      couponDate === "couponCount" && (

                        <Grid item xs={12} sm={6}>
                          <TextField
                            value={singleCouponData ? singleCouponData.couponCount : ""}
                            label='Coupon count'
                            type='number'
                            required
                            sx={{
                              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none'
                              },
                              '& input[type=number]': {
                                MozAppearance: 'textfield'
                              }
                            }}
                            onChange={(event) => {
                              handleChange(event);
                              setFormUpdateButton(true);
                            }}
                            error={submitted ? singleCouponData.couponCount ? false : true : false}
                            helperText={submitted && !singleCouponData.couponCount ? 'Required,value must be a positive number' : ''}
                            placeholder='Coupon count'
                            name='couponCount'
                            aria-describedby='validation-basic-first-name'
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              min: 0,

                            }}
                            style={{
                              width: "100%"
                            }}
                          />
                        </Grid>
                      )
                    }

                    {
                      couponDate === "Both" && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={singleCouponData ? singleCouponData.couponCount : ""}
                              label='Coupon count'
                              onChange={(event) => {
                                handleChange(event);
                                setFormUpdateButton(true);
                              }}
                              type='number'
                              placeholder='Coupon count'
                              name='couponCount'
                              required
                              sx={{
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                  display: 'none'
                                },
                                '& input[type=number]': {
                                  MozAppearance: 'textfield'
                                }
                              }}
                              error={submitted ? singleCouponData.couponCount ? false : true : false}
                              helperText={submitted && !singleCouponData.couponCount ? 'Required,value must be a positive number' : ''}
                              aria-describedby='validation-basic-first-name'
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0,

                              }}
                              style={{
                                width: "100%"
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <DatePickerWrapper>
                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                id='basic-input'
                                required
                                popperPlacement={popperPlacement}
                                value={singleCouponData ? singleCouponData.couponExpiryDate : ""}
                                onChange={(date: Date) => { setStartDate(date); setFormUpdateButton(true) }}
                                placeholderText='Coupon Expiry Date'
                                customInput={<CustomInput
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><EventNoteIcon /></InputAdornment>,
                                  }}
                                  error={submitted ? singleCouponData.couponExpiryDate ? false : true : false}
                                  helperText={submitted && !singleCouponData.couponExpiryDate ? 'Coupon expiry date is required' : ''}
                                  label='Coupon expiry date' />}
                              />
                            </DatePickerWrapper>
                          </Grid>
                        </>


                      )
                    }


                  </Grid>
                </form>
              </DialogContent>

              <DialogActions sx={{ justifyContent: 'right', width: '100%', display: 'flex', justifyItems: 'center' }}>
                <Button variant='outlined' color='secondary' onClick={() => { handleEditClose(); setFormUpdateButton(false); setSubmitted(false); setCouponDate("") }}>
                  Cancel
                </Button>
                <Button variant='contained' sx={{ mr: 2 }} onClick={() => { updateCouponApiCall(); setSubmitted(true); setCouponDate("") }} disabled={!formUpdateButton}>
                  Update
                </Button>

              </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={3000}>
              <Alert
                variant="filled"
                elevation={3}
                onClose={() => setSnackbarOpen(false)}
                severity={snackbarColor === true ? 'success' : 'error'} // Change the severity based on message type
              >
                {responseMessage}
              </Alert>
            </Snackbar>



            {deletePopUp ? <Dialog fullWidth open={openPopUp} onClose={handleDeleteClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
              <Grid container justifyContent="flex-end">
                <Icon
                  className="iconContainer"
                  onClick={() => handleConfirmation('cancel')}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    margin: "8px",
                    transition: "background-color 0.3s",
                  }}
                  icon='bx:x'
                />
              </Grid>
              <DialogContent sx={{ pb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Box sx={{ mb: 9, maxWidth: '85%', textAlign: 'center', '& svg': { color: 'warning.main' } }}>
                    <Icon icon='bx:error-circle' fontSize='5.5rem' style={{ marginTop: '-30px' }} />
                    <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                      Are you sure?
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '1.125rem', mb: 6 }}>You won't be able to revert coupon !</Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'right' }}>
                <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
                  Cancel
                </Button>
                <Button variant='contained' sx={{ mr: 1.5 }} onClick={() => {
                  handleConfirmation('yes'),
                    deleteCouponApi()

                  // handleDeleteApi()
                }}>
                  Delete
                </Button>

              </DialogActions>
            </Dialog> : ""
            }

          </Card >

        </>
      }

    </>

  )
}

export default CouponCard